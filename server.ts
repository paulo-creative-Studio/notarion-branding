import express, { Request, Response, NextFunction } from 'express';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

const GEMINI_MODEL = 'gemini-4-hydrogen';
const REQUEST_TIMEOUT_MS = 20_000;
const MAX_HISTORY_MESSAGES = 16;
const MAX_MESSAGE_CHARS = 1500;
const RATE_LIMIT_MINUTE_MAX = 15;
const RATE_LIMIT_HOUR_MAX = 60;

const ELISANGELA_SYSTEM_INSTRUCTION = `Você é Elisângela, consultora comercial sênior da Notarion Brand.
Seu objetivo é conduzir uma conversa fluida, envolvente e comercialmente assertiva com donos ou gestores de negócios locais.

OBJETIVO PRINCIPAL:
Transformar o visitante em um lead qualificado para os serviços da Notarion Brand, conduzindo-o passo a passo até o interesse claro e o fechamento/convite para falar com a equipe no WhatsApp oficial (+55 44 9723-4590) ou agendar a demonstração visual gratuita.

NUNCA PARE A CONVERSA. NUNCA DÊ RESPOSTAS INCOMPLETAS OU TERMINADAS EM INGLÊS/FRAGMENTOS.
Se o cliente responder com apenas uma palavra (ex: "whatsapp", "restaurante", "sim", "loja"), você DEVE imediatamente pegar essa informação, contextualizar e aprofundar com uma pergunta estratégica.

BASE DE SERVIÇOS DA NOTARION BRAND (USE PARA RESPONDER COM DETALHES QUANDO PERGUNTAREM OU QUANDO IDENTIFICAR A NECESSIDADE):
1. Presença Digital & Site Profissional:
   - Sites ultrarrápidos para celular, página limpa que transmite credibilidade imediata.
   - Botão 'Como Chegar' conectado ao Google Maps/Waze e redes sociais integradas.
2. Vitrine Digital & Modelos Virtuais (Para Moda, Confecções e Lojas):
   - Apresentação de peças em modelos virtuais realistas e consistentes, sem o custo astronômico de contratação de modelos, estúdios ou fotógrafos a cada coleção.
   - Catálogo com botão de 'Pedir no WhatsApp' em cada peça.
3. Cardápio & Catálogo Digital (Para Gastronomia, Bares, Cafeterias e Mercados):
   - Cardápio interativo e ágil via QR Code ou link da bio, sem precisar baixar aplicativo ou PDFs pesados de 20MB.
   - Atualização simples de pratos e preços.
4. Google & Presença Local Estruturada:
   - Otimização do perfil no Google Maps para a empresa ser encontrada quando clientes pesquisam na cidade ou região.
5. Automações & Atendimento no WhatsApp:
   - Triagem inicial inteligente de mensagens frequentes (horários, cardápio, localização, dúvidas repetitivas), economizando o tempo da equipe humana e evitando perda de vendas por demora.

ESTRUTURA DA CONVERSA (ETAPAS):

ETAPA 1 - RECEBER E INVESTIGAR
- Se o cliente disse que atende por WhatsApp:
  Pergunte como lida com o volume de mensagens e se perde tempo respondendo sempre as mesmas coisas (preço, horário, localização, cardápio) ou se já tem algo automatizado.
- Se o cliente disse o segmento (ex: Pet shop, restaurante, loja de roupas):
  Mostre que conhece a realidade do segmento e pergunte se ele já tem cardápio/catálogo digital ou se o cliente depende de pedir foto no WhatsApp.

ETAPA 2 - APRESENTAR OPORTUNIDADE E DETALHAR O SERVIÇO
- Conecte a dor dele com a solução da Notarion.
  Exemplo: "Na Notarion nós resolvemos isso com uma estrutura digital integrada: o cliente acessa seu cardápio/catálogo num clique, já vê as informações e chega no seu WhatsApp pronto para fechar, sem você gastar tempo digitando o básico."

ETAPA 3 - CONDUZIR AO FECHAMENTO (PRIMEIRO SIM / RECOMENDAR A EQUIPE)
- Quando o cliente demonstrar interesse, fizer perguntas sobre valores, implementação ou disser que quer o serviço:
  Apresente com clareza o próximo passo:
  "Excelente. Nós preparamos uma demonstração visual gratuita da estrutura para a sua empresa antes de qualquer contratação, para você ver exatamente como vai funcionar no celular.
  Vou direcionar você agora para falar diretamente com a nossa equipe no WhatsApp para dar início. Posso solicitar esse contato para você?"

REGRAS OBRIGATÓRIAS:
- Fale SEMPRE em português do Brasil, de forma humana, clara e segura.
- NUNCA gere palavras aleatórias em inglês (como '/grooming scheduling' ou termos soltos).
- Mensagens de tamanho equilibrado (2 a 5 linhas): explique o benefício com detalhes quando for o momento, e termine SEMPRE com uma pergunta que passe a bola de volta para o cliente.
- Nunca diga que é IA ou assistente virtual. Você é Elisângela, consultora da Notarion Brand.`;

// In-memory rate limiter per IP (minute & hour windows)
interface RateBucket {
  minuteCount: number;
  minuteResetAt: number;
  hourCount: number;
  hourResetAt: number;
}

const rateBuckets = new Map<string, RateBucket>();

function getClientIp(req: Request): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.trim()) {
    return forwarded.split(',')[0].trim();
  }
  if (Array.isArray(forwarded) && forwarded[0]) {
    return forwarded[0].trim();
  }
  return req.ip || req.socket.remoteAddress || 'unknown';
}

function checkRateLimit(ip: string): { allowed: boolean; retryAfterSec?: number } {
  const now = Date.now();

  // Periodic cleanup to keep memory bounded
  if (rateBuckets.size > 2000) {
    for (const [key, bucket] of rateBuckets.entries()) {
      if (bucket.hourResetAt <= now) {
        rateBuckets.delete(key);
      }
    }
  }

  const existing = rateBuckets.get(ip);
  const bucket: RateBucket = existing
    ? { ...existing }
    : {
        minuteCount: 0,
        minuteResetAt: now + 60_000,
        hourCount: 0,
        hourResetAt: now + 3_600_000,
      };

  if (now >= bucket.minuteResetAt) {
    bucket.minuteCount = 0;
    bucket.minuteResetAt = now + 60_000;
  }

  if (now >= bucket.hourResetAt) {
    bucket.hourCount = 0;
    bucket.hourResetAt = now + 3_600_000;
  }

  if (bucket.minuteCount >= RATE_LIMIT_MINUTE_MAX) {
    const retryAfterSec = Math.max(1, Math.ceil((bucket.minuteResetAt - now) / 1000));
    rateBuckets.set(ip, bucket);
    return { allowed: false, retryAfterSec };
  }

  if (bucket.hourCount >= RATE_LIMIT_HOUR_MAX) {
    const retryAfterSec = Math.max(1, Math.ceil((bucket.hourResetAt - now) / 1000));
    rateBuckets.set(ip, bucket);
    return { allowed: false, retryAfterSec };
  }

  bucket.minuteCount += 1;
  bucket.hourCount += 1;
  rateBuckets.set(ip, bucket);
  return { allowed: true };
}

interface SanitizedTurn {
  role: 'user' | 'model';
  parts: [{ text: string }];
}

function sanitizeMessages(rawMessages: unknown): {
  contents?: SanitizedTurn[];
  error?: string;
} {
  if (!Array.isArray(rawMessages) || rawMessages.length === 0) {
    return { error: 'Nenhuma mensagem enviada.' };
  }

  const validTurns: Array<{ role: 'user' | 'model'; text: string }> = [];

  for (const item of rawMessages) {
    if (!item || typeof item !== 'object') {
      return { error: 'Formato de mensagem inválido.' };
    }
    const { role, content } = item as { role?: unknown; content?: unknown };

    if (role !== 'user' && role !== 'assistant') {
      return { error: 'Papel de mensagem inválido.' };
    }

    if (typeof content !== 'string') {
      return { error: 'Conteúdo da mensagem deve ser texto.' };
    }

    const trimmed = content.trim();
    if (!trimmed) {
      continue;
    }

    if (role === 'user' && trimmed.length > MAX_MESSAGE_CHARS) {
      return {
        error: `A mensagem excede o limite máximo de ${MAX_MESSAGE_CHARS} caracteres.`,
      };
    }

    validTurns.push({
      role: role === 'assistant' ? 'model' : 'user',
      text: trimmed.slice(0, MAX_MESSAGE_CHARS * 2),
    });
  }

  // Keep only the most recent window of turns
  const windowed = validTurns.slice(-MAX_HISTORY_MESSAGES);

  // Drop any leading 'model' turns so the Gemini conversation always begins with 'user'
  while (windowed.length > 0 && windowed[0].role !== 'user') {
    windowed.shift();
  }

  if (windowed.length === 0) {
    return { error: 'Envie ao menos uma mensagem para continuar.' };
  }

  // Merge consecutive turns of the same role to guarantee strict user/model alternation
  const normalized: SanitizedTurn[] = [];
  for (const turn of windowed) {
    const prev = normalized[normalized.length - 1];
    if (prev && prev.role === turn.role) {
      prev.parts[0].text = `${prev.parts[0].text}\n\n${turn.text}`;
    } else {
      normalized.push({
        role: turn.role,
        parts: [{ text: turn.text }],
      });
    }
  }

  if (normalized[normalized.length - 1].role !== 'user') {
    return { error: 'A última mensagem deve ser do usuário.' };
  }

  return { contents: normalized };
}

function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) {
    return null;
  }

  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

interface ClassifiedError {
  status: number;
  code: string;
  message: string;
  retryable: boolean;
}

function getErrorStatus(error: unknown): number | undefined {
  if (!error || typeof error !== 'object') return undefined;
  const errObj = error as { status?: unknown; code?: unknown; cause?: { status?: unknown } };
  if (typeof errObj.status === 'number') return errObj.status;
  if (typeof errObj.code === 'number') return errObj.code;
  if (errObj.cause && typeof errObj.cause.status === 'number') return errObj.cause.status;
  return undefined;
}

function classifyGeminiError(error: unknown): ClassifiedError {
  const errName = error instanceof Error ? error.name : '';
  const errMsg = error instanceof Error ? error.message : String(error ?? '');
  const upperMsg = errMsg.toUpperCase();
  const httpStatus = getErrorStatus(error);

  if (errName === 'AbortError' || upperMsg.includes('ABORTED') || upperMsg.includes('TIMEOUT')) {
    return {
      status: 504,
      code: 'TIMEOUT',
      message: 'A resposta demorou mais que o esperado. Tente novamente em instantes.',
      retryable: true,
    };
  }

  if (
    httpStatus === 401 ||
    httpStatus === 403 ||
    upperMsg.includes('API_KEY_INVALID') ||
    upperMsg.includes('API KEY') ||
    upperMsg.includes('PERMISSION_DENIED') ||
    upperMsg.includes('UNAUTHENTICATED')
  ) {
    return {
      status: 401,
      code: 'AUTH_ERROR',
      message:
        'Não foi possível autenticar o serviço de atendimento no momento. Por favor, fale com nossa equipe pelo WhatsApp.',
      retryable: false,
    };
  }

  if (httpStatus === 404 || upperMsg.includes('NOT_FOUND')) {
    return {
      status: 502,
      code: 'MODEL_NOT_FOUND',
      message:
        'O modelo de atendimento não está disponível nesta configuração. Fale diretamente com nossa equipe pelo WhatsApp.',
      retryable: false,
    };
  }

  if (httpStatus === 429 || upperMsg.includes('RESOURCE_EXHAUSTED') || upperMsg.includes('QUOTA')) {
    return {
      status: 429,
      code: 'RATE_LIMIT',
      message:
        'Nosso atendimento está com alta demanda no momento. Aguarde alguns segundos e tente novamente.',
      retryable: true,
    };
  }

  if (httpStatus === 400 || upperMsg.includes('INVALID_ARGUMENT')) {
    return {
      status: 400,
      code: 'BAD_REQUEST',
      message: 'Não foi possível processar essa mensagem. Reformule e tente novamente.',
      retryable: false,
    };
  }

  return {
    status: 503,
    code: 'SERVICE_UNAVAILABLE',
    message:
      'O atendimento automático está temporariamente indisponível. Tente novamente ou clique em FALAR COM A EQUIPE.',
    retryable: true,
  };
}

function isTransientError(error: unknown): boolean {
  const status = getErrorStatus(error);
  const msg = error instanceof Error ? error.message.toUpperCase() : '';
  if (status === 429 || status === 500 || status === 502 || status === 503 || status === 504) {
    return true;
  }
  return (
    msg.includes('UNAVAILABLE') ||
    msg.includes('ECONNRESET') ||
    msg.includes('ETIMEDOUT') ||
    msg.includes('FETCH FAILED')
  );
}

async function generateWithRetry(
  ai: GoogleGenAI,
  contents: SanitizedTurn[]
) {
  const maxAttempts = 3;
  let lastError: unknown;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const response = await ai.models.generateContent({
        model: GEMINI_MODEL,
        contents,
        config: {
          systemInstruction: ELISANGELA_SYSTEM_INSTRUCTION,
          thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
          maxOutputTokens: 800,
          abortSignal: controller.signal,
        },
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      lastError = error;

      const aborted = error instanceof Error && error.name === 'AbortError';
      if (aborted || attempt === maxAttempts || !isTransientError(error)) {
        throw error;
      }

      const backoffMs = 600 * Math.pow(2, attempt - 1);
      await new Promise((resolve) => setTimeout(resolve, backoffMs));
    }
  }

  throw lastError;
}

// Payload limit protection
app.use(express.json({ limit: '32kb' }));

// Malformed or oversized JSON handler
app.use((err: unknown, _req: Request, res: Response, next: NextFunction) => {
  if (err && typeof err === 'object' && 'type' in err) {
    const bodyErr = err as { type?: string; status?: number };
    if (bodyErr.type === 'entity.too.large') {
      return res.status(413).json({
        error: 'A requisição excedeu o tamanho máximo permitido.',
        code: 'PAYLOAD_TOO_LARGE',
        retryable: false,
      });
    }
    if (bodyErr.type === 'entity.parse.failed') {
      return res.status(400).json({
        error: 'Formato JSON inválido na requisição.',
        code: 'INVALID_JSON',
        retryable: false,
      });
    }
  }
  return next(err);
});

// API endpoint for Elisângela Chat
app.post('/api/chat', async (req: Request, res: Response) => {
  const clientIp = getClientIp(req);
  const rateCheck = checkRateLimit(clientIp);
  if (!rateCheck.allowed) {
    if (rateCheck.retryAfterSec) {
      res.setHeader('Retry-After', String(rateCheck.retryAfterSec));
    }
    return res.status(429).json({
      error: 'Muitas mensagens enviadas em sequência. Aguarde alguns segundos antes de tentar novamente.',
      code: 'RATE_LIMIT',
      retryable: true,
    });
  }

  const sanitized = sanitizeMessages(req.body?.messages);
  if (sanitized.error || !sanitized.contents) {
    return res.status(400).json({
      error: sanitized.error || 'Mensagens inválidas.',
      code: 'BAD_REQUEST',
      retryable: false,
    });
  }

  const ai = getGeminiClient();
  if (!ai) {
    console.warn('[Elisângela /api/chat] GEMINI_API_KEY não configurada no ambiente do servidor.');
    return res.status(503).json({
      error:
        'O atendimento automático está aguardando configuração da chave de API no servidor. Enquanto isso, fale diretamente com nossa equipe pelo WhatsApp.',
      code: 'API_KEY_MISSING',
      retryable: false,
    });
  }

  try {
    const response = await generateWithRetry(ai, sanitized.contents);
    const reply = response.text?.trim();

    if (!reply) {
      return res.status(502).json({
        error: 'Não recebi uma resposta válida agora. Por favor, tente enviar novamente.',
        code: 'EMPTY_RESPONSE',
        retryable: true,
      });
    }

    return res.json({ reply });
  } catch (error) {
    const classified = classifyGeminiError(error);
    console.error(`[Elisângela /api/chat] Erro ${classified.code} (HTTP ${classified.status})`);
    return res.status(classified.status).json({
      error: classified.message,
      code: classified.code,
      retryable: classified.retryable,
    });
  }
});

// Production / Dev Vite middleware handling
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'dist')));
  app.get('*', (_req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  });
} else {
  // Mount Vite middlewares in development
  const { createServer } = await import('vite');
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
}

app.listen(port, () => {
  console.log(`Servidor Notarion rodando na porta ${port}`);
});

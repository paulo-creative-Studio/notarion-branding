// Função serverless do Vercel: POST /api/chat
// Requer a variável de ambiente GEMINI_API_KEY (Vercel > Settings > Environment Variables).
import { GoogleGenAI } from '@google/genai';
import {
  ELISANGELA_SYSTEM_INSTRUCTION,
  FALLBACK_REPLY,
  MODEL_NAME,
  checkRateLimit,
  getClientIp,
  validateMessages,
} from './_shared.js';

type Req = { method?: string; body?: any; headers: Record<string, string | string[] | undefined>; socket?: { remoteAddress?: string } };
type Res = { status: (code: number) => Res; json: (body: unknown) => void; setHeader: (name: string, value: string) => void };

export const config = { maxDuration: 30 };

export default async function handler(req: Req, res: Res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Método não permitido.', retryable: false });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('GEMINI_API_KEY não configurada no Vercel.');
    return res.status(500).json({ error: 'Serviço de atendimento não configurado. Fale com nossa equipe pelo WhatsApp.', retryable: false });
  }

  const ip = getClientIp(req.headers['x-forwarded-for'], req.socket?.remoteAddress);
  if (!checkRateLimit(ip)) {
    return res.status(429).json({ error: 'Muitas mensagens em pouco tempo. Aguarde um minuto e tente novamente.', retryable: true });
  }

  const parsed = validateMessages(req.body?.messages);
  if (!parsed.ok) {
    return res.status(400).json({ error: parsed.error, retryable: false });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const contents = parsed.messages.map((m) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents,
      config: {
        systemInstruction: ELISANGELA_SYSTEM_INSTRUCTION,
        temperature: 0.6,
        maxOutputTokens: 400,
      },
    });

    return res.status(200).json({ reply: response.text || FALLBACK_REPLY });
  } catch (error) {
    console.error('Erro na API de chat Elisângela:', error);
    return res.status(500).json({
      error: 'Falha temporária ao comunicar com a consultora.',
      fallbackReply: FALLBACK_REPLY,
      retryable: true,
    });
  }
}

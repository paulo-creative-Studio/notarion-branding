import express from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  ELISANGELA_SYSTEM_INSTRUCTION,
  FALLBACK_REPLY,
  MODEL_NAME,
  checkRateLimit,
  getClientIp,
  validateMessages,
} from './api/_shared.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: '50kb' }));

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// API endpoint for Elisângela Chat (uso local / AI Studio; no Vercel vale api/chat.ts)
app.post('/api/chat', async (req, res) => {
  try {
    const ip = getClientIp(req.headers['x-forwarded-for'], req.socket.remoteAddress);
    if (!checkRateLimit(ip)) {
      return res.status(429).json({ error: 'Muitas mensagens em pouco tempo. Aguarde um minuto e tente novamente.', retryable: true });
    }

    const parsed = validateMessages(req.body?.messages);
    if (!parsed.ok) {
      return res.status(400).json({ error: parsed.error, retryable: false });
    }

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

    return res.json({ reply: response.text || FALLBACK_REPLY });
  } catch (error) {
    console.error('Erro na API de chat Elisângela:', error);
    return res.status(500).json({
      error: 'Falha temporária ao comunicar com a consultora.',
      fallbackReply: FALLBACK_REPLY,
      retryable: true,
    });
  }
});

// Production / Dev Vite middleware handling
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'dist')));
  app.get('*', (req, res) => {
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

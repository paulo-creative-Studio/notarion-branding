import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  Bot, 
  UserCheck, 
  Phone, 
  ChevronRight, 
  RefreshCw,
  ExternalLink,
  Minimize2,
  CheckCircle2
} from 'lucide-react';
import { COMPANY_INFO } from '../data/content';
import { NotarionBrandIcon } from './NotarionLogo';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  isSystemGreeting?: boolean;
  isError?: boolean;
  retryable?: boolean;
  failedUserText?: string;
}

interface WhatsAppAssistantProps {
  onOpenCallModal?: () => void;
  onOpenDemoModal?: () => void;
  forceOpenTab?: 'menu' | 'ai' | 'triage' | null;
  onCloseForceOpen?: () => void;
}

export const WhatsAppAssistant: React.FC<WhatsAppAssistantProps> = ({ 
  onOpenCallModal, 
  onOpenDemoModal,
  forceOpenTab,
  onCloseForceOpen
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'menu' | 'ai' | 'triage'>('menu');

  useEffect(() => {
    if (forceOpenTab) {
      setIsOpen(true);
      setActiveTab(forceOpenTab);
      onCloseForceOpen?.();
    }
  }, [forceOpenTab, onCloseForceOpen]);
  
  // Chat state for Elisângela
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      content: 'Olá! Sou Elisângela, consultora da Notarion Brand.\n\nPara eu entender melhor seu cenário, qual é o seu ramo de atividade e em qual cidade você atua?',
      timestamp: 'Agora',
      isSystemGreeting: true
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Guided triage state (for quick WhatsApp direct)
  const [triageStep, setTriageStep] = useState(1);
  const [businessType, setBusinessType] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [city, setCity] = useState('');
  const [mainGoal, setMainGoal] = useState('');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (activeTab === 'ai') {
      scrollToBottom();
    }
  }, [messages, activeTab]);

  const buildApiHistory = (chatMessages: ChatMessage[]) => {
    const clean = chatMessages
      .filter((m) => !m.isSystemGreeting && !m.isError && m.content.trim().length > 0)
      .slice(-16);

    while (clean.length > 0 && clean[0].role !== 'user') {
      clean.shift();
    }

    return clean.map((m) => ({
      role: m.role,
      content: m.content
    }));
  };

  const requestElisangelaReply = async (historyToSend: ChatMessage[], failedUserText: string) => {
    setIsLoading(true);
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 22000);

    try {
      if (typeof navigator !== 'undefined' && !navigator.onLine) {
        throw new Error('OFFLINE');
      }

      const apiMessages = buildApiHistory(historyToSend);
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({ messages: apiMessages })
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        const errMessage =
          (data && typeof data.error === 'string' && data.error) ||
          (response.status === 429
            ? 'Limite temporário de mensagens atingido. Aguarde alguns segundos e tente novamente.'
            : response.status === 401 || response.status === 403
            ? 'Falha de autenticação no serviço de atendimento. Fale diretamente com nossa equipe pelo WhatsApp.'
            : 'Serviço de atendimento temporariamente indisponível. Tente novamente ou fale com nossa equipe.');

        const isRetryable =
          data && typeof data.retryable === 'boolean'
            ? data.retryable
            : response.status >= 500 || response.status === 429;

        setMessages((prev) => [
          ...prev,
          {
            id: `err-${Date.now()}`,
            role: 'assistant',
            content: errMessage,
            timestamp: 'Agora',
            isError: true,
            retryable: isRetryable,
            failedUserText
          }
        ]);
        return;
      }

      const assistantText = typeof data?.reply === 'string' ? data.reply.trim() : '';
      if (!assistantText) {
        setMessages((prev) => [
          ...prev,
          {
            id: `err-${Date.now()}`,
            role: 'assistant',
            content: 'Não foi possível obter uma resposta válida agora. Tente novamente.',
            timestamp: 'Agora',
            isError: true,
            retryable: true,
            failedUserText
          }
        ]);
        return;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: assistantText,
          timestamp: 'Agora'
        }
      ]);
    } catch (err) {
      let friendlyMessage =
        'Não foi possível conectar ao atendimento agora. Verifique sua conexão e tente novamente.';

      if (err instanceof Error) {
        if (err.message === 'OFFLINE') {
          friendlyMessage =
            'Você parece estar sem conexão com a internet. Reconecte-se e tente novamente.';
        } else if (err.name === 'AbortError') {
          friendlyMessage =
            'A conexão demorou mais que o esperado. Tente novamente em instantes.';
        }
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: 'assistant',
          content: friendlyMessage,
          timestamp: 'Agora',
          isError: true,
          retryable: true,
          failedUserText
        }
      ]);
    } finally {
      window.clearTimeout(timeoutId);
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userText = inputMessage.trim();
    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: userText,
      timestamp: 'Agora'
    };

    // Strip trailing error notices before appending the new user turn
    const cleanedBase = messages.filter((m) => !m.isError);
    const newHistory = [...cleanedBase, newMsg];
    setMessages(newHistory);
    setInputMessage('');

    await requestElisangelaReply(newHistory, userText);
  };

  const handleRetryFailedMessage = async (errorId: string, failedUserText: string) => {
    if (isLoading) return;
    const withoutError = messages.filter((m) => m.id !== errorId && !m.isError);
    setMessages(withoutError);
    await requestElisangelaReply(withoutError, failedUserText);
  };

  const handleTransferToWhatsApp = () => {
    // Collect conversation summary to hand over seamlessly to Paulo / WhatsApp
    const lastUserMsgs = messages
      .filter(m => m.role === 'user' && !m.isError)
      .map(m => `• ${m.content}`)
      .slice(-4)
      .join('\n');

    const leadSummary = encodeURIComponent(
      `Olá! Estive conversando com a consultora Elisângela pelo site da Notarion Brand e gostaria de dar continuidade com a equipe comercial.\n\n` +
      (lastUserMsgs ? `*Resumo dos pontos que conversamos:*\n${lastUserMsgs}\n\n` : '') +
      `Gostaria de solicitar uma demonstração gratuita ou proposta.`
    );

    window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${leadSummary}`, '_blank');
  };

  const handleFinishTriage = () => {
    const message = encodeURIComponent(
      `Olá! Vim pelo site da Notarion Brand via Triagem Rápida:\n\n` +
      `🏢 *Empresa:* ${companyName || 'Não informado'}\n` +
      `🏷️ *Tipo de Negócio:* ${businessType || 'Geral'}\n` +
      `📍 *Cidade/Região:* ${city || 'Não informado'}\n` +
      `🎯 *Principal objetivo:* ${mainGoal || 'Conhecer soluções'}\n\n` +
      `Gostaria de receber uma demonstração gratuita.`
    );

    window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${message}`, '_blank');
    setIsOpen(false);
  };

  const handleDirectWhatsApp = () => {
    const message = encodeURIComponent(COMPANY_INFO.defaultWhatsappMessage);
    window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${message}`, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40">
      
      {/* Pop-up assistant window */}
      {isOpen && (
        <div className="mb-3 w-[calc(100vw-32px)] sm:w-[410px] h-[550px] max-h-[85vh] rounded-2xl bg-zinc-950 border border-zinc-800 shadow-[0_10px_40px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-3 duration-200">
          
          {/* Header */}
          <div className="p-3.5 bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 border-b border-zinc-800 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-b from-[#1c1d22] to-[#0f1013] border border-[#d4af37]/60 p-1 flex items-center justify-center shadow-md">
                <NotarionBrandIcon className="w-full h-full" glow />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-zinc-950" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs font-bold text-white">
                    Elisângela
                  </h4>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#d4af37]/20 text-[#f3df89] font-medium border border-[#d4af37]/30">
                    Notarion Brand
                  </span>
                </div>
                <p className="text-[10px] text-zinc-400">
                  Consultora de Atendimento
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {activeTab !== 'menu' && (
                <button
                  onClick={() => setActiveTab('menu')}
                  className="text-xs text-zinc-400 hover:text-white px-2 py-1 rounded bg-zinc-900 border border-zinc-800"
                  title="Voltar ao Menu"
                >
                  Menu
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="text-zinc-400 hover:text-white p-1.5 rounded-lg hover:bg-zinc-800 transition-colors"
                aria-label="Fechar assistente"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* VIEW 1: Submenu de opções */}
          {activeTab === 'menu' && (
            <div className="p-5 flex-1 flex flex-col justify-between overflow-y-auto space-y-4">
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 text-zinc-300 space-y-1.5">
                  <div className="flex items-center gap-2 text-white font-semibold text-xs">
                    <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Como prefere ser atendido agora?</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-relaxed">
                    Tire dúvidas em tempo real ou fale diretamente com a nossa equipe no WhatsApp.
                  </p>
                </div>

                {/* Submenu Option 1: Falar com Assistente - Elisângela */}
                <button
                  onClick={() => setActiveTab('ai')}
                  className="w-full text-left p-3.5 rounded-xl bg-gradient-to-r from-zinc-900 to-zinc-900/60 hover:from-zinc-850 hover:to-zinc-800 border border-[#d4af37]/40 hover:border-[#d4af37] transition-all group flex items-start gap-3 shadow-sm"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                    <Bot className="w-5 h-5 text-[#d4af37]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white group-hover:text-[#f3df89] transition-colors">
                        Falar com Assistente - Elisângela
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#d4af37] group-hover:translate-x-0.5 transition-transform" />
                    </div>
                    <p className="text-[11px] text-zinc-400 mt-0.5 leading-snug">
                      Entenda as melhores soluções para seu segmento e solicite demonstração sem compromisso.
                    </p>
                  </div>
                </button>

                {/* Submenu Option 2: FALAR COM A EQUIPE (WhatsApp Oficial) */}
                <button
                  onClick={handleDirectWhatsApp}
                  className="w-full text-left p-3.5 rounded-xl bg-zinc-900/60 hover:bg-zinc-850 border border-zinc-800 hover:border-zinc-600 transition-all group flex items-start gap-3"
                >
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center shrink-0 mt-0.5">
                    <UserCheck className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white tracking-wide">
                        FALAR COM A EQUIPE
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 text-zinc-400 group-hover:text-emerald-400 transition-colors" />
                    </div>
                    <p className="text-[11px] text-zinc-400 mt-0.5 leading-snug">
                      WhatsApp oficial: +55 44 9723-4590.
                    </p>
                  </div>
                </button>

                {/* Submenu Option 3: Triagem Rápida */}
                <button
                  onClick={() => setActiveTab('triage')}
                  className="w-full text-left p-3 rounded-xl bg-zinc-900/30 hover:bg-zinc-900/60 border border-zinc-850 hover:border-zinc-700 transition-all flex items-center justify-between text-xs text-zinc-400 hover:text-zinc-200"
                >
                  <span>Preencher formulário rápido de 1 minuto</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Bottom Notice */}
              <div className="pt-3 border-t border-zinc-900 text-center">
                <span className="text-[10px] text-zinc-400">
                  Doutor Camargo · Maringá · Paiçandu · Atendimento Online Brasil
                </span>
              </div>
            </div>
          )}

          {/* VIEW 2: Chat Interativo com Elisângela (IA Gemini com treinamento Notarion) */}
          {activeTab === 'ai' && (
            <div className="flex-1 flex flex-col min-h-0 bg-[#08090b]">
              {/* Quick contextual banner */}
              <div className="px-3.5 py-1.5 bg-zinc-900/90 border-b border-zinc-800/80 flex items-center justify-between text-[11px]">
                <span className="text-zinc-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Elisângela está online
                </span>
                <button
                  onClick={handleTransferToWhatsApp}
                  className="text-[#d4af37] hover:text-[#f3df89] font-semibold text-[10px] flex items-center gap-1 hover:underline"
                >
                  <span>FALAR COM A EQUIPE</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </button>
              </div>

              {/* Chat Message Scroll */}
              <div className="flex-1 p-3.5 overflow-y-auto space-y-3">
                {messages.map((msg) => {
                  const isAssistant = msg.role === 'assistant';
                  if (msg.isError) {
                    return (
                      <div key={msg.id} className="flex flex-col items-start">
                        <div className="max-w-[90%] rounded-2xl px-3.5 py-3 text-xs leading-relaxed bg-zinc-900/90 border border-amber-500/40 text-zinc-200 shadow-sm space-y-2.5">
                          <p className="whitespace-pre-line text-amber-200/95">{msg.content}</p>
                          <div className="flex flex-wrap items-center gap-2 pt-0.5">
                            {msg.retryable && msg.failedUserText && (
                              <button
                                type="button"
                                onClick={() => handleRetryFailedMessage(msg.id, msg.failedUserText!)}
                                disabled={isLoading}
                                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#d4af37] hover:bg-[#e6ca65] text-black font-bold text-[11px] transition-colors disabled:opacity-50"
                              >
                                <RefreshCw className="w-3 h-3" />
                                <span>Tentar novamente</span>
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={handleTransferToWhatsApp}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold text-[11px] border border-zinc-700 transition-colors"
                            >
                              <span>FALAR COM A EQUIPE</span>
                              <ExternalLink className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                        <span className="text-[9px] text-zinc-400 mt-1 px-1">
                          Aviso do atendimento · {msg.timestamp}
                        </span>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isAssistant ? 'items-start' : 'items-end'}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                          isAssistant
                            ? 'bg-zinc-900 border border-zinc-800 text-zinc-200 shadow-sm'
                            : 'bg-gradient-to-r from-[#d4af37] to-[#ba9324] text-black font-medium shadow-md'
                        }`}
                      >
                        <p className="whitespace-pre-line">{msg.content}</p>
                      </div>
                      <span className="text-[9px] text-zinc-400 mt-1 px-1">
                        {isAssistant ? 'Elisângela' : 'Você'} · {msg.timestamp}
                      </span>
                    </div>
                  );
                })}

                {isLoading && (
                  <div className="flex items-start">
                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl px-3.5 py-2.5 text-xs text-zinc-400 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-bounce" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-bounce [animation-delay:0.4s]" />
                      <span className="text-[11px]">Elisângela digitando...</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Form */}
              <form
                onSubmit={handleSendMessage}
                className="p-3 bg-zinc-950 border-t border-zinc-800 flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Escreva sua resposta..."
                  maxLength={1500}
                  disabled={isLoading}
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-xs placeholder:text-zinc-400 focus:outline-none focus:border-[#d4af37] transition-colors"
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim() || isLoading}
                  className="p-2.5 rounded-xl bg-[#d4af37] text-black font-bold disabled:opacity-40 hover:bg-[#e6ca65] transition-colors shrink-0 shadow-sm"
                  aria-label="Enviar mensagem"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}

          {/* VIEW 3: Formulário Rápido de Triagem */}
          {activeTab === 'triage' && (
            <div className="p-4 space-y-4 text-xs flex-1 overflow-y-auto">
              {triageStep === 1 && (
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-zinc-900/80 border border-zinc-800 text-zinc-300 space-y-1">
                    <p className="font-semibold text-white">Triagem rápida Notarion</p>
                    <p className="text-[11px] text-zinc-400">Qual é o segmento principal da sua empresa?</p>
                  </div>

                  <div className="grid grid-cols-1 gap-1.5">
                    {[
                      'Bar / Restaurante / Cafeteria',
                      'Loja de Roupas / Confecção / Moda',
                      'Mercadinho / Comércio do Bairro',
                      'Profissional Liberal / Técnico',
                      'Outro Negócio Local'
                    ].map((type) => (
                      <button
                        key={type}
                        onClick={() => {
                          setBusinessType(type);
                          setTriageStep(2);
                        }}
                        className="w-full text-left p-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 hover:border-[#d4af37]/60 text-zinc-300 hover:text-white transition-colors flex items-center justify-between"
                      >
                        <span>{type}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-[#d4af37]" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {triageStep === 2 && (
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-zinc-900/80 border border-zinc-800 text-zinc-300">
                    <p className="text-[11px] text-zinc-400">Como se chama seu negócio e sua cidade?</p>
                  </div>

                  <div className="space-y-2">
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Nome da sua empresa..."
                      className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-white text-xs placeholder:text-zinc-400 focus:outline-none focus:border-[#d4af37]"
                    />
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Cidade e Estado (Ex: Maringá - PR)..."
                      className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-white text-xs placeholder:text-zinc-400 focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => setTriageStep(1)}
                      className="px-3 py-2 rounded-lg text-zinc-400 hover:text-white bg-zinc-900 text-[11px]"
                    >
                      Voltar
                    </button>
                    <button
                      disabled={!companyName}
                      onClick={() => setTriageStep(3)}
                      className="flex-1 py-2 rounded-lg bg-[#d4af37] text-black font-bold disabled:opacity-40 text-xs text-center"
                    >
                      Avançar
                    </button>
                  </div>
                </div>
              )}

              {triageStep === 3 && (
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-zinc-900/80 border border-zinc-800 text-zinc-300">
                    <p className="text-[11px] text-zinc-400">Qual é o seu principal objetivo agora?</p>
                  </div>

                  <div className="space-y-1.5">
                    {[
                      'Quero uma demonstração visual gratuita',
                      'Preciso de cardápio digital ou vitrine',
                      'Organizar presença no Google Maps e endereço',
                      'Automação e respostas no WhatsApp',
                      'Preços e contratação de pacote'
                    ].map((goal) => (
                      <button
                        key={goal}
                        onClick={() => setMainGoal(goal)}
                        className={`w-full text-left p-2 rounded-lg text-xs border transition-colors ${
                          mainGoal === goal
                            ? 'bg-[#d4af37]/20 border-[#d4af37] text-white font-medium'
                            : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-white'
                        }`}
                      >
                        {goal}
                      </button>
                    ))}
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={handleFinishTriage}
                      className="w-full py-2.5 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-colors"
                    >
                      <MessageSquare className="w-4 h-4 fill-white" />
                      <span>FALAR COM A EQUIPE</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      )}

      {/* Floating Button Verde */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white shadow-[0_4px_25px_rgba(37,211,102,0.4)] transition-all hover:scale-105 active:scale-95"
        aria-label="Falar com Assistente - Elisângela"
        title="Falar com Assistente - Elisângela"
      >
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-300 border-2 border-[#090a0c] animate-ping" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[#090a0c]" />
        
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageSquare className="w-6 h-6 text-white fill-white" />
        )}
      </button>

    </div>
  );
};

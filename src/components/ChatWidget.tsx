import { useEffect, useRef, useState } from 'react';

const MOBILE_CHAT_MQ = '(max-width: 639px)';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';

export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  text: string;
};

type Props = {
  phone: string;
  phoneTel: string;
};

export function ChatWidget({ phone, phoneTel }: Props) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'welcome',
      role: 'assistant',
      text: `Hi — you’re chatting with Gurudev Anand support. Ask us about consultations, timings, or book a slot. We reply during business hours, or call ${phone} anytime.`,
    },
  ]);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => inputRef.current?.focus(), 320);
    return () => window.clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, open]);

  useEffect(() => {
    if (!open) return;
    const saved = document.body.style.overflow;
    const mq = window.matchMedia(MOBILE_CHAT_MQ);
    const sync = () => {
      document.body.style.overflow = mq.matches ? 'hidden' : saved;
    };
    sync();
    mq.addEventListener('change', sync);
    return () => {
      mq.removeEventListener('change', sync);
      document.body.style.overflow = saved;
    };
  }, [open]);

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    setDraft('');
    const userMsg: ChatMessage = { id: crypto.randomUUID(), role: 'user', text };
    setMessages((m) => [...m, userMsg]);

    window.setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          text: `Thank you — we’ve received your message and will reply as soon as we can. For urgent help, phone ${phone}.`,
        },
      ]);
    }, 650);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <>
      {open && (
        <button
          type="button"
          className="fixed inset-0 z-[89] bg-royal-900/50 backdrop-blur-[2px] sm:hidden animate-fade-in touch-manipulation"
          aria-label="Close chat"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className="fixed z-[90] flex flex-col font-sans pointer-events-none
          inset-x-0 bottom-0 max-sm:gap-2
          pb-[max(0.75rem,env(safe-area-inset-bottom,0px))]
          pl-[max(0.75rem,env(safe-area-inset-left,0px))]
          pr-[max(0.75rem,env(safe-area-inset-right,0px))]
          pt-2
          sm:inset-auto sm:left-auto sm:right-5 sm:bottom-5 sm:top-auto sm:max-w-none sm:gap-3 sm:p-0 sm:pt-0
          items-stretch sm:items-end"
      >
        {open && (
          <div
            id="chat-widget-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="chat-widget-title"
            className="pointer-events-auto flex min-h-0 w-full flex-col overflow-hidden rounded-t-[1.75rem] border border-slate-100 border-b-0 bg-white shadow-premium
              max-sm:max-h-[min(88dvh,100svh)]
              sm:max-h-[min(72vh,520px)] sm:w-[min(100vw-2.5rem,380px)] sm:rounded-3xl sm:border-b
              animate-scale-in max-sm:origin-bottom sm:origin-bottom-right"
          >
            <header className="relative flex flex-shrink-0 items-center gap-3 bg-gradient-to-r from-royal-900 to-royal-700 px-4 py-3.5 text-ink-900 sm:px-5 sm:py-4">
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-royal-900 gold-border">
                <Sparkles size={18} className="text-gold-400" aria-hidden />
              </div>
              <div className="min-w-0 flex-1">
                <div id="chat-widget-title" className="font-sans text-base font-bold leading-tight sm:text-lg">
                  Gurudev Anand
                </div>
                <div className="text-xs text-white/95">We typically reply within a few hours</div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="touch-manipulation rounded-full p-2.5 text-ink-900 transition hover:bg-white/10 min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Close chat"
              >
                <X size={20} />
              </button>
            </header>

            <div
              ref={listRef}
              className="min-h-[min(40dvh,220px)] flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-4 sm:min-h-[200px]"
                style={{
                scrollbarGutter: 'stable',
                background: 'linear-gradient(180deg, #f4f4f4 0%, #ffffff 45%)',
                WebkitOverflowScrolling: 'touch',
              }}
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[min(88%,20rem)] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed sm:max-w-[88%] ${
                      msg.role === 'user'
                        ? 'rounded-br-md bg-royal-800 text-white'
                        : 'rounded-bl-md border border-slate-100 bg-white text-slate-700 shadow-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex-shrink-0 space-y-2 border-t border-slate-100 bg-white p-3 pb-[max(0.75rem,env(safe-area-inset-bottom,0px))] sm:pb-3">
              <div className="flex flex-wrap gap-2">
                <a
                  href={phoneTel}
                  className="inline-flex min-h-[40px] items-center rounded-md bg-section px-3 py-2 text-xs font-semibold text-royal-800 transition hover:text-cta-600 touch-manipulation"
                >
                  Call {phone}
                </a>
              </div>
              <div className="flex items-end gap-2">
                <textarea
                  ref={inputRef}
                  rows={2}
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder="Type your message..."
                  enterKeyHint="send"
                  className="min-h-[44px] flex-1 resize-none rounded-2xl border border-slate-200 px-3.5 py-3 text-base text-charcoal placeholder:text-slate-400 transition focus:border-cta-500 focus:outline-none focus:ring-2 focus:ring-cta-500/25 sm:min-h-0 sm:py-2.5 sm:text-sm"
                />
                <button
                  type="button"
                  onClick={send}
                  disabled={!draft.trim()}
                  className="flex h-12 w-12 flex-shrink-0 touch-manipulation items-center justify-center rounded-md bg-cta-500 text-ink-900 shadow-md transition hover:bg-cta-600 hover:-translate-y-0.5 hover:shadow-lg disabled:translate-y-0 disabled:opacity-45 disabled:shadow-none sm:h-11 sm:w-11"
                  aria-label="Send message"
                >
                  <Send size={18} className="ml-px" />
                </button>
              </div>
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className={`group pointer-events-auto touch-manipulation self-end flex items-center justify-center rounded-full shadow-premium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cta-500 focus-visible:ring-offset-2 max-sm:ring-2 max-sm:ring-white/90 ${
            open
              ? 'h-14 w-14 bg-royal-800 text-ink-900 hover:bg-royal-900'
              : 'h-[3.75rem] w-[3.75rem] bg-cta-500 text-ink-900 hover:bg-cta-600 hover:-translate-y-0.5 hover:shadow-premium sm:h-16 sm:w-16 sm:ring-4 sm:ring-white/90'
          }`}
          aria-expanded={open}
          aria-controls="chat-widget-panel"
        >
          {open ? <X size={24} /> : <MessageCircle size={28} strokeWidth={2} className="transition group-hover:scale-105" />}
        </button>
      </div>
    </>
  );
}

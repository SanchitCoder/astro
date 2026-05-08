import { useEffect, useRef, useState } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';

export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  text: string;
};

type Props = {
  phone: string;
  phoneTel: string;
  onBookConsultation?: () => void;
};

export function ChatWidget({ phone, phoneTel, onBookConsultation }: Props) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'welcome',
      role: 'assistant',
      text: `Hi — you’re chatting with SadhguruANAND support. Ask us about consultations, timings, or book a slot. We reply during business hours, or call ${phone} anytime.`,
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
          text: `Thank you — we’ve received your message and will reply as soon as we can. For urgent help, phone ${phone} or use “Book consultation” below.`,
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
    <div className="fixed bottom-5 right-5 z-[90] flex flex-col items-end gap-3 font-sans">
      {open && (
        <div
          id="chat-widget-panel"
          role="dialog"
          aria-labelledby="chat-widget-title"
          className="w-[min(100vw-2rem,380px)] max-h-[min(72vh,520px)] flex flex-col rounded-3xl bg-white shadow-premium border border-slate-100 overflow-hidden animate-scale-in origin-bottom-right"
        >
          <header className="relative px-5 py-4 bg-gradient-to-r from-royal-900 to-royal-700 text-white flex items-center gap-3">
            <div className="w-11 h-11 rounded-full gold-border flex items-center justify-center flex-shrink-0 bg-royal-900">
              <Sparkles size={18} className="text-gold-400" aria-hidden />
            </div>
            <div className="min-w-0 flex-1">
              <div id="chat-widget-title" className="font-serif text-lg font-semibold leading-tight">
                SadhguruANAND
              </div>
              <div className="text-xs text-white/75">We typically reply within a few hours</div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="p-2 rounded-full hover:bg-white/10 transition text-white"
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </header>

          <div
            ref={listRef}
            className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-[200px]"
            style={{
              scrollbarGutter: 'stable',
              background: 'linear-gradient(180deg, #fdfbf7 0%, #ffffff 45%)',
            }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-royal-800 text-white rounded-br-md'
                      : 'bg-white text-slate-700 border border-slate-100 shadow-sm rounded-bl-md'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-100 p-3 bg-white space-y-2">
            <div className="flex flex-wrap gap-2">
              <a
                href={phoneTel}
                className="text-xs font-semibold text-royal-800 hover:text-gold-600 transition px-2.5 py-1 rounded-full bg-royal-50"
              >
                Call {phone}
              </a>
              {onBookConsultation && (
                <button
                  type="button"
                  onClick={() => {
                    onBookConsultation();
                    setOpen(false);
                  }}
                  className="text-xs font-semibold text-royal-800 hover:text-gold-600 transition px-2.5 py-1 rounded-full bg-gold-400/15"
                >
                  Book consultation
                </button>
              )}
            </div>
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                rows={2}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Type your message..."
                className="flex-1 resize-none rounded-2xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-royal-600/25 focus:border-royal-600 transition"
              />
              <button
                type="button"
                onClick={send}
                disabled={!draft.trim()}
                className="flex-shrink-0 w-11 h-11 rounded-2xl bg-gradient-to-br from-gold-500 to-gold-600 text-white flex items-center justify-center shadow-md hover:shadow-lg hover:-translate-y-0.5 transition disabled:opacity-45 disabled:translate-y-0 disabled:shadow-none"
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
        className={`group flex items-center justify-center rounded-full shadow-premium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 ${
          open
            ? 'w-14 h-14 bg-royal-800 text-white hover:bg-royal-900'
            : 'w-16 h-16 bg-gradient-to-br from-gold-500 to-gold-600 text-white hover:-translate-y-0.5 hover:shadow-premium ring-4 ring-white/90'
        }`}
        aria-expanded={open}
        aria-controls="chat-widget-panel"
      >
        {open ? <X size={24} /> : <MessageCircle size={28} strokeWidth={2} className="group-hover:scale-105 transition" />}
      </button>
    </div>
  );
}

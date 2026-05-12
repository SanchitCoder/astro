import { ChevronDown } from 'lucide-react';

type Props = {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
};

export function AccordionItem({ question, answer, isOpen, onToggle }: Props) {
  return (
    <div
      className={`rounded-2xl border transition ${
        isOpen ? 'bg-white border-royal-100 shadow-premium' : 'bg-white border-slate-100'
      }`}
    >
      <button type="button" onClick={onToggle} className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left">
        <span className="font-semibold text-royal-900">{question}</span>
        <ChevronDown size={20} className={`text-cta-600 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && <div className="px-6 pb-5 text-slate-600 text-sm leading-relaxed">{answer}</div>}
    </div>
  );
}

import { motion, AnimatePresence } from 'framer-motion';
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
      className={`rounded-2xl glass-card border transition-colors duration-300 overflow-hidden ${
        isOpen ? 'border-gold-400/25' : 'border-warm-300 hover:border-orange-200'
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span
          className={`font-semibold text-sm md:text-base transition-colors duration-200 ${
            isOpen ? 'text-gold-300' : 'text-ink-700'
          }`}
        >
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="shrink-0"
        >
          <ChevronDown
            size={18}
            className={`transition-colors duration-200 ${isOpen ? 'text-gold-400' : 'text-ink-400'}`}
          />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 text-ink-500 text-sm leading-relaxed border-t border-warm-200 pt-4">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

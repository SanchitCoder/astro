import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

const PROBLEMS = [
  {
    title: 'Career Confusion',
    line: 'Promotions stall, the right path stays hidden. Gurudev Anand traces the planetary periods shaping your professional life.',
    color: 'from-rose-500/30 to-transparent',
  },
  {
    title: 'Relationship Issues',
    line: 'Marriage delays, compatibility doubts, recurring conflict — deeper chart patterns he reads with care.',
    color: 'from-pink-500/25 to-transparent',
  },
  {
    title: 'Financial Stress',
    line: 'Blocked income and unstable cycles explained through your wealth houses and planetary timing.',
    color: 'from-amber-500/20 to-transparent',
  },
  {
    title: 'Fear & Indecision',
    line: 'Anxiety lifts when the chart is understood. He is known for calm, clear explanations that restore confidence.',
    color: 'from-violet-500/20 to-transparent',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export function PainPointsSection() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-warm-100">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_100%,rgba(11,120,150,0.09),transparent_60%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="section-eyebrow mb-4 block">Why Life Feels Stuck</span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-ink-900 leading-tight">
            Patterns repeat until they are{' '}
            <span className="text-gradient-gold italic font-light">understood</span>
          </h2>
          <p className="mt-4 text-ink-500 text-sm md:text-base leading-relaxed">
            Gurudev Anand names what your chart shows, why it has felt stuck, and what can shift.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto"
        >
          {PROBLEMS.map((p) => (
            <motion.div
              key={p.title}
              variants={cardVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group relative rounded-2xl glass-card glass-card-hover overflow-hidden p-6 cursor-default"
            >
              <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${p.color}`} />
              <div className="mb-4 w-8 h-8 rounded-xl flex items-center justify-center bg-rose-500/12 border border-rose-500/20">
                <Zap size={13} className="text-rose-400" />
              </div>
              <h3 className="font-cinzel text-sm font-bold text-ink-900 tracking-wide mb-2">
                {p.title}
              </h3>
              <p className="text-sm text-ink-500 leading-relaxed">{p.line}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

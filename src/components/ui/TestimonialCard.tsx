import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Star } from 'lucide-react';

export type Testimonial = {
  name: string;
  role: string;
  text: string;
};

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [10, 0, -10]);
  const rotateY = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [-8, 0, 0, 8]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 0.92]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [24, 0, 24]);

  return (
    <motion.article
      ref={ref}
      style={{
        rotateX,
        rotateY,
        scale,
        y,
        transformStyle: 'preserve-3d',
      }}
      className="inline-block w-[min(88vw,320px)] sm:w-[340px] shrink-0 align-top whitespace-normal rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-premium transition-shadow"
    >
      <div className="flex items-center gap-1 text-gold-500 mb-3">
        {[1, 2, 3, 4, 5].map((s) => (
          <Star key={s} size={14} fill="currentColor" />
        ))}
      </div>
      <p className="text-charcoal leading-relaxed text-sm">&ldquo;{testimonial.text}&rdquo;</p>
      <div className="mt-5 flex items-center gap-3 pt-4 border-t border-slate-200">
        <div className="w-10 h-10 rounded-full bg-royal-800 text-gold-400 flex items-center justify-center font-sans text-base font-bold shrink-0">
          {testimonial.name[0]}
        </div>
        <div className="min-w-0">
          <div className="font-bold text-royal-900 text-sm truncate">{testimonial.name}</div>
          <div className="text-xs text-charcoal-muted truncate">{testimonial.role}</div>
        </div>
      </div>
    </motion.article>
  );
}

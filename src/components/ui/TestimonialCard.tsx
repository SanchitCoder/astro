import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

export type Testimonial = {
  name: string;
  role: string;
  text: string;
};

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [8, 0, -8]);
  const rotateY = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [-6, 0, 0, 6]);
  const scale   = useTransform(scrollYProgress, [0, 0.5, 1], [0.93, 1, 0.93]);
  const y       = useTransform(scrollYProgress, [0, 0.5, 1], [20, 0, 20]);

  return (
    <motion.article
      ref={ref}
      style={{ rotateX, rotateY, scale, y, transformStyle: 'preserve-3d', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.5)' }}
      className="inline-block w-[min(88vw,300px)] sm:w-[320px] shrink-0 align-top whitespace-normal rounded-2xl border border-white/[0.08] bg-white/[0.05] backdrop-blur-sm p-5 hover:border-gold-400/20 transition-colors duration-300"
    >
      {/* Quote icon */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex gap-0.5">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star key={s} size={11} className="text-gold-400 fill-gold-400" />
          ))}
        </div>
        <Quote size={14} className="text-white/10" />
      </div>

      {/* Text */}
      <p className="text-white/55 leading-relaxed text-sm">
        &ldquo;{testimonial.text}&rdquo;
      </p>

      {/* Author */}
      <div className="mt-4 flex items-center gap-3 pt-4 border-t border-white/[0.07]">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center font-cinzel text-sm font-bold shrink-0 text-white/80"
          style={{ background: 'linear-gradient(135deg, #062E3C, #0b7896)' }}
        >
          {testimonial.name[0]}
        </div>
        <div className="min-w-0">
          <div className="font-semibold text-white/80 text-sm truncate">{testimonial.name}</div>
          <div className="text-xs text-white/35 truncate">{testimonial.role}</div>
        </div>
      </div>
    </motion.article>
  );
}

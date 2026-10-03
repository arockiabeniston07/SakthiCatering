import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, animate, useTransform, useScroll, useReducedMotion } from 'framer-motion';
import { siteConfig } from '../data/siteConfig';

const Counter = ({ value, suffix, label, subLabel }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const display = useTransform(rounded, (latest) => latest.toLocaleString());
  const [hasTriggered, setHasTriggered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (hasTriggered) {
      if (shouldReduceMotion) {
        count.set(value);
      } else {
        const controls = animate(count, value, {
          duration: 3,
          ease: [0.16, 1, 0.3, 1] // Custom smooth ease-out
        });
        return controls.stop;
      }
    }
  }, [hasTriggered, value, count, shouldReduceMotion]);

  return (
    <motion.div
      onViewportEnter={() => setHasTriggered(true)}
      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
      className="flex flex-col items-center text-center"
    >
      <div className="text-4xl md:text-5xl lg:text-6xl font-serif text-luxury-cream mb-2 flex items-center justify-center">
        <motion.span>{display}</motion.span>
        <motion.span 
          initial={{ opacity: 0, textShadow: "0 0 0px rgba(212, 175, 55, 0)" }}
          animate={hasTriggered ? { 
            opacity: 1, 
            textShadow: ["0 0 0px rgba(212,175,55,0)", "0 0 15px rgba(212,175,55,0.4)", "0 0 5px rgba(212,175,55,0.1)"]
          } : { opacity: 0 }}
          transition={{ duration: 1.5, delay: 0.2, times: [0, 0.5, 1] }}
          className="text-luxury-gold inline-block"
        >
          {suffix}
        </motion.span>
      </div>
      <div className="flex flex-col items-center gap-1 mt-2">
        <div className="text-sm md:text-base text-luxury-cream">
          {label}
        </div>
        <div className="text-[10px] md:text-xs text-luxury-muted tracking-[0.2em] uppercase">
          {subLabel}
        </div>
      </div>
    </motion.div>
  );
};

const Stats = () => {
  const sectionRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Very subtle parallax - only apply if user hasn't requested reduced motion
  const y = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [20, -20]);

  return (
    <section ref={sectionRef} className="relative py-20 border-y border-luxury-gray overflow-hidden">
      {/* Background Cinematic Layer */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/image/15.jpg" 
          alt="Stats Background" 
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover motion-safe:animate-cinematic-video motion-reduce:animate-none"
        />
        <div className="absolute inset-0 bg-luxury-black/90 md:bg-luxury-black/85 z-10" />
      </div>

      <motion.div 
        style={{ y }}
        className="relative z-20 container mx-auto px-6 md:px-12"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {siteConfig.stats.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut" }}
            >
              <Counter value={stat.value} suffix={stat.suffix} label={stat.label} subLabel={stat.subLabel} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Stats;

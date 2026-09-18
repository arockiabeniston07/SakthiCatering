import React from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '../data/siteConfig';

const FinalCTA = () => {
  return (
    <section className="relative py-32 md:py-48 bg-luxury-black overflow-hidden">
      {/* Background Cinematic Layer */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/image/backg.webp" 
          alt="Final CTA Background" 
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover motion-safe:animate-cinematic-video motion-reduce:animate-none"
        />
        <div className="absolute inset-0 bg-luxury-black/90 md:bg-luxury-black/85 z-10" />
      </div>

      <div className="relative z-20 container mx-auto px-6 md:px-12 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-serif text-5xl md:text-7xl text-luxury-cream mb-6 leading-tight">
            YOUR EVENT.<br />
            <span className="text-luxury-gold italic">OUR TABLE.</span>
          </h2>
          <p className="text-luxury-muted text-lg max-w-xl mx-auto mb-2">
            Let's create a celebration worth remembering.
          </p>
          <p className="font-tamil text-luxury-muted text-lg max-w-xl mx-auto mb-12 tracking-wide">
            உங்கள் நிகழ்வு. எங்கள் விருந்து.
          </p>

          <div className="flex justify-center">
            <button 
              onClick={() => document.getElementById('plan')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-4 bg-luxury-gold text-luxury-black text-sm tracking-widest hover:bg-luxury-cream transition-colors duration-300"
            >
              ENQUIRE NOW &rarr;
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;

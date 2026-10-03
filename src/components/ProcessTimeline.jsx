import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const steps = [
  { id: '01', title: 'TELL US', video: '/image/hero.mp4' },
  { id: '02', title: 'WE PLAN', video: '/image/hero.mp4' },
  { id: '03', title: 'WE PREPARE', video: '/image/hero.mp4' },
  { id: '04', title: 'WE SERVE', video: '/image/hero.mp4' },
  { id: '05', title: 'YOU CELEBRATE', video: '/image/hero.mp4' },
];

const ProcessTimeline = () => {
  const [activeStep, setActiveStep] = useState(null);
  
  const handleMouseEnter = (id) => {
    if (window.matchMedia('(hover: hover)').matches) {
      setActiveStep(id);
    }
  };

  const handleMouseLeave = () => {
    if (window.matchMedia('(hover: hover)').matches) {
      setActiveStep(null);
    }
  };

  const handleClick = (id) => {
    if (!window.matchMedia('(hover: hover)').matches) {
      setActiveStep(prev => prev === id ? null : id);
    }
  };

  return (
    <section className="relative overflow-hidden py-24 md:py-32 border-y border-luxury-gray min-h-[500px]">
      {/* Background Cinematic Layer */}
      <div className="absolute inset-0 z-0 bg-luxury-black">
        <img 
          src="/image/buffeyabout.jpg" 
          alt="How We Make It Happen Background" 
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover"
        />
        
        {/* Videos for each step */}
        <AnimatePresence>
          {activeStep && (
            <motion.video
              key={activeStep}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
              src={steps.find(s => s.id === activeStep)?.video}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover z-0"
              style={{ pointerEvents: 'none' }}
            />
          )}
        </AnimatePresence>

        <div className="absolute inset-0 bg-luxury-black/90 md:bg-luxury-black/85 z-10" />
      </div>

      <div className="relative z-20 container mx-auto px-6 md:px-12">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-3xl md:text-5xl text-luxury-cream mb-4"
          >
            நாங்கள் எப்படி <span className="text-luxury-gold italic">செயல்படுகிறோம்</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-luxury-muted text-sm md:text-base font-light tracking-widest uppercase"
          >
            HOW WE MAKE IT HAPPEN
          </motion.p>
        </div>

        <div className="relative">
          {/* Horizontal Line for Desktop */}
          <div className="hidden md:block absolute top-[56px] lg:top-[64px] left-0 w-full h-[1px] bg-luxury-muted/20" />

          <div className="flex flex-col md:flex-row gap-8 md:gap-0 relative z-10 justify-between items-center md:items-start h-full">
            {steps.map((step, index) => (
              <motion.div 
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="flex flex-col items-center text-center md:flex-1 relative cursor-pointer group"
                onMouseEnter={() => handleMouseEnter(step.id)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleClick(step.id)}
              >
                <div 
                  className={`w-32 h-32 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full bg-luxury-black border ${activeStep === step.id ? 'border-luxury-gold shadow-[0_0_20px_rgba(212,175,55,0.3)]' : 'border-luxury-gold/30 group-hover:border-luxury-gold/60'} flex justify-center items-center relative z-10 shadow-lg transition-all duration-500 p-4 mx-auto`}
                >
                  <span className={`text-luxury-gold text-xs md:text-[10px] lg:text-xs text-center tracking-widest uppercase leading-relaxed whitespace-normal break-words transition-colors duration-500 ${activeStep === step.id ? 'text-luxury-cream scale-105' : ''}`}>
                    {step.title}
                  </span>
                </div>
                
                {/* Mobile vertical line connecting circles */}
                {index !== steps.length - 1 && (
                  <div className="md:hidden w-[1px] h-8 bg-luxury-muted/20 absolute top-32 left-1/2 -translate-x-1/2" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessTimeline;

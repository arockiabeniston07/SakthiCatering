import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  { id: '01', title: 'TELL US', desc: 'Share your event details, vision, and preferences.' },
  { id: '02', title: 'WE PLAN', desc: 'We shape the menu, determine quantities, and organize service.' },
  { id: '03', title: 'WE PREPARE', desc: 'Sourcing fresh ingredients and careful culinary preparation.' },
  { id: '04', title: 'WE SERVE', desc: 'Flawless, professional service at your venue.' },
  { id: '05', title: 'YOU CELEBRATE', desc: 'You enjoy the moment, we handle the rest.' },
];

const ProcessTimeline = () => {
  return (
    <section className="relative overflow-hidden py-24 md:py-32 border-y border-luxury-gray">
      {/* Background Cinematic Layer */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/image/buffeyabout.jpg" 
          alt="How We Make It Happen Background" 
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover motion-safe:animate-cinematic-video motion-reduce:animate-none"
        />
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
            HOW WE MAKE IT <span className="text-luxury-gold italic">HAPPEN</span>
          </motion.h2>
        </div>

        <div className="relative">
          {/* Horizontal Line for Desktop */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-[1px] bg-luxury-muted/20" />

          <div className="flex flex-col md:flex-row gap-12 md:gap-0 relative z-10 justify-between">
            {steps.map((step, index) => (
              <motion.div 
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="flex flex-col items-center text-center md:flex-1 relative"
              >
                {/* Number Circle */}
                <div className="w-24 h-24 rounded-full bg-luxury-black border border-luxury-gold/30 flex justify-center items-center mb-8 relative z-10 shadow-lg">
                  <span className="text-luxury-gold font-serif text-xl">{step.id}</span>
                </div>
                
                {/* Mobile vertical line connecting circles */}
                {index !== steps.length - 1 && (
                  <div className="md:hidden w-[1px] h-12 bg-luxury-muted/20 absolute top-24 left-1/2 -translate-x-1/2" />
                )}

                <h3 className="text-luxury-cream text-lg tracking-widest mb-4">{step.title}</h3>
                <p className="text-luxury-muted text-sm font-light px-4 md:px-6">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessTimeline;

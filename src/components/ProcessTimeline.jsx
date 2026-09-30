import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  { 
    id: '01', 
    title: 'எங்களிடம் கூறுங்கள்', subtitle: 'TELL US', 
    desc: 'உங்கள் நிகழ்வின் விவரங்கள், எதிர்பார்ப்புகள் மற்றும் விருப்பங்களை பகிரவும்.', subDesc: 'Share your event details, vision, and preferences.' 
  },
  { 
    id: '02', 
    title: 'நாங்கள் திட்டமிடுகிறோம்', subtitle: 'WE PLAN', 
    desc: 'நாங்கள் மெனுவை உருவாக்குகிறோம், அளவுகளை தீர்மானிக்கிறோம் மற்றும் சேவையை ஏற்பாடு செய்கிறோம்.', subDesc: 'We shape the menu, determine quantities, and organize service.' 
  },
  { 
    id: '03', 
    title: 'நாங்கள் தயாரிக்கிறோம்', subtitle: 'WE PREPARE', 
    desc: 'புதிய பொருட்களை பெற்று கவனமாக சமையல் தயாரிப்பு செய்கிறோம்.', subDesc: 'Sourcing fresh ingredients and careful culinary preparation.' 
  },
  { 
    id: '04', 
    title: 'நாங்கள் பரிமாறுகிறோம்', subtitle: 'WE SERVE', 
    desc: 'உங்கள் இடத்தில் குறைபாடற்ற, தொழில்முறை சேவை வழங்குகிறோம்.', subDesc: 'Flawless, professional service at your venue.' 
  },
  { 
    id: '05', 
    title: 'நீங்கள் கொண்டாடுங்கள்', subtitle: 'YOU CELEBRATE', 
    desc: 'நீங்கள் தருணத்தை மகிழ்ந்து கொண்டாடுங்கள், மற்றவற்றை நாங்கள் கையாளுகிறோம்.', subDesc: 'You enjoy the moment, we handle the rest.' 
  },
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

                <h3 className="text-luxury-cream text-lg tracking-widest mb-1">{step.title}</h3>
                <p className="text-luxury-gold text-[10px] md:text-xs tracking-widest uppercase mb-4 opacity-80">{step.subtitle}</p>
                <p className="text-luxury-muted text-sm font-light px-4 md:px-6 mb-2">{step.desc}</p>
                <p className="text-luxury-muted text-[10px] md:text-xs font-light px-4 md:px-6 opacity-70">{step.subDesc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessTimeline;

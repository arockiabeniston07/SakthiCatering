import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { siteConfig } from '../data/siteConfig';

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section id="home" className="relative min-h-[100svh] w-full overflow-hidden bg-luxury-black flex flex-col">
      {/* Background Cinematic Layer */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster={siteConfig.hero.image}
          className="absolute inset-0 w-full h-full object-cover motion-reduce:hidden"
        >
          <source src="/image/hero.mp4" type="video/mp4" />
        </video>
        <img
          src={siteConfig.hero.image}
          alt="Catering Experience Hero Fallback"
          className="hidden motion-reduce:block absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-luxury-black/60 z-10" />
      </motion.div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 md:px-12 flex-1 flex flex-col justify-center items-center text-center pt-32 pb-20 md:pt-20 md:pb-0">
        <motion.div
          style={{ opacity }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
        >
          <h1 className="font-tamil text-5xl md:text-7xl lg:text-8xl text-luxury-cream mb-4 md:mb-6 max-w-5xl leading-[1.1] font-medium tracking-wide break-words">
            நினைவில் நிற்கும்<br />
            <span className="text-luxury-gold italic">விருந்து.</span>
          </h1>
          <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-luxury-cream mb-8 md:mb-12 uppercase">
            A TABLE WORTH REMEMBERING.
          </h2>
          <div className="text-luxury-muted text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light">
            <p className="mb-2">திருமணங்கள், கொண்டாட்டங்கள், பெருநிறுவன நிகழ்வுகள் மற்றும் மறக்க முடியாத தருணங்களுக்கான சிறப்பான உணவு சேவை.</p>
            <p className="text-sm md:text-base opacity-80 uppercase">{siteConfig.hero.subheading}</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a 
              href={`https://wa.me/${siteConfig.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Enquire on WhatsApp"
              className="px-8 py-3 bg-luxury-gold text-luxury-black text-sm md:text-base tracking-widest hover:bg-luxury-cream transition-colors duration-300 flex items-center justify-center uppercase"
            >
              ENQUIRE ON WHATSAPP &rarr;
            </a>
            <a 
              href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
              aria-label="Call Us"
              className="px-8 py-3 border border-luxury-muted text-luxury-cream text-sm md:text-base tracking-widest hover:border-luxury-gold hover:text-luxury-gold transition-colors duration-300 flex items-center justify-center uppercase"
            >
              CALL US &rarr;
            </a>
          </div>
        </motion.div>
      </div>

    </section>
  );
};

export default Hero;

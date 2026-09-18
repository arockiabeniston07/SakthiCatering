import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="relative overflow-hidden py-24 md:py-32 border-t border-luxury-gray">
      {/* Background Cinematic Layer */}
      <div className="absolute inset-0 z-0">
        <img 
          src="image\h1.avif" 
          alt="Elegant Restaurant Background" 
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover motion-safe:animate-cinematic-video motion-reduce:animate-none"
        />
        <div className="absolute inset-0 bg-luxury-black/90 md:bg-luxury-black/85 z-10" />
      </div>

      <div className="relative z-20 container mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-center">
          
          {/* LEFT SIDE: Image Collage (50-55%) */}
          <div className="w-full lg:w-[55%] relative">
            
            {/* Desktop Collage */}
            <div className="hidden lg:grid grid-cols-2 grid-rows-3 gap-4 xl:gap-6 w-full h-[600px] xl:h-[700px]">
              {/* IMAGE 1: Large vertical portrait (Left side) */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="col-span-1 row-span-3 rounded-sm overflow-hidden shadow-2xl"
              >
                <img 
                  src="image/o1.png" 
                  alt="Elegant service" 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* IMAGE 2: Circular Logo (Upper Right) */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="col-span-1 row-span-1 place-self-center w-3/4 max-w-[220px] xl:max-w-[260px] aspect-square rounded-full overflow-hidden shadow-xl border-2 border-luxury-gold"
              >
                <img 
                  src="image/logos.png" 
                  alt="Sakthi Logo" 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center"
                />
              </motion.div>

              {/* IMAGE 3: Large vertical portrait (Bottom Right) */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="col-span-1 row-span-2 rounded-sm overflow-hidden shadow-2xl"
              >
                <img 
                  src="image/o2.jpeg" 
                  alt="Fine details" 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>

            {/* Mobile/Tablet Collage */}
            <div className="lg:hidden flex flex-col gap-4 md:gap-6 w-full">
              {/* IMAGE 1: Tall */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="w-full aspect-[4/5] md:aspect-square rounded-sm overflow-hidden shadow-2xl"
              >
                <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop" alt="Elegant service" loading="lazy" decoding="async" className="w-full h-full object-cover" />
              </motion.div>
              {/* IMAGE 2: Circular Logo */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="w-2/3 md:w-1/2 mx-auto aspect-square rounded-full overflow-hidden shadow-xl border-2 border-luxury-gold"
              >
                <img src="image/logos.png" alt="Sakthi Logo" loading="lazy" decoding="async" className="w-full h-full object-cover object-center" />
              </motion.div>
              {/* IMAGE 3: Portrait */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="w-full aspect-[4/5] md:aspect-square rounded-sm overflow-hidden shadow-2xl"
              >
                <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop" alt="Fine details" loading="lazy" decoding="async" className="w-full h-full object-cover" />
              </motion.div>
            </div>
            
          </div>

          {/* RIGHT SIDE: Text Content (approx 45%) */}
          <div className="w-full lg:w-[45%] flex flex-col justify-center lg:pl-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-luxury-gold text-xs md:text-sm tracking-widest mb-4 uppercase">About Us</p>
              
              <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] text-luxury-cream mb-4 leading-tight">
                WE CREATE MORE THAN MENUS.<br />
                <span className="text-luxury-gold italic">WE CREATE TABLES PEOPLE REMEMBER.</span>
              </h2>
              
              <p className="text-luxury-muted text-base md:text-lg tracking-wide font-light mb-12">
                உணவை மட்டும் வழங்குவதில்லை. நினைவில் நிற்கும் விருந்தை உருவாக்குகிறோம்.
              </p>

              <div className="space-y-10 text-luxury-muted font-light leading-relaxed">
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h3 className="text-luxury-cream text-sm md:text-base tracking-widest mb-3 uppercase">Our Story</h3>
                  <p className="text-sm md:text-base">Every celebration deserves a table worth remembering. We bring together thoughtful menus, traditional flavours and elegant presentation to make every gathering feel special.</p>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <h3 className="text-luxury-cream text-sm md:text-base tracking-widest mb-3 uppercase">Our Speciality</h3>
                  <p className="text-sm md:text-base">We blend timeless recipes with modern presentation, creating catering experiences that feel familiar, refined and unforgettable.</p>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <h3 className="text-luxury-cream text-sm md:text-base tracking-widest mb-3 uppercase">Our Promise</h3>
                  <p className="text-sm md:text-base">From the first dish to the final plate, we focus on quality ingredients, beautiful presentation and dependable service.</p>
                </motion.div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;

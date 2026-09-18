import React from 'react';
import { motion } from 'framer-motion';
import EventForm from './EventForm';
import { siteConfig } from '../data/siteConfig';
const Contact = ({ selectedMenuItems, removeMenuItem }) => {
  return (
    <section id="contact" className="relative overflow-hidden py-24 md:py-32 border-t border-luxury-gray">
      {/* Background Cinematic Layer */}
      <div className="absolute inset-0 z-0">
        <img 
          src="image\h6.jpg" 
          alt="Elegant Event Background" 
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover motion-safe:animate-cinematic-video motion-reduce:animate-none"
        />
        <div className="absolute inset-0 bg-luxury-black/95 md:bg-luxury-black/90 z-10" />
      </div>

      <div className="relative z-20 container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-luxury-gold text-sm tracking-widest mb-4">GET IN TOUCH</p>
          <h2 className="font-serif text-4xl md:text-5xl text-luxury-cream mb-4">
            LET'S TALK <span className="text-luxury-gold italic">DETAILS</span>
          </h2>
          <p className="text-luxury-muted text-lg font-light tracking-wide">
            தொடர்புக்கு
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 text-center max-w-4xl mx-auto">
          <div className="p-8 border border-luxury-muted/20 bg-luxury-black/30 flex flex-col items-center">
            <h3 className="text-luxury-gold text-sm tracking-widest mb-4">PHONE</h3>
            <p className="text-luxury-cream font-light mb-6">{siteConfig.phone}</p>
            <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`} className="mt-auto px-6 py-2 border border-luxury-gold text-luxury-gold text-xs tracking-widest hover:bg-luxury-gold hover:text-luxury-black transition-colors w-full sm:w-auto">
              CALL US
            </a>
          </div>
          <div className="p-8 border border-luxury-muted/20 bg-luxury-black/30 flex flex-col items-center">
            <h3 className="text-luxury-gold text-sm tracking-widest mb-4">WHATSAPP</h3>
            <p className="text-luxury-cream font-light mb-6">{siteConfig.phone}</p>
            <a href={`https://wa.me/${siteConfig.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="mt-auto px-6 py-2 bg-luxury-gold text-luxury-black text-xs tracking-widest hover:bg-luxury-cream transition-colors w-full sm:w-auto">
              WHATSAPP US
            </a>
          </div>
          <div className="p-8 border border-luxury-muted/20 bg-luxury-black/30 flex flex-col items-center">
            <h3 className="text-luxury-gold text-sm tracking-widest mb-4">EMAIL</h3>
            <p className="text-luxury-cream font-light mb-6 text-[clamp(12px,3.5vw,16px)] tracking-tight">
              {siteConfig.email.split('@')[0]}@<wbr/>{siteConfig.email.split('@')[1]}
            </p>
            <a href={`mailto:${siteConfig.email}`} className="mt-auto px-6 py-2 border border-luxury-muted text-luxury-cream text-xs tracking-widest hover:border-luxury-cream hover:text-luxury-black hover:bg-luxury-cream transition-colors w-full sm:w-auto">
              EMAIL US
            </a>
          </div>
        </div>

        {/* Existing Event Form acts as the Enquiry form inside the Contact section */}
        <EventForm 
          selectedMenuItems={selectedMenuItems} 
          removeMenuItem={removeMenuItem} 
        />

      </div>
    </section>
  );
};

export default Contact;

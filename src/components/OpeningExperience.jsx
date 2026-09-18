import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '../data/siteConfig';
import BrandLogo from './BrandLogo';

const OpeningExperience = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Lock scroll
    document.body.style.overflow = 'hidden';
    
    // Simulate loading completion after a set duration
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3200);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleExitComplete = () => {
    document.body.style.overflow = 'auto';
    onComplete();
  };

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col justify-center items-center px-6 overflow-hidden bg-luxury-black"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Cinematic Background Layer */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=2070&auto=format&fit=crop" 
              alt="Loading Background" 
              className="w-full h-full object-cover motion-safe:animate-cinematic-video motion-reduce:animate-none"
            />
            <div className="absolute inset-0 bg-luxury-black/90 z-10" />
          </div>

          <div className="relative z-20 flex flex-col items-center w-full max-w-sm">
            {/* Brand / Logo */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
              className="mb-8 w-full max-w-full flex justify-center"
            >
              <BrandLogo variant="loading" align="center" />
            </motion.div>

            {/* Main Loading Text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 1 }}
              className="text-luxury-gold text-xs tracking-[0.3em] uppercase font-light mb-16 text-center"
            >
              Curating your experience
            </motion.p>

            {/* Elegant Gold Loading Indicator */}
            <motion.div 
              className="w-48 h-[1px] bg-luxury-muted/20 relative overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              <motion.div
                className="absolute top-0 left-0 h-full bg-luxury-gold"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.0, delay: 1.2, ease: "easeInOut" }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OpeningExperience;

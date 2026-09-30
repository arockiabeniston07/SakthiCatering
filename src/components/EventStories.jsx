import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

const galleryImages = [
  { id: 1, src: "/image/g1.jpeg", alt: "Traditional wedding catering setup", span: "md:col-span-2 md:row-span-2" },
  { id: 2, src: "/image/g2.jpeg", alt: "Corporate gala dinner", span: "md:col-span-1 md:row-span-1" },
  { id: 3, src: "/image/g3.jpeg", alt: "Elegant service", span: "md:col-span-1 md:row-span-2" },
  { id: 4, src: "/image/aboutvaazhai.jpeg", alt: "Artisanal plating", span: "md:col-span-2 md:row-span-1" },
  { id: 5, src: "/image/g5.jpg", alt: "Family celebration setup", span: "md:col-span-1 md:row-span-1" },
  { id: 6, src: "/image/g6.webp", alt: "Premium ingredients", span: "md:col-span-2 md:row-span-2" },
  { id: 7, src: "/image/g4.jpeg", alt: "Fine dining detail", span: "md:col-span-1 md:row-span-1" }
];

const EventStories = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const openLightbox = (index) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);

  const nextImage = useCallback((e) => {
    if (e) e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
    }
  }, [selectedIndex]);

  const prevImage = useCallback((e) => {
    if (e) e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
    }
  }, [selectedIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, nextImage, prevImage]);

  // Touch swipe support
  const minSwipeDistance = 50;
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) nextImage();
    if (isRightSwipe) prevImage();
  };

  return (
    <section id="gallery" className="relative overflow-hidden py-24 md:py-32 border-t border-luxury-gray">
      {/* Background Cinematic Layer */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/image/backg.webp" 
          alt="Event Gallery Background" 
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover motion-safe:animate-cinematic-video motion-reduce:animate-none"
        />
        <div className="absolute inset-0 bg-luxury-black/90 md:bg-luxury-black/85 z-10" />
      </div>

      <div className="relative z-20 container mx-auto px-6 md:px-12">
        <div className="text-center md:text-left mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-luxury-cream mb-4"
          >
            நாங்கள் பரிமாறிய <br className="hidden md:block" />
            <span className="text-luxury-gold italic">நினைவுகள்</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-luxury-muted text-lg tracking-wide font-light uppercase"
          >
            MOMENTS WE'VE SERVED
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[300px] md:auto-rows-[250px]">
          {galleryImages.map((img, i) => (
            <motion.div 
              key={img.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`relative group cursor-pointer overflow-hidden rounded-md w-full h-full ${img.span}`}
              onClick={() => openLightbox(i)}
            >
              <img 
                src={img.src} 
                alt={img.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-all duration-700 ease-out md:group-hover:scale-[1.03] md:group-hover:brightness-110"
              />
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 flex justify-center"
        >
          <a 
            href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent("Hi Sakthi Catering, I am planning a celebration and would like to talk.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 border border-luxury-gold text-luxury-gold text-[14px] md:text-base tracking-widest hover:bg-luxury-gold hover:text-luxury-black transition-colors duration-300 flex flex-col items-center justify-center"
          >
            <span>உங்கள் நிகழ்வை திட்டமிடுகிறீர்களா? பேசுவோம் &rarr;</span>
            <span className="text-[10px] uppercase opacity-80 mt-1">PLANNING YOUR CELEBRATION? LET'S TALK &rarr;</span>
          </a>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center select-none"
            onClick={closeLightbox}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <button 
              aria-label="Close gallery"
              className="absolute top-6 right-6 md:top-8 md:right-8 text-white/70 hover:text-white transition-colors z-[110]"
              onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
            >
              <X size={36} strokeWidth={1.5} />
            </button>

            <button 
              aria-label="Previous image"
              className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-2 z-[110]"
              onClick={prevImage}
            >
              <ChevronLeft size={48} strokeWidth={1} />
            </button>

            <button 
              aria-label="Next image"
              className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-2 z-[110]"
              onClick={nextImage}
            >
              <ChevronRight size={48} strokeWidth={1} />
            </button>

            <div 
              className="relative w-full max-w-6xl h-full max-h-[85vh] px-4 md:px-24 flex items-center justify-center flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                key={selectedIndex}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                src={galleryImages[selectedIndex].src}
                alt={galleryImages[selectedIndex].alt}
                className="w-auto h-auto max-w-full max-h-full object-contain shadow-2xl rounded-sm"
                draggable={false}
              />
              <div className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 text-luxury-muted tracking-widest text-sm font-light">
                {String(selectedIndex + 1).padStart(2, '0')} / {String(galleryImages.length).padStart(2, '0')}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default EventStories;

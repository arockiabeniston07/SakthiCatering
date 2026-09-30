import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '../data/siteConfig';

const celebrations = [
  {
    id: 'Wedding Catering',
    title: 'திருமண விருந்து',
    subtitle: 'WEDDING CATERING',
    image: '/image/wedd.webp'
  },
  {
    id: 'Reception',
    title: 'வரவேற்பு',
    subtitle: 'RECEPTION',
    image: '/image/re.webp'
  },
  {
    id: 'Engagement',
    title: 'நிச்சயதார்த்தம்',
    subtitle: 'ENGAGEMENT',
    image: '/image/eng.jpg'
  },
  {
    id: 'Birthday',
    title: 'பிறந்தநாள்',
    subtitle: 'BIRTHDAY',
    image: '/image/birth.webp'
  },
  {
    id: 'Housewarming',
    title: 'புதுமனை புகுவிழா',
    subtitle: 'HOUSEWARMING',
    image: '/image/house.jpg'
  },
  {
    id: 'Outdoor Catering',
    title: 'வெளிப்புற விருந்து',
    subtitle: 'OUTDOOR CATERING',
    image: '/image/out.jpg'
  },
  {
    id: 'Live Food Counters',
    title: 'நேரடி உணவு கவுண்டர்கள்',
    subtitle: 'LIVE FOOD COUNTERS',
    image: '/image/buffeyabout.jpg'
  }
];

const CelebrationSelector = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    // Check if there is already a selected event in local storage
    const savedEvent = localStorage.getItem('tce_selected_event');
    if (savedEvent) {
      setSelectedEvent(savedEvent);
    }
  }, []);

  const handleSelect = (id) => {
    setSelectedEvent(id);
    localStorage.setItem('tce_selected_event', id);
  };

  return (
    <section className="relative overflow-hidden py-24 md:py-32 z-20">
      {/* Background Cinematic Layer */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/image/servicesback.jpg" 
          alt="Outdoor Catering Background" 
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover motion-safe:animate-cinematic-video motion-reduce:animate-none"
        />
        <div className="absolute inset-0 bg-luxury-black/90 z-10" />
      </div>

      <div className="relative z-20 container mx-auto px-6 md:px-12 mb-16 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-serif text-4xl md:text-6xl text-luxury-cream mb-4"
        >
          என்ன நிகழ்வை <br className="md:hidden"/>
          <span className="text-luxury-gold italic">கொண்டாடுகிறீர்கள்?</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-luxury-muted text-lg font-light tracking-wide uppercase"
        >
          WHAT ARE YOU CELEBRATING?
        </motion.p>
      </div>

      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 md:gap-6 w-full">
          {celebrations.map((item, index) => {
            const lgColSpan = index < 4 ? "lg:col-span-3" : "lg:col-span-4";
            const isSelected = selectedEvent === item.id;

            return (
              <motion.div
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`relative ${lgColSpan} sm:col-span-1 h-[180px] md:h-[220px] rounded-lg overflow-hidden cursor-pointer group transition-all duration-500 ${
                  isSelected ? 'ring-2 ring-luxury-gold shadow-[0_0_20px_rgba(212,175,55,0.2)]' : 'ring-1 ring-luxury-gray hover:ring-luxury-gold/50'
                }`}
                whileTap={{ scale: 0.98 }}
              >
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                  <div className={`absolute inset-0 z-10 transition-colors duration-500 ${
                    isSelected ? 'bg-luxury-black/50' : 'bg-luxury-black/70 group-hover:bg-luxury-black/60'
                  }`} />
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    loading="lazy"
                    decoding="async"
                    className={`w-full h-full object-cover transition-transform duration-1000 ${
                      isSelected ? 'scale-110' : 'scale-100 group-hover:scale-105'
                    }`}
                  />
                </div>

                {/* Content */}
                <div className="relative z-20 flex flex-col items-center justify-center w-full h-full text-center p-4">
                  <h3 className={`font-serif text-xl md:text-2xl transition-colors duration-300 mb-1 sm:mb-2 ${
                    isSelected ? 'text-luxury-gold' : 'text-luxury-cream'
                  }`}>
                    {item.title}
                  </h3>
                  <p className={`text-xs sm:text-sm md:text-base font-light tracking-wider transition-colors duration-300 ${
                    isSelected ? 'text-luxury-cream' : 'text-luxury-muted'
                  }`}>
                    {item.subtitle}
                  </p>
                  
                  <a 
                    href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(`Hi Sakthi Catering, I would like to enquire about ${item.id}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className={`mt-3 sm:mt-4 px-3 sm:px-4 py-1.5 sm:py-2 border text-[10px] sm:text-[12px] tracking-widest uppercase transition-all duration-300 ${
                      isSelected 
                        ? 'border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-luxury-black' 
                        : 'border-luxury-muted text-luxury-cream opacity-80 hover:opacity-100 hover:border-luxury-cream hover:bg-luxury-cream hover:text-luxury-black'
                    }`}
                  >
                    PLAN THIS EVENT
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CelebrationSelector;

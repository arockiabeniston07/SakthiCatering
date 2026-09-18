import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const tableItems = [
  { id: '1', name: 'VADAI', tamil: 'வடை', desc: 'Crispy lentil fritters spiced with fresh herbs.', top: '28%', left: '16%' },
  { id: '2', name: 'CHICKEN', tamil: 'கோழி கறி', desc: 'Tender chicken slow-cooked in rich Chettinad spices.', top: '27%', left: '33%' },
  { id: '3', name: 'VEGETABLE PORIYAL', tamil: 'பொரியல்', desc: 'Fresh seasonal vegetables sautéed with coconut and mild spices.', top: '25%', left: '50%' },
  { id: '4', name: 'FISH FRY', tamil: 'மீன் வறுவல்', desc: 'Crispy, spiced fish prepared fresh for the feast.', top: '25%', left: '63%' },
  { id: '5', name: 'RAITA', tamil: 'தயிர் பச்சடி', desc: 'Cooling yogurt dip with onions and cucumber.', top: '25%', left: '76%' },
  { id: '6', name: 'SWEET', tamil: 'இனிப்பு', desc: 'Traditional South Indian festive sweets.', top: '28%', left: '88%' },
  { id: '7', name: 'CHICKEN BIRYANI', tamil: 'கோழி பிரியாணி', desc: 'Fragrant basmati rice cooked with aromatic spices and tender chicken.', top: '65%', left: '48%' },
  { id: '8', name: 'RICE', tamil: 'சாதம்', desc: 'Steamed white rice served hot.', top: '60%', left: '17%' },
  { id: '9', name: 'RASAM', tamil: 'ரசம்', desc: 'Tangy and spicy tamarind soup to aid digestion.', top: '55%', left: '81%' },
  { id: '10', name: 'CURD', tamil: 'தயிர்', desc: 'Fresh homemade yogurt to cool the palate.', top: '80%', left: '75%' },
  { id: '11', name: 'PAYASAM', tamil: 'பாயாசம்', desc: 'Rich and creamy traditional milk-based dessert.', top: '75%', left: '88%' }
];

const InteractiveTable = () => {
  const [activeItem, setActiveItem] = useState(null);

  const handleMarkerClick = (e, item) => {
    e.stopPropagation();
    if (activeItem?.id === item.id) {
      setActiveItem(null);
    } else {
      setActiveItem(item);
    }
  };

  return (
    <section className="relative overflow-hidden py-24 md:py-32 border-t border-luxury-gray" onClick={() => setActiveItem(null)}>
      {/* Background Cinematic Layer */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/image/re.webp" 
          alt="A Feast Worth Remembering Background" 
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover motion-safe:animate-cinematic-video motion-reduce:animate-none"
        />
        <div className="absolute inset-0 bg-luxury-black/90 md:bg-luxury-black/85 z-10" />
      </div>

      <div className="relative z-20 container mx-auto px-6 md:px-12 text-center mb-16">
        <h2 className="font-serif text-3xl md:text-5xl text-luxury-cream mb-4">
          A FEAST WORTH <span className="text-luxury-gold italic">REMEMBERING</span>
        </h2>
        <p className="text-luxury-muted text-lg font-light tracking-wide mb-6">
          நினைவில் நிற்கும் விருந்து
        </p>
        <p className="text-luxury-muted max-w-2xl mx-auto">
          Tap the gold markers to explore the authentic flavours of our traditional banana leaf feast.
        </p>
      </div>

      <div className="relative z-20 w-full max-w-6xl mx-auto px-4 md:px-12 cursor-default">
        <div className="relative w-full">
          
          {/* SVG Filter for HD Upscaling and Intelligent Sharpening */}
          <svg className="w-0 h-0 absolute">
            <filter id="premium-hd-sharpen">
              {/* Reduce noise and compression artifacts */}
              <feGaussianBlur in="SourceGraphic" stdDeviation="0.3" result="denoised" />
              {/* Intelligent sharpening matrix for perceived HD resolution */}
              <feConvolveMatrix 
                in="denoised" 
                order="3 3" 
                preserveAlpha="true" 
                kernelMatrix="
                  0 -0.4 0 
                 -0.4 2.6 -0.4 
                  0 -0.4 0" 
              />
            </filter>
          </svg>

          {/* Organic Leaf Image Container */}
          <div 
            className="w-full relative shadow-[0_0_40px_rgba(212,175,55,0.15)] ring-1 ring-luxury-gold/20"
            style={{ 
              borderRadius: '48% 52% 48% 52% / 52% 48% 52% 48%',
              overflow: 'hidden'
            }}
          >
            <img 
              src="/nonveg.jpg" 
              alt="South Indian Banana Leaf Feast" 
              loading="lazy"
              decoding="async"
              className="w-full h-auto object-cover"
              style={{ 
                transform: 'scale(1.02)',
                filter: 'url(#premium-hd-sharpen) contrast(1.08) saturate(1.1) brightness(1.03)',
                imageRendering: 'high-quality'
              }}
            />
          </div>

          {/* Interactive Hotspots Layer */}
          <div className="absolute inset-0 z-20 pointer-events-none">
            {tableItems.map((item) => {
              const topPos = parseFloat(item.top);
              const leftPos = parseFloat(item.left);
              
              // Smart positioning bounds
              const isRightSide = leftPos > 65;
              const isLeftSide = leftPos < 35;
              const isBottom = topPos > 60;

              const horizontalPosition = isRightSide ? 'right-0' : isLeftSide ? 'left-0' : 'left-1/2 -translate-x-1/2';
              const verticalPosition = isBottom ? 'bottom-full mb-3 md:mb-4' : 'top-full mt-3 md:mt-4';

              return (
                <div 
                  key={item.id}
                  className="absolute pointer-events-auto"
                  style={{ top: item.top, left: item.left, transform: 'translate(-50%, -50%)' }}
                >
                  <div className="relative flex justify-center items-center">
                    
                    {/* Clickable Marker */}
                    <button 
                      onClick={(e) => handleMarkerClick(e, item)}
                      aria-label={`View details for ${item.name}`}
                      aria-expanded={activeItem?.id === item.id}
                      className={`w-5 h-5 md:w-7 md:h-7 bg-luxury-gold rounded-full cursor-pointer shadow-[0_0_15px_rgba(212,175,55,0.4)] flex justify-center items-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-luxury-cream focus:ring-offset-2 focus:ring-offset-luxury-black ${
                        activeItem?.id === item.id ? 'scale-110 ring-2 ring-luxury-cream ring-offset-2 ring-offset-luxury-black' : 'hover:scale-110 animate-pulse'
                      }`}
                    >
                      <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-luxury-black rounded-full" />
                    </button>
                    
                    {/* Pop-up Information Card */}
                    <AnimatePresence>
                      {activeItem?.id === item.id && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.95, y: isBottom ? 10 : -10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: isBottom ? 10 : -10 }}
                          transition={{ duration: 0.2 }}
                          onClick={(e) => e.stopPropagation()}
                          className={`absolute w-56 md:w-64 p-5 bg-luxury-black/95 backdrop-blur-md border border-luxury-gold/40 shadow-2xl z-30 cursor-default text-left ${horizontalPosition} ${verticalPosition}`}
                        >
                          <h4 className="text-luxury-gold text-sm font-bold tracking-widest mb-1">{item.name}</h4>
                          <p className="text-luxury-muted text-xs md:text-sm mb-3">{item.tamil}</p>
                          <p className="text-luxury-cream text-xs leading-relaxed font-light">{item.desc}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveTable;

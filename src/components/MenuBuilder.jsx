import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cateringMenu } from '../data/cateringMenuData';
import { siteConfig } from '../data/siteConfig';

const MenuBuilder = ({ selectedItems, toggleItem }) => {
  const [step, setStep] = useState(1);
  const [selectedServiceTime, setSelectedServiceTime] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Get active categories based on selected time
  const activeCategories = useMemo(() => {
    if (!selectedServiceTime) return [];
    return cateringMenu[selectedServiceTime].categories;
  }, [selectedServiceTime]);

  // Get items for the selected category
  const activeItems = useMemo(() => {
    if (!selectedServiceTime || !selectedCategory) return [];
    const category = activeCategories.find(c => c.id === selectedCategory);
    return category ? category.items : [];
  }, [selectedServiceTime, selectedCategory, activeCategories]);

  const handleTimeSelection = useCallback((timeKey) => {
    if (timeKey !== selectedServiceTime) {
      setSelectedCategory(null);
    }
    setSelectedServiceTime(timeKey);
    setStep(2);
  }, [selectedServiceTime]);

  const handleCategorySelection = useCallback((categoryId) => {
    setSelectedCategory(categoryId);
    setStep(3);
  }, []);

  const handleRequestMenu = useCallback(() => {
    const planSection = document.getElementById('plan');
    if (planSection) {
      planSection.scrollIntoView({ behavior: 'smooth' });
      // Trigger a brief highlight effect to show items transferred
      setTimeout(() => {
        const menuContainer = document.getElementById('selected-menu-preview');
        if (menuContainer) {
          menuContainer.classList.add('ring-2', 'ring-luxury-gold', 'bg-luxury-gold/10');
          setTimeout(() => {
            menuContainer.classList.remove('ring-2', 'ring-luxury-gold', 'bg-luxury-gold/10');
          }, 1500);
        }
      }, 500); // delay to let scroll finish
    }
  }, []);

  // Group selected items for the summary panel
  const groupedItems = useMemo(() => {
    const groups = {};
    selectedItems.forEach(item => {
      if (!groups[item.serviceTime]) {
        groups[item.serviceTime] = {
          label: cateringMenu[item.serviceTime].label,
          categories: {}
        };
      }
      if (!groups[item.serviceTime].categories[item.categoryId]) {
        groups[item.serviceTime].categories[item.categoryId] = {
          name: item.categoryName,
          items: []
        };
      }
      groups[item.serviceTime].categories[item.categoryId].items.push(item);
    });
    return groups;
  }, [selectedItems]);

  const serviceTimes = Object.keys(cateringMenu).map(key => ({
    id: key,
    ...cateringMenu[key]
  }));

  return (
    <section id="feast" className="relative overflow-hidden py-24 border-t border-luxury-gray">
      {/* Background Cinematic Layer */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/image/h4.jpg" 
          alt="Top Down Menu Background" 
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover motion-safe:animate-cinematic-video motion-reduce:animate-none"
        />
        <div className="absolute inset-0 bg-luxury-black/90 md:bg-luxury-black/85 z-10" />
      </div>

      <div className="relative z-20 container mx-auto px-6 md:px-12">
        
        <div className="text-center mb-16 px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-tamil text-3xl md:text-5xl text-luxury-cream mb-4 break-words leading-tight"
          >
            உங்கள் <span className="text-luxury-gold italic">Menu</span>
          </motion.h2>
          <p className="text-luxury-muted text-lg md:text-xl uppercase tracking-widest font-serif mb-6">BUILD YOUR FEAST</p>
          <div className="text-luxury-muted flex flex-col gap-1 items-center">
            <span className="font-tamil text-base md:text-lg">உங்கள் கொண்டாட்டத்திற்கு ஏற்ற மெனுவை உருவாக்கவும்.</span>
            <span className="text-[10px] md:text-xs uppercase opacity-70 tracking-widest">Create a menu that fits your celebration.</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          
          {/* Builder Area */}
          <div className="flex-1 max-w-4xl min-h-[500px]">
            
            {/* Step Progress Indicator */}
            <div className="flex items-center justify-between sm:justify-start mb-12 border-b border-luxury-gray/30 pb-6">
              {[
                { id: 1, label: 'MENU', tamil: 'மெனு' },
                { id: 2, label: 'CATEGORY', tamil: 'வகை' },
                { id: 3, label: 'FOOD', tamil: 'உணவு' }
              ].map((s, i) => (
                <div key={s.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full border text-xs mr-2 sm:mr-3 ${
                    step > s.id 
                      ? 'border-luxury-gold bg-luxury-gold text-luxury-black'
                      : step === s.id 
                        ? 'border-luxury-gold text-luxury-gold' 
                        : 'border-luxury-gray text-luxury-muted'
                  }`}>
                    {step > s.id ? '✓' : `0${s.id}`}
                  </div>
                  <span className={`flex flex-col gap-0.5 text-[10px] sm:text-xs tracking-widest ${
                    step >= s.id ? 'text-luxury-cream' : 'text-luxury-muted'
                  }`}>
                    <span className="font-tamil">{s.tamil}</span>
                    <span className="opacity-70 text-[8px] sm:text-[9px] uppercase">{s.label}</span>
                  </span>
                  {i < 2 && (
                    <div className={`w-4 sm:w-12 md:w-24 h-px mx-2 sm:mx-4 md:mx-8 ${
                      step > s.id ? 'bg-luxury-gold/50' : 'bg-luxury-gray/30'
                    }`} />
                  )}
                </div>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="flex flex-col gap-1 text-sm text-luxury-gold tracking-widest mb-8">
                    <span className="font-tamil">படி 01: நேரத்தைத் தேர்ந்தெடுக்கவும்</span>
                    <span className="text-[10px] uppercase opacity-70">STEP 01: CHOOSE YOUR SERVICE TIME</span>
                  </h3>
                  <div className="flex flex-col sm:flex-row gap-6 overflow-hidden">
                    {serviceTimes.map((time, idx) => (
                      <button
                        key={time.id}
                        onClick={() => handleTimeSelection(time.id)}
                        className={`flex-1 flex flex-col items-center justify-center py-16 px-6 border transition-all duration-300 ${
                          selectedServiceTime === time.id 
                            ? 'border-luxury-gold bg-luxury-gold/10' 
                            : 'border-luxury-gray bg-luxury-black hover:border-luxury-muted hover:bg-luxury-gray/10'
                        }`}
                      >
                        <span className="text-luxury-muted text-xs mb-3">0{idx + 1}</span>
                        <span className={`font-tamil text-2xl tracking-wide ${selectedServiceTime === time.id ? 'text-luxury-gold' : 'text-luxury-cream'}`}>
                          {time.label}
                        </span>
                        <span className={`text-[10px] uppercase opacity-70 tracking-widest mt-1 ${selectedServiceTime === time.id ? 'text-luxury-gold' : 'text-luxury-cream'}`}>
                          {time.subLabel}
                        </span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 2 && selectedServiceTime && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="flex flex-col gap-1 text-sm text-luxury-gold tracking-widest">
                      <span className="font-tamil">படி 02: வகையைத் தேர்ந்தெடுக்கவும்</span>
                      <span className="text-[10px] uppercase opacity-70">STEP 02: CHOOSE A CATEGORY</span>
                    </h3>
                    <button 
                      onClick={() => setStep(1)}
                      className="text-xs text-luxury-muted tracking-widest hover:text-luxury-cream transition-colors flex items-center gap-2 uppercase"
                    >
                      &larr; BACK
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-hidden">
                    {activeCategories.map(category => {
                      const selectedCount = selectedItems.filter(item => item.categoryId === category.id).length;
                      return (
                        <button
                          key={category.id}
                          onClick={() => handleCategorySelection(category.id)}
                          className={`flex flex-col p-8 border transition-all duration-300 text-left ${
                            selectedCategory === category.id 
                              ? 'border-luxury-gold bg-luxury-gold/5' 
                              : 'border-luxury-gray bg-luxury-black hover:border-luxury-muted hover:bg-luxury-gray/5'
                          }`}
                        >
                          <div className={`flex flex-col mb-4 ${selectedCategory === category.id ? 'text-luxury-gold' : 'text-luxury-cream'}`}>
                            <span className="text-base font-tamil leading-relaxed">
                              {category.name.split(' : ')[0] || category.name}
                            </span>
                            {category.name.includes(' : ') && (
                              <span className="text-[10px] opacity-70 uppercase tracking-widest mt-1">
                                {category.name.split(' : ')[1]}
                              </span>
                            )}
                          </div>
                          <div className="flex justify-between items-center mt-auto w-full">
                            <span className="text-xs text-luxury-muted font-tamil flex flex-col gap-0.5"><span>{category.items.length} உணவுகள்</span> <span className="text-[9px] opacity-70 font-sans tracking-widest">{category.items.length} ITEMS</span></span>
                            {selectedCount > 0 && (
                              <span className="text-xs text-luxury-black bg-luxury-gold px-2 py-1 rounded-sm font-medium font-tamil flex flex-col items-center gap-0.5 leading-none">
                                <span>{selectedCount} தேர்ந்தெடுக்கப்பட்டது</span>
                                <span className="text-[8px] opacity-80 font-sans tracking-widest uppercase">{selectedCount} SELECTED</span>
                              </span>
                            )}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </motion.div>
              )}

              {step === 3 && selectedCategory && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="flex flex-col gap-1 text-sm text-luxury-gold tracking-widest">
                      <span className="font-tamil">படி 03: உணவுகளைத் தேர்ந்தெடுக்கவும்</span>
                      <span className="text-[10px] uppercase opacity-70">STEP 03: SELECT YOUR ITEMS</span>
                    </h3>
                    <button 
                      onClick={() => setStep(2)}
                      className="text-xs text-luxury-muted tracking-widest hover:text-luxury-cream transition-colors flex items-center gap-2 uppercase"
                    >
                      &larr; BACK
                    </button>
                  </div>
                  <div className="mb-4">
                    <h4 className="flex flex-col gap-1 mb-6 pb-4 border-b border-luxury-gray">
                      <span className="text-2xl font-tamil text-luxury-cream">
                        {activeCategories.find(c => c.id === selectedCategory)?.name.split(' : ')[0] || activeCategories.find(c => c.id === selectedCategory)?.name}
                      </span>
                      {activeCategories.find(c => c.id === selectedCategory)?.name.includes(' : ') && (
                        <span className="text-sm font-serif text-luxury-muted uppercase tracking-widest">
                          {activeCategories.find(c => c.id === selectedCategory)?.name.split(' : ')[1]}
                        </span>
                      )}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {activeItems.map(item => {
                        const isSelected = selectedItems.find(i => i.id === item.id);
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              toggleItem(item, selectedCategory, activeCategories.find(c => c.id === selectedCategory)?.name, selectedServiceTime);
                            }}
                            className={`flex items-center justify-between p-5 border transition-all duration-300 text-left group ${
                              isSelected 
                                ? 'border-luxury-gold bg-luxury-gold/5' 
                                : 'border-luxury-gray hover:border-luxury-gold/50'
                            }`}
                          >
                            <span className={`text-base leading-snug ${isSelected ? 'text-luxury-gold' : 'text-luxury-cream group-hover:text-luxury-cream/80'}`}>
                              {item.name}
                            </span>
                            <div className={`w-5 h-5 rounded border flex-shrink-0 ml-4 flex items-center justify-center transition-colors ${isSelected ? 'border-luxury-gold bg-luxury-gold' : 'border-luxury-muted'}`}>
                              {isSelected && (
                                <svg className="w-3 h-3 text-luxury-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sticky Sidebar */}
          <div className="w-full lg:w-96 flex-shrink-0">
            <div className="sticky top-32 p-8 border border-luxury-gray bg-luxury-gray/10 flex flex-col max-h-[80vh]">
              <h4 className="flex flex-col gap-1 text-sm text-luxury-gold tracking-widest mb-6">
                <span className="font-tamil text-base">உங்கள் Menu</span>
                <span className="text-[10px] uppercase opacity-70">YOUR FEAST</span>
              </h4>
              
              <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar mb-8">
                {selectedItems.length === 0 ? (
                  <div className="py-8">
                    <p className="text-luxury-cream font-tamil text-lg mb-2">0 உணவுகள் தேர்ந்தெடுக்கப்பட்டன</p>
                    <p className="text-luxury-muted text-[10px] uppercase tracking-widest mb-3 opacity-70">0 ITEMS SELECTED</p>
                    <p className="text-luxury-muted font-tamil text-sm italic">இன்னும் உணவுகள் தேர்ந்தெடுக்கப்படவில்லை.</p>
                    <p className="text-luxury-muted text-[10px] uppercase tracking-widest mt-1 opacity-70 italic">No items selected yet.</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-luxury-cream font-tamil text-lg mb-1">
                      {selectedItems.length} {selectedItems.length === 1 ? 'உணவு' : 'உணவுகள்'} தேர்ந்தெடுக்கப்பட்டன
                    </p>
                    <p className="text-luxury-muted text-[10px] uppercase tracking-widest mb-6 border-b border-luxury-gray pb-4 opacity-70">
                      {selectedItems.length} {selectedItems.length === 1 ? 'ITEM' : 'ITEMS'} SELECTED
                    </p>
                    
                    {Object.entries(groupedItems).map(([timeKey, timeData]) => (
                      <div key={timeKey} className="mb-6 last:mb-0">
                        <h5 className="flex flex-col gap-0.5 text-luxury-gold tracking-widest mb-3">
                          <span className="font-tamil text-sm">{timeData.label}</span>
                          <span className="text-[9px] uppercase opacity-70">{timeData.subLabel || timeKey}</span>
                        </h5>
                        
                        {Object.entries(timeData.categories).map(([catId, catData]) => (
                          <div key={catId} className="mb-4 last:mb-0 ml-2">
                            <h6 className="text-sm text-luxury-muted mb-2 flex flex-col gap-0.5">
                              <span className="font-tamil text-base">{catData.name.split(' : ')[0] || catData.name}</span>
                              {catData.name.includes(' : ') && <span className="text-[9px] uppercase tracking-widest opacity-70">{catData.name.split(' : ')[1]}</span>}
                            </h6>
                            <ul className="flex flex-col gap-2 ml-2">
                              {catData.items.map(item => (
                                <li key={item.id} className="text-sm text-luxury-cream flex justify-between items-start group">
                                  <span className="flex-1 pr-2">
                                    <span className="text-luxury-gold mr-2 opacity-50">✓</span> 
                                    {item.name}
                                  </span>
                                  <button 
                                    onClick={() => toggleItem(item, item.categoryId, item.categoryName, item.serviceTime)} 
                                    className="text-luxury-muted hover:text-luxury-gold text-xs opacity-0 group-hover:opacity-100 transition-opacity p-1"
                                    aria-label="Remove item"
                                  >
                                    ✕
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-luxury-gray mt-auto">
                <button
                  onClick={handleRequestMenu}
                  disabled={selectedItems.length === 0}
                  className={`w-full py-3 flex flex-col items-center justify-center gap-1 transition-colors duration-300 ${
                    selectedItems.length > 0 
                      ? 'bg-luxury-gold text-luxury-black hover:bg-luxury-cream' 
                      : 'bg-luxury-gray text-luxury-muted cursor-not-allowed opacity-50'
                  }`}
                >
                  <span className="font-tamil text-[14px]">இந்த மெனுவை விசாரிக்கவும் &rarr;</span>
                  <span className="text-[9px] uppercase tracking-widest opacity-80">REQUEST THIS MENU &rarr;</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
};

export default MenuBuilder;

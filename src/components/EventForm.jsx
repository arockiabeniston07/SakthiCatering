import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '../data/siteConfig';

const EventForm = ({ selectedMenuItems = [], removeMenuItem }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    eventType: '',
    eventDate: '',
    guests: '500',
    location: '',
    notes: ''
  });
  const [errors, setErrors] = useState({});

  // Poll localStorage only for eventType from CelebrationSelector
  useEffect(() => {
    const checkStorage = () => {
      const event = localStorage.getItem('tce_selected_event');
      if (event) {
        let mappedEvent = event;
        if (event === 'Wedding Catering') mappedEvent = 'Wedding';
        if (event === 'Live Food Counters') mappedEvent = 'Other';

        // Ensure mappedEvent is one of the valid options, otherwise default to ''
        const validOptions = ["Wedding", "Reception", "Engagement", "Birthday", "Housewarming", "Outdoor Catering", "Corporate Event", "Other"];
        if (!validOptions.includes(mappedEvent)) mappedEvent = '';

        setFormData(prev => {
          if (prev.eventType !== mappedEvent && mappedEvent !== '') {
            return { ...prev, eventType: mappedEvent };
          }
          return prev;
        });
      }
    };
    checkStorage();
    window.addEventListener('storage', checkStorage);

    const interval = setInterval(checkStorage, 1000);
    return () => {
      window.removeEventListener('storage', checkStorage);
      clearInterval(interval);
    };
  }, []);

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        if (!value) return "Name is required.";
        if (!/^[a-zA-Z\s]+$/.test(value)) return "Only letters and spaces are allowed.";
        return "";
      case 'phone':
        if (!value) return "Phone number is required.";
        if (!/^\d{10}$/.test(value)) return "Phone number must be exactly 10 digits.";
        return "";
      case 'eventType':
        if (!value || value === "Select Event Type") return "Please select an event type.";
        return "";
      case 'eventDate':
        if (!value) return "Date is required.";
        const selected = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selected <= today) return "Please select a future date.";
        return "";
      case 'guests':
        if (!value) return "Number of guests is required.";
        const num = Number(value);
        if (isNaN(num)) return "Invalid number.";
        if (num < 500) return "Minimum guests is 500.";
        if (num > 100000) return "Maximum guests is 100,000.";
        if (num % 500 !== 0) return "Guests must be in multiples of 500.";
        return "";
      case 'location':
        if (!value) return "Location is required.";
        if (!/^[a-zA-Z\s]+$/.test(value)) return "Only letters and spaces are allowed.";
        return "";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'name' || name === 'location') {
      if (value && !/^[a-zA-Z\s]*$/.test(value)) return;
    }
    if (name === 'phone') {
      if (value && !/^\d*$/.test(value)) return;
      if (value.length > 10) return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'eventType') {
      localStorage.setItem('tce_selected_event', value);
    }

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    if (error) {
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    let isValid = true;
    Object.keys(formData).forEach(key => {
      if (key !== 'notes') {
        const error = validateField(key, formData[key]);
        if (error) {
          newErrors[key] = error;
          isValid = false;
        }
      }
    });

    if (!isValid) {
      setErrors(newErrors);
      const firstErrorField = Object.keys(newErrors)[0];
      document.querySelector(`[name="${firstErrorField}"]`)?.focus();
      return;
    }

    const url = generateWhatsAppLink();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const generateWhatsAppLink = () => {
    let message = `Hello ${siteConfig.brandName}, I would like to enquire about an event.\n\n`;
    message += `*Name:* ${formData.name}\n`;
    message += `*Phone:* ${formData.phone}\n`;
    message += `*Event Type:* ${formData.eventType}\n`;
    message += `*Date:* ${formData.eventDate}\n`;
    message += `*Guests:* ${formData.guests}\n`;
    message += `*Location:* ${formData.location}\n`;
    if (formData.notes) {
      message += `*Notes:* ${formData.notes}\n`;
    }

    if (selectedMenuItems.length > 0) {
      message += `\n*Selected Menu Items:*\n`;

      const grouped = {};
      selectedMenuItems.forEach(item => {
        if (!grouped[item.serviceTime]) grouped[item.serviceTime] = {};
        if (!grouped[item.serviceTime][item.categoryId]) {
          grouped[item.serviceTime][item.categoryId] = {
            name: item.categoryName,
            items: []
          };
        }
        grouped[item.serviceTime][item.categoryId].items.push(item.name);
      });

      Object.keys(grouped).forEach(time => {
        message += `\n[${time.toUpperCase()}]\n`;
        Object.keys(grouped[time]).forEach(cat => {
          message += `${grouped[time][cat].name}:\n`;
          grouped[time][cat].items.forEach(itemName => {
            message += `- ${itemName}\n`;
          });
          message += `\n`;
        });
      });
    }

    message += `\nPlease share the quotation and further details.`;
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodedMessage}`;
  };

  return (
    <div id="plan" className="w-full mt-12 md:mt-24">
      <div className="container mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-16">

        {/* Founder Side */}
        <div className="w-full lg:w-1/3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-luxury-gray/10 border border-luxury-gold/20 rounded-2xl p-8 md:p-10 flex flex-col items-center text-center shadow-lg"
          >
            <h2 className="font-serif text-3xl md:text-4xl text-luxury-cream mb-10 leading-[1.1] uppercase tracking-wide">
              MEET OUR<br />
              <span className="text-luxury-gold italic">FOUNDER</span>
            </h2>

            {/* Founder Image Placeholder / Circular */}
            <div className="w-48 h-48 md:w-56 md:h-56 rounded-full border-2 border-luxury-gold mb-8 relative overflow-hidden flex items-center justify-center bg-luxury-black shrink-0">
              <img
                src="/image/o3.jpeg"
                alt="Founder"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col items-center w-full">
              <p className="font-serif text-2xl md:text-3xl text-luxury-cream mb-2 uppercase tracking-wider">Sakthi Rangaraj</p>
              <p className="text-luxury-gold text-sm tracking-widest uppercase mb-1">Founder</p>
              <p className="text-luxury-muted text-xs tracking-widest uppercase mb-8">Operations & Event Management</p>

              <p className="text-luxury-cream font-light text-lg md:text-xl tracking-wider mb-8">
                {siteConfig.phone}
              </p>

              <div className="flex flex-col w-full gap-4">
                <a
                  href={`https://wa.me/${siteConfig.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 bg-[#25D366] text-white text-sm tracking-widest hover:bg-[#128C7E] transition-colors duration-300 flex items-center justify-center gap-3 rounded"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                  </svg>
                  CHAT ON WHATSAPP
                </a>
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
                  className="w-full py-4 bg-luxury-gold text-luxury-black text-sm tracking-widest hover:bg-luxury-cream transition-colors duration-300 flex items-center justify-center gap-3 rounded"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  CALL NOW
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Form Side */}
        <div className="w-full lg:w-2/3">
          <AnimatePresence mode="wait">
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="flex flex-col gap-2 relative pb-4">
                <label className="text-xs text-luxury-muted tracking-widest">FULL NAME *</label>
                <input required type="text" name="name" value={formData.name} onChange={handleChange} onBlur={handleBlur} className={`bg-transparent border-b pb-2 text-luxury-cream focus:outline-none transition-colors ${errors.name ? 'border-red-500/50' : 'border-luxury-muted/30 focus:border-luxury-gold'}`} />
                {errors.name && <span className="absolute bottom-0 left-0 text-[10px] text-red-400 tracking-wider">{errors.name}</span>}
              </div>
              <div className="flex flex-col gap-2 relative pb-4">
                <label className="text-xs text-luxury-muted tracking-widest">PHONE NUMBER *</label>
                <input required type="tel" inputMode="numeric" maxLength="10" name="phone" value={formData.phone} onChange={handleChange} onBlur={handleBlur} className={`bg-transparent border-b pb-2 text-luxury-cream focus:outline-none transition-colors ${errors.phone ? 'border-red-500/50' : 'border-luxury-muted/30 focus:border-luxury-gold'}`} />
                {errors.phone && <span className="absolute bottom-0 left-0 text-[10px] text-red-400 tracking-wider">{errors.phone}</span>}
              </div>
              <div className="flex flex-col gap-2 relative pb-4">
                <label className="text-xs text-luxury-muted tracking-widest">EVENT TYPE *</label>
                <select required name="eventType" value={formData.eventType} onChange={handleChange} onBlur={handleBlur} className={`bg-luxury-black border-b pb-2 text-luxury-cream focus:outline-none transition-colors appearance-none cursor-pointer ${errors.eventType ? 'border-red-500/50' : 'border-luxury-muted/30 focus:border-luxury-gold'}`}>
                  <option value="" disabled>Select Event Type</option>
                  <option value="Wedding">Wedding</option>
                  <option value="Reception">Reception</option>
                  <option value="Engagement">Engagement</option>
                  <option value="Birthday">Birthday</option>
                  <option value="Housewarming">Housewarming</option>
                  <option value="Outdoor Catering">Outdoor Catering</option>
                  <option value="Corporate Event">Corporate Event</option>
                  <option value="Other">Other</option>
                </select>
                {errors.eventType && <span className="absolute bottom-0 left-0 text-[10px] text-red-400 tracking-wider">{errors.eventType}</span>}
              </div>
              <div className="flex flex-col gap-2 relative pb-4">
                <label className="text-xs text-luxury-muted tracking-widest">EVENT DATE *</label>
                <input required type="date" name="eventDate" min={getMinDate()} value={formData.eventDate} onChange={handleChange} onBlur={handleBlur} className={`bg-transparent border-b pb-2 text-luxury-cream focus:outline-none transition-colors [color-scheme:dark] ${errors.eventDate ? 'border-red-500/50' : 'border-luxury-muted/30 focus:border-luxury-gold'}`} />
                {errors.eventDate && <span className="absolute bottom-0 left-0 text-[10px] text-red-400 tracking-wider">{errors.eventDate}</span>}
              </div>
              <div className="flex flex-col gap-2 relative pb-4">
                <label className="text-xs text-luxury-muted tracking-widest">NUMBER OF GUESTS *</label>
                <input required type="number" min="500" max="100000" step="500" name="guests" value={formData.guests} onChange={handleChange} onBlur={handleBlur} className={`bg-transparent border-b pb-2 text-luxury-cream focus:outline-none transition-colors ${errors.guests ? 'border-red-500/50' : 'border-luxury-muted/30 focus:border-luxury-gold'}`} />
                {errors.guests && <span className="absolute bottom-0 left-0 text-[10px] text-red-400 tracking-wider">{errors.guests}</span>}
              </div>
              <div className="flex flex-col gap-2 relative pb-4">
                <label className="text-xs text-luxury-muted tracking-widest">EVENT LOCATION *</label>
                <input required type="text" name="location" value={formData.location} onChange={handleChange} onBlur={handleBlur} className={`bg-transparent border-b pb-2 text-luxury-cream focus:outline-none transition-colors ${errors.location ? 'border-red-500/50' : 'border-luxury-muted/30 focus:border-luxury-gold'}`} />
                {errors.location && <span className="absolute bottom-0 left-0 text-[10px] text-red-400 tracking-wider">{errors.location}</span>}
              </div>
              <div className="flex flex-col gap-2 md:col-span-2 mt-4 relative pb-4">
                <label className="text-xs text-luxury-muted tracking-widest">ADDITIONAL MESSAGE / REQUIREMENTS</label>
                <textarea name="notes" rows="3" value={formData.notes} onChange={handleChange} className="bg-transparent border-b border-luxury-muted/30 pb-2 text-luxury-cream focus:outline-none focus:border-luxury-gold transition-colors resize-none"></textarea>
              </div>

              <div id="selected-menu-preview" className="md:col-span-2 mt-8 transition-colors duration-500 rounded-sm p-1">
                <h4 className="text-sm text-luxury-gold tracking-widest mb-6 border-b border-luxury-gray pb-4">YOUR SELECTED MENU</h4>

                {selectedMenuItems.length === 0 ? (
                  <div className="p-8 text-center bg-luxury-black/30 border border-luxury-gray/50">
                    <p className="text-luxury-muted">No dishes selected yet.</p>
                    <p className="text-sm text-luxury-muted mt-2">Choose your favourites from BUILD YOUR FEAST.</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-8 bg-luxury-black/30 border border-luxury-gray/50 p-6">
                    {['morning', 'afternoon', 'night'].map(timeKey => {
                      const itemsForTime = selectedMenuItems.filter(i => i.serviceTime === timeKey);
                      if (itemsForTime.length === 0) return null;

                      const categories = {};
                      itemsForTime.forEach(item => {
                        if (!categories[item.categoryId]) categories[item.categoryId] = { name: item.categoryName, items: [] };
                        categories[item.categoryId].items.push(item);
                      });

                      return (
                        <div key={timeKey}>
                          <h5 className="text-luxury-gold tracking-widest text-sm mb-4 uppercase">{timeKey}</h5>
                          <div className="flex flex-col gap-4 pl-4 border-l border-luxury-gray/30">
                            {Object.values(categories).map(cat => (
                              <div key={cat.name}>
                                <h6 className="text-luxury-muted text-xs tracking-widest uppercase mb-2">{cat.name}</h6>
                                <ul className="flex flex-col gap-2">
                                  {cat.items.map(item => (
                                    <li key={item.id} className="flex justify-between items-center group">
                                      <span className="text-luxury-cream text-sm">&bull; {item.name}</span>
                                      <button
                                        type="button"
                                        onClick={() => removeMenuItem(item.id)}
                                        className="text-luxury-muted hover:text-red-400 text-xs tracking-widest transition-colors px-2 py-1 flex items-center gap-1 opacity-60 hover:opacity-100"
                                      >
                                        &times; Remove
                                      </button>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="md:col-span-2 mt-8">
                <button type="submit" className="w-full md:w-auto px-12 py-4 bg-[#25D366] text-white text-sm tracking-widest hover:bg-[#128C7E] transition-colors duration-300 flex items-center justify-center gap-3">
                  SEND ENQUIRY ON WHATSAPP &rarr;
                </button>
              </div>
            </motion.form>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

export default EventForm;

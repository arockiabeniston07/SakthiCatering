import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import OpeningExperience from '../components/OpeningExperience';
import Hero from '../components/Hero';
import CelebrationSelector from '../components/CelebrationSelector';
import MenuBuilder from '../components/MenuBuilder';
import ProcessTimeline from '../components/ProcessTimeline';
import EventStories from '../components/EventStories';
import Stats from '../components/Stats';
import About from '../components/About';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp';

const Home = () => {
  const [showOpening, setShowOpening] = useState(true);
  const [selectedMenuItems, setSelectedMenuItems] = useState([]);

  const toggleMenuItem = (item, categoryId, categoryName, serviceTime) => {
    setSelectedMenuItems(prev => {
      const exists = prev.find(i => i.id === item.id);
      if (exists) {
        return prev.filter(i => i.id !== item.id);
      } else {
        return [...prev, { ...item, categoryId, categoryName, serviceTime }];
      }
    });
  };

  const removeMenuItem = (itemId) => {
    setSelectedMenuItems(prev => prev.filter(i => i.id !== itemId));
  };

  return (
    <div className="bg-luxury-black min-h-screen">
      {/* Always render the content so it's ready underneath the loading screen */}
      <Navbar />
      <main>
        <Hero />
        
        <About />

        <div id="menu">
          <MenuBuilder 
            selectedItems={selectedMenuItems} 
            toggleItem={toggleMenuItem} 
          />
        </div>

        <div id="services">
          <CelebrationSelector />
        </div>

        <ProcessTimeline />
        
        <EventStories />
        
        <Stats />
        
        <Contact 
          selectedMenuItems={selectedMenuItems} 
          removeMenuItem={removeMenuItem} 
        />
      </main>
      <Footer />

      {/* Render the loading screen on top */}
      {showOpening && (
        <OpeningExperience onComplete={() => setShowOpening(false)} />
      )}

      {/* Floating WhatsApp Button */}
      <FloatingWhatsApp />
    </div>
  );
};

export default Home;

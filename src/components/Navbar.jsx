import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import BrandLogo from './BrandLogo';

const navLinks = [
  { label: 'HOME', href: '#home' },
  { label: 'ABOUT', href: '#about' },
  { label: 'MENU', href: '#menu' },
  { label: 'SERVICES', href: '#services' },
  { label: 'GALLERY', href: '#gallery' },
  { label: 'CONTACT', href: '#contact' }
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections present in navLinks
    navLinks.forEach((link) => {
      const id = link.href.substring(1);
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const id = href.substring(1);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled ? 'bg-luxury-black/95 backdrop-blur-md py-4 shadow-lg shadow-black/50' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="block hover:opacity-90 transition-opacity mt-1">
            <BrandLogo align="left" variant="navbar" />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-sm tracking-widest transition-colors duration-300 relative ${
                  activeSection === link.href.substring(1) ? 'text-luxury-gold' : 'text-luxury-cream/70 hover:text-luxury-cream'
                }`}
              >
                {link.label}
              </a>
            ))}
            <a 
              href={`https://wa.me/${siteConfig.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Enquire on WhatsApp"
              className="px-6 py-2 ml-4 bg-luxury-gold text-luxury-black text-xs tracking-widest hover:bg-luxury-cream transition-colors duration-300"
            >
              ENQUIRE NOW
            </a>
          </nav>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-luxury-cream focus:outline-none"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open Menu"
          >
            <Menu size={28} />
          </button>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] bg-luxury-black flex flex-col justify-center items-center"
          >
            <button
              className="absolute top-6 right-6 md:right-12 text-luxury-cream focus:outline-none"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close Menu"
            >
              <X size={32} />
            </button>

            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`font-serif text-3xl md:text-5xl tracking-widest transition-colors duration-300 ${
                    activeSection === link.href.substring(1) ? 'text-luxury-gold' : 'text-luxury-cream hover:text-luxury-gold'
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <a 
                href={`https://wa.me/${siteConfig.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Enquire on WhatsApp"
                className="mt-4 px-8 py-4 bg-luxury-gold text-luxury-black text-sm tracking-widest hover:bg-luxury-cream transition-colors duration-300"
              >
                ENQUIRE NOW
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

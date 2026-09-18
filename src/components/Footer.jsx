import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, MapPin, Mail } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import BrandLogo from './BrandLogo';

const FacebookIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const InstagramIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const navLinks = [
  { label: 'HOME', href: '#home' },
  { label: 'ABOUT', href: '#about' },
  { label: 'MENU', href: '#menu' },
  { label: 'SERVICES', href: '#services' },
  { label: 'GALLERY', href: '#gallery' },
  { label: 'CONTACT', href: '#contact' }
];

const Footer = () => {
  const handleNavClick = (e, href) => {
    e.preventDefault();
    const id = href.substring(1);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <footer className="bg-luxury-black border-t border-luxury-gray pt-16 md:pt-20 pb-24 md:pb-10">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] gap-12 lg:gap-10"
        >
          {/* COLUMN 1 — BRAND */}
          <motion.div variants={itemVariants} className="flex flex-col items-start pr-0 lg:pr-8">
            <BrandLogo align="left" variant="footer" className="mb-6" />
            <p className="text-luxury-muted text-sm font-light italic mb-2 leading-relaxed max-w-[280px]">
              "Exceptional catering for celebrations worth remembering."
            </p>
            <p className="text-luxury-muted/70 text-sm font-light leading-relaxed max-w-[280px]">
              "நினைவில் நிற்கும் விருந்துகளுக்கான சிறப்பான கேட்டரிங்."
            </p>
          </motion.div>

          {/* COLUMN 2 — NAVIGATION */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            <h3 className="text-luxury-gold text-xs tracking-widest mb-2 border-b border-luxury-gray/30 pb-2 inline-block w-max">NAVIGATION</h3>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm text-luxury-cream hover:text-luxury-gold transition-colors w-max tracking-wider"
              >
                {link.label}
              </a>
            ))}
          </motion.div>

          {/* COLUMN 3 — CONNECT WITH US */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            <h3 className="text-luxury-gold text-xs tracking-widest mb-2 border-b border-luxury-gray/30 pb-2 inline-block w-max">CONNECT WITH US</h3>
            <a href={`https://wa.me/${siteConfig.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-luxury-cream hover:text-luxury-gold transition-colors w-max">
              <MessageCircle size={18} className="shrink-0" /> <span>WhatsApp</span>
            </a>
            <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`} className="flex items-center gap-3 text-sm text-luxury-cream hover:text-luxury-gold transition-colors w-max">
              <Phone size={18} className="shrink-0" /> <span>Call Us</span>
            </a>
            <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-3 text-sm text-luxury-cream hover:text-luxury-gold transition-colors w-max">
              <Mail size={18} className="shrink-0" /> <span>Email</span>
            </a>
            {siteConfig.socialLinks.instagram && (
              <a href={siteConfig.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-luxury-cream hover:text-luxury-gold transition-colors w-max">
                <InstagramIcon size={18} /> <span>Instagram</span>
              </a>
            )}
            {siteConfig.socialLinks.facebook && (
              <a href={siteConfig.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-luxury-cream hover:text-luxury-gold transition-colors w-max">
                <FacebookIcon size={18} /> <span>Facebook</span>
              </a>
            )}
            {siteConfig.socialLinks.googleMaps && (
              <a href={siteConfig.socialLinks.googleMaps} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-luxury-cream hover:text-luxury-gold transition-colors w-max">
                <MapPin size={18} className="shrink-0" /> <span>Location</span>
              </a>
            )}
          </motion.div>

          {/* COLUMN 4 — CONTACT INFORMATION */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            <h3 className="text-luxury-gold text-xs tracking-widest mb-2 border-b border-luxury-gray/30 pb-2 inline-block w-max">CONTACT INFORMATION</h3>
            
            <div className="mb-1">
              <p className="text-luxury-muted text-[10px] tracking-widest mb-1 uppercase">Phone</p>
              <p className="text-luxury-cream text-sm">{siteConfig.phone}</p>
            </div>
            
            <div className="mb-4">
              <p className="text-luxury-muted text-[10px] tracking-widest mb-1 uppercase">WhatsApp</p>
              <p className="text-luxury-cream text-sm">{siteConfig.phone}</p>
            </div>
            
            <div className="flex flex-row gap-3">
              <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`} className="px-5 py-2 border border-luxury-gold text-luxury-gold text-[10px] sm:text-xs tracking-widest hover:bg-luxury-gold hover:text-luxury-black transition-colors text-center w-full max-w-[120px]">
                CALL
              </a>
              <a href={`https://wa.me/${siteConfig.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="px-5 py-2 bg-[#25D366] text-white font-medium text-[10px] sm:text-xs tracking-widest hover:bg-[#1EBE5A] transition-colors text-center w-full max-w-[120px]">
                WHATSAPP
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* BOTTOM COPYRIGHT ROW */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 md:mt-20 pt-6 border-t border-luxury-gray/30 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] sm:text-xs tracking-wider text-luxury-muted/70"
        >
          <p>&copy; {new Date().getFullYear()} Sakthi Catering. All rights reserved.</p>
          <p>Designed for Excellence.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;

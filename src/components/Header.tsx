import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { CalendlyButton } from './CalendlyButton';
import { CALENDLY_URL } from '@/lib/constants';

const menuItems = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Our Team', href: '#founders' },
  { label: 'Contact', href: '#contact' },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setIsMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'header-blur bg-background/80' : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between px-6 md:px-12 lg:px-24 py-6">
          {/* Logo */}
          <a 
            href="#hero" 
            onClick={(e) => { e.preventDefault(); scrollToSection('#hero'); }}
            className="font-heading text-xl md:text-2xl tracking-[0.2em] font-light"
          >
            TalkItOut
          </a>

          {/* Right side */}
          <div className="flex items-center gap-8">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="elegant-underline font-body text-sm tracking-[0.15em] uppercase font-light"
            >
              Menu
            </button>
            <CalendlyButton 
              url={CALENDLY_URL}
              variant="primary"
              className="text-sm md:text-base"
            >
              Free Consultation
            </CalendlyButton>
          </div>
        </div>
      </header>

      {/* Full-screen Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100] bg-background/98 header-blur"
          >
            <div className="flex flex-col h-full px-6 md:px-12 lg:px-24 py-6">
              {/* Menu Header */}
              <div className="flex items-center justify-between">
                <span className="font-heading text-xl md:text-2xl tracking-[0.2em] font-light">
                  TalkItOut
                </span>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 hover:text-accent transition-colors"
                >
                  <X className="w-6 h-6" strokeWidth={1} />
                </button>
              </div>

              {/* Menu Items */}
              <nav className="flex-1 flex flex-col items-center justify-center gap-8 md:gap-12">
                {menuItems.map((item, index) => (
                  <motion.button
                    key={item.label}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    onClick={() => scrollToSection(item.href)}
                    className="font-heading text-3xl md:text-5xl lg:text-6xl font-light tracking-wide elegant-underline"
                  >
                    {item.label}
                  </motion.button>
                ))}
              </nav>

              {/* Menu Footer — Consultation CTA */}
              <div className="text-center space-y-6">
                <CalendlyButton
                  url={CALENDLY_URL}
                  variant="primary"
                  className="!text-lg md:!text-xl !px-10 !py-4"
                >
                  Book Your Free Consultation
                </CalendlyButton>
                <p className="font-body text-sm text-muted-foreground tracking-wide">
                  Professional. Confidential. Free.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

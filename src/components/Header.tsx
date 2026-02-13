import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, LogOut, User as UserIcon, Menu } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const menuItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/#about' },
  { label: 'Services', href: '/#services' },
  { label: 'Founder', href: '/#founders' },

  { label: 'Book Intern', href: '/book-intern' },
  { label: 'Contact', href: '/#contact' },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    if (href.startsWith('/#')) {
      const id = href.substring(2);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate(href);
      }
    } else {
      navigate(href);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'header-blur bg-background/80' : 'bg-transparent'
          }`}
      >
        <div className="flex items-center justify-between px-6 md:px-12 lg:px-24 py-6">
          {/* Logo */}
          <Link
            to="/"
            className="font-heading text-xl md:text-2xl tracking-[0.2em] font-light"
          >
            TalkItOut
          </Link>

          {/* Right side */}
          <div className="flex items-center gap-4 md:gap-8">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="p-2 hover:text-accent transition-colors"
            >
              <Menu className="w-6 h-6" strokeWidth={1} />
            </button>

            <div className="hidden md:flex items-center gap-4">
              {isAuthenticated && (
                <div className="flex items-center gap-4">
                  <span className="text-sm font-body font-light text-muted-foreground">
                    Hello, {user?.name.split(' ')[0]}
                  </span>
                  <button
                    onClick={() => logout()}
                    className="p-2 hover:text-accent transition-colors"
                    title="Logout"
                  >
                    <LogOut className="w-5 h-5" strokeWidth={1} />
                  </button>
                </div>
              )}
            </div>
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
                    onClick={() => handleNavClick(item.href)}
                    className="font-heading text-3xl md:text-5xl lg:text-6xl font-light tracking-wide elegant-underline"
                  >
                    {item.label}
                  </motion.button>
                ))}
              </nav>

              {/* Menu Footer — User Auth */}
              <div className="text-center pb-12">
                {!isAuthenticated ? (
                  <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                    <Link
                      to="/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="font-heading text-xl md:text-2xl font-light elegant-underline"
                    >
                      Login
                    </Link>
                    <Link
                      to="/login?mode=signup"
                      onClick={() => setIsMenuOpen(false)}
                      className="bg-primary text-primary-foreground px-12 py-4 rounded-sm text-lg md:text-xl font-light hover:opacity-90 transition-all"
                    >
                      Sign Up
                    </Link>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-4">
                    <p className="font-body text-muted-foreground text-lg">Logged in as {user?.email}</p>
                    <button
                      onClick={() => { logout(); setIsMenuOpen(false); }}
                      className="flex items-center gap-2 font-heading text-xl md:text-2xl font-light elegant-underline"
                    >
                      <LogOut className="w-5 h-5" /> Logout
                    </button>
                  </div>
                )}
                <p className="mt-8 font-body text-sm text-muted-foreground tracking-wide">
                  Professional. Confidential. Accessible.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

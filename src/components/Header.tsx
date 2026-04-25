import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, ShieldCheck, PhoneCall, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'motion/react';

export function Header() {
  const { totalItems } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <div className="bg-gray-50 border-b border-slate-900/50 text-gray-500 py-2.5 px-4 sm:px-6 lg:px-8 text-xs font-medium uppercase tracking-wider">
        <div className="mx-auto max-w-7xl flex justify-between items-center">
          <span className="hidden sm:inline-block flex-1">Dostava širom BiH u roku 24h</span>
          
          <div className="flex items-center gap-6 sm:ml-auto">
            <a href="tel:+38761542442" className="flex items-center gap-2 hover:text-red-500 transition-colors">
              <PhoneCall className="h-3.5 w-3.5" />
              <span className="font-semibold text-gray-600 tracking-widest">+387 61 542 442</span>
            </a>
            <div className="flex items-center gap-3 border-l border-gray-200 pl-6">
              <a href="viber://chat?number=+38761542442" className="text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-1.5" title="Viber">
                <img src="https://www.vectorlogo.zone/logos/viber/viber-tile.svg" alt="Viber" className="h-4 w-4 rounded-sm object-contain" /> <span className="hidden lg:inline">Viber</span>
              </a>
              <a href="https://wa.me/38761542442" className="text-gray-400 hover:text-green-500 transition-colors flex items-center gap-1.5" title="WhatsApp">
                <img src="https://www.vectorlogo.zone/logos/whatsapp/whatsapp-tile.svg" alt="WhatsApp" className="h-4 w-4 rounded-sm object-contain" /> <span className="hidden lg:inline">WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-gray-50/70 backdrop-blur-xl">
        <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3 text-red-600 hover:text-red-500 transition-transform hover:scale-105 active:scale-95 duration-300">
            <div className="bg-gradient-to-br from-red-600/20 to-blue-500/20 p-2 rounded-xl backdrop-blur-md border border-red-600/20">
              <ShieldCheck className="h-6 w-6 text-red-500" />
            </div>
            <span className="text-2xl font-heading font-bold tracking-tight text-gray-900 hidden sm:block">Kamagra<span className="text-red-600">BiH</span></span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            <Link to="/" className="text-sm font-semibold tracking-wide text-gray-600 hover:text-gray-900 transition-colors relative group">
              Početna
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all group-hover:w-full"></span>
            </Link>
            <Link to="/proizvodi" className="text-sm font-semibold tracking-wide text-gray-600 hover:text-gray-900 transition-colors relative group">
              Svi Proizvodi
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all group-hover:w-full"></span>
            </Link>
            <Link to="/blog" className="text-sm font-semibold tracking-wide text-gray-600 hover:text-gray-900 transition-colors relative group">
              Blog
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all group-hover:w-full"></span>
            </Link>
            <Link to="/o-nama" className="text-sm font-semibold tracking-wide text-gray-600 hover:text-gray-900 transition-colors relative group">
              O nama
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all group-hover:w-full"></span>
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link to="/korpa" className="relative group p-2 text-gray-500 hover:text-gray-900 transition-transform hover:scale-110 active:scale-95 duration-300">
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute 0 -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-slate-950 ring-2 ring-slate-950"
                >
                  {totalItems}
                </motion.span>
              )}
            </Link>
            
            <button 
              className="md:hidden p-2 text-gray-500 hover:text-gray-900 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden bg-white border-b border-gray-200"
            >
              <nav className="flex flex-col px-6 py-6 space-y-6">
                <Link to="/" className="text-lg font-heading font-medium text-gray-600 hover:text-gray-900">Početna</Link>
                <Link to="/proizvodi" className="text-lg font-heading font-medium text-gray-600 hover:text-gray-900">Svi Proizvodi</Link>
                <Link to="/blog" className="text-lg font-heading font-medium text-gray-600 hover:text-gray-900">Blog</Link>
                <Link to="/o-nama" className="text-lg font-heading font-medium text-gray-600 hover:text-gray-900">O nama</Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}

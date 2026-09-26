import React, { useState } from 'react';
import { ActiveView, CartItem, FragranceProduct } from '../types';
import { ZELL_MONT_EMBLEM } from '../data/fragrances';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  cart: CartItem[];
  wishlist: FragranceProduct[];
  setIsCartOpen: (open: boolean) => void;
  setIsWishlistOpen: (open: boolean) => void;
  setIsSearchOpen: (open: boolean) => void;
  setIsFinderOpen: (open: boolean) => void;
  setIsHeritageOpen: (open: boolean) => void;
  setIsAuthOpen: (open: boolean) => void;
  onSelectProduct?: (product: FragranceProduct) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  setActiveView,
  cart,
  wishlist,
  setIsCartOpen,
  setIsWishlistOpen,
  setIsSearchOpen,
  setIsFinderOpen,
  setIsHeritageOpen,
  setIsAuthOpen,
}) => {
  const { user, isConfigured } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(true);

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks: { label: string; view: ActiveView; badge?: string }[] = [
    { label: 'MAISON GALLERY', view: 'home' },
    { label: 'ALL CREATIONS', view: 'catalogue' },
    { label: 'MEN', view: 'men' },
    { label: 'WOMEN', view: 'women' },
    { label: 'KANNAUJ ATTARS', view: 'attars', badge: 'PURE OIL' },
  ];

  const handleNavClick = (view: ActiveView) => {
    setActiveView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#fbf9f6]/95 backdrop-blur-md border-b border-[#efeeeb] transition-all">
      {/* Top Luxury Announcement Ticker */}
      {showAnnouncement && (
        <div className="bg-[#1c1b1b] text-[#f2f0ed] text-[10px] md:text-xs tracking-[0.2em] uppercase py-2 px-4 flex items-center justify-between transition-all">
          <div className="flex-1 text-center font-medium overflow-hidden">
            <span className="hidden sm:inline">COMPLIMENTARY 2 BESPOKE DISCOVERY SAMPLES WITH EVERY FLACON &nbsp;•&nbsp; </span>
            <span>ARTISANAL 90-DAY COLD MATURATION &nbsp;•&nbsp; </span>
            <span>COMPLIMENTARY INSURED WHITE-GLOVE COURIER</span>
          </div>
          <button
            onClick={() => setShowAnnouncement(false)}
            className="text-stone-400 hover:text-white p-0.5 ml-2 transition-colors cursor-pointer"
            aria-label="Close notification"
          >
            <span className="material-symbols-outlined text-[14px]">close</span>
          </button>
        </div>
      )}

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-24">
          
          {/* Left: Mobile Menu Toggle & Direct Quick Links */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-stone-800 hover:text-stone-950 focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              <span className="material-symbols-outlined text-2xl">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>

            <button
              onClick={() => setIsFinderOpen(true)}
              className="hidden lg:flex items-center gap-1.5 text-[11px] tracking-[0.16em] uppercase text-stone-600 hover:text-stone-950 py-1.5 px-3 border border-stone-300 rounded-sm hover:border-stone-800 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px] text-[#715b32]">temp_preferences_custom</span>
              <span>Fragrance Finder</span>
            </button>

            <button
              onClick={() => setIsHeritageOpen(true)}
              className="hidden xl:flex items-center gap-1.5 text-[11px] tracking-[0.16em] uppercase text-stone-600 hover:text-stone-950 transition-colors cursor-pointer"
            >
              <span>The Maison</span>
            </button>
          </div>

          {/* Center: Brand Typography & Emblem */}
          <div className="flex flex-col items-center justify-center text-center cursor-pointer select-none" onClick={() => handleNavClick('home')}>
            <div className="flex items-center gap-2">
              <img 
                src={ZELL_MONT_EMBLEM} 
                alt="Zell Mont Crest" 
                className="w-5 h-5 md:w-6 md:h-6 object-contain filter contrast-125"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <span className="font-serif tracking-[0.3em] text-xl md:text-2xl lg:text-3xl font-semibold text-stone-950">
                ZELL MONT
              </span>
            </div>
            <span className="text-[8px] md:text-[9.5px] uppercase tracking-[0.38em] text-[#715b32] font-medium mt-0.5">
              HAUTE PARFUMERIE • PARIS &amp; NEW DELHI
            </span>
          </div>

          {/* Right: Actions (Search, Wishlist, Bag, Patron) */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Patron Salon / Account Button */}
            <button
              onClick={() => setIsAuthOpen(true)}
              className="flex items-center gap-1.5 p-1.5 md:px-2.5 md:py-1 border border-stone-200 hover:border-stone-800 rounded-sm text-stone-700 hover:text-stone-950 transition-colors cursor-pointer text-xs"
              title="Patron Salon & Supabase Account"
              aria-label="Patron Account"
            >
              <div className="relative">
                <span className="material-symbols-outlined text-[20px]">person</span>
                <span className={`absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full ${isConfigured ? 'bg-emerald-600' : 'bg-amber-400'}`} />
              </div>
              <span className="hidden xl:inline text-[10.5px] uppercase tracking-wider font-medium">
                {user ? (user.user_metadata?.full_name ? user.user_metadata.full_name.split(' ')[0] : 'Salon') : 'Salon'}
              </span>
            </button>

            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-stone-700 hover:text-stone-950 transition-colors cursor-pointer"
              title="Search Creations"
              aria-label="Search creations"
            >
              <span className="material-symbols-outlined text-[22px]">search</span>
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="p-2 text-stone-700 hover:text-stone-950 relative transition-colors cursor-pointer"
              title="Saved Fragrances"
              aria-label="Wishlist"
            >
              <span className="material-symbols-outlined text-[22px]">favorite</span>
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#715b32] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Bag Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 py-1.5 px-2.5 md:px-3.5 bg-stone-950 text-white rounded-sm hover:bg-stone-800 transition-all cursor-pointer"
              aria-label="Shopping Bag"
            >
              <span className="material-symbols-outlined text-[19px]">shopping_bag</span>
              <span className="hidden sm:inline text-[11px] tracking-[0.16em] uppercase font-medium">Bag</span>
              {totalCartCount > 0 && (
                <span className="bg-[#fedeaa] text-stone-950 text-[10px] font-semibold px-1.5 py-0.2 rounded-full">
                  {totalCartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Desktop Secondary Navigation Bar */}
        <nav className="hidden lg:flex items-center justify-center space-x-8 py-3 border-t border-[#efeeeb]">
          {navLinks.map((link) => {
            const isActive = activeView === link.view;
            return (
              <button
                key={link.view}
                onClick={() => handleNavClick(link.view)}
                className={`relative py-1 text-[11.5px] uppercase tracking-[0.22em] font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                  isActive ? 'text-stone-950 font-semibold' : 'text-stone-600 hover:text-stone-950'
                }`}
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="text-[8px] tracking-[0.1em] px-1 py-0.2 bg-[#fedeaa] text-[#715b32] font-semibold rounded">
                    {link.badge}
                  </span>
                )}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#715b32]" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-28 bg-[#fbf9f6] z-50 overflow-y-auto px-6 py-8 border-t border-stone-200 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-6">
            <div className="border-b border-stone-200 pb-4">
              <span className="text-[10px] tracking-[0.24em] uppercase text-stone-500 font-semibold">Collections</span>
              <div className="mt-3 flex flex-col space-y-3">
                {navLinks.map((link) => (
                  <button
                    key={link.view}
                    onClick={() => handleNavClick(link.view)}
                    className="flex items-center justify-between text-left py-2 text-stone-900 font-serif text-lg hover:text-[#715b32] transition-colors"
                  >
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="text-[9px] uppercase tracking-[0.1em] px-1.5 py-0.5 bg-[#fedeaa] text-[#715b32] rounded">
                        {link.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-b border-stone-200 pb-4">
              <span className="text-[10px] tracking-[0.24em] uppercase text-stone-500 font-semibold">Client Experience</span>
              <div className="mt-3 flex flex-col space-y-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsAuthOpen(true);
                  }}
                  className="flex items-center gap-3 py-2 text-stone-900 font-serif text-base hover:text-[#715b32]"
                >
                  <span className="material-symbols-outlined text-[#715b32] text-xl">person</span>
                  <span>{user ? `Patron Salon (${user.user_metadata?.full_name || 'Account'})` : 'Patron Sign In / Register'}</span>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsFinderOpen(true);
                  }}
                  className="flex items-center gap-3 py-2 text-stone-900 font-serif text-base hover:text-[#715b32]"
                >
                  <span className="material-symbols-outlined text-[#715b32] text-xl">temp_preferences_custom</span>
                  <span>Olfactory Diagnostic Finder</span>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsHeritageOpen(true);
                  }}
                  className="flex items-center gap-3 py-2 text-stone-900 font-serif text-base hover:text-[#715b32]"
                >
                  <span className="material-symbols-outlined text-[#715b32] text-xl">history_edu</span>
                  <span>The Maison Heritage &amp; Kannauj Distillation</span>
                </button>
              </div>
            </div>

            <div className="pt-2 text-center text-stone-500 text-xs tracking-wider">
              <p className="font-serif italic">Pure Perfumes &amp; Extrait Artisanal</p>
              <p className="text-[10px] uppercase tracking-[0.2em] mt-1 text-stone-400">Paris • Grasse • New Delhi • Kannauj</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

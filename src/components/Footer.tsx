import React, { useState } from 'react';
import { ActiveView } from '../types';
import { ZELL_MONT_EMBLEM } from '../data/fragrances';

interface FooterProps {
  setActiveView: (view: ActiveView) => void;
  setIsHeritageOpen: (open: boolean) => void;
  setIsFinderOpen: (open: boolean) => void;
}

export const Footer: React.FC<FooterProps> = ({
  setActiveView,
  setIsHeritageOpen,
  setIsFinderOpen,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#141413] text-[#efeeeb] border-t border-stone-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter & Atelier Invitation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-16 border-b border-stone-800">
          <div className="lg:col-span-6">
            <span className="text-[10px] tracking-[0.28em] uppercase text-[#e0c290] font-medium block mb-2">
              L’Épistolaire Privé
            </span>
            <h3 className="font-serif text-2xl md:text-3xl font-light text-stone-100 tracking-wide">
              Receive confidential invitations to vintage batch releases &amp; private salons.
            </h3>
            <p className="mt-3 text-sm text-stone-400 font-light leading-relaxed max-w-lg">
              Subscribers receive priority allocation for limited Kannauj Deg-Bhapka harvests and invitations to private olfactory masterclasses in Paris and New Delhi.
            </p>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-center">
            {subscribed ? (
              <div className="p-4 bg-stone-900 border border-[#715b32]/40 rounded text-[#e0c290] text-sm">
                <p className="font-serif italic text-base">Votre inscription est confirmée.</p>
                <p className="text-xs text-stone-400 mt-1">
                  You are now entered into the private register of Zell Mont Haute Parfumerie.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your confidential email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-stone-900 border border-stone-700 px-4 py-3 text-sm text-stone-200 placeholder-stone-500 focus:outline-none focus:border-[#e0c290] transition-colors"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#e0c290] text-stone-950 font-medium text-xs uppercase tracking-[0.2em] hover:bg-[#ffdea8] transition-colors cursor-pointer"
                >
                  Join The Register
                </button>
              </form>
            )}
            <span className="text-[10.5px] text-stone-500 mt-2">
              By subscribing you agree to receive communications regarding our bespoke olfactory extraits.
            </span>
          </div>
        </div>

        {/* Brand Pillars & Four Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-14 border-b border-stone-800">
          
          {/* Column 1: The Maison */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <img 
                src={ZELL_MONT_EMBLEM} 
                alt="Zell Mont" 
                className="w-5 h-5 object-contain invert opacity-90"
              />
              <span className="font-serif tracking-[0.25em] text-lg text-white">ZELL MONT</span>
            </div>
            <p className="text-xs text-stone-400 font-light leading-relaxed">
              Haute Parfumerie bridging Grasse formulation with ancient Indian Deg-Bhapka botanical co-distillation. Pure perfumes formulated without compromise.
            </p>
            <div className="pt-2 text-[11px] text-stone-400 space-y-1">
              <p><span className="text-stone-300 font-medium">Paris Atelier:</span> 18 Place Vendôme, 75001 Paris</p>
              <p><span className="text-stone-300 font-medium">New Delhi Salons:</span> The Chanakya &amp; Sundar Nagar</p>
            </div>
          </div>

          {/* Column 2: Creations */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e0c290] mb-4">
              The Creations
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <button onClick={() => { setActiveView('catalogue'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors cursor-pointer">
                  The Full Anthology (20 Extraits)
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveView('men'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors cursor-pointer">
                  Sartorial Woods &amp; Rare Ouds (Men)
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveView('women'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors cursor-pointer">
                  Radiant Damask &amp; Solar Nectars (Women)
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveView('attars'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors cursor-pointer">
                  Sacred Kannauj Deg-Bhapka Attars
                </button>
              </li>
              <li>
                <button onClick={() => setIsFinderOpen(true)} className="hover:text-white transition-colors cursor-pointer flex items-center gap-1">
                  <span>Olfactory Diagnostic Finder</span>
                  <span className="text-[9px] bg-[#715b32] px-1 py-0.2 rounded text-stone-100">Bespoke</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: The Sartorial Protocol */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e0c290] mb-4">
              Savoir-Faire &amp; Services
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <button onClick={() => setIsHeritageOpen(true)} className="hover:text-white transition-colors cursor-pointer">
                  90-Day Cold Maturation Protocol
                </button>
              </li>
              <li>
                <button onClick={() => setIsHeritageOpen(true)} className="hover:text-white transition-colors cursor-pointer">
                  Kannauj Copper Still Distillation
                </button>
              </li>
              <li>
                <span className="text-stone-300">Complimentary Laser Monogramming</span>
              </li>
              <li>
                <span className="text-stone-300">2 Discovery Vials with Every Flacon</span>
              </li>
              <li>
                <span className="text-stone-300">Silk-Lined Architectural Gift Coffret</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Client Concierge */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e0c290] mb-4">
              Client Concierge
            </h4>
            <div className="space-y-3 text-xs text-stone-400">
              <p>
                Private consultations, wedding registry olfactory curations, and international dispatch enquiries:
              </p>
              <div className="p-3 bg-stone-900/80 border border-stone-800 rounded text-stone-300 space-y-1">
                <p className="font-mono text-xs text-[#e0c290]">concierge@zellmont.com</p>
                <p className="text-[11px] text-stone-400">+91 (011) 4920-8000</p>
                <p className="text-[10px] text-stone-500 uppercase tracking-wider">Mon — Sat: 10:00 — 20:00 IST</p>
              </div>
              <div className="flex items-center gap-3 pt-1 text-stone-400">
                <span className="text-[11px]">Secure Encrypted White-Glove Logistics</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Certifications & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <div className="flex flex-wrap items-center gap-4 text-[11px] tracking-wider uppercase">
            <span>IFRA 51st Amendment Compliant</span>
            <span>•</span>
            <span>Cruelty-Free Artisanal Extraits</span>
            <span>•</span>
            <span>Sustainable Mysore Sandalwood Carrier</span>
          </div>

          <div className="text-center md:text-right text-[11px]">
            &copy; {new Date().getFullYear()} ZELL MONT HAUTE PARFUMERIE PARIS &amp; NEW DELHI. ALL RIGHTS RESERVED.
          </div>
        </div>

      </div>
    </footer>
  );
};

import React, { useState } from 'react';
import { FragranceProduct, ActiveView } from '../types';
import { FRAGRANCES_DATA } from '../data/fragrances';

interface MaisonHomeViewProps {
  onSelectProduct: (product: FragranceProduct) => void;
  onAddToCart: (product: FragranceProduct, volume: number) => void;
  onToggleWishlist: (product: FragranceProduct) => void;
  wishlist: FragranceProduct[];
  setActiveView: (view: ActiveView) => void;
  setIsFinderOpen: (open: boolean) => void;
  setIsHeritageOpen: (open: boolean) => void;
}

export const MaisonHomeView: React.FC<MaisonHomeViewProps> = ({
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  wishlist,
  setActiveView,
  setIsFinderOpen,
  setIsHeritageOpen,
}) => {
  // Featured hero flacon: Citrus Air (Flacon 11) or Royal Oud (Flacon 06)
  const heroProduct = FRAGRANCES_DATA.find((p) => p.id === 'citrus-air') || FRAGRANCES_DATA[0];
  const [activeAccordTab, setActiveAccordTab] = useState<'head' | 'heart' | 'soul'>('head');

  // Top iconic Haute Série items
  const hauteSerie = FRAGRANCES_DATA.slice(0, 8);

  const isWishlisted = (id: string) => wishlist.some((item) => item.id === id);

  return (
    <div className="bg-[#fbf9f6] text-[#1b1c1a]">
      
      {/* 1. HERO BANNER / MAISON EDITORIAL */}
      <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center overflow-hidden border-b border-[#efeeeb] bg-[#f5f3f0]">
        {/* Ambient subtle gradient & backdrop */}
        <div className="absolute inset-0 bg-radial from-stone-100/40 via-[#f5f3f0] to-[#eae8e5] opacity-80" />
        
        {/* Subtle architectural grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e2e1_1px,transparent_1px),linear-gradient(to_bottom,#e5e2e1_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-25" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Narrative */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#fedeaa]/40 border border-[#715b32]/20 rounded-full text-[#715b32] text-[10px] tracking-[0.24em] uppercase font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#715b32] animate-pulse" />
              <span>Haute Parfumerie • Pure Extraits</span>
            </div>

            <div className="space-y-3">
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-stone-950 tracking-tight leading-[1.1]">
                A Dialogue of <br />
                <span className="italic font-normal">Two Ancient Worlds</span>
              </h1>
              <p className="text-xs uppercase tracking-[0.3em] text-[#715b32] font-medium">
                Grasse Floral Nobility &bull; Kannauj Copper Still Sacred Distillation
              </p>
            </div>

            <p className="text-sm md:text-base text-stone-600 font-light leading-relaxed max-w-xl mx-auto lg:mx-0">
              Formulated in Paris and matured in the cool elevations of the Himalayas. We extract the living soul of rare botanicals through a sacred 90-day cold maturation, hand-poured into heavy lead-free crystal flacons.
            </p>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={() => {
                  setActiveView('catalogue');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-8 py-4 bg-stone-950 text-white text-xs uppercase tracking-[0.24em] font-medium hover:bg-stone-800 transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Explore The Anthology</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>

              <button
                onClick={() => onSelectProduct(heroProduct)}
                className="w-full sm:w-auto px-8 py-4 bg-transparent border border-stone-800 text-stone-900 text-xs uppercase tracking-[0.24em] font-medium hover:bg-stone-900 hover:text-white transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Dossier No. 11 (Citrus Air)</span>
                <span className="material-symbols-outlined text-[16px]">visibility</span>
              </button>
            </div>

            {/* Quick Micro Badges */}
            <div className="pt-6 border-t border-stone-300/60 grid grid-cols-3 gap-4 text-center lg:text-left">
              <div>
                <span className="block font-serif text-lg font-medium text-stone-900">32% - 38%</span>
                <span className="text-[10px] uppercase tracking-wider text-stone-500">Pure Extrait Oil</span>
              </div>
              <div>
                <span className="block font-serif text-lg font-medium text-stone-900">90 Days</span>
                <span className="text-[10px] uppercase tracking-wider text-stone-500">Cold Maturation</span>
              </div>
              <div>
                <span className="block font-serif text-lg font-medium text-stone-900">100% Pure</span>
                <span className="text-[10px] uppercase tracking-wider text-stone-500">Kannauj Copper Distilled</span>
              </div>
            </div>

          </div>

          {/* Right Hero Product Visual Showcase */}
          <div className="lg:col-span-6 flex justify-center items-center relative">
            <div className="relative w-full max-w-md aspect-3/4 rounded-sm overflow-hidden bg-gradient-to-b from-stone-200/50 to-stone-300/30 p-6 flex flex-col justify-between border border-stone-200/80 shadow-2xl">
              
              {/* Flacon Badges */}
              <div className="flex items-center justify-between z-10">
                <span className="bg-stone-950 text-white text-[9px] uppercase tracking-[0.2em] font-medium px-2.5 py-1">
                  Flacon No. {heroProduct.number}
                </span>
                <span className="bg-stone-100/90 backdrop-blur-sm text-stone-900 text-[10px] uppercase tracking-[0.16em] font-semibold px-2 py-0.5 border border-stone-300">
                  {heroProduct.badge || 'SIGNATURE EXTRAIT'}
                </span>
              </div>

              {/* Central Flacon Image */}
              <div 
                className="relative my-auto flex items-center justify-center cursor-pointer group"
                onClick={() => onSelectProduct(heroProduct)}
              >
                <div className="absolute -inset-4 bg-radial from-amber-100/60 via-transparent to-transparent opacity-80 blur-xl group-hover:scale-110 transition-transform duration-700" />
                <img
                  src={heroProduct.image}
                  alt={heroProduct.name}
                  className="relative max-h-72 sm:max-h-80 w-auto object-contain filter drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Bottom Quick Info & Accords preview */}
              <div className="z-10 bg-white/90 backdrop-blur-md p-4 border border-stone-200 rounded-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-semibold tracking-wide text-stone-950">
                      {heroProduct.name}
                    </h3>
                    <p className="text-[11px] text-stone-500 tracking-wider">
                      {heroProduct.subtitle}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-serif text-lg font-semibold text-stone-950">
                      ₹{heroProduct.price.toLocaleString('en-IN')}
                    </span>
                    <span className="block text-[9px] uppercase tracking-wider text-stone-400">
                      100 ML FLACON
                    </span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-stone-200/80 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-stone-600 line-clamp-1 italic">
                    "{heroProduct.shortDescription}"
                  </span>
                  <button
                    onClick={() => onAddToCart(heroProduct, 100)}
                    className="ml-2 px-3 py-1.5 bg-[#715b32] text-white text-[10px] uppercase tracking-[0.16em] font-medium hover:bg-[#5c4927] transition-colors whitespace-nowrap cursor-pointer"
                  >
                    Quick Add
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 2. THE OLFACTORY PYRAMID & TIME SIGNATURE (FLACON 11 FEATURE SPOTLIGHT) */}
      <section className="py-20 border-b border-[#efeeeb] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#715b32] font-semibold block mb-2">
              The Sartorial Olfactory Structure
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-stone-950 font-light tracking-tight">
              Architecture of Scent
            </h2>
            <p className="mt-3 text-sm text-stone-600 font-light leading-relaxed">
              Every Zell Mont creation unfolds across three chronological movements. We never front-load top notes to conceal empty synthetic bases.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Movement 1: Head Notes */}
            <div 
              onClick={() => setActiveAccordTab('head')}
              className={`p-8 border transition-all cursor-pointer rounded-sm ${
                activeAccordTab === 'head' 
                  ? 'border-[#715b32] bg-[#fbf9f6] shadow-md ring-1 ring-[#715b32]/20' 
                  : 'border-stone-200 hover:border-stone-300 bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] uppercase tracking-[0.24em] text-stone-400 font-bold">Movement I</span>
                <span className="text-xs px-2 py-0.5 bg-[#fedeaa]/50 text-[#715b32] font-medium rounded">
                  0 — 30 Mins
                </span>
              </div>
              <h3 className="font-serif text-xl font-medium text-stone-950 mb-2">
                Head Notes (Solar Aperture)
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {heroProduct.notesDetailed.head.description}
              </p>
              <div className="mt-6 pt-4 border-t border-stone-200">
                <span className="text-[10px] uppercase tracking-wider text-stone-400 block mb-1">Accords:</span>
                <span className="text-xs text-stone-800 font-medium">{heroProduct.accords.head}</span>
              </div>
            </div>

            {/* Movement 2: Heart Notes */}
            <div 
              onClick={() => setActiveAccordTab('heart')}
              className={`p-8 border transition-all cursor-pointer rounded-sm ${
                activeAccordTab === 'heart' 
                  ? 'border-[#715b32] bg-[#fbf9f6] shadow-md ring-1 ring-[#715b32]/20' 
                  : 'border-stone-200 hover:border-stone-300 bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] uppercase tracking-[0.24em] text-stone-400 font-bold">Movement II</span>
                <span className="text-xs px-2 py-0.5 bg-[#fedeaa]/50 text-[#715b32] font-medium rounded">
                  2 — 6 Hours
                </span>
              </div>
              <h3 className="font-serif text-xl font-medium text-stone-950 mb-2">
                Heart Notes (Harmonic Core)
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {heroProduct.notesDetailed.heart.description}
              </p>
              <div className="mt-6 pt-4 border-t border-stone-200">
                <span className="text-[10px] uppercase tracking-wider text-stone-400 block mb-1">Accords:</span>
                <span className="text-xs text-stone-800 font-medium">{heroProduct.accords.heart}</span>
              </div>
            </div>

            {/* Movement 3: Soul Notes */}
            <div 
              onClick={() => setActiveAccordTab('soul')}
              className={`p-8 border transition-all cursor-pointer rounded-sm ${
                activeAccordTab === 'soul' 
                  ? 'border-[#715b32] bg-[#fbf9f6] shadow-md ring-1 ring-[#715b32]/20' 
                  : 'border-stone-200 hover:border-stone-300 bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] uppercase tracking-[0.24em] text-stone-400 font-bold">Movement III</span>
                <span className="text-xs px-2 py-0.5 bg-[#fedeaa]/50 text-[#715b32] font-medium rounded">
                  8 — 14 Hours
                </span>
              </div>
              <h3 className="font-serif text-xl font-medium text-stone-950 mb-2">
                Soul Notes (Sartorial Anchor)
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {heroProduct.notesDetailed.soul.description}
              </p>
              <div className="mt-6 pt-4 border-t border-stone-200">
                <span className="text-[10px] uppercase tracking-wider text-stone-400 block mb-1">Accords:</span>
                <span className="text-xs text-stone-800 font-medium">{heroProduct.accords.base}</span>
              </div>
            </div>

          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => onSelectProduct(heroProduct)}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-stone-900 border-b border-stone-900 pb-1 hover:text-[#715b32] hover:border-[#715b32] transition-colors cursor-pointer"
            >
              <span>Examine Complete Technical Dossier for Flacon 11</span>
              <span className="material-symbols-outlined text-[16px]">arrow_right_alt</span>
            </button>
          </div>

        </div>
      </section>

      {/* 3. HAUTE SÉRIE / THE EXTRAITS SHOWCASE */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#715b32] font-semibold block mb-2">
              The Master Anthologies
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-stone-950 font-light tracking-tight">
              Haute Série Extraits
            </h2>
          </div>
          <button
            onClick={() => {
              setActiveView('catalogue');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="mt-4 md:mt-0 text-xs uppercase tracking-[0.2em] font-semibold text-stone-900 hover:text-[#715b32] transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>View All 20 Creations</span>
            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
          </button>
        </div>

        {/* 4-column product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {hauteSerie.map((item) => {
            const wish = isWishlisted(item.id);
            return (
              <div
                key={item.id}
                className="group bg-white border border-[#eae8e5] hover:border-[#715b32]/40 rounded-sm overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-lg"
              >
                {/* Image Section */}
                <div className="relative aspect-4/5 bg-[#f5f3f0] p-6 flex items-center justify-center overflow-hidden">
                  {/* Badge */}
                  {item.badge && (
                    <span className="absolute top-3 left-3 bg-stone-950/90 text-white text-[8.5px] uppercase tracking-[0.18em] px-2 py-0.5 font-medium z-10">
                      {item.badge}
                    </span>
                  )}

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(item);
                    }}
                    className={`absolute top-3 right-3 p-1.5 rounded-full z-10 transition-colors cursor-pointer ${
                      wish ? 'text-red-700 bg-white shadow-sm' : 'text-stone-400 hover:text-stone-900 bg-white/80'
                    }`}
                    title={wish ? 'Remove from wishlist' : 'Save to wishlist'}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {wish ? 'favorite' : 'favorite_border'}
                    </span>
                  </button>

                  {/* Flacon Image */}
                  <div
                    onClick={() => onSelectProduct(item)}
                    className="cursor-pointer w-full h-full flex items-center justify-center"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="max-h-56 w-auto object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>

                  {/* Number Tag */}
                  <span className="absolute bottom-2 left-3 text-[9px] font-mono tracking-widest text-stone-400">
                    NO. {item.number}
                  </span>
                </div>

                {/* Info Section */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-stone-500 mb-1">
                      <span>{item.family}</span>
                      <span>{item.gender}</span>
                    </div>

                    <h3 
                      onClick={() => onSelectProduct(item)}
                      className="font-serif text-lg font-medium text-stone-950 hover:text-[#715b32] transition-colors cursor-pointer"
                    >
                      {item.name}
                    </h3>
                    
                    <p className="text-xs text-stone-500 line-clamp-1 mt-0.5 italic">
                      {item.subtitle}
                    </p>

                    <div className="mt-3 pt-2 border-t border-stone-100 text-[11px] text-stone-600 line-clamp-2 leading-relaxed">
                      {item.shortDescription}
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-[#efeeeb] flex items-center justify-between">
                    <div>
                      <span className="font-serif text-base font-semibold text-stone-950">
                        ₹{item.price.toLocaleString('en-IN')}
                      </span>
                      <span className="block text-[8.5px] uppercase tracking-wider text-stone-400">
                        100ml Extrait
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onSelectProduct(item)}
                        className="p-2 border border-stone-300 text-stone-700 hover:text-stone-950 hover:border-stone-800 transition-colors rounded-sm cursor-pointer"
                        title="View Dossier"
                      >
                        <span className="material-symbols-outlined text-[16px]">visibility</span>
                      </button>
                      <button
                        onClick={() => onAddToCart(item, 100)}
                        className="px-3 py-2 bg-stone-950 text-white text-[10px] uppercase tracking-[0.16em] font-medium hover:bg-stone-800 transition-colors rounded-sm cursor-pointer"
                      >
                        Add to Bag
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </section>

      {/* 4. THE SARTORIAL PROTOCOL (BRAND CRAFTSMANSHIP PILLARS) */}
      <section className="py-20 bg-[#1c1b1b] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#e0c290] font-semibold block mb-2">
              Savoir-Faire &bull; The Atelier Standard
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-light text-stone-100 tracking-tight">
              The Sartorial Protocol
            </h2>
            <p className="mt-3 text-sm text-stone-400 font-light leading-relaxed">
              Every detail of a Zell Mont flacon honors uncompromising traditional perfumery. No compromises, no haste, no synthetics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            <div className="p-6 bg-stone-900/60 border border-stone-800 rounded-sm">
              <span className="material-symbols-outlined text-3xl text-[#e0c290] mb-4">hourglass_bottom</span>
              <h3 className="font-serif text-lg font-medium text-stone-200 mb-2">
                90-Day Cold Maturation
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Rather than rushing fast commercial bottling, our concentrates rest undisturbed in chilled stainless steel vats for three lunar cycles to marry botanical resins harmoniously.
              </p>
            </div>

            <div className="p-6 bg-stone-900/60 border border-stone-800 rounded-sm">
              <span className="material-symbols-outlined text-3xl text-[#e0c290] mb-4">science</span>
              <h3 className="font-serif text-lg font-medium text-stone-200 mb-2">
                Deg-Bhapka Distillation
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Traditional 400-year copper stills sealed with river clay in Kannauj. Pure flower vapors condense through bamboo chonga pipes into receivers filled with aged Mysore sandalwood oil.
              </p>
            </div>

            <div className="p-6 bg-stone-900/60 border border-stone-800 rounded-sm">
              <span className="material-symbols-outlined text-3xl text-[#e0c290] mb-4">draw</span>
              <h3 className="font-serif text-lg font-medium text-stone-200 mb-2">
                Complimentary Monogramming
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Each flacon is capped with a heavy 24-karat gold-plated zinc-alloy talisman. Our atelier provides bespoke laser engraving of your initials at zero surcharge.
              </p>
            </div>

            <div className="p-6 bg-stone-900/60 border border-stone-800 rounded-sm">
              <span className="material-symbols-outlined text-3xl text-[#e0c290] mb-4">inventory_2</span>
              <h3 className="font-serif text-lg font-medium text-stone-200 mb-2">
                Discovery Vials Included
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Every full-size flacon order includes 2 complimentary 2ml extrait discovery vials of your choosing, allowing you to sample before unsealing the master flacon box.
              </p>
            </div>

          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => setIsHeritageOpen(true)}
              className="px-6 py-3 border border-[#e0c290] text-[#e0c290] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#e0c290] hover:text-stone-950 transition-colors cursor-pointer"
            >
              Explore Our Atelier History
            </button>
          </div>

        </div>
      </section>

      {/* 5. OLFACTORY CURATION BY SILLAGE / THREE UNIVERSES */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#715b32] font-semibold block mb-2">
            Curated Expressions
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-stone-950 font-light tracking-tight">
            Select Your Olfactory Territory
          </h2>
          <p className="mt-3 text-sm text-stone-600 font-light">
            Explore dedicated compositions crafted for commanding presence, delicate radiance, or sacred meditation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Territory 1: Men */}
          <div 
            onClick={() => { setActiveView('men'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="group relative h-96 rounded-sm overflow-hidden border border-stone-200 cursor-pointer shadow-md"
          >
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDY_L2N386zS0qL3P2bM4T4G5q1-H3t_tH_7Zc4c9e8rK8x1v9j5L7q3F2b"
              alt="Men's Collection"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90"
              onError={(e) => {
                (e.target as HTMLImageElement).src = heroProduct.image;
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent p-8 flex flex-col justify-end">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#e0c290] font-semibold">
                Masculine Architecture
              </span>
              <h3 className="font-serif text-2xl font-light text-white mt-1">
                Woods, Rare Ouds &amp; Smoked Leather
              </h3>
              <p className="text-xs text-stone-300 mt-2 font-light line-clamp-2">
                Featuring Cedar Noir, Royal Oud, Cedar Peak, and Alpine Mist.
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-white group-hover:text-[#e0c290] transition-colors">
                <span>Explore Men's Collection</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </div>
            </div>
          </div>

          {/* Territory 2: Women */}
          <div 
            onClick={() => { setActiveView('women'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="group relative h-96 rounded-sm overflow-hidden border border-stone-200 cursor-pointer shadow-md"
          >
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCL3J1_gH1jK3vK_5F2q9P4b6X1m7Z2c5V3t9N8r1e_D7y0b5F4q6G2"
              alt="Women's Collection"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90"
              onError={(e) => {
                (e.target as HTMLImageElement).src = heroProduct.image;
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent p-8 flex flex-col justify-end">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#fedeaa] font-semibold">
                Feminine Radiance
              </span>
              <h3 className="font-serif text-2xl font-light text-white mt-1">
                Damask Rose, Nectar &amp; Solar Amber
              </h3>
              <p className="text-xs text-stone-300 mt-2 font-light line-clamp-2">
                Featuring Rose Velvet, Jasmine Nectar, Fleur Blanche, and Berry Mist.
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-white group-hover:text-[#fedeaa] transition-colors">
                <span>Explore Women's Collection</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </div>
            </div>
          </div>

          {/* Territory 3: Sacred Kannauj Attars */}
          <div 
            onClick={() => { setActiveView('attars'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="group relative h-96 rounded-sm overflow-hidden border border-stone-200 cursor-pointer shadow-md"
          >
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCR_4M5b7F9h1jK3vK2e8rK8x1v9j5L7q3F2b1m7Z2c5V3t9N8r1e"
              alt="Kannauj Attars"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90"
              onError={(e) => {
                (e.target as HTMLImageElement).src = heroProduct.image;
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent p-8 flex flex-col justify-end">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#ffdea8] font-semibold">
                  Deg-Bhapka Heritage
                </span>
                <span className="bg-[#715b32] text-white text-[8px] font-bold px-1.5 py-0.2 rounded">
                  100% PURE OIL
                </span>
              </div>
              <h3 className="font-serif text-2xl font-light text-white mt-1">
                Sacred Kannauj Pure Attars
              </h3>
              <p className="text-xs text-stone-300 mt-2 font-light line-clamp-2">
                Pure alcohol-free oils aged in Mysore sandalwood. Applied with pure crystal dip-sticks.
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-white group-hover:text-[#ffdea8] transition-colors">
                <span>Explore Sacred Attars</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 6. BESPOKE MONOGRAMMING CALLOUT */}
      <section className="py-16 bg-[#f5f3f0] border-y border-[#efeeeb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-3">
            <span className="text-[10px] uppercase tracking-[0.28em] text-[#715b32] font-semibold">
              Personalized Atelier Service
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-light text-stone-950">
              Complimentary Gold Cap Monogram Engraving
            </h2>
            <p className="text-xs md:text-sm text-stone-600 font-light max-w-2xl leading-relaxed">
              Transform your flacon into an heirloom. Our master engraver in New Delhi laser-inscribes up to three initials onto the heavy mirror-polished gold cap prior to silk-cord hand sealing.
            </p>
          </div>
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div className="flex items-center gap-3 bg-white p-4 border border-stone-300 rounded shadow-sm">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#715b32] via-[#e0c290] to-[#715b32] flex items-center justify-center text-stone-950 font-serif font-bold text-lg shadow-inner">
                Z.M.
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-stone-400 block font-medium">Bespoke Talisman</span>
                <span className="text-xs font-semibold text-stone-800">Complimentary with every flacon</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CONNOISSEUR TESTIMONIALS */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#715b32] font-semibold block mb-2">
            The Patronage
          </span>
          <h2 className="font-serif text-3xl font-light text-stone-950 tracking-tight">
            Voices of Connoisseurs
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-white border border-[#eae8e5] rounded-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex text-[#715b32] text-sm">
                {'★'.repeat(5)}
              </div>
              <p className="font-serif italic text-sm text-stone-800 leading-relaxed">
                "Citrus Air defies what citrus perfumery can achieve. The Calabrian bergamot retains radiant projection even past the eighth hour, settling into a velvet cedar skin scent."
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-stone-100">
              <span className="text-xs font-medium text-stone-900 block">Henri de La Tour</span>
              <span className="text-[10px] uppercase tracking-wider text-stone-500">Parisian Fragrance Historian</span>
            </div>
          </div>

          <div className="p-8 bg-white border border-[#eae8e5] rounded-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex text-[#715b32] text-sm">
                {'★'.repeat(5)}
              </div>
              <p className="font-serif italic text-sm text-stone-800 leading-relaxed">
                "The Kannauj Deg-Bhapka attar is a revelation. Feeling the authentic Mysore sandalwood base bond with wild Assam oud makes commercial alcohol perfumes feel paper-thin."
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-stone-100">
              <span className="text-xs font-medium text-stone-900 block">Vikramaditya S.</span>
              <span className="text-[10px] uppercase tracking-wider text-stone-500">New Delhi Patron</span>
            </div>
          </div>

          <div className="p-8 bg-white border border-[#eae8e5] rounded-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex text-[#715b32] text-sm">
                {'★'.repeat(5)}
              </div>
              <p className="font-serif italic text-sm text-stone-800 leading-relaxed">
                "The monogrammed flacon arrived in a silk-lined black wooden coffret with hand-stamped wax. The level of sartorial care is unmatched anywhere in contemporary luxury."
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-stone-100">
              <span className="text-xs font-medium text-stone-900 block">Aurelia Vance</span>
              <span className="text-[10px] uppercase tracking-wider text-stone-500">London Scent Collector</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

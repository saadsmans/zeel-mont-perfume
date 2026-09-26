import React, { useState } from 'react';
import { FragranceProduct } from '../types';
import { FRAGRANCES_DATA } from '../data/fragrances';

interface AttarCollectionViewProps {
  onSelectProduct: (product: FragranceProduct) => void;
  onAddToCart: (product: FragranceProduct, volume: number) => void;
  onToggleWishlist: (product: FragranceProduct) => void;
  wishlist: FragranceProduct[];
  setIsHeritageOpen: (open: boolean) => void;
}

export const AttarCollectionView: React.FC<AttarCollectionViewProps> = ({
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  wishlist,
  setIsHeritageOpen,
}) => {
  // Attar products or high concentration pure oils
  const attarProducts = FRAGRANCES_DATA.filter(
    (p) => p.concentration === 'Pure Attar' || ['Musk', 'Oud', 'Attar', 'Amber', 'Santal'].some((k) => p.name.includes(k))
  );

  const isWishlisted = (id: string) => wishlist.some((item) => item.id === id);
  const [selectedRitualStep, setSelectedRitualStep] = useState(0);

  const distillationSteps = [
    {
      title: '01. The Copper Deg',
      desc: 'Hand-hammered copper stills are packed before dawn with tons of freshly harvested botanicals or aged wild agarwood and river water.',
      icon: 'cooking',
    },
    {
      title: '02. Clay-Sealed Chonga',
      desc: 'The lid is hermetically sealed with fresh river clay and cotton twine. A hollow bamboo tube (chonga) directs rising fragrant vapor.',
      icon: 'lock',
    },
    {
      title: '03. The Submerged Bhapka',
      desc: 'The copper receiver flask rests submerged in an underground running water bath to gently condense the delicate aromatic steam.',
      icon: 'water_drop',
    },
    {
      title: '04. Sandalwood Absorption',
      desc: 'The receiver holds pure Mysore sandalwood oil, which slowly binds and locks the essence over 15 continuous days of slow wood-fired distillation.',
      icon: 'spa',
    },
  ];

  return (
    <div className="bg-[#fbf9f6] text-[#1b1c1a] min-h-screen py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#715b32] text-[#fedeaa] text-[10px] tracking-[0.25em] uppercase font-semibold rounded-full mb-3">
            <span>Traditional Deg-Bhapka &bull; 100% Pure Alcohol-Free Oil</span>
          </div>
          <h1 className="font-serif text-3xl md:text-5xl font-light text-stone-950 tracking-tight">
            The Sacred Kannauj Attars
          </h1>
          <p className="mt-3 text-xs md:text-sm text-stone-600 font-light leading-relaxed">
            Preserving a four-century unbroken lineage of living hydro-distillation on the banks of the Ganges. Free of alcohol, synthetics, and diluents. Pure perfume oils that evolve with personal skin warmth for over 24 hours.
          </p>
        </div>

        {/* The Deg-Bhapka Process Interactive Diagram */}
        <div className="bg-[#1c1b1b] text-white p-8 md:p-12 rounded-sm border border-stone-800 mb-16 shadow-xl">
          <div className="max-w-2xl mb-8">
            <span className="text-[10px] uppercase tracking-[0.28em] text-[#e0c290] font-semibold">
              The 15-Day Hydro-Distillation Ritual
            </span>
            <h2 className="font-serif text-2xl md:text-3xl text-white font-light mt-1">
              Ancient Kannauj Copper Still Savoir-Faire
            </h2>
            <p className="text-xs text-stone-400 mt-2 font-light">
              Unlike industrial steam extraction which destroys fragile floral top-notes, the Kannauj Deg-Bhapka utilizes wood fires, wood ash insulation, and pure aged sandalwood oil as a living carrier.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {distillationSteps.map((step, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedRitualStep(idx)}
                className={`p-5 rounded-sm border cursor-pointer transition-all ${
                  selectedRitualStep === idx
                    ? 'border-[#e0c290] bg-stone-900/90 ring-1 ring-[#e0c290]/40'
                    : 'border-stone-800 bg-stone-900/40 hover:border-stone-700'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-[#e0c290]">{step.title}</span>
                  <span className="material-symbols-outlined text-[18px] text-[#e0c290]">
                    {step.icon}
                  </span>
                </div>
                <p className="text-xs text-stone-300 font-light leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#e0c290] text-[18px]">verified</span>
              <span>100% Certified Alcohol-Free &bull; Pure Mysore Sandalwood Base</span>
            </div>
            <button
              onClick={() => setIsHeritageOpen(true)}
              className="text-[#e0c290] underline hover:text-white cursor-pointer"
            >
              Read full historical dossier on Kannauj heritage &rarr;
            </button>
          </div>
        </div>

        {/* Application Protocol Ritual */}
        <div className="bg-white border border-[#eae8e5] p-8 rounded-sm mb-16 shadow-xs">
          <div className="max-w-2xl mb-6">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#715b32] font-semibold">
              The Sartorial Protocol
            </span>
            <h3 className="font-serif text-2xl text-stone-950 font-light mt-1">
              How to Anoint with Pure Attar
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-stone-600">
            <div className="p-4 bg-[#fbf9f6] border border-stone-200 rounded-sm">
              <span className="font-serif text-base text-stone-900 font-medium block mb-1">
                1. The Crystal Dip-Stick
              </span>
              <p>
                Withdraw the ground-glass rod from the flacon. Touch a single droplet onto the flesh pad of your right thumb.
              </p>
            </div>
            <div className="p-4 bg-[#fbf9f6] border border-stone-200 rounded-sm">
              <span className="font-serif text-base text-stone-900 font-medium block mb-1">
                2. The Pulse Friction
              </span>
              <p>
                Gently rub both thumb pads together to awaken the viscous resins, then stroke across inner wrists and behind the ear lobes.
              </p>
            </div>
            <div className="p-4 bg-[#fbf9f6] border border-stone-200 rounded-sm">
              <span className="font-serif text-base text-stone-900 font-medium block mb-1">
                3. The Garment Hem Touch
              </span>
              <p>
                With the remaining trace of oil, gently graze the inner lining of your jacket lapel or scarf edge for multidimensional 48-hour sillage.
              </p>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {attarProducts.map((item) => {
            const wish = isWishlisted(item.id);
            return (
              <div
                key={item.id}
                className="group bg-white border border-[#eae8e5] hover:border-[#715b32]/40 rounded-sm overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-xl"
              >
                <div className="relative aspect-4/5 bg-[#f5f3f0] p-8 flex items-center justify-center overflow-hidden">
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
                    <span className="bg-[#715b32] text-white text-[8.5px] uppercase tracking-[0.2em] px-2 py-0.5 font-medium">
                      ATTAR NO. {item.number}
                    </span>
                    <span className="bg-white/90 text-stone-900 text-[8.5px] uppercase tracking-wider px-1.5 py-0.5 font-bold border border-stone-300">
                      PURE OIL
                    </span>
                  </div>

                  <button
                    onClick={() => onToggleWishlist(item)}
                    className={`absolute top-3 right-3 p-1.5 rounded-full z-10 transition-colors cursor-pointer ${
                      wish ? 'text-red-700 bg-white shadow-sm' : 'text-stone-400 hover:text-stone-900 bg-white/80'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {wish ? 'favorite' : 'favorite_border'}
                    </span>
                  </button>

                  <div onClick={() => onSelectProduct(item)} className="cursor-pointer w-full h-full flex items-center justify-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="max-h-64 w-auto object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-stone-500 mb-1">
                      <span>{item.family}</span>
                      <span className="text-[#715b32] font-semibold">12ml Crystal Flacon</span>
                    </div>

                    <h3
                      onClick={() => onSelectProduct(item)}
                      className="font-serif text-xl font-medium text-stone-950 hover:text-[#715b32] transition-colors cursor-pointer"
                    >
                      {item.name}
                    </h3>
                    
                    <p className="text-xs text-stone-500 italic mt-0.5">{item.subtitle}</p>

                    <div className="mt-3 text-xs text-stone-600 line-clamp-2">
                      {item.shortDescription}
                    </div>

                    <div className="mt-4 pt-3 border-t border-stone-100 text-[11px] text-stone-700">
                      <span className="font-semibold block text-[10px] uppercase tracking-wider text-stone-400 mb-1">Distilled Accords:</span>
                      <p className="line-clamp-1">{item.accords.head} &bull; {item.accords.heart} &bull; {item.accords.base}</p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#efeeeb] flex items-center justify-between">
                    <div>
                      <span className="font-serif text-lg font-semibold text-stone-950">
                        ₹{item.price.toLocaleString('en-IN')}
                      </span>
                      <span className="block text-[8.5px] uppercase tracking-wider text-stone-400">
                        12ml Pure Attar
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onSelectProduct(item)}
                        className="p-2 border border-stone-300 text-stone-700 hover:text-stone-950 hover:border-stone-800 transition-colors rounded-sm cursor-pointer"
                        title="View Dossier"
                      >
                        <span className="material-symbols-outlined text-[16px]">visibility</span>
                      </button>
                      <button
                        onClick={() => onAddToCart(item, 12)}
                        className="px-4 py-2 bg-stone-950 text-white text-xs uppercase tracking-[0.16em] font-medium hover:bg-stone-800 transition-colors rounded-sm cursor-pointer"
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

      </div>
    </div>
  );
};

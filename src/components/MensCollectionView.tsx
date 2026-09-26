import React from 'react';
import { FragranceProduct } from '../types';
import { FRAGRANCES_DATA } from '../data/fragrances';

interface MensCollectionViewProps {
  onSelectProduct: (product: FragranceProduct) => void;
  onAddToCart: (product: FragranceProduct, volume: number) => void;
  onToggleWishlist: (product: FragranceProduct) => void;
  wishlist: FragranceProduct[];
}

export const MensCollectionView: React.FC<MensCollectionViewProps> = ({
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  wishlist,
}) => {
  // Filter Men's fragrances + masculine-leaning unisex woods/ouds
  const mensCreations = FRAGRANCES_DATA.filter(
    (p) => p.gender === 'Men' || ['Cedar', 'Oud', 'Wood', 'Peak', 'Imperial', 'Alpine'].some((k) => p.name.includes(k))
  );

  const isWishlisted = (id: string) => wishlist.some((item) => item.id === id);

  return (
    <div className="bg-[#fbf9f6] text-[#1b1c1a] min-h-screen py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-900 text-stone-200 text-[10px] tracking-[0.25em] uppercase font-semibold rounded-full mb-3">
            <span>Sartorial Masculine Architecture</span>
          </div>
          <h1 className="font-serif text-3xl md:text-5xl font-light text-stone-950 tracking-tight">
            Woods, Smoked Leather &amp; Rare Ouds
          </h1>
          <p className="mt-3 text-xs md:text-sm text-stone-600 font-light leading-relaxed">
            Engineered with deep resinous spines, crisp alpine pine needles, and distilled Assam agarwood. High extrait concentrations designed to project with authoritative quietude through wools and cashmere.
          </p>
        </div>

        {/* Sartorial Protocol Guide Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          <div className="bg-stone-900 text-white p-6 rounded-sm border border-stone-800">
            <span className="text-[10px] uppercase tracking-widest text-[#e0c290] font-semibold">Morning &bull; The Boardroom</span>
            <h3 className="font-serif text-lg font-light mt-1 mb-2">Crisp Resins &amp; Cold Pine</h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              Recommended: <em>Alpine Mist (No. 01)</em> or <em>Cedar Peak (No. 08)</em>. Sharp energetic openings that sharpen mental focus without encroaching on personal space.
            </p>
          </div>

          <div className="bg-stone-900 text-white p-6 rounded-sm border border-stone-800">
            <span className="text-[10px] uppercase tracking-widest text-[#e0c290] font-semibold">Evening &bull; Black Tie</span>
            <h3 className="font-serif text-lg font-light mt-1 mb-2">Vintage Assam Agarwood</h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              Recommended: <em>Royal Oud (No. 06)</em> or <em>Cedar Noir (No. 03)</em>. Aged smokiness that radiates from evening lapels with aristocratic gravity.
            </p>
          </div>

          <div className="bg-stone-900 text-white p-6 rounded-sm border border-stone-800">
            <span className="text-[10px] uppercase tracking-widest text-[#e0c290] font-semibold">Weekend &bull; Coastal Sartorial</span>
            <h3 className="font-serif text-lg font-light mt-1 mb-2">Salted Bergamot &amp; Tea</h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              Recommended: <em>Citrus Air (No. 11)</em> or <em>Aqua Di Zell (No. 10)</em>. Crisp, effervescent sunlight grounded by warm driftwood and white amber.
            </p>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {mensCreations.map((item) => {
            const wish = isWishlisted(item.id);
            return (
              <div
                key={item.id}
                className="group bg-white border border-[#eae8e5] hover:border-stone-900 rounded-sm overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-xl"
              >
                <div className="relative aspect-4/5 bg-[#f5f3f0] p-8 flex items-center justify-center overflow-hidden">
                  <span className="absolute top-3 left-3 bg-stone-950 text-white text-[8.5px] uppercase tracking-[0.2em] px-2 py-0.5 font-medium">
                    NO. {item.number}
                  </span>

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
                      <span>Extrait Concentration</span>
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

                    {/* Accords list */}
                    <div className="mt-4 pt-3 border-t border-stone-100 text-[11px] text-stone-700">
                      <span className="font-semibold block text-[10px] uppercase tracking-wider text-stone-400 mb-1">Accords:</span>
                      <p className="line-clamp-1">{item.accords.head} &bull; {item.accords.heart} &bull; {item.accords.base}</p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#efeeeb] flex items-center justify-between">
                    <div>
                      <span className="font-serif text-lg font-semibold text-stone-950">
                        ₹{item.price.toLocaleString('en-IN')}
                      </span>
                      <span className="block text-[8.5px] uppercase tracking-wider text-stone-400">
                        100ml Pure Extrait
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
                        onClick={() => onAddToCart(item, 100)}
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

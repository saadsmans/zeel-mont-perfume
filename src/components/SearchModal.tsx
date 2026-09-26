import React, { useState, useMemo } from 'react';
import { FragranceProduct } from '../types';
import { FRAGRANCES_DATA } from '../data/fragrances';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: FragranceProduct) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');

  const quickTags = ['Calabrian Bergamot', 'Assam Oud', 'Damask Rose', 'Kannauj Attar', 'Himalayan Cedar', 'Mysore Sandalwood'];

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return FRAGRANCES_DATA.filter((p) => {
      return (
        p.name.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.accords.head.toLowerCase().includes(q) ||
        p.accords.heart.toLowerCase().includes(q) ||
        p.accords.base.toLowerCase().includes(q) ||
        p.family.toLowerCase().includes(q) ||
        p.number.includes(q)
      );
    });
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-start justify-center p-4 pt-16 md:pt-24">
      <div className="bg-[#fbf9f6] text-[#1b1c1a] max-w-2xl w-full border border-stone-300 rounded-sm shadow-2xl overflow-hidden relative">
        
        {/* Search Input Bar */}
        <div className="p-4 sm:p-6 bg-white border-b border-[#efeeeb] flex items-center gap-3">
          <span className="material-symbols-outlined text-stone-400 text-2xl">search</span>
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search flacon name, accord, ingredient, or number..."
            className="flex-1 bg-transparent text-base sm:text-lg text-stone-900 placeholder-stone-400 focus:outline-none font-serif"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-stone-400 hover:text-stone-700 p-1 cursor-pointer">
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          )}
          <button onClick={onClose} className="text-xs uppercase tracking-wider text-stone-500 hover:text-stone-950 cursor-pointer ml-2">
            Esc
          </button>
        </div>

        {/* Quick Suggestion Tags */}
        <div className="px-6 py-3 bg-[#f5f3f0] border-b border-stone-200/80 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold flex-shrink-0">
            Suggested:
          </span>
          {quickTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="px-2 py-0.5 bg-white border border-stone-300 text-stone-700 hover:border-stone-800 rounded-xs text-[11px] flex-shrink-0 cursor-pointer"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Search Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 space-y-3">
          {query.trim() === '' ? (
            <div className="text-center py-10 text-xs text-stone-400">
              <p>Type to search across all 20 Zell Mont artisanal extraits and pure attars.</p>
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-12 text-stone-500 text-xs">
              <span className="material-symbols-outlined text-3xl text-stone-400 mb-2">search_off</span>
              <p className="font-serif text-base text-stone-800">No creations matched "{query}"</p>
              <p className="mt-1 text-stone-400">Try searching for "Bergamot", "Oud", "Rose", or "Cedar".</p>
            </div>
          ) : (
            results.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  onClose();
                  onSelectProduct(product);
                }}
                className="p-3 bg-white border border-stone-200 hover:border-[#715b32] rounded-sm flex items-center justify-between cursor-pointer transition-all hover:shadow-xs group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-16 bg-[#f5f3f0] p-1 rounded flex items-center justify-center flex-shrink-0">
                    <img src={product.image} alt={product.name} className="max-h-full object-contain" />
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-[#715b32] font-semibold">
                      Flacon No. {product.number} &bull; {product.family}
                    </span>
                    <h4 className="font-serif text-base font-medium text-stone-900 group-hover:text-[#715b32] transition-colors">
                      {product.name}
                    </h4>
                    <p className="text-[11px] text-stone-500 italic line-clamp-1">{product.subtitle}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-serif text-sm font-semibold text-stone-950">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  <span className="block text-[9px] text-stone-400 uppercase">View Dossier &rarr;</span>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};

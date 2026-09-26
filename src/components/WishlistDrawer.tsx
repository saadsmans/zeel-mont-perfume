import React from 'react';
import { FragranceProduct } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: FragranceProduct[];
  onRemoveWishlist: (product: FragranceProduct) => void;
  onAddToCart: (product: FragranceProduct, volume: number) => void;
  onSelectProduct: (product: FragranceProduct) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlist,
  onRemoveWishlist,
  onAddToCart,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div onClick={onClose} className="absolute inset-0 bg-stone-950/60 backdrop-blur-xs transition-opacity" />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#fbf9f6] text-[#1b1c1a] border-l border-stone-200 shadow-2xl flex flex-col justify-between">
          
          <div className="p-6 border-b border-[#efeeeb] flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-[0.24em] text-[#715b32] font-semibold block">
                Personal Repository
              </span>
              <h2 className="font-serif text-2xl font-light text-stone-950">
                Saved Creations ({wishlist.length})
              </h2>
            </div>
            <button onClick={onClose} className="p-2 text-stone-400 hover:text-stone-800 cursor-pointer">
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {wishlist.length === 0 ? (
              <div className="text-center py-16 space-y-2">
                <span className="material-symbols-outlined text-4xl text-stone-300">favorite_border</span>
                <p className="font-serif text-lg text-stone-800">Your wishlist is empty.</p>
                <p className="text-xs text-stone-500 font-light">
                  Save your desired flacons while exploring the anthologies.
                </p>
              </div>
            ) : (
              wishlist.map((item) => (
                <div key={item.id} className="p-4 bg-white border border-[#eae8e5] rounded-sm flex gap-4">
                  <div 
                    onClick={() => {
                      onClose();
                      onSelectProduct(item);
                    }}
                    className="w-16 h-20 bg-[#f5f3f0] p-1 rounded flex items-center justify-center flex-shrink-0 cursor-pointer"
                  >
                    <img src={item.image} alt={item.name} className="max-h-full object-contain" />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] uppercase tracking-wider text-[#715b32] font-semibold">
                          Flacon No. {item.number}
                        </span>
                        <button
                          onClick={() => onRemoveWishlist(item)}
                          className="text-stone-400 hover:text-stone-700 p-0.5 cursor-pointer"
                          title="Remove from wishlist"
                        >
                          <span className="material-symbols-outlined text-[16px]">close</span>
                        </button>
                      </div>

                      <h4 
                        onClick={() => {
                          onClose();
                          onSelectProduct(item);
                        }}
                        className="font-serif text-base font-medium text-stone-900 cursor-pointer hover:text-[#715b32]"
                      >
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-stone-500 italic">{item.subtitle}</p>
                    </div>

                    <div className="mt-3 flex items-center justify-between pt-2 border-t border-stone-100">
                      <span className="font-serif text-sm font-semibold text-stone-950">
                        ₹{item.price.toLocaleString('en-IN')}
                      </span>
                      <button
                        onClick={() => {
                          onAddToCart(item, item.concentration === 'Pure Attar' ? 12 : 100);
                          onRemoveWishlist(item);
                        }}
                        className="px-3 py-1.5 bg-stone-950 text-white text-[10px] uppercase tracking-wider font-medium hover:bg-stone-800 transition-colors rounded-sm cursor-pointer"
                      >
                        Move to Bag
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-6 bg-white border-t border-[#efeeeb]">
            <button
              onClick={onClose}
              className="w-full py-3 border border-stone-800 text-stone-900 text-xs uppercase tracking-[0.2em] font-medium hover:bg-stone-900 hover:text-white transition-colors cursor-pointer text-center"
            >
              Continue Exploring
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

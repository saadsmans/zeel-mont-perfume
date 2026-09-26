import React, { useState } from 'react';
import { CartItem, DiscoverySample } from '../types';
import { DISCOVERY_SAMPLES_LIST } from '../data/fragrances';

interface ShoppingBagDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemoveItem: (id: string) => void;
  selectedSamples: DiscoverySample[];
  setSelectedSamples: (samples: DiscoverySample[]) => void;
  onCheckout: () => void;
  giftBox: boolean;
  setGiftBox: (val: boolean) => void;
  giftNote: string;
  setGiftNote: (val: string) => void;
}

export const ShoppingBagDrawer: React.FC<ShoppingBagDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  selectedSamples,
  setSelectedSamples,
  onCheckout,
  giftBox,
  setGiftBox,
  giftNote,
  setGiftNote,
}) => {
  const [showSamplePicker, setShowSamplePicker] = useState(false);

  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const toggleSample = (sample: DiscoverySample) => {
    const exists = selectedSamples.some((s) => s.id === sample.id);
    if (exists) {
      setSelectedSamples(selectedSamples.filter((s) => s.id !== sample.id));
    } else {
      if (selectedSamples.length < 2) {
        setSelectedSamples([...selectedSamples, sample]);
      } else {
        // replace the oldest one
        setSelectedSamples([selectedSamples[1], sample]);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose} 
        className="absolute inset-0 bg-stone-950/60 backdrop-blur-xs transition-opacity" 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#fbf9f6] text-[#1b1c1a] border-l border-stone-200 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-[#efeeeb] flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-[0.24em] text-[#715b32] font-semibold block">
                Zell Mont Paris &amp; New Delhi
              </span>
              <h2 className="font-serif text-2xl font-light text-stone-950">
                Sartorial Bag ({cart.reduce((a, b) => a + b.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-stone-800 transition-colors cursor-pointer"
              aria-label="Close bag"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <span className="material-symbols-outlined text-4xl text-stone-300">shopping_bag</span>
                <p className="font-serif text-lg text-stone-800">Your Sartorial Bag is empty.</p>
                <p className="text-xs text-stone-500 font-light">
                  Explore our collections to select pure flacons and extraits.
                </p>
                <button
                  onClick={onClose}
                  className="mt-4 px-6 py-2.5 bg-stone-950 text-white text-xs uppercase tracking-wider font-medium cursor-pointer"
                >
                  Discover Creations
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 bg-white border border-[#eae8e5] rounded-sm flex gap-4 relative"
                  >
                    {/* Flacon Image */}
                    <div className="w-20 h-24 bg-[#f5f3f0] p-2 rounded-xs flex items-center justify-center flex-shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="max-h-full object-contain filter drop-shadow-sm"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] uppercase tracking-wider text-[#715b32] font-semibold">
                            Flacon No. {item.product.number} &bull; {item.volume} ML
                          </span>
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="text-stone-400 hover:text-red-700 p-0.5 cursor-pointer"
                            title="Remove item"
                          >
                            <span className="material-symbols-outlined text-[16px]">delete</span>
                          </button>
                        </div>

                        <h4 className="font-serif text-base font-medium text-stone-900 leading-snug">
                          {item.product.name}
                        </h4>

                        {item.monogram && (
                          <div className="mt-1 inline-flex items-center gap-1 px-1.5 py-0.5 bg-[#fedeaa]/40 border border-[#715b32]/30 rounded text-[9px] font-mono font-bold text-[#715b32]">
                            <span className="material-symbols-outlined text-[12px]">draw</span>
                            <span>Engraved: {item.monogram}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-100">
                        {/* Quantity adjuster */}
                        <div className="flex items-center border border-stone-200 rounded">
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="px-2 py-0.5 text-stone-600 hover:text-stone-950 cursor-pointer"
                          >
                            -
                          </button>
                          <span className="px-2 text-xs font-semibold text-stone-900">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-0.5 text-stone-600 hover:text-stone-950 cursor-pointer"
                          >
                            +
                          </button>
                        </div>

                        <span className="font-serif text-sm font-semibold text-stone-950">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>

                    </div>
                  </div>
                ))}

                {/* Bespoke Discovery Samples Allocation Box */}
                <div className="p-4 bg-[#f5f3f0] border border-stone-300/80 rounded-sm space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[#715b32] text-[18px]">science</span>
                      <span className="text-xs uppercase tracking-wider font-semibold text-stone-900">
                        Complimentary Discovery Vials (2x 2ML)
                      </span>
                    </div>
                    <button
                      onClick={() => setShowSamplePicker(!showSamplePicker)}
                      className="text-[11px] text-[#715b32] font-semibold underline hover:text-stone-900 cursor-pointer"
                    >
                      {showSamplePicker ? 'Close' : 'Select Samples'}
                    </button>
                  </div>

                  <p className="text-[11px] text-stone-500 font-light">
                    Every flacon includes two complimentary 2ml luxury discovery vials to experience before unsealing:
                  </p>

                  {/* Chosen samples pill tags */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {selectedSamples.length === 0 ? (
                      <span className="text-[11px] italic text-stone-400">
                        No samples selected yet (click "Select Samples" above).
                      </span>
                    ) : (
                      selectedSamples.map((s) => (
                        <span
                          key={s.id}
                          className="px-2.5 py-1 bg-white border border-[#715b32]/40 rounded text-[11px] text-stone-800 flex items-center gap-1 shadow-2xs font-medium"
                        >
                          <span>{s.name}</span>
                          <button
                            onClick={() => toggleSample(s)}
                            className="text-stone-400 hover:text-stone-800 ml-1 cursor-pointer"
                          >
                            &times;
                          </button>
                        </span>
                      ))
                    )}
                  </div>

                  {/* Sample Picker drawer/list */}
                  {showSamplePicker && (
                    <div className="pt-3 border-t border-stone-200 grid grid-cols-2 gap-2 animate-in fade-in">
                      {DISCOVERY_SAMPLES_LIST.map((sample) => {
                        const isPicked = selectedSamples.some((s) => s.id === sample.id);
                        return (
                          <button
                            key={sample.id}
                            onClick={() => toggleSample(sample)}
                            className={`p-2 border rounded text-left text-xs transition-colors cursor-pointer ${
                              isPicked
                                ? 'border-[#715b32] bg-[#fedeaa]/30 text-stone-950 font-medium'
                                : 'border-stone-200 bg-white text-stone-700 hover:border-stone-400'
                            }`}
                          >
                            <span className="block font-medium">{sample.name}</span>
                            <span className="text-[10px] text-stone-400">{sample.tag}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Complimentary Luxury Gift Packaging Option */}
                <div className="p-4 bg-white border border-stone-200 rounded-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#715b32] text-[18px]">card_giftcard</span>
                      <span className="text-xs uppercase tracking-wider font-semibold text-stone-900">
                        Complimentary Gift Presentation
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      checked={giftBox}
                      onChange={(e) => setGiftBox(e.target.checked)}
                      className="w-4 h-4 accent-stone-900 cursor-pointer"
                    />
                  </div>
                  <p className="text-[11px] text-stone-500 font-light">
                    Silk-lined rigid black wooden box, hand-stamped gold wax seal, and calligraphed card.
                  </p>

                  {giftBox && (
                    <div className="pt-2 animate-in fade-in">
                      <textarea
                        rows={2}
                        value={giftNote}
                        onChange={(e) => setGiftNote(e.target.value)}
                        placeholder="Write your confidential message to be handwritten on vellum cardstock..."
                        className="w-full bg-[#fbf9f6] border border-stone-200 p-2 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#715b32]"
                      />
                    </div>
                  )}
                </div>

              </div>
            )}

          </div>

          {/* Footer Subtotal & Checkout */}
          {cart.length > 0 && (
            <div className="p-6 bg-white border-t border-[#efeeeb] space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-stone-500">
                  <span>Subtotal</span>
                  <span className="font-mono">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-xs text-stone-500">
                  <span>White-Glove Insured Courier</span>
                  <span className="text-[#715b32] font-semibold uppercase">Complimentary</span>
                </div>
                <div className="flex justify-between text-xs text-stone-500">
                  <span>Customs &amp; Duties</span>
                  <span className="text-stone-800 font-medium">Included</span>
                </div>
                <div className="pt-2 border-t border-stone-100 flex justify-between items-baseline">
                  <span className="font-serif text-base font-semibold text-stone-950">Total</span>
                  <span className="font-serif text-2xl font-bold text-stone-950">
                    ₹{subtotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onCheckout();
                }}
                className="w-full py-3.5 bg-stone-950 text-white text-xs uppercase tracking-[0.24em] font-medium hover:bg-stone-800 transition-colors shadow-md rounded-sm cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>

              <p className="text-[10px] text-center text-stone-400 tracking-wider">
                Encrypted 256-Bit SSL Checkout &bull; Paris &bull; New Delhi &bull; Worldwide
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

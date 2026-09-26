import React from 'react';
import { ZELL_MONT_EMBLEM } from '../data/fragrances';

interface HeritageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HeritageModal: React.FC<HeritageModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/75 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#fbf9f6] text-[#1b1c1a] max-w-3xl w-full border border-stone-300 rounded-sm shadow-2xl relative overflow-hidden">
        
        {/* Header */}
        <div className="p-6 bg-white border-b border-[#efeeeb] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={ZELL_MONT_EMBLEM} alt="Zell Mont" className="w-6 h-6 object-contain" />
            <div>
              <span className="text-[9.5px] uppercase tracking-[0.25em] text-[#715b32] font-semibold block">
                The Atelier Savoir-Faire
              </span>
              <h2 className="font-serif text-2xl font-light text-stone-950">
                The Heritage of Zell Mont
              </h2>
            </div>
          </div>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-800 p-1 cursor-pointer">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-10 max-h-[75vh] overflow-y-auto space-y-8 text-xs md:text-sm text-stone-700 leading-relaxed font-light">
          
          <div className="space-y-3">
            <span className="text-[10px] uppercase tracking-[0.28em] text-[#715b32] font-semibold block">
              Chapter I &bull; The Geographies of Scent
            </span>
            <h3 className="font-serif text-2xl text-stone-950 font-normal">
              A Symphony Between Grasse &amp; Kannauj
            </h3>
            <p>
              Founded as a deliberate rebellion against mass-market synthetic aromachemicals, <strong>Zell Mont Haute Parfumerie</strong> unites two epicenters of human olfactory culture: the aristocratic floral extraction laboratories of Grasse, France, and the four-century-old riverbank distilleries of Kannauj, Uttar Pradesh.
            </p>
            <p>
              In Paris, our master noses formulate the delicate architectural pyramids, blending sparkling Calabrian bergamots, rare Bulgarian damask roses, and French orris butter. In New Delhi and Kannauj, our master distillers (<em>degwalas</em>) capture raw resinous warmth, aging wild Assam agarwood and co-distilling botanicals directly into pure aged Mysore sandalwood oil.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-[#f5f3f0] p-6 border border-stone-200 rounded-sm">
            <div>
              <h4 className="font-serif text-base font-semibold text-stone-900 mb-1">
                Paris Atelier
              </h4>
              <p className="text-xs text-stone-600">
                Located at 18 Place Vendôme. Formulations adhere rigorously to the IFRA 51st Amendment while maintaining unfiltered natural extrait concentrations exceeding 35%.
              </p>
            </div>
            <div>
              <h4 className="font-serif text-base font-semibold text-stone-900 mb-1">
                Kannauj Cauldrons
              </h4>
              <p className="text-xs text-stone-600">
                Distillations employ wood fires, bamboo condensation pipes (chonga), and subterranean water tanks, preserving botanical living soul without petroleum solvents.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <span className="text-[10px] uppercase tracking-[0.28em] text-[#715b32] font-semibold block">
              Chapter II &bull; The 90-Day Cold Maturation
            </span>
            <h3 className="font-serif text-2xl text-stone-950 font-normal">
              Time as the Master Ingredient
            </h3>
            <p>
              Where industrial brands bottle within forty-eight hours of compounding, Zell Mont concentrates undergo a mandatory ninety-day cold maturation period. Stored at a constant 11°C in darkened stainless steel casks, natural aldehydes, resins, and essential oils cross-bond naturally, eliminating harsh synthetic edges.
            </p>
          </div>

          <div className="space-y-3">
            <span className="text-[10px] uppercase tracking-[0.28em] text-[#715b32] font-semibold block">
              Chapter III &bull; Architectural Lead-Free Crystal
            </span>
            <h3 className="font-serif text-2xl text-stone-950 font-normal">
              An Heirloom in the Hand
            </h3>
            <p>
              Every Zell Mont flacon is blown from heavy, optical-grade lead-free crystal with hand-beveled edges. Capped with a weighty 24-karat gold-plated zinc talisman, each flacon is individually numbered and hand-sealed with pure silk cord before arriving at your private salon.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="p-6 bg-white border-t border-[#efeeeb] flex justify-end">
          <button
            onClick={onClose}
            className="px-8 py-3 bg-stone-950 text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-stone-800 transition-colors shadow rounded-sm cursor-pointer"
          >
            Close Heritage Dossier
          </button>
        </div>

      </div>
    </div>
  );
};

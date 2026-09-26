import React, { useState } from 'react';
import { FragranceProduct } from '../types';
import { FRAGRANCES_DATA } from '../data/fragrances';

interface FragranceFinderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: FragranceProduct) => void;
  onAddToCart: (product: FragranceProduct, volume: number) => void;
}

export const FragranceFinderModal: React.FC<FragranceFinderModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onAddToCart,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    mood: '',
    occasion: '',
    intensity: '',
    noteFamily: '',
  });
  const [result, setResult] = useState<FragranceProduct | null>(null);

  if (!isOpen) return null;

  const questions = [
    {
      id: 'mood',
      title: 'What presence or emotion do you wish to project?',
      subtitle: 'Movement 01 &bull; The Emotional Silhouette',
      options: [
        { label: 'Effervescent, Radiant & Crisp', value: 'fresh', desc: 'Solar bergamot, chilled mountain mist, crystalline white tea.' },
        { label: 'Commanding, Resinous & Aristocratic', value: 'woody', desc: 'Aged cedarwood, Assam agarwood, dark smoke, leather lapels.' },
        { label: 'Sensual, Intimate & Floral Nectar', value: 'floral', desc: 'Damask rose, white jasmine grandiflorum, golden bourbon vanilla.' },
        { label: 'Sacred, Meditative & Ancient', value: 'attar', desc: 'Pure Mysore sandalwood, botanical musk, weeping frankincense gum.' },
      ],
    },
    {
      id: 'occasion',
      title: 'For which atmosphere is this composition destined?',
      subtitle: 'Movement 02 &bull; Context of Wear',
      options: [
        { label: 'Daily Signature & Sunlit Salons', value: 'daily', desc: 'Subtle elegance, office authority, daytime radiance.' },
        { label: 'Black-Tie Gala & Nocturnal Gatherings', value: 'evening', desc: 'Heavy sillage, deep drydown, captivating magnetism.' },
        { label: 'Intimate Solitude & Meditative Reflection', value: 'intimate', desc: 'Close skin scent, sacred oils, calming resins.' },
      ],
    },
    {
      id: 'intensity',
      title: 'Which concentration format matches your ritual?',
      subtitle: 'Movement 03 &bull; Concentration & Tenacity',
      options: [
        { label: 'Extrait de Parfum (32% - 38% Pure Oil)', value: 'extrait', desc: 'Remarkable 12+ hour longevity with nuanced chronological transitions.' },
        { label: 'Eau de Parfum (20% - 25% Concentration)', value: 'edp', desc: 'Luminous sillage with arm’s length projection.' },
        { label: '100% Pure Kannauj Attar Oil (Alcohol-Free)', value: 'attar', desc: 'Intimate second-skin fusion lasting over 24 hours.' },
      ],
    },
  ];

  const handleSelectOption = (key: string, value: string) => {
    const updated = { ...answers, [key]: value };
    setAnswers(updated);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate match
      let match = FRAGRANCES_DATA[0]; // default Citrus Air
      if (updated.mood === 'fresh') {
        match = FRAGRANCES_DATA.find((p) => p.id === 'citrus-air') || FRAGRANCES_DATA[0];
      } else if (updated.mood === 'woody') {
        match = FRAGRANCES_DATA.find((p) => p.id === 'royal-oud' || p.id === 'cedar-noir') || FRAGRANCES_DATA[1];
      } else if (updated.mood === 'floral') {
        match = FRAGRANCES_DATA.find((p) => p.id === 'rose-velvet' || p.id === 'jasmine-nectar') || FRAGRANCES_DATA[3];
      } else if (updated.mood === 'attar' || updated.intensity === 'attar') {
        match = FRAGRANCES_DATA.find((p) => p.id === 'golden-musk' || p.concentration === 'Pure Attar') || FRAGRANCES_DATA[5];
      }
      setResult(match);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({ mood: '', occasion: '', intensity: '', noteFamily: '' });
    setResult(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/75 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#fbf9f6] text-[#1b1c1a] max-w-xl w-full border border-stone-300 rounded-sm shadow-2xl relative overflow-hidden">
        
        {/* Header */}
        <div className="p-6 bg-white border-b border-[#efeeeb] flex items-center justify-between">
          <div>
            <span className="text-[9.5px] uppercase tracking-[0.25em] text-[#715b32] font-semibold block">
              Zell Mont Olfactory Diagnostic
            </span>
            <h2 className="font-serif text-2xl font-light text-stone-950">
              {result ? 'Bespoke Prescription' : 'The Fragrance Finder'}
            </h2>
          </div>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-800 p-1 cursor-pointer">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content */}
        {!result ? (
          <div className="p-6 md:p-8 space-y-6">
            
            {/* Progress indicator */}
            <div className="flex items-center gap-2">
              {questions.map((_, idx) => (
                <div
                  key={idx}
                  className={`flex-1 h-1 rounded-full transition-all ${
                    idx <= currentStep ? 'bg-[#715b32]' : 'bg-stone-200'
                  }`}
                />
              ))}
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-widest text-stone-400 font-medium">
                {questions[currentStep].subtitle}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-light text-stone-950 mt-1">
                {questions[currentStep].title}
              </h3>
            </div>

            <div className="space-y-3">
              {questions[currentStep].options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleSelectOption(questions[currentStep].id, opt.value)}
                  className="w-full p-4 bg-white border border-stone-200 hover:border-[#715b32] hover:bg-[#f5f3f0] rounded-sm text-left transition-all cursor-pointer group shadow-2xs"
                >
                  <span className="font-serif text-base font-medium text-stone-900 group-hover:text-[#715b32] block">
                    {opt.label}
                  </span>
                  <span className="text-xs text-stone-500 font-light mt-1 block">
                    {opt.desc}
                  </span>
                </button>
              ))}
            </div>

            {currentStep > 0 && (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="text-xs uppercase tracking-wider text-stone-500 hover:text-stone-900 cursor-pointer"
              >
                &larr; Previous Question
              </button>
            )}
          </div>
        ) : (
          /* Result Match Screen */
          <div className="p-6 md:p-8 space-y-6">
            <div className="p-4 bg-[#fedeaa]/30 border border-[#715b32]/30 rounded text-center">
              <span className="text-[10px] uppercase tracking-widest text-[#715b32] font-semibold block">
                98.4% Olfactory Compatibility
              </span>
              <span className="font-serif text-lg text-stone-900 font-medium">
                Anointed Prescription for Your Aura
              </span>
            </div>

            <div className="bg-white p-6 border border-stone-200 rounded-sm flex flex-col sm:flex-row items-center gap-6">
              <div className="w-32 h-36 bg-[#f5f3f0] p-3 rounded flex items-center justify-center flex-shrink-0">
                <img
                  src={result.image}
                  alt={result.name}
                  className="max-h-full object-contain filter drop-shadow-md"
                />
              </div>

              <div className="space-y-1.5 text-center sm:text-left">
                <span className="text-[9px] uppercase tracking-wider text-[#715b32] font-semibold">
                  Flacon No. {result.number} &bull; {result.family}
                </span>
                <h3 className="font-serif text-2xl font-light text-stone-950">
                  {result.name}
                </h3>
                <p className="text-xs text-stone-500 italic">{result.subtitle}</p>
                <p className="text-xs text-stone-600 line-clamp-2 mt-2">{result.shortDescription}</p>
                <div className="pt-2">
                  <span className="font-serif text-xl font-semibold text-stone-950">
                    ₹{result.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] text-stone-400 ml-2">100ml Extrait</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  onClose();
                  onSelectProduct(result);
                }}
                className="flex-1 py-3 border border-stone-800 text-stone-900 text-xs uppercase tracking-[0.2em] font-medium hover:bg-stone-900 hover:text-white transition-colors cursor-pointer text-center"
              >
                View Flacon Dossier
              </button>
              <button
                onClick={() => {
                  onAddToCart(result, 100);
                  onClose();
                }}
                className="flex-1 py-3 bg-stone-950 text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-stone-800 transition-colors shadow cursor-pointer text-center"
              >
                Add to Sartorial Bag
              </button>
            </div>

            <div className="text-center pt-2">
              <button
                onClick={handleReset}
                className="text-[11px] text-stone-500 underline hover:text-stone-900 cursor-pointer"
              >
                Retake Diagnostic Questionnaire
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

import React, { useState, useMemo } from 'react';
import { FragranceProduct, OlfactoryFamily, SillageGender, ConcentrationType } from '../types';
import { FRAGRANCES_DATA } from '../data/fragrances';

interface CatalogueViewProps {
  onSelectProduct: (product: FragranceProduct) => void;
  onAddToCart: (product: FragranceProduct, volume: number) => void;
  onToggleWishlist: (product: FragranceProduct) => void;
  wishlist: FragranceProduct[];
}

export const CatalogueView: React.FC<CatalogueViewProps> = ({
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  wishlist,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGender, setSelectedGender] = useState<'All' | SillageGender>('All');
  const [selectedFamily, setSelectedFamily] = useState<'All' | OlfactoryFamily>('All');
  const [selectedConcentration, setSelectedConcentration] = useState<'All' | ConcentrationType>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [selectedVolumes, setSelectedVolumes] = useState<Record<string, number>>({});

  const families: ('All' | OlfactoryFamily)[] = ['All', 'Citrus', 'Woody', 'Floral', 'Rare Oud', 'Amber & Resin', 'Musk'];
  const genders: ('All' | SillageGender)[] = ['All', 'Men', 'Women', 'Unisex'];
  const concentrations: ('All' | ConcentrationType)[] = ['All', 'Extrait de Parfum', 'Eau de Parfum', 'Pure Attar'];

  const isWishlisted = (id: string) => wishlist.some((item) => item.id === id);

  const filteredProducts = useMemo(() => {
    return FRAGRANCES_DATA.filter((p) => {
      // Gender filter
      if (selectedGender !== 'All' && p.gender !== selectedGender) return false;
      // Family filter
      if (selectedFamily !== 'All' && p.family !== selectedFamily) return false;
      // Concentration filter
      if (selectedConcentration !== 'All' && p.concentration !== selectedConcentration) return false;
      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesSubtitle = p.subtitle.toLowerCase().includes(q);
        const matchesAccords = 
          p.accords.head.toLowerCase().includes(q) ||
          p.accords.heart.toLowerCase().includes(q) ||
          p.accords.base.toLowerCase().includes(q);
        const matchesNumber = p.number.includes(q);
        return matchesName || matchesSubtitle || matchesAccords || matchesNumber;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // default featured order
    });
  }, [searchQuery, selectedGender, selectedFamily, selectedConcentration, sortBy]);

  const handleVolumeChange = (productId: string, volume: number) => {
    setSelectedVolumes((prev) => ({ ...prev, [productId]: volume }));
  };

  const getProductPrice = (product: FragranceProduct) => {
    const selectedVol = selectedVolumes[product.id] || 100;
    if (selectedVol === 50 && product.price50ml) {
      return product.price50ml;
    }
    return product.price;
  };

  return (
    <div className="bg-[#fbf9f6] text-[#1b1c1a] min-h-screen py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#715b32] font-semibold block mb-2">
            The Complete Anthology
          </span>
          <h1 className="font-serif text-3xl md:text-5xl font-light text-stone-950 tracking-tight">
            Flacons &amp; Extraits
          </h1>
          <p className="mt-3 text-xs md:text-sm text-stone-600 font-light leading-relaxed">
            Twenty distinctive olfactory works formulated across Grasse and New Delhi. Each bottle embodies authentic botanical extractions with 90 days of cold maturation.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white border border-[#eae8e5] p-5 rounded-sm shadow-xs mb-10 space-y-4">
          
          {/* Top Bar: Search & Sort */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-[18px]">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notes (e.g., Bergamot, Oud, Rose, 11)..."
                className="w-full bg-[#fbf9f6] border border-stone-200 rounded-sm pl-9 pr-8 py-2 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#715b32]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-0.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[14px]">close</span>
                </button>
              )}
            </div>

            {/* Results count & Sort selector */}
            <div className="flex items-center justify-between w-full md:w-auto gap-4">
              <span className="text-xs text-stone-500 whitespace-nowrap">
                Showing <strong className="text-stone-900">{filteredProducts.length}</strong> creations
              </span>

              <div className="flex items-center gap-2">
                <span className="text-[11px] uppercase tracking-wider text-stone-400 whitespace-nowrap">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-[#fbf9f6] border border-stone-200 text-xs px-2.5 py-1.5 rounded-sm focus:outline-none text-stone-800 cursor-pointer"
                >
                  <option value="featured">Featured / Flacon No.</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Connoisseur Rating</option>
                </select>
              </div>
            </div>

          </div>

          {/* Bottom Filter Pills: Family, Gender, Concentration */}
          <div className="pt-3 border-t border-stone-100 flex flex-wrap gap-6 items-center">
            
            {/* Olfactory Family Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] uppercase tracking-wider text-stone-400 mr-1 font-semibold">Family:</span>
              {families.map((fam) => (
                <button
                  key={fam}
                  onClick={() => setSelectedFamily(fam)}
                  className={`text-[11px] px-2.5 py-1 rounded-sm transition-colors cursor-pointer ${
                    selectedFamily === fam
                      ? 'bg-stone-950 text-white font-medium'
                      : 'bg-[#f5f3f0] text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {fam}
                </button>
              ))}
            </div>

            {/* Gender Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] uppercase tracking-wider text-stone-400 mr-1 font-semibold">Gender:</span>
              {genders.map((g) => (
                <button
                  key={g}
                  onClick={() => setSelectedGender(g)}
                  className={`text-[11px] px-2.5 py-1 rounded-sm transition-colors cursor-pointer ${
                    selectedGender === g
                      ? 'bg-[#715b32] text-white font-medium'
                      : 'bg-[#f5f3f0] text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>

            {/* Concentration Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] uppercase tracking-wider text-stone-400 mr-1 font-semibold">Format:</span>
              {concentrations.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedConcentration(c)}
                  className={`text-[11px] px-2.5 py-1 rounded-sm transition-colors cursor-pointer ${
                    selectedConcentration === c
                      ? 'bg-stone-800 text-white font-medium'
                      : 'bg-[#f5f3f0] text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {c === 'Extrait de Parfum' ? 'Extrait' : c === 'Eau de Parfum' ? 'EDP' : 'Pure Attar'}
                </button>
              ))}
            </div>

            {/* Reset Filter Button */}
            {(selectedFamily !== 'All' || selectedGender !== 'All' || selectedConcentration !== 'All' || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedFamily('All');
                  setSelectedGender('All');
                  setSelectedConcentration('All');
                  setSearchQuery('');
                }}
                className="text-[11px] text-[#715b32] underline hover:text-stone-900 cursor-pointer ml-auto"
              >
                Reset All Filters
              </button>
            )}

          </div>

        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white border border-stone-200 rounded-sm">
            <span className="material-symbols-outlined text-4xl text-stone-400 mb-2">sentiment_dissatisfied</span>
            <p className="font-serif text-lg text-stone-800">No creations matched your criteria.</p>
            <p className="text-xs text-stone-500 mt-1">Try relaxing your olfactory family or search term.</p>
            <button
              onClick={() => {
                setSelectedFamily('All');
                setSelectedGender('All');
                setSelectedConcentration('All');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-stone-900 text-white text-xs uppercase tracking-wider cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const wish = isWishlisted(product.id);
              const currentVol = selectedVolumes[product.id] || (product.concentration === 'Pure Attar' ? 12 : 100);
              const currentPrice = getProductPrice(product);

              return (
                <div
                  key={product.id}
                  className="group bg-white border border-[#eae8e5] hover:border-[#715b32]/40 rounded-sm overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-lg"
                >
                  {/* Flacon Visual Card Top */}
                  <div className="relative aspect-4/5 bg-[#f5f3f0] p-6 flex items-center justify-center overflow-hidden">
                    
                    {/* Badge */}
                    {product.badge && (
                      <span className="absolute top-3 left-3 bg-stone-950/90 text-white text-[8.5px] uppercase tracking-[0.18em] px-2 py-0.5 font-medium z-10">
                        {product.badge}
                      </span>
                    )}

                    {/* Wishlist Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWishlist(product);
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
                      onClick={() => onSelectProduct(product)}
                      className="cursor-pointer w-full h-full flex items-center justify-center"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="max-h-56 w-auto object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>

                    {/* Bottle Number Tag */}
                    <span className="absolute bottom-2 left-3 text-[9px] font-mono tracking-widest text-stone-400">
                      FLACON {product.number}
                    </span>

                    {/* Rating Pill */}
                    <span className="absolute bottom-2 right-3 text-[10px] text-stone-600 bg-white/80 px-1.5 py-0.2 rounded flex items-center gap-0.5 font-medium">
                      ★ {product.rating}
                    </span>
                  </div>

                  {/* Info Card Middle */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-stone-500 mb-1">
                        <span>{product.family}</span>
                        <span>{product.gender}</span>
                      </div>

                      <h3
                        onClick={() => onSelectProduct(product)}
                        className="font-serif text-lg font-medium text-stone-950 hover:text-[#715b32] transition-colors cursor-pointer"
                      >
                        {product.name}
                      </h3>

                      <p className="text-xs text-stone-500 line-clamp-1 italic mt-0.5">
                        {product.subtitle}
                      </p>

                      {/* Head / Heart / Base Summary */}
                      <div className="mt-3 pt-2 border-t border-stone-100 text-[10.5px] text-stone-600 space-y-1">
                        <p className="line-clamp-1">
                          <strong className="text-stone-800">Accords:</strong> {product.accords.head} &bull; {product.accords.heart}
                        </p>
                      </div>

                      {/* Optional Volume Switcher if 50ml available */}
                      {product.price50ml && (
                        <div className="mt-3 flex items-center gap-2">
                          <span className="text-[10px] uppercase tracking-wider text-stone-400">Volume:</span>
                          <button
                            onClick={() => handleVolumeChange(product.id, 50)}
                            className={`text-[10px] px-2 py-0.5 border rounded cursor-pointer ${
                              currentVol === 50 ? 'border-stone-950 bg-stone-950 text-white' : 'border-stone-200 text-stone-600'
                            }`}
                          >
                            50 ML
                          </button>
                          <button
                            onClick={() => handleVolumeChange(product.id, 100)}
                            className={`text-[10px] px-2 py-0.5 border rounded cursor-pointer ${
                              currentVol === 100 ? 'border-stone-950 bg-stone-950 text-white' : 'border-stone-200 text-stone-600'
                            }`}
                          >
                            100 ML
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Price and Actions Bottom */}
                    <div className="mt-5 pt-3 border-t border-[#efeeeb] flex items-center justify-between">
                      <div>
                        <span className="font-serif text-base font-semibold text-stone-950">
                          ₹{currentPrice.toLocaleString('en-IN')}
                        </span>
                        <span className="block text-[8.5px] uppercase tracking-wider text-stone-400">
                          {currentVol} ML {product.concentration === 'Pure Attar' ? 'Pure Oil' : 'Extrait'}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => onSelectProduct(product)}
                          className="p-2 border border-stone-300 text-stone-700 hover:text-stone-950 hover:border-stone-800 transition-colors rounded-sm cursor-pointer"
                          title="View Technical Dossier"
                        >
                          <span className="material-symbols-outlined text-[16px]">visibility</span>
                        </button>
                        <button
                          onClick={() => onAddToCart(product, currentVol)}
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
        )}

      </div>
    </div>
  );
};

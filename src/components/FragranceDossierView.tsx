import React, { useState, useEffect } from 'react';
import { FragranceProduct } from '../types';
import { FRAGRANCES_DATA } from '../data/fragrances';
import { supabaseService } from '../services/supabaseService';
import { useAuth } from '../context/AuthContext';

interface FragranceDossierViewProps {
  product: FragranceProduct;
  onAddToCart: (product: FragranceProduct, volume: number, monogram?: string) => void;
  onToggleWishlist: (product: FragranceProduct) => void;
  wishlist: FragranceProduct[];
  onSelectProduct: (product: FragranceProduct) => void;
  onBack: () => void;
}

export const FragranceDossierView: React.FC<FragranceDossierViewProps> = ({
  product,
  onAddToCart,
  onToggleWishlist,
  wishlist,
  onSelectProduct,
  onBack,
}) => {
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [selectedVolume, setSelectedVolume] = useState<number>(product.concentration === 'Pure Attar' ? 12 : 100);
  const [activeAccordTab, setActiveAccordTab] = useState<'head' | 'heart' | 'soul'>('head');
  const [monogram, setMonogram] = useState('');
  const [enableMonogram, setEnableMonogram] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { user } = useAuth();
  const [addedAnimation, setAddedAnimation] = useState(false);

  // Initial review submission state
  const [reviews, setReviews] = useState([
    {
      author: 'Lord Julian C.',
      rating: 5,
      date: 'May 14, 2026',
      title: 'Incredible crystalline longevity',
      content: 'Most citrus compositions evaporate within 90 minutes. Flacon 11 maintains a scintillating bergamot and neroli radiance through the afternoon, supported by extraordinary white cedar.'
    },
    {
      author: 'Dr. Priya Singhania',
      rating: 5,
      date: 'April 28, 2026',
      title: 'The gold monogram cap is pure heirloom luxury',
      content: 'The weight of the bottle in hand is magnificent. The laser engraving on the cap is impeccably sharp, and the complimentary discovery vials are a delightful touch.'
    }
  ]);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newAuthor, setNewAuthor] = useState(user?.user_metadata?.full_name || '');
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newRating, setNewRating] = useState(5);

  // Fetch reviews from Supabase for this product on mount
  useEffect(() => {
    const loadSupabaseReviews = async () => {
      try {
        const fetched = await supabaseService.fetchReviews(product.id);
        if (fetched && fetched.length > 0) {
          const mapped = fetched.map((f) => ({
            author: f.authorName,
            rating: f.rating,
            date: new Date(f.createdAt).toLocaleDateString(),
            title: f.title,
            content: f.content,
          }));
          setReviews((prev) => [...mapped, ...prev]);
        }
      } catch (err) {
        console.warn('Reviews fetch notice:', err);
      }
    };

    loadSupabaseReviews();
  }, [product.id]);

  useEffect(() => {
    if (user?.user_metadata?.full_name && !newAuthor) {
      setNewAuthor(user.user_metadata.full_name);
    }
  }, [user]);

  const isWish = wishlist.some((item) => item.id === product.id);

  // Calculate dynamic price based on volume
  const currentPrice = (selectedVolume === 50 && product.price50ml) 
    ? product.price50ml 
    : product.price;

  // Layering pairings: select 2 other fragrances
  const layeringPairings = FRAGRANCES_DATA
    .filter((p) => p.id !== product.id)
    .slice(0, 2);

  const handleAdd = () => {
    onAddToCart(product, selectedVolume, enableMonogram && monogram.trim() ? monogram.trim().toUpperCase() : undefined);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2000);
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newAuthor.trim() && newContent.trim()) {
      const reviewObj = {
        author: newAuthor.trim(),
        title: newTitle.trim() || 'Exceptional Flacon',
        content: newContent.trim(),
        rating: newRating,
        date: 'Just now'
      };

      setReviews([reviewObj, ...reviews]);

      // Write to Supabase database
      try {
        await supabaseService.submitReview({
          userId: user?.id || null,
          productId: product.id,
          authorName: reviewObj.author,
          title: reviewObj.title,
          content: reviewObj.content,
          rating: reviewObj.rating,
        });
      } catch (err) {
        console.warn('Review write notice:', err);
      }

      setNewTitle('');
      setNewContent('');
      setShowReviewModal(false);
    }
  };

  return (
    <div className="bg-[#fbf9f6] text-[#1b1c1a] min-h-screen py-8 md:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#efeeeb] text-xs text-stone-500">
          <button
            onClick={onBack}
            className="flex items-center gap-1 hover:text-stone-950 transition-colors cursor-pointer uppercase tracking-wider"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>Return to Anthology</span>
          </button>

          <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-stone-400">
            <span>Dossier Archive</span>
            <span>/</span>
            <span className="text-stone-900 font-semibold">{product.name}</span>
          </div>
        </div>

        {/* Master Showcase: Image Gallery & Core Dossier */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          
          {/* Left Column: Visual Flacon Presentation & Gallery */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Main Stage Image */}
            <div className="relative aspect-4/5 bg-[#f5f3f0] border border-stone-200 rounded-sm p-10 flex items-center justify-center overflow-hidden shadow-sm">
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-1 z-10">
                <span className="bg-stone-950 text-white text-[9px] uppercase tracking-[0.2em] font-medium px-2.5 py-1">
                  FLACON NO. {product.number}
                </span>
                {product.badge && (
                  <span className="bg-[#fedeaa] text-[#715b32] text-[9px] uppercase tracking-[0.16em] font-bold px-2 py-0.5 border border-[#e0c290]">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Wishlist Button */}
              <button
                onClick={() => onToggleWishlist(product)}
                className={`absolute top-4 right-4 p-2 rounded-full z-10 transition-colors cursor-pointer ${
                  isWish ? 'text-red-700 bg-white shadow-sm' : 'text-stone-400 hover:text-stone-900 bg-white/80'
                }`}
                title={isWish ? 'Remove from wishlist' : 'Save to wishlist'}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {isWish ? 'favorite' : 'favorite_border'}
                </span>
              </button>

              {/* Central Flacon Display with subtle glow */}
              <div className="relative group w-full h-full flex items-center justify-center">
                <div className="absolute inset-4 bg-radial from-amber-200/40 via-transparent to-transparent blur-2xl opacity-60" />
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="relative max-h-80 sm:max-h-96 w-auto object-contain filter drop-shadow-2xl transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* Interactive Monogram Preview on Cap */}
              {enableMonogram && monogram.trim() && (
                <div className="absolute bottom-4 right-4 bg-stone-950 text-[#e0c290] border border-[#715b32] px-3 py-1.5 rounded-xs text-center shadow-lg animate-in fade-in">
                  <span className="block text-[8px] uppercase tracking-widest text-stone-400">Engraving Preview</span>
                  <span className="font-serif font-bold text-sm tracking-widest">{monogram.toUpperCase()}</span>
                </div>
              )}
            </div>

            {/* Gallery Thumbnails */}
            {product.galleryImages && product.galleryImages.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {product.galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`relative w-20 h-20 rounded-sm bg-[#f5f3f0] border p-2 flex items-center justify-center flex-shrink-0 transition-all cursor-pointer ${
                      selectedImage === img
                        ? 'border-stone-950 ring-1 ring-stone-950 shadow-sm'
                        : 'border-stone-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`${product.name} angle ${idx + 1}`} className="max-h-full object-contain" />
                  </button>
                ))}
              </div>
            )}

            {/* Savoir-Faire Guarantee Seals */}
            <div className="p-4 bg-white border border-stone-200 rounded-sm grid grid-cols-3 gap-2 text-center text-stone-600">
              <div className="p-2 border-r border-stone-100">
                <span className="material-symbols-outlined text-[#715b32] text-xl mb-1 block">verified_user</span>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-stone-800 block">Certificate</span>
                <span className="text-[9px] text-stone-500">Hand-signed Paris seal</span>
              </div>
              <div className="p-2 border-r border-stone-100">
                <span className="material-symbols-outlined text-[#715b32] text-xl mb-1 block">package_2</span>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-stone-800 block">Coffret</span>
                <span className="text-[9px] text-stone-500">Silk-lined rigid wood</span>
              </div>
              <div className="p-2">
                <span className="material-symbols-outlined text-[#715b32] text-xl mb-1 block">local_shipping</span>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-stone-800 block">White Glove</span>
                <span className="text-[9px] text-stone-500">Complimentary insured</span>
              </div>
            </div>

          </div>

          {/* Right Column: Technical Dossier, Volume & Cart Controls */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between text-xs text-stone-500 uppercase tracking-widest mb-1.5">
                <span>{product.family} Family &bull; {product.gender}</span>
                <span className="text-[#715b32] font-semibold">{product.concentration}</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-stone-950 tracking-tight">
                {product.name}
              </h1>

              <p className="font-serif italic text-base text-stone-600 mt-1">
                {product.subtitle}
              </p>

              {/* Rating and Reviews Counter */}
              <div className="flex items-center gap-2 mt-3 text-xs text-stone-600">
                <span className="text-[#715b32] font-bold">★★★★★</span>
                <span className="font-medium text-stone-900">{product.rating} / 5.0</span>
                <span>&bull;</span>
                <button 
                  onClick={() => {
                    const el = document.getElementById('reviews-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="underline hover:text-stone-950 cursor-pointer"
                >
                  {product.reviewsCount + reviews.length - 2} Connoisseur Reviews
                </button>
              </div>
            </div>

            {/* Price block */}
            <div className="p-4 bg-white border border-[#eae8e5] rounded-sm flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-stone-400 block">Price (Inclusive of all duties)</span>
                <span className="font-serif text-3xl font-semibold text-stone-950">
                  ₹{currentPrice.toLocaleString('en-IN')}
                </span>
              </div>
              <span className="text-xs uppercase tracking-wider text-[#715b32] font-medium bg-[#fedeaa]/40 px-2.5 py-1 border border-[#715b32]/20">
                {product.concentrationDetail}
              </span>
            </div>

            {/* Short Narrative */}
            <p className="text-sm text-stone-700 font-light leading-relaxed">
              {product.narrative}
            </p>

            {/* Volume Selector */}
            <div>
              <span className="text-[10.5px] uppercase tracking-[0.2em] text-stone-400 font-semibold block mb-2">
                Select Architectural Volume:
              </span>
              <div className="grid grid-cols-2 gap-3">
                {product.concentration === 'Pure Attar' ? (
                  <button
                    onClick={() => setSelectedVolume(12)}
                    className="p-3 border rounded-sm text-left border-stone-950 bg-stone-950 text-white cursor-pointer"
                  >
                    <span className="font-serif font-medium text-sm block">12 ML Pure Attar</span>
                    <span className="text-[11px] text-stone-300">₹{product.price.toLocaleString('en-IN')} &bull; Pure Crystal Vial</span>
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => setSelectedVolume(100)}
                      className={`p-3 border rounded-sm text-left transition-all cursor-pointer ${
                        selectedVolume === 100
                          ? 'border-stone-950 bg-stone-950 text-white shadow-sm'
                          : 'border-stone-200 bg-white text-stone-800 hover:border-stone-400'
                      }`}
                    >
                      <span className="font-serif font-medium text-sm block">100 ML Grand Flacon</span>
                      <span className="text-[11px] opacity-80">₹{product.price.toLocaleString('en-IN')} &bull; Standard Extrait</span>
                    </button>

                    {product.price50ml && (
                      <button
                        onClick={() => setSelectedVolume(50)}
                        className={`p-3 border rounded-sm text-left transition-all cursor-pointer ${
                          selectedVolume === 50
                            ? 'border-stone-950 bg-stone-950 text-white shadow-sm'
                            : 'border-stone-200 bg-white text-stone-800 hover:border-stone-400'
                        }`}
                      >
                        <span className="font-serif font-medium text-sm block">50 ML Voyage Flacon</span>
                        <span className="text-[11px] opacity-80">₹{product.price50ml.toLocaleString('en-IN')} &bull; Travel Edition</span>
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Bespoke Laser Monogramming Option */}
            <div className="p-4 bg-[#f5f3f0] border border-stone-300/80 rounded-sm space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#715b32] text-lg">draw</span>
                  <span className="text-xs uppercase tracking-wider font-semibold text-stone-900">
                    Complimentary Gold Cap Monogramming
                  </span>
                </div>
                <input
                  type="checkbox"
                  id="monogram-toggle"
                  checked={enableMonogram}
                  onChange={(e) => setEnableMonogram(e.target.checked)}
                  className="w-4 h-4 accent-stone-900 cursor-pointer"
                />
              </div>

              {enableMonogram && (
                <div className="pt-2 animate-in fade-in duration-200 space-y-2">
                  <p className="text-[11px] text-stone-600 font-light">
                    Enter up to 3 initials to be laser-engraved onto the heavy mirror-polished gold zinc cap:
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      maxLength={3}
                      value={monogram}
                      onChange={(e) => setMonogram(e.target.value.toUpperCase())}
                      placeholder="e.g. Z.M."
                      className="bg-white border border-stone-300 px-3 py-1.5 text-xs uppercase tracking-widest font-mono text-stone-900 focus:outline-none focus:border-[#715b32] w-32"
                    />
                    <span className="text-[11px] text-stone-500 self-center">
                      (Bespoke engraving performed at New Delhi salon prior to dispatch)
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Quantity & Add to Cart Action */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-4">
                
                {/* Quantity selector */}
                <div className="flex items-center border border-stone-300 bg-white rounded-sm">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 text-stone-600 hover:text-stone-950 cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <span className="material-symbols-outlined text-[16px]">remove</span>
                  </button>
                  <span className="w-8 text-center text-xs font-semibold text-stone-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 text-stone-600 hover:text-stone-950 cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <span className="material-symbols-outlined text-[16px]">add</span>
                  </button>
                </div>

                {/* Add to Bag Button */}
                <button
                  onClick={handleAdd}
                  className={`flex-1 py-3.5 px-6 text-xs uppercase tracking-[0.24em] font-medium transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 rounded-sm ${
                    addedAnimation
                      ? 'bg-[#715b32] text-white'
                      : 'bg-stone-950 text-white hover:bg-stone-800'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {addedAnimation ? 'check' : 'shopping_bag'}
                  </span>
                  <span>{addedAnimation ? 'Added to Sartorial Bag' : 'Add to Sartorial Bag'}</span>
                </button>
              </div>

              {/* Complimentary Discovery Samples Banner */}
              <div className="flex items-center gap-2 text-xs text-[#715b32] bg-[#fedeaa]/30 p-2.5 rounded-sm border border-[#715b32]/20">
                <span className="material-symbols-outlined text-[18px]">card_giftcard</span>
                <span>You will choose <strong>2 Complimentary 2ml Discovery Vials</strong> at bag checkout.</span>
              </div>
            </div>

          </div>

        </div>

        {/* Technical Olfactory Metrics & Radar Section */}
        <div className="bg-white border border-[#eae8e5] p-8 md:p-12 rounded-sm mb-16 shadow-xs">
          <div className="max-w-3xl mb-8">
            <span className="text-[10px] uppercase tracking-[0.28em] text-[#715b32] font-semibold">
              The Physical Signature
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-light text-stone-950 mt-1">
              Olfactory Metrics &amp; Performance
            </h2>
            <p className="text-xs text-stone-500 mt-1 font-light">
              Laboratory measured sillage radiance and botanical longevity calibrated across skin temperatures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Freshness Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-stone-700">Freshness Aperture</span>
                <span className="font-mono text-stone-900 font-semibold">{product.metrics.freshness}%</span>
              </div>
              <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#715b32] rounded-full transition-all duration-1000"
                  style={{ width: `${product.metrics.freshness}%` }}
                />
              </div>
              <span className="text-[10px] text-stone-400">Solar citrus &amp; green botanicals</span>
            </div>

            {/* Woodiness Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-stone-700">Woodiness &amp; Resin</span>
                <span className="font-mono text-stone-900 font-semibold">{product.metrics.woodiness}%</span>
              </div>
              <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-stone-800 rounded-full transition-all duration-1000"
                  style={{ width: `${product.metrics.woodiness}%` }}
                />
              </div>
              <span className="text-[10px] text-stone-400">Cedar, Agarwood, Sandalwood</span>
            </div>

            {/* Warmth Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-stone-700">Warmth &amp; Sillage</span>
                <span className="font-mono text-stone-900 font-semibold">{product.metrics.warmth}%</span>
              </div>
              <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#e0c290] rounded-full transition-all duration-1000"
                  style={{ width: `${product.metrics.warmth}%` }}
                />
              </div>
              <span className="text-[10px] text-stone-400">Ambergris, Vanilla, Cashmeran</span>
            </div>

            {/* Sillage & Longevity Cards */}
            <div className="p-3 bg-[#fbf9f6] border border-stone-200 rounded text-center flex flex-col justify-center">
              <span className="text-[10px] uppercase tracking-wider text-stone-400 font-medium">Projection &amp; Tenacity</span>
              <span className="font-serif text-base font-semibold text-stone-900 mt-1">{product.metrics.sillage}</span>
              <span className="text-xs text-[#715b32] font-medium mt-0.5">{product.metrics.longevity} Longevity</span>
            </div>

          </div>
        </div>

        {/* Chronological Olfactory Movements (Pyramid Detailed) */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[10px] uppercase tracking-[0.28em] text-[#715b32] font-semibold">
              The Living Symphony
            </span>
            <h2 className="font-serif text-3xl font-light text-stone-950 mt-1">
              Chronological Note Pyramid
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Head Note */}
            <div 
              onClick={() => setActiveAccordTab('head')}
              className={`p-6 border rounded-sm transition-all cursor-pointer ${
                activeAccordTab === 'head' 
                  ? 'border-[#715b32] bg-[#fbf9f6] ring-1 ring-[#715b32]/30 shadow-sm' 
                  : 'border-stone-200 bg-white hover:border-stone-300'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] uppercase tracking-widest text-stone-400 font-mono">01 / HEAD</span>
                <span className="text-[11px] px-2 py-0.5 bg-[#fedeaa]/60 text-[#715b32] font-semibold rounded">
                  0 — 30 MINS
                </span>
              </div>
              <h3 className="font-serif text-xl font-medium text-stone-900 mb-2">Solar Opening</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {product.notesDetailed.head.description}
              </p>
              <div className="mt-4 pt-3 border-t border-stone-200 text-xs">
                <strong className="text-stone-800">Accords:</strong> {product.accords.head}
              </div>
            </div>

            {/* Heart Note */}
            <div 
              onClick={() => setActiveAccordTab('heart')}
              className={`p-6 border rounded-sm transition-all cursor-pointer ${
                activeAccordTab === 'heart' 
                  ? 'border-[#715b32] bg-[#fbf9f6] ring-1 ring-[#715b32]/30 shadow-sm' 
                  : 'border-stone-200 bg-white hover:border-stone-300'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] uppercase tracking-widest text-stone-400 font-mono">02 / HEART</span>
                <span className="text-[11px] px-2 py-0.5 bg-[#fedeaa]/60 text-[#715b32] font-semibold rounded">
                  2 — 6 HOURS
                </span>
              </div>
              <h3 className="font-serif text-xl font-medium text-stone-900 mb-2">Harmonic Core</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {product.notesDetailed.heart.description}
              </p>
              <div className="mt-4 pt-3 border-t border-stone-200 text-xs">
                <strong className="text-stone-800">Accords:</strong> {product.accords.heart}
              </div>
            </div>

            {/* Soul Note */}
            <div 
              onClick={() => setActiveAccordTab('soul')}
              className={`p-6 border rounded-sm transition-all cursor-pointer ${
                activeAccordTab === 'soul' 
                  ? 'border-[#715b32] bg-[#fbf9f6] ring-1 ring-[#715b32]/30 shadow-sm' 
                  : 'border-stone-200 bg-white hover:border-stone-300'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] uppercase tracking-widest text-stone-400 font-mono">03 / SOUL</span>
                <span className="text-[11px] px-2 py-0.5 bg-[#fedeaa]/60 text-[#715b32] font-semibold rounded">
                  8 — 14+ HOURS
                </span>
              </div>
              <h3 className="font-serif text-xl font-medium text-stone-900 mb-2">Sartorial Anchor</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {product.notesDetailed.soul.description}
              </p>
              <div className="mt-4 pt-3 border-t border-stone-200 text-xs">
                <strong className="text-stone-800">Accords:</strong> {product.accords.base}
              </div>
            </div>

          </div>
        </div>

        {/* Genesis & Botanical Transparency */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="p-8 bg-white border border-[#eae8e5] rounded-sm">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#715b32] font-semibold block mb-2">
              Genesis &amp; Formulation
            </span>
            <h3 className="font-serif text-2xl text-stone-950 font-light mb-3">
              The Harvest &amp; Maturation
            </h3>
            <p className="text-xs md:text-sm text-stone-600 font-light leading-relaxed">
              {product.genesis}
            </p>
          </div>

          <div className="p-8 bg-white border border-[#eae8e5] rounded-sm">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#715b32] font-semibold block mb-2">
              IFRA &amp; Transparency
            </span>
            <h3 className="font-serif text-2xl text-stone-950 font-light mb-3">
              Full Ingredients Disclosure
            </h3>
            <p className="text-xs text-stone-500 font-mono leading-relaxed bg-[#fbf9f6] p-4 border border-stone-200 rounded">
              {product.ingredients}
            </p>
            <span className="text-[10px] text-stone-400 mt-2 block">
              100% Free of synthetic phthalates, nitro-musks, or petroleum carriers.
            </span>
          </div>
        </div>

        {/* Sartorial Layering Pairings */}
        <div className="bg-[#f5f3f0] border border-stone-200 p-8 rounded-sm mb-16">
          <div className="max-w-2xl mb-6">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#715b32] font-semibold">
              The Art of Scent Layering
            </span>
            <h3 className="font-serif text-2xl text-stone-950 font-light mt-1">
              Harmonious Compositions
            </h3>
            <p className="text-xs text-stone-600 font-light">
              Wearing two creations simultaneously creates a bespoke olfactory silhouette. Our noses recommend:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {layeringPairings.map((pair) => (
              <div
                key={pair.id}
                onClick={() => onSelectProduct(pair)}
                className="bg-white p-5 border border-stone-300/80 rounded-sm flex items-center justify-between cursor-pointer hover:border-stone-800 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <img src={pair.image} alt={pair.name} className="w-16 h-16 object-contain" />
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-[#715b32] font-semibold">Layering Companion</span>
                    <h4 className="font-serif text-lg font-medium text-stone-900">{pair.name}</h4>
                    <p className="text-xs text-stone-500 italic">{pair.subtitle}</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-stone-400">arrow_forward</span>
              </div>
            ))}
          </div>
        </div>

        {/* Connoisseur Reviews Section */}
        <div id="reviews-section" className="bg-white border border-[#eae8e5] p-8 md:p-12 rounded-sm mb-16 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-stone-200 gap-4">
            <div>
              <span className="text-[10px] uppercase tracking-[0.28em] text-[#715b32] font-semibold">
                Client Testimonials
              </span>
              <h3 className="font-serif text-2xl text-stone-950 font-light mt-1">
                Connoisseur Reviews ({product.reviewsCount + reviews.length - 2})
              </h3>
            </div>
            <button
              onClick={() => setShowReviewModal(true)}
              className="px-4 py-2.5 bg-stone-950 text-white text-xs uppercase tracking-[0.18em] font-medium hover:bg-stone-800 transition-colors rounded-sm cursor-pointer"
            >
              Write An Editorial Review
            </button>
          </div>

          {/* Reviews list */}
          <div className="space-y-6">
            {reviews.map((rev, idx) => (
              <div key={idx} className="pb-6 border-b border-stone-100 last:border-b-0 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[#715b32] text-sm">{'★'.repeat(rev.rating)}</span>
                    <strong className="text-xs font-semibold text-stone-900">{rev.title}</strong>
                  </div>
                  <span className="text-[10px] text-stone-400">{rev.date}</span>
                </div>
                <p className="text-xs text-stone-700 font-light leading-relaxed">
                  "{rev.content}"
                </p>
                <span className="text-[11px] text-stone-500 italic block">
                  — {rev.author} (Verified Flacon Patron)
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Review Submission Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#fbf9f6] max-w-lg w-full p-8 rounded-sm border border-stone-300 shadow-2xl relative">
            <button
              onClick={() => setShowReviewModal(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-800 p-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>

            <span className="text-[10px] uppercase tracking-[0.25em] text-[#715b32] font-semibold">
              The Patron Register
            </span>
            <h3 className="font-serif text-2xl font-light text-stone-950 mt-1 mb-4">
              Review Flacon {product.number} ({product.name})
            </h3>

            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-600 mb-1">Your Name / Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lord Julian C. or Ananya S."
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  className="w-full bg-white border border-stone-300 p-2.5 text-xs text-stone-900 focus:outline-none focus:border-[#715b32]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-600 mb-1">Review Headline</label>
                <input
                  type="text"
                  placeholder="e.g. Crystalline longevity and sublime sillage"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-white border border-stone-300 p-2.5 text-xs text-stone-900 focus:outline-none focus:border-[#715b32]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-600 mb-1">Rating</label>
                <select
                  value={newRating}
                  onChange={(e) => setNewRating(Number(e.target.value))}
                  className="w-full bg-white border border-stone-300 p-2.5 text-xs text-stone-900 focus:outline-none"
                >
                  <option value={5}>★★★★★ (5 Stars — Masterpiece)</option>
                  <option value={4}>★★★★☆ (4 Stars — Exceptional)</option>
                  <option value={3}>★★★☆☆ (3 Stars — Notable)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-600 mb-1">Detailed Sensory Impressions</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe the projection, evolution across the day, and skin chemistry interaction..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full bg-white border border-stone-300 p-2.5 text-xs text-stone-900 focus:outline-none focus:border-[#715b32]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="px-4 py-2 border border-stone-300 text-stone-700 text-xs uppercase tracking-wider cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-stone-950 text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  Submit Editorial Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

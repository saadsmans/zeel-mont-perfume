/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { ActiveView, CartItem, FragranceProduct, DiscoverySample } from './types';
import { FRAGRANCES_DATA, DISCOVERY_SAMPLES_LIST } from './data/fragrances';

import { AuthProvider, useAuth } from './context/AuthContext';
import { supabaseService } from './services/supabaseService';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { MaisonHomeView } from './components/MaisonHomeView';
import { CatalogueView } from './components/CatalogueView';
import { MensCollectionView } from './components/MensCollectionView';
import { WomensCollectionView } from './components/WomensCollectionView';
import { AttarCollectionView } from './components/AttarCollectionView';
import { FragranceDossierView } from './components/FragranceDossierView';
import { ShoppingBagDrawer } from './components/ShoppingBagDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchModal } from './components/SearchModal';
import { FragranceFinderModal } from './components/FragranceFinderModal';
import { HeritageModal } from './components/HeritageModal';
import { CheckoutModal } from './components/CheckoutModal';
import { AuthModal } from './components/AuthModal';

function AppContent() {
  const { user } = useAuth();

  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [selectedProduct, setSelectedProduct] = useState<FragranceProduct>(
    FRAGRANCES_DATA.find((p) => p.id === 'citrus-air') || FRAGRANCES_DATA[0]
  );

  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('zellmont_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist state
  const [wishlist, setWishlist] = useState<FragranceProduct[]>(() => {
    try {
      const saved = localStorage.getItem('zellmont_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 2 Complimentary Discovery Samples
  const [selectedSamples, setSelectedSamples] = useState<DiscoverySample[]>([
    DISCOVERY_SAMPLES_LIST[0],
    DISCOVERY_SAMPLES_LIST[1],
  ]);

  // Gift Packaging & Note
  const [giftBox, setGiftBox] = useState(false);
  const [giftNote, setGiftNote] = useState('');

  // Modals & Drawers state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFinderOpen, setIsFinderOpen] = useState(false);
  const [isHeritageOpen, setIsHeritageOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Synchronize remote cart from Supabase when user logs in
  useEffect(() => {
    if (user?.id) {
      const syncRemoteData = async () => {
        try {
          const remoteCart = await supabaseService.fetchUserCart(user.id);
          if (remoteCart && remoteCart.length > 0) {
            setCart(remoteCart);
          }
          const remoteWishlist = await supabaseService.fetchUserWishlist(user.id);
          if (remoteWishlist && remoteWishlist.length > 0) {
            setWishlist(remoteWishlist);
          }
        } catch (err) {
          console.warn('Sync error:', err);
        }
      };
      syncRemoteData();
    }
  }, [user?.id]);

  // Persist cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('zellmont_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  // Persist wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('zellmont_wishlist', JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  // Actions
  const handleSelectProduct = (product: FragranceProduct) => {
    setSelectedProduct(product);
    setActiveView('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (product: FragranceProduct, volume: number, monogram?: string) => {
    const itemPrice = (volume === 50 && product.price50ml) ? product.price50ml : product.price;
    const cartItemId = `${product.id}-${volume}-${monogram || 'standard'}`;

    const newItem: CartItem = {
      id: cartItemId,
      product,
      volume,
      price: itemPrice,
      quantity: 1,
      monogram,
    };

    setCart((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        const updated = prev.map((item) =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + 1 } : item
        );
        if (user?.id) {
          supabaseService.upsertCartItem(user.id, { ...existing, quantity: existing.quantity + 1 });
        }
        return updated;
      }
      if (user?.id) {
        supabaseService.upsertCartItem(user.id, newItem);
      }
      return [...prev, newItem];
    });

    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, qty: number) => {
    const targetItem = cart.find((item) => item.id === id);
    if (qty <= 0) {
      setCart((prev) => prev.filter((item) => item.id !== id));
      if (user?.id && targetItem) {
        supabaseService.removeCartItem(user.id, targetItem);
      }
    } else {
      setCart((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item))
      );
      if (user?.id && targetItem) {
        supabaseService.upsertCartItem(user.id, { ...targetItem, quantity: qty });
      }
    }
  };

  const handleRemoveItem = (id: string) => {
    const targetItem = cart.find((item) => item.id === id);
    setCart((prev) => prev.filter((item) => item.id !== id));
    if (user?.id && targetItem) {
      supabaseService.removeCartItem(user.id, targetItem);
    }
  };

  const handleClearCart = () => {
    setCart([]);
    if (user?.id) {
      supabaseService.clearUserCart(user.id);
    }
  };

  const handleToggleWishlist = (product: FragranceProduct) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        if (user?.id) {
          supabaseService.removeWishlistItem(user.id, product.id);
        }
        return prev.filter((item) => item.id !== product.id);
      }
      if (user?.id) {
        supabaseService.addWishlistItem(user.id, product.id);
      }
      return [...prev, product];
    });
  };

  return (
    <div className="min-h-screen bg-[#fbf9f6] flex flex-col font-sans selection:bg-[#fedeaa] selection:text-[#715b32]">
      
      {/* Navigation */}
      <Navbar
        activeView={activeView}
        setActiveView={setActiveView}
        cart={cart}
        wishlist={wishlist}
        setIsCartOpen={setIsCartOpen}
        setIsWishlistOpen={setIsWishlistOpen}
        setIsSearchOpen={setIsSearchOpen}
        setIsFinderOpen={setIsFinderOpen}
        setIsHeritageOpen={setIsHeritageOpen}
        setIsAuthOpen={setIsAuthOpen}
        onSelectProduct={handleSelectProduct}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {activeView === 'home' && (
          <MaisonHomeView
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlist={wishlist}
            setActiveView={setActiveView}
            setIsFinderOpen={setIsFinderOpen}
            setIsHeritageOpen={setIsHeritageOpen}
          />
        )}

        {activeView === 'catalogue' && (
          <CatalogueView
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlist={wishlist}
          />
        )}

        {activeView === 'men' && (
          <MensCollectionView
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlist={wishlist}
          />
        )}

        {activeView === 'women' && (
          <WomensCollectionView
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlist={wishlist}
          />
        )}

        {activeView === 'attars' && (
          <AttarCollectionView
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlist={wishlist}
            setIsHeritageOpen={setIsHeritageOpen}
          />
        )}

        {activeView === 'product' && (
          <FragranceDossierView
            product={selectedProduct}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlist={wishlist}
            onSelectProduct={handleSelectProduct}
            onBack={() => setActiveView('catalogue')}
          />
        )}
      </main>

      {/* Editorial Footer */}
      <Footer
        setActiveView={setActiveView}
        setIsHeritageOpen={setIsHeritageOpen}
        setIsFinderOpen={setIsFinderOpen}
      />

      {/* Sartorial Cart Drawer */}
      <ShoppingBagDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        selectedSamples={selectedSamples}
        setSelectedSamples={setSelectedSamples}
        onCheckout={() => setIsCheckoutOpen(true)}
        giftBox={giftBox}
        setGiftBox={setGiftBox}
        giftNote={giftNote}
        setGiftNote={setGiftNote}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        onSelectProduct={handleSelectProduct}
      />

      {/* Instant Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={handleSelectProduct}
      />

      {/* Olfactory Diagnostic Finder Modal */}
      <FragranceFinderModal
        isOpen={isFinderOpen}
        onClose={() => setIsFinderOpen(false)}
        onSelectProduct={handleSelectProduct}
        onAddToCart={handleAddToCart}
      />

      {/* Heritage & Savoir-Faire Modal */}
      <HeritageModal
        isOpen={isHeritageOpen}
        onClose={() => setIsHeritageOpen(false)}
      />

      {/* Luxury Concierge Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        selectedSamples={selectedSamples}
        giftBox={giftBox}
        giftNote={giftNote}
        onClearCart={handleClearCart}
      />

      {/* Patron Salon & Supabase Configuration Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export type SillageGender = 'Men' | 'Women' | 'Unisex';

export type ConcentrationType = 'Eau de Parfum' | 'Extrait de Parfum' | 'Pure Attar';

export type OlfactoryFamily = 'Citrus' | 'Woody' | 'Floral' | 'Rare Oud' | 'Amber & Resin' | 'Musk';

export interface FragranceNote {
  name: string;
  duration?: string;
  description: string;
}

export interface OlfactoryMetrics {
  freshness: number; // percentage 0-100
  woodiness: number;
  warmth: number;
  sweetness: number;
  sillage: string;
  longevity: string;
}

export interface FragranceProduct {
  id: string;
  number: string; // e.g. "01", "03", "11"
  name: string;
  subtitle: string;
  gender: SillageGender;
  concentration: ConcentrationType;
  concentrationDetail: string; // e.g. "EDP 100ml", "Extrait (35%)"
  family: OlfactoryFamily;
  price: number; // In INR ₹
  price50ml?: number;
  image: string;
  galleryImages: string[];
  badge?: string; // e.g. "BESTSELLER", "FEATURED", "EXTRAIT 32%", "SOLAR CORE"
  shortDescription: string;
  narrative: string;
  genesis: string;
  accords: {
    head: string;
    heart: string;
    base: string;
  };
  notesDetailed: {
    head: FragranceNote;
    heart: FragranceNote;
    soul: FragranceNote;
  };
  metrics: OlfactoryMetrics;
  ingredients: string;
  inStock: boolean;
  collection: 'signature' | 'premium' | 'new_arrivals' | 'best_sellers' | 'attars';
  rating: number;
  reviewsCount: number;
}

export interface CartItem {
  id: string;
  product: FragranceProduct;
  volume: number; // 50, 100, 12
  price: number;
  quantity: number;
  monogram?: string; // Optional custom engraving (e.g., "Z.M.")
}

export interface DiscoverySample {
  id: string;
  name: string;
  tag: string;
  family: string;
  image?: string;
}

export type ActiveView = 
  | 'home' 
  | 'catalogue' 
  | 'men' 
  | 'women' 
  | 'attars' 
  | 'product' 
  | 'cart' 
  | 'guide' 
  | 'heritage' 
  | 'service'
  | 'wishlist';

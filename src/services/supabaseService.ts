import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { CartItem, FragranceProduct } from '../types';
import { FRAGRANCES_DATA } from '../data/fragrances';

export interface SupabaseOrderPayload {
  orderReference: string;
  userId?: string | null;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  giftBox: boolean;
  giftNote?: string;
  discoverySamples: { id: string; name: string }[];
  paymentMethod: string;
  paymentStatus: 'pending' | 'captured' | 'cash_on_delivery';
  totalAmount: number;
}

export interface ReviewRecord {
  id: string;
  productId: string;
  authorName: string;
  title: string;
  content: string;
  rating: number;
  verifiedPatron: boolean;
  createdAt: string;
}

export const supabaseService = {
  // =========================================================================
  // CART OPERATIONS
  // =========================================================================
  async fetchUserCart(userId: string): Promise<CartItem[] | null> {
    if (!isSupabaseConfigured() || !userId) return null;

    try {
      const { data, error } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', userId);

      if (error) {
        console.warn('Supabase fetch cart error:', error.message);
        return null;
      }

      if (!data) return [];

      const items: CartItem[] = [];
      for (const row of data) {
        const product = FRAGRANCES_DATA.find((p) => p.id === row.product_id);
        if (product) {
          items.push({
            id: `${row.product_id}-${row.volume}-${row.monogram || 'standard'}`,
            product,
            volume: row.volume,
            quantity: row.quantity,
            price: Number(row.price),
            monogram: row.monogram || undefined,
          });
        }
      }
      return items;
    } catch (err) {
      console.warn('Supabase error:', err);
      return null;
    }
  },

  async upsertCartItem(userId: string, item: CartItem): Promise<boolean> {
    if (!isSupabaseConfigured() || !userId) return false;

    try {
      const { error } = await supabase.from('cart_items').upsert(
        {
          user_id: userId,
          product_id: item.product.id,
          volume: item.volume,
          quantity: item.quantity,
          price: item.price,
          monogram: item.monogram || null,
        },
        { onConflict: 'user_id,product_id,volume,monogram' }
      );

      return !error;
    } catch {
      return false;
    }
  },

  async removeCartItem(userId: string, item: CartItem): Promise<boolean> {
    if (!isSupabaseConfigured() || !userId) return false;

    try {
      let query = supabase
        .from('cart_items')
        .delete()
        .eq('user_id', userId)
        .eq('product_id', item.product.id)
        .eq('volume', item.volume);

      if (item.monogram) {
        query = query.eq('monogram', item.monogram);
      } else {
        query = query.is('monogram', null);
      }

      const { error } = await query;
      return !error;
    } catch {
      return false;
    }
  },

  async clearUserCart(userId: string): Promise<boolean> {
    if (!isSupabaseConfigured() || !userId) return false;

    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', userId);
      return !error;
    } catch {
      return false;
    }
  },

  // =========================================================================
  // WISHLIST OPERATIONS
  // =========================================================================
  async fetchUserWishlist(userId: string): Promise<FragranceProduct[] | null> {
    if (!isSupabaseConfigured() || !userId) return null;

    try {
      const { data, error } = await supabase
        .from('wishlist_items')
        .select('product_id')
        .eq('user_id', userId);

      if (error || !data) return null;

      const products: FragranceProduct[] = [];
      for (const row of data) {
        const prod = FRAGRANCES_DATA.find((p) => p.id === row.product_id);
        if (prod) products.push(prod);
      }
      return products;
    } catch {
      return null;
    }
  },

  async addWishlistItem(userId: string, productId: string): Promise<boolean> {
    if (!isSupabaseConfigured() || !userId) return false;

    try {
      const { error } = await supabase.from('wishlist_items').upsert(
        { user_id: userId, product_id: productId },
        { onConflict: 'user_id,product_id' }
      );
      return !error;
    } catch {
      return false;
    }
  },

  async removeWishlistItem(userId: string, productId: string): Promise<boolean> {
    if (!isSupabaseConfigured() || !userId) return false;

    try {
      const { error } = await supabase
        .from('wishlist_items')
        .delete()
        .eq('user_id', userId)
        .eq('product_id', productId);
      return !error;
    } catch {
      return false;
    }
  },

  // =========================================================================
  // ORDER CREATION & RETRIEVAL
  // =========================================================================
  async createOrder(
    payload: SupabaseOrderPayload,
    items: CartItem[]
  ): Promise<{ success: boolean; orderId?: string; error?: string }> {
    if (!isSupabaseConfigured()) {
      return { success: true, orderId: payload.orderReference };
    }

    try {
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          order_reference: payload.orderReference,
          user_id: payload.userId || null,
          client_name: payload.clientName,
          client_email: payload.clientEmail,
          client_phone: payload.clientPhone,
          shipping_address: payload.shippingAddress,
          gift_box: payload.giftBox,
          gift_note: payload.giftNote || null,
          discovery_samples: payload.discoverySamples,
          payment_method: payload.paymentMethod,
          payment_status: payload.paymentStatus,
          total_amount: payload.totalAmount,
          status: 'processing',
        })
        .select('id')
        .single();

      if (orderError || !orderData) {
        console.warn('Failed to insert order into Supabase:', orderError?.message);
        return { success: false, error: orderError?.message };
      }

      // Insert line items
      const lineItems = items.map((item) => ({
        order_id: orderData.id,
        product_id: item.product.id,
        product_name: item.product.name,
        volume: item.volume,
        quantity: item.quantity,
        unit_price: item.price,
        monogram: item.monogram || null,
      }));

      const { error: lineError } = await supabase
        .from('order_items')
        .insert(lineItems);

      if (lineError) {
        console.warn('Line items insertion notice:', lineError.message);
      }

      return { success: true, orderId: payload.orderReference };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  },

  async fetchUserOrders(userId: string) {
    if (!isSupabaseConfigured() || !userId) return [];

    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (*)
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) return [];
      return data || [];
    } catch {
      return [];
    }
  },

  // =========================================================================
  // REVIEWS OPERATIONS
  // =========================================================================
  async fetchReviews(productId: string): Promise<ReviewRecord[]> {
    if (!isSupabaseConfigured()) return [];

    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('product_id', productId)
        .order('created_at', { ascending: false });

      if (error || !data) return [];

      return data.map((r) => ({
        id: r.id,
        productId: r.product_id,
        authorName: r.author_name,
        title: r.title,
        content: r.content,
        rating: r.rating,
        verifiedPatron: r.verified_patron,
        createdAt: r.created_at,
      }));
    } catch {
      return [];
    }
  },

  async submitReview(review: {
    userId?: string | null;
    productId: string;
    authorName: string;
    title: string;
    content: string;
    rating: number;
  }): Promise<boolean> {
    if (!isSupabaseConfigured()) return true;

    try {
      const { error } = await supabase.from('reviews').insert({
        user_id: review.userId || null,
        product_id: review.productId,
        author_name: review.authorName,
        title: review.title,
        content: review.content,
        rating: review.rating,
        verified_patron: true,
      });

      return !error;
    } catch {
      return false;
    }
  },
};

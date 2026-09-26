export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          phone: string | null;
          shipping_address: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          phone?: string | null;
          shipping_address?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string | null;
          phone?: string | null;
          shipping_address?: Json;
          created_at?: string;
          updated_at?: string;
        };
      };
      cart_items: {
        Row: {
          id: string;
          user_id: string;
          product_id: string;
          volume: number;
          quantity: number;
          price: number;
          monogram: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          product_id: string;
          volume: number;
          quantity: number;
          price: number;
          monogram?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          product_id?: string;
          volume?: number;
          quantity?: number;
          price?: number;
          monogram?: string | null;
          created_at?: string;
        };
      };
      wishlist_items: {
        Row: {
          id: string;
          user_id: string;
          product_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          product_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          product_id?: string;
          created_at?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          order_reference: string;
          user_id: string | null;
          client_name: string;
          client_email: string;
          client_phone: string;
          shipping_address: Json;
          gift_box: boolean;
          gift_note: string | null;
          discovery_samples: Json;
          payment_method: string;
          payment_status: string;
          total_amount: number;
          status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          order_reference: string;
          user_id?: string | null;
          client_name: string;
          client_email: string;
          client_phone: string;
          shipping_address: Json;
          gift_box?: boolean;
          gift_note?: string | null;
          discovery_samples?: Json;
          payment_method: string;
          payment_status?: string;
          total_amount: number;
          status?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          order_reference?: string;
          user_id?: string | null;
          client_name?: string;
          client_email?: string;
          client_phone?: string;
          shipping_address?: Json;
          gift_box?: boolean;
          gift_note?: string | null;
          discovery_samples?: Json;
          payment_method?: string;
          payment_status?: string;
          total_amount?: number;
          status?: string;
          created_at?: string;
        };
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_id: string;
          product_name: string;
          volume: number;
          quantity: number;
          unit_price: number;
          monogram: string | null;
        };
        Insert: {
          id?: string;
          order_id: string;
          product_id: string;
          product_name: string;
          volume: number;
          quantity: number;
          unit_price: number;
          monogram?: string | null;
        };
        Update: {
          id?: string;
          order_id?: string;
          product_id?: string;
          product_name?: string;
          volume?: number;
          quantity?: number;
          unit_price?: number;
          monogram?: string | null;
        };
      };
      reviews: {
        Row: {
          id: string;
          user_id: string | null;
          product_id: string;
          author_name: string;
          title: string;
          content: string;
          rating: number;
          verified_patron: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          product_id: string;
          author_name: string;
          title: string;
          content: string;
          rating: number;
          verified_patron?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          product_id?: string;
          author_name?: string;
          title?: string;
          content?: string;
          rating?: number;
          verified_patron?: boolean;
          created_at?: string;
        };
      };
    };
  };
}

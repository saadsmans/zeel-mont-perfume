import React, { useState, useEffect } from 'react';
import { CartItem, DiscoverySample } from '../types';
import { supabaseService } from '../services/supabaseService';
import { useAuth } from '../context/AuthContext';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  selectedSamples: DiscoverySample[];
  giftBox: boolean;
  giftNote: string;
  onClearCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  selectedSamples,
  giftBox,
  giftNote,
  onClearCart,
}) => {
  const { user, refreshOrders } = useAuth();
  const [step, setStep] = useState<'details' | 'payment' | 'confirmation'>('details');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.user_metadata?.full_name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'India',
    paymentMethod: 'upi',
  });
  const [orderId, setOrderId] = useState('');

  // Prefill user details if patron is logged in
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: prev.fullName || user.user_metadata?.full_name || '',
        email: prev.email || user.email || '',
      }));
    }
  }, [user]);

  if (!isOpen) return null;

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleNextToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handleCompleteOrder = async () => {
    setIsSubmitting(true);
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const newOrderId = `ZM-2026-${randomNum}`;

    try {
      await supabaseService.createOrder(
        {
          orderReference: newOrderId,
          userId: user?.id || null,
          clientName: formData.fullName,
          clientEmail: formData.email,
          clientPhone: formData.phone,
          shippingAddress: {
            address: formData.address,
            city: formData.city,
            postalCode: formData.postalCode,
            country: formData.country,
          },
          giftBox,
          giftNote: giftBox ? giftNote : undefined,
          discoverySamples: selectedSamples.map((s) => ({ id: s.id, name: s.name })),
          paymentMethod: formData.paymentMethod,
          paymentStatus: formData.paymentMethod === 'cod' ? 'cash_on_delivery' : 'captured',
          totalAmount: total,
        },
        cart
      );

      if (user?.id) {
        await refreshOrders();
      }
    } catch (err) {
      console.warn('Order saving notice:', err);
    } finally {
      setIsSubmitting(false);
      setOrderId(newOrderId);
      setStep('confirmation');
      onClearCart();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#fbf9f6] text-[#1b1c1a] max-w-2xl w-full border border-stone-300 rounded-sm shadow-2xl overflow-hidden relative">
        
        {/* Top Header */}
        <div className="p-6 bg-white border-b border-[#efeeeb] flex items-center justify-between">
          <div>
            <span className="text-[9.5px] uppercase tracking-[0.25em] text-[#715b32] font-semibold block">
              Zell Mont Haute Parfumerie &bull; Concierge Checkout
            </span>
            <h2 className="font-serif text-2xl font-light text-stone-950">
              {step === 'details' && 'Shipping &amp; Client Registry'}
              {step === 'payment' && 'Select Payment Protocol'}
              {step === 'confirmation' && 'Order Confirmed &amp; Sealed'}
            </h2>
          </div>
          {step !== 'confirmation' && (
            <button
              onClick={onClose}
              className="text-stone-400 hover:text-stone-800 p-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          )}
        </div>

        {/* Step 1: Client & Shipping Details */}
        {step === 'details' && (
          <form onSubmit={handleNextToPayment} className="p-6 md:p-8 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-stone-600 mb-1 font-medium">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Lord Julian Sterling"
                  className="w-full bg-white border border-stone-300 p-2.5 text-xs text-stone-900 focus:outline-none focus:border-[#715b32]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-stone-600 mb-1 font-medium">Confidential Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="client@salons.com"
                  className="w-full bg-white border border-stone-300 p-2.5 text-xs text-stone-900 focus:outline-none focus:border-[#715b32]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-stone-600 mb-1 font-medium">Telephone / Mobile</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full bg-white border border-stone-300 p-2.5 text-xs text-stone-900 focus:outline-none focus:border-[#715b32]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-stone-600 mb-1 font-medium">Country / Territory</label>
                <select
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full bg-white border border-stone-300 p-2.5 text-xs text-stone-900 focus:outline-none"
                >
                  <option value="India">India (White Glove 24-Hour Dispatch)</option>
                  <option value="United Kingdom">United Kingdom (DHL Express)</option>
                  <option value="France">France (Paris Courier Concierge)</option>
                  <option value="United States">United States (FedEx International)</option>
                  <option value="United Arab Emirates">United Arab Emirates (Dubai Diplomatic)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-stone-600 mb-1 font-medium">Delivery Address</label>
              <input
                type="text"
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Suite, House No., Estate or Residence"
                className="w-full bg-white border border-stone-300 p-2.5 text-xs text-stone-900 focus:outline-none focus:border-[#715b32]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-stone-600 mb-1 font-medium">City</label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="New Delhi / Paris / London"
                  className="w-full bg-white border border-stone-300 p-2.5 text-xs text-stone-900 focus:outline-none focus:border-[#715b32]"
                />
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-stone-600 mb-1 font-medium">PIN / Postal Code</label>
                <input
                  type="text"
                  required
                  value={formData.postalCode}
                  onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                  placeholder="110003"
                  className="w-full bg-white border border-stone-300 p-2.5 text-xs text-stone-900 focus:outline-none focus:border-[#715b32]"
                />
              </div>
            </div>

            {/* Order Brief Summary */}
            <div className="p-4 bg-stone-100 rounded-sm text-xs space-y-1">
              <div className="flex justify-between text-stone-600">
                <span>Items Subtotal ({cart.length} flacons)</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>White-Glove Insured Courier</span>
                <span className="text-[#715b32] font-semibold">Complimentary</span>
              </div>
              {selectedSamples.length > 0 && (
                <div className="flex justify-between text-stone-600">
                  <span>Discovery Vials</span>
                  <span>{selectedSamples.map(s => s.name).join(', ')}</span>
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-between items-center">
              <button
                type="button"
                onClick={onClose}
                className="text-xs uppercase tracking-wider text-stone-600 hover:text-stone-900 cursor-pointer"
              >
                Return to Bag
              </button>
              <button
                type="submit"
                className="px-8 py-3 bg-stone-950 text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-stone-800 transition-colors shadow rounded-sm cursor-pointer"
              >
                Continue to Payment
              </button>
            </div>
          </form>
        )}

        {/* Step 2: Payment Protocol */}
        {step === 'payment' && (
          <div className="p-6 md:p-8 space-y-6">
            <div className="space-y-3">
              <label className="block text-xs uppercase tracking-wider text-stone-600 font-semibold">
                Select Secured Payment Method
              </label>

              <div className="space-y-3">
                {/* UPI Option */}
                <label className={`p-4 border rounded-sm flex items-center justify-between cursor-pointer transition-colors ${formData.paymentMethod === 'upi' ? 'border-stone-950 bg-white ring-1 ring-stone-950' : 'border-stone-200 bg-white'}`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={formData.paymentMethod === 'upi'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'upi' })}
                      className="accent-stone-900"
                    />
                    <div>
                      <span className="font-serif text-sm font-semibold text-stone-900 block">UPI Instant Pay / QR</span>
                      <span className="text-[11px] text-stone-500">Google Pay, PhonePe, Paytm, BHIM (Zero transaction fee)</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#715b32]">INSTANT</span>
                </label>

                {/* Credit / Debit Cards */}
                <label className={`p-4 border rounded-sm flex items-center justify-between cursor-pointer transition-colors ${formData.paymentMethod === 'card' ? 'border-stone-950 bg-white ring-1 ring-stone-950' : 'border-stone-200 bg-white'}`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={formData.paymentMethod === 'card'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'card' })}
                      className="accent-stone-900"
                    />
                    <div>
                      <span className="font-serif text-sm font-semibold text-stone-900 block">Premium Credit / Debit Cards</span>
                      <span className="text-[11px] text-stone-500">American Express, Mastercard, Visa (Encrypted 256-Bit)</span>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-stone-400">credit_card</span>
                </label>

                {/* White Glove COD */}
                <label className={`p-4 border rounded-sm flex items-center justify-between cursor-pointer transition-colors ${formData.paymentMethod === 'cod' ? 'border-stone-950 bg-white ring-1 ring-stone-950' : 'border-stone-200 bg-white'}`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                      className="accent-stone-900"
                    />
                    <div>
                      <span className="font-serif text-sm font-semibold text-stone-900 block">Concierge Pay on White-Glove Handover</span>
                      <span className="text-[11px] text-stone-500">Pay via Card / UPI upon personal delivery by our suited courier</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-stone-400">CONCIERGE</span>
                </label>
              </div>
            </div>

            {/* Total Display */}
            <div className="p-4 bg-[#f5f3f0] border border-stone-200 rounded-sm flex justify-between items-center">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-stone-500 block">Total Payable</span>
                <span className="font-serif text-2xl font-bold text-stone-950">₹{total.toLocaleString('en-IN')}</span>
              </div>
              <span className="text-xs text-stone-500">Inclusive of GST &bull; Free Global Courier</span>
            </div>

            <div className="pt-2 flex justify-between items-center">
              <button
                type="button"
                onClick={() => setStep('details')}
                className="text-xs uppercase tracking-wider text-stone-600 hover:text-stone-900 cursor-pointer"
              >
                &larr; Back to Details
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleCompleteOrder}
                className="px-8 py-3.5 bg-stone-950 text-white text-xs uppercase tracking-[0.24em] font-medium hover:bg-stone-800 transition-colors shadow rounded-sm cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? 'Recording Order in Atelier...' : 'Authorize & Place Order'}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Confirmation Celebration */}
        {step === 'confirmation' && (
          <div className="p-8 md:p-12 text-center space-y-6">
            <div className="w-16 h-16 bg-[#fedeaa] text-[#715b32] rounded-full flex items-center justify-center mx-auto shadow-inner">
              <span className="material-symbols-outlined text-3xl font-bold">done</span>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#715b32] font-semibold block">
                Certificate of Authenticity Generated
              </span>
              <h3 className="font-serif text-3xl font-light text-stone-950">
                Merci, {formData.fullName || 'Noble Patron'}.
              </h3>
              <p className="text-xs text-stone-600 font-light max-w-md mx-auto leading-relaxed">
                Your bespoke creation has entered our New Delhi atelier register. Our master engraver is currently inscribing your monogram talisman.
              </p>
            </div>

            {/* Order Details Card */}
            <div className="p-6 bg-white border border-stone-200 rounded-sm max-w-md mx-auto text-left text-xs space-y-2">
              <div className="flex justify-between border-b border-stone-100 pb-2">
                <span className="text-stone-500 uppercase tracking-wider text-[10px]">Order Reference</span>
                <span className="font-mono font-bold text-stone-900">{orderId}</span>
              </div>
              <div className="flex justify-between border-b border-stone-100 pb-2">
                <span className="text-stone-500 uppercase tracking-wider text-[10px]">Recipient</span>
                <span className="font-medium text-stone-900">{formData.fullName || 'Patron'}</span>
              </div>
              <div className="flex justify-between border-b border-stone-100 pb-2">
                <span className="text-stone-500 uppercase tracking-wider text-[10px]">Destination</span>
                <span className="text-stone-800">{formData.city || 'New Delhi'}, {formData.country}</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-stone-500 uppercase tracking-wider text-[10px]">Estimated Handover</span>
                <span className="text-[#715b32] font-semibold">24 to 36 Hours (Insured)</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                onClick={() => window.print()}
                className="px-6 py-2.5 border border-stone-300 text-stone-800 text-xs uppercase tracking-wider hover:bg-stone-100 transition-colors cursor-pointer"
              >
                Print Archival Receipt
              </button>
              <button
                onClick={onClose}
                className="px-8 py-2.5 bg-stone-950 text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-stone-800 transition-colors shadow rounded-sm cursor-pointer"
              >
                Return to Maison Gallery
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

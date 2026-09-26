import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getSupabaseConfig } from '../lib/supabase';
import { ZELL_MONT_EMBLEM } from '../data/fragrances';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProductById?: (productId: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { user, isConfigured, signIn, signUp, signOut, userOrders, updateConfig } = useAuth();
  
  const [mode, setMode] = useState<'signin' | 'signup' | 'orders' | 'supabase'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Supabase Connection Settings
  const initialConfig = getSupabaseConfig();
  const [customUrl, setCustomUrl] = useState(initialConfig.url);
  const [customKey, setCustomKey] = useState(initialConfig.key);
  const [configSaved, setConfigSaved] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    if (mode === 'signin') {
      const res = await signIn(email, password);
      if (res.success) {
        setSuccessMsg('Welcome back to the Zell Mont Salon.');
        setTimeout(() => onClose(), 1200);
      } else {
        setErrorMsg(res.error || 'Authentication failed. Please verify credentials.');
      }
    } else {
      const res = await signUp(email, password, fullName);
      if (res.success) {
        setSuccessMsg('Patron account created. Welcome to Zell Mont Haute Parfumerie.');
        setTimeout(() => onClose(), 1200);
      } else {
        setErrorMsg(res.error || 'Sign-up failed.');
      }
    }
    setLoading(false);
  };

  const handleSaveSupabaseConfig = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = updateConfig(customUrl, customKey);
    setConfigSaved(true);
    setTimeout(() => setConfigSaved(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#fbf9f6] text-[#1b1c1a] max-w-xl w-full border border-stone-300 rounded-sm shadow-2xl overflow-hidden relative">
        
        {/* Header */}
        <div className="p-6 bg-white border-b border-[#efeeeb] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={ZELL_MONT_EMBLEM} alt="Zell Mont" className="w-6 h-6 object-contain" />
            <div>
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#715b32] font-semibold block">
                Zell Mont Paris &bull; Client Register
              </span>
              <h2 className="font-serif text-2xl font-light text-stone-950">
                {user ? 'Private Patron Salon' : mode === 'signin' ? 'Sign In to Your Salon' : mode === 'signup' ? 'Join The Register' : 'Supabase Backend'}
              </h2>
            </div>
          </div>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-800 p-1 cursor-pointer">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Navigation Tabs if Logged In */}
        {user ? (
          <div className="flex border-b border-stone-200 text-xs font-medium">
            <button
              onClick={() => setMode('signin')}
              className={`flex-1 py-3 text-center uppercase tracking-wider cursor-pointer ${
                mode !== 'orders' && mode !== 'supabase' ? 'border-b-2 border-stone-950 text-stone-950 bg-white font-semibold' : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              Patron Profile
            </button>
            <button
              onClick={() => setMode('orders')}
              className={`flex-1 py-3 text-center uppercase tracking-wider cursor-pointer ${
                mode === 'orders' ? 'border-b-2 border-stone-950 text-stone-950 bg-white font-semibold' : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              Order History ({userOrders.length})
            </button>
            <button
              onClick={() => setMode('supabase')}
              className={`flex-1 py-3 text-center uppercase tracking-wider cursor-pointer ${
                mode === 'supabase' ? 'border-b-2 border-stone-950 text-stone-950 bg-white font-semibold' : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              Supabase Status
            </button>
          </div>
        ) : (
          <div className="flex border-b border-stone-200 text-xs font-medium">
            <button
              onClick={() => { setMode('signin'); setErrorMsg(''); setSuccessMsg(''); }}
              className={`flex-1 py-3 text-center uppercase tracking-wider cursor-pointer ${
                mode === 'signin' ? 'border-b-2 border-stone-950 text-stone-950 bg-white font-semibold' : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setMode('signup'); setErrorMsg(''); setSuccessMsg(''); }}
              className={`flex-1 py-3 text-center uppercase tracking-wider cursor-pointer ${
                mode === 'signup' ? 'border-b-2 border-stone-950 text-stone-950 bg-white font-semibold' : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              Register Patron
            </button>
            <button
              onClick={() => setMode('supabase')}
              className={`flex-1 py-3 text-center uppercase tracking-wider cursor-pointer ${
                mode === 'supabase' ? 'border-b-2 border-stone-950 text-stone-950 bg-white font-semibold' : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              Supabase Config
            </button>
          </div>
        )}

        {/* Body Content */}
        <div className="p-6 md:p-8 space-y-6">

          {/* Connected/Backend Badge */}
          <div className="flex items-center justify-between text-[11px] p-3 rounded-xs border border-stone-200 bg-white">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${isConfigured ? 'bg-emerald-600 animate-pulse' : 'bg-amber-500'}`} />
              <span className="font-medium text-stone-800">
                Backend: {isConfigured ? 'Supabase Connected' : 'Local Persistence (Supabase Available)'}
              </span>
            </div>
            <button
              onClick={() => setMode('supabase')}
              className="text-[#715b32] underline hover:text-stone-900 cursor-pointer font-medium"
            >
              {isConfigured ? 'View API Settings' : 'Connect Supabase'}
            </button>
          </div>

          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-xs">
              {errorMsg}
            </div>
          )}

          {successMsg && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-emerald-800 text-xs">
              {successMsg}
            </div>
          )}

          {/* 1. Logged In Patron Profile View */}
          {user && mode !== 'orders' && mode !== 'supabase' && (
            <div className="space-y-5">
              <div className="p-5 bg-white border border-stone-200 rounded-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-widest text-[#715b32] font-semibold">
                    Verified Flacon Patron
                  </span>
                  <span className="font-mono text-[10px] text-stone-400">
                    ID: {user.id.slice(0, 8)}...
                  </span>
                </div>
                <h3 className="font-serif text-xl font-medium text-stone-900">
                  {user.user_metadata?.full_name || 'Noble Patron'}
                </h3>
                <p className="text-xs text-stone-500">{user.email}</p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setMode('orders')}
                  className="flex-1 py-3 bg-stone-950 text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-stone-800 transition-colors shadow rounded-sm cursor-pointer"
                >
                  View Order Archival ({userOrders.length})
                </button>
                <button
                  onClick={() => signOut()}
                  className="px-6 py-3 border border-stone-300 text-stone-700 text-xs uppercase tracking-wider hover:bg-stone-100 transition-colors rounded-sm cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}

          {/* 2. Order History View */}
          {user && mode === 'orders' && (
            <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
              {userOrders.length === 0 ? (
                <div className="text-center py-10 space-y-2">
                  <span className="material-symbols-outlined text-4xl text-stone-300">receipt_long</span>
                  <p className="font-serif text-base text-stone-800">No orders recorded yet.</p>
                  <p className="text-xs text-stone-500">Your completed acquisitions will be logged here.</p>
                </div>
              ) : (
                userOrders.map((ord: any) => (
                  <div key={ord.id} className="p-4 bg-white border border-stone-200 rounded-sm space-y-2 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="font-mono font-bold text-stone-900">{ord.order_reference}</span>
                      <span className="px-2 py-0.5 bg-[#fedeaa] text-[#715b32] font-semibold text-[10px] uppercase rounded">
                        {ord.status}
                      </span>
                    </div>
                    <div className="flex justify-between text-stone-500 text-[11px]">
                      <span>{new Date(ord.created_at).toLocaleDateString()}</span>
                      <span className="font-serif font-semibold text-stone-900 text-sm">
                        ₹{Number(ord.total_amount).toLocaleString('en-IN')}
                      </span>
                    </div>
                    {ord.order_items && ord.order_items.length > 0 && (
                      <div className="pt-2 border-t border-stone-100 space-y-1">
                        {ord.order_items.map((line: any) => (
                          <div key={line.id} className="flex justify-between text-[11px] text-stone-600">
                            <span>{line.quantity}x {line.product_name} ({line.volume}ml)</span>
                            {line.monogram && <span className="font-mono text-[#715b32]">[{line.monogram}]</span>}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {/* 3. Supabase Connection Settings */}
          {mode === 'supabase' && (
            <form onSubmit={handleSaveSupabaseConfig} className="space-y-4">
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-widest text-[#715b32] font-semibold block">
                  Backend Configuration
                </span>
                <p className="text-xs text-stone-600 leading-relaxed font-light">
                  Connect your project directly to your Supabase instance to store patrons, carts, orders, and reviews in PostgreSQL.
                </p>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-stone-600 mb-1 font-medium">
                  Supabase Project URL
                </label>
                <input
                  type="url"
                  placeholder="https://your-project-id.supabase.co"
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                  className="w-full bg-white border border-stone-300 p-2.5 text-xs text-stone-900 focus:outline-none focus:border-[#715b32]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-stone-600 mb-1 font-medium">
                  Supabase Anon Public Key
                </label>
                <input
                  type="password"
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                  value={customKey}
                  onChange={(e) => setCustomKey(e.target.value)}
                  className="w-full bg-white border border-stone-300 p-2.5 text-xs text-stone-900 focus:outline-none focus:border-[#715b32]"
                />
              </div>

              {configSaved && (
                <div className="p-2.5 bg-emerald-50 text-emerald-800 text-xs rounded border border-emerald-200">
                  Supabase client re-initialized with new credentials.
                </div>
              )}

              <div className="p-3 bg-[#f5f3f0] border border-stone-200 rounded text-xs text-stone-600 space-y-1">
                <p className="font-semibold text-stone-800">Database Schema Ready:</p>
                <p className="text-[11px]">
                  The complete SQL migration script is stored in <code className="bg-stone-200 px-1 py-0.5 rounded font-mono">/supabase/schema.sql</code>. Copy and paste it directly into your Supabase SQL Editor.
                </p>
              </div>

              <div className="flex justify-between items-center pt-2">
                <button
                  type="button"
                  onClick={() => setMode('signin')}
                  className="text-xs uppercase tracking-wider text-stone-600 hover:text-stone-900 cursor-pointer"
                >
                  &larr; Back
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-stone-950 text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-stone-800 transition-colors shadow rounded-sm cursor-pointer"
                >
                  Apply &amp; Save Credentials
                </button>
              </div>
            </form>
          )}

          {/* 4. Sign In / Sign Up Form */}
          {!user && (mode === 'signin' || mode === 'signup') && (
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-stone-600 mb-1 font-medium">
                    Patron Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lord Julian C."
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-white border border-stone-300 p-2.5 text-xs text-stone-900 focus:outline-none focus:border-[#715b32]"
                  />
                </div>
              )}

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-stone-600 mb-1 font-medium">
                  Confidential Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="client@salons.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border border-stone-300 p-2.5 text-xs text-stone-900 focus:outline-none focus:border-[#715b32]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-stone-600 mb-1 font-medium">
                  Secret Passphrase
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white border border-stone-300 p-2.5 text-xs text-stone-900 focus:outline-none focus:border-[#715b32]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-stone-950 text-white text-xs uppercase tracking-[0.24em] font-medium hover:bg-stone-800 transition-colors shadow rounded-sm cursor-pointer disabled:opacity-50"
                >
                  {loading ? 'Authenticating...' : mode === 'signin' ? 'Enter Private Salon' : 'Register as Patron'}
                </button>
              </div>

              <div className="text-center pt-2">
                {mode === 'signin' ? (
                  <p className="text-xs text-stone-500">
                    Not yet enrolled in the register?{' '}
                    <button
                      type="button"
                      onClick={() => setMode('signup')}
                      className="text-[#715b32] font-semibold underline hover:text-stone-900 cursor-pointer ml-1"
                    >
                      Register here
                    </button>
                  </p>
                ) : (
                  <p className="text-xs text-stone-500">
                    Already a registered patron?{' '}
                    <button
                      type="button"
                      onClick={() => setMode('signin')}
                      className="text-[#715b32] font-semibold underline hover:text-stone-900 cursor-pointer ml-1"
                    >
                      Sign in
                    </button>
                  </p>
                )}
              </div>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};

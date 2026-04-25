import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Minus, Plus, Trash2, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function CartPage() {
  const { items, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    phone: '',
  });

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          items,
          total: totalPrice + 8 // with shipping
        })
      });

      if (!response.ok) {
        throw new Error('Greška u komunikaciji sa serverom');
      }

      const data = await response.json();
      if (data.success) {
        setCheckoutComplete(true);
        clearCart();
        window.scrollTo(0, 0);
      }
    } catch (e) {
      console.error('Došlo je do greške', e);
      alert('Došlo je do greške prilikom naručivanja, molimo pokušajte ponovo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (checkoutComplete) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gray-50 text-center px-4">
        <Helmet><title>Narudžba uspješna | Kamagra Shop</title></Helmet>
        <motion.div
           initial={{ scale: 0.8, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           className="bg-white border border-gray-200 p-12 rounded-3xl max-w-lg shadow-2xl"
        >
          <div className="w-20 h-20 bg-red-600/20 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldCheck className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Uspješna narudžba!</h2>
          <p className="text-gray-500 mb-8 text-lg">
            Hvala vam, <span className="text-gray-900 font-medium">{formData.name}</span>. Vaša narudžba je primljena i biće isporučena na Vašu adresu u neutralnom pakovanju.
          </p>
          <Link 
            to="/" 
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-8 py-4 text-base font-semibold text-slate-950 hover:bg-red-500 transition-all font-medium"
          >
            Nazad na početnu <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-12 pb-24 text-gray-600">
      <Helmet>
        <title>Korpa | Kamagra Shop</title>
      </Helmet>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-10">Vaša Korpa</h1>

        {items.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-2xl p-16 text-center shadow-lg">
            <h2 className="text-2xl text-gray-900 font-medium mb-4">Vaša korpa je trenutno prazna</h2>
            <p className="text-gray-500 mb-8">Pregledajte našu ponudu i pronađite prave proizvode za sebe.</p>
            <Link 
              to="/proizvodi" 
              className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-6 py-3 font-semibold text-slate-950 hover:bg-red-500 transition-colors"
            >
              Pregledajte Proizvode
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Cart Items List */}
            <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    key={item.id} 
                    className="flex flex-col sm:flex-row items-center gap-6 bg-white border border-gray-200 p-4 sm:p-6 rounded-2xl shadow-md"
                  >
                    <img 
                      src={item.imageUrl} 
                      alt={item.name} 
                      className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-xl bg-gray-100"
                    />
                    
                    <div className="flex-1 text-center sm:text-left flex flex-col w-full">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <Link to={`/proizvod/${item.id}`} className="text-lg font-bold text-gray-900 hover:text-red-500 transition-colors">
                            {item.name}
                          </Link>
                          <p className="text-sm text-gray-500">{item.category}</p>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-red-400 p-2 transition-colors hidden sm:block"
                          aria-label="Ukloni proizvod"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center bg-gray-50 rounded-lg border border-gray-300">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-10 text-center text-gray-900 font-medium text-sm">
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="flex items-center gap-4">
                          <span className="font-bold text-gray-900 text-lg">
                            {(item.price * item.quantity).toFixed(2)} KM
                          </span>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 hover:text-red-400 p-2 transition-colors sm:hidden"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Checkout Form */}
            <div className="lg:col-span-5 xl:col-span-4">
              <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 sticky top-24 shadow-xl">
                <h3 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-4">
                  Sažetak Narudžbe i Plaćanje
                </h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-gray-500">
                    <span>Međuzbir</span>
                    <span className="text-gray-900">{totalPrice.toFixed(2)} KM</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Dostava (Brza pošta)</span>
                    <span className="text-gray-900">8.00 KM</span>
                  </div>
                  <div className="flex justify-between items-center text-lg font-bold border-t border-gray-200 pt-4 mt-4">
                    <span className="text-gray-900">Ukupno</span>
                    <span className="text-red-500 text-2xl">{(totalPrice + 8).toFixed(2)} KM</span>
                  </div>
                </div>

                <form onSubmit={handleCheckout} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-500 mb-1">Ime i Prezime *</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-shadow"
                      placeholder="Ime i Prezime"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-500 mb-1">Adresa stanovanja *</label>
                    <input 
                      type="text" 
                      id="address" 
                      name="address" 
                      required
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-600 transition-shadow"
                      placeholder="Adresa"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-500 mb-1">Grad *</label>
                      <input 
                        type="text" 
                        id="city" 
                        name="city" 
                        required
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-600 transition-shadow"
                        placeholder="Grad"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-500 mb-1">Broj telefona *</label>
                      <input 
                        type="tel" 
                        id="phone" 
                        name="phone" 
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-600 transition-shadow"
                        placeholder="06x xxx xxx"
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 rounded-xl bg-red-600 px-8 py-4 text-lg font-bold text-slate-950 transition-all hover:bg-red-500 hover:scale-[1.02] active:scale-95 shadow-lg shadow-red-600/20 disabled:opacity-50"
                    >
                      {isSubmitting ? 'Slanje narudžbe...' : <>Potvrdi Narudžbu (Plaćanje pouzećem) <ArrowRight className="h-5 w-5" /></>}
                    </button>
                    <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center gap-1 leading-relaxed">
                      <ShieldCheck className="h-4 w-4 shrink-0" /> Vaši podaci su sigurni i diskretni. Plaćanje vršite kuriru u gotovini prilikom preuzimanja neoznačenog paketa.
                    </p>
                  </div>
                </form>

              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ShoppingCart, ArrowLeft, Check, ShieldCheck, Truck, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { useProducts } from '../context/ProductsContext';
import { useCart } from '../context/CartContext';

export function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { products, loading } = useProducts();
  
  const product = products.find(p => p.id === id);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gray-50 text-gray-600">
        <div className="text-red-600 mb-4 animate-pulse">Učitavanje...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gray-50 text-gray-600">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Proizvod nije pronađen</h2>
        <Link to="/" className="text-red-600 hover:underline">Nazad na početnu</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/korpa');
  };

  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": product.imageUrl,
    "description": product.description,
    "brand": {
      "@type": "Brand",
      "name": "Kamagra Bosna"
    },
    "category": product.category,
    "offers": {
      "@type": "Offer",
      "url": `https://kamagrabosnasarajevo.ba/proizvod/${product.id}`,
      "priceCurrency": "BAM",
      "price": product.price,
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition"
    },
    ...(product.reviews && product.reviews.length > 0 ? {
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": (product.reviews.reduce((acc: number, r: any) => acc + r.rating, 0) / product.reviews.length).toFixed(1),
        "reviewCount": product.reviews.length
      },
      "review": product.reviews.map((r: any) => ({
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": r.rating
        },
        "author": {
          "@type": "Person",
          "name": r.author
        },
        "reviewBody": r.text,
        "datePublished": r.date.split('T')[0]
      }))
    } : {})
  };

  return (
    <div className="bg-gray-50 min-h-screen text-gray-600 py-12">
      <Helmet>
        <title>{product.name} | Kamagra Prodaja BiH</title>
        <meta name="description" content={product.description} />
        <link rel="canonical" href={`https://kamagrabosnasarajevo.ba/proizvod/${product.id}`} />
        <meta property="og:title" content={`${product.name} | Kamagra Prodaja BiH`} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={product.imageUrl} />
        <meta property="og:url" content={`https://kamagrabosnasarajevo.ba/proizvod/${product.id}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={product.name} />
        <meta name="twitter:description" content={product.description} />
        <meta name="twitter:image" content={product.imageUrl} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-red-500 mb-8 border border-white/5 rounded-full px-5 py-2 hover:bg-white transition-all duration-300 backdrop-blur-sm uppercase tracking-wider text-xs font-semibold">
          <ArrowLeft className="h-4 w-4" /> Nazad na proizvode
        </Link>

        <div className="rounded-[2.5rem] bg-white border border-gray-200/80 overflow-hidden shadow-2xl lg:flex relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-red-100/10 via-transparent to-transparent z-0 pointer-events-none"></div>
          {/* Product Image */}
          <div className="lg:w-1/2 relative bg-gray-50/50 p-8 sm:p-12 lg:p-16 flex items-center justify-center border-b lg:border-b-0 lg:border-r border-gray-200 z-10">
            <div className="absolute inset-0 bg-gradient-to-tr from-red-100/5 to-transparent"></div>
            <motion.img
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              src={product.imageUrl}
              alt={product.name}
              className="w-full max-w-md rounded-[2rem] filter drop-shadow-[0_30px_30px_rgba(0,0,0,0.6)] object-contain aspect-[4/3] relative z-10 hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* Product Details */}
          <div className="lg:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col z-10 bg-white/40 backdrop-blur-xl">
            <span className="text-red-500 font-bold tracking-widest text-[10px] uppercase mb-4 inline-block bg-red-50/50 px-3 py-1.5 rounded-full border border-red-600/20 w-fit">
              {product.category}
            </span>
            <h1 className="text-3xl lg:text-5xl font-heading font-extrabold text-gray-900 mb-6 tracking-tight leading-[1.1]">
              {product.name}
            </h1>
            <p className="text-3xl font-heading font-black text-red-500 mb-8 border-b border-gray-200 pb-8">
              {product.price.toFixed(2)} <span className="text-xl text-gray-400 font-medium">KM</span>
            </p>

            <p className="text-gray-600 gap-4 mb-10 leading-relaxed font-light text-lg">
              {product.longDescription}
            </p>

            <div className="mb-10">
              <h3 className="text-gray-900 font-heading text-xl font-bold mb-6 tracking-wide">Glavne prednosti</h3>
              <ul className="space-y-4">
                {product.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-4 text-gray-600 font-light">
                    <div className="bg-red-600/10 p-1.5 rounded-full mt-0.5">
                      <Check className="h-4 w-4 text-red-500 shrink-0" />
                    </div>
                    <span className="leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {product.packages && product.packages.length > 0 && (
              <div className="mb-10">
                <h3 className="text-gray-900 font-heading text-xl font-bold mb-6 tracking-wide">Kupi više, uštedi više</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {product.packages.map((pkg, idx) => (
                    <div 
                      key={idx}
                      onClick={() => setQuantity(pkg.quantity)}
                      className={`cursor-pointer border rounded-2xl p-5 transition-all duration-300 ${
                        quantity === pkg.quantity 
                        ? 'border-red-600 bg-red-50/30 shadow-[0_0_20px_rgba(6,182,212,0.1)]' 
                        : 'border-gray-200 bg-gray-50/50 hover:border-slate-600'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-heading font-bold text-gray-900 text-xl">{pkg.label}</span>
                        <span className="font-heading font-bold text-red-500 text-xl">{pkg.price.toFixed(2)} <span className="text-sm font-normal text-gray-400">KM</span></span>
                      </div>
                      <div className="inline-flex text-xs font-semibold uppercase tracking-wider text-green-400 bg-green-400/10 px-2 py-1 rounded">
                        Ušteda: {pkg.savings.toFixed(2)} KM
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {product.reviews && product.reviews.length > 0 && (
              <div className="mb-10 pt-10 border-t border-gray-200">
                <h3 className="text-gray-900 font-heading text-2xl font-bold mb-6 tracking-wide">Iskustva kupaca</h3>
                <div className="space-y-6">
                  {product.reviews.map((review, idx) => (
                    <div key={idx} className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
                      <div className="flex items-center justify-between mb-3">
                        <div className="font-bold text-gray-900">{review.author}</div>
                        <div className="text-xs text-gray-400">{new Date(review.date).toLocaleDateString('bs-BA')}</div>
                      </div>
                      <div className="flex items-center gap-1 mb-3">
                         {Array.from({ length: 5 }).map((_, i) => (
                           <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                         ))}
                      </div>
                      <p className="text-gray-600 font-light italic leading-relaxed">"{review.text}"</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-auto pt-10 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-8 bg-gray-50 p-5 rounded-3xl border border-gray-200">
                <div className="flex w-full sm:w-auto justify-between items-center sm:gap-4">
                  <span className="text-gray-500 font-medium pl-2 uppercase tracking-wide text-xs">Količina:</span>
                  <div className="flex items-center bg-white rounded-xl border border-gray-300 overflow-hidden">
                    <button 
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="w-12 h-12 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors text-xl font-light"
                    >
                      -
                    </button>
                    <span className="w-12 text-center text-gray-900 font-heading font-bold text-lg">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(q => q + 1)}
                      className="w-12 h-12 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors text-xl font-light"
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <div className="w-full sm:w-px h-px sm:h-12 bg-gray-100 block"></div>
                
                <div className="w-full sm:w-auto sm:ml-auto text-right pr-2 flex justify-between sm:block items-end">
                  <div className="text-xs uppercase tracking-wide text-gray-400 mb-1 text-left sm:text-right">Ukupno</div>
                  <div className="text-3xl font-heading font-black text-gray-900 tracking-tight">
                    {(() => {
                      if (!product.packages) return (quantity * product.price).toFixed(2);
                      const sorted = [...product.packages].sort((a,b) => b.quantity - a.quantity);
                      let total = 0;
                      let rem = quantity;
                      for (const pkg of sorted) {
                        if (rem >= pkg.quantity) {
                          const times = Math.floor(rem / pkg.quantity);
                          total += times * pkg.price;
                          rem = rem % pkg.quantity;
                        }
                      }
                      total += rem * product.price;
                      return total.toFixed(2);
                    })()} <span className="text-lg text-gray-400 font-medium tracking-normal">KM</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAddToCart}
                  disabled={addedToCart}
                  className={`flex-1 flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm uppercase tracking-widest font-bold transition-all duration-300 ${
                    addedToCart 
                      ? 'bg-gray-100 text-red-500 border border-red-600/50'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-300'
                  }`}
                >
                  {addedToCart ? (
                    <><Check className="h-5 w-5" /> Dodano</>
                  ) : (
                    <><ShoppingCart className="h-5 w-5" /> Dodaj u korpu</>
                  )}
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 flex items-center justify-center gap-2 rounded-full bg-red-600 px-8 py-4 text-sm uppercase tracking-widest font-bold text-slate-950 transition-all hover:bg-red-500 hover:scale-[1.02] active:scale-95 shadow-[0_0_30px_-5px_rgba(6,182,212,0.4)]"
                >
                  Kupi odmah
                </button>
              </div>

              <div className="mt-10 flex flex-col gap-4 text-sm text-gray-500 font-light border-t border-gray-200 pt-6">
                <div className="flex items-center gap-3">
                  <Truck className="h-5 w-5 text-red-600 opacity-80" /> <span className="flex-1">Dostava za 24-48h širom BiH (Potpuno diskretno)</span>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-5 w-5 text-red-600 opacity-80" /> <span className="flex-1">100% Originalni proizvodi sa sigurnom kupovinom</span>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}

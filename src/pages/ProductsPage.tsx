import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductsContext';

export function ProductsPage() {
  const { products, categories, loading } = useProducts();
  const [activeCategory, setActiveCategory] = useState("Svi");

  const filteredProducts = activeCategory === "Svi" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Svi Proizvodi - Kamagra Bosna",
    "description": "Pregledajte ponudu najboljih preparata za potenciju uključujući Kamagra gel i Cialis.",
    "url": "https://kamagrabosnasarajevo.ba/proizvodi",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": filteredProducts.map((p, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "url": `https://kamagrabosnasarajevo.ba/proizvod/${p.id}`
      }))
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-600 py-16">
      <Helmet>
        <title>Svi Proizvodi | Kamagra Bosna - Kamagra Gel i Tablete</title>
        <meta name="description" content="Pregledajte ponudu najboljih preparata za potenciju. Nudimo Kamagra gel, Kamagra tablete i ostale proizvode po pristupačnim cijenama uz brzu dostavu u BiH." />
        <link rel="canonical" href="https://kamagrabosnasarajevo.ba/proizvodi" />
        <meta property="og:title" content="Svi Proizvodi | Kamagra Bosna - Kamagra Gel i Tablete" />
        <meta property="og:description" content="Pregledajte ponudu najboljih preparata za potenciju. Nudimo Kamagra gel, Kamagra tablete i ostale proizvode po pristupačnim cijenama uz brzu dostavu u BiH." />
        <meta property="og:url" content="https://kamagrabosnasarajevo.ba/proizvodi" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-32 bg-red-600/10 blur-[100px] rounded-full z-0"></div>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-5xl font-heading font-extrabold tracking-tight text-gray-900 relative z-10"
          >
            Svi Proizvodi
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-gray-500 text-lg max-w-2xl mx-auto font-light relative z-10"
          >
            Odaberite proizvod koji najbolje odgovara vašim potrebama. Svi naši proizvodi su originalni i klinički testirani.
          </motion.p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-16 relative z-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300 uppercase tracking-wider ${
                activeCategory === cat
                  ? 'bg-red-600 text-white shadow-lg shadow-red-500/30'
                  : 'bg-white/50 text-gray-600 backdrop-blur-sm border border-gray-200 hover:border-red-600/50 hover:text-red-500'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
           <div className="text-center text-gray-500 py-12">Učitavanje proizvoda...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group flex flex-col overflow-hidden rounded-[2rem] bg-white/40 border border-gray-200/80 backdrop-blur-sm transition-all duration-500 hover:border-red-600/50 hover:bg-white/80"
              >
                <div className="relative aspect-[4/3] overflow-hidden p-6 pb-0">
                  <div className="absolute inset-0 bg-gradient-to-b from-red-100/10 to-transparent group-hover:from-red-100/20 transition-colors duration-500" />
                  <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    className="relative z-10 w-full h-full object-contain rounded-3xl filter drop-shadow-[0_20px_20px_rgba(0,0,0,0.5)] transition-transform duration-700 group-hover:scale-110 group-hover:-translate-y-2"
                    loading="lazy"
                  />
                  <div className="absolute top-6 left-6 z-20 rounded-full bg-gray-50/80 backdrop-blur-md px-3 py-1.5 text-[10px] font-bold text-red-500 uppercase tracking-widest border border-gray-300/50">
                    {product.category}
                  </div>
                </div>
                
                <div className="flex flex-1 flex-col p-8 pt-6">
                  <h3 className="text-2xl font-heading font-bold text-gray-900 mb-3 tracking-tight group-hover:text-red-600 transition-colors">
                    <Link to={`/proizvod/${product.id}`} className="hover:text-red-500 transition-colors">
                      {product.name}
                    </Link>
                  </h3>
                  <p className="text-sm text-gray-500 mb-8 flex-1 line-clamp-2 font-light leading-relaxed">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-3xl font-heading font-black text-gray-900 tracking-tight">{product.price.toFixed(2)} <span className="text-lg text-gray-400 font-medium">KM</span></span>
                    <Link 
                      to={`/proizvod/${product.id}`}
                      className="rounded-full bg-gray-100 border border-gray-300 px-6 py-2.5 text-sm font-semibold text-gray-900 transition-all duration-300 hover:bg-red-600 hover:border-red-600 hover:text-white hover:shadow-lg hover:shadow-red-500/30"
                    >
                      Naruči
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useProducts } from '../context/ProductsContext';
import { MapPin, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export function LocationPage() {
  const { slug } = useParams<{ slug: string }>();
  const { products } = useProducts();
  
  // parse slug to get city/region e.g., kamagra-sarajevo -> Sarajevo
  const locationName = slug?.split('-').slice(1).join(' ').replace(/\b\w/g, l => l.toUpperCase()) || 'BiH';
  const prefix = slug?.split('-')[0].replace(/\b\w/g, l => l.toUpperCase()) || 'Kamagra';
  const fullName = `${prefix} ${locationName}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    "name": `Kamagra Bosna - ${locationName}`,
    "url": `https://kamagrabosnasarajevo.ba/lokacije/${slug}`,
    "description": `Najkvalitetniji ${prefix} za područje ${locationName}. Nudimo brzu, diskretnu i sigurnu prodaju i dostavu na Vašu adresu u regionu ${locationName}. Najbolja cijena u BiH.`,
    "areaServed": [locationName, "Bosnia and Herzegovina"],
    "knowsAbout": [`${prefix} ${locationName}`, `kamagra ${locationName}`, "kamagra gel", "kamagra bih"]
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 py-16">
      <Helmet>
        <title>{fullName} - Isporuka Istog Dana | Kamagra Prodaja</title>
        <meta name="description" content={`Najkvalitetniji ${prefix} za područje ${locationName}. Nudimo brzu, diskretnu i sigurnu prodaju i dostavu na Vašu adresu u regionu ${locationName}. Najbolja cijena u BiH.`} />
        <meta name="keywords" content={`${fullName}, ${prefix} prodaja ${locationName}, naruciti ${prefix} u ${locationName}, ${slug}`} />
        <link rel="canonical" href={`https://kamagrabosnasarajevo.ba/lokacije/${slug}`} />
        <meta property="og:title" content={`${fullName} - Isporuka Istog Dana | Kamagra Prodaja`} />
        <meta property="og:description" content={`Najkvalitetniji ${prefix} za područje ${locationName}. Nudimo brzu, diskretnu i sigurnu prodaju i dostavu na Vašu adresu u regionu ${locationName}.`} />
        <meta property="og:url" content={`https://kamagrabosnasarajevo.ba/lokacije/${slug}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-1.5 text-xs font-semibold text-red-600 border border-red-100 mb-8 uppercase tracking-widest">
            <MapPin className="h-3.5 w-3.5" /> Pokrivamo {locationName}
          </div>
          <h1 className="text-4xl lg:text-6xl font-heading font-extrabold tracking-tight text-gray-900 mb-6 font-heading">
            Dostava za <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">{locationName}</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
            Tražite sigurnu i diskretnu nabavku u regiji {locationName}? Naša mreža isporuke pokriva {locationName} velikom brzinom. Izaberite iz naše ponude najtraženijih preparata.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.slice(0, 6).map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group flex flex-col overflow-hidden rounded-[2rem] bg-white border border-gray-200 transition-all duration-300 hover:border-red-200 hover:shadow-xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden p-6 pb-0 flex items-center justify-center bg-gray-50/50">
                <img 
                  src={product.imageUrl} 
                  alt={`${product.name} ${locationName}`} 
                  className="relative z-10 max-w-full max-h-full object-contain rounded-3xl transition-transform duration-700 group-hover:scale-110 group-hover:-translate-y-2"
                />
              </div>
              
              <div className="flex flex-1 flex-col p-8 pt-6">
                <h3 className="text-xl font-heading font-bold text-gray-900 mb-3 tracking-tight group-hover:text-red-600 transition-colors">
                  <Link to={`/proizvod/${product.id}`} className="hover:text-red-600 transition-colors">
                    {product.name} <span className="text-sm font-normal text-gray-500">[{locationName}]</span>
                  </Link>
                </h3>
                
                <div className="flex items-center justify-between mt-auto pt-6">
                  <span className="text-2xl font-heading font-black text-gray-900 tracking-tight">{product.price.toFixed(2)} KM</span>
                  <Link 
                    to={`/proizvod/${product.id}`}
                    className="rounded-full bg-gray-100 border border-gray-200 px-6 py-2.5 text-sm font-semibold text-gray-900 transition-all duration-300 hover:bg-red-600 hover:border-red-600 hover:text-white"
                  >
                    Naruči
                  </Link>
                </div>                  
              </div>                
            </motion.div>              
          ))}            
        </div>
        
        <div className="mt-20 max-w-3xl mx-auto prose prose-red prose-lg text-gray-600 font-light text-center">
            <h3>Zašto naručiti {prefix} za {locationName} preko nas?</h3>
            <p>
              Naše usluge dostave za {locationName} su optimizovane da budu apsolutno najbrže i najdiskretnije na tržištu. Mi razumijemo potrebu za privatnošću. Bilo da se nalazite u samom centru ili okolini, naša posvećena mreža garantuje bezbjednost vašeg paketa.
            </p>
        </div>
      </div>
    </div>
  );
}

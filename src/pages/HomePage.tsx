import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Shield, TrendingUp, CheckCircle, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductsContext';

export function HomePage() {
  const { products, loading } = useProducts();
  const [blogs, setBlogs] = useState<any[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Filter products for slider (top 3)
  const sliderProducts = products.slice(0, 3);

  useEffect(() => {
    fetch('/api/blogs')
      .then(res => res.json())
      .then(data => {
        setBlogs((data || []).sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 3));
      });
  }, []);

  useEffect(() => {
    if (sliderProducts.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % sliderProducts.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [sliderProducts.length]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    "name": "Kamagra Bosna",
    "url": "https://kamagrabosnasarajevo.ba",
    "description": "Najpovoljnija Kamagra u BiH. Prodaja Kamagra gel, Kamagra oral jelly, Kamagra tablete i Cialis.",
    "areaServed": ["Bosnia and Herzegovina", "Sarajevo"],
    "knowsAbout": ["kamagra", "kamagra bih", "kamagra gel", "kamagra oral jelly", "kamagra tablete", "kamagra sarajevo"]
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-600">
      <Helmet>
        <title>Kamagra Bosna Prodaja | Kamagra Gel, Oral Jelly, Tablete, Cialis</title>
        <meta name="description" content="Najpovoljnija Kamagra BiH. Originalna Kamagra, Kamagra Bosna i Cialis. Pitate se gdje kupiti kamagra gel u bih ili kamagra sarajevo? Mi nudimo sigurnu i diskretnu dostavu." />
        <link rel="canonical" href="https://kamagrabosnasarajevo.ba/" />
        <meta property="og:title" content="Kamagra Bosna Prodaja | Kamagra Gel, Oral Jelly, Tablete, Cialis" />
        <meta property="og:description" content="Najpovoljnija Kamagra BiH. Originalna Kamagra, Kamagra Bosna i Cialis. Pitate se gdje kupiti kamagra gel u bih ili kamagra sarajevo? Mi nudimo sigurnu i diskretnu dostavu." />
        <meta property="og:url" content="https://kamagrabosnasarajevo.ba/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Kamagra Bosna Prodaja | Kamagra Gel, Oral Jelly, Tablete, Cialis" />
        <meta name="twitter:description" content="Najpovoljnija Kamagra BiH. Originalna Kamagra, Kamagra Bosna i Cialis. Pitate se gdje kupiti kamagra gel u bih ili kamagra sarajevo? Mi nudimo sigurnu i diskretnu dostavu." />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* Hero / Slider Section */}
      <section className="relative overflow-hidden pt-20 pb-32 lg:pt-24 lg:pb-32 bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative z-10 text-center lg:text-left pt-10"
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-1.5 text-xs font-semibold text-red-600 ring-1 ring-inset ring-red-100 mb-8 uppercase tracking-widest backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
                </span>
                Nova isporuka Kamagra proizvoda
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-heading font-extrabold tracking-tight text-gray-900 mb-6 leading-[1.1]">
                Moć koju zaslužujete.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">
                  Rezultati odmah.
                </span>
              </h1>
              
              <p className="mt-4 text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed font-light">
                Originalni <strong>Kamagra Gel</strong>, <strong>Cialis 20mg Tablete</strong> i još mnogo toga. Najpouzdanija nabavka <em>Kamagra Bosna</em> i diskretna isporuka za <em>Kamagra Sarajevo</em> i cijelu BiH.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-5">
                <Link 
                  to="/proizvodi" 
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-red-600 px-8 py-4 text-sm font-bold text-white shadow-xl transition-all hover:bg-red-500 hover:scale-105 active:scale-95 uppercase tracking-wide"
                >
                  Istraži proizvode <ArrowRight className="h-5 w-5" />
                </Link>
                <a href="tel:+38761542442" className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-8 py-4 text-sm font-bold text-gray-900 transition-all hover:bg-gray-50 hover:border-red-600 uppercase tracking-wide">
                  Naruči telefonom
                </a>
              </div>
            </motion.div>

            {/* Slider */}
            <div className="relative hidden lg:block h-[500px]">
               {sliderProducts.length > 0 && (
                 <div className="relative h-full w-full rounded-[2rem] overflow-hidden border border-gray-200 bg-gray-50 shadow-2xl group">
                   <AnimatePresence mode="wait">
                     <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-white cursor-pointer"
                     >
                       <Link to={`/proizvod/${sliderProducts[currentSlide].id}`} className="absolute inset-0 z-10"></Link>
                       <img 
                          src={sliderProducts[currentSlide].imageUrl} 
                          alt={sliderProducts[currentSlide].name} 
                          className="w-full h-64 object-contain transition-transform duration-700 group-hover:scale-110 mb-6"
                       />
                       <div className="text-center">
                         <span className="bg-red-50 text-red-600 text-xs px-2 py-1 rounded-full uppercase tracking-widest font-bold border border-red-100">{sliderProducts[currentSlide].category}</span>
                         <h3 className="text-2xl font-bold font-heading text-gray-900 mt-4 mb-2">{sliderProducts[currentSlide].name}</h3>
                         <p className="text-red-600 font-bold text-xl">{sliderProducts[currentSlide].price.toFixed(2)} KM</p>
                       </div>
                     </motion.div>
                   </AnimatePresence>
                   <button aria-label="Prethodni proizvod" onClick={() => setCurrentSlide(s => (s === 0 ? sliderProducts.length - 1 : s - 1))} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full border border-gray-200 text-gray-900 hover:text-red-600 z-20 hover:scale-110 transition-transform"><ChevronLeft className="w-5 h-5"/></button>
                   <button aria-label="Sljedeći proizvod" onClick={() => setCurrentSlide(s => (s + 1) % sliderProducts.length)} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full border border-gray-200 text-gray-900 hover:text-red-600 z-20 hover:scale-110 transition-transform"><ChevronRight className="w-5 h-5"/></button>
                 </div>
               )}
            </div>

          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative -mt-16 z-20 pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="flex flex-col items-center text-center gap-4 p-8 rounded-2xl bg-white border border-gray-200 shadow-xl shadow-gray-200/50">
              <div className="p-4 bg-red-50 rounded-full text-red-600 ring-1 ring-red-100">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-gray-900 font-heading font-bold text-lg">100% Originalno</h3>
              <p className="text-sm text-gray-500 font-light leading-relaxed">Svi naši proizvodi podliježu rigoroznim kontrolama i dolaze sa provjerivim serijskim brojem. Kamagra sigurnost na prvom mjestu.</p>
            </div>
            <div className="flex flex-col items-center text-center gap-4 p-8 rounded-2xl bg-white border border-gray-200 shadow-xl shadow-gray-200/50 relative lg:-translate-y-4">
              <div className="p-4 bg-red-600 rounded-full text-white shadow-lg shadow-red-600/30 ring-4 ring-red-50 z-10 relative">
                <TrendingUp className="h-8 w-8" />
              </div>
              <h3 className="text-gray-900 font-heading font-bold text-lg z-10 relative">Brzo djelovanje</h3>
              <p className="text-sm text-gray-500 font-light leading-relaxed z-10 relative">Formule garantuju sigurne rezultate u roku od 15 minuta. Tretirajte vaš problem s povjerenjem.</p>
            </div>
            <div className="flex flex-col items-center text-center gap-4 p-8 rounded-2xl bg-white border border-gray-200 shadow-xl shadow-gray-200/50">
              <div className="p-4 bg-red-50 rounded-full text-red-600 ring-1 ring-red-100">
                <CheckCircle className="h-8 w-8" />
              </div>
              <h3 className="text-gray-900 font-heading font-bold text-lg">Apsolutna diskrecija</h3>
              <p className="text-sm text-gray-500 font-light leading-relaxed">Pakujemo u neoznačene, netransparentne kutije. Anonimna nabavka i dostava širom Kamagra BiH mreže.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 relative bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Izdvojeni proizvodi
            </h2>
            <p className="mt-4 text-gray-500">Najpopularniji suplementi: Kamagra Gel, Cialis Tablete.</p>
          </div>

          {loading ? (
             <div className="text-center text-gray-500 py-12">Učitavanje proizvoda...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.slice(0, 3).map((product, idx) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="group flex flex-col overflow-hidden rounded-[2rem] bg-white border border-gray-200 transition-all duration-500 hover:border-red-200 hover:shadow-xl"
                >
                  <div className="relative aspect-[4/3] overflow-hidden p-6 pb-0 flex items-center justify-center bg-gray-50/50">
                    <img 
                      src={product.imageUrl} 
                      alt={product.name} 
                      className="relative z-10 max-w-full max-h-full object-contain rounded-3xl transition-transform duration-700 group-hover:scale-110 group-hover:-translate-y-2"
                      loading="lazy"
                    />
                    <div className="absolute top-6 left-6 z-20 rounded-full bg-white px-3 py-1.5 text-[10px] font-bold text-red-600 uppercase tracking-widest border border-gray-200">
                      {product.category}
                    </div>
                  </div>
                  
                  <div className="flex flex-1 flex-col p-8 pt-6">
                    <h3 className="text-2xl font-heading font-bold text-gray-900 mb-3 tracking-tight group-hover:text-red-600 transition-colors">
                      <Link to={`/proizvod/${product.id}`} className="hover:text-red-600 transition-colors">
                         {product.name}
                      </Link>
                    </h3>
                    <p className="text-sm text-gray-500 mb-8 flex-1 line-clamp-2 font-light leading-relaxed">
                      {product.description}
                    </p>
                    
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-3xl font-heading font-black text-gray-900 tracking-tight">{product.price.toFixed(2)} <span className="text-lg text-gray-500 font-medium">KM</span></span>
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
          )}
            
          <div className="mt-20 text-center">
            <Link 
              to="/proizvodi"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-10 py-5 text-sm font-bold text-gray-900 transition-all hover:bg-gray-50 hover:border-red-600 uppercase tracking-widest"
            >
              Pogledajte sve proizvode <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* SEO Blogs Section */}
      <section className="py-24 bg-white border-t border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4 font-heading">
                Edukacija & Kamagra Savjeti
              </h2>
              <p className="text-gray-600 font-light text-lg">
                Pročitajte naše najnovije članke da se informišete o korištenju preparata. Saznajte sve o Kamagra BiH tržištu, najpopularnijim artiklima kao što su Cialis 20mg Tablete i još mnogo toga.
              </p>
            </div>
            <Link to="/blog" className="shrink-0 rounded-full border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50 hover:border-red-600 transition-colors uppercase tracking-widest">
              Svi Članci
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog, idx) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group flex flex-col overflow-hidden rounded-[2rem] bg-gray-50 border border-gray-200 hover:border-red-500/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={blog.imageUrl || 'https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&q=80&w=600'} 
                    alt={blog.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 rounded-full bg-white/90 backdrop-blur-md px-3 py-1.5 text-xs font-bold text-red-600 uppercase tracking-widest border border-red-100 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5"/> Savjeti
                  </div>
                </div>
                
                <div className="flex flex-col flex-1 p-8">
                  <h3 className="text-xl font-heading font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
                    <Link to={`/blog/${blog.id}`} className="hover:text-red-500">
                      {blog.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-gray-600 mb-6 flex-1 font-light leading-relaxed line-clamp-3">
                    {blog.summary}
                  </p>
                  <Link 
                    to={`/blog/${blog.id}`}
                    className="mt-auto inline-flex items-center gap-2 text-sm font-bold text-red-600 uppercase tracking-wider hover:text-red-700 w-fit"
                  >
                    Pročitaj više <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            ))}
            {blogs.length === 0 && (
              <div className="col-span-full text-center text-gray-500 py-12 bg-gray-50 rounded-2xl border border-gray-200">
                Uskoro stižu novi blog postovi o Kamagra i Cialis preparatima.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 bg-gray-50 border-t border-gray-200 relative">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-heading font-extrabold tracking-tight text-gray-900 sm:text-5xl mb-6">Često Postavljana Pitanja</h2>
            <p className="mt-4 text-gray-600 font-light text-lg">Sve što trebate znati o kupovini i sigurnosti naših preparata.</p>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white p-8 md:p-10 rounded-[2rem] border border-gray-200 transition-all duration-300 hover:border-red-200 hover:shadow-lg">
              <h3 className="text-2xl font-heading font-bold text-gray-900 mb-4">Gdje kupiti kamagra gel u bih?</h3>
              <p className="text-gray-600 leading-relaxed font-light text-lg">Originalni kamagra gel, kamagra oral jelly, kao i kamagra tablete možete naručiti preko našeg web shopa sa 100% garancijom autentičnosti. Brza kurirska isporuka je omogućena za čitavu državu u diskretnom pakovanju.</p>
            </div>
            
            <div className="bg-white p-8 md:p-10 rounded-[2rem] border border-gray-200 transition-all duration-300 hover:border-red-200 hover:shadow-lg">
              <h3 className="text-2xl font-heading font-bold text-gray-900 mb-4">Da li ima kamagra u apotekama bih?</h3>
              <p className="text-gray-600 leading-relaxed font-light text-lg">Pronalazak preparata kamagra u apotekama bih može biti otežan i često zahtijeva recept, a cijene su znatno veće. Mi obezbjeđujemo znatno povoljniju soluciju provjerenih Kamagra Bosna proizvoda dostavljenih anonimno na vaša vrata.</p>
            </div>
            
            <div className="bg-white p-8 md:p-10 rounded-[2rem] border border-gray-200 transition-all duration-300 hover:border-red-200 hover:shadow-lg">
              <h3 className="text-2xl font-heading font-bold text-gray-900 mb-4">Dali je kamagra opasna?</h3>
              <p className="text-gray-600 leading-relaxed font-light text-lg">Mnogi se pitaju dali je kamagra opasna. Odgovor je da nije opasna kada se koristi po uputstvu i radi na bazi Sildenafila. Klinički je testirana. Međutim, ne preporučuje se mlađima od 18 godina, te srčanim bolesnicima. Ukoliko imate povišen pritisak, savjetujemo konsultaciju sa doktorom.</p>
            </div>
            
            <div className="bg-white p-8 md:p-10 rounded-[2rem] border border-gray-200 transition-all duration-300 hover:border-red-200 hover:shadow-lg">
              <h3 className="text-2xl font-heading font-bold text-gray-900 mb-4">Naručivanje za Kamagra Sarajevo?</h3>
              <p className="text-gray-600 leading-relaxed font-light text-lg">Cjelokupni asortiman Kamagra BiH proizvoda dostupan je za isporuku u gradu Sarajevu. Kamagra Sarajevo osigurava izuzetno efikasnu dostavu na teritoriji grada istog ili najkasnije narednog dana u potpuno diskretnom paketu.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

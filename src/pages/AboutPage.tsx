import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Shield, Truck, Package, Heart } from 'lucide-react';
import { motion } from 'motion/react';

export function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-600 py-16">
      <Helmet>
        <title>O nama | Kamagra Bosna i Hercegovina prodaja</title>
        <meta name="description" content="Saznajte više o Kamagra prodaji u BiH. Nudimo originalne proizvode za potenciju uz brzu i diskretnu dostavu u Sarajevu i ostalim gradovima. Saznajte da li je Kamagra opasna i gdje nabaviti najbolji kvalitet." />
        <meta name="keywords" content="kamagra, kamagra bih, kamagra gel, kamagra oral jelly, kamagra tablete, kamagra sarajevo, da li je kamagra opasna" />
      </Helmet>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6"
          >
            Kamagra Bosna - Vaš pouzdan partner
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-500 leading-relaxed"
          >
            Kao vodeći distributer za <strong className="text-red-500">Kamagra i Cialis proizvode u Bosni i Hercegovini</strong>, naš cilj je da vam osiguramo originalne suplemente za potenciju vrhunskog kvaliteta sa maksimalnom diskrecijom i najbržom dostavom na tržištu.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-3xl overflow-hidden shadow-2xl relative aspect-[4/3]"
          >
            <div className="absolute inset-0 bg-gray-100 animate-pulse" />
            <img 
              src="https://images.unsplash.com/photo-1628771065518-0d82f1938462?q=80&w=1000&auto=format&fit=crop" 
              alt="Kamagra Bosna originalni proizvodi" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/80 via-transparent to-transparent" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Zašto odabrati nas?</h2>
            
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-red-600/10 rounded-xl flex items-center justify-center text-red-500">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">100% Originalni proizvodi</h3>
                  <p className="text-gray-500">Svi naši preparati su provjereni i sigurni za upotrebu. U Bosni i Hercegovini garantujemo isključivo distribuciju farmaceutski testiranih sredstava za potenciju.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-red-600/10 rounded-xl flex items-center justify-center text-red-500">
                  <Package className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Apsolutna diskrecija</h3>
                  <p className="text-gray-500">Vaša privatnost nam je na prvom mjestu. Paketi se šalju u potpuno neoznačenim i nevidljivim kutijama, bez ikakvih naznaka o sadržaju na naljepnici brze pošte.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-red-600/10 rounded-xl flex items-center justify-center text-red-500">
                  <Truck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Brza dostava širom BiH</h3>
                  <p className="text-gray-500">Naša mreža brze pošte pokriva svaki grad u Bosni - od Sarajeva, Banja Luke, Mostara do Tuzle i Zenice. Isporuka zaštićene pošiljke stiže na vašu adresu u roku 24 do 48 sati.</p>
                </div>
              </div>
              
            </div>
          </motion.div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-3xl p-8 md:p-12 text-center max-w-4xl mx-auto">
          <Heart className="w-12 h-12 text-red-600 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Naša misija</h2>
          <p className="text-lg text-gray-500 mb-8 leading-relaxed text-justify md:text-center">
            Povećanje seksualnog samopouzdanja i kvaliteta intimnog života ne treba biti tabu tema. Kroz brend <strong className="text-gray-900">Kamagra Bosna Shop</strong>, želimo obezbijediti jednostavan, anoniman i pristupačan način za prevazilaženje problema sa potencijom, i time učiniti srećnijim na hiljade muškaraca širom države.
          </p>
        </div>

      </div>
    </div>
  );
}

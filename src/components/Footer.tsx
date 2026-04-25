import React from 'react';
import { ShieldCheck, Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-white pt-20 pb-10 border-t border-gray-200" id="o-nama">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-3 text-red-600 mb-6 w-fit">
              <div className="bg-red-600/10 p-2 rounded-xl">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <span className="text-2xl font-heading font-bold tracking-tight text-gray-900">Kamagra<span className="text-red-600">BiH</span></span>
            </Link>
            <p className="text-gray-500 text-base leading-relaxed max-w-md font-light">
              Vodeći distributer originalnih preparata za potenciju u Bosni i Hercegovini. Nudimo sigurne, provjerene proizvode uz potpunu anonimnost i diskretnu dostavu u roku od 24h.
            </p>
          </div>

          <div>
            <h3 className="text-gray-900 font-heading font-semibold text-lg mb-6 tracking-wide">Navigacija</h3>
            <ul className="space-y-3 text-base text-gray-500 font-light">
              <li><Link to="/" className="hover:text-red-500 transition-colors">Početna</Link></li>
              <li><Link to="/proizvodi" className="hover:text-red-500 transition-colors">Svi Proizvodi</Link></li>
              <li><Link to="/blog" className="hover:text-red-500 transition-colors">Blog</Link></li>
              <li><Link to="/o-nama" className="hover:text-red-500 transition-colors">O nama</Link></li>
              <li><Link to="/korpa" className="hover:text-red-500 transition-colors">Vaša Korpa</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-gray-900 font-heading font-semibold text-lg mb-6 tracking-wide">Kontaktirajte nas</h3>
            <ul className="space-y-4 text-base text-gray-500 font-light">
              <li>
                <a href="tel:+38761542442" className="flex items-center gap-3 hover:text-red-500 transition-colors">
                  <div className="p-2 bg-gray-100 rounded-lg text-red-600"><Phone className="h-4 w-4" /></div>
                  <span className="font-medium tracking-wider">+387 61 542 442</span>
                </a>
              </li>
              <li className="flex gap-4 pt-2">
                 <a href="viber://chat?number=+38761542442" className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:border-purple-500 hover:text-purple-400 transition-all bg-gray-50/50">
                   <img src="https://www.vectorlogo.zone/logos/viber/viber-tile.svg" alt="Viber" className="h-5 w-5 rounded object-contain bg-white" /> Viber
                 </a>
                 <a href="https://wa.me/38761542442" className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:border-green-500 hover:text-green-500 transition-all bg-gray-50/50">
                   <img src="https://www.vectorlogo.zone/logos/whatsapp/whatsapp-tile.svg" alt="WhatsApp" className="h-5 w-5 rounded object-contain bg-white" /> WhatsApp
                 </a>
              </li>
            </ul>
          </div>

        </div>
        
        <div className="border-t border-gray-200 pt-8 mt-12 pb-6">
          <div className="text-xs text-gray-400 font-light mb-6 flex flex-col items-center">
            <h4 className="font-semibold text-gray-500 mb-2">Često pretraživani pojmovi:</h4>
            <div className="flex flex-wrap justify-center gap-2">
              <Link to="/lokacije/kamagra-sarajevo" className="bg-gray-100 px-2 py-1 rounded hover:bg-red-50 hover:text-red-600 transition-colors">Kamagra Sarajevo</Link>
              <Link to="/lokacije/kamagra-bosna" className="bg-gray-100 px-2 py-1 rounded hover:bg-red-50 hover:text-red-600 transition-colors">Kamagra Bosna</Link>
              <Link to="/lokacije/kamagra-bih" className="bg-gray-100 px-2 py-1 rounded hover:bg-red-50 hover:text-red-600 transition-colors">Kamagra BiH</Link>
              <span className="bg-gray-100 px-2 py-1 rounded">Kamagra Gel</span>
              <span className="bg-gray-100 px-2 py-1 rounded">Kamagra Bombone</span>
              <span className="bg-gray-100 px-2 py-1 rounded">Cialis 20mg Tablete</span>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-gray-400 text-sm font-light">
              © {new Date().getFullYear()} Kamagra BiH. Sva prava zadržana.
            </p>
            <div className="flex items-center gap-6 text-gray-400 text-sm font-light uppercase tracking-wider">
              <span>Brza isporuka</span>
              <span className="hidden md:inline">•</span>
              <span>100% Diskretno</span>
              <span className="hidden md:inline">•</span>
              <span>Originalni proizvodi</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

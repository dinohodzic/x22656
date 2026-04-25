import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { ArrowRight, BookOpen } from 'lucide-react';

export function BlogPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/blogs')
      .then(res => res.json())
      .then(data => {
        setBlogs(data.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
        setLoading(false);
      });
  }, []);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Kamagra Bosna Blog",
    "description": "Edukacija i savjeti o Kamagra i Cialis proizvodima u BiH.",
    "url": "https://kamagrabosnasarajevo.ba/blog",
    "blogPost": blogs.map((b: any) => ({
      "@type": "BlogPosting",
      "headline": b.title,
      "url": `https://kamagrabosnasarajevo.ba/blog/${b.id}`,
      "datePublished": b.createdAt
    }))
  };

  return (
    <div className="bg-white min-h-screen py-20 text-gray-900">
      <Helmet>
        <title>Blog - Kamagra Bosna | Edukacija, Savjeti i Vijesti</title>
        <meta name="description" content="Otvorite naš blog i informirite se o Kamagra, Kamagra BiH, Kamagra Bosna i Cialis proizvodima. Korisni savjeti za potenciju i zdravlje muškaraca." />
        <link rel="canonical" href="https://kamagrabosnasarajevo.ba/blog" />
        <meta property="og:title" content="Blog - Kamagra Bosna | Edukacija, Savjeti i Vijesti" />
        <meta property="og:description" content="Otvorite naš blog i informirite se o Kamagra, Kamagra BiH, Kamagra Bosna i Cialis proizvodima. Korisni savjeti za potenciju i zdravlje muškaraca." />
        <meta property="og:url" content="https://kamagrabosnasarajevo.ba/blog" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-gray-900 mb-6">Kamagra BiH Blog</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
            Sve što trebate znati o potenciji, upotrebi Cialis 20mg tableta, i zdravlju muškaraca na jednom mjestu. Naši članci vam pomažu do boljih rezultata.
          </p>
        </div>

        {loading ? (
          <div className="text-center text-gray-500 py-12">Učitavanje...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog, idx) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group flex flex-col overflow-hidden rounded-[2rem] bg-gray-50 border border-gray-200 hover:border-red-500/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={blog.imageUrl || 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800'} 
                    alt={blog.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 rounded-full bg-white/90 backdrop-blur-md px-3 py-1.5 text-xs font-bold text-red-600 uppercase tracking-widest border border-red-100 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5"/> Edukacija
                  </div>
                </div>
                
                <div className="flex flex-col flex-1 p-8">
                  <div className="text-xs text-gray-500 mb-3">{new Date(blog.createdAt).toLocaleDateString('bs-BA')}</div>
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
          </div>
        )}
        {!loading && blogs.length === 0 && (
          <div className="text-center text-gray-500 py-12 bg-gray-50 rounded-2xl border border-gray-200">
            Još uvijek nema objavljenih članaka. Vratite se uskoro!
          </div>
        )}
      </div>
    </div>
  );
}

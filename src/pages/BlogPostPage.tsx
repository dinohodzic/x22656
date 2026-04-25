import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, BookOpen, Calendar } from 'lucide-react';
import { motion } from 'motion/react';

export function BlogPostPage() {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/blogs')
      .then(res => res.json())
      .then(data => {
        const found = data.find((b: any) => b.id === id);
        setBlog(found);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="min-h-[60vh] flex items-center justify-center text-red-600 bg-white">Učitavanje...</div>;
  }

  if (!blog) {
    return <div className="min-h-[60vh] flex items-center justify-center flex-col text-gray-900 bg-white">
      <h2 className="text-2xl font-bold mb-4">Blog nije pronađen</h2>
      <Link to="/blog" className="text-red-600 hover:underline">Nazad na blogove</Link>
    </div>;
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://kamagrabosnasarajevo.ba/blog/${blog.id}`
    },
    "headline": blog.title,
    "description": blog.summary,
    "image": blog.imageUrl,
    "datePublished": blog.createdAt,
    "dateModified": blog.createdAt,
    "author": {
       "@type": "Organization",
       "name": "Kamagra Bosna"
    }
  };

  return (
    <div className="bg-white min-h-screen py-16 text-gray-900">
      <Helmet>
        <title>{blog.title} | Kamagra Bosna Blog</title>
        <meta name="description" content={blog.summary} />
        <link rel="canonical" href={`https://kamagrabosnasarajevo.ba/blog/${blog.id}`} />
        <meta property="og:title" content={`${blog.title} | Kamagra Bosna Blog`} />
        <meta property="og:description" content={blog.summary} />
        <meta property="og:image" content={blog.imageUrl} />
        <meta property="og:url" content={`https://kamagrabosnasarajevo.ba/blog/${blog.id}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blog.title} />
        <meta name="twitter:description" content={blog.summary} />
        <meta name="twitter:image" content={blog.imageUrl} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/blog" className="inline-flex items-center gap-2 text-gray-500 hover:text-red-600 mb-8 font-semibold text-sm transition-colors uppercase tracking-widest">
          <ArrowLeft className="h-4 w-4" /> Sve objave
        </Link>
        
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-6 font-medium">
          <span className="flex items-center gap-1.5 text-red-600 bg-red-50 px-3 py-1 rounded-full"><BookOpen className="h-4 w-4"/> Edukativno</span>
          <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4"/> {new Date(blog.createdAt).toLocaleDateString('bs-BA')}</span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight text-gray-900 mb-8 leading-[1.1]">
          {blog.title}
        </h1>

        {blog.imageUrl && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-12 rounded-[2rem] overflow-hidden border border-gray-200 shadow-xl"
          >
            <img src={blog.imageUrl} alt={blog.title} className="w-full object-cover max-h-[500px]" />
          </motion.div>
        )}

        <div className="max-w-3xl mx-auto">
          <div className="text-xl text-gray-600 font-light leading-relaxed mb-10 pb-10 border-b border-gray-200">
            {blog.summary}
          </div>
          
          {/* Main content from HTML */}
          <div 
            className="prose prose-lg prose-red max-w-none text-gray-700 font-light leading-loose 
              prose-headings:font-heading prose-headings:font-bold prose-headings:text-gray-900
              prose-a:text-red-600 hover:prose-a:text-red-700
              prose-strong:text-gray-900 prose-img:rounded-2xl" 
            dangerouslySetInnerHTML={{ __html: blog.content }} 
          />
        </div>
      </article>
    </div>
  );
}

import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { CartProvider } from './context/CartContext';
import { ProductsProvider } from './context/ProductsContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ProductPage } from './pages/ProductPage';
import { CartPage } from './pages/CartPage';
import { AboutPage } from './pages/AboutPage';
import { ProductsPage } from './pages/ProductsPage';
import { BlogPage } from './pages/BlogPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { LocationPage } from './pages/LocationPage';
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminProducts } from './pages/admin/AdminProducts';
import { AdminBlogs } from './pages/admin/AdminBlogs';
import { AdminOrders } from './pages/admin/AdminOrders';
import { AdminConfig } from './pages/admin/AdminConfig';

// ScrollToTop component to ensure view resets when changing routes
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <HelmetProvider>
      <ProductsProvider>
        <CartProvider>
          <BrowserRouter>
            <ScrollToTop />
            <div className="flex flex-col min-h-screen bg-gray-50 font-sans text-gray-600 selection:bg-red-600/30 selection:text-cyan-200">
              <Header />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/proizvodi" element={<ProductsPage />} />
                  <Route path="/blog" element={<BlogPage />} />
                  <Route path="/blog/:id" element={<BlogPostPage />} />
                  <Route path="/lokacije/:slug" element={<LocationPage />} />
                  <Route path="/o-nama" element={<AboutPage />} />
                  <Route path="/proizvod/:id" element={<ProductPage />} />
                  <Route path="/korpa" element={<CartPage />} />
                  <Route path="/adminlogin" element={<AdminLogin />} />
                  <Route path="/admin" element={<AdminDashboard />}>
                    <Route index element={<AdminOrders />} />
                    <Route path="proizvodi" element={<AdminProducts />} />
                    <Route path="blogovi" element={<AdminBlogs />} />
                    <Route path="podesavanja" element={<AdminConfig />} />
                  </Route>
                </Routes>
              </main>
              <Footer />
            </div>
          </BrowserRouter>
        </CartProvider>
      </ProductsProvider>
    </HelmetProvider>
  );
}

import React, { useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { Package, ShoppingBag, Settings, LogOut, FileText } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/adminlogin');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/adminlogin');
  };

  const navItems = [
    { name: 'Narudžbe', path: '/admin', icon: ShoppingBag },
    { name: 'Proizvodi', path: '/admin/proizvodi', icon: Package },
    { name: 'Blog', path: '/admin/blogovi', icon: FileText },
    { name: 'Podešavanja', path: '/admin/podesavanja', icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-600">
      <Helmet><title>Admin Panel</title></Helmet>

      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Kamagra Admin</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-red-600/10 text-red-500 font-medium'
                    : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            )
          })}
        </nav>
        <div className="p-4 border-t border-gray-200">
          <button 
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-4 py-3 rounded-lg text-gray-500 hover:bg-red-500/10 hover:text-red-400 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            Odjava
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
}

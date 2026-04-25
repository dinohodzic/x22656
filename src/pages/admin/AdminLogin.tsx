import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ShieldCheck } from 'lucide-react';

export function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      
      if (res.ok) {
        localStorage.setItem('adminToken', data.token);
        navigate('/admin');
      } else {
        setError(data.error || 'Pogrešni podaci');
      }
    } catch (e) {
      setError('Došlo je do greške');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center -mt-16 px-4">
      <Helmet><title>Admin Prijava</title></Helmet>
      <div className="w-full max-w-md bg-white border border-gray-200 p-8 rounded-2xl shadow-xl">
        <div className="flex flex-col items-center mb-8">
          <ShieldCheck className="h-12 w-12 text-red-600 mb-2" />
          <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
          <p className="text-sm text-gray-500">Prijavite se za upravljanje prodavnicom</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg text-sm mb-6 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Email adresa</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="admin@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Lozinka</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="••••••••"
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-red-600 hover:bg-red-500 text-slate-950 font-bold py-3 rounded-lg transition-colors mt-4"
          >
            Prijavi se
          </button>
        </form>
      </div>
    </div>
  );
}

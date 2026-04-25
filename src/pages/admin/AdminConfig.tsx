import React, { useEffect, useState } from 'react';
import { Mail, Shield } from 'lucide-react';

export function AdminConfig() {
  const [settings, setSettings] = useState<any>({ smtpHost: '', smtpPort: 587, smtpUser: '', smtpPass: '', smtpFrom: '' });
  const [admin, setAdmin] = useState<any>({ email: '', password: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/settings').then(r => r.json()).then(setSettings);
    fetch('/api/settings/admin').then(r => r.json()).then(setAdmin);
  }, []);

  const handleSettingsSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings)
    });
    showMessage('Email podešavanja sačuvana');
  };

  const handleAdminSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/settings/admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(admin)
    });
    showMessage('Admin kredencijali sačuvani');
  };

  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Podešavanja</h1>
      
      {message && (
        <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/50 text-emerald-500 rounded-lg">
          {message}
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-8">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
          <Mail className="w-6 h-6 text-red-600" />
          <h2 className="text-xl font-bold text-gray-900">Email (SMTP) Postavke</h2>
        </div>
        <form onSubmit={handleSettingsSave} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">SMTP Host</label>
              <input type="text" value={settings.smtpHost || ''} onChange={e => setSettings({...settings, smtpHost: e.target.value})} className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-gray-900" placeholder="npr. smtp.gmail.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Port</label>
              <input type="number" value={settings.smtpPort || ''} onChange={e => setSettings({...settings, smtpPort: parseInt(e.target.value)})} className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-gray-900" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Email adresa (User)</label>
            <input type="email" value={settings.smtpUser || ''} onChange={e => setSettings({...settings, smtpUser: e.target.value})} className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-gray-900" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Lozinka</label>
            <input type="password" value={settings.smtpPass || ''} onChange={e => setSettings({...settings, smtpPass: e.target.value})} className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-gray-900" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Šalje (From Email)</label>
            <input type="email" value={settings.smtpFrom || ''} onChange={e => setSettings({...settings, smtpFrom: e.target.value})} className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-gray-900" />
          </div>
          <button type="submit" className="bg-gray-100 hover:bg-gray-200 text-gray-900 px-6 py-2 rounded-lg transition-colors">Sačuvaj Email Postavke</button>
        </form>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
          <Shield className="w-6 h-6 text-red-600" />
          <h2 className="text-xl font-bold text-gray-900">Admin Kredencijali</h2>
        </div>
        <form onSubmit={handleAdminSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Admin Email</label>
            <input type="email" required value={admin.email || ''} onChange={e => setAdmin({...admin, email: e.target.value})} className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-gray-900" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Admin Nova Lozinka</label>
            <input type="password" required value={admin.password || ''} onChange={e => setAdmin({...admin, password: e.target.value})} className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-gray-900" />
          </div>
          <button type="submit" className="bg-red-500/10 border border-red-500/20 hover:bg-red-500 hover:text-gray-900 text-red-500 px-6 py-2 rounded-lg transition-colors">Ažuriraj Kredencijale</button>
        </form>
      </div>
    </div>
  );
}

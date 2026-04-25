import React, { useState } from 'react';
import { useProducts } from '../../context/ProductsContext';
import { Edit, Trash, Plus } from 'lucide-react';

export function AdminProducts() {
  const { products, refreshProducts } = useProducts();
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleDelete = async (id: string) => {
    if (confirm('Da li ste sigurni da želite obrisati ovaj proizvod?')) {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
      refreshProducts();
    }
  };

  const handleAddPackage = () => {
    const packages = editingProduct.packages || [];
    setEditingProduct({
      ...editingProduct,
      packages: [...packages, { quantity: 2, price: 0, savings: 0, label: '2 Pakovanja' }]
    });
  };

  const handleUpdatePackage = (index: number, field: string, value: string | number) => {
    const packages = [...(editingProduct.packages || [])];
    packages[index] = { ...packages[index], [field]: value };
    setEditingProduct({ ...editingProduct, packages });
  };

  const handleRemovePackage = (index: number) => {
    const packages = [...(editingProduct.packages || [])];
    packages.splice(index, 1);
    setEditingProduct({ ...editingProduct, packages });
  };

  const handleAddReview = () => {
    const reviews = editingProduct.reviews || [];
    setEditingProduct({
      ...editingProduct,
      reviews: [...reviews, { author: 'Kupac', rating: 5, text: '', date: new Date().toISOString() }]
    });
  };

  const handleUpdateReview = (index: number, field: string, value: string | number) => {
    const reviews = [...(editingProduct.reviews || [])];
    reviews[index] = { ...reviews[index], [field]: value };
    setEditingProduct({ ...editingProduct, reviews });
  };

  const handleRemoveReview = (index: number) => {
    const reviews = [...(editingProduct.reviews || [])];
    reviews.splice(index, 1);
    setEditingProduct({ ...editingProduct, reviews });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const isNew = !editingProduct.id;
    const url = isNew ? '/api/products' : `/api/products/${editingProduct.id}`;
    const method = isNew ? 'POST' : 'PUT';

    // Parse benefits
    const payload = {
      ...editingProduct,
      price: parseFloat(editingProduct.price),
      packages: editingProduct.packages ? editingProduct.packages.map((p: any) => ({
        ...p,
        quantity: parseInt(p.quantity, 10),
        price: parseFloat(p.price),
        savings: parseFloat(p.savings)
      })) : undefined,
      benefits: typeof editingProduct.benefits === 'string' 
        ? editingProduct.benefits.split(',').map((b: string) => b.trim()) 
        : editingProduct.benefits
    };

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    setEditingProduct(null);
    refreshProducts();
  };

  if (editingProduct) {
    return (
      <div className="bg-white border border-gray-200 p-6 rounded-2xl max-w-2xl">
        <h2 className="text-xl font-bold text-gray-900 mb-6">{editingProduct.id ? 'Izmjeni proizvod' : 'Dodaj novi proizvod'}</h2>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Naziv</label>
            <input required type="text" value={editingProduct.name || ''} onChange={e => setEditingProduct({...editingProduct, name: e.target.value})} className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-gray-900" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Cijena (KM)</label>
              <input required type="number" step="0.01" value={editingProduct.price || ''} onChange={e => setEditingProduct({...editingProduct, price: e.target.value})} className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-gray-900" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Kategorija</label>
              <input required type="text" value={editingProduct.category || ''} onChange={e => setEditingProduct({...editingProduct, category: e.target.value})} className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-gray-900" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Slika (Upload ili Link)</label>
            <div className="flex gap-4 items-center">
              <input 
                type="file" 
                accept="image/*"
                onChange={async (e) => {
                  if (e.target.files && e.target.files[0]) {
                    setIsUploading(true);
                    const formData = new FormData();
                    formData.append('image', e.target.files[0]);
                    try {
                      const res = await fetch('/api/upload', { method: 'POST', body: formData });
                      const data = await res.json();
                      if (data.url) {
                        setEditingProduct({...editingProduct, imageUrl: data.url});
                      }
                    } catch(err) {
                      console.error('Greška pri uploadu', err);
                    } finally {
                      setIsUploading(false);
                    }
                  }
                }}
                className="w-full max-w-xs bg-gray-50 text-gray-500 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-red-500 hover:file:bg-gray-200" 
              />
              <span className="text-gray-400 whitespace-nowrap">ili link:</span>
              <input type="url" value={editingProduct.imageUrl || ''} onChange={e => setEditingProduct({...editingProduct, imageUrl: e.target.value})} className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-gray-900" placeholder="https://..." />
            </div>
            {isUploading && <p className="text-red-600 mt-2 text-sm text-center font-medium">Učitavanje slike...</p>}
            {editingProduct.imageUrl && (
              <div className="mt-4 flex justify-center">
                <img src={editingProduct.imageUrl} alt="Pregled slika" className="h-32 object-contain rounded-lg border border-gray-200 bg-gray-50/50 p-2" />
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Kratki opis</label>
            <input required type="text" value={editingProduct.description || ''} onChange={e => setEditingProduct({...editingProduct, description: e.target.value})} className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-gray-900" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Dugi opis</label>
            <textarea required rows={4} value={editingProduct.longDescription || ''} onChange={e => setEditingProduct({...editingProduct, longDescription: e.target.value})} className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-gray-900"></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Prednosti (odvojene zarezom)</label>
            <input required type="text" value={Array.isArray(editingProduct.benefits) ? editingProduct.benefits.join(', ') : editingProduct.benefits || ''} onChange={e => setEditingProduct({...editingProduct, benefits: e.target.value})} className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-gray-900" />
          </div>

          <div className="border border-gray-200 p-4 rounded-lg bg-gray-50/50">
            <div className="flex justify-between items-center mb-4">
              <label className="block text-sm font-medium text-gray-900">Paketi popusta (opciono)</label>
              <button type="button" onClick={handleAddPackage} className="text-xs bg-gray-100 hover:bg-gray-200 text-red-500 px-3 py-1.5 rounded flex items-center gap-1"><Plus className="w-3 h-3" /> Dodaj paket</button>
            </div>
            
            <div className="space-y-3">
              {(editingProduct.packages || []).map((pkg: any, idx: number) => (
                <div key={idx} className="flex flex-wrap items-center gap-2 p-3 border border-gray-200 rounded bg-white">
                  <div className="flex-1 min-w-[120px]">
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest block mb-1">Labela</span>
                    <input type="text" value={pkg.label} onChange={e => handleUpdatePackage(idx, 'label', e.target.value)} className="w-full bg-gray-50 border border-gray-300 rounded px-2 py-1 text-sm text-gray-900" placeholder="npr. 2 Pakovanja" required />
                  </div>
                  <div className="w-20">
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest block mb-1">Kol.</span>
                    <input type="number" min="2" value={pkg.quantity} onChange={e => handleUpdatePackage(idx, 'quantity', e.target.value)} className="w-full bg-gray-50 border border-gray-300 rounded px-2 py-1 text-sm text-gray-900" required />
                  </div>
                  <div className="w-24">
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest block mb-1">Cijena</span>
                    <input type="number" step="0.01" value={pkg.price} onChange={e => handleUpdatePackage(idx, 'price', e.target.value)} className="w-full bg-gray-50 border border-gray-300 rounded px-2 py-1 text-sm text-gray-900" required />
                  </div>
                  <div className="w-24">
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest block mb-1">Ušteda</span>
                    <input type="number" step="0.01" value={pkg.savings} onChange={e => handleUpdatePackage(idx, 'savings', e.target.value)} className="w-full bg-gray-50 border border-gray-300 rounded px-2 py-1 text-sm text-gray-900" required />
                  </div>
                  <button type="button" onClick={() => handleRemovePackage(idx)} className="mt-4 p-1.5 text-gray-400 hover:text-red-400 bg-gray-100 rounded"><Trash className="w-4 h-4" /></button>
                </div>
              ))}
              {(!editingProduct.packages || editingProduct.packages.length === 0) && (
                <div className="text-sm text-gray-400 text-center py-2">Nema definisanih paketa.</div>
              )}
            </div>
          </div>

          <div className="border border-gray-200 p-4 rounded-lg bg-gray-50/50">
            <div className="flex justify-between items-center mb-4">
              <label className="block text-sm font-medium text-gray-900">Recenzije kupaca (opciono)</label>
              <button type="button" onClick={handleAddReview} className="text-xs bg-gray-100 hover:bg-gray-200 text-red-500 px-3 py-1.5 rounded flex items-center gap-1"><Plus className="w-3 h-3" /> Dodaj recenziju</button>
            </div>
            
            <div className="space-y-3">
              {(editingProduct.reviews || []).map((rev: any, idx: number) => (
                <div key={idx} className="flex gap-4 p-3 border border-gray-200 rounded bg-white relative">
                  <div className="flex-1 space-y-2">
                    <div className="flex gap-2">
                       <input type="text" value={rev.author} onChange={e => handleUpdateReview(idx, 'author', e.target.value)} className="w-1/2 bg-gray-50 border border-gray-300 rounded px-2 py-1 text-sm text-gray-900" placeholder="Ime kupca" required />
                       <input type="number" min="1" max="5" value={rev.rating} onChange={e => handleUpdateReview(idx, 'rating', Number(e.target.value))} className="w-20 bg-gray-50 border border-gray-300 rounded px-2 py-1 text-sm text-gray-900" placeholder="Ocjena" required />
                       <input type="date" value={rev.date.split('T')[0]} onChange={e => handleUpdateReview(idx, 'date', new Date(e.target.value).toISOString())} className="w-32 bg-gray-50 border border-gray-300 rounded px-2 py-1 text-sm text-gray-900" required />
                    </div>
                    <textarea value={rev.text} onChange={e => handleUpdateReview(idx, 'text', e.target.value)} className="w-full bg-gray-50 border border-gray-300 rounded px-2 py-1 text-sm text-gray-900" placeholder="Tekst recenzije..." required rows={2} />
                  </div>
                  <button type="button" onClick={() => handleRemoveReview(idx)} className="h-fit p-1.5 text-gray-400 hover:text-red-400 bg-gray-100 rounded shrink-0"><Trash className="w-4 h-4" /></button>
                </div>
              ))}
              {(!editingProduct.reviews || editingProduct.reviews.length === 0) && (
                <div className="text-sm text-gray-400 text-center py-2">Nema dodanih recenzija.</div>
              )}
            </div>
          </div>
          
          <div className="flex gap-4 pt-4 border-t border-gray-200">
            <button type="button" onClick={() => setEditingProduct(null)} className="px-6 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">Odustani</button>
            <button type="submit" className="px-6 py-2 rounded-lg bg-red-600 text-slate-950 font-bold hover:bg-red-500 transition-colors">Sačuvaj</button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Proizvodi</h1>
        <button 
          onClick={() => setEditingProduct({})}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-slate-950 px-4 py-2 rounded-lg font-bold transition-colors"
        >
          <Plus className="h-5 w-5" /> Dodaj Proizvod
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full text-left text-sm text-gray-500">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-6 py-4 font-semibold">Slika</th>
              <th className="px-6 py-4 font-semibold">Naziv</th>
              <th className="px-6 py-4 font-semibold">Kategorija</th>
              <th className="px-6 py-4 font-semibold">Cijena</th>
              <th className="px-6 py-4 font-semibold text-right">Akcije</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-100/50 transition-colors">
                <td className="px-6 py-4">
                  <img src={product.imageUrl} alt={product.name} className="w-12 h-12 object-cover rounded bg-gray-100" />
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">{product.name}</td>
                <td className="px-6 py-4"><span className="px-2 py-1 bg-gray-100 rounded text-xs">{product.category}</span></td>
                <td className="px-6 py-4 text-red-500 font-bold">{product.price.toFixed(2)} KM</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => setEditingProduct(product)} className="p-2 text-gray-500 hover:text-red-500 bg-gray-100 rounded"><Edit className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(product.id)} className="p-2 text-gray-500 hover:text-red-400 bg-gray-100 rounded"><Trash className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

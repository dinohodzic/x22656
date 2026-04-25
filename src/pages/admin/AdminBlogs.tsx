import React, { useState, useEffect } from 'react';
import { Edit, Trash, Plus } from 'lucide-react';

export function AdminBlogs() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [editingBlog, setEditingBlog] = useState<any>(null);
  const [isUploading, setIsUploading] = useState(false);

  const fetchBlogs = async () => {
    const res = await fetch('/api/blogs');
    const data = await res.json();
    setBlogs((data || []).sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Da li ste sigurni da želite obrisati ovaj blog?')) {
      await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
      fetchBlogs();
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const isNew = !editingBlog.id;
    const url = isNew ? '/api/blogs' : `/api/blogs/${editingBlog.id}`;
    const method = isNew ? 'POST' : 'PUT';

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editingBlog)
    });
    
    setEditingBlog(null);
    fetchBlogs();
  };

  if (editingBlog) {
    return (
      <div className="bg-white border border-gray-200 p-6 rounded-2xl max-w-4xl">
        <h2 className="text-xl font-bold text-gray-900 mb-6">{editingBlog.id ? 'Izmjeni blog' : 'Dodaj novi blog'}</h2>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Naslov</label>
            <input required type="text" value={editingBlog.title || ''} onChange={e => setEditingBlog({...editingBlog, title: e.target.value})} className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-gray-900" />
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
                        setEditingBlog({...editingBlog, imageUrl: data.url});
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
              <input type="url" value={editingBlog.imageUrl || ''} onChange={e => setEditingBlog({...editingBlog, imageUrl: e.target.value})} className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-gray-900" placeholder="https://..." />
            </div>
            {isUploading && <p className="text-red-500 mt-2 text-sm text-center font-medium">Učitavanje slike...</p>}
            {editingBlog.imageUrl && (
              <div className="mt-4 flex justify-center">
                <img src={editingBlog.imageUrl} alt="Pregled slika" className="h-32 object-contain rounded-lg border border-gray-200 bg-gray-50/50 p-2" />
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Kratki uvod (Summary)</label>
            <textarea required rows={2} value={editingBlog.summary || ''} onChange={e => setEditingBlog({...editingBlog, summary: e.target.value})} className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-gray-900"></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Sadržaj (HTML)</label>
            <textarea required rows={10} value={editingBlog.content || ''} onChange={e => setEditingBlog({...editingBlog, content: e.target.value})} className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-gray-900 font-mono text-sm"></textarea>
          </div>
          
          <div className="flex gap-4 pt-4 border-t border-gray-200">
            <button type="button" onClick={() => setEditingBlog(null)} className="px-6 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">Odustani</button>
            <button type="submit" className="px-6 py-2 rounded-lg bg-red-600 text-white font-bold hover:bg-red-500 transition-colors">Sačuvaj</button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Blogovi</h1>
        <button 
          onClick={() => setEditingBlog({})}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg font-bold transition-colors"
        >
          <Plus className="h-5 w-5" /> Dodaj Blog
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full text-left text-sm text-gray-500">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-6 py-4 font-semibold">Slika</th>
              <th className="px-6 py-4 font-semibold">Naslov</th>
              <th className="px-6 py-4 font-semibold">Datum</th>
              <th className="px-6 py-4 font-semibold text-right">Akcije</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {blogs.map((blog) => (
              <tr key={blog.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  {blog.imageUrl && <img src={blog.imageUrl} alt={blog.title} className="w-16 h-12 object-cover rounded bg-gray-100" />}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">{blog.title}</td>
                <td className="px-6 py-4">{new Date(blog.createdAt).toLocaleDateString('bs-BA')}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => setEditingBlog(blog)} className="p-2 text-gray-500 hover:text-red-500 bg-gray-100 rounded"><Edit className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(blog.id)} className="p-2 text-gray-500 hover:text-red-500 bg-gray-100 rounded"><Trash className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
            {blogs.length === 0 && (
              <tr><td colSpan={4} className="text-center py-6 text-gray-500">Nema dodanih blogova.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

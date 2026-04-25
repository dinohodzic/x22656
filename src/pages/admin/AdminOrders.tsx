import React, { useEffect, useState } from 'react';

export function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      setOrders(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      await fetch(`/api/orders/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      fetchOrders();
    } catch (e) {
      console.error(e);
    }
  };

  const statusColors: Record<string, string> = {
    novo: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    poslano: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    isporuceno: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    otkazano: 'bg-red-500/10 text-red-400 border-red-500/20',
  };

  if (loading) return <div>Učitavanje narudžbi...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Narudžbe</h1>
      
      {orders.length === 0 ? (
        <p className="text-gray-500">Nema evidentiranih narudžbi.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-4 border-b border-gray-200">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{order.name}</h3>
                  <p className="text-sm text-gray-500">{order.address}, {order.city} | {order.phone}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="text-xl font-bold text-red-500">{order.total.toFixed(2)} KM</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[order.status] || 'bg-gray-100 text-gray-600'}`}>
                    {order.status.toUpperCase()}
                  </span>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold mb-2 text-gray-600">Stavke:</h4>
                <ul className="space-y-1 mb-4">
                  {order.items.map((item: any, i: number) => (
                    <li key={i} className="text-sm text-gray-500 flex justify-between">
                      <span>{item.quantity}x {item.name}</span>
                      <span>{(item.quantity * item.price).toFixed(2)} KM</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-2">
                <select 
                  value={order.status}
                  onChange={(e) => updateStatus(order.id, e.target.value)}
                  className="bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-600 focus:outline-none focus:border-red-600 cursor-pointer"
                >
                  <option value="novo">Novo</option>
                  <option value="poslano">Poslano</option>
                  <option value="isporuceno">Isporučeno</option>
                  <option value="otkazano">Otkazano</option>
                </select>
                <div className="text-xs text-gray-400 self-center ml-auto">
                  Datum narudžbe: {new Date(order.createdAt).toLocaleString('bs-BA')}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

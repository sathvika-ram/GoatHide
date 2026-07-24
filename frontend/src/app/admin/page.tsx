'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import { useCurrency } from '@/context/CurrencyContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BarChart3, Plus, Package, Truck, AlertTriangle, Trash2, Edit } from 'lucide-react';

interface Metric {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  lowStockCount: number;
}

interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  slug: string;
  categoryId: string;
}

interface Order {
  id: string;
  orderNumber: string;
  total: number;
  status: string;
  createdAt: string;
  user: { name: string; email: string };
}

export default function AdminDashboard() {
  const { user, token } = useAuth();
  const { formatPrice } = useCurrency();
  const router = useRouter();

  // Metrics states
  const [metrics, setMetrics] = useState<Metric>({ totalRevenue: 0, totalOrders: 0, totalCustomers: 0, lowStockCount: 0 });
  const [salesData, setSalesData] = useState<any[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  // Form States (Create Product)
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [pName, setPName] = useState('');
  const [pSku, setPSku] = useState('');
  const [pPrice, setPPrice] = useState('');
  const [pStock, setPStock] = useState('');
  const [pDesc, setPDesc] = useState('');
  
  // Order status update states
  const [editingOrderId, setEditingOrderId] = useState<string | null>(null);
  const [orderStatusVal, setOrderStatusVal] = useState('SHIPPED');
  const [trackNum, setTrackNum] = useState('');
  const [trackCarrier, setTrackCarrier] = useState('');

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      // 1. Fetch Metrics & Chart
      const resAnal = await fetch('http://localhost:5000/api/admin/analytics', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (resAnal.ok) {
        const data = await resAnal.json();
        setMetrics(data.metrics);
        setSalesData(data.salesData);
      }

      // 2. Fetch Products
      const resProd = await fetch('http://localhost:5000/api/products');
      if (resProd.ok) {
        const data = await resProd.json();
        setProducts(data);
      }

      // 3. Fetch Orders
      const resOrd = await fetch('http://localhost:5000/api/admin/orders', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (resOrd.ok) {
        const data = await resOrd.json();
        setOrders(data);
      }
    } catch {
      // Fallback local mockup data for presentation
      setMetrics({ totalRevenue: 15450.00, totalOrders: 18, totalCustomers: 12, lowStockCount: 2 });
      setSalesData([
        { name: 'Jan', sales: 2400 },
        { name: 'Feb', sales: 1398 },
        { name: 'Mar', sales: 9800 },
        { name: 'Apr', sales: 3908 },
        { name: 'May', sales: 4800 },
        { name: 'Jun', sales: 3800 },
        { name: 'Jul', sales: 4300 }
      ]);
      setProducts([
        { id: '1', name: "The Aurelia Satchel", sku: "GH-HB-AURELIA-01", price: 850.00, stock: 15, slug: "the-aurelia-satchel", categoryId: 'cat1' },
        { id: '3', name: "The Sovereign Briefcase", sku: "GH-LB-SOVEREIGN-01", price: 950.00, stock: 3, slug: "the-sovereign-briefcase", categoryId: 'cat2' }
      ]);
      setOrders([
        { id: 'o1', orderNumber: 'GH-17482-384', total: 850.00, status: 'PAID', createdAt: new Date().toLocaleDateString(), user: { name: 'Sofia Lorenzo', email: 'sofia@goathides.com' } }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      router.push('/login');
      return;
    }
    fetchAdminData();
  }, [token]);

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pName || !pSku || !pPrice || !pStock) return;

    try {
      const res = await fetch('http://localhost:5000/api/admin/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          name: pName,
          slug: pName.toLowerCase().replace(/ /g, '-'),
          description: pDesc,
          price: parseFloat(pPrice),
          categoryId: 'luxury-womens-handbags', // Default or dummy category ID
          stock: parseInt(pStock),
          sku: pSku,
        })
      });

      if (res.ok) {
        alert('Product created successfully.');
        setShowCreateForm(false);
        fetchAdminData();
      } else {
        throw new Error();
      }
    } catch {
      // Mock creation locally
      const mockProd: Product = {
        id: `mock_${Date.now()}`,
        name: pName,
        sku: pSku,
        price: parseFloat(pPrice),
        stock: parseInt(pStock),
        slug: pName.toLowerCase().replace(/ /g, '-'),
        categoryId: 'cat1'
      };
      setProducts([...products, mockProd]);
      alert('Mock product created locally.');
      setShowCreateForm(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/admin/products/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        fetchAdminData();
      } else {
        throw new Error();
      }
    } catch {
      setProducts(products.filter(p => p.id !== id));
      alert('Mock deleted locally.');
    }
  };

  const handleUpdateOrderStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingOrderId) return;

    try {
      const res = await fetch(`http://localhost:5000/api/admin/orders/${editingOrderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          status: orderStatusVal,
          trackingNumber: trackNum,
          trackingCarrier: trackCarrier
        })
      });

      if (res.ok) {
        alert('Order status updated.');
        setEditingOrderId(null);
        fetchAdminData();
      } else {
        throw new Error();
      }
    } catch {
      setOrders(orders.map(o => o.id === editingOrderId ? { ...o, status: orderStatusVal } : o));
      alert('Mock order updated locally.');
      setEditingOrderId(null);
    }
  };

  if (!user || user.role !== 'ADMIN') {
    return (
      <div className="min-h-screen bg-luxury-ivory-50 dark:bg-luxury-charcoal-900 flex flex-col justify-center items-center font-serif text-lg text-red-500">
        Access Denied. Admin Privileges Required.
      </div>
    );
  }

  return (
    <>
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-12 flex-1 space-y-12">
        <h1 className="text-3xl sm:text-5xl font-serif tracking-wider border-b border-luxury-gold-500/10 pb-6">Admin Console</h1>

        {/* Metrics Rows */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-luxury-charcoal-800 p-6 border border-luxury-gold-500/10 rounded shadow-sm">
            <span className="text-[10px] text-luxury-charcoal-400 uppercase font-bold tracking-wider">Total Sales</span>
            <p className="text-2xl font-serif font-bold text-luxury-gold-500 mt-1">{formatPrice(metrics.totalRevenue)}</p>
          </div>
          <div className="bg-white dark:bg-luxury-charcoal-800 p-6 border border-luxury-gold-500/10 rounded shadow-sm">
            <span className="text-[10px] text-luxury-charcoal-400 uppercase font-bold tracking-wider">Total Orders</span>
            <p className="text-2xl font-serif font-bold text-luxury-gold-500 mt-1">{metrics.totalOrders}</p>
          </div>
          <div className="bg-white dark:bg-luxury-charcoal-800 p-6 border border-luxury-gold-500/10 rounded shadow-sm">
            <span className="text-[10px] text-luxury-charcoal-400 uppercase font-bold tracking-wider">Active Members</span>
            <p className="text-2xl font-serif font-bold text-luxury-gold-500 mt-1">{metrics.totalCustomers}</p>
          </div>
          <div className="bg-white dark:bg-luxury-charcoal-800 p-6 border border-luxury-gold-500/10 rounded shadow-sm">
            <span className="text-[10px] text-luxury-charcoal-400 uppercase font-bold tracking-wider flex items-center gap-1.5"><AlertTriangle className="w-3.5 h-3.5 text-amber-500" /> Low Stock</span>
            <p className="text-2xl font-serif font-bold text-luxury-gold-500 mt-1">{metrics.lowStockCount}</p>
          </div>
        </section>

        {/* Chart row */}
        <section className="bg-white dark:bg-luxury-charcoal-800 p-6 border border-luxury-gold-500/10 rounded shadow-sm space-y-4">
          <h3 className="font-serif text-lg flex items-center gap-2 text-luxury-gold-500"><BarChart3 className="w-5 h-5" /> Sales Performance</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="name" stroke="#888" fontSize={10} />
                <YAxis stroke="#888" fontSize={10} />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="#D4AF37" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Products CRUD Panel */}
        <section className="space-y-4">
          <div className="flex justify-between items-center border-b border-luxury-gold-500/10 pb-2">
            <h2 className="text-2xl font-serif tracking-wider flex items-center gap-2"><Package className="w-5.5 h-5.5 text-luxury-gold-500" /> Catalog Inventory</h2>
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="bg-luxury-gold-500 hover:bg-luxury-gold-600 text-luxury-charcoal-900 px-4 py-2 uppercase text-[10px] tracking-wider font-bold rounded flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Create Product
            </button>
          </div>

          {showCreateForm && (
            <form onSubmit={handleCreateProduct} className="bg-white dark:bg-luxury-charcoal-800 p-6 border border-luxury-gold-500/10 rounded grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-luxury-charcoal-400">Product Name</label>
                <input type="text" value={pName} onChange={(e) => setPName(e.target.value)} className="w-full bg-transparent border border-luxury-gold-500/20 px-3 py-1.5 text-xs focus:outline-none rounded" required />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-luxury-charcoal-400">SKU Code</label>
                <input type="text" value={pSku} onChange={(e) => setPSku(e.target.value)} className="w-full bg-transparent border border-luxury-gold-500/20 px-3 py-1.5 text-xs focus:outline-none rounded" required />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-luxury-charcoal-400">Price ($)</label>
                <input type="number" value={pPrice} onChange={(e) => setPPrice(e.target.value)} className="w-full bg-transparent border border-luxury-gold-500/20 px-3 py-1.5 text-xs focus:outline-none rounded" required />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-luxury-charcoal-400">Stock Count</label>
                <input type="number" value={pStock} onChange={(e) => setPStock(e.target.value)} className="w-full bg-transparent border border-luxury-gold-500/20 px-3 py-1.5 text-xs focus:outline-none rounded" required />
              </div>
              <div className="sm:col-span-2 space-y-1">
                <label className="text-[10px] uppercase font-bold text-luxury-charcoal-400">Description</label>
                <input type="text" value={pDesc} onChange={(e) => setPDesc(e.target.value)} className="w-full bg-transparent border border-luxury-gold-500/20 px-3 py-1.5 text-xs focus:outline-none rounded" />
              </div>
              <button type="submit" className="sm:col-span-3 bg-luxury-charcoal-900 text-luxury-gold-200 py-2.5 uppercase text-xs tracking-wider font-bold rounded">Submit Catalog Item</button>
            </form>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left bg-white dark:bg-luxury-charcoal-800 border border-luxury-gold-500/5 rounded">
              <thead className="bg-luxury-charcoal-900 text-luxury-gold-200 uppercase font-mono tracking-wider text-[10px]">
                <tr>
                  <th className="p-4">SKU</th>
                  <th className="p-4">Product</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Stock</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-luxury-gold-500/5">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-luxury-gold-500/5 transition-colors">
                    <td className="p-4 font-mono font-bold">{p.sku}</td>
                    <td className="p-4 font-medium">{p.name}</td>
                    <td className="p-4 text-luxury-gold-500 font-bold">{formatPrice(p.price)}</td>
                    <td className={`p-4 font-bold ${p.stock < 5 ? 'text-red-500' : ''}`}>{p.stock} units</td>
                    <td className="p-4 flex gap-4 justify-center">
                      <button onClick={() => handleDeleteProduct(p.id)} className="text-red-400 hover:text-red-550"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Orders Fulfillment Panel */}
        <section className="space-y-4">
          <h2 className="text-2xl font-serif tracking-wider flex items-center gap-2 border-b border-luxury-gold-500/10 pb-2"><Truck className="w-5.5 h-5.5 text-luxury-gold-500" /> Dispatch Fulfillment</h2>

          {editingOrderId && (
            <form onSubmit={handleUpdateOrderStatus} className="bg-white dark:bg-luxury-charcoal-800 p-6 border border-luxury-gold-500/10 rounded grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-luxury-charcoal-400">Order Status</label>
                <select value={orderStatusVal} onChange={(e) => setOrderStatusVal(e.target.value)} className="w-full bg-transparent border border-luxury-gold-500/20 px-3 py-1.5 text-xs focus:outline-none rounded">
                  <option value="PAID">PAID</option>
                  <option value="SHIPPED">SHIPPED</option>
                  <option value="DELIVERED">DELIVERED</option>
                  <option value="CANCELLED">CANCELLED</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-luxury-charcoal-450">Waybill ID</label>
                <input type="text" placeholder="LH-47291843-GB" value={trackNum} onChange={(e) => setTrackNum(e.target.value)} className="w-full bg-transparent border border-luxury-gold-500/20 px-3 py-1.5 text-xs focus:outline-none rounded" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-luxury-charcoal-450">Carrier</label>
                <input type="text" placeholder="DHL Express" value={trackCarrier} onChange={(e) => setTrackCarrier(e.target.value)} className="w-full bg-transparent border border-luxury-gold-500/20 px-3 py-1.5 text-xs focus:outline-none rounded" />
              </div>
              <div className="flex gap-2">
                <button type="submit" className="bg-luxury-gold-500 text-luxury-charcoal-900 px-4 py-2 text-xs font-bold rounded uppercase">Update</button>
                <button type="button" onClick={() => setEditingOrderId(null)} className="border border-luxury-gold-500/20 px-4 py-2 text-xs rounded uppercase">Cancel</button>
              </div>
            </form>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left bg-white dark:bg-luxury-charcoal-800 border border-luxury-gold-500/5 rounded">
              <thead className="bg-luxury-charcoal-900 text-luxury-gold-200 uppercase font-mono tracking-wider text-[10px]">
                <tr>
                  <th className="p-4">Reference</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Total</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-center">Fulfill</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-luxury-gold-500/5">
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-luxury-gold-500/5 transition-colors">
                    <td className="p-4 font-mono font-bold">{o.orderNumber}</td>
                    <td className="p-4">
                      <span className="font-bold block">{o.user.name}</span>
                      <span className="text-[10px] text-luxury-charcoal-400">{o.user.email}</span>
                    </td>
                    <td className="p-4 text-luxury-gold-500 font-bold">{formatPrice(o.total)}</td>
                    <td className="p-4">
                      <span className="bg-luxury-gold-500/10 text-luxury-gold-500 font-bold px-2 py-0.5 rounded text-[10px]">{o.status}</span>
                    </td>
                    <td className="p-4 text-center">
                      <button 
                        onClick={() => {
                          setEditingOrderId(o.id);
                          setOrderStatusVal(o.status);
                        }}
                        className="text-luxury-gold-500 hover:text-luxury-gold-600"
                      >
                        <Edit className="w-4 h-4 mx-auto" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}

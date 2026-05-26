import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { getAllProducts, deleteProduct } from '../../services/productApi';
import type { Product } from '../../services/productApi';
import toast from 'react-hot-toast';

const tabs = ['ALL PRODUCTS', 'PUBLISHED', 'DRAFT', 'HIDDEN'];

export default function Products() {
  const [activeTab, setActiveTab] = useState('ALL PRODUCTS');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getAllProducts();
      setProducts(data);
    } catch (error) {
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await deleteProduct(id);
      toast.success('Product deleted');
      fetchProducts();
    } catch (error) {
      toast.error('Failed to delete product');
    }
  };

  const getStatusDot = (status: string) => {
    if (status === 'published') return 'bg-green-500';
    if (status === 'draft') return 'bg-gray-400';
    return 'bg-yellow-500';
  };

  const getStatusLabel = (status: string, stock: number) => {
    if (status === 'published' && stock > 5) return `In Stock (${stock})`;
    if (status === 'published' && stock <= 5) return `Low Stock (${stock})`;
    return 'Draft';
  };

  const filteredProducts = products
    .filter(p => {
      if (activeTab === 'ALL PRODUCTS') return true;
      if (activeTab === 'PUBLISHED') return p.status === 'published';
      if (activeTab === 'DRAFT') return p.status === 'draft';
      if (activeTab === 'HIDDEN') return !p.isActive;
      return true;
    })
    .sort((a, b) => {
      if (sortOrder === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });

  return (
    <DashboardLayout>
      <div>

        {/* HEADER */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-1">Products</h1>
            <p className="text-sm text-gray-500">Manage your artisanal collection.</p>
          </div>
          <button
            onClick={() => navigate('/dashboard/products/add')}
            className="flex items-center gap-2 bg-[#8B2635] text-white text-sm font-medium px-4 py-2.5 rounded-md hover:bg-[#7a1f2d] transition-colors cursor-pointer"
          >
            + ADD PRODUCT
          </button>
        </div>

        {/* TABS + SORT */}
        <div className="flex items-center justify-between mb-4 border-b border-gray-200">
          <div className="flex items-center">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 pb-3 text-xs font-semibold tracking-wide transition-colors cursor-pointer ${
                  activeTab === tab
                    ? 'text-[#8B2635] border-b-2 border-[#8B2635]'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <button
            onClick={() => setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest')}
            className="flex items-center gap-2 text-xs text-gray-500 border border-gray-200 rounded-md px-3 py-1.5 hover:bg-gray-50 cursor-pointer mb-3"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
            Sort by: {sortOrder === 'newest' ? 'Newest' : 'Oldest'}
          </button>
        </div>

        {/* TABLE */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">

          {/* TABLE HEADER */}
          <div className="grid grid-cols-[1fr_150px_120px_80px] px-6 py-3 bg-gray-50 border-b border-gray-200">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Product</span>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</span>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Price</span>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Actions</span>
          </div>

          {/* LOADING */}
          {loading && (
            <div className="px-6 py-8 text-center text-sm text-gray-400">
              Loading products...
            </div>
          )}

          {/* EMPTY */}
          {!loading && filteredProducts.length === 0 && (
            <div className="px-6 py-8 text-center text-sm text-gray-400">
              No products found
            </div>
          )}

          {/* TABLE ROWS */}
          {!loading && filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className={`grid grid-cols-[1fr_150px_120px_80px] px-6 py-4 items-center ${
                index !== filteredProducts.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              {/* PRODUCT */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-md bg-gray-100 overflow-hidden flex items-center justify-center flex-shrink-0">
                  {product.imageUrl ? (
                    <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover" />
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5">
                      <rect x="3" y="3" width="18" height="18" rx="2"/>
                      <circle cx="8.5" cy="8.5" r="1.5"/>
                      <path d="M21 15l-5-5L5 21"/>
                    </svg>
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{product.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">SKU: {product.sku || '--'}</p>
                </div>
              </div>

              {/* STATUS */}
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <div className={`w-1.5 h-1.5 rounded-full ${getStatusDot(product.status)}`} />
                  <span className="text-xs text-gray-600">
                    {getStatusLabel(product.status, product.stock)}
                  </span>
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-gray-100 text-gray-600">
                  {product.isActive ? 'PUBLIC' : 'HIDDEN'}
                </span>
              </div>

              {/* PRICE */}
              <span className="text-sm text-gray-900 font-medium">
                {product.price ? `$${product.price.toFixed(2)}` : '--'}
              </span>

              {/* ACTIONS */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate(`/dashboard/products/edit/${product.id}`)}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="text-gray-400 hover:text-red-500 cursor-pointer"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <polyline points="3 6 5 6 21 6"/>
                    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                    <path d="M10 11v6M14 11v6"/>
                    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* PAGINATION */}
        <div className="flex items-center justify-between mt-4">
          <span className="text-xs text-gray-500">
            Showing {filteredProducts.length} products
          </span>
          <div className="flex items-center gap-2">
            <button className="text-sm text-gray-600 border border-gray-200 rounded px-3 py-1.5 hover:bg-gray-50 cursor-pointer">
              Previous
            </button>
            <button className="text-sm text-gray-600 border border-gray-200 rounded px-3 py-1.5 hover:bg-gray-50 cursor-pointer">
              Next
            </button>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
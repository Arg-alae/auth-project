import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/dashboard/DashboardLayout';

const products = [
  { id: 1, name: 'Alabaster Vessel No. 4', sku: 'ALB-004-WHT', image: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=100&h=100&fit=crop', status: 'In Stock', stock: 12, badge: 'PUBLIC', dotColor: 'bg-green-500', price: '$245.00' },
  { id: 2, name: 'Woven Linen Throw - Sand', sku: 'LNN-THW-SND', image: 'https://images.unsplash.com/photo-1631125915902-d8abe9225ff2?w=100&h=100&fit=crop', status: 'Low Stock', stock: 2, badge: 'PUBLIC', dotColor: 'bg-yellow-500', price: '$180.00' },
  { id: 3, name: 'Oak Dining Chair', sku: 'OAK-CHR-01', image: null, status: 'Draft', stock: null, badge: 'HIDDEN', dotColor: 'bg-gray-400', price: '--' },
];

const tabs = ['ALL PRODUCTS', 'PUBLISHED', 'DRAFT', 'HIDDEN'];

export default function Products() {
  const [activeTab, setActiveTab] = useState('ALL PRODUCTS');
  const navigate = useNavigate();

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
          <button className="flex items-center gap-2 text-xs text-gray-500 border border-gray-200 rounded-md px-3 py-1.5 hover:bg-gray-50 cursor-pointer mb-3">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
            Sort by: Newest
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

          {/* TABLE ROWS */}
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`grid grid-cols-[1fr_150px_120px_80px] px-6 py-4 items-center ${
                index !== products.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              {/* PRODUCT */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-md bg-gray-100 overflow-hidden flex items-center justify-center flex-shrink-0">
                  {product.image ? (
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5">
                      <rect x="3" y="3" width="18" height="18" rx="2"/>
                      <circle cx="8.5" cy="8.5" r="1.5"/>
                      <path d="M21 15l-5-5L5 21"/>
                    </svg>
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{product.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">SKU: {product.sku}</p>
                </div>
              </div>

              {/* STATUS */}
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <div className={`w-1.5 h-1.5 rounded-full ${product.dotColor}`} />
                  <span className="text-xs text-gray-600">
                    {product.status}{product.stock ? ` (${product.stock})` : ''}
                  </span>
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-gray-100 text-gray-600">
                  {product.badge}
                </span>
              </div>

              {/* PRICE */}
              <span className="text-sm text-gray-900 font-medium">{product.price}</span>

              {/* ACTIONS */}
              <button className="text-gray-400 hover:text-gray-600 cursor-pointer">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="5" r="1.5"/>
                  <circle cx="12" cy="12" r="1.5"/>
                  <circle cx="12" cy="19" r="1.5"/>
                </svg>
              </button>
            </div>
          ))}
        </div>

        {/* PAGINATION */}
        <div className="flex items-center justify-between mt-4">
          <span className="text-xs text-gray-500">Showing 1 to 3 of 24 products</span>
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
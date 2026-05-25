import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/dashboard/DashboardLayout';

export default function AddProduct() {
  const navigate = useNavigate();
  const [status, setStatus] = useState('Active');
  const [name, setName] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [fullDesc, setFullDesc] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [pageTitle, setPageTitle] = useState('');
  const [metaDesc, setMetaDesc] = useState('');
  const [weight, setWeight] = useState('0.0');

  return (
    <DashboardLayout>
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
        <span className="hover:text-gray-600 cursor-pointer" onClick={() => navigate('/dashboard')}>Dashboard</span>
        <span>/</span>
        <span className="hover:text-gray-600 cursor-pointer" onClick={() => navigate('/dashboard/products')}>Products</span>
        <span>/</span>
        <span className="text-gray-600">Add Product</span>
      </div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Add Product</h1>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/dashboard/products')} className="text-sm text-gray-500 px-4 py-2 rounded-md border border-gray-200 hover:bg-gray-50 cursor-pointer">Discard</button>
          <button className="text-sm text-gray-600 px-4 py-2 rounded-md border border-gray-200 hover:bg-gray-50 cursor-pointer">Save Draft</button>
          <button className="text-sm text-white bg-[#8B2635] px-4 py-2 rounded-md hover:bg-[#7a1f2d] cursor-pointer">Publish Product</button>
        </div>
      </div>
      <div className="flex gap-6">
        <div className="flex-1 flex flex-col gap-5">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-5">Information</h2>
            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Product Name</label>
              <input type="text" placeholder="e.g. Minimalist Ceramic Vase" value={name} onChange={e => setName(e.target.value)} className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:border-gray-400 placeholder:text-gray-300" />
            </div>
            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Short Description</label>
              <textarea placeholder="Brief summary of the product..." value={shortDesc} onChange={e => setShortDesc(e.target.value)} rows={3} className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm outline-none focus:border-gray-400 placeholder:text-gray-300 resize-none" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Full Description</label>
              <div className="flex items-center gap-2 border border-gray-200 rounded-t-md px-3 py-2 bg-gray-50 border-b-0">
                {['B', 'I', 'U', 'S'].map(btn => (
                  <button key={btn} className="w-6 h-6 flex items-center justify-center text-sm text-gray-500 hover:bg-gray-200 rounded cursor-pointer">{btn}</button>
                ))}
              </div>
              <textarea placeholder="Detailed product narrative..." value={fullDesc} onChange={e => setFullDesc(e.target.value)} rows={6} className="w-full border border-gray-200 rounded-b-md px-3 py-2 text-sm outline-none focus:border-gray-400 placeholder:text-gray-300 resize-none" />
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-semibold text-gray-900">Media</h2>
              <button className="text-xs text-[#8B2635] hover:underline cursor-pointer">Add URL</button>
            </div>
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center mb-4 hover:border-gray-300 cursor-pointer">
              <div className="flex justify-center mb-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              </div>
              <p className="text-sm text-gray-500 mb-1">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-400">SVG, PNG, JPG or GIF (max. 10MB)</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-md bg-gray-100 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=100&h=100&fit=crop" alt="product" className="w-full h-full object-cover" />
              </div>
              <button className="w-16 h-16 rounded-md border-2 border-dashed border-gray-200 flex items-center justify-center hover:border-gray-300 cursor-pointer">
                <span className="text-gray-400 text-xl">+</span>
              </button>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-5">Pricing</h2>
            <div className="flex items-center border border-gray-200 rounded-md overflow-hidden focus-within:border-gray-400">
              <span className="px-3 py-2 text-sm text-gray-500 bg-gray-50 border-r border-gray-200">$</span>
              <input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="0.00" className="flex-1 px-3 py-2 text-sm outline-none" />
            </div>
            <label className="flex items-center gap-2 mt-3 cursor-pointer">
              <input type="checkbox" className="w-3.5 h-3.5 accent-[#8B2635]" />
              <span className="text-xs text-gray-500">Charge tax on this product</span>
            </label>
          </div>
        </div>
        <div className="w-64 flex flex-col gap-5">
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Product Status</h3>
            {['Active', 'Draft', 'Archived'].map(s => (
              <label key={s} className="flex items-center gap-2.5 cursor-pointer mb-2">
                <input type="radio" name="status" value={s} checked={status === s} onChange={() => setStatus(s)} className="accent-[#8B2635]" />
                <span className={'text-sm ' + (status === s ? 'text-[#8B2635] font-medium' : 'text-gray-600')}>{s}</span>
              </label>
            ))}
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Product Organization</h3>
            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Category</label>
              <select value={category} onChange={e => setCategory(e.target.value)} className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-600 outline-none">
                <option value="">Select Category</option>
                <option value="ceramics">Ceramics</option>
                <option value="textiles">Textiles</option>
                <option value="furniture">Furniture</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Tags</label>
              <input type="text" placeholder="e.g. Minimal, Handcrafted" value={tags} onChange={e => setTags(e.target.value)} className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm outline-none placeholder:text-gray-300" />
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Search Engine Optimization</h3>
            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Page Title</label>
              <input type="text" placeholder="Title for search engines" value={pageTitle} onChange={e => setPageTitle(e.target.value)} className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm outline-none placeholder:text-gray-300" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Meta Description</label>
              <textarea placeholder="Description for search engines..." value={metaDesc} onChange={e => setMetaDesc(e.target.value)} rows={3} className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm outline-none placeholder:text-gray-300 resize-none" />
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Shipping</h3>
            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Weight (kg)</label>
              <input type="number" value={weight} onChange={e => setWeight(e.target.value)} className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm outline-none" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Customs Information (HS Code)</label>
              <input type="text" placeholder="Search by product type..." className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm outline-none placeholder:text-gray-300" />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

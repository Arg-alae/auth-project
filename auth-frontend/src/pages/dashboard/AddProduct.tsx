import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { createProduct, getProduct, updateProduct } from '../../services/productApi';
import toast from 'react-hot-toast';

const ALLOWED_TYPES = ['image/svg+xml', 'image/png', 'image/jpeg', 'image/gif'];
const ALLOWED_EXTENSIONS = ['svg', 'png', 'jpg', 'jpeg', 'gif'];

export default function AddProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);
  const [status, setStatus] = useState('draft');
  const [isActive, setIsActive] = useState(false);
  const [name, setName] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [fullDesc, setFullDesc] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [localImages, setLocalImages] = useState<string[]>([]);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [sku, setSku] = useState('');
  const [stock, setStock] = useState('0');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [weight, setWeight] = useState('0.0');
  const [pageTitle, setPageTitle] = useState('');
  const [metaDesc, setMetaDesc] = useState('');
  const [errors, setErrors] = useState<{ name?: string; shortDesc?: string; price?: string; imageUrl?: string; media?: string }>({});
  const [touched, setTouched] = useState<{ name?: boolean; shortDesc?: boolean; price?: boolean; media?: boolean }>({});

  useEffect(() => {
    if (!isEdit) return;
    const fetchProduct = async () => {
      try {
        const product = await getProduct(Number(id));
        setName(product.title);
        setShortDesc(product.description);
        setPrice(product.price?.toString() || '');
        setLocalImages(product.images || []);
        setSku(product.sku || '');
        setStock(product.stock?.toString() || '0');
        setStatus(product.status);
        setIsActive(product.isActive);
        setCategory(product.category || '');
        setTags(product.tags?.join(', ') || '');
        setWeight(product.weight?.toString() || '0.0');
      } catch (error) {
        toast.error('Failed to load product');
        navigate('/dashboard/products');
      } finally {
        setFetching(false);
      }
    };
    fetchProduct();
  }, [id]);

  const validate = () => {
    const newErrors: { name?: string; shortDesc?: string; price?: string; imageUrl?: string; media?: string } = {};
    if (!name.trim()) newErrors.name = 'Product name is required';
    else if (name.trim().length < 3) newErrors.name = 'Product name must be at least 3 characters';
    if (!shortDesc.trim()) newErrors.shortDesc = 'Short description is required';
    else if (shortDesc.trim().length < 10) newErrors.shortDesc = 'Description must be at least 10 characters';
    if (!price) newErrors.price = 'Price is required';
    else if (parseFloat(price) < 0) newErrors.price = 'Price cannot be negative';
    if (localImages.length === 0) newErrors.media = 'At least one image is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const invalidFiles = files.filter(file => !ALLOWED_TYPES.includes(file.type));
    if (invalidFiles.length > 0) {
      toast.error('Only SVG, PNG, JPG/JPEG and GIF files are allowed');
      e.target.value = '';
      return;
    }
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setLocalImages(prev => [...prev, ev.target?.result as string]);
        setErrors(prev => ({ ...prev, media: undefined }));
      };
      reader.readAsDataURL(file);
    });
  };

  const handleAddImageUrl = () => {
    if (!imageUrl) return;
    const ext = imageUrl.split('.').pop()?.toLowerCase();
    if (!ext || !ALLOWED_EXTENSIONS.includes(ext)) {
      setErrors(prev => ({ ...prev, imageUrl: 'Only SVG, PNG, JPG/JPEG and GIF URLs are allowed' }));
      return;
    }
    setErrors(prev => ({ ...prev, imageUrl: undefined, media: undefined }));
    setLocalImages(prev => [...prev, imageUrl]);
    setImageUrl('');
    setShowUrlInput(false);
  };

  const handleSubmit = async (submitStatus: string) => {
    setTouched({ name: true, shortDesc: true, price: true, media: true });
    if (!validate()) {
      toast.error('Please fix the errors before saving');
      return;
    }
    try {
      setLoading(true);
      const data = {
        title: name,
        description: shortDesc || fullDesc,
        price: price ? parseFloat(price) : undefined,
        imageUrl: localImages[0] || undefined,
        images: localImages,
        sku: sku || undefined,
        stock: stock ? parseInt(stock) : 0,
        status: submitStatus,
        isActive: submitStatus === 'published',
        category: category || undefined,
        tags: tags ? tags.split(',').map(t => t.trim()) : [],
        weight: weight ? parseFloat(weight) : undefined,
      };

      if (isEdit) {
        await updateProduct(Number(id), data);
        toast.success('Product updated successfully!');
      } else {
        await createProduct(data);
        toast.success(submitStatus === 'published' ? 'Product published!' : 'Product saved as draft!');
      }
      navigate('/dashboard/products');
    } catch (error) {
      toast.error(isEdit ? 'Failed to update product' : 'Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-400 text-sm">Loading product...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      {/* BREADCRUMB */}
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
        <span className="hover:text-gray-600 cursor-pointer" onClick={() => navigate('/dashboard')}>Dashboard</span>
        <span>/</span>
        <span className="hover:text-gray-600 cursor-pointer" onClick={() => navigate('/dashboard/products')}>Products</span>
        <span>/</span>
        <span className="text-gray-600">{isEdit ? 'Edit Product' : 'Add Product'}</span>
      </div>

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          {isEdit ? 'Edit Product' : 'Add Product'}
        </h1>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/dashboard/products')}
            className="text-sm text-gray-500 px-4 py-2 rounded-md border border-gray-200 hover:bg-gray-50 cursor-pointer"
            disabled={loading}
          >
            Discard
          </button>
          <button
            onClick={() => handleSubmit('draft')}
            className="text-sm text-gray-600 px-4 py-2 rounded-md border border-gray-200 hover:bg-gray-50 cursor-pointer"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Draft'}
          </button>
          <button
            onClick={() => handleSubmit('published')}
            className="text-sm text-white bg-[#8B2635] px-4 py-2 rounded-md hover:bg-[#7a1f2d] cursor-pointer"
            disabled={loading}
          >
            {loading ? 'Saving...' : isEdit ? 'Update Product' : 'Publish Product'}
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex gap-6">

        {/* LEFT COLUMN */}
        <div className="flex-1 flex flex-col gap-5">

          {/* INFORMATION */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-5">Information</h2>

            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-600 mb-1.5">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Minimalist Ceramic Vase"
                value={name}
                onChange={e => { setName(e.target.value); setErrors(prev => ({ ...prev, name: undefined })); }}
                onBlur={() => {
                  setTouched(prev => ({ ...prev, name: true }));
                  if (!name.trim()) setErrors(prev => ({ ...prev, name: 'Product name is required' }));
                  else if (name.trim().length < 3) setErrors(prev => ({ ...prev, name: 'Product name must be at least 3 characters' }));
                }}
                className={`w-full border rounded-md px-3 py-2 text-sm outline-none placeholder:text-gray-300 ${errors.name && touched.name ? 'border-red-400' : 'border-gray-200 focus:border-gray-400'}`}
              />
              {errors.name && touched.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-600 mb-1.5">
                Short Description <span className="text-red-500">*</span>
              </label>
              <textarea
                placeholder="Brief summary of the product..."
                value={shortDesc}
                onChange={e => { setShortDesc(e.target.value); setErrors(prev => ({ ...prev, shortDesc: undefined })); }}
                onBlur={() => {
                  setTouched(prev => ({ ...prev, shortDesc: true }));
                  if (!shortDesc.trim()) setErrors(prev => ({ ...prev, shortDesc: 'Short description is required' }));
                  else if (shortDesc.trim().length < 10) setErrors(prev => ({ ...prev, shortDesc: 'Description must be at least 10 characters' }));
                }}
                rows={3}
                className={`w-full border rounded-md px-3 py-2 text-sm outline-none placeholder:text-gray-300 resize-none ${errors.shortDesc && touched.shortDesc ? 'border-red-400' : 'border-gray-200 focus:border-gray-400'}`}
              />
              {errors.shortDesc && touched.shortDesc && <p className="text-xs text-red-500 mt-1">{errors.shortDesc}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Full Description</label>
              <div className="flex items-center gap-2 border border-gray-200 rounded-t-md px-3 py-2 bg-gray-50 border-b-0">
                {['B', 'I', 'U', 'S'].map(btn => (
                  <button key={btn} className="w-6 h-6 flex items-center justify-center text-sm text-gray-500 hover:bg-gray-200 rounded cursor-pointer font-medium">
                    {btn}
                  </button>
                ))}
              </div>
              <textarea
                placeholder="Detailed product narrative..."
                value={fullDesc}
                onChange={e => setFullDesc(e.target.value)}
                rows={6}
                className="w-full border border-gray-200 rounded-b-md px-3 py-2 text-sm outline-none focus:border-gray-400 placeholder:text-gray-300 resize-none"
              />
            </div>
          </div>

          {/* MEDIA */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-semibold text-gray-900">
                Media <span className="text-red-500">*</span>
              </h2>
              <button
                onClick={() => setShowUrlInput(!showUrlInput)}
                className="text-xs text-[#8B2635] hover:underline cursor-pointer"
              >
                Add URL
              </button>
            </div>

            <div
              className={`border border-dashed rounded-lg p-8 text-center mb-4 hover:border-gray-300 transition-colors cursor-pointer bg-gray-50 ${errors.media && touched.media ? 'border-red-400' : 'border-gray-200'}`}
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              <input
                id="file-upload"
                type="file"
                multiple
                accept=".svg,.png,.jpg,.jpeg,.gif"
                className="hidden"
                onChange={handleFileUpload}
              />
              <div className="flex justify-center mb-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="17 8 12 3 7 8"/>
                  <line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
              </div>
              <p className="text-sm text-gray-500 mb-1">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-400">SVG, PNG, JPG or GIF (max. 10MB)</p>
            </div>

            {errors.media && touched.media && (
              <p className="text-xs text-red-500 mb-3">{errors.media}</p>
            )}

            {showUrlInput && (
              <div className="mb-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="https://..."
                    value={imageUrl}
                    onChange={e => { setImageUrl(e.target.value); setErrors(prev => ({ ...prev, imageUrl: undefined })); }}
                    className={`flex-1 border rounded-md px-3 py-2 text-sm outline-none placeholder:text-gray-300 ${errors.imageUrl ? 'border-red-400' : 'border-gray-200 focus:border-gray-400'}`}
                  />
                  <button
                    onClick={handleAddImageUrl}
                    className="px-3 py-2 bg-[#8B2635] text-white text-sm rounded-md hover:bg-[#7a1f2d] cursor-pointer"
                  >
                    Add
                  </button>
                </div>
                {errors.imageUrl && <p className="text-xs text-red-500 mt-1">{errors.imageUrl}</p>}
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              {localImages.map((img, index) => (
                <div key={index} className="relative w-20 h-20 rounded-lg bg-gray-100 overflow-hidden group border border-gray-200">
                  <img src={img} alt={`preview-${index}`} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      onClick={() => setLocalImages(prev => prev.filter((_, i) => i !== index))}
                      className="w-7 h-7 bg-white rounded-full flex items-center justify-center hover:bg-red-50 transition-colors cursor-pointer"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
              <button
                onClick={() => document.getElementById('file-upload')?.click()}
                className="w-20 h-20 rounded-lg border border-dashed border-gray-200 flex items-center justify-center hover:border-gray-300 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <span className="text-gray-400 text-2xl">+</span>
              </button>
            </div>
          </div>

          {/* PRICING */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-5">Pricing</h2>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">
                Price <span className="text-red-500">*</span>
              </label>
              <div className={`flex items-center border rounded-md overflow-hidden ${errors.price && touched.price ? 'border-red-400' : 'border-gray-200 focus-within:border-gray-400'}`}>
                <span className="px-3 py-2 text-sm text-gray-500 bg-gray-50 border-r border-gray-200">$</span>
                <input
                  type="number"
                  value={price}
                  onChange={e => { setPrice(e.target.value); setErrors(prev => ({ ...prev, price: undefined })); }}
                  onBlur={() => {
                    setTouched(prev => ({ ...prev, price: true }));
                    if (!price) setErrors(prev => ({ ...prev, price: 'Price is required' }));
                    else if (parseFloat(price) < 0) setErrors(prev => ({ ...prev, price: 'Price cannot be negative' }));
                  }}
                  placeholder="0.00"
                  min="0"
                  className="flex-1 px-3 py-2 text-sm outline-none"
                />
              </div>
              {errors.price && touched.price && <p className="text-xs text-red-500 mt-1">{errors.price}</p>}
              <label className="flex items-center gap-2 mt-3 cursor-pointer">
                <input type="checkbox" className="w-3.5 h-3.5 accent-[#8B2635]" />
                <span className="text-xs text-gray-500">Charge tax on this product</span>
              </label>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN */}
        <div className="w-64 flex flex-col gap-5">

          {/* PRODUCT STATUS */}
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Product Status</h3>
            {['published', 'draft', 'archived'].map(s => (
              <label key={s} className="flex items-center gap-2.5 cursor-pointer mb-2">
                <input
                  type="radio"
                  name="status"
                  value={s}
                  checked={status === s}
                  onChange={() => setStatus(s)}
                  className="accent-[#8B2635]"
                />
                <span className={`text-sm capitalize ${status === s ? 'text-[#8B2635] font-medium' : 'text-gray-600'}`}>
                  {s === 'published' ? 'Active' : s.charAt(0).toUpperCase() + s.slice(1)}
                </span>
              </label>
            ))}
            <div className="mt-3 pt-3 border-t border-gray-100">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={e => setIsActive(e.target.checked)}
                  className="w-3.5 h-3.5 accent-[#8B2635]"
                />
                <span className="text-xs text-gray-600">Visible on landing page</span>
              </label>
            </div>
          </div>

          {/* PRODUCT ORGANIZATION */}
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Product Organization</h3>
            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Category</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-600 outline-none"
              >
                <option value="">Select Category</option>
                <option value="ceramics">Ceramics</option>
                <option value="textiles">Textiles</option>
                <option value="furniture">Furniture</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Tags</label>
              <input
                type="text"
                placeholder="Minimal, Handcrafted"
                value={tags}
                onChange={e => setTags(e.target.value)}
                className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm outline-none placeholder:text-gray-300"
              />
              <p className="text-xs text-gray-400 mt-1">Separate with commas</p>
            </div>
          </div>

          {/* SEO */}
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Search Engine Optimization</h3>
            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Page Title</label>
              <input
                type="text"
                placeholder="Title for search engines"
                value={pageTitle}
                onChange={e => setPageTitle(e.target.value)}
                className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm outline-none placeholder:text-gray-300"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Meta Description</label>
              <textarea
                placeholder="Description for search engines..."
                value={metaDesc}
                onChange={e => setMetaDesc(e.target.value)}
                rows={3}
                className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm outline-none placeholder:text-gray-300 resize-none"
              />
            </div>
          </div>

          {/* SHIPPING */}
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Shipping</h3>
            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Weight (kg)</label>
              <input
                type="number"
                value={weight}
                onChange={e => setWeight(e.target.value)}
                className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Customs Information</label>
              <input
                type="text"
                placeholder="Search by product type..."
                className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm outline-none placeholder:text-gray-300"
              />
            </div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { uploadImage, createProduct } from '../api/api';

export default function AdminAddProduct() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('10');
  const [file, setFile] = useState(null);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select an image file first.");
      return;
    }
    setError('');
    setLoading(true);

    try {
      // 1. Upload the image
      const uploadRes = await uploadImage(file);
      const imageUrl = uploadRes.data.image_url;

      // 2. Create the product
      const productData = {
        name,
        description,
        price: parseFloat(price),
        stock: parseInt(stock, 10),
        image_url: imageUrl
      };
      
      const prodRes = await createProduct(productData);
      
      // Navigate to the new product page
      navigate(`/products/${prodRes.data.id}`);
      
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to create product or upload image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <Link to="/products" className="inline-block mb-6 text-text-muted hover:text-white">&larr; Back to Products</Link>
      
      <div className="glass rounded-3xl p-8 border border-border">
        <h1 className="text-2xl font-bold text-white mb-6">Add New Product</h1>
        
        {error && (
          <div className="p-3 bg-danger/10 text-danger border border-danger/20 rounded-xl mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-text-muted mb-2">Product Name</label>
            <input type="text" required value={name} onChange={(e) => setName(e.target.value)} 
                   className="w-full bg-surface-light border border-border rounded-xl p-3 text-white focus:outline-none focus:border-primary" />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-muted mb-2">Description</label>
            <textarea required rows="3" value={description} onChange={(e) => setDescription(e.target.value)} 
                      className="w-full bg-surface-light border border-border rounded-xl p-3 text-white focus:outline-none focus:border-primary" />
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-text-muted mb-2">Price ($)</label>
              <input type="number" step="0.01" min="0" required value={price} onChange={(e) => setPrice(e.target.value)} 
                     className="w-full bg-surface-light border border-border rounded-xl p-3 text-white focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-muted mb-2">Stock count</label>
              <input type="number" min="0" required value={stock} onChange={(e) => setStock(e.target.value)} 
                     className="w-full bg-surface-light border border-border rounded-xl p-3 text-white focus:outline-none focus:border-primary" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-muted mb-2">Product Image File</label>
            <input type="file" required accept="image/*" onChange={handleFileChange} 
                   className="w-full text-text-muted file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
          </div>
          
          <button type="submit" disabled={loading} 
                  className="w-full py-4 text-center bg-primary hover:bg-primary-dark text-white font-bold rounded-xl transition-all hover:shadow-lg disabled:opacity-50">
            {loading ? "Uploading & Saving..." : "Create Product"}
          </button>
        </form>
      </div>
    </div>
  );
}

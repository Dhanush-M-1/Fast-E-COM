import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProduct } from '../api/api';
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    getProduct(id)
      .then((res) => setProduct(res.data))
      .catch((err) => setError("Product not found."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center py-32">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-light"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Product Not Found</h2>
        <Link to="/products" className="text-primary-light hover:underline">← Back to Products</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
      <Link to="/products" className="inline-flex items-center text-text-muted hover:text-white mb-8 transition-colors">
        <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-surface-card p-6 md:p-10 rounded-3xl border border-border">
        {/* Image */}
        <div className="bg-surface-light rounded-2xl aspect-square overflow-hidden flex items-center justify-center border border-border/50">
          {product.image_url ? (
            <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
          ) : (
            <div className="text-9xl opacity-20">📦</div>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{product.name}</h1>
          <p className="text-4xl font-extrabold text-accent mb-6">${product.price.toFixed(2)}</p>
          
          <div className="prose prose-invert border-t border-border pt-6 mb-8">
            <h3 className="text-lg font-medium text-white mb-2">Description</h3>
            <p className="text-text-muted leading-relaxed">
              {product.description || "No description available."}
            </p>
          </div>

          <div className="mb-8">
            <span className="text-sm font-medium text-text-muted">Availability: </span>
            {product.stock > 0 ? (
              <span className="text-sm font-bold text-success">In Stock ({product.stock})</span>
            ) : (
              <span className="text-sm font-bold text-danger">Out of Stock</span>
            )}
          </div>

          <button
            onClick={() => addToCart(product)}
            disabled={product.stock === 0}
            className={`py-4 rounded-xl text-lg font-bold transition-all ${
              product.stock > 0 
                ? "bg-primary hover:bg-primary-dark text-white hover:shadow-lg hover:shadow-primary/30 active:scale-[0.98]" 
                : "bg-surface-light text-text-muted cursor-not-allowed"
            }`}
          >
            {product.stock > 0 ? "Add to Cart" : "Sold Out"}
          </button>
        </div>
      </div>
    </div>
  );
}

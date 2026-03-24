import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="glass rounded-2xl overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
      {/* Image */}
      <Link to={`/products/${product.id}`}>
        <div className="aspect-square bg-surface-light overflow-hidden">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-6xl opacity-30">
              📦
            </div>
          )}
        </div>
      </Link>

      {/* Info */}
      <div className="p-4 space-y-3">
        <Link to={`/products/${product.id}`}>
          <h3 className="font-semibold text-lg text-text hover:text-primary-light transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>

        {product.description && (
          <p className="text-text-muted text-sm line-clamp-2">{product.description}</p>
        )}

        <div className="flex items-center justify-between pt-2">
          <span className="text-xl font-bold text-accent">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={() => addToCart(product)}
            className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-dark text-white text-sm font-medium
                       hover:shadow-lg hover:shadow-primary/25 active:scale-95 transition-all cursor-pointer"
          >
            Add to Cart
          </button>
        </div>

        {product.stock !== undefined && product.stock <= 5 && product.stock > 0 && (
          <p className="text-xs text-accent">Only {product.stock} left in stock!</p>
        )}
        {product.stock === 0 && (
          <p className="text-xs text-danger">Out of stock</p>
        )}
      </div>
    </div>
  );
}

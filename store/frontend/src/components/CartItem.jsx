import { useCart } from '../context/CartContext';

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="glass rounded-xl p-4 flex items-center gap-4">
      {/* Image */}
      <div className="w-20 h-20 rounded-lg bg-surface-light overflow-hidden flex-shrink-0">
        {item.image_url ? (
          <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-3xl opacity-30">📦</div>
        )}
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-text truncate">{item.name}</h3>
        <p className="text-accent font-bold">${item.price.toFixed(2)}</p>
      </div>

      {/* Quantity controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          className="w-8 h-8 rounded-lg bg-surface-light hover:bg-border text-text flex items-center justify-center
                     transition-colors cursor-pointer"
        >
          −
        </button>
        <span className="w-8 text-center font-medium">{item.quantity}</span>
        <button
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          className="w-8 h-8 rounded-lg bg-surface-light hover:bg-border text-text flex items-center justify-center
                     transition-colors cursor-pointer"
        >
          +
        </button>
      </div>

      {/* Line total */}
      <div className="text-right w-20 flex-shrink-0">
        <p className="font-bold text-text">${(item.price * item.quantity).toFixed(2)}</p>
      </div>

      {/* Remove */}
      <button
        onClick={() => removeFromCart(item.id)}
        className="text-text-muted hover:text-danger transition-colors cursor-pointer"
        title="Remove"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  );
}

import { Link } from 'react-router-dom';

export default function CheckoutSuccess() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
        <svg className="w-12 h-12 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      
      <h1 className="text-4xl font-bold text-white mb-4">Order Received!</h1>
      <p className="text-xl text-text-muted mb-8">
        Thank you for shopping at Fast-E-COM. Your order has been placed successfully.
      </p>
      
      <div className="bg-surface-light border border-primary/30 p-8 rounded-2xl inline-block text-left mb-8 shadow-xl">
        <h3 className="text-lg font-bold text-white mb-2">💳 Payment Instructions (Cash on Delivery)</h3>
        <p className="text-text-muted text-sm leading-relaxed">
          Your order currently has the status <strong>Pending</strong>.
          <br /><br />
          Please prepare cash or be ready to transfer securely upon delivery/pickup of your items.
          Once payment is confirmed by our administrators, your order status will be physically updated to paid and shipped!
        </p>
      </div>
      
      <div>
        <Link to="/products" className="px-8 py-3 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl transition-all inline-block hover:shadow-lg hover:-translate-y-1">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

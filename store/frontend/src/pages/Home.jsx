import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProducts } from '../api/api';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then((res) => setFeatured(res.data.slice(0, 4)))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="glass rounded-3xl p-8 md:p-16 text-center max-w-5xl mx-auto mt-8 border border-primary/20 bg-primary/5 shadow-2xl shadow-primary/10">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight text-white">
          The Future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-accent">E-Commerce</span>
        </h1>
        <p className="text-lg md:text-xl text-text-muted mb-8 max-w-2xl mx-auto">
          Experience blazing fast shopping with our modern FastAPI & React stack. 
          Discover premium products with instant performance.
        </p>
        <Link 
          to="/products"
          className="inline-block px-8 py-4 rounded-full bg-primary hover:bg-primary-dark text-white font-bold text-lg hover:shadow-lg hover:scale-105 transition-all outline-none"
        >
          Shop Now
        </Link>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Featured Products</h2>
            <p className="text-text-muted">Handpicked favorites just for you.</p>
          </div>
          <Link to="/products" className="text-primary-light hover:text-white font-medium mb-1 transition-colors">
            View All →
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-light"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </section>
    </div>
  );
}

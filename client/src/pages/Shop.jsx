import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { CATEGORIES } from '../constants/categories';
import '../styles/product.css';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || 'all';

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const url = activeCategory === 'all' ? '/api/products' : `/api/products?category=${activeCategory}`;
        const res = await fetch(url);
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [activeCategory]);

  const handleCategoryClick = (value) => {
    if (value === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category: value });
    }
  };

  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="shop-container">
      <h2>All Products</h2>

      <div className="category-nav">
        <button
          className={`category-chip ${activeCategory === 'all' ? 'active' : ''}`}
          onClick={() => handleCategoryClick('all')}
        >
          All
        </button>
        {CATEGORIES.map(c => (
          <button
            key={c.value}
            className={`category-chip ${activeCategory === c.value ? 'active' : ''}`}
            onClick={() => handleCategoryClick(c.value)}
          >
            {c.label}
          </button>
        ))}
      </div>

      <input 
        type="text" 
        placeholder="Search products..." 
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />
      {loading ? (
        <div>Loading...</div>
      ) : filteredProducts.length === 0 ? (
        <div style={{ color: '#a3a3a3', padding: '40px 0' }}>No products found in this collection yet.</div>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Shop;
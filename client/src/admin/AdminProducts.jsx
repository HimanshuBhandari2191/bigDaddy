import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const AdminProducts = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you strictly sure you want to delete this?')) {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${user.token}` }
      });
      if (res.ok) {
        setProducts(products.filter(p => p._id !== id));
      }
    }
  };

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ color: '#e5e5e5' }}>Manage Products</h2>
        <Link to="/admin/add-product" className="btn">+ Add Product</Link>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={tableStyle}>
          <thead>
            <tr style={rowStyle}>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>NAME</th>
              <th style={thStyle}>CATEGORY</th>
              <th style={thStyle}>PRICE</th>
              <th style={thStyle}>BADGE</th>
              <th style={thStyle}>SIZE</th>
              <th style={thStyle}>STOCK</th>
              <th style={thStyle}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product._id} style={rowStyle}>
                <td style={tdStyle}>{product._id.substring(0, 8)}...</td>
                <td style={tdStyle}>{product.name}</td>
                <td style={{...tdStyle, textTransform: 'capitalize'}}>{product.category || '-'}</td>
                <td style={tdStyle}>
                  ₹{product.price.toFixed(2)}
                  {product.originalPrice > product.price && (
                    <span style={{ color: '#6b6b6b', textDecoration: 'line-through', marginLeft: '8px', fontSize: '0.85rem' }}>₹{product.originalPrice}</span>
                  )}
                </td>
                <td style={tdStyle}>{product.badge || '-'}</td>
                <td style={tdStyle}>{product.size}</td>
                <td style={tdStyle}>{product.stock}</td>
                <td style={tdStyle}>
                  <Link to={`/admin/edit-product/${product._id}`} style={editBtn}>Edit</Link>
                  <button onClick={() => handleDelete(product._id)} style={deleteBtn}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const containerStyle = { maxWidth: '1200px', margin: '40px auto', padding: '30px', background: '#18181b', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', color: '#f5f5f5' };
const tableStyle = { width: '100%', borderCollapse: 'collapse' };
const rowStyle = { borderBottom: '1px solid rgba(255,255,255,0.1)' };
const thStyle = { padding: '15px', textAlign: 'left', color: '#a3a3a3', fontSize: '0.9rem' };
const tdStyle = { padding: '15px', textAlign: 'left' };
const editBtn = { background: 'transparent', color: '#f5f5f5', padding: '6px 12px', borderRadius: '4px', marginRight: '10px', border: '1px solid rgba(255,255,255,0.25)', display: 'inline-block' };
const deleteBtn = { background: '#f5f5f5', color: '#0a0a0a', padding: '6px 12px', borderRadius: '4px', border: 'none', cursor: 'pointer', fontWeight: '600' };

export default AdminProducts;
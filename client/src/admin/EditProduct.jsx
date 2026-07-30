import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useParams, useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../constants/categories';

const EditProduct = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({ name: '', description: '', price: '', size: '', stock: '', category: 'other', originalPrice: '', badge: '' });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`/api/products/${id}`);
      const data = await res.json();
      setFormData({
        name: data.name, description: data.description, price: data.price, size: data.size, stock: data.stock,
        category: data.category || 'other', originalPrice: data.originalPrice || '', badge: data.badge || ''
      });
    };
    fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('size', formData.size);
    data.append('stock', formData.stock);
    data.append('category', formData.category);
    data.append('originalPrice', formData.originalPrice);
    data.append('badge', formData.badge);
    if (image) data.append('image', image);

    const res = await fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${user.token}` },
      body: data
    });
    setLoading(false);
    if (res.ok) {
      alert('Product updated successfully!');
      navigate('/admin/products');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', background: '#18181b', padding: '40px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
      <h2 style={{ color: '#e5e5e5', marginBottom: '20px' }}>Edit Product</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input type="text" placeholder="Product Name" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} style={inputStyle} />
        <textarea placeholder="Description" required rows="4" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} style={inputStyle} />
        <input type="number" placeholder="Price" required value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} style={inputStyle} />
        <input type="text" placeholder="size" required value={formData.size} onChange={(e) => setFormData({...formData, size: e.target.value})} style={inputStyle} />
        <input type="number" placeholder="Stock" required value={formData.stock} onChange={(e) => setFormData({...formData, stock: e.target.value})} style={inputStyle} />

        <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} style={inputStyle}>
          {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
        </select>

        <div style={{ display: 'flex', gap: '15px' }}>
          <input type="number" placeholder="Original Price (optional)" value={formData.originalPrice} onChange={(e) => setFormData({...formData, originalPrice: e.target.value})} style={{...inputStyle, flex: 1}} />
          <input type="text" placeholder="Badge (e.g. NEW, B1G1)" value={formData.badge} onChange={(e) => setFormData({...formData, badge: e.target.value})} style={{...inputStyle, flex: 1}} />
        </div>

        <div style={{ padding: '15px', border: '1px dashed #e5e5e5', borderRadius: '8px' }}>
          <label style={{ display: 'block', marginBottom: '10px', color: '#a3a3a3' }}>Replace Image (Optional)</label>
          <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} style={{ color: '#fff' }} />
        </div>
        <button type="submit" disabled={loading} className="btn" style={{ marginTop: '10px' }}>
          {loading ? 'Updating...' : 'Update Product'}
        </button>
      </form>
    </div>
  );
};

const inputStyle = { padding: '12px', background: '#0a0a0a', border: '1px solid #27272a', borderRadius: '6px', color: '#fff', fontSize: '15px', outline: 'none' };
export default EditProduct;
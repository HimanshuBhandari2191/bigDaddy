import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const STATUS_OPTIONS = ['pending', 'reviewed', 'quoted', 'completed', 'declined'];

const AdminCustomOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('/api/custom-orders', {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        const data = await res.json();
        setOrders(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user]);

  const updateOrder = async (id, updates) => {
    const res = await fetch(`/api/custom-orders/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user.token}` },
      body: JSON.stringify(updates)
    });
    if (res.ok) {
      const updated = await res.json();
      setOrders(orders.map(o => o._id === id ? updated : o));
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ marginBottom: '20px' }}>Custom Tattoo Requests</h2>

      {loading ? (
        <p style={{ color: '#a3a3a3' }}>Loading requests...</p>
      ) : orders.length === 0 ? (
        <p style={{ color: '#a3a3a3' }}>No custom tattoo requests yet.</p>
      ) : (
        <div style={{ display: 'grid', gap: '20px' }}>
          {orders.map(order => (
            <div key={order._id} style={cardStyle}>
              <img src={order.referenceImageUrl} alt="Reference design" style={{ width: '140px', height: '140px', objectFit: 'cover', borderRadius: '8px' }} />

              <div style={{ flex: 1, minWidth: '220px' }}>
                <p><strong>{order.userId?.name || 'Deleted User'}</strong> <span style={{ color: '#a3a3a3' }}>({order.userId?.email})</span></p>
                <p style={{ color: '#a3a3a3', fontSize: '0.9rem', marginTop: '6px' }}>Placement: {order.placement} • Size: {order.size}</p>
                <p style={{ color: '#a3a3a3', fontSize: '0.9rem' }}>Phone: {order.contactPhone}</p>
                {order.notes && <p style={{ color: '#a3a3a3', fontSize: '0.9rem', marginTop: '6px' }}>Notes: {order.notes}</p>}
                <p style={{ color: '#6b6b6b', fontSize: '0.8rem', marginTop: '6px' }}>Requested {new Date(order.createdAt).toLocaleDateString()}</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', minWidth: '200px' }}>
                <select
                  value={order.status}
                  onChange={(e) => updateOrder(order._id, { status: e.target.value })}
                  style={selectStyle}
                >
                  {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                </select>

                <input
                  type="number"
                  placeholder="Quoted Price (₹)"
                  defaultValue={order.quotedPrice || ''}
                  onBlur={(e) => {
                    if (e.target.value !== '' && Number(e.target.value) !== order.quotedPrice) {
                      updateOrder(order._id, { quotedPrice: e.target.value });
                    }
                  }}
                  style={selectStyle}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const containerStyle = { maxWidth: '1100px', margin: '40px auto', padding: '30px', background: '#18181b', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', color: '#f5f5f5' };
const cardStyle = { display: 'flex', gap: '20px', flexWrap: 'wrap', background: '#0a0a0a', padding: '20px', borderRadius: '12px', border: '1px solid #27272a', alignItems: 'flex-start' };
const selectStyle = { padding: '10px', background: '#18181b', color: '#fff', border: '1px solid #27272a', borderRadius: '6px', outline: 'none', fontFamily: 'inherit' };

export default AdminCustomOrders;

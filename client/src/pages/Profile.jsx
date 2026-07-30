import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [customOrders, setCustomOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    const fetchMyOrders = async () => {
      try {
        const res = await fetch('/api/orders/myorders', {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        const data = await res.json();
        if (res.ok) {
          setOrders(Array.isArray(data) ? data : []);
        } else {
          // Token obsolete or 401: clear and bounce
          if (res.status === 401) {
             logout();
             navigate('/login');
          }
          setOrders([]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    const fetchMyCustomOrders = async () => {
      try {
        const res = await fetch('/api/custom-orders/mine', {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        const data = await res.json();
        setCustomOrders(res.ok && Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMyOrders();
    fetchMyCustomOrders();
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const containerStyle = { maxWidth: '1000px', margin: '40px auto', padding: '30px', background: '#18181b', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', color: '#f5f5f5' };
  const badgeStyle = { background: 'rgba(255, 255, 255, 0.1)', color: '#e5e5e5', padding: '6px 12px', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 'bold', display: 'inline-block' };

  if (!user) return null;

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '30px', marginBottom: '30px' }}>
        <div>
          <h2 style={{ color: '#fff', fontSize: '2.2rem', marginBottom: '10px' }}>My Profile</h2>
          <p style={{ color: '#a3a3a3', fontSize: '1.2rem', marginBottom: '5px' }}><strong>Name:</strong> {user.name}</p>
          <p style={{ color: '#a3a3a3', fontSize: '1.2rem', marginBottom: '15px' }}><strong>Email:</strong> {user.email}</p>
          <span style={badgeStyle}>Account Type: {user.role.toUpperCase()}</span>
        </div>
        <button onClick={handleLogout} style={{ background: 'transparent', color: '#f5f5f5', border: '1px solid rgba(255,255,255,0.25)', padding: '12px 24px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>Logout</button>
      </div>

      <h3 style={{ color: '#e5e5e5', marginBottom: '20px', fontSize: '1.5rem' }}>Order History</h3>
      {loading ? (
        <p style={{ color: '#a3a3a3' }}>Fetching your orders...</p>
      ) : orders.length === 0 ? (
        <div style={{ background: '#0a0a0a', padding: '30px', borderRadius: '8px', textAlign: 'center', border: '1px solid #27272a' }}>
          <p style={{ color: '#a3a3a3', marginBottom: '15px' }}>You haven't placed any orders yet.</p>
          <Link to="/shop" className="btn">Start Shopping</Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '20px' }}>
          {orders.map(order => (
            <div key={order._id} style={{ background: '#0a0a0a', padding: '20px', borderRadius: '12px', border: '1px solid #27272a', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
              <div>
                <p style={{ color: '#a3a3a3', fontSize: '0.9rem', marginBottom: '5px' }}>Order ID: <span style={{ color: '#fff' }}>{order._id}</span></p>
                <p style={{ color: '#a3a3a3', fontSize: '0.9rem', marginBottom: '5px' }}>Placed On: <span style={{ color: '#fff' }}>{new Date(order.createdAt).toLocaleDateString()}</span></p>
                <p style={{ color: '#a3a3a3', fontSize: '0.9rem' }}>Total: <strong style={{ color: '#f5f5f5' }}>₹{order.totalAmount.toFixed(2)}</strong></p>
              </div>
              <div>
                <span style={{ 
                  background: order.status === 'delivered' ? '#f5f5f5' : 'transparent', 
                  color: order.status === 'delivered' ? '#0a0a0a' : '#f5f5f5',
                  border: order.status === 'delivered' ? 'none' : order.status === 'shipped' ? '1px solid #f5f5f5' : '1px dashed rgba(255,255,255,0.4)',
                  padding: '8px 16px', borderRadius: '20px', fontWeight: 'bold' 
                }}>
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {customOrders.length > 0 && (
        <>
          <h3 style={{ color: '#e5e5e5', margin: '40px 0 20px 0', fontSize: '1.5rem' }}>Custom Tattoo Requests</h3>
          <div style={{ display: 'grid', gap: '20px' }}>
            {customOrders.map(order => (
              <div key={order._id} style={{ background: '#0a0a0a', padding: '20px', borderRadius: '12px', border: '1px solid #27272a', display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'center' }}>
                <img src={order.referenceImageUrl} alt="Your design" style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '8px' }} />
                <div style={{ flex: 1, minWidth: '180px' }}>
                  <p style={{ color: '#a3a3a3', fontSize: '0.9rem' }}>Placement: <span style={{ color: '#fff' }}>{order.placement}</span> • Size: <span style={{ color: '#fff' }}>{order.size}</span></p>
                  <p style={{ color: '#a3a3a3', fontSize: '0.9rem' }}>Requested: {new Date(order.createdAt).toLocaleDateString()}</p>
                  {order.quotedPrice && <p style={{ color: '#f5f5f5', fontSize: '0.9rem', fontWeight: '600' }}>Quoted: ₹{order.quotedPrice}</p>}
                </div>
                <span style={{
                  background: order.status === 'completed' ? '#f5f5f5' : 'transparent',
                  color: order.status === 'completed' ? '#0a0a0a' : '#f5f5f5',
                  border: order.status === 'completed' ? 'none' : '1px solid rgba(255,255,255,0.3)',
                  padding: '8px 16px', borderRadius: '20px', fontWeight: 'bold', textTransform: 'capitalize'
                }}>
                  {order.status}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
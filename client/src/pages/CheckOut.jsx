import React, { useState, useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { clearCart } from '../redux/cartSlice';

const Checkout = () => {
  const { user } = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [address, setAddress] = useState({
    fullName: '', street: '', city: '', postalCode: '', country: ''
  });

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  const totalPrice = (Array.isArray(cartItems) ? cartItems : []).reduce((acc, item) => acc + item.price * item.qty, 0);

  const handlePayment = async () => {
    try {
      setLoading(true);
      console.log('Starting payment process...');
      
      // Since Razorpay keys are not configured, directly use bypass payment
      console.log('Using bypass payment mode');
      await bypassPayment();
    } catch (error) {
      console.error('Payment error:', error);
      setLoading(false);
    }
  };

  const bypassPayment = async () => {
    try {
      setLoading(true);
      const saveOrderRes = await fetch('/api/orders', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify({
          items: cartItems,
          totalAmount: totalPrice,
          address,
          paymentId: 'bypass_txn_' + Date.now()
        })
      });
      
      if (!saveOrderRes.ok) {
        const errorData = await saveOrderRes.json();
        console.error('Order creation failed:', errorData);
        alert('Order creation failed: ' + (errorData.message || 'Unknown error'));
        setLoading(false);
        return;
      }

      const orderData = await saveOrderRes.json();
      console.log('Order created:', orderData);
      dispatch(clearCart());
      navigate('/ordersuccess');
    } catch (err) {
      console.error('Bypass payment error:', err);
      alert('Order creation failed: ' + err.message);
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please login first");
      navigate('/login');
      return;
    }
    if (!address.fullName || !address.street || !address.city || !address.postalCode || !address.country) {
      alert("Please fill all address fields");
      return;
    }
    handlePayment();
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <div className="checkout-content">
        <form onSubmit={handleSubmit} className="shipping-form">
          <h3>Shipping Address</h3>
          <input type="text" placeholder="Full Name" required value={address.fullName} onChange={(e) => setAddress({...address, fullName: e.target.value})} />
          <input type="text" placeholder="Street" required value={address.street} onChange={(e) => setAddress({...address, street: e.target.value})} />
          <input type="text" placeholder="City" required value={address.city} onChange={(e) => setAddress({...address, city: e.target.value})} />
          <input type="text" placeholder="Postal Code" required value={address.postalCode} onChange={(e) => setAddress({...address, postalCode: e.target.value})} />
          <input type="text" placeholder="Country" required value={address.country} onChange={(e) => setAddress({...address, country: e.target.value})} />
          <div className="checkout-summary">
            <h4>Total to Pay: ₹{totalPrice.toFixed(2)}</h4>
            <button type="submit" className="btn" disabled={loading}>{loading ? 'Processing...' : 'Pay Now'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
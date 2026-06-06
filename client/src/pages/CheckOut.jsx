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
    fullName: '', street: '', city: '', postalCode: '', country: '', phone: '' 
  });

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  const totalPrice = (Array.isArray(cartItems) ? cartItems : []).reduce((acc, item) => acc + item.price * item.qty, 0);
  console.log("Total Price:", totalPrice);
  const handlePayment = async () => {
  const res = await fetch("/api/payment/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
    body: JSON.stringify({
      amount: totalPrice,
      items: cartItems,
      address,
    }),
  });

  const order = await res.json();

  const options = {
    key: "rzp_test_SxZc3gTVYcFWw3",
    amount: order.amount,
    currency: "INR",
    order_id: order.id,

    handler: async function (response) {
  try {
    // ✅ Save order (this will reduce stock in backend)
    const orderRes = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        items: cartItems,
        totalAmount: totalPrice,
        address,
        paymentId: response.razorpay_payment_id,
      }),
    });

    console.log("Order API status:", orderRes.status);
    const data = await orderRes.json();
    console.log("Order API response:", data);

    if (!orderRes.ok) {
      alert(data.message || "Order failed");
      return;
    }

    // ✅ Clear cart
    dispatch(clearCart());

    // ✅ Redirect
    navigate("/ordersuccess");

  } catch (err) {
    console.error(err);
    alert("Something went wrong");
  }
},
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please login first");
      navigate('/login');
      return;
    }
    if (!address.fullName || !address.street || !address.city || !address.postalCode || !address.country ||
  !address.phone) {
      alert("Please fill all address fields");
      return;
    }
    if (!/^[6-9]\d{9}$/.test(address.phone)) {
      alert("Invalid phone number");
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
          <input type="text" placeholder="Phone Number" required value={address.phone} onChange={(e) => setAddress({...address, phone: e.target.value})} />
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
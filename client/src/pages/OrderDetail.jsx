import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const OrderDetail = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(`/api/orders/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });

        const data = await res.json();
        setOrder(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchOrder();
  }, [id, user]);

  if (!order) {
    return <div style={{ color: "#e5e5e5", textAlign: "center", marginTop: "100px" }}>Loading Order...</div>;
  }

  return (
    <div style={{ maxWidth: "900px", margin: "40px auto", padding: "20px", color: "#fff" }}>
      
      {/* ORDER CARD */}
      <div style={{ background: "#18181b", padding: "25px", borderRadius: "10px" }}>
        
        <h2 style={{ color: "#e5e5e5" }}>
          Order ID: {order._id}
        </h2>

        <p><strong>Status:</strong> {order.status}</p>
        <p><strong>Total:</strong> ₹{order.totalAmount}</p>

        <h3 style={{ marginTop: "20px" }}>Shipping Details</h3>
        <p>{order.address.fullName}</p>
        <p>{order.address.street}, {order.address.city}</p>
        <p>{order.address.postalCode}, {order.address.country}</p>
        <p>📞 {order.address.phone}</p>

        <h3 style={{ marginTop: "20px" }}>Items</h3>

        {order.items.map((item, index) => (
          <div key={index} style={{ borderBottom: "1px solid #333", padding: "10px 0" }}>
            <p>Product ID: {item.productId}</p>
            <p>Qty: {item.qty}</p>
            <p>Price: ₹{item.price}</p>
          </div>
        ))}

      </div>
    </div>
  );
};

export default OrderDetail;
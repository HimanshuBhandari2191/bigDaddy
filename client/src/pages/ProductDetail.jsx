// import React, { useEffect, useState } from "react";
// import "../styles/product.css";
// import { useParams } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { Link } from "react-router-dom";
// import { addToCart } from "../redux/cartSlice";

// const ProductDetail = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const res = await fetch(`/api/products/${id}`);
//         const data = await res.json();
//         setProduct(data);
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProduct();
//   }, [id]);

//   const handleAddToCart = () => {
//     if (product) {
//       dispatch(
//         addToCart({
//           productId: product._id,
//           name: product.name,
//           price: product.price,
//           imageUrl: product.imageUrl,
//           qty: 1,
//         }),
//       );
//       alert("Successfully added to your cart!");
//     }
//   };

//   if (loading) {
//     return (
//       <div style={{ textAlign: "center", margin: "100px", color: "#e5e5e5" }}>
//         loading Products...
//       </div>
//     );
//   }
//   if (!product) {
//     return (
//       <div style={{ textAlign: "center", margin: "100px", color: "#a3a3a3" }}>
//         Product not found
//       </div>
//     );
//   }

//   return (
//     <div
//       className="product-detail-wrapper"
//       style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}
//     >
//       {/* Breadcrumb Navigation */}
//       <div
//         style={{
//           color: "#a3a3a3",
//           marginBottom: "20px",
//           fontSize: "0.95rem",
//         }}
//       >
//         <Link to="/" style={{ color: "#e5e5e5" }}>
//           Home
//         </Link>

//         {" / "}

//         <Link to="/shop" style={{ color: "#e5e5e5" }}>
//           Shop
//         </Link>

//         {" / "}

//         {product.category}

//         {" / "}

//         <span style={{ color: "#fff" }}>{product.name}</span>
//       </div>

//       <div className="product-detail">
//         {/* Left Side: Image */}
//         <div className="detail-image-container">
//           <img
//             src={product.imageUrl}
//             alt={product.name}
//             className="detail-image"
//           />
//         </div>

//         {/* Right Side: Information Block */}
//         <div className="detail-info">
//           <h2
//             style={{
//               fontSize: "2.8rem",
//               marginBottom: "10px",
//             }}
//           >
//             {product.name}
//           </h2>

//           <p
//             className="detail-price"
//             style={{
//               fontSize: "2.5rem",
//               margin: "15px 0",
//             }}
//           >
//             ₹{product.price.toFixed(2)}
//           </p>

//           {/* Description */}
//           <div style={{ marginBottom: "25px" }}>
//             <h4
//               style={{
//                 color: "#fff",
//                 marginBottom: "10px",
//               }}
//             >
//               Product Description
//             </h4>

//             <p
//               style={{
//                 color: "#a3a3a3",
//                 lineHeight: "1.8",
//               }}
//             >
//               {product.description}
//             </p>
//           </div>

//           {/* Cart & Stock Actions */}
//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               gap: "20px",
//             }}
//           >
//             <button
//               onClick={handleAddToCart}
//               className="btn"
//               style={{
//                 flexGrow: "1",
//                 padding: "18px",
//                 fontSize: "1.2rem",
//               }}
//             >
//               Add to Shopping Cart
//             </button>
//           </div>

//           <p
//             style={{
//               marginTop: "20px",
//               color: product.stock > 0 ? "#f5f5f5" : "#a3a3a3",
//               fontWeight: "600",
//             }}
//           >
//             {product.stock > 0
//               ? `• In Stock (${product.stock} units available)`
//               : "• Temporarily Out of Stock"}
//           </p>


//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetail;




import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import '../styles/product.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {

    if (!product) return;

  if (product.stock <= 0) {
    alert("Out of stock");
    return;
  }
  
    if (product) {
      dispatch(addToCart({
        productId: product._id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        stock: product.stock, 
        qty: 1
      }));
      alert('Successfully added to your cart!');
    }
  };

  if (loading) return <div style={{ textAlign: 'center', margin: '100px', color: '#e5e5e5' }}>Loading Product...</div>;
  if (!product) return <div style={{ textAlign: 'center', margin: '100px', color: '#f5f5f5' }}>Product Not Found</div>;

  return (
    <div className="product-detail-wrapper" style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      
      {/* Breadcrumb Navigation */}
      <div style={{ color: '#a3a3a3', marginBottom: '20px', fontSize: '0.95rem' }}>
        <Link to="/" style={{ color: '#e5e5e5' }}>Home</Link> / <Link to="/shop" style={{ color: '#e5e5e5' }}>Shop</Link> / {product.category} / <span style={{ color: '#fff' }}>{product.name}</span>
      </div>

      <div className="product-detail">
        {/* Left Side: Image */}
        <div className="detail-image-container">
          <img src={product.imageUrl} alt={product.name} className="detail-image" />
        </div>

        {/* Right Side: Information Block */}
        <div className="detail-info">
          
          {product.badge && (
            <span style={{ display: 'inline-block', background: '#f5f5f5', color: '#0a0a0a', fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.5px', padding: '4px 12px', borderRadius: '20px', textTransform: 'uppercase', marginBottom: '10px' }}>
              {product.badge}
            </span>
          )}

          <h2 style={{ fontSize: '2.8rem', marginBottom: '10px' }}>{product.name}</h2>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '15px', flexWrap: 'wrap', margin: '15px 0' }}>
            <p className="detail-price" style={{ fontSize: '2.5rem', margin: 0 }}>₹{product.price.toFixed(2)}</p>
            {product.originalPrice > product.price && (
              <>
                <span style={{ fontSize: '1.3rem', color: '#6b6b6b', textDecoration: 'line-through' }}>₹{product.originalPrice.toFixed(2)}</span>
                <span style={{ fontSize: '0.9rem', fontWeight: '700', color: '#0a0a0a', background: '#f5f5f5', padding: '3px 10px', borderRadius: '4px' }}>
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off
                </span>
              </>
            )}
          </div>

          {/* Description */}
          <div style={{ marginBottom: '25px' }}>
            <h4 style={{ color: '#fff', marginBottom: '10px' }}>Product Description</h4>
            <p style={{ color: '#a3a3a3', lineHeight: '1.8' }}>{product.description}</p>
          </div>

          {/* Cart & Stock Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <button onClick={handleAddToCart} className="btn" style={{ flexGrow: '1', padding: '18px', fontSize: '1.2rem' }}>
              Add to Shopping Cart
            </button>
          </div>
          
          <p style={{ marginTop: '20px', color: product.stock > 0 ? '#f5f5f5' : '#6b6b6b', fontWeight: '600' }}>
            {product.stock > 0 ? `● In Stock (${product.stock} units available)` : `● Temporarily Out of Stock`}
          </p>

        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

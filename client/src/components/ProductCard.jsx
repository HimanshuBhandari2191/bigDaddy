// import React from 'react'
// import {Link} from "react-router-dom"
// import "../styles/product.css"

// const ProductCard = ({product}) => {
//   return (
//     <div className='product-card'>
//         <img src="product.imageUrl" alt="product.name" className='product-image' />
//         <div className="product-info">
//             <h3 className="product-name">{product.name}</h3>
//             <p className="product-price">{product.price.toFixed(2)}</p>
            
//             <Link to={`/products/${product._id}`} className="view-details-button">
//             View Details
//             </Link>

//         </div>
//     </div>
//   )
// }

// export default ProductCard



import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/product.css';

const ProductCard = ({ product }) => {
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="product-card">
      {product.badge && <span className="product-badge">{product.badge}</span>}
      <img src={product.imageUrl} alt={product.name} className="product-image" />
      <div className="product-info">
        <h3>{product.name}</h3>
        <div className="price-row">
          <p className="price">₹{product.price}</p>
          {hasDiscount && (
            <>
              <span className="price-original">₹{product.originalPrice}</span>
              <span className="price-discount">{discountPercent}% off</span>
            </>
          )}
        </div>
        {product.size && <p className="product-tag">{product.size}"</p>}
        <Link to={`/product/${product._id}`} className="btn">View Details</Link>
      </div>
    </div>
  );
};

export default ProductCard;
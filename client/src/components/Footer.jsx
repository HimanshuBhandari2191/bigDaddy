import React from 'react'
import { Link } from 'react-router-dom'
import Newsletter from './Newsletter'

const Footer = () => {
  return (
    <footer style={{
      background:'#0a0a0a',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      padding:'40px 20px',
      marginTop:'auto'
    }}>

    <Newsletter />

    <div style={{
      maxWidth:'1200px',
      margin:'0 auto',
      display:'flex',
      flexWrap:"wrap",
      justifyContent:"space-between",
      alignItems:'center',
      gap:'20px'
    }}>
      <div>
        <h3 style={{color:'#e5e5e5', marginBottom:'10px'}}>Big Daddy Tattoos</h3>
        <p style={{color:"#a3a3a3", fontSize:'0.9rem'}}>Premium E-commerce platform</p>
      </div>      

      <div style={{display:"flex", gap:"20px", flexWrap: "wrap"}}> 
        <Link to="/shop" style={{color:"#a3a3a3", fontSize:"0.9rem"}}>Shop</Link>
        <Link to="/custom-tattoo" style={{color:"#a3a3a3", fontSize:"0.9rem"}}>Custom Tattoo</Link>
        <Link to="/about" style={{color:"#a3a3a3", fontSize:"0.9rem"}}>About Us</Link>
        <Link to="/return" style={{color:"#a3a3a3", fontSize:"0.9rem"}}>Return policy</Link>
        <Link to="/disclaimer" style={{color:"#a3a3a3", fontSize:"0.9rem"}}>Disclaimer</Link>
      </div>

      <div style={{color:"#a3a3a3", fontSize:"0.9rem"}}>
        &copy; {new Date().getFullYear()} Big Daddy Tattoos. All right reserved.
      </div>
    </div> 

    </footer>
  );
};

export default Footer
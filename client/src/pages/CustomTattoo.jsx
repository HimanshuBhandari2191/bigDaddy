import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const CustomTattoo = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ placement: '', size: '', notes: '', contactPhone: '' });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert('Please login to request a custom tattoo');
      navigate('/login');
      return;
    }
    if (!image) {
      alert('Please upload a reference image or design');
      return;
    }

    setLoading(true);
    const data = new FormData();
    data.append('placement', formData.placement);
    data.append('size', formData.size);
    data.append('notes', formData.notes);
    data.append('contactPhone', formData.contactPhone);
    data.append('image', image);

    try {
      const res = await fetch('/api/custom-orders', {
        method: 'POST',
        headers: { Authorization: `Bearer ${user.token}` },
        body: data
      });
      const responseData = await res.json();

      if (res.ok) {
        setSubmitted(true);
      } else {
        alert(responseData.message || 'Error submitting your request');
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div style={{ maxWidth: '600px', margin: '60px auto', padding: '50px 30px', background: '#18181b', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.2rem', marginBottom: '15px' }}>✓ Request Received!</h2>
        <p style={{ color: '#a3a3a3', fontSize: '1.1rem', marginBottom: '30px' }}>
          Our team will review your design and reach out with a quote soon. We've also sent a confirmation to your email.
        </p>
        <Link to="/shop" className="btn">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '700px', margin: '40px auto', padding: '20px' }}>
      <h2 style={{ marginBottom: '10px' }}>Customise Your Tattoo</h2>
      <p style={{ color: '#a3a3a3', marginBottom: '30px', lineHeight: '1.7' }}>
        Upload your own design, a reference photo, handwriting, or an idea sketch — our artists will turn it into a
        ready-to-wear temporary tattoo and send you a quote.
      </p>

      <form onSubmit={handleSubmit} style={{ background: '#18181b', padding: '40px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', gap: '18px' }}>

        <div style={{ padding: '20px', border: '1px dashed rgba(255,255,255,0.25)', borderRadius: '8px', textAlign: 'center' }}>
          {preview ? (
            <img src={preview} alt="Design preview" style={{ maxWidth: '100%', maxHeight: '260px', borderRadius: '8px', marginBottom: '15px' }} />
          ) : (
            <p style={{ color: '#a3a3a3', marginBottom: '15px' }}>Upload your reference design / photo</p>
          )}
          <input type="file" accept="image/*" required onChange={handleImageChange} style={{ color: '#fff' }} />
        </div>

        <input
          type="text" placeholder="Placement (e.g. Forearm, Ankle, Back)" required
          value={formData.placement}
          onChange={(e) => setFormData({ ...formData, placement: e.target.value })}
          style={inputStyle}
        />
        <input
          type="text" placeholder="Approx. Size (e.g. 3 inch, 5 inch)" required
          value={formData.size}
          onChange={(e) => setFormData({ ...formData, size: e.target.value })}
          style={inputStyle}
        />
        <input
          type="tel" placeholder="Contact Phone Number" required
          value={formData.contactPhone}
          onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
          style={inputStyle}
        />
        <textarea
          placeholder="Any notes for our artists (colors, style, placement details)..." rows="4"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          style={inputStyle}
        />

        <button type="submit" disabled={loading} className="btn" style={{ marginTop: '10px', padding: '16px' }}>
          {loading ? 'Submitting...' : 'Submit Request'}
        </button>

        {!user && (
          <p style={{ color: '#a3a3a3', fontSize: '0.9rem', textAlign: 'center' }}>
            You'll need to <Link to="/login" style={{ color: '#e5e5e5', fontWeight: '600' }}>log in</Link> to submit a request.
          </p>
        )}
      </form>
    </div>
  );
};

const inputStyle = {
  padding: '14px',
  background: '#0a0a0a',
  border: '1px solid #27272a',
  borderRadius: '6px',
  color: '#fff',
  fontSize: '15px',
  outline: 'none',
  fontFamily: 'inherit'
};

export default CustomTattoo;

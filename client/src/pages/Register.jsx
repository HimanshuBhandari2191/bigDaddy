import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/auth.css';

const Register = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // Track Steps: 1 -> Send OTP, 2 -> Verify, 3 -> Complete Profile
  const [loading, setLoading] = useState(false);

  // Form states
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  // Step 1: Request OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (res.ok) {
        alert(data.message || 'OTP sent successfully to your email.');
        setStep(2); // Advance to verification
      } else {
        alert(data.message || 'Failed to send OTP.');
      }
    } catch (error) {
      console.error(error);
      alert('Error connecting to backend server.');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/auth/verify-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp })
      });
      const data = await res.json();
      if (res.ok) {
        alert(data.message || 'OTP Verified! Please complete your profile.');
        setStep(3); // Advance to password setup
      } else {
        alert(data.message || 'Invalid or expired OTP.');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Complete Profile (Register password)
  const handleCompleteProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, password })
      });
      const data = await res.json();
      if (res.ok) {
        alert(data.message || 'Account registration successful! Please log in.');
        navigate('/login'); // Redirect to login page
      } else {
        alert(data.message || 'Registration failed.');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Register ({step}/3)</h2>
        
        {step === 1 && (
          <form onSubmit={handleSendOtp}>
            <p style={{ color: '#a3a3a3', marginBottom: '15px' }}>Enter your email to receive a secure login OTP.</p>
            <input 
              type="email" 
              placeholder="Your Email Address" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
            <button type="submit" disabled={loading} className="btn">
              {loading ? 'Sending...' : 'Send Verification OTP'}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyOtp}>
            <p style={{ color: '#a3a3a3', marginBottom: '15px' }}>An OTP was sent to <strong>{email}</strong></p>
            <input 
              type="text" 
              placeholder="Enter 6-Digit OTP" 
              value={otp} 
              onChange={(e) => setOtp(e.target.value)} 
              required 
            />
            <button type="submit" disabled={loading} className="btn">
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
            <button type="button" onClick={() => setStep(1)} style={{ background: 'none', border: 'none', color: '#e5e5e5', marginTop: '10px', cursor: 'pointer' }}>
              ← Change Email
            </button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleCompleteProfile}>
            <p style={{ color: '#a3a3a3', marginBottom: '15px' }}>Email verified! Setup your security profile configurations.</p>
            <input 
              type="text" 
              placeholder="Full Name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
            <input 
              type="password" 
              placeholder="Create Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
            <button type="submit" disabled={loading} className="btn">
              {loading ? 'Saving Profile...' : 'Complete Account & Register'}
            </button>
          </form>
        )}

        <p style={{ marginTop: '20px', fontSize: '0.9rem' }}>
          Already have an account? <Link to="/login" style={{ color: '#e5e5e5' }}>Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
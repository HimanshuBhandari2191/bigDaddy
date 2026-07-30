import React, { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | done | error
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      setMessage(data.message || (res.ok ? 'Subscribed!' : 'Something went wrong.'));
      setStatus(res.ok ? 'done' : 'error');
      if (res.ok) setEmail('');
    } catch (error) {
      console.error(error);
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div style={{
      background: '#141414',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: '12px',
      padding: '30px',
      textAlign: 'center',
      maxWidth: '1200px',
      margin: '0 auto 30px auto'
    }}>
      <h3 style={{ marginBottom: '8px' }}>Get 10% Off + Exclusive Access</h3>
      <p style={{ color: '#a3a3a3', marginBottom: '20px', maxWidth: '480px', margin: '0 auto 20px auto' }}>
        Sign up to our newsletter for new tattoo drops, member-only discounts, and trending designs first.
      </p>

      {status === 'done' ? (
        <p style={{ color: '#f5f5f5', fontWeight: '600' }}>{message}</p>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <input
            type="email"
            required
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              padding: '12px 16px',
              background: '#0a0a0a',
              border: '1px solid #27272a',
              borderRadius: '8px',
              color: '#fff',
              fontSize: '15px',
              outline: 'none',
              minWidth: '260px'
            }}
          />
          <button type="submit" className="btn" disabled={status === 'loading'}>
            {status === 'loading' ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
      )}
      {status === 'error' && <p style={{ color: '#a3a3a3', marginTop: '12px', fontSize: '0.85rem' }}>{message}</p>}
    </div>
  );
};

export default Newsletter;

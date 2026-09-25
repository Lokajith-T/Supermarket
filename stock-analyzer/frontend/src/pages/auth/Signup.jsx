import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiUser, FiMail, FiPhone, FiLock } from 'react-icons/fi';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup, currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }
    // Simple mobile validation
    if (!/^[0-9]{10,15}$/.test(mobile)) {
      return setError('Please enter a valid mobile number');
    }

    try {
      setError('');
      setLoading(true);
      await signup(email, password, name, mobile);
      // We don't navigate here anymore. The useEffect will handle it once context updates.
    } catch (err) {
      setError('Failed to create an account. ' + err.message);
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: 'linear-gradient(135deg, var(--bg-dark), #1e1b4b)', padding: '20px' }}>
      <div className="glass-panel animate-fade-in" style={{ padding: '40px', width: '100%', maxWidth: '500px' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '10px' }}>Create an Account</h2>
          <p style={{ color: 'var(--text-muted)' }}>Sign up to start managing your stock</p>
        </div>

        {error && <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>{error}</div>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label className="label">Full Name</label>
            <div style={{ position: 'relative' }}>
              <FiUser style={{ position: 'absolute', top: '14px', left: '16px', color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                className="input-field" 
                style={{ paddingLeft: '44px' }}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="John Doe"
              />
            </div>
          </div>

          <div>
            <label className="label">Email Address</label>
            <div style={{ position: 'relative' }}>
              <FiMail style={{ position: 'absolute', top: '14px', left: '16px', color: 'var(--text-muted)' }} />
              <input 
                type="email" 
                className="input-field" 
                style={{ paddingLeft: '44px' }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div>
            <label className="label">Mobile Number</label>
            <div style={{ position: 'relative' }}>
              <FiPhone style={{ position: 'absolute', top: '14px', left: '16px', color: 'var(--text-muted)' }} />
              <input 
                type="tel" 
                className="input-field" 
                style={{ paddingLeft: '44px' }}
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
                placeholder="1234567890"
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ flex: 1 }}>
              <label className="label">Password</label>
              <div style={{ position: 'relative' }}>
                <FiLock style={{ position: 'absolute', top: '14px', left: '16px', color: 'var(--text-muted)' }} />
                <input 
                  type="password" 
                  className="input-field" 
                  style={{ paddingLeft: '44px' }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  minLength={6}
                />
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <label className="label">Confirm</label>
              <div style={{ position: 'relative' }}>
                <FiLock style={{ position: 'absolute', top: '14px', left: '16px', color: 'var(--text-muted)' }} />
                <input 
                  type="password" 
                  className="input-field" 
                  style={{ paddingLeft: '44px' }}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  minLength={6}
                />
              </div>
            </div>
          </div>

          <button disabled={loading} className="btn-primary" type="submit" style={{ marginTop: '10px' }}>
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <div style={{ marginTop: '24px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '14px' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: '600' }}>Log in</Link>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { useNavigate, Link } from '@tanstack/react-router';
import { Mail, Lock } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      // Simulate network request
      setTimeout(() => {
        localStorage.setItem('isAuthenticated', 'true');
        // Force a page reload to update the TopBar state, or use window.location
        window.location.href = '/';
      }, 1000);
    } catch (err) {
      setError('Failed to log in. Please check your credentials.');
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: 'linear-gradient(135deg, #1f2937, #1e1b4b)' }}>
      <div className="animate-fade-in" style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '16px', padding: '40px', width: '100%', maxWidth: '420px', color: 'white', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '10px' }}>Welcome Back</h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Login to access your account</p>
        </div>

        {error && <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>{error}</div>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail style={{ position: 'absolute', top: '12px', left: '16px', color: 'rgba(255, 255, 255, 0.5)', width: '18px', height: '18px' }} />
              <input 
                type="email" 
                style={{ width: '100%', padding: '12px 16px 12px 44px', borderRadius: '8px', background: 'rgba(0, 0, 0, 0.2)', border: '1px solid rgba(255, 255, 255, 0.1)', color: 'white', outline: 'none' }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock style={{ position: 'absolute', top: '12px', left: '16px', color: 'rgba(255, 255, 255, 0.5)', width: '18px', height: '18px' }} />
              <input 
                type="password" 
                style={{ width: '100%', padding: '12px 16px 12px 44px', borderRadius: '8px', background: 'rgba(0, 0, 0, 0.2)', border: '1px solid rgba(255, 255, 255, 0.1)', color: 'white', outline: 'none' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />
            </div>
          </div>

          <button disabled={loading} type="submit" style={{ marginTop: '10px', width: '100%', padding: '12px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', transition: 'background 0.2s' }} onMouseOver={(e) => e.currentTarget.style.background = '#2563eb'} onMouseOut={(e) => e.currentTarget.style.background = '#3b82f6'}>
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <div style={{ marginTop: '24px', textAlign: 'center', color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px' }}>
          Don't have an account? <Link to="/" style={{ color: '#60a5fa', fontWeight: '600', textDecoration: 'none' }}>Sign up</Link>
        </div>
      </div>
    </div>
  );
}

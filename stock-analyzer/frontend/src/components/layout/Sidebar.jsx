import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiHome, FiBox, FiList, FiUser, FiLogOut } from 'react-icons/fi';

export default function Sidebar() {
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  const userLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: <FiHome /> },
    { name: 'Browse Products', path: '/products', icon: <FiBox /> },
    { name: 'My Requests', path: '/requests', icon: <FiList /> },
    { name: 'Profile', path: '/profile', icon: <FiUser /> },
  ];

  return (
    <div className="sidebar" style={{ minHeight: '100vh', justifyContent: 'space-between', padding: '0', width: '280px' }}>
      <div>
        <div style={{ padding: '30px 24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ background: 'var(--primary)', padding: '8px', borderRadius: '8px', display: 'flex' }}>
            <FiBox size={24} color="white" />
          </div>
          <div>
            <h1 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-main)', margin: 0 }}>Stock Analyzer</h1>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
              User Portal
            </span>
          </div>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '10px' }}>
          {userLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 24px',
                color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                fontWeight: isActive ? '600' : '500',
                transition: 'all 0.2s',
              })}
            >
              <span style={{ fontSize: '1.2rem' }}>{link.icon}</span>
              {link.name}
            </NavLink>
          ))}
        </nav>
      </div>

      <div style={{ padding: '24px', borderTop: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FiUser color="var(--text-main)" />
          </div>
          <div style={{ overflow: 'hidden' }}>
            <p style={{ margin: 0, fontWeight: '600', color: 'var(--text-main)', fontSize: '0.9rem', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
              {currentUser?.displayName || 'User'}
            </p>
            <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
              {currentUser?.email}
            </p>
          </div>
        </div>

        <button 
          onClick={handleLogout}
          style={{ width: '100%', background: 'transparent', border: '1px solid rgba(140, 67, 81, 0.3)', color: 'var(--danger)', padding: '10px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', transition: 'all 0.2s', fontWeight: '500' }}
          onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(140, 67, 81, 0.1)'; }}
          onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; }}
        >
          <FiLogOut /> Log Out
        </button>
      </div>
    </div>
  );
}

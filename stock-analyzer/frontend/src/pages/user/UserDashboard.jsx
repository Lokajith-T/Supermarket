import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/layout/Sidebar';
import { FiBox, FiClock, FiBell, FiChevronRight } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { database } from '../../firebase';
import { ref, onValue } from 'firebase/database';
import { Link } from 'react-router-dom';

export default function UserDashboard() {
  const { currentUser } = useAuth();
  const [stats, setStats] = useState({
    availableProducts: 0,
    myRequests: 0,
    pendingRequests: 0,
  });

  const [recentNotifications, setRecentNotifications] = useState([]);
  const [recentProducts, setRecentProducts] = useState([]);

  useEffect(() => {
    // 1. Fetch Products for total count and recent products
    const prodRef = ref(database, 'products');
    const unsubProd = onValue(prodRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const products = Object.values(data).filter(p => p.active);
        setStats(prev => ({ ...prev, availableProducts: products.length }));
        
        // Get last 5 added products
        setRecentProducts(products.reverse().slice(0, 5));
      } else {
        setStats(prev => ({ ...prev, availableProducts: 0 }));
        setRecentProducts([]);
      }
    });

    // 2. Fetch User Requests for stats and notifications
    if (currentUser?.uid) {
      const reqRef = ref(database, 'stockRequests');
      const unsubReq = onValue(reqRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const myReqs = Object.values(data).filter(r => r.userId === currentUser.uid);
          const pending = myReqs.filter(r => r.status === 'Pending').length;
          setStats(prev => ({ ...prev, myRequests: myReqs.length, pendingRequests: pending }));

          // Create notifications from requests
          const notifs = myReqs
            .filter(r => r.status !== 'Pending') // Only show approved/rejected as notifications
            .map(r => ({
              id: r.id || Math.random(),
              text: `Your stock request for "${r.productName}" was ${r.status}.`,
              time: new Date(r.updatedAt || r.createdAt).toLocaleDateString(),
              read: true,
              status: r.status
            }))
            .reverse()
            .slice(0, 5);
          
          setRecentNotifications(notifs);
        } else {
          setStats(prev => ({ ...prev, myRequests: 0, pendingRequests: 0 }));
          setRecentNotifications([]);
        }
      });
      return () => {
        unsubProd();
        unsubReq();
      };
    }
    return () => unsubProd();
  }, [currentUser]);

  const StatCard = ({ title, value, icon, color }) => (
    <div className="glass-panel" style={{ padding: '24px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
      <div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: '500', marginBottom: '8px' }}>{title}</p>
        <h3 style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--text-main)', margin: 0 }}>{value}</h3>
      </div>
      <div style={{ background: `${color}20`, padding: '12px', borderRadius: '12px', color: color }}>
        {icon}
      </div>
    </div>
  );

  return (
    <div className="app-container">
      <Sidebar role="user" />
      
      <div className="main-content">
        <header style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '4px' }}>Welcome back, {currentUser?.displayName?.split(' ')[0] || 'User'}! 👋</h1>
          <p style={{ color: 'var(--text-muted)' }}>Here is what's happening with your stock requests.</p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '32px' }}>
          <StatCard title="Available Products" value={stats.availableProducts} icon={<FiBox size={24} />} color="var(--primary)" />
          <StatCard title="My Total Requests" value={stats.myRequests} icon={<FiClock size={24} />} color="var(--success)" />
          <StatCard title="Pending Approvals" value={stats.pendingRequests} icon={<FiClock size={24} />} color="var(--warning)" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', margin: 0 }}>Recently Added Products</h3>
              <Link to="/products" style={{ color: 'var(--primary)', fontSize: '0.875rem', cursor: 'pointer', fontWeight: '500' }}>View All</Link>
            </div>
            {recentProducts.length === 0 ? (
              <p style={{ color: 'var(--text-muted)' }}>No products available yet.</p>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>
                    <th style={{ padding: '12px 0', color: 'var(--text-muted)', fontWeight: '500' }}>Product Name</th>
                    <th style={{ padding: '12px 0', color: 'var(--text-muted)', fontWeight: '500' }}>SKU</th>
                    <th style={{ padding: '12px 0', color: 'var(--text-muted)', fontWeight: '500', textAlign: 'right' }}>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {recentProducts.map((product, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '16px 0', fontWeight: '500' }}>{product.name}</td>
                      <td style={{ padding: '16px 0', color: 'var(--text-muted)' }}>{product.sku || '-'}</td>
                      <td style={{ padding: '16px 0', textAlign: 'right', fontWeight: '600', color: 'var(--success)' }}>₹{product.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', margin: 0 }}>Recent Notifications</h3>
              <FiBell color="var(--text-muted)" />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {recentNotifications.length === 0 ? (
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>No recent updates on your requests.</p>
              ) : recentNotifications.map(notif => (
                <div key={notif.id} style={{ padding: '12px', background: 'transparent', borderRadius: '8px', borderLeft: notif.status === 'Approved' ? '3px solid var(--success)' : '3px solid var(--danger)' }}>
                  <p style={{ margin: '0 0 6px 0', fontSize: '0.875rem', lineHeight: '1.4' }}>{notif.text}</p>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{notif.time}</span>
                </div>
              ))}
            </div>
            <Link to="/requests" className="btn-primary" style={{ width: '100%', marginTop: '20px', background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-main)', textAlign: 'center', display: 'block' }}>
              View All Requests
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

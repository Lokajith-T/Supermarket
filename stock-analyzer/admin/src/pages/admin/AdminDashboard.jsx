import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/layout/Sidebar';
import { FiBox, FiAlertCircle, FiClock, FiActivity } from 'react-icons/fi';
import { database } from '../../firebase';
import { ref, onValue } from 'firebase/database';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    lowStock: 0,
    outOfStock: 0,
    pendingRequests: 0,
  });

  const [categoryStats, setCategoryStats] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    // Fetch Categories and Products
    const catRef = ref(database, 'categories');
    const prodRef = ref(database, 'products');

    let catMap = {};
    const unsubCat = onValue(catRef, (snap) => {
      const data = snap.val();
      if (data) {
        catMap = {};
        Object.keys(data).forEach(k => {
          catMap[k] = { id: k, name: data[k].name, totalProducts: 0, totalStock: 0 };
        });
        
        // After fetching categories, fetch products to calculate
        onValue(prodRef, (pSnap) => {
          const pData = pSnap.val();
          let lowQtyCount = 0;
          let outOfStockCount = 0;

          // Reset catMap counts in case of re-render
          Object.keys(catMap).forEach(k => {
            catMap[k].totalProducts = 0;
            catMap[k].totalStock = 0;
          });

          if (pData) {
            const products = Object.values(pData).filter(p => p.active);
            products.forEach(p => {
              if (p.quantity === 0) {
                outOfStockCount++;
              } else if (p.quantity <= p.minStock) {
                lowQtyCount++;
              }

              if (p.categoryId && catMap[p.categoryId]) {
                catMap[p.categoryId].totalProducts += 1;
                catMap[p.categoryId].totalStock += (p.quantity || 0);
              }
            });
          }
          
          setCategoryStats(Object.values(catMap).filter(c => c.totalProducts > 0)); // Only show categories with products
          setStats(prev => ({
            ...prev,
            lowStock: lowQtyCount,
            outOfStock: outOfStockCount
          }));
        });
      }
    });

    // Fetch Requests Stats
    const requestsRef = ref(database, 'stockRequests');
    const unsubRequests = onValue(requestsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const requests = Object.values(data);
        const pending = requests.filter(r => r.status === 'Pending').length;
        setStats(prev => ({ ...prev, pendingRequests: pending }));
      } else {
        setStats(prev => ({ ...prev, pendingRequests: 0 }));
      }
    });

    // Fetch Recent Activity (Transactions)
    const transRef = ref(database, 'stockTransactions');
    const unsubTrans = onValue(transRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const trans = Object.values(data).reverse().slice(0, 5); // Last 5
        setRecentActivity(trans);
      } else {
        setRecentActivity([]);
      }
    });

    return () => {
      unsubCat();
      unsubRequests();
      unsubTrans();
    };
  }, []);

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
      <Sidebar role="admin" />
      
      <div className="main-content">
        <header style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '4px' }}>Dashboard Overview</h1>
            <p style={{ color: 'var(--text-muted)' }}>Welcome back to your stock analyzer admin panel.</p>
          </div>
          <button className="btn-primary" style={{ padding: '10px 16px', fontSize: '0.875rem' }}>
            <FiActivity /> Generate Report
          </button>
        </header>

        {/* Global Actionable Alerts */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '32px' }}>
          <StatCard title="Low Stock Items" value={stats.lowStock} icon={<FiAlertCircle size={24} />} color="var(--warning)" />
          <StatCard title="Out of Stock" value={stats.outOfStock} icon={<FiAlertCircle size={24} />} color="var(--danger)" />
          <StatCard title="Pending Requests" value={stats.pendingRequests} icon={<FiClock size={24} />} color="#8B5CF6" />
        </div>

        {/* Category Wise Stock Breakdown */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '20px', color: 'var(--text-main)' }}>Stock by Category</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '16px' }}>
            {categoryStats.map((cat, idx) => (
              <div key={idx} className="glass-panel" style={{ padding: '20px', borderLeft: '4px solid var(--primary)' }}>
                <h4 style={{ margin: '0 0 12px 0', fontSize: '1rem', color: 'var(--text-main)' }}>{cat.name}</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                  <span><strong style={{ color: 'var(--text-main)' }}>{cat.totalProducts}</strong> Products</span>
                  <span><strong style={{ color: 'var(--text-main)' }}>{cat.totalStock}</strong> Units Qty</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
          <div className="glass-panel" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '20px' }}>Recent Stock Activity</h3>
            {recentActivity.length === 0 ? (
              <p style={{ color: 'var(--text-muted)' }}>No recent activity.</p>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>
                    <th style={{ padding: '12px 0', color: 'var(--text-muted)', fontWeight: '500' }}>Action</th>
                    <th style={{ padding: '12px 0', color: 'var(--text-muted)', fontWeight: '500' }}>Product</th>
                    <th style={{ padding: '12px 0', color: 'var(--text-muted)', fontWeight: '500' }}>Qty</th>
                    <th style={{ padding: '12px 0', color: 'var(--text-muted)', fontWeight: '500', textAlign: 'right' }}>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {recentActivity.map((activity, i) => {
                    const isAdd = activity.type === 'Stock In';
                    const color = isAdd ? 'var(--success)' : 'var(--danger)';
                    return (
                      <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <td style={{ padding: '16px 0' }}>
                          <span className="badge" style={{ background: `${color}20`, color: color }}>{activity.type}</span>
                        </td>
                        <td style={{ padding: '16px 0', fontWeight: '500' }}>{activity.productName}</td>
                        <td style={{ padding: '16px 0', color: color, fontWeight: '600' }}>{isAdd ? '+' : '-'}{activity.changedQuantity}</td>
                        <td style={{ padding: '16px 0', textAlign: 'right', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                          {new Date(activity.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>

          <div className="glass-panel" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '20px' }}>Quick Actions</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Link to="/products" className="input-field" style={{ textAlign: 'left', cursor: 'pointer', background: 'rgba(255,255,255,0.02)', display: 'block' }}>+ Add New Product</Link>
              <Link to="/stock" className="input-field" style={{ textAlign: 'left', cursor: 'pointer', background: 'rgba(255,255,255,0.02)', display: 'block' }}>+ Add Stock (Stock In)</Link>
              <Link to="/requests" className="input-field" style={{ textAlign: 'left', cursor: 'pointer', background: 'rgba(255,255,255,0.02)', display: 'block' }}>✓ Review Pending Requests</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Quick fix for missing FiLayers import above
const FiLayers = ({size}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 12 12 17 22 12"></polyline><polyline points="2 17 12 22 22 17"></polyline></svg>;

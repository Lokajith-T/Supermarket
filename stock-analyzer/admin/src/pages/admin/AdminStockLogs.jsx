import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/layout/Sidebar';
import { database } from '../../firebase';
import { ref, onValue } from 'firebase/database';
import { FiActivity } from 'react-icons/fi';

export default function AdminStockLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const logsRef = ref(database, 'stockTransactions');
    const unsub = onValue(logsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setLogs(Object.keys(data).map(key => ({ id: key, ...data[key] })).reverse());
      } else {
        setLogs([]);
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  return (
    <div className="app-container">
      <Sidebar role="admin" />
      
      <div className="main-content">
        <header style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '4px' }}>Stock Activity Logs</h1>
          <p style={{ color: 'var(--text-muted)' }}>Detailed history of all stock movements (In / Out).</p>
        </header>

        <div className="glass-panel" style={{ overflowX: 'auto' }}>
          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>Loading logs...</div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>
                  <th style={{ padding: '16px 24px', color: 'var(--text-muted)', fontWeight: '600' }}>Type</th>
                  <th style={{ padding: '16px 24px', color: 'var(--text-muted)', fontWeight: '600' }}>Product Name</th>
                  <th style={{ padding: '16px 24px', color: 'var(--text-muted)', fontWeight: '600' }}>Change</th>
                  <th style={{ padding: '16px 24px', color: 'var(--text-muted)', fontWeight: '600' }}>Stock Level</th>
                  <th style={{ padding: '16px 24px', color: 'var(--text-muted)', fontWeight: '600' }}>Reason / Note</th>
                  <th style={{ padding: '16px 24px', color: 'var(--text-muted)', fontWeight: '600', textAlign: 'right' }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {logs.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)' }}>No stock activity found.</td>
                  </tr>
                ) : logs.map(log => (
                  <tr key={log.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '16px 24px' }}>
                      <span className="badge" style={{ background: log.type === 'Stock In' ? 'rgba(72, 94, 48, 0.15)' : 'rgba(140, 67, 81, 0.15)', color: log.type === 'Stock In' ? 'var(--success)' : 'var(--danger)' }}>
                        {log.type}
                      </span>
                    </td>
                    <td style={{ padding: '16px 24px', fontWeight: '600', color: 'var(--text-main)' }}>{log.productName}</td>
                    <td style={{ padding: '16px 24px', fontWeight: '700', color: log.type === 'Stock In' ? 'var(--success)' : 'var(--danger)' }}>
                      {log.type === 'Stock In' ? '+' : '-'}{log.changedQuantity} {log.unit || ''}
                    </td>
                    <td style={{ padding: '16px 24px', color: 'var(--text-muted)' }}>
                      <span style={{ textDecoration: 'line-through', marginRight: '8px', fontSize: '0.8rem' }}>{log.previousQuantity} {log.unit || ''}</span>
                      <FiActivity size={12} style={{ margin: '0 4px' }} />
                      <span style={{ fontWeight: '600', color: 'var(--primary)' }}>{log.newQuantity} {log.unit || ''}</span>
                    </td>
                    <td style={{ padding: '16px 24px', color: 'var(--text-muted)', fontSize: '0.875rem' }}>{log.reason || '-'}</td>
                    <td style={{ padding: '16px 24px', textAlign: 'right', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                      {new Date(log.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

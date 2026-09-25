import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/layout/Sidebar';
import { database } from '../../firebase';
import { ref, onValue } from 'firebase/database';
import { FiFileText, FiCalendar, FiDollarSign } from 'react-icons/fi';

export default function AdminBillingLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const logsRef = ref(database, 'billingLogs');
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
          <h1 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '4px' }}>Billing Logs</h1>
          <p style={{ color: 'var(--text-muted)' }}>View history of all purchases and bills generated.</p>
        </header>

        <div className="glass-panel" style={{ overflowX: 'auto' }}>
          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>Loading logs...</div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>
                  <th style={{ padding: '16px 24px', color: 'var(--text-muted)', fontWeight: '600' }}>Bill ID</th>
                  <th style={{ padding: '16px 24px', color: 'var(--text-muted)', fontWeight: '600' }}>Date & Time</th>
                  <th style={{ padding: '16px 24px', color: 'var(--text-muted)', fontWeight: '600' }}>Customer Info</th>
                  <th style={{ padding: '16px 24px', color: 'var(--text-muted)', fontWeight: '600' }}>Items Summary</th>
                  <th style={{ padding: '16px 24px', color: 'var(--text-muted)', fontWeight: '600', textAlign: 'right' }}>Total Amount</th>
                </tr>
              </thead>
              <tbody>
                {logs.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)' }}>No billing records found.</td>
                  </tr>
                ) : logs.map(log => (
                  <tr key={log.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '16px 24px', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                      <FiFileText style={{ marginRight: '8px' }} />
                      {log.id.slice(-6).toUpperCase()}
                    </td>
                    <td style={{ padding: '16px 24px', color: 'var(--text-main)', fontSize: '0.875rem' }}>
                      {new Date(log.createdAt).toLocaleString()}
                    </td>
                    <td style={{ padding: '16px 24px', color: 'var(--text-main)', fontSize: '0.875rem' }}>
                      {log.buyer?.name ? (
                        <>
                          <div style={{ fontWeight: '600' }}>{log.buyer.name}</div>
                          <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{log.buyer.mobile}</div>
                        </>
                      ) : (
                        <span style={{ color: 'var(--text-muted)' }}>Walk-in / N/A</span>
                      )}
                    </td>
                    <td style={{ padding: '16px 24px', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                      {log.items?.map(item => `${item.qty} ${item.unit || ''} x ${item.name}`).join(', ') || 'N/A'}
                    </td>
                    <td style={{ padding: '16px 24px', textAlign: 'right', fontWeight: '700', color: 'var(--success)' }}>
                      ₹{log.totalAmount.toFixed(2)}
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

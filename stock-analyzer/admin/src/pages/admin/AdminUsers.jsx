import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/layout/Sidebar';
import { database } from '../../firebase';
import { ref, onValue } from 'firebase/database';
import { FiUsers, FiMail, FiPhone, FiCalendar } from 'react-icons/fi';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const usersRef = ref(database, 'users');
    const unsub = onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setUsers(
          Object.keys(data)
            .map(key => ({ id: key, ...data[key] }))
            .filter(user => user.role !== 'admin')
            .reverse()
        );
      } else {
        setUsers([]);
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
          <h1 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '4px' }}>Customer Logs</h1>
          <p style={{ color: 'var(--text-muted)' }}>View all registered app users and POS walk-in customers.</p>
        </header>

        <div className="glass-panel" style={{ overflowX: 'auto' }}>
          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>Loading users...</div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>
                  <th style={{ padding: '16px 24px', color: 'var(--text-muted)', fontWeight: '600' }}>Full Name</th>
                  <th style={{ padding: '16px 24px', color: 'var(--text-muted)', fontWeight: '600' }}>Email Address</th>
                  <th style={{ padding: '16px 24px', color: 'var(--text-muted)', fontWeight: '600' }}>Mobile</th>
                  <th style={{ padding: '16px 24px', color: 'var(--text-muted)', fontWeight: '600' }}>Role</th>
                  <th style={{ padding: '16px 24px', color: 'var(--text-muted)', fontWeight: '600', textAlign: 'right' }}>Joined Date</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)' }}>No users found.</td>
                  </tr>
                ) : users.map(user => (
                  <tr key={user.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '16px 24px', fontWeight: '600', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <FiUsers color="var(--text-muted)" /> {user.name || 'N/A'}
                    </td>
                    <td style={{ padding: '16px 24px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <FiMail color="var(--text-muted)" /> {user.email}
                      </div>
                    </td>
                    <td style={{ padding: '16px 24px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <FiPhone color="var(--text-muted)" /> {user.mobile || 'N/A'}
                      </div>
                    </td>
                    <td style={{ padding: '16px 24px' }}>
                      <span className="badge" style={{ background: user.role === 'admin' ? 'rgba(79, 70, 229, 0.15)' : 'rgba(72, 94, 48, 0.15)', color: user.role === 'admin' ? 'var(--primary)' : 'var(--success)' }}>
                        {user.role}
                      </span>
                    </td>
                    <td style={{ padding: '16px 24px', textAlign: 'right', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
                        <FiCalendar /> {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-'}
                      </div>
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

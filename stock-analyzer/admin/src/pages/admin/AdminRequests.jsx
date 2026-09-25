import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/layout/Sidebar';
import { database } from '../../firebase';
import { ref, onValue, update } from 'firebase/database';
import { FiCheck, FiX, FiClock } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

export default function AdminRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    const reqRef = ref(database, 'stockRequests');
    onValue(reqRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setRequests(Object.keys(data).map(key => ({ id: key, ...data[key] })).reverse());
      } else {
        setRequests([]);
      }
      setLoading(false);
    });
  }, []);

  const handleStatusChange = async (req, newStatus) => {
    if (window.confirm(`Are you sure you want to ${newStatus} this request?`)) {
      try {
        const updates = {};
        updates[`/stockRequests/${req.id}/status`] = newStatus;
        updates[`/stockRequests/${req.id}/updatedAt`] = new Date().toISOString();
        
        // If approved, you would ideally trigger a stock addition or something, 
        // but for now we just change status.
        
        await update(ref(database), updates);
      } catch (error) {
        console.error("Error updating request:", error);
        alert("Failed to update status.");
      }
    }
  };

  const getStatusBadge = (status) => {
    if (status === 'Approved') return <span className="badge badge-success">Approved</span>;
    if (status === 'Rejected') return <span className="badge badge-danger">Rejected</span>;
    return <span className="badge badge-warning">Pending</span>;
  };

  return (
    <div className="app-container">
      <Sidebar role="admin" />
      
      <div className="main-content">
        <header style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '4px' }}>Stock Requests</h1>
          <p style={{ color: 'var(--text-muted)' }}>Review and manage stock requests from users.</p>
        </header>

        <div className="glass-panel" style={{ overflowX: 'auto' }}>
          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>Loading requests...</div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>
                  <th style={{ padding: '16px 24px', color: 'var(--text-muted)', fontWeight: '600' }}>Date</th>
                  <th style={{ padding: '16px 24px', color: 'var(--text-muted)', fontWeight: '600' }}>User</th>
                  <th style={{ padding: '16px 24px', color: 'var(--text-muted)', fontWeight: '600' }}>Product</th>
                  <th style={{ padding: '16px 24px', color: 'var(--text-muted)', fontWeight: '600' }}>Qty</th>
                  <th style={{ padding: '16px 24px', color: 'var(--text-muted)', fontWeight: '600' }}>Message</th>
                  <th style={{ padding: '16px 24px', color: 'var(--text-muted)', fontWeight: '600' }}>Status</th>
                  <th style={{ padding: '16px 24px', color: 'var(--text-muted)', fontWeight: '600', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.length === 0 ? (
                  <tr>
                    <td colSpan="7" style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)' }}>No requests found.</td>
                  </tr>
                ) : requests.map(req => (
                  <tr key={req.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '16px 24px', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                      {new Date(req.createdAt).toLocaleDateString()}
                    </td>
                    <td style={{ padding: '16px 24px', fontWeight: '500' }}>{req.userName || 'Unknown'}</td>
                    <td style={{ padding: '16px 24px' }}>{req.productName}</td>
                    <td style={{ padding: '16px 24px', fontWeight: '600', color: 'var(--primary)' }}>{req.quantity}</td>
                    <td style={{ padding: '16px 24px', color: 'var(--text-muted)', fontSize: '0.875rem', maxWidth: '200px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                      {req.message || '-'}
                    </td>
                    <td style={{ padding: '16px 24px' }}>
                      {getStatusBadge(req.status)}
                    </td>
                    <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                      {req.status === 'Pending' && (
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                          <button 
                            onClick={() => handleStatusChange(req, 'Approved')} 
                            style={{ background: 'rgba(72, 94, 48, 0.1)', border: '1px solid var(--success)', color: 'var(--success)', cursor: 'pointer', padding: '6px 12px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}
                          >
                            <FiCheck size={14} /> Approve
                          </button>
                          <button 
                            onClick={() => handleStatusChange(req, 'Rejected')} 
                            style={{ background: 'rgba(140, 67, 81, 0.1)', border: '1px solid var(--danger)', color: 'var(--danger)', cursor: 'pointer', padding: '6px 12px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}
                          >
                            <FiX size={14} /> Reject
                          </button>
                        </div>
                      )}
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

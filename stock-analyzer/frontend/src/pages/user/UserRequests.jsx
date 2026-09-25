import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/layout/Sidebar';
import { database } from '../../firebase';
import { ref, onValue, push } from 'firebase/database';
import { useAuth } from '../../context/AuthContext';
import { FiClock, FiCheckCircle, FiXCircle, FiPlus } from 'react-icons/fi';

export default function UserRequests() {
  const { currentUser } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRequest, setNewRequest] = useState({ productName: '', quantity: 1, message: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (currentUser?.uid) {
      const reqRef = ref(database, 'stockRequests');
      const unsub = onValue(reqRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          // Filter only requests belonging to the current user
          const myReqs = Object.keys(data)
            .map(key => ({ id: key, ...data[key] }))
            .filter(req => req.userId === currentUser.uid)
            .reverse();
          setRequests(myReqs);
        } else {
          setRequests([]);
        }
        setLoading(false);
      });
      return () => unsub();
    }
  }, [currentUser]);

  const handleSubmitRequest = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await push(ref(database, 'stockRequests'), {
        userId: currentUser.uid,
        userName: currentUser.displayName || 'User',
        productName: newRequest.productName,
        quantity: newRequest.quantity,
        message: newRequest.message,
        status: 'Pending',
        createdAt: new Date().toISOString()
      });
      setIsModalOpen(false);
      setNewRequest({ productName: '', quantity: 1, message: '' });
      alert('Request submitted successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to submit request.');
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusBadge = (status) => {
    if (status === 'Approved') return <span className="badge badge-success"><FiCheckCircle /> Approved</span>;
    if (status === 'Rejected') return <span className="badge badge-danger"><FiXCircle /> Rejected</span>;
    return <span className="badge badge-warning"><FiClock /> Pending</span>;
  };

  return (
    <div className="app-container">
      <Sidebar role="user" />
      
      <div className="main-content">
        <header style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '4px' }}>My Stock Requests</h1>
            <p style={{ color: 'var(--text-muted)' }}>Track the status of the out-of-stock items you've requested.</p>
          </div>
          <button className="btn-primary" onClick={() => setIsModalOpen(true)} style={{ padding: '10px 20px' }}>
            <FiPlus /> New Custom Request
          </button>
        </header>

        <div className="glass-panel" style={{ overflowX: 'auto' }}>
          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>Loading your requests...</div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px' }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>
                  <th style={{ padding: '16px 24px', color: 'var(--text-muted)', fontWeight: '600' }}>Date Requested</th>
                  <th style={{ padding: '16px 24px', color: 'var(--text-muted)', fontWeight: '600' }}>Product Name</th>
                  <th style={{ padding: '16px 24px', color: 'var(--text-muted)', fontWeight: '600' }}>Quantity</th>
                  <th style={{ padding: '16px 24px', color: 'var(--text-muted)', fontWeight: '600' }}>Message Included</th>
                  <th style={{ padding: '16px 24px', color: 'var(--text-muted)', fontWeight: '600', textAlign: 'right' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {requests.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)' }}>You haven't made any stock requests yet.</td>
                  </tr>
                ) : requests.map(req => (
                  <tr key={req.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '16px 24px', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                      {new Date(req.createdAt).toLocaleString()}
                    </td>
                    <td style={{ padding: '16px 24px', fontWeight: '600', color: 'var(--text-main)' }}>{req.productName}</td>
                    <td style={{ padding: '16px 24px' }}>{req.quantity}</td>
                    <td style={{ padding: '16px 24px', color: 'var(--text-muted)', fontSize: '0.875rem', fontStyle: 'italic' }}>
                      {req.message ? `"${req.message}"` : '-'}
                    </td>
                    <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                      {getStatusBadge(req.status)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(52, 59, 88, 0.6)', backdropFilter: 'blur(4px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div className="glass-panel animate-fade-in" style={{ width: '100%', maxWidth: '500px', background: 'var(--bg-card)', padding: '32px' }}>
            <h2 style={{ margin: '0 0 8px 0', fontSize: '1.5rem', color: 'var(--text-main)' }}>Submit Custom Request</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', margin: '0 0 24px 0' }}>Request a specific product that is not currently available.</p>
            
            <form onSubmit={handleSubmitRequest} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label className="label">Product Name / Description</label>
                <input type="text" className="input-field" value={newRequest.productName} onChange={e => setNewRequest({...newRequest, productName: e.target.value})} required placeholder="e.g. Organic Almonds 1kg" />
              </div>
              
              <div>
                <label className="label">Quantity Needed</label>
                <input type="number" min="1" className="input-field" value={newRequest.quantity} onChange={e => setNewRequest({...newRequest, quantity: e.target.value})} required />
              </div>

              <div>
                <label className="label">Additional Message (Optional)</label>
                <textarea className="input-field" style={{ minHeight: '100px', resize: 'vertical' }} value={newRequest.message} onChange={e => setNewRequest({...newRequest, message: e.target.value})} placeholder="Any specific brand or requirements?"></textarea>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ flex: 1, padding: '12px', background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-main)', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>Cancel</button>
                <button type="submit" disabled={submitting} className="btn-primary" style={{ flex: 1, padding: '12px', justifyContent: 'center' }}>
                  {submitting ? 'Submitting...' : 'Submit Request'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

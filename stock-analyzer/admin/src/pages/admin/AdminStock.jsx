import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/layout/Sidebar';
import { database } from '../../firebase';
import { ref, onValue, update, push } from 'firebase/database';
import { FiPlusCircle, FiMinusCircle, FiRefreshCw } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

export default function AdminStock() {
  const [products, setProducts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stockModal, setStockModal] = useState({ open: false, product: null, type: 'in' }); // type: 'in' or 'out'
  const [qty, setQty] = useState(1);
  const [reason, setReason] = useState('');
  const { currentUser } = useAuth();

  useEffect(() => {
    // Fetch Products
    const productsRef = ref(database, 'products');
    onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setProducts(Object.keys(data).map(key => ({ id: key, ...data[key] })).filter(p => p.active));
      } else {
        setProducts([]);
      }
    });

    // Fetch Transactions
    const transRef = ref(database, 'stockTransactions');
    onValue(transRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setTransactions(Object.keys(data).map(key => ({ id: key, ...data[key] })).reverse().slice(0, 50)); // Last 50
      } else {
        setTransactions([]);
      }
      setLoading(false);
    });
  }, []);

  const handleStockUpdate = async (e) => {
    e.preventDefault();
    const product = stockModal.product;
    const amount = Number(qty);
    if (amount <= 0) return alert("Quantity must be greater than 0");
    
    let newQty = product.quantity;
    if (stockModal.type === 'in') {
      newQty += amount;
    } else {
      if (amount > newQty) return alert("Cannot remove more stock than available!");
      newQty -= amount;
    }

    try {
      // 1. Update Product Quantity
      const updates = {};
      updates[`/products/${product.id}/quantity`] = newQty;
      await update(ref(database), updates);

      // 2. Record Transaction
      await push(ref(database, 'stockTransactions'), {
        productId: product.id,
        productName: product.name,
        type: stockModal.type === 'in' ? 'Stock In' : 'Stock Out',
        previousQuantity: product.quantity,
        changedQuantity: amount,
        newQuantity: newQty,
        unit: product.unit || 'PIECE',
        reason: reason,
        adminName: currentUser.displayName || 'Admin',
        createdAt: new Date().toISOString()
      });

      setStockModal({ open: false, product: null, type: 'in' });
      setQty(1);
      setReason('');
    } catch (error) {
      console.error("Stock update error:", error);
      alert("Failed to update stock.");
    }
  };

  return (
    <div className="app-container">
      <Sidebar role="admin" />
      
      <div className="main-content">
        <header style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '4px' }}>Stock Management</h1>
          <p style={{ color: 'var(--text-muted)' }}>Manage inventory levels and view transaction history.</p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          
          {/* Quick Stock Update Panel */}
          <div className="glass-panel" style={{ padding: '24px', alignSelf: 'start' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '20px' }}>Active Products</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '500px', overflowY: 'auto', paddingRight: '8px' }}>
              {products.length === 0 ? <p style={{ color: 'var(--text-muted)' }}>No active products available.</p> : null}
              {products.map(prod => (
                <div key={prod.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: 'rgba(255,255,255,0.4)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: '600', color: 'var(--text-main)' }}>{prod.name}</h4>
                    <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-muted)' }}>Current Stock: <strong style={{ color: prod.quantity <= prod.minStock ? 'var(--danger)' : 'var(--success)' }}>{prod.quantity} {prod.unit || ''}</strong></p>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button 
                      onClick={() => setStockModal({ open: true, product: prod, type: 'in' })}
                      style={{ background: 'rgba(72, 94, 48, 0.1)', color: 'var(--success)', border: '1px solid var(--success)', borderRadius: '6px', padding: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      title="Stock In"
                    >
                      <FiPlusCircle size={18} />
                    </button>
                    <button 
                      onClick={() => setStockModal({ open: true, product: prod, type: 'out' })}
                      style={{ background: 'rgba(140, 67, 81, 0.1)', color: 'var(--danger)', border: '1px solid var(--danger)', borderRadius: '6px', padding: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      title="Stock Out"
                      disabled={prod.quantity <= 0}
                    >
                      <FiMinusCircle size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Transaction History */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', margin: 0 }}>Transaction History</h3>
              <FiRefreshCw color="var(--text-muted)" />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '500px', overflowY: 'auto' }}>
              {transactions.length === 0 ? <p style={{ color: 'var(--text-muted)' }}>No transactions recorded yet.</p> : null}
              {transactions.map(t => (
                <div key={t.id} style={{ padding: '16px', borderBottom: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontWeight: '600', color: 'var(--text-main)' }}>{t.productName}</span>
                    <span className="badge" style={{ background: t.type === 'Stock In' ? 'rgba(72, 94, 48, 0.1)' : 'rgba(140, 67, 81, 0.1)', color: t.type === 'Stock In' ? 'var(--success)' : 'var(--danger)' }}>
                      {t.type} {t.type === 'Stock In' ? `+${t.changedQuantity}` : `-${t.changedQuantity}`}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                    <span>{t.previousQuantity} → <strong>{t.newQuantity}</strong></span>
                    <span>{new Date(t.createdAt).toLocaleString()}</span>
                  </div>
                  {t.reason && <p style={{ margin: '8px 0 0 0', fontSize: '0.875rem', fontStyle: 'italic', color: 'var(--text-muted)' }}>"{t.reason}"</p>}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Stock Update Modal */}
      {stockModal.open && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(52, 59, 88, 0.6)', backdropFilter: 'blur(4px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div className="glass-panel animate-fade-in" style={{ width: '100%', maxWidth: '400px', background: 'var(--bg-card)', padding: '24px' }}>
            <h2 style={{ margin: '0 0 16px 0', fontSize: '1.25rem', color: stockModal.type === 'in' ? 'var(--success)' : 'var(--danger)' }}>
              {stockModal.type === 'in' ? 'Add Stock (Stock In)' : 'Remove Stock (Stock Out)'}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '20px' }}>
              Updating inventory for <strong>{stockModal.product.name}</strong>. (Current: {stockModal.product.quantity})
            </p>
            
            <form onSubmit={handleStockUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label className="label">Quantity</label>
                <input type="number" min="1" className="input-field" value={qty} onChange={e => setQty(e.target.value)} required />
              </div>
              <div>
                <label className="label">Reason (Optional)</label>
                <input type="text" className="input-field" value={reason} onChange={e => setReason(e.target.value)} placeholder={stockModal.type === 'in' ? 'e.g. New shipment arrived' : 'e.g. Damaged item'} />
              </div>
              <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                <button type="button" onClick={() => setStockModal({ open: false, product: null, type: 'in' })} style={{ flex: 1, padding: '10px', background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-main)', borderRadius: '8px', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" className="btn-primary" style={{ flex: 1, padding: '10px', background: stockModal.type === 'in' ? 'var(--success)' : 'var(--danger)' }}>Confirm</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

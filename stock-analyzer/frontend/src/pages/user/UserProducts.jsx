import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/layout/Sidebar';
import { database } from '../../firebase';
import { ref, onValue, push } from 'firebase/database';
import { FiSearch, FiFilter, FiImage, FiAlertCircle } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

export default function UserProducts() {
  const { currentUser } = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [requestModal, setRequestModal] = useState({ open: false, product: null });
  const [reqQty, setReqQty] = useState(1);
  const [reqMessage, setReqMessage] = useState('');

  useEffect(() => {
    const productsRef = ref(database, 'products');
    onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setProducts(Object.keys(data).map(key => ({ id: key, ...data[key] })).filter(p => p.active));
      } else {
        setProducts([]);
      }
    });

    const categoriesRef = ref(database, 'categories');
    onValue(categoriesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setCategories(Object.keys(data).map(key => ({ id: key, ...data[key] })).filter(c => c.active));
      }
    });
  }, []);

  const getCategoryName = (id) => {
    const cat = categories.find(c => c.id === id);
    return cat ? cat.name : 'Unknown';
  };

  const filteredProducts = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase());
    const matchCat = selectedCategory ? p.categoryId === selectedCategory : true;
    return matchSearch && matchCat;
  });

  const handleRequestStock = async (e) => {
    e.preventDefault();
    if (!requestModal.product) return;
    
    await push(ref(database, 'stockRequests'), {
      productId: requestModal.product.id,
      productName: requestModal.product.name,
      userId: currentUser.uid,
      userName: currentUser.displayName,
      quantity: Number(reqQty),
      message: reqMessage,
      status: 'Pending',
      createdAt: new Date().toISOString()
    });
    
    alert("Stock request submitted successfully!");
    setRequestModal({ open: false, product: null });
    setReqQty(1);
    setReqMessage('');
  };

  return (
    <div className="app-container">
      <Sidebar role="user" />
      
      <div className="main-content">
        <header style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '4px' }}>Browse Products</h1>
          <p style={{ color: 'var(--text-muted)' }}>View available products and request stock if needed.</p>
        </header>

        <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: '1', minWidth: '250px' }}>
            <FiSearch style={{ position: 'absolute', top: '14px', left: '16px', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              className="input-field" 
              style={{ paddingLeft: '44px' }} 
              placeholder="Search by name or SKU..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div style={{ position: 'relative', width: '250px' }}>
            <FiFilter style={{ position: 'absolute', top: '14px', left: '16px', color: 'var(--text-muted)' }} />
            <select 
              className="input-field" 
              style={{ paddingLeft: '44px', appearance: 'none' }}
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
          {filteredProducts.map(prod => (
            <div key={prod.id} className="glass-panel" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: '160px', background: 'rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {prod.imageUrl ? (
                  <img src={prod.imageUrl} alt={prod.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <FiImage size={40} color="var(--text-muted)" />
                )}
              </div>
              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '600' }}>{prod.name}</h3>
                  <span style={{ fontWeight: '700', color: 'var(--primary)' }}>${prod.price.toFixed(2)}</span>
                </div>
                <p style={{ margin: '0 0 16px 0', fontSize: '0.875rem', color: 'var(--text-muted)' }}>{getCategoryName(prod.categoryId)} • SKU: {prod.sku}</p>
                
                <div style={{ marginTop: 'auto', borderTop: '1px solid var(--border-color)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {prod.quantity > 0 ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--success)', fontWeight: '500', fontSize: '0.875rem' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--success)' }}></div>
                      In Stock ({prod.quantity})
                    </div>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--danger)', fontWeight: '500', fontSize: '0.875rem' }}>
                      <FiAlertCircle /> Out of Stock
                    </div>
                  )}
                  
                  {prod.quantity <= 0 && (
                    <button 
                      onClick={() => setRequestModal({ open: true, product: prod })}
                      style={{ background: 'var(--primary)', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: '600' }}
                    >
                      Request Stock
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
          {filteredProducts.length === 0 && (
            <div style={{ gridColumn: '1 / -1', padding: '60px 20px', textAlign: 'center', color: 'var(--text-muted)' }}>
              <FiSearch size={40} style={{ marginBottom: '16px', opacity: 0.5 }} />
              <p>No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>

      {requestModal.open && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(4px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div className="glass-panel animate-fade-in" style={{ width: '100%', maxWidth: '400px', background: 'var(--bg-card)', padding: '24px' }}>
            <h2 style={{ margin: '0 0 16px 0', fontSize: '1.25rem' }}>Request Stock</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '20px' }}>
              Requesting stock for <strong>{requestModal.product.name}</strong>.
            </p>
            
            <form onSubmit={handleRequestStock} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label className="label">Quantity Needed</label>
                <input type="number" min="1" className="input-field" value={reqQty} onChange={e => setReqQty(e.target.value)} required />
              </div>
              <div>
                <label className="label">Message (Optional)</label>
                <textarea className="input-field" rows="3" value={reqMessage} onChange={e => setReqMessage(e.target.value)} placeholder="Why do you need this?" />
              </div>
              <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                <button type="button" onClick={() => setRequestModal({ open: false, product: null })} style={{ flex: 1, padding: '10px', background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-main)', borderRadius: '8px', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" className="btn-primary" style={{ flex: 1, padding: '10px' }}>Submit Request</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

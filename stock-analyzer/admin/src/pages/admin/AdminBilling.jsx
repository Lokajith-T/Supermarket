import React, { useState, useEffect, useRef } from 'react';
import Sidebar from '../../components/layout/Sidebar';
import { database } from '../../firebase';
import { ref, onValue, push, update, get } from 'firebase/database';
import { FiSearch, FiShoppingCart, FiPlus, FiMinus, FiTrash2, FiCheck, FiPrinter, FiUser, FiPhone, FiMail } from 'react-icons/fi';

export default function AdminBilling() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productsMap, setProductsMap] = useState({});

  // Checkout Modal State
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [buyerDetails, setBuyerDetails] = useState({ name: '', mobile: '', email: '' });

  // Success / Bill Modal State
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [generatedBill, setGeneratedBill] = useState(null);

  useEffect(() => {
    const prodRef = ref(database, 'products');
    const unsub = onValue(prodRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const prodList = Object.keys(data).map(key => ({ id: key, ...data[key] })).filter(p => p.active);
        setProducts(prodList);
        
        const map = {};
        prodList.forEach(p => map[p.id] = p);
        setProductsMap(map);
      } else {
        setProducts([]);
        setProductsMap({});
      }
    });
    return () => unsub();
  }, []);

  const addToCart = (product) => {
    if (product.quantity <= 0) return alert("This product is out of stock!");
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        if (existing.cartQty >= product.quantity) return alert("Not enough stock available!") || prev;
        return prev.map(item => item.id === product.id ? { ...item, cartQty: item.cartQty + 1 } : item);
      }
      return [...prev, { ...product, cartQty: 1 }];
    });
  };

  const updateCartQty = (id, delta) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.id === id) {
          const newQty = item.cartQty + delta;
          if (newQty > item.quantity) return alert("Not enough stock available!") || item;
          if (newQty <= 0) return null;
          return { ...item, cartQty: newQty };
        }
        return item;
      }).filter(Boolean);
    });
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(item => item.id !== id));

  const processCheckout = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return;
    setLoading(true);

    try {
      const updates = {};
      const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.cartQty), 0);
      const createdAt = new Date().toISOString();

      // Check for existing customer or create a new one
      const usersSnap = await get(ref(database, 'users'));
      let customerFound = false;
      let customerId = null;
      
      if (usersSnap.exists()) {
        const allUsers = usersSnap.val();
        for (const uid in allUsers) {
          const u = allUsers[uid];
          // Check if mobile matches OR email matches (and isn't empty)
          if ((buyerDetails.mobile && u.mobile === buyerDetails.mobile) || 
              (buyerDetails.email && u.email && u.email === buyerDetails.email)) {
            customerFound = true;
            customerId = uid;
            
            // Optionally, update name if it was empty before
            if (!u.name && buyerDetails.name) {
              updates[`/users/${uid}/name`] = buyerDetails.name;
            }
            break;
          }
        }
      }

      if (!customerFound && (buyerDetails.mobile || buyerDetails.email)) {
        // Create new customer record so they appear in User Logs
        const newCustomerRef = push(ref(database, 'users'));
        customerId = newCustomerRef.key;
        updates[`/users/${customerId}`] = {
          name: buyerDetails.name,
          mobile: buyerDetails.mobile,
          email: buyerDetails.email || '',
          role: 'user', // Register them as a standard user/customer
          source: 'pos_walkin', // Tag them as created from POS
          createdAt
        };
      }

      // 1. Create Billing Log
      const billRef = push(ref(database, 'billingLogs'));
      const billData = {
        id: billRef.key,
        buyer: { ...buyerDetails, customerId },
        items: cart.map(item => ({
          productId: item.id,
          name: item.name,
          unit: item.unit || 'PIECE',
          packSize: item.packSize || '',
          price: item.price,
          qty: item.cartQty,
          subtotal: item.price * item.cartQty
        })),
        totalAmount,
        createdAt
      };
      
      updates[`/billingLogs/${billRef.key}`] = billData;

      // 2. Deduct Stock & Create Stock Transaction Logs
      cart.forEach(item => {
        updates[`/products/${item.id}/quantity`] = item.quantity - item.cartQty;
        const transRef = push(ref(database, 'stockTransactions')).key;
        updates[`/stockTransactions/${transRef}`] = {
          productId: item.id,
          productName: item.name,
          type: 'Stock Out',
          changedQuantity: item.cartQty,
          unit: item.unit || 'PIECE',
          previousQuantity: item.quantity,
          newQuantity: item.quantity - item.cartQty,
          reason: `Billing Sale to ${buyerDetails.name}`,
          createdAt
        };
      });

      await update(ref(database), updates);
      
      // Show Success Modal
      setGeneratedBill(billData);
      setIsCheckoutModalOpen(false);
      setIsSuccessModalOpen(true);
      
      // Reset cart and form
      setCart([]);
      setBuyerDetails({ name: '', mobile: '', email: '' });
    } catch (error) {
      console.error(error);
      alert('Error processing bill.');
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    const printContent = document.getElementById('printable-bill');
    const windowPrint = window.open('', '', 'width=800,height=600');
    windowPrint.document.write(`
      <html>
        <head>
          <title>Print Bill</title>
          <style>
            body { font-family: 'Courier New', Courier, monospace; padding: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border-bottom: 1px dashed #ccc; padding: 8px 0; text-align: left; }
            th { text-transform: uppercase; font-size: 12px; }
            .right { text-align: right; }
            .total { font-weight: bold; font-size: 1.2em; border-top: 2px dashed #000; margin-top: 20px; padding-top: 10px; display: flex; justify-content: space-between; }
            .header { text-align: center; margin-bottom: 30px; border-bottom: 2px dashed #000; padding-bottom: 10px; }
          </style>
        </head>
        <body>
          ${printContent.innerHTML}
        </body>
      </html>
    `);
    windowPrint.document.close();
    windowPrint.focus();
    setTimeout(() => {
      windowPrint.print();
      windowPrint.close();
    }, 250);
  };

  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.sku?.toLowerCase().includes(search.toLowerCase()));
  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.cartQty), 0);

  return (
    <div className="app-container">
      <Sidebar role="admin" />
      
      <div className="main-content">
        <header style={{ marginBottom: '24px' }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '4px' }}>Billing Dashboard (POS)</h1>
          <p style={{ color: 'var(--text-muted)' }}>Create bills and automatically deduct stock.</p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', height: 'calc(100vh - 120px)' }}>
          
          {/* Left: Product Selection */}
          <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ padding: '20px', borderBottom: '1px solid var(--border-color)' }}>
              <div style={{ position: 'relative' }}>
                <FiSearch style={{ position: 'absolute', top: '14px', left: '16px', color: 'var(--text-muted)' }} />
                <input 
                  type="text" 
                  className="input-field" 
                  style={{ paddingLeft: '44px' }} 
                  placeholder="Search products by name or SKU..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <div style={{ padding: '20px', overflowY: 'auto', flex: 1, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '16px', alignContent: 'start' }}>
              {filteredProducts.map(product => (
                <div 
                  key={product.id} 
                  onClick={() => addToCart(product)}
                  style={{ 
                    border: '1px solid var(--border-color)', 
                    borderRadius: '12px', 
                    padding: '16px', 
                    cursor: product.quantity > 0 ? 'pointer' : 'not-allowed', 
                    background: 'var(--bg-dark)',
                    opacity: product.quantity > 0 ? 1 : 0.5,
                    transition: 'all 0.2s',
                    position: 'relative'
                  }}
                  onMouseOver={(e) => product.quantity > 0 && (e.currentTarget.style.borderColor = 'var(--primary)')}
                  onMouseOut={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
                >
                  <h4 style={{ margin: '0 0 8px 0', fontSize: '1rem', color: 'var(--text-main)', lineHeight: '1.3' }}>{product.name}</h4>
                  <p style={{ color: 'var(--success)', fontWeight: '600', margin: '0 0 8px 0' }}>₹{product.price}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.875rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Stock: {product.quantity} {product.unit || 'PIECE'}</span>
                  </div>
                  {product.quantity <= 0 && (
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '12px', color: 'white', fontWeight: 'bold' }}>
                      Out of Stock
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Cart / Current Bill */}
          <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ padding: '20px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <FiShoppingCart size={20} color="var(--primary)" />
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '600' }}>Current Bill</h3>
            </div>

            <div style={{ padding: '20px', flex: 1, overflowY: 'auto' }}>
              {cart.length === 0 ? (
                <div style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '40px' }}>
                  No items added to the bill yet.
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {cart.map(item => (
                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px dashed var(--border-color)', paddingBottom: '16px' }}>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ margin: '0 0 4px 0', fontSize: '0.95rem', color: 'var(--text-main)' }}>{item.name} {item.packSize ? `(${item.packSize})` : ''}</h4>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px' }}>
                          <button onClick={() => updateCartQty(item.id, -1)} style={{ background: 'var(--bg-dark)', border: '1px solid var(--border-color)', color: 'white', width: '28px', height: '28px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FiMinus size={14} /></button>
                          <span style={{ fontWeight: '600', width: '40px', textAlign: 'center' }}>{item.cartQty} {item.unit}</span>
                          <button onClick={() => updateCartQty(item.id, 1)} style={{ background: 'var(--bg-dark)', border: '1px solid var(--border-color)', color: 'white', width: '28px', height: '28px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FiPlus size={14} /></button>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <p style={{ margin: '0 0 8px 0', fontWeight: '600', color: 'var(--text-main)' }}>₹{(item.price * item.cartQty).toFixed(2)}</p>
                        <button onClick={() => removeFromCart(item.id)} style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer', padding: '4px' }}>
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={{ padding: '24px', background: 'rgba(0,0,0,0.2)', borderTop: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: 'var(--text-muted)' }}>
                <span>Subtotal</span>
                <span>₹{totalAmount.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', color: 'var(--text-main)', fontWeight: '700', fontSize: '1.5rem' }}>
                <span>Total</span>
                <span>₹{totalAmount.toFixed(2)}</span>
              </div>
              
              <button 
                onClick={() => setIsCheckoutModalOpen(true)}
                disabled={cart.length === 0 || loading}
                className="btn-primary" 
                style={{ width: '100%', padding: '16px', fontSize: '1.1rem', justifyContent: 'center', background: cart.length > 0 ? 'var(--success)' : 'var(--border-color)', color: 'white' }}
              >
                {loading ? 'Processing...' : <><FiCheck /> Complete & Generate Bill</>}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Details Modal */}
      {isCheckoutModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(52, 59, 88, 0.6)', backdropFilter: 'blur(4px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div className="glass-panel animate-fade-in" style={{ width: '100%', maxWidth: '400px', background: 'var(--bg-card)', padding: '32px' }}>
            <h2 style={{ margin: '0 0 8px 0', fontSize: '1.5rem', color: 'var(--text-main)' }}>Buyer Details</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', margin: '0 0 24px 0' }}>Enter customer information for the bill.</p>
            
            <form onSubmit={processCheckout} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label className="label">Full Name</label>
                <div style={{ position: 'relative' }}>
                  <FiUser style={{ position: 'absolute', top: '14px', left: '16px', color: 'var(--text-muted)' }} />
                  <input type="text" className="input-field" style={{ paddingLeft: '44px' }} value={buyerDetails.name} onChange={e => setBuyerDetails({...buyerDetails, name: e.target.value})} required placeholder="John Doe" />
                </div>
              </div>
              
              <div>
                <label className="label">Mobile Number</label>
                <div style={{ position: 'relative' }}>
                  <FiPhone style={{ position: 'absolute', top: '14px', left: '16px', color: 'var(--text-muted)' }} />
                  <input type="tel" className="input-field" style={{ paddingLeft: '44px' }} value={buyerDetails.mobile} onChange={e => setBuyerDetails({...buyerDetails, mobile: e.target.value})} required placeholder="+1 234 567 890" />
                </div>
              </div>

              <div>
                <label className="label">Email Address (Optional)</label>
                <div style={{ position: 'relative' }}>
                  <FiMail style={{ position: 'absolute', top: '14px', left: '16px', color: 'var(--text-muted)' }} />
                  <input type="email" className="input-field" style={{ paddingLeft: '44px' }} value={buyerDetails.email} onChange={e => setBuyerDetails({...buyerDetails, email: e.target.value})} placeholder="john@example.com" />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                <button type="button" onClick={() => setIsCheckoutModalOpen(false)} style={{ flex: 1, padding: '12px', background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-main)', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>Cancel</button>
                <button type="submit" disabled={loading} className="btn-primary" style={{ flex: 1, padding: '12px', justifyContent: 'center', background: 'var(--success)' }}>
                  {loading ? 'Processing...' : 'Confirm & Bill'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Success / Print Bill Modal */}
      {isSuccessModalOpen && generatedBill && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(52, 59, 88, 0.6)', backdropFilter: 'blur(4px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '20px' }}>
          <div className="glass-panel animate-fade-in" style={{ width: '100%', maxWidth: '400px', background: 'var(--bg-card)', padding: '32px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={{ width: '60px', height: '60px', background: 'rgba(72, 94, 48, 0.1)', color: 'var(--success)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
                <FiCheck size={30} />
              </div>
              <h2 style={{ margin: '0 0 8px 0', fontSize: '1.5rem', color: 'var(--text-main)' }}>Payment Successful!</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', margin: 0 }}>The bill has been generated.</p>
            </div>
            
            <div id="printable-bill" style={{ background: '#fff', padding: '20px', borderRadius: '8px', color: '#000', marginBottom: '24px', fontSize: '14px', fontFamily: 'monospace' }}>
              <div className="header" style={{ textAlign: 'center', marginBottom: '20px', borderBottom: '1px dashed #ccc', paddingBottom: '10px' }}>
                <h3 style={{ margin: '0 0 4px 0' }}>Grocery Supermarket</h3>
                <p style={{ margin: '0 0 4px 0', fontSize: '12px' }}>Receipt #{generatedBill.id.slice(-6).toUpperCase()}</p>
                <p style={{ margin: '0', fontSize: '12px' }}>{new Date(generatedBill.createdAt).toLocaleString()}</p>
              </div>
              <div style={{ marginBottom: '16px', fontSize: '12px' }}>
                <p style={{ margin: '2px 0' }}><strong>Customer:</strong> {generatedBill.buyer.name}</p>
                <p style={{ margin: '2px 0' }}><strong>Mobile:</strong> {generatedBill.buyer.mobile}</p>
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px dashed #ccc' }}>
                    <th style={{ textAlign: 'left', padding: '4px 0' }}>Item</th>
                    <th style={{ textAlign: 'center', padding: '4px 0' }}>Qty</th>
                    <th style={{ textAlign: 'right', padding: '4px 0' }}>Amt</th>
                  </tr>
                </thead>
                <tbody>
                  {generatedBill.items.map((item, idx) => (
                    <tr key={idx}>
                      <td style={{ padding: '4px 0' }}>{item.name} {item.packSize ? `(${item.packSize})` : ''}</td>
                      <td style={{ textAlign: 'center', padding: '4px 0' }}>{item.qty} {item.unit || ''}</td>
                      <td style={{ textAlign: 'right', padding: '4px 0' }}>₹{item.subtotal.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="total" style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px dashed #000', marginTop: '16px', paddingTop: '10px', fontWeight: 'bold' }}>
                <span>TOTAL</span>
                <span>₹{generatedBill.totalAmount.toFixed(2)}</span>
              </div>
              <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '12px' }}>
                <p style={{ margin: 0 }}>Thank you for shopping with us!</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => setIsSuccessModalOpen(false)} style={{ flex: 1, padding: '12px', background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-main)', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>Close</button>
              <button onClick={handlePrint} className="btn-primary" style={{ flex: 1, padding: '12px', justifyContent: 'center' }}>
                <FiPrinter /> Print Bill
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

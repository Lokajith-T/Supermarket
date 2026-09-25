import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/layout/Sidebar';
import { database } from '../../firebase';
import { ref, onValue, push, update, remove } from 'firebase/database';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiImage } from 'react-icons/fi';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({ 
    id: null, name: '', sku: '', categoryId: '', price: '', quantity: 0, minStock: 10, active: true, imageUrl: '', unit: 'PIECE', packSize: '' 
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch Products
    const productsRef = ref(database, 'products');
    onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setProducts(Object.keys(data).map(key => ({ id: key, ...data[key] })));
      } else {
        setProducts([]);
      }
    });

    // Fetch Categories
    const categoriesRef = ref(database, 'categories');
    onValue(categoriesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setCategories(Object.keys(data).map(key => ({ id: key, ...data[key] })));
      } else {
        setCategories([]);
      }
    });
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (currentProduct.id) {
        // Update
        const updates = {};
        updates['/products/' + currentProduct.id] = {
          name: currentProduct.name,
          sku: currentProduct.sku,
          categoryId: currentProduct.categoryId,
          price: Number(currentProduct.price),
          quantity: Number(currentProduct.quantity),
          minStock: Number(currentProduct.minStock),
          active: currentProduct.active,
          imageUrl: currentProduct.imageUrl || '',
          unit: currentProduct.unit || 'PIECE',
          packSize: currentProduct.packSize || ''
        };
        await update(ref(database), updates);
      } else {
        // Create
        await push(ref(database, 'products'), {
          name: currentProduct.name,
          sku: currentProduct.sku,
          categoryId: currentProduct.categoryId,
          price: Number(currentProduct.price),
          quantity: Number(currentProduct.quantity),
          minStock: Number(currentProduct.minStock),
          active: currentProduct.active,
          imageUrl: currentProduct.imageUrl || '',
          unit: currentProduct.unit || 'PIECE',
          packSize: currentProduct.packSize || '',
          createdAt: new Date().toISOString()
        });
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving product: ", error);
      alert("Failed to save product.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await remove(ref(database, 'products/' + id));
    }
  };

  const openNewModal = () => {
    setCurrentProduct({ id: null, name: '', sku: '', categoryId: '', price: '', quantity: 0, minStock: 10, active: true, imageUrl: '', unit: 'PIECE', packSize: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (prod) => {
    setCurrentProduct(prod);
    setIsModalOpen(true);
  };

  const getCategoryName = (id) => {
    const cat = categories.find(c => c.id === id);
    return cat ? cat.name : 'Unknown';
  };

  const getStockStatus = (qty, min) => {
    if (qty <= 0) return <span className="badge badge-danger">Out of Stock</span>;
    if (qty <= min) return <span className="badge badge-warning">Low Stock</span>;
    return <span className="badge badge-success">In Stock</span>;
  };

  const seedProducts = async () => {
    if (!window.confirm("This will add 150+ products. Proceed?")) return;
    if (categories.length === 0) return alert("Please seed/add categories first!");

    setLoading(true);
    const rawProducts = {
      "🍚 Rice & Grains": ["Rice", "Brown Rice", "Basmati Rice", "Idli Rice", "Raw Rice", "Wheat", "Rava / Sooji", "Poha", "Millets"],
      "🌾 Dals & Pulses": ["Toor Dal", "Moong Dal", "Urad Dal", "Chana Dal", "Masoor Dal", "Green Gram", "Black Gram", "Chickpeas", "Rajma"],
      "🌶️ Spices & Masala": ["Turmeric Powder", "Chilli Powder", "Coriander Powder", "Cumin", "Pepper", "Mustard Seeds", "Garam Masala", "Sambar Powder", "Rasam Powder", "Biryani Masala", "Curry Masala"],
      "🛢️ Cooking Oils & Ghee": ["Sunflower Oil", "Groundnut Oil", "Coconut Oil", "Gingelly Oil", "Mustard Oil", "Rice Bran Oil", "Olive Oil", "Ghee", "Vanaspati"],
      "🍪 Biscuits & Snacks": ["Biscuits", "Cookies", "Chips", "Namkeen", "Mixture", "Popcorn", "Nuts", "Peanuts", "Crackers"],
      "🥤 Beverages": ["Tea", "Coffee", "Health Drinks", "Soft Drinks", "Fruit Juices", "Energy Drinks", "Packaged Water", "Milkshakes", "Instant Drink Mixes"],
      "🥛 Dairy & Milk Products": ["Milk", "Curd", "Buttermilk", "Paneer", "Butter", "Cheese", "Cream", "Flavoured Milk", "Milk-based Drinks"],
      "🍞 Bakery & Breakfast": ["Bread", "Buns", "Cakes", "Rusk", "Jam", "Honey", "Peanut Butter", "Corn Flakes", "Muesli", "Oats"],
      "🍫 Chocolates & Sweets": ["Chocolates", "Candies", "Toffees", "Lollipops", "Indian Sweets", "Ice Cream", "Desserts"],
      "🥫 Packaged & Ready-to-Eat Foods": ["Instant Noodles", "Pasta", "Vermicelli", "Ready-to-Eat Meals", "Canned Food", "Pickles", "Papad", "Sauces", "Ketchup", "Mayonnaise"],
      "🧂 Salt, Sugar & Essentials": ["Sugar", "Salt", "Jaggery", "Rock Salt", "Baking Soda", "Baking Powder", "Vinegar"],
      "🥬 Fresh Vegetables": ["Onion", "Tomato", "Potato", "Carrot", "Beans", "Brinjal", "Cabbage", "Cauliflower", "Green Chilli", "Ginger", "Garlic", "Leafy Vegetables"],
      "🍎 Fruits": ["Apple", "Banana", "Orange", "Mango", "Grapes", "Watermelon", "Papaya", "Pomegranate", "Guava", "Pineapple"],
      "🧴 Personal Care": ["Bath Soap", "Shampoo", "Conditioner", "Toothpaste", "Toothbrush", "Face Wash", "Hair Oil", "Deodorant", "Shaving Products", "Hand Wash"],
      "🧹 Home Cleaning": ["Dishwash Liquid", "Laundry Detergent", "Floor Cleaner", "Toilet Cleaner", "Glass Cleaner", "Bleach", "Cleaning Brushes", "Sponges", "Garbage Bags"],
      "🧻 Household Essentials": ["Tissue Paper", "Toilet Paper", "Aluminium Foil", "Cling Film", "Paper Plates", "Paper Cups", "Disposable Items", "Matchboxes", "Candles"],
      "👶 Baby Care": ["Baby Diapers", "Baby Food", "Baby Soap", "Baby Shampoo", "Baby Lotion", "Baby Wipes", "Baby Powder"],
      "🐕 Pet Care": ["Dog Food", "Cat Food", "Pet Treats", "Pet Shampoo", "Pet Accessories"],
      "🥜 Dry Fruits & Nuts": ["Almonds", "Cashews", "Raisins", "Pistachios", "Walnuts", "Dates", "Dry Figs", "Mixed Dry Fruits"],
      "🧊 Frozen Foods": ["Frozen Vegetables", "Frozen Fruits", "Frozen Snacks", "Frozen Paratha", "Frozen Chicken", "Frozen Seafood", "Ice Cream"]
    };

    let count = 0;
    try {
      for (const [catName, prodList] of Object.entries(rawProducts)) {
        const cat = categories.find(c => c.name === catName);
        if (cat) {
          for (const prodName of prodList) {
            await push(ref(database, 'products'), {
              name: prodName,
              sku: 'GROC-' + Math.floor(1000 + Math.random() * 9000),
              categoryId: cat.id,
              price: Math.floor(Math.random() * (300 - 20 + 1)) + 20, // Random price between 20 and 300
              quantity: 10,
              minStock: 5,
              active: true,
              imageUrl: '',
              createdAt: new Date().toISOString()
            });
            count++;
          }
        }
      }
      alert(`Successfully added ${count} products!`);
    } catch (error) {
      console.error(error);
      alert('Error seeding products.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <Sidebar role="admin" />
      
      <div className="main-content">
        <header style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '4px' }}>Product Management</h1>
            <p style={{ color: 'var(--text-muted)' }}>Add, edit, and monitor your inventory products.</p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn-primary" onClick={seedProducts} style={{ padding: '10px 20px', background: 'var(--warning)', color: '#fff' }}>
              Seed Products
            </button>
            <button className="btn-primary" onClick={openNewModal} style={{ padding: '10px 20px' }}>
              <FiPlus /> Add Product
            </button>
          </div>
        </header>

        <div className="glass-panel" style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>
                <th style={{ padding: '16px 24px', color: 'var(--text-muted)', fontWeight: '600' }}>Product</th>
                <th style={{ padding: '16px 24px', color: 'var(--text-muted)', fontWeight: '600' }}>SKU</th>
                <th style={{ padding: '16px 24px', color: 'var(--text-muted)', fontWeight: '600' }}>Category</th>
                <th style={{ padding: '16px 24px', color: 'var(--text-muted)', fontWeight: '600' }}>Price</th>
                <th style={{ padding: '16px 24px', color: 'var(--text-muted)', fontWeight: '600' }}>Stock Status</th>
                <th style={{ padding: '16px 24px', color: 'var(--text-muted)', fontWeight: '600', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)' }}>No products found.</td>
                </tr>
              ) : products.map(prod => (
                <tr key={prod.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                        {prod.imageUrl ? <img src={prod.imageUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <FiImage color="var(--text-muted)" />}
                      </div>
                      <div>
                        <p style={{ margin: 0, fontWeight: '600' }}>{prod.name}</p>
                        <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>{!prod.active && '(Inactive)'}</p>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '16px 24px', color: 'var(--text-muted)' }}>{prod.sku}</td>
                  <td style={{ padding: '16px 24px' }}>{getCategoryName(prod.categoryId)}</td>
                  <td style={{ padding: '16px 24px', fontWeight: '500' }}>₹{prod.price.toFixed(2)}</td>
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {getStockStatus(prod.quantity, prod.minStock)}
                      <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                        ({prod.quantity} {prod.unit || 'PIECE'}{prod.packSize ? ` - ${prod.packSize}` : ''})
                      </span>
                    </div>
                  </td>
                  <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                      <button onClick={() => openEditModal(prod)} style={{ background: 'transparent', border: 'none', color: 'var(--primary)', cursor: 'pointer', padding: '4px' }}>
                        <FiEdit2 size={18} />
                      </button>
                      <button onClick={() => handleDelete(prod.id)} style={{ background: 'transparent', border: 'none', color: 'var(--danger)', cursor: 'pointer', padding: '4px' }}>
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(4px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div className="glass-panel animate-fade-in" style={{ width: '100%', maxWidth: '600px', background: 'var(--bg-card)', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ padding: '24px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ margin: 0, fontSize: '1.25rem' }}>{currentProduct.id ? 'Edit Product' : 'New Product'}</h2>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><FiX size={24} /></button>
            </div>
            
            <form onSubmit={handleSave} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label className="label">Product Name</label>
                  <input type="text" className="input-field" value={currentProduct.name} onChange={e => setCurrentProduct({...currentProduct, name: e.target.value})} required />
                </div>
                <div>
                  <label className="label">SKU</label>
                  <input type="text" className="input-field" value={currentProduct.sku} onChange={e => setCurrentProduct({...currentProduct, sku: e.target.value})} required />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label className="label">Category</label>
                  <select className="input-field" value={currentProduct.categoryId} onChange={e => setCurrentProduct({...currentProduct, categoryId: e.target.value})} required>
                    <option value="">Select a category</option>
                    {categories.filter(c => c.active).map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="label">Price (₹)</label>
                  <input type="number" step="0.01" min="0" className="input-field" value={currentProduct.price} onChange={e => setCurrentProduct({...currentProduct, price: e.target.value})} required />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label className="label">Current Quantity</label>
                  <input type="number" min="0" className="input-field" value={currentProduct.quantity} onChange={e => setCurrentProduct({...currentProduct, quantity: e.target.value})} required />
                </div>
                <div>
                  <label className="label">Minimum Stock Level</label>
                  <input type="number" min="0" className="input-field" value={currentProduct.minStock} onChange={e => setCurrentProduct({...currentProduct, minStock: e.target.value})} required />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label className="label">Measurement Unit</label>
                  <select className="input-field" value={currentProduct.unit || 'PIECE'} onChange={e => setCurrentProduct({...currentProduct, unit: e.target.value})} required>
                    <option value="KG">KG</option>
                    <option value="GRAM">GRAM</option>
                    <option value="LITRE">LITRE</option>
                    <option value="ML">ML</option>
                    <option value="PACKET">PACKET</option>
                    <option value="PACK">PACK</option>
                    <option value="BOTTLE">BOTTLE</option>
                    <option value="PIECE">PIECE</option>
                    <option value="DOZEN">DOZEN</option>
                    <option value="BOX">BOX</option>
                    <option value="TRAY">TRAY</option>
                    <option value="TIN">TIN</option>
                  </select>
                </div>
                <div>
                  <label className="label">Pack Size (Optional)</label>
                  <input type="text" className="input-field" value={currentProduct.packSize || ''} onChange={e => setCurrentProduct({...currentProduct, packSize: e.target.value})} placeholder="e.g. 5 KG, 650 ML, 30 pcs" />
                </div>
              </div>

              <div>
                <label className="label">Image URL (Optional)</label>
                <input type="url" className="input-field" value={currentProduct.imageUrl} onChange={e => setCurrentProduct({...currentProduct, imageUrl: e.target.value})} placeholder="https://..." />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input type="checkbox" id="active-prod" checked={currentProduct.active} onChange={e => setCurrentProduct({...currentProduct, active: e.target.checked})} style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }} />
                <label htmlFor="active-prod" style={{ color: 'var(--text-main)', cursor: 'pointer' }}>Product is Active</label>
              </div>
              
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '10px' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ padding: '10px 20px', background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-main)', borderRadius: '8px', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" disabled={loading} className="btn-primary" style={{ padding: '10px 20px' }}>
                  {loading ? 'Saving...' : 'Save Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

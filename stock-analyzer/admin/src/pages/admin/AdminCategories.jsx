import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/layout/Sidebar';
import { database } from '../../firebase';
import { ref, onValue, push, update, remove } from 'firebase/database';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiCheck } from 'react-icons/fi';

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState({ id: null, name: '', description: '', active: true });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const categoriesRef = ref(database, 'categories');
    onValue(categoriesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const catList = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        setCategories(catList);
      } else {
        setCategories([]);
      }
    });
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (currentCategory.id) {
        // Update
        const updates = {};
        updates['/categories/' + currentCategory.id] = {
          name: currentCategory.name,
          description: currentCategory.description,
          active: currentCategory.active
        };
        await update(ref(database), updates);
      } else {
        // Create
        await push(ref(database, 'categories'), {
          name: currentCategory.name,
          description: currentCategory.description,
          active: currentCategory.active,
          createdAt: new Date().toISOString()
        });
      }
      setIsModalOpen(false);
      setCurrentCategory({ id: null, name: '', description: '', active: true });
    } catch (error) {
      console.error("Error saving category: ", error);
      alert("Failed to save category.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      await remove(ref(database, 'categories/' + id));
    }
  };

  const openEditModal = (cat) => {
    setCurrentCategory(cat);
    setIsModalOpen(true);
  };

  const openNewModal = () => {
    setCurrentCategory({ id: null, name: '', description: '', active: true });
    setIsModalOpen(true);
  };

  const toggleStatus = async (cat) => {
    const updates = {};
    updates['/categories/' + cat.id + '/active'] = !cat.active;
    await update(ref(database), updates);
  };

  const seedCategories = async () => {
    if(!window.confirm('This will add 20 grocery categories. Proceed?')) return;
    const cats = [
      { name: "🍚 Rice & Grains", description: "Rice, Brown Rice, Basmati Rice, Idli Rice, Raw Rice, Wheat, Rava / Sooji, Poha, Millets", active: true },
      { name: "🌾 Dals & Pulses", description: "Toor Dal, Moong Dal, Urad Dal, Chana Dal, Masoor Dal, Green Gram, Black Gram, Chickpeas, Rajma", active: true },
      { name: "🌶️ Spices & Masala", description: "Turmeric Powder, Chilli Powder, Coriander Powder, Cumin, Pepper, Mustard Seeds, Garam Masala, Sambar Powder, Rasam Powder, Biryani Masala, Curry Masala", active: true },
      { name: "🛢️ Cooking Oils & Ghee", description: "Sunflower Oil, Groundnut Oil, Coconut Oil, Gingelly Oil, Mustard Oil, Rice Bran Oil, Olive Oil, Ghee, Vanaspati", active: true },
      { name: "🍪 Biscuits & Snacks", description: "Biscuits, Cookies, Chips, Namkeen, Mixture, Popcorn, Nuts, Peanuts, Crackers", active: true },
      { name: "🥤 Beverages", description: "Tea, Coffee, Health Drinks, Soft Drinks, Fruit Juices, Energy Drinks, Packaged Water, Milkshakes, Instant Drink Mixes", active: true },
      { name: "🥛 Dairy & Milk Products", description: "Milk, Curd, Buttermilk, Paneer, Butter, Cheese, Cream, Flavoured Milk, Milk-based Drinks", active: true },
      { name: "🍞 Bakery & Breakfast", description: "Bread, Buns, Cakes, Rusk, Jam, Honey, Peanut Butter, Corn Flakes, Muesli, Oats", active: true },
      { name: "🍫 Chocolates & Sweets", description: "Chocolates, Candies, Toffees, Lollipops, Indian Sweets, Ice Cream, Desserts", active: true },
      { name: "🥫 Packaged & Ready-to-Eat Foods", description: "Instant Noodles, Pasta, Vermicelli, Ready-to-Eat Meals, Canned Food, Pickles, Papad, Sauces, Ketchup, Mayonnaise", active: true },
      { name: "🧂 Salt, Sugar & Essentials", description: "Sugar, Salt, Jaggery, Rock Salt, Baking Soda, Baking Powder, Vinegar", active: true },
      { name: "🥬 Fresh Vegetables", description: "Onion, Tomato, Potato, Carrot, Beans, Brinjal, Cabbage, Cauliflower, Green Chilli, Ginger, Garlic, Leafy Vegetables", active: true },
      { name: "🍎 Fruits", description: "Apple, Banana, Orange, Mango, Grapes, Watermelon, Papaya, Pomegranate, Guava, Pineapple", active: true },
      { name: "🧴 Personal Care", description: "Bath Soap, Shampoo, Conditioner, Toothpaste, Toothbrush, Face Wash, Hair Oil, Deodorant, Shaving Products, Hand Wash", active: true },
      { name: "🧹 Home Cleaning", description: "Dishwash Liquid, Laundry Detergent, Floor Cleaner, Toilet Cleaner, Glass Cleaner, Bleach, Cleaning Brushes, Sponges, Garbage Bags", active: true },
      { name: "🧻 Household Essentials", description: "Tissue Paper, Toilet Paper, Aluminium Foil, Cling Film, Paper Plates, Paper Cups, Disposable Items, Matchboxes, Candles", active: true },
      { name: "👶 Baby Care", description: "Baby Diapers, Baby Food, Baby Soap, Baby Shampoo, Baby Lotion, Baby Wipes, Baby Powder", active: true },
      { name: "🐕 Pet Care", description: "Dog Food, Cat Food, Pet Treats, Pet Shampoo, Pet Accessories", active: true },
      { name: "🥜 Dry Fruits & Nuts", description: "Almonds, Cashews, Raisins, Pistachios, Walnuts, Dates, Dry Figs, Mixed Dry Fruits", active: true },
      { name: "🧊 Frozen Foods", description: "Frozen Vegetables, Frozen Fruits, Frozen Snacks, Frozen Paratha, Frozen Chicken, Frozen Seafood, Ice Cream", active: true }
    ];
    for (const cat of cats) {
      await push(ref(database, 'categories'), { ...cat, createdAt: new Date().toISOString() });
    }
    alert('Categories seeded successfully!');
  };

  return (
    <div className="app-container">
      <Sidebar role="admin" />
      
      <div className="main-content">
        <header style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '4px' }}>Category Management</h1>
            <p style={{ color: 'var(--text-muted)' }}>Manage product categories and classifications.</p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn-primary" onClick={seedCategories} style={{ padding: '10px 20px', background: 'var(--warning)', color: '#fff' }}>
              Seed 20 Categories
            </button>
            <button className="btn-primary" onClick={openNewModal} style={{ padding: '10px 20px' }}>
              <FiPlus /> Add Category
            </button>
          </div>
        </header>

        <div className="glass-panel" style={{ overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>
                <th style={{ padding: '16px 24px', color: 'var(--text-muted)', fontWeight: '600' }}>Name</th>
                <th style={{ padding: '16px 24px', color: 'var(--text-muted)', fontWeight: '600' }}>Description</th>
                <th style={{ padding: '16px 24px', color: 'var(--text-muted)', fontWeight: '600' }}>Status</th>
                <th style={{ padding: '16px 24px', color: 'var(--text-muted)', fontWeight: '600', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)' }}>No categories found. Click "Add Category" to create one.</td>
                </tr>
              ) : categories.map(cat => (
                <tr key={cat.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '16px 24px', fontWeight: '500' }}>{cat.name}</td>
                  <td style={{ padding: '16px 24px', color: 'var(--text-muted)' }}>{cat.description}</td>
                  <td style={{ padding: '16px 24px' }}>
                    <button 
                      onClick={() => toggleStatus(cat)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                    >
                      <span className="badge" style={{ 
                        background: cat.active ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)', 
                        color: cat.active ? 'var(--success)' : 'var(--danger)' 
                      }}>
                        {cat.active ? 'Active' : 'Inactive'}
                      </span>
                    </button>
                  </td>
                  <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                      <button onClick={() => openEditModal(cat)} style={{ background: 'transparent', border: 'none', color: 'var(--primary)', cursor: 'pointer', padding: '4px' }}>
                        <FiEdit2 size={18} />
                      </button>
                      <button onClick={() => handleDelete(cat.id)} style={{ background: 'transparent', border: 'none', color: 'var(--danger)', cursor: 'pointer', padding: '4px' }}>
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

      {/* Modal */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(4px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div className="glass-panel animate-fade-in" style={{ width: '100%', maxWidth: '500px', background: 'var(--bg-card)' }}>
            <div style={{ padding: '24px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ margin: 0, fontSize: '1.25rem' }}>{currentCategory.id ? 'Edit Category' : 'New Category'}</h2>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><FiX size={24} /></button>
            </div>
            <form onSubmit={handleSave} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label className="label">Category Name</label>
                <input 
                  type="text" 
                  className="input-field" 
                  value={currentCategory.name} 
                  onChange={e => setCurrentCategory({...currentCategory, name: e.target.value})} 
                  required 
                  placeholder="e.g. Electronics"
                />
              </div>
              <div>
                <label className="label">Description (Optional)</label>
                <textarea 
                  className="input-field" 
                  rows="3" 
                  value={currentCategory.description} 
                  onChange={e => setCurrentCategory({...currentCategory, description: e.target.value})}
                  placeholder="Brief description of this category..."
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input 
                  type="checkbox" 
                  id="active-check"
                  checked={currentCategory.active}
                  onChange={e => setCurrentCategory({...currentCategory, active: e.target.checked})}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }}
                />
                <label htmlFor="active-check" style={{ color: 'var(--text-main)', cursor: 'pointer' }}>Category is Active</label>
              </div>
              
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '10px' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ padding: '10px 20px', background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-main)', borderRadius: '8px', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" disabled={loading} className="btn-primary" style={{ padding: '10px 20px' }}>
                  {loading ? 'Saving...' : (currentCategory.id ? 'Update Category' : 'Create Category')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

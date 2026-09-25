import { useMemo, useState, useEffect } from 'react';
import { useSearch } from '@tanstack/react-router';
import { Filter, SlidersHorizontal, Star } from 'lucide-react';
import CustomerLayout from '@/components/layout/CustomerLayout';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import SearchBar from '@/components/ui/SearchBar';
import Select from '@/components/ui/Select';
import Badge from '@/components/ui/Badge';
import { database } from '@/firebase';
import { ref, onValue } from 'firebase/database';
import { Product } from '@/types';
import { categories } from '@/data/mockData';

export default function ProductListPage() {
  const search = window.location.search;
  const urlCategory = new URLSearchParams(search).get('category');
  const urlQuery = new URLSearchParams(search).get('q') || '';
  
  const [query, setQuery] = useState(urlQuery);
  const [sortBy, setSortBy] = useState('recommended');
  const [firebaseProducts, setFirebaseProducts] = useState<Product[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(urlCategory ? [urlCategory] : []);
  const [maxPrice, setMaxPrice] = useState<number>(500);
  const [availability, setAvailability] = useState<string>('all');
  const [dbCategories, setDbCategories] = useState<typeof categories>([]);

  useEffect(() => {
    const categoriesRef = ref(database, 'categories');
    const unsub = onValue(categoriesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const catArray = Object.keys(data)
          .filter(key => data[key].active !== false)
          .map(key => {
            const item = data[key];
            const localMatch = categories.find(c => c.name === item.name);
            return {
              id: key,
              name: item.name,
              productCount: 0,
              icon: localMatch ? localMatch.icon : '📦',
              accent: localMatch ? localMatch.accent : 'bg-stone-100 text-stone-700',
              image: localMatch ? localMatch.image : 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=700&q=80'
            };
          });
        setDbCategories(catArray);
      } else {
        setDbCategories([]);
      }
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const productsRef = ref(database, 'products');
    const unsub = onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const prodArray: Product[] = Object.keys(data).map(key => {
          const item = data[key];
          // map to UI Product type
          const dbCat = dbCategories.find(c => c.id === item.categoryId);
          const cat = categories.find(c => c.name === item.categoryId || c.id === item.categoryId || (dbCat && c.name === dbCat.name));
          return {
            id: key,
            name: item.name,
            brand: 'Local', // stub
            description: item.name,
            price: item.price,
            unit: item.packSize ? `${item.packSize}` : item.unit || 'Piece',
            category: dbCat ? dbCat.name : (item.categoryId || 'Unknown'),
            stock: item.quantity || 0,
            rating: 4.5,
            image: item.imageUrl || (cat ? cat.image : 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80'),
            status: item.quantity <= 0 ? 'OUT OF STOCK' : (item.quantity <= (item.minStock || 5) ? 'LOW STOCK' : 'IN STOCK'),
            sku: item.sku || 'N/A'
          };
        });
        setFirebaseProducts(prodArray);
      } else {
        setFirebaseProducts([]);
      }
    });
    return () => unsub();
  }, [dbCategories]);

  const filteredProducts = useMemo(() => {
    const value = query.toLowerCase();
    const match = firebaseProducts.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(value) || product.category.toLowerCase().includes(value);
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const matchesPrice = product.price <= maxPrice;
      const matchesAvailability = availability === 'all' || product.status === availability;
      
      return matchesSearch && matchesCategory && matchesPrice && matchesAvailability;
    });
    if (sortBy === 'low') return [...match].sort((a, b) => a.price - b.price);
    if (sortBy === 'high') return [...match].sort((a, b) => b.price - a.price);
    return match;
  }, [query, sortBy, firebaseProducts, selectedCategories, maxPrice, availability]);

  return (
    <CustomerLayout>
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-emerald-600">Groceries</div>
            <h1 className="text-4xl font-black text-stone-900">Fresh essentials</h1>
          </div>
          <div className="text-sm text-stone-500">{filteredProducts.length} products available</div>
        </div>

        <div className="mb-8 flex flex-col gap-4 lg:flex-row">
          <div className="flex-1"><SearchBar value={query} onChange={setQuery} placeholder="Search groceries..." /></div>
          <div className="grid gap-3 md:grid-cols-3 lg:w-[420px]">
            <Select value="all" onChange={() => undefined} options={[{ label: 'All categories', value: 'all' }]} className="min-w-0" />
            <Select value="all" onChange={() => undefined} options={[{ label: 'All brands', value: 'all' }]} className="min-w-0" />
            <Select value={sortBy} onChange={setSortBy} options={[{ label: 'Recommended', value: 'recommended' }, { label: 'Price: Low to High', value: 'low' }, { label: 'Price: High to Low', value: 'high' }, { label: 'Newest', value: 'newest' }]} className="min-w-0" />
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          <aside className="hidden rounded-[28px] border border-stone-200 bg-white p-5 lg:block">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-lg font-bold text-stone-900">Filters</h3>
              <SlidersHorizontal className="h-4 w-4 text-stone-500" />
            </div>

            <div className="space-y-6">
              <div>
                <div className="mb-3 text-sm font-semibold text-stone-700">Category</div>
                <div className="space-y-2 text-sm text-stone-600">
                  {(dbCategories.length > 0 ? dbCategories : categories).map((category) => (
                    <label key={category.id} className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        checked={selectedCategories.includes(category.name)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedCategories([...selectedCategories, category.name]);
                          } else {
                            setSelectedCategories(selectedCategories.filter(c => c !== category.name));
                          }
                        }}
                        className="h-4 w-4 accent-emerald-600" 
                      />
                      {category.name}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <div className="mb-3 text-sm font-semibold text-stone-700">Price (Max: ₹{maxPrice})</div>
                <input 
                  type="range" 
                  min="0" 
                  max="500" 
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-emerald-600" 
                />
                <div className="mt-2 flex justify-between text-xs text-stone-500"><span>₹0</span><span>₹500</span></div>
              </div>

              <div>
                <div className="mb-3 text-sm font-semibold text-stone-700">Availability</div>
                <div className="space-y-2 text-sm text-stone-600">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="stock" checked={availability === 'all'} onChange={() => setAvailability('all')} className="accent-emerald-600" />
                    All
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="stock" checked={availability === 'IN STOCK'} onChange={() => setAvailability('IN STOCK')} className="accent-emerald-600" />
                    In stock
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="stock" checked={availability === 'LOW STOCK'} onChange={() => setAvailability('LOW STOCK')} className="accent-emerald-600" />
                    Low stock
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="stock" checked={availability === 'OUT OF STOCK'} onChange={() => setAvailability('OUT OF STOCK')} className="accent-emerald-600" />
                    Out of stock
                  </label>
                </div>
              </div>
            </div>
          </aside>

          <div>
            <div className="mb-4 flex items-center justify-between lg:hidden">
              <Button variant="secondary" className="flex items-center gap-2"><Filter className="h-4 w-4" /> Filters</Button>
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product) => (
                <div key={product.id} className="group overflow-hidden rounded-[28px] border border-stone-200 bg-white shadow-soft">
                  <div className="relative overflow-hidden">
                    <img src={product.image} alt={product.name} className="h-52 w-full object-cover transition duration-500 group-hover:scale-110" />
                    {product.discount && <span className="absolute left-3 top-3 rounded-full bg-orange-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-white">-{product.discount}%</span>}
                    <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-stone-700">{product.status}</span>
                  </div>
                  <div className="p-4">
                    <div className="mb-2 flex items-center justify-between text-xs text-stone-500">
                      <span>{product.brand}</span>
                      <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />{product.rating}</span>
                    </div>
                    <h3 className="text-xl font-bold text-stone-900">{product.name}</h3>
                    <div className="mt-3 flex items-end justify-between">
                      <div>
                        <div className="text-2xl font-black text-emerald-700">₹{product.price}</div>
                        <div className="text-xs text-stone-500">/{product.unit}</div>
                      </div>
                      <Badge variant={product.status === 'IN STOCK' ? 'success' : product.status === 'LOW STOCK' ? 'warning' : 'danger'}>{product.status}</Badge>
                    </div>
                    {/* Add/Cart Buttons Removed for Availability-Only Mode */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
}

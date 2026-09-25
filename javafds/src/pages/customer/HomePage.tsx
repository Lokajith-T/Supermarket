import { useState, useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowRight, BadgeCheck, ChevronRight, Clock3, Heart, Leaf, MapPin, Minus, Plus, ShieldCheck, ShoppingBag, ShoppingCart, Sparkles, Star, Truck, WalletCards } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import CustomerLayout from '@/components/layout/CustomerLayout';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import SearchBar from '@/components/ui/SearchBar';
import { categories, offers } from '@/data/mockData';
import { database } from '@/firebase';
import { ref, onValue, push } from 'firebase/database';
import { Product } from '@/types';

export default function HomePage() {
  const [showPromo, setShowPromo] = useState(true);
  const [firebaseProducts, setFirebaseProducts] = useState<Product[]>([]);
  const [dbCategories, setDbCategories] = useState<typeof categories>([]);

  useEffect(() => {
    fetch('https://supermarket-u9sm.onrender.com/api/categorys')
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          const catArray = data
            .filter((c: any) => c.active !== false)
            .map((item: any) => {
              const localMatch = categories.find(c => c.name === item.name);
              return {
                id: item.id,
                name: item.name,
                productCount: 0,
                icon: localMatch ? localMatch.icon : '📦',
                accent: localMatch ? localMatch.accent : 'bg-stone-100 text-stone-700',
                image: localMatch ? localMatch.image : 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=700&q=80'
              };
            });
          setDbCategories(catArray);
        } else {
          setDbCategories(categories); // fallback to local
        }
      })
      .catch(err => {
        console.error('Error fetching categories from Java backend:', err);
        setDbCategories(categories); // fallback
      });
  }, []);

  useEffect(() => {
    fetch('https://supermarket-u9sm.onrender.com/api/products')
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          const prodArray: Product[] = data.map((item: any) => {
            const dbCat = dbCategories.find(c => c.id === item.categoryId);
            const cat = categories.find(c => c.name === item.categoryId || c.id === item.categoryId || (dbCat && c.name === dbCat.name));
            return {
              id: item.id,
              name: item.name,
              brand: item.brand || 'Local',
              description: item.description || item.name,
              price: item.price,
              unit: item.packSize ? `${item.packSize}` : item.unit || 'Piece',
              category: dbCat ? dbCat.name : (item.categoryId || 'Unknown'),
              stock: item.quantity || 0,
              rating: item.rating || 4.5,
              image: item.imageUrl || item.image || (cat ? cat.image : 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80'),
              status: item.quantity <= 0 ? 'OUT OF STOCK' : (item.quantity <= (item.minStock || 5) ? 'LOW STOCK' : 'IN STOCK'),
              sku: item.sku || 'N/A'
            };
          });
          setFirebaseProducts(prodArray);
        } else {
          setFirebaseProducts([]);
        }
      })
      .catch(err => {
        console.error('Error fetching products from Java backend:', err);
        setFirebaseProducts([]);
      });
  }, [dbCategories]);

  const featured = firebaseProducts.slice(0, 5);
  const arrivals = firebaseProducts.slice(8, 14);
  const bestSellers = firebaseProducts.slice(4, 10);
  const latestOffers = offers.slice(0, 3);

  return (
    <CustomerLayout>
      <AnimatePresence>
        {showPromo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/40 p-4 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.96, y: 24 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96, y: 12 }} className="relative w-full max-w-2xl overflow-hidden rounded-[32px] border border-white/40 bg-white shadow-2xl">
              <button onClick={() => setShowPromo(false)} className="absolute right-4 top-4 z-10 rounded-full bg-white/80 p-2 text-stone-600">✕</button>
              <div className="grid md:grid-cols-[1.2fr_0.8fr]">
                <div className="bg-gradient-to-br from-emerald-500 via-emerald-600 to-lime-400 p-8 text-white">
                  <div className="mb-5 inline-flex rounded-full bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em]">New arrival</div>
                  <h2 className="mb-3 text-4xl font-black">Fresh Organic Honey</h2>
                  <p className="mb-6 max-w-sm text-sm text-emerald-50">Pure. Natural. Delicious. Sweetness you can trust from local harvests.</p>
                  <div className="flex gap-3">
                    <Link to="/products"><Button variant="secondary" className="bg-white text-emerald-700 hover:bg-emerald-50">View product</Button></Link>
                    <button className="rounded-xl border border-white/30 px-4 py-2.5 text-sm font-semibold text-white" onClick={() => setShowPromo(false)}>Close</button>
                  </div>
                </div>
                <div className="relative min-h-[260px] bg-stone-100">
                  <img src="https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=900&q=80" alt="honey" className="h-full w-full object-cover" />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">
        <section className="mb-10 overflow-hidden rounded-[32px] border border-stone-200 bg-gradient-to-r from-emerald-700 via-emerald-600 to-lime-500 p-6 text-white shadow-soft md:p-10">
          <div className="grid items-center gap-8 md:grid-cols-[1.2fr_0.8fr]">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]">
                <Leaf className="h-3.5 w-3.5" /> Fresh groceries
              </div>
              <h1 className="max-w-md text-4xl font-black md:text-5xl">Fresh groceries. Smarter shopping.</h1>
              <p className="mt-5 max-w-lg text-base text-emerald-50">Everything you need for your everyday life, with better prices and better rewards.</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link to="/products"><Button variant="secondary" className="border-white/20 bg-white text-emerald-700 hover:bg-emerald-50">Check Availability</Button></Link>
              </div>
              <div className="mt-8 flex flex-wrap gap-6 text-sm text-emerald-50">
                <div className="flex items-center gap-2"><Truck className="h-4 w-4" /> Fresh Stock Daily</div>
                <div className="flex items-center gap-2"><BadgeCheck className="h-4 w-4" /> Trusted quality</div>
              </div>
            </div>
            <div className="relative">
              <motion.img initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80" alt="Fresh grocery basket" className="h-[420px] w-full rounded-[28px] object-cover shadow-2xl" />
            </div>
          </div>
        </section>

        <section className="mb-12">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-600">Browse</p>
              <h2 className="text-3xl font-black text-stone-900">Shop by category</h2>
            </div>
            <Link to="/categories" className="flex items-center gap-1 text-sm font-semibold text-emerald-700">View all <ChevronRight className="h-4 w-4" /></Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {(dbCategories.length > 0 ? dbCategories : categories).map((category) => {
              const productCount = firebaseProducts.length > 0 
                ? firebaseProducts.filter(p => p.category === category.name).length 
                : category.productCount;
                
              return (
              <a href={`/products?category=${encodeURIComponent(category.name)}`} key={category.id} className="block">
                <motion.div whileHover={{ y: -4 }} className="group overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-soft">
                  <div className="relative h-40 overflow-hidden">
                    <img src={category.image} alt={category.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 to-transparent" />
                    <div className={`absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-2xl text-2xl ${category.accent}`}>{category.icon}</div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-stone-900">{category.name}</h3>
                    <p className="mt-1 text-sm text-stone-500">{productCount} products</p>
                  </div>
                </motion.div>
              </a>
            )})}
          </div>
        </section>

        <section className="mb-12">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-600">Popular picks</p>
              <h2 className="text-3xl font-black text-stone-900">Featured products</h2>
            </div>
            <Link to="/products" className="flex items-center gap-1 text-sm font-semibold text-emerald-700">View all <ChevronRight className="h-4 w-4" /></Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {featured.map((product) => (
              <motion.div key={product.id} whileHover={{ y: -6 }} className="group overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-soft">
                <div className="relative overflow-hidden">
                  <img src={product.image} alt={product.name} className="h-48 w-full object-cover transition duration-500 group-hover:scale-110" />
                  {product.discount && <div className="absolute left-3 top-3 rounded-full bg-orange-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-white">-{product.discount}%</div>}
                  <button className="absolute right-3 top-3 rounded-full bg-white/90 p-2 text-stone-700 shadow-md"><Heart className="h-4 w-4" /></button>
                </div>
                <div className="p-4">
                  <div className="mb-2 flex items-center justify-between text-xs text-stone-500">
                    <span>{product.brand}</span>
                    <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" /> {product.rating}</span>
                  </div>
                  <h3 className="text-lg font-bold text-stone-900">{product.name}</h3>
                  <div className="mt-3 flex items-end justify-between">
                    <div>
                      <div className="text-xl font-black text-stone-900">₹{product.price}</div>
                      <div className="text-xs text-stone-500">/{product.unit}</div>
                    </div>
                    <Badge variant={product.status === 'IN STOCK' ? 'success' : product.status === 'LOW STOCK' ? 'warning' : 'danger'}>{product.status}</Badge>
                  </div>
                  </div>
                  {/* Buttons removed for Availability-Only Mode */}
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-600">Fresh arrivals</p>
              <h2 className="text-3xl font-black text-stone-900">New arrivals</h2>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {arrivals.map((product) => (
              <Card key={product.id} className="overflow-hidden p-0">
                <div className="relative">
                  <img src={product.image} alt={product.name} className="h-52 w-full object-cover" />
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-stone-950/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                    <div>
                      <div className="text-xs uppercase tracking-[0.16em] text-emerald-200">New</div>
                      <div className="text-lg font-bold">{product.name}</div>
                    </div>
                    <div className="rounded-full bg-white/15 px-2 py-1 text-xs font-semibold">₹{product.price}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-600">Can't find it?</p>
              <h2 className="text-3xl font-black text-stone-900">Request a Product</h2>
            </div>
          </div>
          <Card className="p-6 md:p-8 bg-stone-50 border-stone-200">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1 w-full">
                <h3 className="text-xl font-bold text-stone-900 mb-2">Tell us what you need</h3>
                <p className="text-stone-600 mb-6">If you can't find a product in our store, let us know and we'll try to stock it for you!</p>
                <form className="flex flex-col gap-4" onSubmit={async (e) => { 
                  e.preventDefault(); 
                  const target = e.target as typeof e.target & {
                    productName: { value: string };
                    qty: { value: number };
                    message: { value: string };
                    reset: () => void;
                  };
                  try {
                    const response = await fetch('https://supermarket-u9sm.onrender.com/api/stock-requests', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        productName: target.productName.value,
                        quantity: Number(target.qty.value) || 1,
                        message: target.message.value || '',
                        userName: 'Customer',
                        status: 'Pending',
                        createdAt: new Date().toISOString()
                      }),
                    });

                    if (!response.ok) {
                      throw new Error('Backend response was not ok');
                    }
                    
                    alert('Product request submitted successfully!'); 
                    target.reset();
                  } catch(err) {
                    console.error('Error submitting request:', err);
                    alert('Failed to submit request.');
                  }
                }}>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input 
                      type="text" 
                      name="productName"
                      placeholder="Product Name (e.g., Organic Almond Milk)" 
                      className="flex-1 rounded-xl border border-stone-300 px-4 py-3 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      required
                    />
                    <input 
                      type="number" 
                      name="qty"
                      min="1"
                      placeholder="Qty" 
                      className="w-full sm:w-24 rounded-xl border border-stone-300 px-4 py-3 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      required
                    />
                  </div>
                  <input 
                    type="text" 
                    name="message"
                    placeholder="Additional details (optional)" 
                    className="w-full rounded-xl border border-stone-300 px-4 py-3 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                  <Button type="submit" className="bg-emerald-600 text-white hover:bg-emerald-700 w-full sm:w-auto">
                    Submit Request
                  </Button>
                </form>
              </div>
              <div className="hidden md:block">
                <div className="flex h-32 w-32 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <ShoppingBag className="h-12 w-12" />
                </div>
              </div>
            </div>
          </Card>
        </section>

        <section className="mb-12">
          <Card className="overflow-hidden p-0">
            <div className="bg-gradient-to-r from-emerald-600 to-lime-500 p-6 text-white">
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-100">Weekend feature</p>
              <h2 className="mt-2 text-3xl font-black">Smart groceries for busy families</h2>
            </div>
            <div className="grid gap-4 p-6 md:grid-cols-3">
              <div className="rounded-2xl bg-emerald-50 p-4">
                <Leaf className="mb-3 h-8 w-8 text-emerald-700" />
                <div className="font-bold text-stone-900">Farm fresh</div>
                <div className="mt-1 text-sm text-stone-600">Selected daily produce</div>
              </div>
              <div className="rounded-2xl bg-orange-50 p-4">
                <Truck className="mb-3 h-8 w-8 text-orange-700" />
                <div className="font-bold text-stone-900">Fast delivery</div>
                <div className="mt-1 text-sm text-stone-600">Within 30 minutes</div>
              </div>
              <div className="rounded-2xl bg-amber-50 p-4">
                <ShieldCheck className="mb-3 h-8 w-8 text-amber-700" />
                <div className="font-bold text-stone-900">Quality checked</div>
                <div className="mt-1 text-sm text-stone-600">Trusted sourcing</div>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </CustomerLayout>
  );
}

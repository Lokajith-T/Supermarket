import { Category, NotificationItem, Order, Product, LoyaltyTransaction } from '@/types';

export const categories: Category[] = [
  { id: 'c1', name: '🍚 Rice & Grains', productCount: 176, icon: '🍚', accent: 'bg-emerald-100 text-emerald-700', image: 'https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&w=700&q=80' },
  { id: 'c2', name: '🌾 Dals & Pulses', productCount: 180, icon: '🌾', accent: 'bg-amber-100 text-amber-700', image: '/images/dals.jpg' },
  { id: 'c3', name: '🌶️ Spices & Masala', productCount: 220, icon: '🌶️', accent: 'bg-red-100 text-red-700', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=700&q=80' },
  { id: 'c4', name: '🛢️ Cooking Oils & Ghee', productCount: 180, icon: '🛢️', accent: 'bg-yellow-100 text-yellow-700', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=700&q=80' },
  { id: 'c5', name: '🍪 Biscuits & Snacks', productCount: 180, icon: '🍪', accent: 'bg-orange-100 text-orange-700', image: '/images/snacks.jpg' },
  { id: 'c6', name: '🥤 Beverages', productCount: 180, icon: '🥤', accent: 'bg-sky-100 text-sky-700', image: '/images/beverages.png' },
  { id: 'c7', name: '🥛 Dairy & Milk Products', productCount: 180, icon: '🥛', accent: 'bg-blue-100 text-blue-700', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=700&q=80' },
  { id: 'c8', name: '🍞 Bakery & Breakfast', productCount: 200, icon: '🍞', accent: 'bg-amber-100 text-amber-700', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=700&q=80' },
  { id: 'c9', name: '🍫 Chocolates & Sweets', productCount: 140, icon: '🍫', accent: 'bg-rose-100 text-rose-700', image: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&w=700&q=80' },
  { id: 'c10', name: '🥫 Packaged & Ready-to-Eat Foods', productCount: 200, icon: '🥫', accent: 'bg-red-100 text-red-700', image: '/images/packed-foods.jpg' },
  { id: 'c11', name: '🧂 Salt, Sugar & Essentials', productCount: 140, icon: '🧂', accent: 'bg-stone-100 text-stone-700', image: '/images/salt.png' },
  { id: 'c12', name: '🥬 Fresh Vegetables', productCount: 240, icon: '🥬', accent: 'bg-emerald-100 text-emerald-700', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=700&q=80' },
  { id: 'c13', name: '🍎 Fruits', productCount: 200, icon: '🍎', accent: 'bg-rose-100 text-rose-700', image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=700&q=80' },
  { id: 'c14', name: '🧴 Personal Care', productCount: 200, icon: '🧴', accent: 'bg-pink-100 text-pink-700', image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=700&q=80' },
  { id: 'c15', name: '🧹 Home Cleaning', productCount: 180, icon: '🧹', accent: 'bg-cyan-100 text-cyan-700', image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=700&q=80' },
  { id: 'c16', name: '🧻 Household Essentials', productCount: 180, icon: '🧻', accent: 'bg-slate-100 text-slate-700', image: 'https://images.unsplash.com/photo-1584286595398-a59f21d313f5?auto=format&fit=crop&w=700&q=80' },
  { id: 'c17', name: '👶 Baby Care', productCount: 140, icon: '👶', accent: 'bg-sky-100 text-sky-700', image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=700&q=80' },
  { id: 'c18', name: '🐕 Pet Care', productCount: 100, icon: '🐕', accent: 'bg-amber-100 text-amber-700', image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=700&q=80' },
  { id: 'c19', name: '🥜 Dry Fruits & Nuts', productCount: 160, icon: '🥜', accent: 'bg-orange-100 text-orange-700', image: '/images/dry-fruits.png' },
  { id: 'c20', name: '🧊 Frozen Foods', productCount: 140, icon: '🧊', accent: 'bg-cyan-100 text-cyan-700', image: '/images/frozen.jpg' }
];

export const products: Product[] = [
  { id: 'p1', name: 'Organic Milk', brand: 'FarmFresh', description: 'Creamy organic milk from grass-fed cows with rich taste and nutrition.', price: 68, unit: '1L', category: 'Dairy & Eggs', stock: 120, rating: 4.8, image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=800&q=80', status: 'IN STOCK', discount: 10, sku: 'ORG-MLK-01' },
  { id: 'p2', name: 'Brown Rice', brand: 'Kohinoor', description: 'Naturally grown, high-fiber rice ideal for daily meals and healthy living.', price: 89, unit: '5kg', category: 'Rice & Grains', stock: 64, rating: 4.7, image: 'https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&w=800&q=80', status: 'IN STOCK', discount: 12, sku: 'BR-005' },
  { id: 'p3', name: 'Avocado', brand: 'Pure Harvest', description: 'Fresh, ripe avocados packed with nutrients and natural creaminess.', price: 120, unit: '1kg', category: 'Fruits & Vegetables', stock: 44, rating: 4.9, image: 'https://images.unsplash.com/photo-1519162808019-7de1683fa2ad?auto=format&fit=crop&w=800&q=80', status: 'LOW STOCK', discount: 5, sku: 'AVO-100' },
  { id: 'p4', name: 'Whole Wheat Bread', brand: 'Baker’s Delight', description: 'Soft, hearty loaves baked daily with 100% whole wheat flour.', price: 56, unit: '400g', category: 'Bakery', stock: 87, rating: 4.6, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80', status: 'IN STOCK', sku: 'WWB-400' },
  { id: 'p5', name: 'Fresh Orange Juice', brand: 'SunSip', description: '30% real juice with no added preservatives and rich citrus flavor.', price: 98, unit: '1L', category: 'Beverages', stock: 0, rating: 4.5, image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&w=800&q=80', status: 'OUT OF STOCK', sku: 'OJ-1000' },
  { id: 'p6', name: 'Trail Mix', brand: 'NutBurst', description: 'Crunchy mixed nuts and dried fruits for quick energy and snacking.', price: 145, unit: '250g', category: 'Snacks', stock: 76, rating: 4.4, image: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=800&q=80', status: 'IN STOCK', discount: 8, sku: 'TM-250' },
  { id: 'p7', name: 'Dish Wash Liquid', brand: 'SparkClean', description: 'Effective grease-cutting formula for spotless dishes and quick cleanup.', price: 110, unit: '750ml', category: 'Household', stock: 51, rating: 4.3, image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80', status: 'IN STOCK', sku: 'DWL-750' },
  { id: 'p8', name: 'Vitamin C Serum', brand: 'GlowCare', description: 'Skin-brightening daily serum to hydrate and support healthy glow.', price: 420, unit: '30ml', category: 'Personal Care', stock: 29, rating: 4.8, image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=800&q=80', status: 'LOW STOCK', sku: 'VCS-30' },
  { id: 'p9', name: 'Frozen Veg Mix', brand: 'IceBite', description: 'A vibrant mix of peas, carrots and corn for quick and healthy meals.', price: 160, unit: '500g', category: 'Frozen Foods', stock: 18, rating: 4.7, image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=800&q=80', status: 'LOW STOCK', sku: 'FVM-500' },
  { id: 'p10', name: 'Turmeric Powder', brand: 'SpiceNest', description: 'Ground turmeric blended for vibrant color and rich aroma in every dish.', price: 72, unit: '200g', category: 'Spices', stock: 102, rating: 4.6, image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80', status: 'IN STOCK', sku: 'TP-200' },
  { id: 'p11', name: 'Bananas', brand: 'FarmFresh', description: 'Naturally sweet bananas perfect for breakfast, smoothies and snacks.', price: 46, unit: '1kg', category: 'Fruits & Vegetables', stock: 180, rating: 4.8, image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=800&q=80', status: 'IN STOCK', discount: 7, sku: 'BAN-1000' },
  { id: 'p12', name: 'Cottage Cheese', brand: 'DairyPlus', description: 'Fresh cottage cheese rich in protein and perfect for salads.', price: 85, unit: '500g', category: 'Dairy & Eggs', stock: 61, rating: 4.5, image: 'https://images.unsplash.com/photo-1521459382675-0a2d8d4d5f87?auto=format&fit=crop&w=800&q=80', status: 'IN STOCK', sku: 'CC-500' },
  { id: 'p13', name: 'Saffron Rice', brand: 'Royal Grains', description: 'Fragrant basmati rice with a luxurious saffron aroma and taste.', price: 240, unit: '1kg', category: 'Rice & Grains', stock: 15, rating: 4.9, image: 'https://images.unsplash.com/photo-1604908556852-6d5d5a97d5b1?auto=format&fit=crop&w=800&q=80', status: 'LOW STOCK', sku: 'SR-1000' },
  { id: 'p14', name: 'Croissant', brand: 'Lavish Bakes', description: 'Flaky butter croissants baked fresh with delicate layers and aroma.', price: 75, unit: '150g', category: 'Bakery', stock: 90, rating: 4.7, image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80', status: 'IN STOCK', sku: 'CR-150' },
  { id: 'p15', name: 'Green Tea', brand: 'Herbal Sip', description: 'Refreshing green tea with a gentle, calming finish and antioxidant-rich leaves.', price: 180, unit: '20 bags', category: 'Beverages', stock: 74, rating: 4.4, image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=800&q=80', status: 'IN STOCK', sku: 'GT-20' },
  { id: 'p16', name: 'Cheese Crackers', brand: 'BiteBite', description: 'Crunchy crackers filled with rich cheese flavor for every snack break.', price: 92, unit: '200g', category: 'Snacks', stock: 53, rating: 4.3, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80', status: 'IN STOCK', discount: 10, sku: 'CC-200' },
  { id: 'p17', name: 'Broom & Dustpan', brand: 'CleanNest', description: 'Lightweight cleaning bundle for quick and efficient home cleaning.', price: 260, unit: '1 set', category: 'Household', stock: 38, rating: 4.2, image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80', status: 'IN STOCK', sku: 'BD-1' },
  { id: 'p18', name: 'Moisturizing Lotion', brand: 'PureGlow', description: 'Silky lotion offering hydration and a soft, healthy skin finish.', price: 210, unit: '200ml', category: 'Personal Care', stock: 0, rating: 4.6, image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=800&q=80', status: 'OUT OF STOCK', sku: 'ML-200' },
  { id: 'p19', name: 'Frozen Berries', brand: 'FrostFarms', description: 'Sweet frozen berries for smoothies, desserts and healthy recipes.', price: 180, unit: '400g', category: 'Frozen Foods', stock: 40, rating: 4.8, image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=800&q=80', status: 'IN STOCK', sku: 'FB-400' },
  { id: 'p20', name: 'Black Pepper', brand: 'SpiceNest', description: 'Bold and aromatic pepper for elevated flavor in everyday cooking.', price: 68, unit: '150g', category: 'Spices', stock: 96, rating: 4.5, image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80', status: 'IN STOCK', sku: 'BP-150' },
  { id: 'p21', name: 'Tomatoes', brand: 'Harvest Lane', description: 'Fresh, juicy tomatoes sourced from greenhouses with balanced sweetness.', price: 52, unit: '1kg', category: 'Fruits & Vegetables', stock: 130, rating: 4.7, image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80', status: 'IN STOCK', sku: 'TOM-1000' },
  { id: 'p22', name: 'Eggs', brand: 'Happy Hen', description: 'Farm-fresh eggs with high protein content and great taste.', price: 94, unit: '12 pcs', category: 'Dairy & Eggs', stock: 140, rating: 4.6, image: 'https://images.unsplash.com/photo-1506975094-96b2f379e3d3?auto=format&fit=crop&w=800&q=80', status: 'IN STOCK', discount: 9, sku: 'EGG-12' },
  { id: 'p23', name: 'Quinoa', brand: 'NatureGrain', description: 'High-protein ancient grain for nutritious bowls and hearty meals.', price: 210, unit: '500g', category: 'Rice & Grains', stock: 22, rating: 4.8, image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=80', status: 'LOW STOCK', sku: 'Q-500' },
  { id: 'p24', name: 'Sourdough Loaf', brand: 'Rustic Crumb', description: 'Slow-fermented sourdough with a crisp crust and soft center.', price: 88, unit: '300g', category: 'Bakery', stock: 49, rating: 4.7, image: 'https://images.unsplash.com/photo-1549931314-a545dcf3bc73?auto=format&fit=crop&w=800&q=80', status: 'IN STOCK', sku: 'SL-300' },
  { id: 'p25', name: 'Coconut Water', brand: 'Coco Fresh', description: 'Hydrating coconut water with natural electrolytes and a refreshing finish.', price: 88, unit: '500ml', category: 'Beverages', stock: 60, rating: 4.4, image: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=800&q=80', status: 'IN STOCK', sku: 'CW-500' },
  { id: 'p26', name: 'Oat Cookies', brand: 'MunchBox', description: 'Healthy oat cookies with a wholesome crunch and sweet finish.', price: 70, unit: '250g', category: 'Snacks', stock: 88, rating: 4.2, image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80', status: 'IN STOCK', sku: 'OC-250' },
  { id: 'p27', name: 'Laundry Detergent', brand: 'BrightWash', description: 'Fragrance-rich detergent that keeps fabrics fresh and clean.', price: 320, unit: '1L', category: 'Household', stock: 26, rating: 4.3, image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80', status: 'LOW STOCK', sku: 'LD-1000' },
  { id: 'p28', name: 'Shampoo Bar', brand: 'Nurture Care', description: 'Gentle, zero-waste shampoo bar with botanical oils and smooth finish.', price: 150, unit: '60g', category: 'Personal Care', stock: 35, rating: 4.5, image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80', status: 'IN STOCK', sku: 'SB-60' },
  { id: 'p29', name: 'Frozen Peas', brand: 'EcoFreeze', description: 'Sweet, tender frozen peas ideal for quick, healthy family meals.', price: 95, unit: '500g', category: 'Frozen Foods', stock: 12, rating: 4.6, image: 'https://images.unsplash.com/photo-1551018612-d20db4b0f66f?auto=format&fit=crop&w=800&q=80', status: 'LOW STOCK', sku: 'FP-500' },
  { id: 'p30', name: 'Chili Flakes', brand: 'SpiceNest', description: 'Fiery chili flakes that add instant heat and rich flavor to meals.', price: 74, unit: '100g', category: 'Spices', stock: 108, rating: 4.5, image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80', status: 'IN STOCK', sku: 'CF-100' },
];

export const orderHistory: Order[] = [
  { id: '#ORD1023', date: '2026-09-20', items: 4, amount: 1245, status: 'Completed', eta: 'Delivered' },
  { id: '#ORD1024', date: '2026-09-21', items: 3, amount: 890, status: 'Processing', eta: 'Packed' },
  { id: '#ORD1025', date: '2026-09-22', items: 5, amount: 1660, status: 'Pending', eta: 'Awaiting confirmation' },
  { id: '#ORD1026', date: '2026-09-24', items: 2, amount: 560, status: 'Cancelled', eta: 'Cancelled' },
  { id: '#ORD1027', date: '2026-09-24', items: 6, amount: 1880, status: 'Completed', eta: 'Delivered' },
  { id: '#ORD1028', date: '2026-09-24', items: 1, amount: 230, status: 'Processing', eta: 'Out for delivery' },
  { id: '#ORD1029', date: '2026-09-25', items: 8, amount: 2450, status: 'Pending', eta: 'Preparing' },
  { id: '#ORD1030', date: '2026-09-25', items: 4, amount: 760, status: 'Completed', eta: 'Delivered' },
  { id: '#ORD1031', date: '2026-09-26', items: 3, amount: 1120, status: 'Completed', eta: 'Delivered' },
  { id: '#ORD1032', date: '2026-09-26', items: 2, amount: 430, status: 'Processing', eta: 'Packed' },
  { id: '#ORD1033', date: '2026-09-27', items: 5, amount: 1540, status: 'Pending', eta: 'Processing' },
  { id: '#ORD1034', date: '2026-09-27', items: 1, amount: 540, status: 'Completed', eta: 'Delivered' },
];

export const notifications: NotificationItem[] = [
  { id: 'n1', type: 'Back in stock', title: 'Organic Milk is back', description: 'FarmFresh Organic Milk is available again for delivery.', time: '4 min ago', read: false },
  { id: 'n2', type: 'Order update', title: 'Your order is on the way', description: 'Order #ORD1028 is out for delivery.', time: '18 min ago', read: false },
  { id: 'n3', type: 'Points earned', title: 'You earned 150 points', description: 'Thanks for shopping with FreshCart.', time: '1 hour ago', read: true },
  { id: 'n4', type: 'Reward unlocked', title: '5% OFF unlocked', description: 'You have reached 10,000 loyalty points.', time: '2 hours ago', read: true },
  { id: 'n5', type: 'New offer', title: 'Weekend freshness sale', description: 'Save up to 25% on fresh produce this week.', time: 'Today', read: false },
  { id: 'n6', type: 'New product', title: 'New premium line added', description: 'Explore organic juices and specialty grains.', time: 'Today', read: true },
  { id: 'n7', type: 'Announcement', title: 'Delivery window extended', description: 'Enjoy free express delivery on orders above ₹999.', time: 'Yesterday', read: true },
];

export const loyaltyTransactions: LoyaltyTransaction[] = [
  { id: 'lt1', type: 'earned', points: 15, label: 'Purchase #ORD1023', date: '2026-09-20' },
  { id: 'lt2', type: 'earned', points: 10, label: 'Purchase #ORD1019', date: '2026-09-17' },
  { id: 'lt3', type: 'redeemed', points: -1000, label: 'Reward redeemed', date: '2026-09-13' },
  { id: 'lt4', type: 'earned', points: 25, label: 'Purchase #ORD1017', date: '2026-09-11' },
  { id: 'lt5', type: 'earned', points: 20, label: 'Purchase #ORD1014', date: '2026-09-08' },
  { id: 'lt6', type: 'redeemed', points: -500, label: 'Reward redeemed', date: '2026-09-02' },
  { id: 'lt7', type: 'earned', points: 30, label: 'Purchase #ORD1010', date: '2026-09-01' },
];

export const adminMetrics = [
  { title: 'Today\'s Sales', value: '₹84.2K', delta: '+18.2%', trend: 'up', icon: 'TrendingUp' },
  { title: 'Total Orders', value: '1,286', delta: '+8.6%', trend: 'up', icon: 'ShoppingBag' },
  { title: 'Customers', value: '12.4K', delta: '+5.1%', trend: 'up', icon: 'Users' },
  { title: 'Low Stock', value: '42', delta: '-3.0%', trend: 'down', icon: 'Package' },
  { title: 'Out of Stock', value: '17', delta: '+1.4%', trend: 'up', icon: 'AlertTriangle' },
  { title: 'Restock Requests', value: '89', delta: '+12.9%', trend: 'up', icon: 'RefreshCw' },
];

export const salesTrend = [
  { name: 'Jan', revenue: 24000, orders: 410 },
  { name: 'Feb', revenue: 28600, orders: 480 },
  { name: 'Mar', revenue: 32150, orders: 540 },
  { name: 'Apr', revenue: 29850, orders: 510 },
  { name: 'May', revenue: 35400, orders: 600 },
  { name: 'Jun', revenue: 37200, orders: 630 },
  { name: 'Jul', revenue: 39850, orders: 680 },
  { name: 'Aug', revenue: 42120, orders: 710 },
  { name: 'Sep', revenue: 44800, orders: 760 },
];

export const topSellingProducts = [
  { name: 'Rice', value: 74 },
  { name: 'Milk', value: 68 },
  { name: 'Bread', value: 63 },
  { name: 'Coffee', value: 58 },
  { name: 'Sugar', value: 44 },
];

export const categorySales = [
  { name: 'Fruits', value: 32, color: '#10b981' },
  { name: 'Dairy', value: 24, color: '#fbbf24' },
  { name: 'Beverages', value: 18, color: '#f59e0b' },
  { name: 'Snacks', value: 16, color: '#a78bfa' },
  { name: 'Household', value: 10, color: '#f43f5e' },
];

export const restockDemand = [
  { name: 'Rice 5kg', stock: 12, waiting: 27, level: 'High' },
  { name: 'Milk 1L', stock: 18, waiting: 18, level: 'Medium' },
  { name: 'Cooking Oil 5L', stock: 9, waiting: 14, level: 'High' },
  { name: 'Bread', stock: 26, waiting: 11, level: 'Medium' },
  { name: 'Eggs', stock: 34, waiting: 8, level: 'Low' },
];

export const adminProducts = [
  { id: 'ap1', name: 'Rice 5kg', sku: 'RICE-5K', category: 'Rice & Grains', price: 260, stock: 120, status: 'IN STOCK', updated: '2 hours ago' },
  { id: 'ap2', name: 'Organic Milk', sku: 'MILK-1L', category: 'Dairy & Eggs', price: 68, stock: 76, status: 'IN STOCK', updated: '1 day ago' },
  { id: 'ap3', name: 'Whole Wheat Bread', sku: 'BRD-WWT', category: 'Bakery', price: 56, stock: 18, status: 'LOW STOCK', updated: '3 hours ago' },
  { id: 'ap4', name: 'Orange Juice', sku: 'JUICE-OR', category: 'Beverages', price: 98, stock: 0, status: 'OUT OF STOCK', updated: '5 hours ago' },
  { id: 'ap5', name: 'Avocado', sku: 'AVO-1KG', category: 'Fruits & Vegetables', price: 120, stock: 12, status: 'LOW STOCK', updated: '30 min ago' },
];

export const inventoryRows = [
  { product: 'Rice 5kg', sku: 'RICE-5K', currentStock: 120, minStock: 40, status: 'Healthy', lastUpdated: '2h ago' },
  { product: 'Milk 1L', sku: 'MILK-1L', currentStock: 76, minStock: 30, status: 'Healthy', lastUpdated: '1h ago' },
  { product: 'Bread', sku: 'BRD-WWT', currentStock: 18, minStock: 25, status: 'Low', lastUpdated: '3h ago' },
  { product: 'Orange Juice', sku: 'JUICE-OR', currentStock: 0, minStock: 12, status: 'Out', lastUpdated: '5h ago' },
  { product: 'Avocado', sku: 'AVO-1KG', currentStock: 12, minStock: 20, status: 'Low', lastUpdated: '30m ago' },
];

export const offers = [
  { id: 'o1', title: '10% OFF on Dairy', discount: '10% OFF', expiry: 'Ends in 2 days', description: 'Fresh dairy essentials', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=800&q=80' },
  { id: 'o2', title: 'Buy 1 Get 1 Free', discount: 'BOGO', expiry: 'Ends in 5 hours', description: 'Selected bakery favorites', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80' },
  { id: 'o3', title: 'Weekend Grocery Sale', discount: 'Up to 30%', expiry: 'Ends Sunday', description: 'Big savings on pantry essentials', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80' },
  { id: 'o4', title: 'Fresh Produce Boost', discount: '15% OFF', expiry: 'Ends in 3 days', description: 'Vitamin-packed fruits & veggies', image: 'https://images.unsplash.com/photo-1461354464878-ad92f492a5a0?auto=format&fit=crop&w=800&q=80' },
];

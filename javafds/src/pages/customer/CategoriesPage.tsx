import { useState, useEffect } from 'react';
import CustomerLayout from '@/components/layout/CustomerLayout';
import Card from '@/components/ui/Card';
import { categories } from '@/data/mockData';
import { Product } from '@/types';

export default function CategoriesPage() {
  const [firebaseProducts, setFirebaseProducts] = useState<Product[]>([]);
  const [dbCategories, setDbCategories] = useState<typeof categories>([]);

  useEffect(() => {
    fetch('http://localhost:8081/api/categorys')
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
    fetch('http://localhost:8081/api/products')
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

  return (
    <CustomerLayout>
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">
        <div className="mb-8">
          <div className="text-xs uppercase tracking-[0.2em] text-emerald-600">Browse</div>
          <h1 className="text-4xl font-black text-stone-900">All categories</h1>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {(dbCategories.length > 0 ? dbCategories : categories).map((category) => {
            const productCount = firebaseProducts.length > 0 
              ? firebaseProducts.filter(p => p.category === category.name).length 
              : category.productCount;
              
            return (
            <Card key={category.id} className="overflow-hidden p-0">
              <div className="relative h-48">
                <img src={category.image} alt={category.name} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/50 to-transparent" />
                <div className={`absolute left-4 top-4 flex h-12 w-12 items-center justify-center rounded-2xl text-2xl ${category.accent}`}>{category.icon}</div>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold text-stone-900">{category.name}</h3>
                <p className="mt-1 text-sm text-stone-500">{productCount} items available</p>
              </div>
            </Card>
          )})}
        </div>
      </div>
    </CustomerLayout>
  );
}

import AdminLayout from '@/components/layout/AdminLayout';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function AdminAddProductPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-emerald-600">Catalog</div>
            <h1 className="text-4xl font-black text-stone-900">Add Product</h1>
          </div>
        </div>

        <Card className="p-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[28px] border-2 border-dashed border-stone-300 bg-stone-50 p-6 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-2xl text-emerald-700">+</div>
              <div className="mt-4 text-lg font-semibold text-stone-900">Drag & drop image</div>
              <div className="mt-1 text-sm text-stone-500">PNG, JPG, or WEBP up to 5MB</div>
            </div>

            <div className="space-y-4">
              <div><label className="mb-2 block text-sm font-semibold text-stone-700">Product name</label><input className="input-shell" placeholder="Organic Mango" /></div>
              <div><label className="mb-2 block text-sm font-semibold text-stone-700">SKU</label><input className="input-shell" placeholder="ORG-MANGO-01" /></div>
              <div><label className="mb-2 block text-sm font-semibold text-stone-700">Barcode</label><input className="input-shell" placeholder="8901234567890" /></div>
              <div><label className="mb-2 block text-sm font-semibold text-stone-700">Category</label><input className="input-shell" placeholder="Fruits & Vegetables" /></div>
              <div><label className="mb-2 block text-sm font-semibold text-stone-700">Brand</label><input className="input-shell" placeholder="FarmFresh" /></div>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div><label className="mb-2 block text-sm font-semibold text-stone-700">Description</label><textarea className="input-shell min-h-[120px]" placeholder="Freshly harvested premium mangoes from local farms." /></div>
            <div className="grid gap-4">
              <div><label className="mb-2 block text-sm font-semibold text-stone-700">Price</label><input className="input-shell" placeholder="₹129" /></div>
              <div><label className="mb-2 block text-sm font-semibold text-stone-700">Unit</label><input className="input-shell" placeholder="1kg" /></div>
              <div><label className="mb-2 block text-sm font-semibold text-stone-700">Minimum stock</label><input className="input-shell" placeholder="25" /></div>
              <div><label className="mb-2 block text-sm font-semibold text-stone-700">Initial quantity</label><input className="input-shell" placeholder="120" /></div>
              <div><label className="mb-2 block text-sm font-semibold text-stone-700">Status</label><input className="input-shell" placeholder="In stock" /></div>
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-3">
            <Button variant="secondary">Cancel</Button>
            <Button variant="primary">Create Product</Button>
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
}

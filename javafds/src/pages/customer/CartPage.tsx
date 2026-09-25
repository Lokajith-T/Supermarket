import { useNavigate } from '@tanstack/react-router';
import CustomerLayout from '@/components/layout/CustomerLayout';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { useCart } from '@/context/CartContext';
import { database } from '@/firebase';
import { ref, push, update } from 'firebase/database';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const discount = 0; // Or calculate based on rules
  const delivery = subtotal > 0 ? 49 : 0;
  const total = subtotal - discount + delivery;

  const handleCheckout = async () => {
    if (cart.length === 0) return alert('Your cart is empty!');
    try {
      const orderRef = push(ref(database, 'orders'));
      const orderId = orderRef.key;
      const createdAt = new Date().toISOString();

      const orderData = {
        id: orderId,
        items: cart.map(item => ({
          productId: item.product.id,
          name: item.product.name,
          qty: item.quantity,
          price: item.product.price,
          unit: item.product.unit
        })),
        totalAmount: total,
        status: 'Pending',
        createdAt,
        customerName: 'Guest User', // To be replaced with actual Auth context later
      };

      const updates: any = {};
      updates[`/orders/${orderId}`] = orderData;
      
      // Also write to user's requests array for the dashboard
      const requestRef = push(ref(database, 'requests'));
      updates[`/requests/${requestRef.key}`] = {
        id: requestRef.key,
        orderId,
        status: 'Pending',
        createdAt,
        itemsCount: cart.length,
        total,
        customerName: 'Guest User'
      };

      await update(ref(database), updates);
      clearCart();
      alert('Order placed successfully!');
      navigate({ to: '/customer/orders' });
    } catch (error) {
      console.error('Checkout failed', error);
      alert('Failed to place order. Try again.');
    }
  };

  return (
    <CustomerLayout>
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">
        <div className="mb-8">
          <div className="text-xs uppercase tracking-[0.2em] text-emerald-600">Checkout</div>
          <h1 className="text-4xl font-black text-stone-900">Your cart</h1>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            {cart.length === 0 && <p className="text-stone-500">Your cart is empty.</p>}
            {cart.map(({ id, product, quantity }) => (
              <Card key={id} className="flex items-center gap-4">
                <img src={product.image} alt={product.name} className="h-24 w-24 rounded-2xl object-cover" />
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-bold text-stone-900">{product.name}</div>
                      <div className="text-sm text-stone-500">{product.unit}</div>
                    </div>
                    <button onClick={() => removeFromCart(product.id)} className="text-sm font-semibold text-red-600">Remove</button>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="text-xl font-black text-emerald-700">₹{product.price}</div>
                    <div className="flex items-center gap-2 rounded-full border border-stone-200 px-2 py-1">
                      <button onClick={() => updateQuantity(product.id, -1)} className="px-1 text-stone-500">−</button>
                      <span className="min-w-6 text-center text-sm font-semibold">{quantity}</span>
                      <button onClick={() => updateQuantity(product.id, 1)} className="px-1 text-stone-500">+</button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card className="h-fit">
            <h2 className="text-2xl font-black text-stone-900">Order summary</h2>
            <div className="mt-5 space-y-3 text-sm text-stone-600">
              <div className="flex justify-between"><span>Subtotal</span><span className="font-semibold text-stone-900">₹{subtotal}</span></div>
              <div className="flex justify-between"><span>Discount</span><span className="font-semibold text-emerald-700">-₹{discount}</span></div>
              <div className="flex justify-between"><span>Delivery</span><span className="font-semibold text-stone-900">₹{delivery}</span></div>
              <div className="border-t border-stone-200 pt-3 flex justify-between text-base font-bold text-stone-900"><span>Total</span><span>₹{total}</span></div>
            </div>
            <div className="mt-5 rounded-2xl bg-emerald-50 p-3 text-sm text-emerald-700">You have 7,850 loyalty points</div>
            <Button variant="primary" className="mt-5 w-full" onClick={handleCheckout} disabled={cart.length === 0}>Proceed to Checkout</Button>
          </Card>
        </div>
      </div>
    </CustomerLayout>
  );
}

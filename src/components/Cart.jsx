import { useEffect, useState } from 'react';
import CartItem from './CartItem';
import { ShoppingBag, Loader2 } from 'lucide-react';

export default function Cart({ sessionId, onCheckout, cartVersion }) {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionId) {
      fetchCart();
    }
  }, [sessionId, cartVersion]);

  const fetchCart = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/cart?sessionId=${sessionId}`
      );

      if (!response.ok) throw new Error('Failed to fetch cart');

      const data = await response.json();
      setCart(data);
    } catch (err) {
      console.error('Error fetching cart:', err);
      console.log('API URL:', import.meta.env.VITE_API_URL);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (cartItemId, quantity) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/cart`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ cartItemId, quantity }),
        }
      );

      if (!response.ok) throw new Error('Failed to update quantity');

      fetchCart();
    } catch (err) {
      console.error('Error updating quantity:', err);
    }
  };

  const handleRemoveItem = async (cartItemId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/cart/${cartItemId}`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) throw new Error('Failed to remove item');

      fetchCart();
    } catch (err) {
      console.error('Error removing item:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <Loader2 className="animate-spin text-blue-600" size={48} />
      </div>
    );
  }

  if (cart.items.length === 0) {
    return (
      <div className="text-center py-12">
        <ShoppingBag className="mx-auto text-gray-400 mb-4" size={64} />
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Your cart is empty</h3>
        <p className="text-gray-500">Add some products to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Shopping Cart</h2>
      <div className="space-y-3">
        {cart.items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onUpdateQuantity={handleUpdateQuantity}
            onRemove={handleRemoveItem}
          />
        ))}
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-semibold text-gray-700">Total:</span>
          <span className="text-3xl font-bold text-gray-900">${cart.total.toFixed(2)}</span>
        </div>
        <button
          onClick={() => onCheckout(cart.items)}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors duration-200"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

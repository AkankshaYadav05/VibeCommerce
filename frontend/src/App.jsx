import { useState, useEffect } from 'react';
import ProductGrid from './components/ProductGrid';
import Cart from './components/Cart';
import CheckoutModal from './components/CheckOutModal';
import ReceiptModal from './components/ReceiptModal';
import { ShoppingCart, Store } from 'lucide-react';

function App() {
  const [sessionId, setSessionId] = useState('');
  const [cartVersion, setCartVersion] = useState(0);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutItems, setCheckoutItems] = useState([]);
  const [receipt, setReceipt] = useState(null);

  useEffect(() => {
    let session = localStorage.getItem('sessionId');
    if (!session) {
      session = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('sessionId', session);
    }
    setSessionId(session);
  }, []);

  const handleAddToCart = async (product) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/cart`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            productId: product._id,
            quantity: 1,
            sessionId,
          }),
        }
      );

      if (!response.ok) throw new Error('Failed to add to cart');

      setCartVersion((v) => v + 1);

      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in';
      notification.textContent = 'Added to cart!';
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 2000);
    } catch (err) {
      console.error('Error adding to cart:', err);
    }
  };

  const handleCheckout = (items) => {
    setCheckoutItems(items);
    setShowCheckout(true);
  };

  const handleCheckoutSuccess = (receiptData) => {
    setReceipt(receiptData);
    setShowCheckout(false);
    setCartVersion((v) => v + 1);
  };

  const handleCloseReceipt = () => {
    setReceipt(null);
    setShowCart(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Store className="text-blue-600" size={32} />
              <h1 className="text-2xl font-bold text-gray-800">Vibe Commerce</h1>
            </div>
            <button
              onClick={() => setShowCart(!showCart)}
              className="relative bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200"
            >
              <ShoppingCart size={20} />
              <span className="font-semibold">
                {showCart ? 'View Products' : 'View Cart'}
              </span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!showCart ? (
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Our Products</h2>
              <p className="text-gray-600">Discover our premium collection of tech accessories</p>
            </div>
            <ProductGrid onAddToCart={handleAddToCart} />
          </div>
        ) : (
          <Cart
            sessionId={sessionId}
            onCheckout={handleCheckout}
            cartVersion={cartVersion}
          />
        )}
      </main>

      {showCheckout && (
        <CheckoutModal
          cartItems={checkoutItems}
          sessionId={sessionId}
          onClose={() => setShowCheckout(false)}
          onSuccess={handleCheckoutSuccess}
        />
      )}

      {receipt && (
        <ReceiptModal
          receipt={receipt}
          onClose={handleCloseReceipt}
        />
      )}
    </div>
  );
}

export default App;

import express from 'express';
import Order from '../models/Order.js';
import CartItem from '../models/CartItem.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { customerName, customerEmail, cartItems, sessionId } = req.body;

    if (!customerName || !customerEmail || !cartItems || cartItems.length === 0) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // ✅ Calculate total
    const total = cartItems.reduce((sum, item) => {
      return sum + (item.products.price * item.quantity);
    }, 0);

    // ✅ Prepare order items
    const orderItems = cartItems.map(item => ({
      productId: item.product_id,
      productName: item.products.name,
      quantity: item.quantity,
      price: item.products.price,
      subtotal: item.products.price * item.quantity,
    }));

    // ✅ Create order
    const order = await Order.create({
      customer_name: customerName,
      customer_email: customerEmail,
      total,
      items: orderItems,
    });

    // ✅ Clear cart after checkout
    if (sessionId) {
      await CartItem.deleteMany({ user_session_id: sessionId });
    }

    // ✅ Return receipt
    const receipt = {
      orderId: order._id,
      customerName: order.customer_name,
      customerEmail: order.customer_email,
      items: orderItems,
      total: order.total,
      timestamp: order.created_at,
    };

    res.json(receipt);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

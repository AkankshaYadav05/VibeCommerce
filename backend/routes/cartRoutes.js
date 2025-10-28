import express from 'express';
import CartItem from '../models/CartItem.js';
import Product from '../models/Product.js';

const router = express.Router();

// ✅ Get cart items
router.get('/', async (req, res) => {
  try {
    const { sessionId } = req.query;
    if (!sessionId) return res.status(400).json({ error: 'Session ID required' });

    const cartItems = await CartItem.find({ user_session_id: sessionId }).populate('product_id');

    const items = cartItems.map(item => ({
      id: item._id,
      product_id: item.product_id._id,
      quantity: item.quantity,
      products: {
        id: item.product_id._id,
        name: item.product_id.name,
        price: item.product_id.price,
        description: item.product_id.description,
        image_url: item.product_id.image_url,
      },
    }));

    const total = items.reduce((sum, item) => sum + (item.products.price * item.quantity), 0);

    res.json({ items, total });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Add to cart
router.post('/', async (req, res) => {
  try {
    const { productId, quantity, sessionId } = req.body;
    if (!productId || !quantity || !sessionId)
      return res.status(400).json({ error: 'Missing required fields' });

    const existing = await CartItem.findOne({
      product_id: productId,
      user_session_id: sessionId,
    });

    let result;
    if (existing) {
      existing.quantity += quantity;
      existing.updated_at = Date.now();
      result = await existing.save();
    } else {
      result = await CartItem.create({
        product_id: productId,
        quantity,
        user_session_id: sessionId,
      });
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Update quantity
router.put('/', async (req, res) => {
  try {
    const { cartItemId, quantity } = req.body;
    if (!cartItemId || !quantity)
      return res.status(400).json({ error: 'Missing required fields' });

    const result = await CartItem.findByIdAndUpdate(
      cartItemId,
      { quantity, updated_at: Date.now() },
      { new: true }
    );

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Delete cart item
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: 'Cart item ID required' });

    await CartItem.findByIdAndDelete(id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

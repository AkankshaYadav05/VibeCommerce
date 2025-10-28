import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  customer_name: {
    type: String,
    required: true,
  },
  customer_email: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
    required: true,
    min: 0,
  },
  items: {
    type: Array,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model('Order', orderSchema);
export default Order;

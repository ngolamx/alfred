const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
  client: {
    type: String,
    required: [true, 'A client must have a name']
  },
  category: {
    type: String
  },
  amount: {
    type: Number
  },
  origin: {
    type: String
  },
  start_date: {
    type: String
  },
  end_date: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;

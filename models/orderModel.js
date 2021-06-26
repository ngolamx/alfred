const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
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
    default: Date.now()
  },
  client: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Nhập tên khách hàng']
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;

const mongoose = require('mongoose');
const validator = require('validator');

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nhập tên khách hàng']
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;

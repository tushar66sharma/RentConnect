const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  name: {type: String, required: false},
  description: {type: String, required: false},
  category: {type: String, required: true},
  price: {type: Number, required: true},
  quantity: {type: Number, required: true, default: 0},
  imageUrl: {type: String, required: false},
  orderId: {type: String, required: true},
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserInfo',
    required: true,
  },
  renter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserInfo',
    required: true,
  },
});

mongoose.model('OrderInfo', orderSchema);

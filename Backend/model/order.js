const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  userName:String,
  name: { type: String, required: true },
  type: { type: String, required: true },
  price: { type: Number, required: true },
  qty: { type: Number, default: 1 },
  imageUrl: { type: String },
});

const orderSchema = new mongoose.Schema({
  items: [orderItemSchema],
  total: { type: Number, required: true },
  paymentMethod: {
    type: String,
    enum: ['Bkash', 'Nagad', 'Rocket', 'Credit Card', 'Cash on Delivery'],
    required: true
  },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);

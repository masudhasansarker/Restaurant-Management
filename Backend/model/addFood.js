const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  imageUrl: String,
});

const Dish = mongoose.model("Dish", productSchema, "dishes");
const Dessert = mongoose.model("Dessert", productSchema, "desserts");
const Drink = mongoose.model("Drink", productSchema, "drinks");

module.exports = { Dish, Dessert, Drink };

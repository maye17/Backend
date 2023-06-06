const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;


const productSchema = new Schema({
    title: { type: String, required: true, max: 100},
    description: { type: String, required: true, max:150 },
    price: { type: Number, required: true, max: 20},
    thumbnail: { type: String, required: true },
    code: { type: String, required: true, unique: true, max: 50 },
    stock: { type: Number, required: true},
    status: { type: Boolean, default: true }
  }, { versionKey: false });


  module.exports = {mongooseMatch: mongoose.model('products', productSchema)}
  
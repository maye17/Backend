const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/* const model = mongoose.model; */

 const productSchema = new Schema({
    title: { type: String, required: true},
    description: { type: String, required: true },
    price: { type: Number, required: true},
    thumbnail: { type: String, required: true },
    code: { type: String, required: true, unique: true},
    stock: { type: Number, required: true},
    status: { type: Boolean, default: true }
  }, { versionKey: false });


  module.exports = mongooseMatch = mongoose.model("products", productSchema)
  

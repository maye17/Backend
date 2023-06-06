const mongoose = require('mogoose');
const Schema = mongoose.Schema;
const model = mongoose.model;


const productSchema = new Schema({
    idProduct: { type: Schema.Types.ObjectId, ref: "products" },
    quantity: { type: Number }
  }, { _id: false });  
  
  const cartSchema = new Schema({
    products: [productSchema]
  }, { versionKey: false });


  module.exports = mongooseCart  = mongoose.model('carts', cartSchema);
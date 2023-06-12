const mongoose = require('mongoose');
const {Schema, model} = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');
 
const productSchema = new Schema({
    title: { type: String, required: true},
    description: { type: String, required: true },
    price: { type: Number, required: true},
    thumbnail: { type: String, required: true },
    code: { type: String, required: true, unique: true},
    stock: { type: Number, required: true},
    status: { type: Boolean, default: true }
  }, { versionKey: false });

  productSchema.plugin(mongoosePaginate);

/*   module.exports = mongooseMatch = mongoose.model("products", productSchema) */

module.exports = model('products',productSchema)
  

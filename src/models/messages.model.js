const mongoose = require('mongoose');
const {Schema, model} = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');


const messageSchema = new Schema({
    user: { type: String, required: true },
    message: { type: String, required: true }
  });


  module.exports = mensageMongoose = mongoose.model("mensage", messageSchema)
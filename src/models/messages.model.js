const mongoose = require('mogoose');
const { mongo, Mongoose } = require('mongoose');
const Schema = mongoose.Schema;
const model = Mongoose.model;


const messageSchema = new Schema({
    user: { type: String, required: true },
    message: { type: String, required: true }
  });


  module.exports = mensageMongoose = mongoose.model("mensage", messageSchema)
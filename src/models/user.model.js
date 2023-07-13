const mongoose = require('mongoose');
const {Schema, model} = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');

const schema = new Schema({
    firstName:{
        type:String,
        required:true,
        max:100,
    },
    lastName:{
        type:String,
        required:true,
        max:100,
    },
    email:{
        type:String,
        required:true,
        max:100,
        unique:true
    },
    password:{
        type:String,
        required:true,
        max:100,

    },
    isAdmin:{
        type:Boolean,
        required:false,

    }
});

schema.plugin(mongoosePaginate)

module.exports = model('users',schema)

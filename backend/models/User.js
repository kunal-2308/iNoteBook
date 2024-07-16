const mongoose = require('mongoose');
const { Schema } = mongoose;
const userSchema = new Schema({
    name :{
        type : String,
        required : true,
    },

    email :{
        type : String,
        required : true,
        unique : true,
    },

    password : {
        type : String,
        required : true,
    },

    date : {
        type : Date,
        default : Date.now
    }
  });

  
const User = mongoose.model('user',userSchema);
// User.createIndexes(); used for creating indexes so that same Email cannot be used automatic it is done as email is set True
  module.exports = User
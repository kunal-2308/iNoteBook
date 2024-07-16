const mongoose = require ('mongoose');
const { Schema } = mongoose;
const notesSchema = new Schema({
    title :{
        type : String,
        required : true,
    },

    description :{
        type : String,
        
    },

    tag :{
        type : String,
        default : 'General',
    },

    date : {
        type : Date,
        default : Date.now
    }
  });

  module.exports = mongoose.Schema('notes',notesSchema);
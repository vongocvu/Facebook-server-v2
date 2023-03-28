const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
      sender: {
             type: mongoose.Schema.Types.ObjectId,
             ref: 'User'
      },
      content: {
             type: String,
             required: true
      },
      group: {
             type: mongoose.Schema.Types.ObjectId,
      },
      event: {
             type: Boolean,
      },
      sended: [{
             type: mongoose.Schema.Types.ObjectId,
      }]
      
    } , {timestamps:true});

module.exports = mongoose.model('Message', MessageSchema)
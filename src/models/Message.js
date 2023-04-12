const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
      sender: {
             type: mongoose.Schema.Types.ObjectId,
             ref: 'User'
      },
      content: {
             type: String,
      },
      image: {
             type: String
      },
      group: {
             type: mongoose.Schema.Types.ObjectId,
      },
      event: {
             type: Boolean,
      },
      sended: [{
             type: mongoose.Schema.Types.ObjectId,
      }],
      reacts: [
       {
         user: {
           type: mongoose.Schema.Types.ObjectId,
           ref: "User",
         },
         reactName: {
           type: String,
         },
         reactUrl: {
           type: String,
         },
         reactColor: {
           type: String,
         },
       },
     ],
      
    }, {timestamps:true});

module.exports = mongoose.model('Message', MessageSchema)
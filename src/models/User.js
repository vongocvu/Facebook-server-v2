const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
      username: {
             type: String, 
             required: true 
      },
      password: {
             type: String, 
             required: true 
      },
      email: {
             type: String, 
             required: true 
      },
      avatar: {
             type: String 
      },
      friends: [{
             type: mongoose.Schema.Types.ObjectId,
             ref: 'User' 
      }],
      online: {
             type: Boolean
      },
      lastonline: {
              type: Date
      }

    }, {timestamps: true});

module.exports = mongoose.model('User', UserSchema);
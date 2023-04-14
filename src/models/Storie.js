const mongoose = require('mongoose');

const StoreSchema = new mongoose.Schema({
    author: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
    },
    image: { 
         type: String
    },
    background: {
          type: String
    },
    text: [{
        content: {
          type: String  
        },
        top: {
          type: Number
        },
        left: {
          type: Number
        },
        fontSize: {
          type: Number
        },
        fontFamily: {
          type: String
        },
        color: {
          type: String
        }
    }]
}, {timestamps: true })  


module.exports = mongoose.model('Storie', StoreSchema)
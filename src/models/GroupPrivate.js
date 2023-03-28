const mongoose = require('mongoose')

const groupPrivateSchema = mongoose.Schema({
     members: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
         },
         nickname: {
             type: String,
         }
        }
     ],
     theme: {
       type: String
     },
     typeGroup: {
       type: Number,
     }
}, {timestamps:true})

module.exports = mongoose.model('GroupPrivate', groupPrivateSchema)
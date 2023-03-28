const mongoose = require('mongoose')


const refreshTokenSchema = mongoose.Schema({
      refreshToken: {
            type: String,
      }
}, { timestamp: true}
)

module.exports = mongoose.model('RefreshToken', refreshTokenSchema)
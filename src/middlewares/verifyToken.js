const jwt = require('jsonwebtoken');


const verifyToken = (req, res, next) => {
      const accessToken = req.headers.token

      if (accessToken) {
         jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
            if (err) {
                  res.status(500).json('Token is wrong !')
            }

            if (user) {
               req.user = user
               next()
            }
         })
      } else {
            res.status(500).json({message: 'You are not login!'})
      }
}

module.exports = verifyToken
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const RefreshToken = require('../models/RefreshToken');

const authController = {
      findUser: async (req, res) => {
          try {
              const AllUser = await User.find()
              const Users = AllUser.filter(user => user.username.includes(req.params.keyword))
              res.status(200).json({Users})
          } catch (err) {
            res.status(500).json(err)
          }
      },
      getAllUser: async (req, res) => {
            const users = await User.find()
            res.status(200).json({users})
      },
      getOneUser: async (req, res) => {
        const { id } = req.params
        const user = await User.findOne({_id: id}).populate('friends')
        res.status(200).json({user})
      },
      updateUser: async (req, res) => {
        try {
          await User.updateOne(
            { _id: ObjectId(req.params.id) },
            { $set: {
                  email: req.body.email,
                  password: req.body.password
              }
            }
          )
          return res.status(200).json("Update Success !")

        } catch (e) {
          return res.status(500).json(e)
        }
      },
      register: async (req, res) => {
           const isUser = await User.findOne({ $or: [{username: req.body.username}, {email: req.body.email}]})
               if (isUser) {
                  return res.status(400).json({message: 'User already exists'})
               }

               try {
                  const salt = await bcrypt.genSalt(10);
                  const hashedPassword = await bcrypt.hash(req.body.password, salt);
            
                  const newUser = new User({ 
                            username: req.body.username,
                            password: hashedPassword,
                            email: req.body.email,
                            avatar: "https://cdn.pixabay.com/photo/2018/08/28/12/41/avatar-3637425__340.png"
                        });
                 const user = await newUser.save()
                          
                 const { password, ...others } = user._doc
                  return res.status(200).json({...others})
                  
               } catch (err) {
                  return res.status(500).json({message: 'Internal sever error'})
               }
      },
      generateAccessToken: (user) => {
            return jwt.sign(
              {
                id: user.id,
              },
              process.env.JWT_ACCESS_KEY,
              { expiresIn: "365d" }
            );
          },
      generateRefreshToken: (user) => {
            return jwt.sign(
              {
                id: user.id,
              },
              process.env.JWT_REFRESH_KEY,
              { expiresIn: "365d" }
            );
      },
      login: async (req, res) => {
        try {
          const user = await User.findOne({ email: req.body.email}).populate('friends')
               if (!user) {
                  return res.status(401).json({message: 'Email is wrong!'})
               }

               const match = await bcrypt.compare(req.body.password, user.password);
                if (!match) {
                  // Thông báo lỗi nếu mật khẩu không khớp
                  return res.status(402).json({ message: "Password is wrong!" });
                }
                  // Tạo token và refresh token
                 const accessToken = authController.generateAccessToken(user)
                 const refreshToken = authController.generateRefreshToken(user)

                //  Lưu refreshToken vào database

                const refreshToken_DB = new RefreshToken({
                  refreshToken: refreshToken
                })

                await refreshToken_DB.save()

                //  Lưu refreshTK vào cookie
                 res.cookie("refreshToken", refreshToken, {
                  httpOnly: true,
                  secure:false,
                  path: "/",
                  sameSite: "strict"
                });
                
                 const { password, ...others } = user._doc
                 return res.status(200).json({user: {...others}, accessToken, refreshToken})
        } catch (err) {
          res.status(500).json({ message: error.message })
        }
      },
      refreshToken: async (req, res) => {
          const refreshToken = req.cookies.refreshToken
          if (!refreshToken) {
            return res.status(500).json("You are not authenticated !")
          }
           
          const getRefreshTokens = await RefreshToken.find()
          const StoreRefreshToken = []
          getRefreshTokens.forEach(item => {
            StoreRefreshToken.push(item.refreshToken)
          })

          if (!StoreRefreshToken.includes(refreshToken)) { return res.status(500).json("Token is not valid !")}

          jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, async (err, user) => {
            if (err) { return res.status(500).json("ERROR")}
            const newAccessToken = authController.generateAccessToken(user)
            const newRefreshToken = authController.generateRefreshToken(user)


            await RefreshToken.findOneAndDelete({ refreshToken : refreshToken})
            const refreshTK = await new RefreshToken({
              refreshToken: newRefreshToken
            })
            
            await refreshTK.save()

            res.cookie("refreshToken", newRefreshToken, { 
              httpOnly: true,
              secure: false,
              path: "/",
              sameSite: "strict"
            })

           return res.status(200).json({accessToken: newAccessToken})

          })


      }
}


module.exports = authController
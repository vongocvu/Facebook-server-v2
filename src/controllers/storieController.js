const Storie = require('../models/Storie')
const User = require('../models/User')


const StorieController = {
  addStorie: async ( req, res ) => {
     try {
        const newStorie = new Storie({
          author: req.body.author,
          image: req.file.path ? req.file.path : "",
          background: req.body.background,
          text: []
      })

      const addNewStorie = await newStorie.save()
      res.status(200).json(addNewStorie)

     } catch ( err ) {
       res.status(500).json(err)
     }
  },
  updateStorie: async ( req, res ) => {
    try {
       
      await Storie.findByIdAndUpdate(req.params.id, {
        $push: {
           text: req.body.text
        }
      })
     res.status(200).json('update success')

    } catch ( err ) {
      res.status(500).json(err)
    }
 },
  getStorie: async ( req, res ) => {
       try {
          const user = await User.findOne({ _id: req.params.user})
          const getStorie = await Storie.find({
            $or: [
              { author: user._id },
              { author: { $in: user.friends } },
            ],
          }).populate('author')
          .sort({ createdAt: - 1})

          res.status(200).json(getStorie)

       } catch (err) {
         res.status(500).json(err)
       }
  },
  getOneStorie: async ( req, res ) => {
    try {
       const getOneStorie = await Storie.findOne({_id: req.params.id}).populate('author')
       res.status(200).json(getOneStorie)

    } catch (err) {
      res.status(500).json(err)
    }
}
}


module.exports = StorieController
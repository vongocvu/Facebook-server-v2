const PostDetail = require('../models/PostDetail')
const User = require('../models/User')


const postController = {
  addPostDetail: async (req, res) => {
    try {
       const newPost = await new PostDetail({
           content: req.body.content,
           image: req.file.path,
           parent_post: req.body.parent_post,
           reacts: [],
       })
       
      const newPostSave =  await newPost.save()
       res.status(200).json(newPostSave)
    } catch (err) {
      res.status(500).json(err)
    }
  },
  getByPost: async (req, res) => {
    try {
      const Posts = await PostDetail.find({ parent_post: req.params.idPost }).sort({createdAt: -1})

      res.status(200).json(Posts)
    } catch (err) {
      res.status(500).json(err)
    }
  },
  getPostsPublic: async (req, res) => {
    try {
         const UserId = await User.findOne({ _id: req.params.idUser})
         const Posts = await PostDetail.find({
          $or: [
            { author: UserId },
            { author: { $in: UserId.friends } },
            { share: 1 }
          ]
         })
         .sort({createdAt: -1})
         
         res.status(200).json(Posts)

    } catch (err) {
      res.status(500).json(err)
    }
  }
  ,
  getMyPostsDetail: async (req, res) => {
    try {
         const Posts = await PostDetail.find({author : req.params.idUser})
         .sort({createdAt: -1})
         
         res.status(200).json(Posts)

    } catch (err) {
      res.status(500).json(err)
    }
  }
  ,
  getOnePostDetail: async (req, res) => {
    try {
       const post = await PostDetail.findOne({ _id: req.params.idPostDetail}).populate({
        path: 'parent_post',
        populate: {
          path: 'author',
          model: 'User'
        }
      })

      const PostGroup = await PostDetail.find({ parent_post: post.parent_post._id }).sort({createdAt: -1})
       
      res.status(200).json({curent_post: post, groupPost: PostGroup})
    } catch (err) {
      res.status(500).json(err)
    }
  },
  deletePostDetail: async (req, res) => {
     try {
        await PostDetail.findOneAndDelete({ _id: req.params.idPostDetail})
        res.status(200).json('Delete post successfully !')

     } catch (err) {
      res.status(500).json(err)
     }
  }
}

module.exports = postController
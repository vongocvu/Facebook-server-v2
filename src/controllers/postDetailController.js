const PostDetail = require('../models/PostDetail')
const User = require('../models/User')
const Comment = require('../models/Comment')


const postController = {
  addPostDetail: async (req, res) => {
    try {
       const newPost = new PostDetail({
           content: req.body.content,
           image: req.file.path,
           parent_post: req.body.parent_post,
           reacts: [],
       })
       
      const newPostSave = await newPost.save()
       res.status(200).json(newPostSave)
    } catch (err) {
      res.status(500).json(err)
    }
  },
  getByPost: async (req, res) => {
    try {
      const Posts = await PostDetail.find({ parent_post: req.params.idPost })
      .sort({createdAt: -1})

      res.status(200).json(Posts)
    } catch (err) {
      res.status(500).json(err)
    }
  },
  getOnePostDetail: async (req, res) => {
    try {
      const post = await PostDetail.findOne({ _id: req.params.idPostDetail})
      .populate({
          path: 'parent_post',
          populate: {
            path: 'author',
            model: 'User'
          }
        })
      .populate('reacts.user')


      const Data = []
      const countComments = await Comment.count({ post: post._id });
      Data.push({...post._doc, countComments})

      const PostGroup = await PostDetail.find({ parent_post: post.parent_post._id }).sort({createdAt: -1})
       
      res.status(200).json({curent_post: {...Data[0]}, groupPost: PostGroup})
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
  },
  likePost: async (req, res) => {
    const postId = req.params.id;
    const react = req.body.react;
  
    // Kiểm tra xem react đã tồn tại trong mảng reacts hay chưa
    const post = await PostDetail.findById(postId);
    const index = post?.reacts.findIndex(item => item?.user.toString() === react.user);
  
    if (index !== -1) {
      // Nếu react đã tồn tại, cập nhật giá trị mới nhất của nó
      await PostDetail.findOneAndUpdate(
        { _id: postId, "reacts.user": react.user },
        { $set: { "reacts.$": react } }
      );
    } else {
      // Nếu react chưa tồn tại, thêm mới nó vào mảng reacts
      await PostDetail.updateOne(
        { _id: postId },
        { $push: { reacts: react } }
      );
    }
  
    res.status(200).json('Like posi is susscess !');
  },
  cancelLikePost: async (req, res) => {
    await PostDetail.findByIdAndUpdate(req.params.id, {
      $pull: {
         reacts: { user: req.body.user }
      }
    })

    res.status(200).json('Like posi is susscess !')
 }
}

module.exports = postController
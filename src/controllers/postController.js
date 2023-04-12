const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");

const postController = {
  addPost: async (req, res) => {
    try {
      const newPost = await new Post({
        author: req.body.author,
        content: req.body.content,
        status_share: req.body.status_share,
        reacts: [],
        tags: req.body.tags,
        feeling: req.body.feeling
      });

      const PostData = await newPost.save();

      res.status(200).json(PostData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getPosts: async (req, res) => {
    try {
      const UserID = await User.findOne({ _id: req.params.idUser });
      const Posts = await Post.find({
        $or: [
          { author: UserID._id },
          { author: { $in: UserID.friends } },
          { status_share: 1 },
        ],
      }).sort({createdAt: -1})
      .limit(req.params.limit)
      .populate('author')
      .populate('tags')
      .populate('reacts.user')

      const Data = []
     
      for (let post of Posts) {
        const countComments = await Comment.count({ post: post._id });
        Data.push({...post._doc, countComments})
      }
      
      res.status(200).json(Data);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getMyPosts: async (req, res) => {

    try {
      const Posts = await Post.find({
        $or: [
          { author: req.params.idUser },
          { tags: {
              $in: req.params.idUser
          }}
         ]
      }).sort({createdAt: -1})
      .limit(req.params.limit)
      .populate('author')
      .populate('tags')
      .populate('reacts.user')

      const Data = []
     
      for (let post of Posts) {
        const countComments = await Comment.count({ post: post._id });
        Data.push({...post._doc, countComments})
      }
      
      res.status(200).json(Data);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  likePost: async (req, res) => {
    const postId = req.params.id;
    const react = req.body.react;
  
    // Kiểm tra xem react đã tồn tại trong mảng reacts hay chưa
    const post = await Post.findById(postId);
    const index = post?.reacts.findIndex(item => item?.user.toString() === react.user);
  
    if (index !== -1) {
      // Nếu react đã tồn tại, cập nhật giá trị mới nhất của nó
      await Post.findOneAndUpdate(
        { _id: postId, "reacts.user": react.user },
        { $set: { "reacts.$": react } }
      );
    } else {
      // Nếu react chưa tồn tại, thêm mới nó vào mảng reacts
      await Post.updateOne(
        { _id: postId },
        { $push: { reacts: react } }
      );
    }
  
    res.status(200).json('Like posi is susscess !');
  },
  cancelLikePost: async (req, res) => {
    await Post.findByIdAndUpdate(req.params.id, {
      $pull: {
         reacts: { user: req.body.user }
      }
    })

    res.status(200).json('Like posi is susscess !')
 }
};

module.exports = postController;

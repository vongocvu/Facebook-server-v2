const Post = require("../models/Post");
const User = require("../models/User");

const postController = {
  addPost: async (req, res) => {
    try {
      const newPost = await new Post({
        author: req.body.author,
        content: req.body.content,
        status_share: req.body.status_share,
        reacts: [],
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

      res.status(200).json(Posts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getMyPosts: async (req, res) => {
    try {
      const Posts = await Post.find({
           author: req.params.idUser 
      }).sort({createdAt: -1})
      .populate('author')

      res.status(200).json(Posts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = postController;

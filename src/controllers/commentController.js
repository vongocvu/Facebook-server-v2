const Comment = require("../models/Comment");

const CommentController = {
  addComment: async (req, res) => {
    try {
      const { author, content, post, parent_id, level } = req.body;

      const newComment = new Comment({
        author: author,
        content: content,
        post: post,
        parent_id: parent_id,
        level: level,
        react: [],
      });

      const comment = await newComment.save();
      res.status(200).json(comment);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getByPost: async (req, res) => {
    try {
      const Comments = await Comment.find({
        
            $and: [
              { level : 1},
              { post: req.params.idPost }
            ]
        
        })?.populate(
          "author"
        );
      res.status(200).json(Comments);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getByParent: async (req, res) => {
    try {
      const Comments = await Comment.find({
           parent_id: req.params.idParent 
      })?.populate("author");

      res.status(200).json(Comments);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = CommentController;

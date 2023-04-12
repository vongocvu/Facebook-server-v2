const Comment = require("../models/Comment");

const CommentController = {
  addComment: async (req, res) => {
    try {
      const { author, content, post, parent_id, level } = req.body;

      const newComment = new Comment({
        author: author,
        content: content ? content : "",
        post: post,
        parent_id: parent_id,
        level: level,
        react: [],
        image: req?.file?.path ? req?.file?.path : ""
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
        
        })
        .limit(req.params.limit)
        .populate( "author")
        .populate('react.user')

      res.status(200).json(Comments);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getByParent: async (req, res) => {
    try {
      const Comments = await Comment.find({
           parent_id: req.params.idParent 
      })
      .limit(req.params.limit)
      .populate("author");

      res.status(200).json(Comments);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getCommentImage: async (req, res) => {
    try {

      const ImageComment = await Comment.findOne({ _id: req.params.idComment})
      const dataImages = await Comment.find({ 
        post: ImageComment.post, 
        image: { $exists: true },
        image: { $ne: " " }
      })

      res.status(200).json({image: ImageComment.image, dataImages: dataImages});

    } catch (err) {
      res.status(500).json(err);
    }
  },
  likeComment: async (req, res) => {
    const commentId = req.params.id;
    const react = req.body.react;
  
    // Kiểm tra xem react đã tồn tại trong mảng reacts hay chưa
    const comment = await Comment.findById(commentId);
    const index = comment.react.findIndex(item => item?.user?.toString() === react.user);
  
    if (index !== -1) {
      // Nếu react đã tồn tại, cập nhật giá trị mới nhất của nó
      await Comment.findOneAndUpdate(
        { _id: commentId, "react.user": react.user },
        { $set: { "react.$": react } }
      );
    } else {
      // Nếu react chưa tồn tại, thêm mới nó vào mảng reacts
      await Comment.updateOne(
        { _id: commentId },
        { $push: { react: react } }
      );
    }
  
    res.status(200).json('Like comment is susscess !');
  },
  cancelLikeComment: async (req, res) => {
    await Comment.findByIdAndUpdate(req.params.id, {
      $pull: {
         react: { user: req.body.user }
      }
    })

    res.status(200).json('Like Comment is susscess !')
 }
};

module.exports = CommentController;

const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
      author: { 
             type: mongoose.Schema.Types.ObjectId,
             ref: 'User'
      },
      content: { 
             type: String, 
             required: true 
      },
      post: {
             type: mongoose.Schema.Types.ObjectId,
             ref: 'Post' 
      },
      parent_id: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'Comment'
      },
      level: {  
              type: Number 
      },
      image: {
              type: String
      },
      react: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
          reactName: {
            type: String,
          },
          reactUrl: {
            type: String,
          },
          reactColor: {
            type: String,
          },
        },
      ],
    }, {timestamps:true});

module.exports = mongoose.model('Comment', CommentSchema);

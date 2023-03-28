const mongoose = require("mongoose");

const PostDetailSchema = new mongoose.Schema(
  {
    content: {
      type: String,
    },
    image: {
      type: String,
    },
    parent_post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    reacts: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        reactName: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("PostDetail", PostDetailSchema);

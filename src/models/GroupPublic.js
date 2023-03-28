const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    typeGroup: {
      type: Number,
    },
    avatar: {
      type: String,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    description: {
      type: String,
    },
    theme: {
      type: String,
    },
    members: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        nickname: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("GroupPublic", GroupSchema);

const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3
    },
    content: {
      type: String,
      required: true,
      trim: true,
      minlength: 10
    },
    author: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    timestamps: true // tallentaa createdAt ja updatedAt automaattisesti
  }
);

module.exports = mongoose.model('Post', postSchema);

const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  comment: String, 
  subject: String,
  status: String,
  created: {
    type: Date,
    default: Date.now
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'post'
  }
});

const Comment = mongoose.model('comments', commentSchema);

const getCommentDetails = async () => {
  try {
    const comments = await Comment.find();
    console.log('All Comments:', comments);
    return comments;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const insertComment = async (commentData) => {
  try {
    const insertResult = await Comment.insertMany(commentData);
    console.log(insertResult);
    return insertResult;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

const updateComment = async (Id, commentsData) => {
  try {
    const { comment } = commentsData; 

    const updateResult = await Comment.updateOne({ _id: Id }, { $set: { comment } });
    console.log(updateResult);
    return updateResult;
  } catch (err) {
    console.log(err);
    throw err;
  }
};


const deleteComment = async (idpost) => {
  try {
    const deleteResult = await Comment.deleteMany({ _id: idpost });
    console.log(deleteResult);
    return deleteResult;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

module.exports = { getCommentDetails, insertComment, updateComment, deleteComment };

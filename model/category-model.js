const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  category_name: String,
  description: [{ type: String }],
  status: String,
  created: {
    type: Date,
    default: Date.now
  },
  posts: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Posts'
      //
  }]
});

const Category = mongoose.model('categorys', categorySchema);

const getCatDetails = async () => {
  try {
    const categories = await Category.find()
    .populate('posts', '_id title description');

    console.log('All Categories:', categories);
    return categories;
  } catch (error) {
    console.error(error);
    
  }
}

const addCategory = async (categoryData) => {
  try {
    const insertResult = await Category.insertMany(categoryData);
    console.log(insertResult);
    return insertResult;
  } catch (err) {
    console.log(err);
    
  }
}

const updateCategory = async (catTitle, catPostData) => {
  try {
    const updateResult = await Category.updateOne({ category_name: catTitle }, { $set: { description: catPostData[0].description } });
    console.log(updateResult);
    return updateResult;
  } catch (err) {
    console.log(err);
  }
}


const deleteCatData = async (idpost) => {
  try {
    const deleteResult = await Category.deleteMany({ _id: idpost  });
    console.log(deleteResult);
    return deleteResult;
  } catch (err) {
    console.log(err);
   
  }
}

module.exports = { getCatDetails, addCategory, updateCategory, deleteCatData };

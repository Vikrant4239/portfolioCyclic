const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,

    },
    slug:{
        type:String,
        lowercase:true
    }
})
const CategoryModel = mongoose.model('category', categorySchema);

module.exports = CategoryModel
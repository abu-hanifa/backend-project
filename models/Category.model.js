const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    name: String,
    subcategories: String
})
const Category = mongoose.model('Category', categorySchema)
module.exports = Category
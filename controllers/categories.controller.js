const Category = require('../models/Category.model')

module.exports.categoryController = {
    getCategories: async (req, res) => {
        const category = await Category.find()
        res.json(category)
    },

    deleteCategories: async (req, res) => {
        try {
            await Category.findByIdAndRemove(req.params.id)
            res.json('удалено')
            
        } catch (error) {
            res.status(401).json(error.toString())
        }
    },

    createCategories: async (req, res) => {
        try {
            const category = await Category.create({
                name: req.body.name
            })
            return res.json(category)
            
        } catch (error) {
            res.status(401).json(error.toString())
        }
    }
}
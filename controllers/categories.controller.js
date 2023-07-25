const Categories = require('../models/Categories.model')

module.exports.categoriesController = {
    getCategories: async (req, res) => {
        const categories = await Categories.find()
        res.json(categories)
    },

    deleteCategories: async (req, res) => {
        try {
            await Categories.findByIdAndRemove(req.params.id)
            res.json('удалено')
            
        } catch (error) {
            res.status(401).json(error.toString())
        }
    },

    createCategories: async (req, res) => {
        try {
            const categories = await Categories.create({
                name: req.body.name
            })
            return res.json(categories)
            
        } catch (error) {
            res.status(401).json(error.toString())
        }
    }
}
const {categoryController} = require('../controllers/categories.controller')
const {Router} = require('express')

const router = Router()

router.get('/categories', categoryController.getCategories)
router.post('/categories', categoryController.createCategories)
router.delete('/categories/:id', categoryController.deleteCategories)

module.exports = router
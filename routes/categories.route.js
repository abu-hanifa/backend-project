const {categoriesController} = require('../controllers/categories.controller')
const {Router} = require('express')

const router = Router()

router.get('/categories', categoriesController.getCategories)
router.post('/categories', categoriesController.createCategories)
router.delete('/categories/:id', categoriesController.deleteCategories)

module.exports = router
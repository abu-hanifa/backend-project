const { Router } = require('express');
const { CartController }= require ('../controllers/cart.controller')


const router = Router();

router.get('/user-cart', cartController.getUserCart)
router.patch('/cart-add/:id', cartController.addCloth)
router.patch('/cart-minus/:id', cartController.minusCloth)
router.patch('/cart-remove/:id', cartController.removeCloth)
router.patch('/buy', cartController.buyCloths)


module.exports = router




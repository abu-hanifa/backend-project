const { Router } = require("express");
const { favoriteController } = require("../controllers/favorite.controller");
const router = Router();

router.get('/favorites', authMiddleware,  favoriteController.getFavorite );
router.patch('/favorites/:id',authMiddleware, favoriteController.addFavorite);
router.delete('/favorites/:id', authMiddleware, favoriteController.deleteFavorite);

module.exports = router;
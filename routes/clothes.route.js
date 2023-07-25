const { Router } = require("express");
const { clothesController } = require('../controllers/clothes.controller')
const router = Router();

router.get("/cloth", clothesController.getCloth); // вывод всей одежды
// router.get("/cloth/category/:id", clothesController.); // вывод одежды по категории
router.post("/cloth", clothesController.addCloth); // добавление одежды

module.exports = router;

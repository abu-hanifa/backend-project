const { Router } = require("express");
const { clothesController } = require("../controllers/clothes.controller");
const fileMiddleware = require("../middlewares/file.middleware");
const router = Router();

router.get("/cloth", clothesController.getCloth); // вывод всей одежды
router.get("/cloth/category/:id", clothesController.getClothByCategory); // вывод одежды по категории
router.post(
  "/cloth",
  fileMiddleware.array("img", 4),
  clothesController.addCloth
); // добавление одежды

module.exports = router;

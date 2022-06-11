
const express = require("express");

const router = express.Router();
const upload = require("../../middlewares/file")
const {isAuth} = require("../../middlewares/auth.middleware");

const {
  getAllVideojuegos,
  getVideojuegosByID,
  createVideojuegos,
  deleteVideojuegos,
  patchVideojuego,
} = require("../controllers/videojuegos.controller");

router.get("/", getAllVideojuegos);
router.get("/:id",  getVideojuegosByID);
router.post("/",upload.single("caratula"), createVideojuegos);
router.delete('/:id',[isAuth],upload.single("caratula"), deleteVideojuegos);
router.patch('/:id',[isAuth],upload.single("caratula"), patchVideojuego)

module.exports = router;
const express = require("express");

const router = express.Router();
const upload = require("../../middlewares/file")
const {isAuth} = require("../../middlewares/auth.middleware");

const {
  getAllLibros,
  getLibrosByID,
  createLibros,
  deleteLibros,
  patchLibro,
} = require("../controllers/libros.controller");

router.get("/", getAllLibros);
router.get("/:id", getLibrosByID);
router.post("/", upload.single("portada"), createLibros);
router.delete('/:id',[isAuth], upload.single("portada"), deleteLibros);
router.patch('/:id',[isAuth], upload.single("portada"), patchLibro)

module.exports = router;

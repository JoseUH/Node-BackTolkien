
const express = require("express");

const router = express.Router();
const upload = require("../../middlewares/file")
const {isAuth} = require("../../middlewares/auth.middleware");

const {
  getAllPeliculas,
  getPeliculasByID,
  createPeliculas,
  deletePeliculas,
  patchPelicula,
} = require("../controllers/peliculas.controller");

router.get("/", getAllPeliculas);
router.get("/:id",  getPeliculasByID);
router.post("/",upload.single("caratula"), createPeliculas);
router.delete('/:id',[isAuth],upload.single("caratula"), deletePeliculas);
router.patch('/:id',[isAuth],upload.single("caratula"), patchPelicula)

module.exports = router;

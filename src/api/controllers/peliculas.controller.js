const { deleteFile } = require("../../middlewares/deleteFile");
const Pelicula = require("../models/peliculas.model.js");
const HTTPSTATUSCODE = require("../../utils/httpStatusCode")



const getAllPeliculas = async (req, res, next) => {
  try {
    
    const allPeliculas = await Pelicula.find();
    return res.json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      peliculas: allPeliculas,
    });
  } catch (error) {
    return next(error);
  }
};

const getPeliculasByID = async (req, res, next) => {
  try {
    const id = req.params.id;
    const peliculasByID = await Pelicula.findById(id);
    return res.json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      pelicula: peliculasByID,
    });
  } catch (error) {
    return next(error);
  }
};

const createPeliculas = async (req, res, next) => {
  try {
    const newPeliculas = new Pelicula(req.body);

    if (req.file) {
      newPeliculas.caratula = req.file.path;
    }
    const createdPeliculas = await newPeliculas.save();
    return res.json({
      status: 201,
      message: HTTPSTATUSCODE[201],
      console: createdPeliculas,
    });
  } catch (error) {
    return next(error);
  }
};

const deletePeliculas = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      const peliculaBorrado = await Pelicula.findByIdAndDelete(id);
  
      return res.status(200).json(peliculaBorrado);
    } catch (error) {
      return next(error);
    }
  };
  
  const patchPelicula = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      const patchPelicula = new Pelicula(req.body);
  
      patchPelicula._id = id;

      
      const peliculaData= await Pelicula.findById(id)


      if (peliculaData.caratula) {
        
        deleteFile(peliculaData.caratula);
        }

      if (req.file) {
        patchPelicula.caratula = req.file.path;
      }
  
      const PeliculaDB = await Pelicula.findByIdAndUpdate(id, patchPelicula);
      
      return res.status(200).json({ nuevo: patchPelicula, vieja: PeliculaDB });
    } catch (error) {

      return next(error);
    }
  };
  
module.exports = { getAllPeliculas, getPeliculasByID, createPeliculas,patchPelicula,deletePeliculas };

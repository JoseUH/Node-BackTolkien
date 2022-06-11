const { deleteFile } = require("../../middlewares/deleteFile");
const Videojuego = require("../models/videojuegos.model.js");
const HTTPSTATUSCODE = require("../../utils/httpStatusCode")



const getAllVideojuegos = async (req, res, next) => {
  try {
    
    const allVideojuegos = await Videojuego.find();
    return res.json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      videojuegos: allVideojuegos,
    });
  } catch (error) {
    return next(error);
  }
};

const getVideojuegosByID = async (req, res, next) => {
  try {
    const id = req.params.id;
    const videojuegosByID = await Videojuego.findById(id);
    return res.json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      videojuego: videojuegosByID,
    });
  } catch (error) {
    return next(error);
  }
};

const createVideojuegos = async (req, res, next) => {
  try {
    const newVideojuegos = new Videojuego(req.body);

    if (req.file) {
      newVideojuegos.caratula = req.file.path;
    }
    const createdVideojuegos = await newVideojuegos.save();
    return res.json({
      status: 201,
      message: HTTPSTATUSCODE[201],
      console: createdVideojuegos,
    });
  } catch (error) {
    return next(error);
  }
};

const deleteVideojuegos = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      const videojuegoBorrado = await Videojuego.findByIdAndDelete(id);
  
      return res.status(200).json(videojuegoBorrado);
    } catch (error) {
      return next(error);
    }
  };
  
  const patchVideojuego = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      const patchVideojuego = new Videojuego(req.body);
  
      patchVideojuego._id = id;

      
      const videojuegoData= await Videojuego.findById(id)


      if (videojuegoData.caratula) {
        
        deleteFile(videojuegoData.caratula);
        }

      if (req.file) {
        patchVideojuego.caratula = req.file.path;
      }
  
      const VideojuegoDB = await Videojuego.findByIdAndUpdate(id, patchVideojuego);
      
      return res.status(200).json({ nuevo: patchVideojuego, vieja: VideojuegoDB });
    } catch (error) {

      return next(error);
    }
  };
  
module.exports = { getAllVideojuegos, getVideojuegosByID, createVideojuegos,patchVideojuego,deleteVideojuegos };

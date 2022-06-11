const { deleteFile } = require("../../middlewares/deleteFile");
const Libro = require("../models/libros.model");
const HTTPSTATUSCODE = require("../../utils/httpStatusCode")



const getAllLibros = async (req, res, next) => {
  try {
    const allLibros = await Libro.find();
    return res.json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      libros: allLibros,
    });
  } catch (error) {
    return next(error);
  }
};


const getLibrosByID = async (req, res, next) => {
  try {
    const id = req.params.id;
    const librosByID = await Libro.findById(id);
    return res.json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      Libro: librosByID,
    });
  } catch (error) {
    return next(error);
  }
};


const createLibros = async (req, res, next) => {
  try {
    const newLibros = new Libro(req.body);
    if (req.file) {
      newLibros.portada = req.file.path;
    }
    const createdLibros = await newLibros.save();
    return res.json({
      status: 201,
      message: HTTPSTATUSCODE[201],
      libro: createdLibros,
    });
  } catch (error) {
    return next(error);
  }
};

const deleteLibros = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      const libroBorrado = await Libro.findByIdAndDelete(id);
  
      return res.status(200).json(libroBorrado);
    } catch (error) {
      return next(error);
    }
  };
  
  const patchLibro = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      const patchLibro = new Libro(req.body);
  
      patchLibro._id = id;

      const libroData= await Libro.findById(id)


      if (libroData.portada) {
        deleteFile(libroData.portada);
        }

      if (req.file) {
        patchLibro.portada = req.file.path;
      }
  
      const LibroDB = await Libro.findByIdAndUpdate(id, patchLibro);
      
      return res.status(200).json({ nuevo: patchLibro, vieja: LibroDB });
    } catch (error) {
      return next(error);
    }
  };

module.exports = { getAllLibros, getLibrosByID, createLibros,patchLibro,deleteLibros};

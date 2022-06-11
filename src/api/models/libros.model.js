const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LibroSchema = new Schema(
  {
    id: { type:Number, required: true},
    titulo: { type: String, required: true },
    portada: { type: String, required: true },
    year: { type: Number, required: false },
    autor: { type: String, required: false },
    descripcion: {type:String, requiered: false}
  },
  { timestamps: true }
);

const Libro = mongoose.model("libros", LibroSchema);

module.exports = Libro;
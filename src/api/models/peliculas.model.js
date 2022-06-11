const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PeliculaSchema = new Schema(
  {
    id: { type:Number, required: true},
    titulo: { type: String, required: true },
    caratula: { type: String, required: true },
    year: { type: Number, required: false },
    director: { type: String, required: false },
    descripcion: {type:String, requiered: false}
  },
  { timestamps: true }
);

const Pelicula = mongoose.model("peliculas", PeliculaSchema);

module.exports = Pelicula;

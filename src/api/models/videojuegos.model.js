const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const VideojuegoSchema = new Schema(
  {
    id: { type:Number, required: true},
    titulo: { type: String, required: true },
    caratula: { type: String, required: true },
    year: { type: Number, required: false },
    plataformas: { type: String, required: false },
    descripcion: {type:String, requiered: false}
  },
  { timestamps: true }
);

const Videojuego = mongoose.model("videojuegos", VideojuegoSchema);

module.exports = Videojuego;

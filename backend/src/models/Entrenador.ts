// src/models/Entrenador.ts
import mongoose, { Schema, InferSchemaType } from "mongoose";

const entrenadorSchema = new Schema(
  {
    nombre: { type: String, required: true, trim: true, minlength: 2, maxlength: 60 },
    apellido: { type: String, required: true, trim: true, minlength: 2, maxlength: 80 },
    telefono: { type: String, required: true, unique: true, trim: true, match: /^[0-9+\-\s()]{7,20}$/ },
    medallas: { type: Number, required: true, min: 0, max: 20, default: 0 },
  },
  { timestamps: true }
);

export type EntrenadorDoc = InferSchemaType<typeof entrenadorSchema>;

const Entrenador = mongoose.model<EntrenadorDoc>("Entrenador", entrenadorSchema);
export default Entrenador;

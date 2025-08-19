// src/services/entrenadorService.ts
import Entrenador from "../models/Entrenador";

export const listEntrenadores = () => Entrenador.find().sort({ createdAt: -1 });
export const getEntrenador = (id: string) => Entrenador.findById(id);
export const createEntrenador = (data: any) => Entrenador.create(data);
export const updateEntrenador = (id: string, data: any) => Entrenador.findByIdAndUpdate(id, data, { new: true, runValidators: true });
export const deleteEntrenador = (id: string) => Entrenador.findByIdAndDelete(id);


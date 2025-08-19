// src/routes/index.ts
import { Router } from "express";
import pokeRoutes from "./pokeRoutes";
import entrenadorRoutes from "./entrenadorRoutes";

const api = Router();
api.use("/pokemons", pokeRoutes);
api.use("/entrenadores", entrenadorRoutes);

export default api;

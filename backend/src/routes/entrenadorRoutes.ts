// src/routes/entrenadorRoutes.ts
import { Router } from "express";
import { validate } from "../middlewares/validate";
import { createEntrenadorSchema, updateEntrenadorSchema, idParamSchema } from "../controllers/schemas/entrenadorSchemas";
import { getEntrenadores, getEntrenadorById, postEntrenador, putEntrenador, delEntrenador } from "../controllers/entrenadorController";

const r = Router();
r.get("/", getEntrenadores);
r.get("/:id", validate(idParamSchema), getEntrenadorById);
r.post("/", validate(createEntrenadorSchema), postEntrenador);
r.put("/:id", validate(updateEntrenadorSchema), putEntrenador);
r.delete("/:id", validate(idParamSchema), delEntrenador);

export default r;

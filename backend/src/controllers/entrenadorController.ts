// src/controllers/entrenadorController.ts
import { Request, Response, NextFunction } from "express";
import { listEntrenadores, getEntrenador, createEntrenador, updateEntrenador, deleteEntrenador } from "../services/entrenadorService";

export const getEntrenadores = async (_: Request, res: Response, next: NextFunction) => {
  try { res.json(await listEntrenadores()); } catch (e) { next(e); }
};
export const getEntrenadorById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const item = await getEntrenador(req.params.id);
    if (!item) return res.status(404).json({ error: "No encontrado" });
    res.json(item);
  } catch (e) { next(e); }
};
export const postEntrenador = async (req: Request, res: Response, next: NextFunction) => {
  try { res.status(201).json(await createEntrenador(req.body)); } catch (e) { next(e); }
};
export const putEntrenador = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updated = await updateEntrenador(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: "No encontrado" });
    res.json(updated);
  } catch (e) { next(e); }
};
export const delEntrenador = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deleted = await deleteEntrenador(req.params.id);
    if (!deleted) return res.status(404).json({ error: "No encontrado" });
    res.status(204).send();
  } catch (e) { next(e); }
};

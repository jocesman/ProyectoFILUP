import { apiGet, apiJson } from "../pages/client";

export type Entrenador = { _id: string; nombre: string; apellido: string; telefono: string; medallas: number };

export const listEntrenadores = () => apiGet<Entrenador[]>("/entrenadores");
export const createEntrenador = (data: Omit<Entrenador, "_id">) => apiJson<Entrenador>("/entrenadores", "POST", data);
export const updateEntrenador = (id: string, data: Partial<Omit<Entrenador, "_id">>) =>
  apiJson<Entrenador>(`/entrenadores/${id}`, "PUT", data);
export const deleteEntrenador = (id: string) =>
  fetch(`${import.meta.env.VITE_API_URL || "http://localhost:3001/api"}/entrenadores/${id}`, { method: "DELETE" });

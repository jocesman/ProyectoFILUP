// src/controllers/schemas/entrenadorSchemas.ts
import { z } from "zod";

export const createEntrenadorSchema = z.object({
  body: z.object({
    nombre: z.string().min(2).max(60),
    apellido: z.string().min(2).max(80),
    telefono: z.string().regex(/^[0-9+\-\s()]{7,20}$/),
    medallas: z.number().int().min(0).max(8),
  }),
});

export const updateEntrenadorSchema = z.object({
  params: z.object({ id: z.string().length(24) }),
  body: z.object({
    nombre: z.string().min(2).max(60).optional(),
    apellido: z.string().min(2).max(80).optional(),
    telefono: z.string().regex(/^[0-9+\-\s()]{7,20}$/).optional(),
    medallas: z.number().int().min(0).max(8).optional(),
  }),
});

export const idParamSchema = z.object({
  params: z.object({ id: z.string().length(24) }),
});

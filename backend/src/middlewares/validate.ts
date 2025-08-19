// src/middlewares/validate.ts
import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

export const validate =
  (schema: ZodSchema<any>) => (req: Request, res: Response, next: NextFunction) => {
    const data = { body: req.body, query: req.query, params: req.params };
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      return res.status(400).json({ error: "Validación fallida", issues: parsed.error.issues });
    }
    next();
  };

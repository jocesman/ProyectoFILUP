// src/controllers/entrenadorController.ts
import { Request, Response, NextFunction } from "express";
import { listEntrenadores, getEntrenador, createEntrenador, updateEntrenador, deleteEntrenador } from "../services/entrenadorService";

/**
 * @swagger
 * tags:
 *   name: Entrenadores
 *   description: Gestión de entrenadores Pokémon
 */

/**
 * @swagger
 * /entrenadores:
 *   get:
 *     summary: Obtiene todos los entrenadores
 *     tags: [Entrenadores]
 *     responses:
 *       200:
 *         description: Lista de todos los entrenadores registrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Entrenador'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
export const getEntrenadores = async (_: Request, res: Response, next: NextFunction) => {
  try { res.json(await listEntrenadores()); } catch (e) { next(e); }
};

/**
 * @swagger
 * /entrenadores/{id}:
 *   get:
 *     summary: Obtiene un entrenador por ID
 *     tags: [Entrenadores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: mongoId
 *         description: ID del entrenador a buscar
 *     responses:
 *       200:
 *         description: Entrenador encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Entrenador'
 *       404:
 *         description: Entrenador no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       400:
 *         description: ID inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
export const getEntrenadorById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const item = await getEntrenador(req.params.id);
    if (!item) return res.status(404).json({ error: "No encontrado" });
    res.json(item);
  } catch (e) { next(e); }
};

/**
 * @swagger
 * /entrenadores:
 *   post:
 *     summary: Crea un nuevo entrenador
 *     tags: [Entrenadores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - apellido
 *               - telefono
 *               - medallas
 *             properties:
 *               nombre:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 60
 *                 example: "Ash"
 *               apellido:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 80
 *                 example: "Ketchum"
 *               telefono:
 *                 type: string
 *                 pattern: "^[0-9+\\-\\s()]{7,20}$"
 *                 example: "1234567890"
 *               medallas:
 *                 type: integer
 *                 minimum: 0
 *                 maximum: 20
 *                 example: 8
 *     responses:
 *       201:
 *         description: Entrenador creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Entrenador'
 *       400:
 *         description: Datos de entrada inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Validación fallida"
 *                 issues:
 *                   type: array
 *                   items:
 *                     type: object
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
export const postEntrenador = async (req: Request, res: Response, next: NextFunction) => {
  try { res.status(201).json(await createEntrenador(req.body)); } catch (e) { next(e); }
};

/**
 * @swagger
 * /entrenadores/{id}:
 *   put:
 *     summary: Actualiza un entrenador existente
 *     tags: [Entrenadores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: mongoId
 *         description: ID del entrenador a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 60
 *                 example: "Ash"
 *               apellido:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 80
 *                 example: "Ketchum"
 *               telefono:
 *                 type: string
 *                 pattern: "^[0-9+\\-\\s()]{7,20}$"
 *                 example: "1234567890"
 *               medallas:
 *                 type: integer
 *                 minimum: 0
 *                 maximum: 20
 *                 example: 8
 *     responses:
 *       200:
 *         description: Entrenador actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Entrenador'
 *       404:
 *         description: Entrenador no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       400:
 *         description: Datos de entrada inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Validación fallida"
 *                 issues:
 *                   type: array
 *                   items:
 *                     type: object
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
export const putEntrenador = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updated = await updateEntrenador(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: "No encontrado" });
    res.json(updated);
  } catch (e) { next(e); }
};

/**
 * @swagger
 * /entrenadores/{id}:
 *   delete:
 *     summary: Elimina un entrenador
 *     tags: [Entrenadores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: mongoId
 *         description: ID del entrenador a eliminar
 *     responses:
 *       204:
 *         description: Entrenador eliminado exitosamente
 *       404:
 *         description: Entrenador no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       400:
 *         description: ID inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
export const delEntrenador = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deleted = await deleteEntrenador(req.params.id);
    if (!deleted) return res.status(404).json({ error: "No encontrado" });
    res.status(204).send();
  } catch (e) { next(e); }
};

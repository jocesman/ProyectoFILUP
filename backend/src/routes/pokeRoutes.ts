// src/routes/pokeRoutes.ts
import { Router } from "express";
import { getPokemons, getPokemonsPDF } from "../controllers/pokeController";

const router = Router();

/**
 * @swagger
 * /pokemons:
 *   get:
 *     summary: Obtiene lista de Pokémon
 *     tags: [Pokédex]
 *     // ... (la documentación se hereda del controlador)
 */
router.get("/", getPokemons);

/**
 * @swagger
 * /pokemons/pdf:
 *   get:
 *     summary: Descarga PDF de Pokémon
 *     tags: [Pokédex]
 *     // ... (la documentación se hereda del controlador)
 */
router.get("/pdf", getPokemonsPDF);

export default router;
// src/routes/pokeRoutes.ts
import { Router } from "express";
import { getPokemons, getPokemonsPDF } from "../controllers/pokeController";

const router = Router();
    
router.get("/", getPokemons);
router.get("/pdf", getPokemonsPDF);

export default router;

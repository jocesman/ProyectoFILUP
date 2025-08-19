// src/controllers/pokeController.ts
import { Request, Response, NextFunction } from "express";
import { fetchAllPokemonNames, applySearchSortPaginate, fetchPokemonDetail } from "../services/pokeService";
import { createPokemonsPDF } from "../utils/pdf";

export const getPokemons = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const search = (req.query.search as string) || undefined;
    const limit = req.query.limit ? Number(req.query.limit) : undefined;
    const page = req.query.page ? Number(req.query.page) : undefined;

    const all = await fetchAllPokemonNames();
    const { list, meta } = applySearchSortPaginate(all, { search, limit, page });

    // Respuesta ligera: solo nombres + url (frontend pedirá detalles si quiere)
    res.json({ data: list, meta });
  } catch (err) {
    next(err);
  }
};

export const getPokemonsPDF = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const search = (req.query.search as string) || undefined;
    const limit = req.query.limit ? Number(req.query.limit) : undefined;
    const page = req.query.page ? Number(req.query.page) : undefined;

    const all = await fetchAllPokemonNames();
    const { list } = applySearchSortPaginate(all, { search, limit, page });

    // Obtener detalles SOLO de los que van al PDF (eficiente)
    const details = await Promise.all(list.map((i) => fetchPokemonDetail(i.name)));

    // Streaming PDF (inline download)
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="pokedex.pdf"');

    await createPokemonsPDF(details, res); // escribe en res y finaliza
  } catch (err) {
    next(err);
  }
};

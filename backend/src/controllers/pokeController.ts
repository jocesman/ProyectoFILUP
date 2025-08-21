// src/controllers/pokeController.ts
import { Request, Response, NextFunction } from "express";
import { fetchAllPokemonNames, applySearchSortPaginate, fetchPokemonDetail } from "../services/pokeService";
import { createPokemonsPDF } from "../utils/pdf";

/**
 * @swagger
 * tags:
 *   name: Pokédex
 *   description: Gestión de datos Pokémon desde PokeAPI
 */

/**
 * @swagger
 * /pokemons:
 *   get:
 *     summary: Obtiene lista de Pokémon con paginación y búsqueda
 *     tags: [Pokédex]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Término de búsqueda para filtrar Pokémon por nombre
 *         example: "pika"
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Número de página para paginación
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *         description: Límite de resultados por página
 *         example: 10
 *     responses:
 *       200:
 *         description: Lista de Pokémon paginada y filtrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/PokemonListItem'
 *                 meta:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                       description: Total de Pokémon que coinciden con la búsqueda
 *                       example: 1000
 *                     page:
 *                       type: integer
 *                       description: Página actual
 *                       example: 1
 *                     limit:
 *                       type: integer
 *                       description: Límite de resultados por página
 *                       example: 10
 *                     pages:
 *                       type: integer
 *                       description: Total de páginas disponibles
 *                       example: 100
 *       400:
 *         description: Parámetros de paginación inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error al conectar con PokeAPI
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
export const getPokemons = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const search = (req.query.search as string) || undefined;
    const limit = req.query.limit ? Number(req.query.limit) : undefined;
    const page = req.query.page ? Number(req.query.page) : undefined;

    const all = await fetchAllPokemonNames();
    const { list, meta } = applySearchSortPaginate(all, { search, limit, page });

    res.json({ data: list, meta });
  } catch (err) {
    next(err);
  }
};

/**
 * @swagger
 * /pokemons/pdf:
 *   get:
 *     summary: Genera y descarga un PDF con la lista de Pokémon
 *     tags: [Pokédex]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Término de búsqueda para filtrar Pokémon por nombre
 *         example: "char"
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Número de página para paginación
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 50
 *         description: Límite de resultados por página (máximo 50 para PDF)
 *         example: 20
 *     responses:
 *       200:
 *         description: PDF generado exitosamente
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *         headers:
 *           Content-Disposition:
 *             schema:
 *               type: string
 *             description: Nombre del archivo PDF para descarga
 *       400:
 *         description: Parámetros de paginación inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error al generar el PDF o conectar con PokeAPI
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
export const getPokemonsPDF = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const search = (req.query.search as string) || undefined;
    const limit = req.query.limit ? Number(req.query.limit) : undefined;
    const page = req.query.page ? Number(req.query.page) : undefined;

    const all = await fetchAllPokemonNames();
    const { list } = applySearchSortPaginate(all, { search, limit, page });

    const details = await Promise.all(list.map((i) => fetchPokemonDetail(i.name)));

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="pokedex.pdf"');

    await createPokemonsPDF(details, res);
  } catch (err) {
    next(err);
  }
};











// import { Request, Response, NextFunction } from "express";
// import { fetchAllPokemonNames, applySearchSortPaginate, fetchPokemonDetail } from "../services/pokeService";
// import { createPokemonsPDF } from "../utils/pdf";

// export const getPokemons = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const search = (req.query.search as string) || undefined;
//     const limit = req.query.limit ? Number(req.query.limit) : undefined;
//     const page = req.query.page ? Number(req.query.page) : undefined;

//     const all = await fetchAllPokemonNames();
//     const { list, meta } = applySearchSortPaginate(all, { search, limit, page });

//     // Respuesta ligera: solo nombres + url (frontend pedirá detalles si quiere)
//     res.json({ data: list, meta });
//   } catch (err) {
//     next(err);
//   }
// };

// export const getPokemonsPDF = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const search = (req.query.search as string) || undefined;
//     const limit = req.query.limit ? Number(req.query.limit) : undefined;
//     const page = req.query.page ? Number(req.query.page) : undefined;

//     const all = await fetchAllPokemonNames();
//     const { list } = applySearchSortPaginate(all, { search, limit, page });

//     // Obtener detalles SOLO de los que van al PDF (eficiente)
//     const details = await Promise.all(list.map((i) => fetchPokemonDetail(i.name)));

//     // Streaming PDF (inline download)
//     res.setHeader("Content-Type", "application/pdf");
//     res.setHeader("Content-Disposition", 'attachment; filename="pokedex.pdf"');

//     await createPokemonsPDF(details, res); // escribe en res y finaliza
//   } catch (err) {
//     next(err);
//   }
// };

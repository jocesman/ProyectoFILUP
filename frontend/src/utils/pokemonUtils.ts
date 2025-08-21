// src/utils/pokemonUtils.ts

/**
 * Extrae el ID de un Pokémon desde la URL de la PokeAPI.
 * Ejemplo:
 *   https://pokeapi.co/api/v2/pokemon/60/  -> "60"
 */

export function getPokemonIdFromUrl(url: string): string {
  const parts = url.split("/");
  return parts[parts.length - 2]; // el penúltimo elemento siempre es el número
}

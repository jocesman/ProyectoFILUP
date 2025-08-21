// src/services/pokeService.ts
import axios from "axios";

type PokeListItem = { name: string; url: string };

export async function fetchAllPokemonNames(): Promise<PokeListItem[]> {
  // Límite amplio para no iterar múltiples requests
  const { data } = await axios.get("https://pokeapi.co/api/v2/pokemon", {
    params: { limit: 200000, offset: 0 },
  });
  return data.results as PokeListItem[];
}

export function applySearchSortPaginate(
  items: PokeListItem[],
  { search, limit, page }: { search?: string; limit?: number; page?: number }
) {
  let list = items;

  if (search && search.trim()) {
    const q = search.trim().toLowerCase();
    list = list.filter((i) => i.name.toLowerCase().includes(q));
  }

  // Orden alfabético
  list = list.sort((a, b) => a.name.localeCompare(b.name));

  if ((limit && !page) || (!limit && page)) {
    const err: any = new Error("Parámetros de paginación inválidos: envía limit y page juntos.");
    err.status = 400;
    throw err;
  }

  let meta = { total: list.length, page: 1, limit: list.length, pages: 1 };

  if (limit && page) {
    const start = (page - 1) * limit;
    const end = start + limit;
    const paged = list.slice(start, end);
    meta = { total: list.length, page, limit, pages: Math.max(1, Math.ceil(list.length / limit)) };
    return { list: paged, meta };
  }

  return { list, meta };
}

export async function fetchPokemonDetail(name: string) {
  const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  // habilidades, sprites, etc.
  return {
    name: data.name,
    abilities: (data.abilities || []).map((a: any) => a.ability?.name).filter(Boolean),
    image: data.sprites?.other?.["official-artwork"]?.front_default || data.sprites?.front_default || "",
  };
}

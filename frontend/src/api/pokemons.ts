import { apiGet, apiDownload } from "../pages/client";

export type PokeItem = { name: string; url: string };
export type PokeResponse = {
  data: PokeItem[];
  meta: { total: number; page: number; limit: number; pages: number };
};

export const getPokemons = (params: { search?: string; page?: number; limit?: number }) =>
  apiGet<PokeResponse>("/pokemons", params);

export const downloadPokedexPdf = async (params: { search?: string; page?: number; limit?: number }) => {
  const blob = await apiDownload("/pokemons/pdf", params);
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "pokedex.pdf";
  a.click();
  URL.revokeObjectURL(a.href);
};

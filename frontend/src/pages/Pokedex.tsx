import { useEffect, useState } from "react";
import { getPokemons, downloadPokedexPdf } from "../api/pokemons";

export default function Pokedex() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [data, setData] = useState<{ items: any[]; pages: number; total: number }>({ items: [], pages: 1, total: 0 });

  useEffect(() => {
    (async () => {
      try {
        const res = await getPokemons({ search, page, limit });
        setData({ items: res.data, pages: res.meta.pages, total: res.meta.total });
      } catch (err) {
        console.error(err);
      }
    })();
  }, [search, page, limit]);

  return (
    <div>
      <h2>Pokedex</h2>
      <div>
        <input
          placeholder="Buscar Pokémon"
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
        />
        <select value={limit} onChange={(e) => { setPage(1); setLimit(Number(e.target.value)); }}>
          <option value={10}>10</option><option value={20}>20</option><option value={50}>50</option>
        </select>
        <button onClick={() => downloadPokedexPdf({ search, page, limit })}>Descargar PDF</button>
      </div>

      <ul>
        {data.items.map((p) => (
          <li key={p.name}>{p.name}</li>
        ))}
      </ul>

      <div>
        <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Anterior</button>
        <span>{page} / {data.pages}</span>
        <button disabled={page >= data.pages} onClick={() => setPage((p) => p + 1)}>Siguiente</button>
      </div>
    </div>
  );
}

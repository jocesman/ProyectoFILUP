//src/pages/Pokedex.tsx
import { useEffect, useState } from "react";
import { getPokemons, downloadPokedexPdf } from "../api/pokemons";
import "../styles/pokedex.css";


export default function Pokedex() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [data, setData] = useState<{ items: any[]; pages: number; total: number }>({ items: [], pages: 1, total: 0 });
  const [selectedPokemon, setSelectedPokemon] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false); // Estado para la descarga del pdf

  const fetchPokemonDetails = async (url: string): Promise<void> => { 
    setLoading(true);
    try {
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      setSelectedPokemon(resultado);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPdf = async () => {
    setDownloading(true); // Activa estado de descarga del pdf
    
    try {
      await downloadPokedexPdf({ search, page, limit });
      // El navegador maneja la descarga automáticamente
    } catch (error) {
      console.error('Error al descargar el PDF:', error);
      alert('Error al generar el PDF. Por favor, intenta nuevamente.');
    } finally {
      setDownloading(false); // Desactiva el estado de descarga del pdf
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await getPokemons({ search, page, limit });
        console.log(res);
        setData({ items: res.data, pages: res.meta.pages, total: res.meta.total });
      } catch (err) {
        console.error(err);
      }
    })();
  }, [search, page, limit]);

  return (
    <div className="pokedex-container">
      {/* Panel izquierdo - Listado de Pokémons */}
      <div className="pokemon-list-panel">
        <h2>Pokédex</h2>
        
        <div className="search-controls">
          <input
            placeholder="Buscar Pokémon por nombre..."
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
          />
          <div className="controls-row">
            <select value={limit} onChange={(e) => { setPage(1); setLimit(Number(e.target.value)); }}>
              <option value={10}>10 por página</option>
              <option value={20}>20 por página</option>
              <option value={50}>50 por página</option>
            </select>
            <button 
              className="download-btn"
              onClick={handleDownloadPdf}
              disabled={downloading} // Deshabilita el botón durante la descarga
            >
              {downloading ? (
                <>
                  <span className="download-spinner"></span>
                  Generando...
                </>
              ) : (
                '📄 PDF'
              )}
            </button>
          </div>
        </div>

        <div className="pokemon-list">
          {data.items.map((p) => (
            <div 
              className="pokemon-item" 
              onClick={() => fetchPokemonDetails(p.url)} 
              key={p.name}
            >
              {p.name}
            </div>
          ))}
        </div>

        <div className="pagination">
          <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
            ◀ Anterior
          </button>
          <span className="pagination-info">
            Página {page} de {data.pages}
          </span>
          <button disabled={page >= data.pages} onClick={() => setPage((p) => p + 1)}>
            Siguiente ▶
          </button>
        </div>
      </div>

      {/* Panel derecho - Detalles del Pokémon seleccionado */}
      <div className="pokemon-detail-panel">
        {loading ? (
          <div className="loading">Cargando...</div>
        ) : selectedPokemon ? (
          <>
            <h2 className="pokemon-name">{selectedPokemon.name}</h2>
            <div className="pokemon-images">
              <div className="pokemon-image-container">
                <img 
                  src={selectedPokemon.sprites.front_default || "../src/utils/no-disponible.jpg"} 
                  alt={`${selectedPokemon.name} frontal`}
                  className="pokemon-image"
                />
                <p>Vista frontal</p>
              </div>
              <div className="pokemon-image-container">
                <img 
                  src={selectedPokemon.sprites.back_default || "../src/utils/no-disponible.jpg"} 
                  alt={`${selectedPokemon.name} trasera`}
                  className="pokemon-image"
                />
                <p>Vista trasera</p>
              </div>
            </div>
            
            <div className="pokemon-info">
              <h3>Habilidades</h3>
              <div className="abilities">
                {selectedPokemon.abilities.map((a: any) => (
                  <span key={a.ability.name} className="ability-tag">
                    {a.ability.name}
                  </span>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="pokemon-detail-placeholder">
            <h3>Selecciona un Pokémon</h3>
            <p>Haz clic en un Pokémon de la lista para ver sus detalles</p>
          </div>
        )}
      </div>
    </div>
  );
}

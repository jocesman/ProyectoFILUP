//App.tsx
import { useState } from "react";
import Pokedex from "./pages/Pokedex.tsx";
import Entrenadores from "./pages/Entrenadores.tsx"; 
import "../src/styles/app.css";

export default function App() {
  const [page, setPage] = useState<"pokedex" | "entrenadores">("pokedex");

  return (
    <div id="encabezado">
      <div className="header-main">
        <div className="title-container">
          <div className="pokeball"></div>
          <h2>PokeManager: Tu Gestor de Pokémon y Entrenadores</h2>
          <div className="pokeball"></div>
        </div>
        <h3>Proyecto FILUP - Fullstack Test</h3>
      </div>
      
      <nav>
        <button onClick={() => setPage("pokedex")}>📘 Pokedex</button>
        <button onClick={() => setPage("entrenadores")}>👤 Entrenadores</button>
      </nav>
      
      {page === "pokedex" ? <Pokedex /> : <Entrenadores />}
    </div>
  );
}

import { useState } from "react";
import Pokedex from "./pages/Pokedex.tsx";
import Entrenadores from "./pages/Entrenadores.tsx";

export default function App() {
  const [page, setPage] = useState<"pokedex" | "entrenadores">("pokedex");

  return (
    <div style={{ padding: "1rem", fontFamily: "sans-serif" }}>
      <h1>Proyecto FILUP</h1>
      <nav style={{ marginBottom: "1rem" }}>
        <button onClick={() => setPage("pokedex")}>📘 Pokedex</button>{" "}
        <button onClick={() => setPage("entrenadores")}>👤 Entrenadores</button>
      </nav>
      {page === "pokedex" ? <Pokedex /> : <Entrenadores />}
    </div>
  );
}

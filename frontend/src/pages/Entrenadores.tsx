import { useEffect, useState } from "react";
import { listEntrenadores, createEntrenador, updateEntrenador, deleteEntrenador, type Entrenador } from "../api/entrenadores";

function downloadCSV(filename: string, rows: any[]) {
  if (!rows.length) return;
  const headers = Object.keys(rows[0]);
  const csv = [headers.join(","), ...rows.map(r => headers.map(h => JSON.stringify(r[h] ?? "")).join(","))].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}

export default function EntrenadoresPage() {
  const [items, setItems] = useState<Entrenador[]>([]);
  const [form, setForm] = useState<Partial<Entrenador>>({ nombre: "", apellido: "", telefono: "", medallas: 0 });
  const [editing, setEditing] = useState<string | null>(null);

  const load = async () => setItems(await listEntrenadores());
  useEffect(() => { load(); }, []);

  const submit = async () => {
    if (editing) { await updateEntrenador(editing, form as any); setEditing(null); }
    else { await createEntrenador(form as any); }
    setForm({ nombre: "", apellido: "", telefono: "", medallas: 0 }); 
    load();
  };

  return (
    <div>
      <h2>Entrenadores</h2>
      <button disabled={!items.length} onClick={() => downloadCSV("entrenadores.csv", items)}>Descargar CSV</button>

      <div style={{ marginTop: "1rem" }}>
        <input placeholder="Nombre" value={form.nombre||""} onChange={(e)=>setForm({...form, nombre:e.target.value})}/>
        <input placeholder="Apellidos" value={form.apellido||""} onChange={(e)=>setForm({...form, apellido:e.target.value})}/>
        <input placeholder="Teléfono" value={form.telefono||""} onChange={(e)=>setForm({...form, telefono:e.target.value})}/>
        <input type="number" placeholder="Medallas" value={form.medallas||0} onChange={(e)=>setForm({...form, medallas:Number(e.target.value)})}/>
        <button onClick={submit}>{editing ? "Guardar cambios" : "Crear"}</button>
      </div>

      <table border={1} cellPadding={4} style={{ marginTop: "1rem" }}>
        <thead><tr><th>Nombre</th><th>Teléfono</th><th>Medallas</th><th>Acciones</th></tr></thead>
        <tbody>
          {items.map(i=>(
            <tr key={i._id}>
              <td>{i.nombre} {i.apellido}</td>
              <td>{i.telefono}</td>
              <td>{i.medallas}</td>
              <td>
                <button onClick={()=>{ setEditing(i._id); setForm(i); }}>Editar</button>
                <button onClick={async()=>{ await deleteEntrenador(i._id); load(); }}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

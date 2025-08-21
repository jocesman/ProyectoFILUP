// src/pages/Entrenadores.tsx
import { useEffect, useState } from "react";
import { listEntrenadores, createEntrenador, updateEntrenador, deleteEntrenador, type Entrenador } from "../api/entrenadores";
import "../styles/entrenadores.css";

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

interface FormErrors {
  nombre?: string;
  apellido?: string;
  telefono?: string;
  medallas?: string;
}

export default function EntrenadoresPage() {
  const [items, setItems] = useState<Entrenador[]>([]);
  const [form, setForm] = useState<Partial<Entrenador>>({ 
    nombre: "", 
    apellido: "", 
    telefono: "", 
    medallas: 1 
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [editing, setEditing] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  // Validaciones
  const validateField = (name: string, value: any): string => {
    switch (name) {
      case 'nombre':
        if (!value || value.trim().length === 0) return 'El nombre es requerido';
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) return 'El nombre solo puede contener letras';
        return '';
      
      case 'apellido':
        if (!value || value.trim().length === 0) return 'Los apellidos son requeridos';
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) return 'Los apellidos solo pueden contener letras';
        return '';
      
      case 'telefono':
        if (!value || value.trim().length === 0) return 'El teléfono es requerido';
        if (!/^\d+$/.test(value)) return 'El teléfono solo puede contener números';
        if (value.length < 10) return 'El teléfono debe tener al menos 10 dígitos';
        return '';
      
      case 'medallas':
        if (!value || value < 1) return 'Las medallas deben ser al menos 1';
        if (value > 20) return 'Las medallas no pueden ser más de 20';
        return '';
      
      default:
        return '';
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    Object.keys(form).forEach(key => {
      const error = validateField(key, form[key as keyof typeof form]);
      if (error) {
        newErrors[key as keyof FormErrors] = error;
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isFormValid = (): boolean => {
    return Boolean(
      form.nombre?.trim() &&
      form.apellido?.trim() &&
      form.telefono?.trim() &&
      form.medallas !== undefined &&
      form.medallas >= 1 &&
      form.medallas <= 20 &&
      /^\d+$/.test(form.telefono) &&
      form.telefono.length >= 10 &&
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(form.nombre) &&
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(form.apellido)
    );
  };

  const handleInputChange = (field: keyof Entrenador, value: string | number) => {
    setForm(prev => ({ ...prev, [field]: value }));
    
    // Validación en tiempo real
    const error = validateField(field, value);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const load = async () => {
    setLoading(true);
    try {
      const entrenadores = await listEntrenadores();
      setItems(entrenadores);
    } catch (error) {
      console.error("Error loading trainers:", error);
      alert("Error al cargar los entrenadores");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const submit = async () => {
    if (!validateForm()) return;
    
    try {
      if (editing) {
        await updateEntrenador(editing, form as any);
        setEditing(null);
      } else {
        await createEntrenador(form as any);
      }
      setForm({ nombre: "", apellido: "", telefono: "", medallas: 1 });
      setErrors({});
      await load();
    } catch (error) {
      console.error("Error saving trainer:", error);
      alert("Error al guardar el entrenador. Por favor, intenta nuevamente.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de que quieres eliminar este entrenador?")) return;
    
    try {
      await deleteEntrenador(id);
      await load();
    } catch (error) {
      console.error("Error deleting trainer:", error);
      alert("Error al eliminar el entrenador. Por favor, intenta nuevamente.");
    }
  };

  const cancelEdit = () => {
    setEditing(null);
    setForm({ nombre: "", apellido: "", telefono: "", medallas: 1 });
    setErrors({});
  };

  const handleDownload = async () => {
    if (!items.length) return;
    
    setDownloading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simular proceso
      downloadCSV("entrenadores.csv", items);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    } catch (error) {
      console.error("Error downloading CSV:", error);
      alert("Error al generar el archivo CSV");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="entrenadores-container">
      {/* Panel izquierdo - Formulario */}
      <div className="form-panel">
        <h2>{editing ? "Editar Entrenador" : "Nuevo Entrenador"}</h2>
        
        <div className="entrenador-form">
          <div className="form-group">
            <label>Nombre *</label>
            <input
              className={`form-input ${errors.nombre ? 'error' : ''}`}
              placeholder="Ej: Ash"
              value={form.nombre || ""}
              onChange={(e) => handleInputChange('nombre', e.target.value)}
              maxLength={50}
            />
            {errors.nombre && <span className="error-message">{errors.nombre}</span>}
          </div>
          
          <div className="form-group">
            <label>Apellidos *</label>
            <input
              className={`form-input ${errors.apellido ? 'error' : ''}`}
              placeholder="Ej: Ketchum"
              value={form.apellido || ""}
              onChange={(e) => handleInputChange('apellido', e.target.value)}
              maxLength={50}
            />
            {errors.apellido && <span className="error-message">{errors.apellido}</span>}
          </div>
          
          <div className="form-group">
            <label>Teléfono *</label>
            <input
              className={`form-input ${errors.telefono ? 'error' : ''}`}
              placeholder="Ej: 1234567890"
              value={form.telefono || ""}
              onChange={(e) => handleInputChange('telefono', e.target.value.replace(/\D/g, ''))}
              maxLength={15}
            />
            {errors.telefono && <span className="error-message">{errors.telefono}</span>}
          </div>
          
          <div className="form-group">
            <label>Medallas * (1-20)</label>
            <div className="medallas-container">
              <input
                type="range"
                className="medallas-slider"
                min="1"
                max="20"
                value={form.medallas || 1}
                onChange={(e) => handleInputChange('medallas', parseInt(e.target.value))}
              />
              <span className="medallas-value">{form.medallas}</span>
            </div>
            {errors.medallas && <span className="error-message">{errors.medallas}</span>}
          </div>
          
          <div className="form-actions">
            {editing && (
              <button className="cancel-btn" onClick={cancelEdit}>
                Cancelar
              </button>
            )}
            <button 
              className="submit-btn" 
              onClick={submit}
              disabled={!isFormValid()}
            >
              {editing ? "💾 Guardar Cambios" : "➕ Crear Entrenador"}
            </button>
          </div>
        </div>
      </div>

      {/* Panel derecho - Lista */}
      <div className="list-panel">
        <div className="list-header">
          <h2>Entrenadores Registrados</h2>
          <button 
            className="download-csv-btn"
            disabled={!items.length || downloading}
            onClick={handleDownload}
          >
            {downloading ? (
              <>
                <span className="download-spinner"></span>
                Generando...
              </>
            ) : (
              <>
                📊 Descargar CSV
              </>
            )}
          </button>
        </div>

        {loading ? (
          <div className="loading-state">
            <p>Cargando entrenadores...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="empty-state">
            <h3>No hay entrenadores registrados</h3>
            <p>Comienza agregando tu primer entrenador</p>
          </div>
        ) : (
          <div className="entrenadores-table-container">
            <table className="entrenadores-table">
              <thead>
                <tr>
                  <th>Nombre Completo</th>
                  <th>Teléfono</th>
                  <th>Medallas</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {items.map((i) => (
                  <tr key={i._id}>
                    <td>{i.nombre} {i.apellido}</td>
                    <td>{i.telefono}</td>
                    <td>{i.medallas}</td>
                    <td className="acciones-cell">
                      <button 
                        className="action-btn edit-btn"
                        onClick={() => { 
                          setEditing(i._id); 
                          setForm(i);
                          setErrors({});
                        }}
                      >
                        ✏️ Editar
                      </button>
                      <button 
                        className="action-btn delete-btn"
                        onClick={() => handleDelete(i._id)}
                      >
                        🗑️ Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Notificación de descarga */}
      {showNotification && (
        <div className="download-notification">
          <span>✅ CSV descargado exitosamente</span>
        </div>
      )}
    </div>
  );
}
# PokeManager 🎮

**Tu Gestor Completo de Pokémon y Entrenadores**

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=flat)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white)](https://mongodb.com/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)

---

## 📖 Descripción

PokeManager es una aplicación web fullstack que permite gestionar entrenadores Pokémon y explorar la Pokédex completa. Desarrollado como parte del **Proyecto FILUP - Fullstack Test**, combina una API REST robusta con una interfaz moderna y responsiva.

### ✨ Características Principales

- **🎯 Gestión Completa de Entrenadores**: CRUD completo con validaciones en tiempo real
- **📱 Pokédex Interactiva**: Exploración de todos los Pokémon con búsqueda y paginación
- **📊 Exportación de Datos**: Descarga de entrenadores en CSV y Pokédex en PDF
- **🔍 Búsqueda Avanzada**: Filtros inteligentes para Pokémon por nombre
- **📋 Documentación API**: Swagger/OpenAPI integrado
- **🎨 Diseño Responsivo**: Optimizado para móviles, tablets y desktop
- **⚡ Alto Rendimiento**: Lazy loading y optimizaciones de red

---

## 🛠️ Stack Tecnológico

### Backend
- **Node.js** + **Express.js** - Servidor y API REST
- **TypeScript** - Tipado estático
- **MongoDB** + **Mongoose** - Base de datos NoSQL
- **Zod** - Validación de esquemas
- **PDFKit** - Generación de PDFs
- **Axios** - Cliente HTTP para PokeAPI
- **Swagger** - Documentación automática de API

### Frontend
- **React 18** + **TypeScript** - Interface de usuario
- **Vite** - Bundler y herramientas de desarrollo
- **CSS3** - Estilos personalizados con gradientes y animaciones
- **Responsive Design** - Mobile-first approach

### Servicios Externos
- **PokeAPI** - Datos oficiales de Pokémon
- **MongoDB Atlas** - Base de datos en la nube

---

## 🚀 Instalación y Configuración

### Prerrequisitos

```bash
Node.js >= 18.0.0
npm >= 8.0.0
MongoDB (local o Atlas)
```

### 1. Clonar el Repositorio

```bash
git clone <repository-url>
cd pokemanager
```

### 2. Configuración del Backend

```bash
# Navegar al directorio backend
cd backend

# Instalar dependencias
npm install

# Crear archivo de entorno
cp .env.example .env
```

#### Configurar Variables de Entorno (`.env`)

```env
PORT=8080
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/entrenadores
```

#### Iniciar el Servidor Backend

```bash
# Desarrollo con recarga automática
npm run start

# Compilar TypeScript
npm run build
```

El servidor estará disponible en: `http://localhost:8080`

### 3. Configuración del Frontend

```bash
# Navegar al directorio frontend
cd ../frontend

# Instalar dependencias
npm install

# Crear archivo de entorno
cp .env.example .env
```

#### Configurar Variables de Entorno Frontend (`.env`)

```env
VITE_API_URL=http://localhost:8080/api
```

#### Iniciar el Cliente Frontend

```bash
# Servidor de desarrollo
npm run dev

# Build para producción
npm run build
```

La aplicación estará disponible en: `http://localhost:5173`

---

## 📚 Documentación de API

### Swagger UI
Una vez iniciado el backend, accede a la documentación interactiva:

```
http://localhost:8080/api-docs
```

### Endpoints Principales

#### 🧑‍🎓 Entrenadores

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/entrenadores` | Listar todos los entrenadores |
| `GET` | `/api/entrenadores/:id` | Obtener entrenador por ID |
| `POST` | `/api/entrenadores` | Crear nuevo entrenador |
| `PUT` | `/api/entrenadores/:id` | Actualizar entrenador |
| `DELETE` | `/api/entrenadores/:id` | Eliminar entrenador |

#### 📱 Pokémon

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/pokemons` | Listar Pokémon con paginación |
| `GET` | `/api/pokemons/pdf` | Descargar Pokédex en PDF |

### Ejemplo de Uso

```typescript
// Crear un nuevo entrenador
POST /api/entrenadores
{
  "nombre": "Ash",
  "apellido": "Ketchum",
  "telefono": "1234567890",
  "medallas": 8
}

// Buscar Pokémon
GET /api/pokemons?search=pikachu&page=1&limit=10
```

---

## 🎯 Características Detalladas

### Gestión de Entrenadores

- **Validaciones Completas**: Nombres solo letras, teléfonos numéricos, límite de medallas
- **Interfaz Intuitiva**: Formulario con validación en tiempo real
- **Tabla Interactiva**: Edición inline y eliminación con confirmación
- **Exportación CSV**: Descarga de todos los registros
- **Estados de Carga**: Feedback visual durante operaciones

### Pokédex Interactiva

- **Búsqueda Inteligente**: Filtro por nombre de Pokémon
- **Paginación Eficiente**: Control de resultados mostrados
- **Vista Detallada**: Imágenes oficiales, habilidades y estadísticas
- **Generación PDF**: Reporte descargable con Pokémon seleccionados
- **Responsive Design**: Adaptado a todos los dispositivos

### Arquitectura del Proyecto

```
pokemanager/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Lógica de negocio
│   │   ├── models/         # Esquemas de MongoDB
│   │   ├── routes/         # Definición de rutas
│   │   ├── services/       # Servicios externos
│   │   ├── middlewares/    # Validaciones y errores
│   │   └── utils/          # Utilidades (PDF, etc.)
│   ├── config/             # Configuraciones
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── pages/          # Componentes principales
│   │   ├── api/            # Cliente HTTP
│   │   ├── styles/         # Estilos CSS
│   │   └── utils/          # Utilidades frontend
│   └── package.json
└── README.md
```

---

## 🎨 Capturas de Pantalla

### Dashboard Principal
![Dashboard](https://via.placeholder.com/800x400/2a75bb/ffffff?text=PokeManager+Dashboard)

### Gestión de Entrenadores
![Entrenadores](https://via.placeholder.com/800x400/ffcb05/2a75bb?text=Gestión+de+Entrenadores)

### Pokédex Interactiva
![Pokedex](https://via.placeholder.com/800x400/ff1c1c/ffffff?text=Pokédex+Interactiva)

---

## 🧪 Testing

```bash
# Backend tests
cd backend
npm run test

# Frontend tests
cd frontend
npm run test
```

---

## 📦 Deployment

### Backend (Railway/Heroku)

```bash
# Build del proyecto
npm run build

# Variables de entorno en producción
PORT=8080
MONGODB_URI=mongodb+srv://...
NODE_ENV=production
```

### Frontend (Netlify/Vercel)

```bash
# Build del proyecto
npm run build

# Variable de entorno
VITE_API_URL=https://tu-api.herokuapp.com/api
```

---

## 🤝 Contribución

1. **Fork** el proyecto
2. **Crea** una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. **Push** a la rama (`git push origin feature/AmazingFeature`)
5. **Abre** un Pull Request

---

## 📝 Scripts Disponibles

### Backend

```json
{
  "start": "nodemon",           // Desarrollo con recarga automática
  "build": "tsc",              // Compilar TypeScript
  "test": "echo \"Error: no test specified\" && exit 1"
}
```

### Frontend

```json
{
  "dev": "vite",               // Servidor de desarrollo
  "build": "tsc && vite build", // Build para producción
  "preview": "vite preview",   // Preview del build
  "lint": "eslint . --ext ts,tsx"
}
```

---

## 🐛 Troubleshooting

### Problemas Comunes

1. **Error de conexión a MongoDB**
   ```bash
   # Verificar la cadena de conexión en .env
   MONGODB_URI=mongodb+srv://...
   ```

2. **CORS en desarrollo**
   ```bash
   # El backend ya incluye configuración CORS
   # Verificar que VITE_API_URL esté correcta
   ```

3. **Dependencias faltantes**
   ```bash
   # Eliminar node_modules y reinstalar
   rm -rf node_modules
   npm install
   ```

---

## 📄 Licencia

Este proyecto está bajo la Licencia ISC - ver el archivo [LICENSE](LICENSE) para más detalles.

---

## 👨‍💻 Autor

**Jose Ignacio Cespedes**
- Proyecto: **FILUP - Fullstack Test**
- Tecnologías: React, Node.js, TypeScript, MongoDB
- Email: [tu.email@ejemplo.com](mailto:tu.email@ejemplo.com)

---

## 🙏 Agradecimientos

- **PokeAPI** por proporcionar los datos oficiales de Pokémon
- **MongoDB Atlas** por el hosting de base de datos
- **FILUP** por la oportunidad del proyecto
- **Nintendo/Game Freak** por crear el universo Pokémon

---

<div align="center">

### ⭐ ¡Si te gusta este proyecto, dale una estrella! ⭐

**Desarrollado con ❤️ para FILUP**

</div>
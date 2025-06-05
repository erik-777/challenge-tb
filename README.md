# Full Stack JavaScript Challenge

Aplicación full-stack que procesa archivos CSV desde una API externa, formatea los datos y los muestra en una interfaz web.

## 📋 Requisitos Previos

### Backend
- **Node.js**: versión 14.x o superior
- **npm**: versión 6.x o superior

### Frontend
- **Node.js**: versión 16.x o superior
- **npm**: versión 7.x o superior

### Opcional (Docker)
- **Docker**: versión 20.x o superior
- **Docker Compose**: versión 1.29.x o superior

## 🚀 Instalación y Ejecución

### Opción 1: Ejecución Local

#### Backend

```bash
# 1. Navegar a la carpeta del backend
cd backend

# 2. Instalar dependencias
npm install

# 3. Ejecutar tests (opcional)
npm test

# 4. Iniciar el servidor
npm start

# El servidor estará disponible en http://localhost:3001
```

#### Frontend

```bash
# 1. En una nueva terminal, navegar a la carpeta del frontend
cd frontend

# 2. Instalar dependencias
npm install

# 3. Iniciar la aplicación
npm start

# La aplicación se abrirá automáticamente en http://localhost:3131
```

### Opción 2: Ejecución con Docker

```bash
# Desde la carpeta raíz del proyecto
docker-compose up --build

# Backend: http://localhost:3001
# Frontend: http://localhost:3131
```

## 📁 Estructura del Proyecto

```
challenge-fullstack/
├── backend/
│   ├── src/
│   │   ├── config/         # Configuración y constantes
│   │   ├── controllers/    # Controladores (lógica de negocio)
│   │   ├── models/         # Modelos de datos
│   │   ├── routes/         # Definición de rutas
│   │   ├── services/       # Servicios externos
│   │   └── middleware/     # Middleware personalizado
│   ├── test/              # Tests unitarios e integración
│   ├── app.js          # Punto de entrada
│   └── package.json
│
└── frontend/
    ├── public/             # Archivos estáticos
    ├── src/
    │   ├── app/            # Componentes React
        │    ├── core/      # Componetes, Layoust
    │   |    ├── pages/     # Vistas
    │   |    ├── services/  # Servicios API
    │   ├── assets/         # Componentes React
    │   ├── App.jsx          # Componente principal
    │   └── main.jsx        # Punto de entrada
    └── package.json
```

## 🔧 Scripts Disponibles

### Backend

```bash
npm start      # Inicia el servidor en producción
npm run dev    # Inicia el servidor en modo desarrollo (con auto-reload)
npm test       # Ejecuta los tests

```

### Frontend

```bash
npm start              # Inicia la aplicación en modo desarrollo
npm run build         # Construye la aplicación para producción
```

## 📡 API Endpoints

### Backend API

| Método | Endpoint | Descripción | Parámetros |
|--------|----------|-------------|------------|
| GET | `/health` | Estado del servidor | - |
| GET | `/files/data` | Obtiene datos formateados de todos los archivos | `fileName` (opcional) |
| GET | `/files/list` | Lista todos los archivos disponibles | - |

### Ejemplos de uso:

```bash
# Obtener todos los archivos procesados
curl http://localhost:3001/files/data

# Obtener un archivo específico
curl http://localhost:3001/files/data?fileName=file1.csv

# Listar archivos disponibles
curl http://localhost:3001/files/list
```

## ✅ Validaciones

El sistema valida cada línea del CSV con las siguientes reglas:

1. **Campos requeridos**: Todos los campos deben estar presentes y no vacíos
2. **Campo `text`**: Debe contener texto
3. **Campo `number`**: Debe ser un número válido
4. **Campo `hex`**: Debe contener exactamente 32 caracteres hexadecimales

Las líneas que no cumplan estas validaciones serán descartadas automáticamente.

## 🧪 Testing

### Backend

```bash
cd backend
npm test
```

Los tests incluyen:
- Tests unitarios para modelos
- Tests unitarios para servicios
- Tests unitarios para controladores


### Frontend

```bash
cd frontend


## 🐛 Solución de Problemas

### El servidor no inicia

1. Verificar que el puerto 3001 no esté en uso:
   ```bash
   lsof -i :3001  # Mac/Linux
   netstat -ano | findstr :3001  # Windows
   ```

2. Verificar las dependencias:
   ```bash
   npm install
   ```

### Error de conexión con la API externa

1. Verificar conexión a internet

## 📝 Notas Adicionales

- El backend procesa archivos CSV y descarta automáticamente las líneas inválidas
- Los archivos vacíos o que no se pueden descargar son omitidos

## 📄 Licencia

Este proyecto es parte de un challenge técnico.
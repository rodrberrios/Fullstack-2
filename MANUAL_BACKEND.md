# Manual del Backend - Level Up Store

Este documento proporciona una guía completa sobre la estructura, instalación y uso del backend de Level Up Store.

## 🛠️ Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución para JavaScript.
- **Express**: Framework web para crear la API REST.
- **Firebase Admin SDK**: Para interactuar con Firestore y autenticación.
- **Swagger UI**: Para documentación interactiva de la API.
- **Dotenv**: Para gestión de variables de entorno.
- **Cors**: Para permitir peticiones desde el frontend.

## 📂 Estructura del Proyecto

```
backend/
├── controllers/      # Lógica de negocio de cada entidad
│   ├── categoryController.js
│   ├── contactController.js
│   ├── orderController.js
│   ├── productController.js
│   └── userController.js
├── routes/           # Definición de rutas de la API
│   ├── categories.js
│   ├── contacts.js
│   ├── orders.js
│   ├── products.js
│   └── users.js
├── server.js         # Punto de entrada de la aplicación
├── swagger.js        # Configuración de Swagger
├── package.json      # Dependencias y scripts
└── .env              # Variables de entorno (no incluido en repo)
```

## 🚀 Instalación y Configuración

### 1. Prerrequisitos
- Tener instalado **Node.js** (v14 o superior).
- Tener el archivo de credenciales de Firebase (`serviceAccountKey.json`) en la raíz del backend.

### 2. Instalación de Dependencias
Abre una terminal en la carpeta `backend` y ejecuta:

```bash
npm install
```

### 3. Variables de Entorno
Crea un archivo `.env` en la raíz del backend con el siguiente contenido:

```env
PORT=5000
FIREBASE_SERVICE_ACCOUNT=./serviceAccountKey.json
```

## ▶️ Ejecución

### Modo Desarrollo (con recarga automática)
```bash
npm run dev
```

### Modo Producción
```bash
npm start
```

El servidor iniciará en `http://localhost:5000`.

## 📚 Documentación de la API (Swagger)

El backend incluye documentación interactiva generada automáticamente con Swagger.

1. Inicia el servidor.
2. Abre tu navegador y ve a: **http://localhost:5000/api-docs**

Desde allí podrás:
- Ver todos los endpoints disponibles.
- Probar las peticiones directamente (GET, POST, PUT, DELETE).
- Ver los esquemas de datos (Modelos).

## 🔗 Endpoints Principales

### Productos (`/api/products`)
- `GET /`: Listar productos.
- `POST /`: Crear producto.
- `PUT /:id`: Actualizar producto.
- `DELETE /:id`: Eliminar producto.

### Usuarios (`/api/users`)
- `GET /`: Listar usuarios.
- `POST /`: Crear usuario.
- `PUT /:id`: Actualizar usuario (Perfil).

### Órdenes (`/api/orders`)
- `GET /`: Listar todas las órdenes (Admin/Vendedor).
- `GET /user/:email`: Historial de compras de un usuario.
- `POST /`: Crear nueva orden.

### Contacto (`/api/contacts`)
- `POST /`: Enviar mensaje de contacto.
- `GET /user/:email`: Ver historial de consultas.

### Categorías (`/api/categories`)
- `GET /`: Listar categorías.
- `POST /`: Crear categoría.

## ⚠️ Notas Importantes
- La base de datos es **Firestore** (NoSQL).
- La autenticación se maneja principalmente en el frontend con Firebase Auth, pero el backend valida operaciones mediante el Admin SDK.
- Asegúrate de que el puerto 5000 esté libre.

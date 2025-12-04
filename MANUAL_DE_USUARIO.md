# Manual de Usuario - Sistema de E-commerce

## Tabla de Contenidos

1. [Introducción](#introducción)
2. [Usuario Visitante (Sin Cuenta)](#usuario-visitante-sin-cuenta)
3. [Cliente Registrado](#cliente-registrado)
4. [Vendedor](#vendedor)
5. [Administrador](#administrador)
6. [Preguntas Frecuentes](#preguntas-frecuentes)

---

## Introducción

Este sistema de e-commerce cuenta con diferentes niveles de acceso según el tipo de usuario. Cada rol tiene funcionalidades específicas diseñadas para sus necesidades.

### Tipos de Usuario

- **Visitante**: Puede navegar y ver productos sin necesidad de cuenta
- **Cliente**: Usuario registrado que puede comprar productos
- **Vendedor**: Gestiona productos y visualiza órdenes
- **Administrador**: Control total del sistema

---

## Usuario Visitante (Sin Cuenta)

### ¿Qué puedes hacer?

#### 1. Navegación Principal

**Página de Inicio (`/`)**
- Ver productos destacados
- Acceder al catálogo completo
- Navegar por las diferentes secciones

**Catálogo (`/catalogo`)**
- Ver todos los productos disponibles
- Filtrar productos por categorías
- Buscar productos específicos
- Ver detalles de cada producto (precio, descripción, stock)
- **Ofertas**: Los productos con descuento mostrarán una etiqueta de "Oferta" y el porcentaje de descuento.

**Nosotros (`/nosotros`)**
- Conocer información sobre la empresa
- Ver misión y visión del negocio

**Blog (`/blog`)**
- Leer artículos y noticias
- Mantenerse informado sobre novedades

**Contacto (`/contacto`)**
- Enviar consultas o mensajes
- Obtener información de contacto

#### 2. Carrito de Compras

**Agregar Productos**
- Seleccionar productos desde el catálogo
- Agregar al carrito sin necesidad de cuenta
- Ver el carrito en cualquier momento (`/carrito`)

**Gestión del Carrito**
- Ver productos agregados
- Modificar cantidades
- Eliminar productos
- Ver total de la compra
- **Ahorro Total**: Si tienes productos en oferta, verás cuánto estás ahorrando en total.

**Limitaciones**
- ⚠️ Para finalizar la compra, debes crear una cuenta o iniciar sesión

#### 3. Registro e Inicio de Sesión

**Crear Cuenta (`/register`)**

Información requerida:
- Nombre completo
- Email (único)
- RUT/RUN
- Teléfono
- Contraseña (6-10 caracteres)

**Iniciar Sesión (`/login`)**
- Email
- Contraseña

---

## Cliente Registrado

### Panel de Cliente

Una vez iniciada sesión, accedes a tu panel personal con las siguientes opciones:

#### 1. Mi Perfil (`/perfilCliente`)

**Información Personal**
- ✏️ Editable: Nombre, Teléfono
- 🔒 No editable: Email, RUT (por seguridad)
- 💾 **Guardar**: Recuerda guardar los cambios tras editar tus datos.

**Cambiar Contraseña**
- Ingresar contraseña actual
- Definir nueva contraseña (6-10 caracteres)
- Confirmar nueva contraseña

**Cómo actualizar tu perfil:**
1. Haz clic en "Mi Perfil" en el menú lateral
2. Modifica los campos editables
3. Si deseas cambiar contraseña, completa los 3 campos
4. Haz clic en "💾 Guardar Cambios"

#### 2. Historial de Compras (`/historialCompras`)

**Ver tus Compras**
- Lista de todas tus órdenes
- Información mostrada:
  - ID de la orden
  - Fecha de compra
  - Total pagado
  - Estado de la orden
  - Productos comprados

**Estados de Orden:**
- 🟠 **Pendiente**: Orden recibida, en espera de procesamiento
- 🔵 **Procesando**: Orden en preparación
- 🟢 **Completado**: Orden entregada
- 🔴 **Cancelado**: Orden cancelada

#### 3. Historial de Consultas (`/historialConsultas`)

**Ver tus Mensajes**
- Todas las consultas enviadas desde el formulario de contacto
- Información mostrada:
  - Asunto del mensaje
  - Fecha de envío
  - Contenido del mensaje
  - Estado (si fue respondida)

#### 4. Proceso de Compra

**Paso 1: Agregar al Carrito**
1. Navega por el catálogo
2. Selecciona productos
3. Haz clic en "Agregar al Carrito"
4. Ajusta cantidades según necesites

**Paso 2: Revisar Carrito (`/carrito`)**
- Verifica productos y cantidades
- Revisa el total
- Puedes modificar o eliminar productos
- Haz clic en "Proceder al Pago"

**Paso 3: Checkout (`/checkout`)**
- Confirma tu información de contacto
- Revisa el resumen de tu orden
- Selecciona método de pago
- Confirma la compra

**Paso 4: Confirmación**
- ✅ **Compra Exitosa** (`/exito`): Recibirás confirmación
- ❌ **Error en Pago** (`/error`): Podrás reintentar

#### 5. Navegación Rápida

**Menú Lateral del Cliente:**
- 📊 Dashboard (vista general)
- 🛒 Historial de Compras
- 💬 Historial de Consultas
- 👤 Mi Perfil
- 🏪 Volver a la Tienda

---

## Vendedor

### Panel de Vendedor

Los vendedores tienen acceso a herramientas de gestión de productos y visualización de órdenes.

#### 1. Dashboard (`/vendedor/dashboard`)

**Tarjetas de Resumen**
- 💰 **Ventas Totales**: Monto total acumulado
- 📦 **Órdenes**: Número total de pedidos
- 🏷️ **Productos**: Cantidad en catálogo
- 📊 **Promedio**: Valor promedio por orden

**Gráficos**
- 📈 **Tendencia de Ventas**: Últimos 7 días (gráfico de barras)
- 📊 **Distribución de Estados**: Órdenes por estado

**Actividad Reciente**
- Últimas 5 órdenes
- Detalles rápidos: Cliente, total, fecha, estado

**Actualizar Datos**
- Botón "🔄 Actualizar" para refrescar información

#### 2. Gestión de Productos (`/vendedor/productos`)

**Ver Productos**
- Lista completa de productos
- Información: Nombre, precio, stock, categoría, estado

**Agregar Producto**
1. Haz clic en "➕ Agregar Producto"
2. Completa el formulario:
   - Nombre del producto
   - Descripción
   - Precio
   - Precio Anterior (Opcional): Si ingresas un valor mayor al precio actual, se mostrará como oferta.
   - Stock inicial
   - Categoría
   - URL de imagen
   - Estado (Activo/Inactivo)
3. Guarda el producto

**Editar Producto**
1. Haz clic en el botón "✏️" en la fila del producto
2. Modifica los campos necesarios
3. Guarda los cambios

**Eliminar Producto**
1. Haz clic en el botón "🗑️"
2. Confirma la eliminación
3. El producto se elimina de la base de datos

**Actualizar Lista**
- Botón "🔄 Actualizar" para recargar datos

#### 3. Gestión de Órdenes (`/vendedor/ordenes`)

**Ver Órdenes**
- Lista de todas las órdenes del sistema
- Información mostrada:
  - ID de orden
  - Cliente
  - Email
  - Total
  - Estado
  - Fecha

**Ver Detalles de Orden**
1. Haz clic en el botón "👁️" (Ver Detalles)
2. Se abre un modal con:
   - Información completa del cliente
   - Lista de productos comprados
   - Cantidades y precios
   - Total de la orden

**Filtrar y Buscar**
- Buscar por cliente o email
- Filtrar por estado
- Ordenar por fecha

#### 4. Mi Perfil (`/vendedor/perfil`)

**Información Personal**
- ✏️ Editable: Nombre, Teléfono, Dirección
- 🔒 No editable: Email, RUT, Rol

**Actualizar Perfil**
1. Modifica los campos editables
2. Haz clic en "💾 Guardar Cambios"

**Nota**: Los vendedores no pueden cambiar su contraseña desde el perfil. Deben contactar al administrador.

#### 5. Navegación del Vendedor

**Menú Lateral:**
- 📊 Dashboard
- 📦 Órdenes
- 📦 Productos
- 👤 Mi Perfil
- 🏪 Tienda

---

## Administrador

### Panel de Administración

El administrador tiene control total sobre el sistema.

#### 1. Dashboard Admin (`/perfilAdmin`)

**Estadísticas Generales**
- 🛒 **Compras**: Total de órdenes en el sistema
- 📦 **Productos**: Cantidad total de productos
- 👥 **Usuarios**: Número de usuarios registrados

**Navegación Rápida**
- Accesos directos a todas las secciones
- Vista general del sistema

#### 2. Gestión de Usuarios (`/customers`)

**Ver Usuarios**
- Lista completa de usuarios registrados
- Información: Nombre, email, RUT, teléfono, rol

**Agregar Usuario**
1. Haz clic en "➕ Agregar Usuario"
2. Completa el formulario:
   - Nombre
   - Email
   - RUT
   - Teléfono
   - Contraseña
   - Rol (cliente/vendedor/admin)
3. Guarda el usuario

**Editar Usuario**
1. Haz clic en "✏️" en la fila del usuario
2. Modifica información
3. Puedes cambiar el rol del usuario
4. Guarda los cambios

**Eliminar Usuario**
1. Haz clic en "🗑️"
2. Confirma la eliminación
3. ⚠️ Esta acción es permanente

#### 3. Gestión de Órdenes (`/orders`)

**Ver Todas las Órdenes**
- Lista completa de órdenes del sistema
- Mismas funcionalidades que el vendedor
- Control total sobre todas las órdenes

**Funciones Adicionales**
- Cambiar estado de órdenes
- Ver detalles completos
- Filtrar y buscar

#### 4. Gestión de Inventario (`/inventory`)

**Ver Productos**
- Lista completa de productos
- Control total del catálogo

**Operaciones CRUD Completas**
- ➕ Crear nuevos productos
- ✏️ Editar productos existentes
- 🗑️ Eliminar productos
- 🔄 Actualizar stock

**Gestión de Stock**
- Modificar cantidades disponibles
- Activar/desactivar productos
- Controlar visibilidad en tienda

#### 5. Gestión de Categorías (`/categories`)

**Ver Categorías**
- Lista de todas las categorías
- Cantidad de productos por categoría

**Crear Categoría**
1. Haz clic en "➕ Nueva Categoría"
2. Ingresa el nombre
3. Guarda la categoría

**Editar Categoría**
1. Haz clic en "✏️"
2. Modifica el nombre
3. Guarda los cambios

**Eliminar Categoría**
- ⚠️ Solo se pueden eliminar categorías sin productos
- Si tiene productos, primero debes reasignarlos

**Ver Productos de Categoría**
1. Haz clic en "👁️ Ver Productos"
2. Se muestra lista de productos de esa categoría

#### 6. Reportes (`/reports`)

**Visualización de Datos**
- Gráficos de ventas
- Estadísticas de productos más vendidos
- Análisis de tendencias
- Reportes por período

**Exportar Datos**
- Generar reportes en diferentes formatos
- Análisis personalizado

#### 7. Mi Perfil Admin (`/perfilAdmin`)

**Información Personal**
- ✏️ Editable: Nombre, Teléfono
- 🔒 No editable: Email, RUT

**Cambiar Contraseña**
- Ingresar contraseña actual
- Definir nueva contraseña
- Confirmar nueva contraseña

#### 8. API Documentation

**Swagger UI** (http://localhost:5000/api-docs)
- Documentación interactiva de la API
- Probar endpoints
- Ver esquemas de datos

#### 9. Navegación del Administrador

**Menú Lateral:**
- ⚡ Dashboard
- 🛒 Órdenes
- 📦 Productos
- 🏷️ Categorías
- 👥 Usuarios
- 📊 Reportes
- 👤 Perfil
- 🏪 Tienda
- 📚 API Docs

---

## Preguntas Frecuentes

### Para Clientes

**¿Puedo comprar sin crear una cuenta?**
- No, necesitas una cuenta para finalizar compras. Puedes agregar productos al carrito sin cuenta, pero debes registrarte para completar el pago.

**¿Puedo cambiar mi email?**
- No, el email no es modificable por seguridad. Si necesitas cambiarlo, contacta al administrador.

**¿Cómo recupero mi contraseña?**
- Actualmente debes contactar al administrador para restablecer tu contraseña.

**¿Puedo cancelar una orden?**
- Contacta al administrador o vendedor para solicitar la cancelación de una orden.

**¿Dónde veo el estado de mi pedido?**
- En "Historial de Compras" desde tu panel de cliente.

### Para Vendedores

**¿Puedo cambiar mi contraseña?**
- No desde el perfil. Debes contactar al administrador.

**¿Puedo eliminar órdenes?**
- No, solo el administrador puede gestionar órdenes completamente.

**¿Cómo agrego productos en oferta?**
- Al crear/editar un producto, puedes marcar si está en oferta.

**¿Puedo ver solo mis productos?**
- Actualmente ves todos los productos del sistema.

### Para Administradores

**¿Puedo recuperar un usuario eliminado?**
- No, la eliminación es permanente. Ten cuidado al eliminar usuarios.

**¿Cómo cambio el rol de un usuario?**
- Desde "Gestión de Usuarios", edita el usuario y cambia su rol.

**¿Puedo eliminar categorías con productos?**
- No, primero debes reasignar los productos a otra categoría.

---

## Información Técnica

### Rutas del Sistema

**Públicas:**
- `/` - Inicio
- `/login` - Iniciar sesión
- `/register` - Registrarse
- `/catalogo` - Catálogo de productos
- `/nosotros` - Sobre nosotros
- `/contacto` - Contacto
- `/blog` - Blog
- `/carrito` - Carrito de compras

**Cliente:**
- `/perfilCliente` - Perfil del cliente
- `/historialCompras` - Historial de compras
- `/historialConsultas` - Historial de consultas
- `/checkout` - Proceso de pago
- `/exito` - Compra exitosa
- `/error` - Error en pago

**Vendedor:**
- `/vendedor/dashboard` - Dashboard del vendedor
- `/vendedor/perfil` - Perfil del vendedor
- `/vendedor/productos` - Gestión de productos
- `/vendedor/ordenes` - Gestión de órdenes

**Administrador:**
- `/perfilAdmin` - Dashboard admin
- `/customers` - Gestión de usuarios
- `/orders` - Gestión de órdenes
- `/inventory` - Gestión de inventario
- `/categories` - Gestión de categorías
- `/reports` - Reportes

### Seguridad

- Las rutas están protegidas por rol
- Solo puedes acceder a las secciones de tu rol
- Las contraseñas están encriptadas
- Email y RUT no son modificables para prevenir fraudes

---

## Soporte

Para cualquier problema o consulta:
- Usa el formulario de contacto en `/contacto`
- Contacta al administrador del sistema
- Revisa este manual para resolver dudas comunes

---

**Versión del Manual**: 1.0  
**Última Actualización**: Diciembre 2025

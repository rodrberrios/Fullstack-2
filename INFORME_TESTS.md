# Informe de Ejecución de Pruebas Unitarias

**Fecha:** 04/12/2025
**Proyecto:** Level Up Store
**Componente:** Sistema de Carrito de Compras

## Resumen Ejecutivo

Se ha realizado la ejecución de la suite de pruebas unitarias para validar la lógica y funcionalidad del componente de Carrito de Compras. A continuación se detallan los resultados obtenidos.

| Métrica | Resultado |
| :--- | :--- |
| **Total de Pruebas** | 31 |
| **Pruebas Exitosas** | 31 |
| **Pruebas Fallidas** | 0 |
| **Estado General** | **APROBADO** (con observaciones) |

## Detalle de Pruebas por Suite

### 1. Formato de Moneda
Verificación de la correcta visualización de precios y montos.
- [x] Debe manejar números grandes correctamente.
- [x] Debe formatear números correctamente para display.

### 2. Escenarios de Precios
Validación del comportamiento ante diferentes tipos de precios.
- [x] Productos con precios decimales.
- [x] Productos sin precio definido.

### 3. Casos de Negocio Importantes
Pruebas de robustez ante situaciones de borde.
- [x] Gran volumen de productos diferentes.
- [x] Productos con stock limitado (cantidad = 1).

### 4. Funcionalidades Críticas del Carrito
Validación de las operaciones matemáticas y lógicas core.
- [x] Cálculo con cantidades grandes.
- [x] Manejo correcto de carrito vacío.
- [x] Cálculo correcto de totales con múltiples productos.

### 5. Validación de Carrito Básica
Pruebas de inicialización y estado base.
- [x] Debería calcular total básico.
- [x] Debería crear un carrito vacío.

### 6. Lógica del Carrito de Compras
Suite principal que cubre la lógica de negocio.

**Cálculo de Subtotales:**
- [x] Debe calcular subtotal por producto correctamente.
- [x] Debe calcular correctamente con decimales.

**Persistencia (localStorage):**
- [x] Debe guardar carrito en localStorage.
- [x] Debe manejar localStorage vacío.
- [x] Debe cargar carrito desde localStorage.

**Cálculo de Totales:**
- [x] Debe calcular correctamente el total con un producto.
- [x] Debe calcular correctamente el total con múltiples productos.
- [x] Debe retornar 0 para carrito vacío.
- [x] Debe usar cantidad 1 por defecto cuando no hay cantidad definida.
- [x] Debe manejar productos sin precio.

**Gestión del Carrito:**
- [x] Debe agregar nuevo producto al carrito.
- [x] Debe incrementar cantidad de producto existente.
- [x] Debe actualizar cantidad de producto específico.
- [x] Debe eliminar producto del carrito.
- [x] No debe permitir cantidad menor a 1.

### 7. Pruebas Matemáticas Básicas
Validación de utilidades matemáticas subyacentes.
- [x] Debería multiplicar números correctamente.
- [x] Debería verificar igualdad de objetos.
- [x] Debería sumar números correctamente.

## Observaciones Técnicas

Durante la ejecución se observó un error de configuración relacionado con la librería `@testing-library/jest-dom`:
`Uncaught TypeError: expect.extend is not a function`

Este error ocurre en el hook `afterAll` y se debe a una incompatibilidad entre la configuración de Jasmine (usada por Karma) y la librería `jest-dom` que espera el entorno de Jest. **Este error no afecta la validez de las pruebas funcionales realizadas**, ya que todas las aserciones de lógica de negocio pasaron correctamente antes de que ocurriera este error de limpieza.

## Conclusión

El sistema de lógica del carrito de compras es estable y cumple con todos los requisitos funcionales probados. Las operaciones de cálculo, persistencia y gestión de productos funcionan según lo esperado. Se recomienda revisar la configuración de pruebas para eliminar el error de `jest-dom` en futuras iteraciones, aunque no es bloqueante para el despliegue actual.

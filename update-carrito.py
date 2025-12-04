import os
import re

# Leer el archivo
file_path = r"c:\Users\fdhm3\OneDrive\Desktop\Fullstack-2\src\components\pages\Carrito.jsx"

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Agregar función calcularDescuento después de cargarProductosOferta
old_text1 = """  };

  /**
   * Actualiza el stock en Firebase cuando se agrega al carrito
   */"""

new_text1 = """  };

  /**
   * Calcula el porcentaje de descuento
   */
  const calcularDescuento = (precioAnterior, precioActual) => {
    if (!precioAnterior || !precioActual || precioAnterior <= precioActual) {
      return 0;
    }
    return Math.round(((precioAnterior - precioActual) / precioAnterior) * 100);
  };

  /**
   * Actualiza el stock en Firebase cuando se agrega al carrito
   */"""

content = content.replace(old_text1, new_text1)

# 2. Actualizar el filtro de productos en oferta
old_text2 = """      // Filtrar productos con precio anterior (en oferta)
      const productosConOferta = productos.filter(producto => producto.precioAnterior);"""

new_text2 = """      // Filtrar productos con descuento real (precioAnterior > precio)
      const productosConOferta = productos.filter(producto => 
        producto.precioAnterior && producto.precioAnterior > producto.precio
      );"""

content = content.replace(old_text2, new_text2)

# 3. Actualizar el map de productos para incluir badge de descuento
old_text3 = """              productosOferta.map(producto => (
                <div key={producto.id} className={style.productoCard}>
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className={style.productoImagen}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x300/cccccc/969696?text=Imagen+No+Disponible';
                    }}
                  />
                  <div className={style.productoInfo}>
                    <h3 className={style.productoNombre}>{producto.nombre}</h3>
                    <div className={style.preciosOferta}>
                      <span className={style.precioAnterior}>
                        ${producto.precioAnterior?.toLocaleString('es-CL')}
                      </span>
                      <span className={style.precioActual}>
                        ${producto.precio?.toLocaleString('es-CL')}
                      </span>
                    </div>
                    <p className={style.stockDisponible}>
                      Stock: {producto.stock || 10}
                    </p>
                    <button
                      className={style.btnAgregarOferta}
                      onClick={() => agregarAlCarrito(producto)}
                    >
                      Añadir
                    </button>
                  </div>
                </div>
              ))"""

new_text3 = """              productosOferta.map(producto => {
                const descuento = calcularDescuento(producto.precioAnterior, producto.precio);
                const ahorro = producto.precioAnterior - producto.precio;
                
                return (
                  <div key={producto.id} className={style.productoCard}>
                    {descuento > 0 && (
                      <div className={style.descuentoBadge}>
                        -{descuento}%
                      </div>
                    )}
                    <img
                      src={producto.imagen}
                      alt={producto.nombre}
                      className={style.productoImagen}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x300/cccccc/969696?text=Imagen+No+Disponible';
                      }}
                    />
                    <div className={style.productoInfo}>
                      <h3 className={style.productoNombre}>{producto.nombre}</h3>
                      <div className={style.preciosOferta}>
                        <span className={style.precioAnterior}>
                          ${producto.precioAnterior?.toLocaleString('es-CL')}
                        </span>
                        <span className={style.precioActual}>
                          ${producto.precio?.toLocaleString('es-CL')}
                        </span>
                      </div>
                      {ahorro > 0 && (
                        <p className={style.ahorroTexto}>
                          ¡Ahorras ${ahorro.toLocaleString('es-CL')}!
                        </p>
                      )}
                      <p className={style.stockDisponible}>
                        Stock: {producto.stock || 10}
                      </p>
                      <button
                        className={style.btnAgregarOferta}
                        onClick={() => agregarAlCarrito(producto)}
                      >
                        Añadir
                      </button>
                    </div>
                  </div>
                );
              })"""

content = content.replace(old_text3, new_text3)

# Escribir el archivo actualizado
with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Archivo actualizado exitosamente")

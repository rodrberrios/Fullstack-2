import React, { useState, useEffect } from 'react';
import { db } from '../../config/firebase'
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Header from '../organisms/Header';
import style from './Carrito.module.css';

/**
 * Componente del Carrito de Compras
 * Muestra productos en oferta y el resumen del carrito
 */
const Carrito = () => {
  const [carrito, setCarrito] = useState([]);
  const [productosOferta, setProductosOferta] = useState([]);
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();

  // Cargar carrito desde localStorage al inicializar
  useEffect(() => {
    const carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || [];
    setCarrito(carritoGuardado);
    cargarProductosOferta();
  }, []);

  /**
   * Carga productos en oferta desde Firestore
   */
  const cargarProductosOferta = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'producto'));
      const productos = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      // Filtrar productos con precio anterior (en oferta)
      const productosConOferta = productos.filter(producto => producto.precioAnterior);
      setProductosOferta(productosConOferta);
    } catch (error) {
      console.error('Error cargando productos en oferta:', error);
    } finally {
      setCargando(false);
    }
  };

  /**
   * Actualiza el stock en Firebase cuando se agrega al carrito
   */
  const actualizarStockFirebase = async (productId, cantidad) => {
    try {
      const productoRef = doc(db, 'producto', productId);
      const producto = productosOferta.find(p => p.id === productId);
      
      if (producto && producto.stock !== undefined) {
        const nuevoStock = producto.stock - cantidad;
        await updateDoc(productoRef, {
          stock: nuevoStock
        });
        console.log(`Stock actualizado: ${producto.nombre} - Nuevo stock: ${nuevoStock}`);
      }
    } catch (error) {
      console.error('Error actualizando stock:', error);
    }
  };

  /**
   * Restaura el stock cuando se elimina del carrito
   */
  const restaurarStockFirebase = async (productId, cantidad) => {
    try {
      const productoRef = doc(db, 'producto', productId);
      const producto = productosOferta.find(p => p.id === productId);
      
      if (producto && producto.stock !== undefined) {
        const nuevoStock = producto.stock + cantidad;
        await updateDoc(productoRef, {
          stock: nuevoStock
        });
        console.log(`Stock restaurado: ${producto.nombre} - Nuevo stock: ${nuevoStock}`);
      }
    } catch (error) {
      console.error('Error restaurando stock:', error);
    }
  };

  /**
   * Agrega un producto al carrito
   */
  const agregarAlCarrito = async (producto) => {
    const productoExistente = carrito.find(item => item.id === producto.id);
    let nuevoCarrito;

    if (productoExistente) {
      nuevoCarrito = carrito.map(item =>
        item.id === producto.id
          ? { ...item, cantidad: (item.cantidad || 1) + 1 }
          : item
      );
    } else {
      nuevoCarrito = [...carrito, { ...producto, cantidad: 1 }];
    }

    setCarrito(nuevoCarrito);
    guardarCarrito(nuevoCarrito);
    
    // Actualizar stock en Firebase
    await actualizarStockFirebase(producto.id, 1);
    
    mostrarNotificacion(`"${producto.nombre}" agregado al carrito`);
  };

  /**
   * Actualiza la cantidad de un producto en el carrito
   */
  const actualizarCantidad = async (index, nuevaCantidad) => {
    if (nuevaCantidad < 1) return;

    const producto = carrito[index];
    const diferencia = nuevaCantidad - (producto.cantidad || 1);

    const nuevoCarrito = carrito.map((item, i) =>
      i === index ? { ...item, cantidad: nuevaCantidad } : item
    );

    setCarrito(nuevoCarrito);
    guardarCarrito(nuevoCarrito);

    // Actualizar stock en Firebase
    if (diferencia > 0) {
      await actualizarStockFirebase(producto.id, diferencia);
    } else {
      await restaurarStockFirebase(producto.id, Math.abs(diferencia));
    }
  };

  /**
   * Elimina un producto del carrito
   */
  const eliminarDelCarrito = async (index) => {
    const producto = carrito[index];
    const cantidadEliminada = producto.cantidad || 1;
    const nuevoCarrito = carrito.filter((_, i) => i !== index);
    
    setCarrito(nuevoCarrito);
    guardarCarrito(nuevoCarrito);
    
    // Restaurar stock en Firebase
    await restaurarStockFirebase(producto.id, cantidadEliminada);
    
    mostrarNotificacion(`"${producto.nombre}" eliminado del carrito`);
  };

  /**
   * Guarda el carrito en localStorage
   */
  const guardarCarrito = (nuevoCarrito) => {
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
  };

  /**
   * Limpia todo el carrito
   */
  const limpiarCarrito = async () => {
    if (carrito.length === 0) {
      alert('El carrito ya está vacío');
      return;
    }

    if (window.confirm('¿Estás seguro de que quieres limpiar todo el carrito?')) {
      // Restaurar stock de todos los productos
      for (const producto of carrito) {
        await restaurarStockFirebase(producto.id, producto.cantidad || 1);
      }
      
      setCarrito([]);
      localStorage.removeItem('carrito');
      mostrarNotificacion('Carrito limpiado correctamente');
    }
  };

  /**
   * Navega al checkout
   */
  const irAlCheckout = () => {
    if (carrito.length === 0) {
      alert('Agrega productos al carrito antes de continuar');
      return;
    }
    navigate('/checkout');
  };

  /**
   * Muestra una notificación temporal
   */
  const mostrarNotificacion = (mensaje) => {
    alert(mensaje);
  };

  /**
   * Calcula el total del carrito
   */
  const calcularTotal = () => {
    return carrito.reduce((total, producto) => {
      return total + (producto.precio || 0) * (producto.cantidad || 1);
    }, 0);
  };

  if (cargando) {
    return (
      <div className={style.container}>
        <Header />
        <div className={style.cargando}>
          <div className={style.spinner}>🔄</div>
          <p>Cargando productos en oferta...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={style.container}>
      <Header />
      
      <div className={style.carritoContainer}>
        {/* Productos en Oferta */}
        <section className={style.ofertasSection}>
          <h2 className={style.sectionTitle}>Productos en Oferta</h2>
          <div className={style.productosGrid}>
            {productosOferta.length === 0 ? (
              <p className={style.sinOfertas}>No hay productos en oferta en este momento.</p>
            ) : (
              productosOferta.map(producto => (
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
              ))
            )}
          </div>
        </section>

        {/* Resumen del Carrito */}
        <section className={style.resumenCarrito}>
          <h2 className={style.sectionTitle}>Resumen del Carrito</h2>
          
          {/* Tabla de productos en carrito */}
          <div className={style.tablaCarritoContainer}>
            <table className={style.tablaCarrito}>
              <thead>
                <tr>
                  <th>Imagen</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Subtotal</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {carrito.length === 0 ? (
                  <tr>
                    <td colSpan="6" className={style.carritoVacio}>
                      <div className={style.icono}>🛒</div>
                      <h3>Tu carrito está vacío</h3>
                      <p>Agrega algunos productos para continuar</p>
                      <button 
                        className={style.btnIrCatalogo}
                        onClick={() => navigate('/productos')}
                      >
                        Ir al Catálogo
                      </button>
                    </td>
                  </tr>
                ) : (
                  carrito.map((producto, index) => (
                    <tr key={`${producto.id}-${index}`}>
                      <td>
                        <img 
                          src={producto.imagen} 
                          alt={producto.nombre}
                          className={style.imagenTabla}
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/100x100/cccccc/969696?text=Imagen';
                          }}
                        />
                      </td>
                      <td>{producto.nombre}</td>
                      <td>${producto.precio?.toLocaleString('es-CL')}</td>
                      <td>
                        <div className={style.controlesCantidad}>
                          <button 
                            className={style.btnCantidad}
                            onClick={() => actualizarCantidad(index, (producto.cantidad || 1) - 1)}
                          >
                            -
                          </button>
                          <span className={style.cantidadActual}>
                            {producto.cantidad || 1}
                          </span>
                          <button 
                            className={style.btnCantidad}
                            onClick={() => actualizarCantidad(index, (producto.cantidad || 1) + 1)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>
                        ${((producto.precio || 0) * (producto.cantidad || 1)).toLocaleString('es-CL')}
                      </td>
                      <td>
                        <button 
                          className={style.btnEliminar}
                          onClick={() => eliminarDelCarrito(index)}
                        >
                         Eliminar
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Total y Botones */}
          {carrito.length > 0 && (
            <div className={style.carritoFooter}>
              <div className={style.totalContainer}>
                <span className={style.totalText}>Total: $</span>
                <span className={style.totalPrecio}>
                  {calcularTotal().toLocaleString('es-CL')}
                </span>
              </div>
              <div className={style.botonesCarrito}>
                <button 
                  className={style.btnLimpiar}
                  onClick={limpiarCarrito}
                >
                  Limpiar Carrito
                </button>
                <button 
                  className={style.btnComprarAhora}
                  onClick={irAlCheckout}
                >
                  Comprar Ahora
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Carrito;
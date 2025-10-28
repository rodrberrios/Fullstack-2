import React, { useState, useEffect } from 'react';
import { obtenerProductos } from '../../services/productService';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Header from '../organisms/Header';
import Footer from '../organisms/Footer';
import style from './Catalogo.module.css';
import ProductCard from '../molecules/ProductCard';

const Catalogo = () => {
  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [categoriaActiva, setCategoriaActiva] = useState('todos');
  const [carrito, setCarrito] = useState([]);
  const { usuario, estaAutenticado } = useAuth();
  const navigate = useNavigate();

  // Cargar productos al montar el componente
  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const productosData = await obtenerProductos();
        setProductos(productosData);
        setProductosFiltrados(productosData);
        setCargando(false);
      } catch (error) {
        console.error('Error:', error);
        setCargando(false);
      }
    };

    // Cargar carrito desde localStorage
    const carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || [];
    setCarrito(carritoGuardado);

    cargarProductos();
  }, []);

  /**
   * Calcula el total del carrito para el header
   */
  const calcularTotalCarritoHeader = () => {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    return carrito.reduce((total, producto) => {
      return total + (producto.precio || 0) * (producto.cantidad || 1);
    }, 0);
  };

  // Obtener categorías únicas
  const categorias = ['todos', ...new Set(productos.map(p => p.categoria).filter(Boolean))];

  // Filtrar por categoría
  const filtrarPorCategoria = (categoria) => {
    setCategoriaActiva(categoria);
    if (categoria === 'todos') {
      setProductosFiltrados(productos);
    } else {
      setProductosFiltrados(productos.filter(p => p.categoria === categoria));
    }
    setTerminoBusqueda('');
  };

  // Buscar productos
  const buscarProductos = () => {
    if (!terminoBusqueda.trim()) {
      filtrarPorCategoria(categoriaActiva);
      return;
    }

    const termino = terminoBusqueda.toLowerCase();
    const resultados = productos.filter(p => 
      p.nombre?.toLowerCase().includes(termino) ||
      p.categoria?.toLowerCase().includes(termino) ||
      p.descripcion?.toLowerCase().includes(termino)
    );
    setProductosFiltrados(resultados);
  };

  // Agregar al carrito
  const agregarAlCarrito = (producto) => {
    const carritoActual = JSON.parse(localStorage.getItem('carrito')) || [];
    const productoExistente = carritoActual.find(item => item.id === producto.id);
    let nuevoCarrito;

    if (productoExistente) {
      nuevoCarrito = carritoActual.map(item =>
        item.id === producto.id
          ? { ...item, cantidad: (item.cantidad || 1) + 1 }
          : item
      );
    } else {
      nuevoCarrito = [...carritoActual, { ...producto, cantidad: 1 }];
    }

    setCarrito(nuevoCarrito);
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
    
    // Mostrar notificación
    mostrarNotificacion(`"${producto.nombre}" agregado al carrito`);
  };

  // Mostrar notificación
  const mostrarNotificacion = (mensaje) => {
    alert(mensaje);
  };

  // Obtener icono de categoría
  const obtenerIconoCategoria = (categoria) => {
    const iconos = {
      'Ropa': '👕',
      'Tecnología': '💻',
      'Electrónica': '📱',
      'Accesorios': '🕶️',
      'Libros': '📚',
      'Juguetes': '🧸'
    };
    return iconos[categoria] || '📦';
  };

  if (cargando) {
    return (
      <div className="container">
        <Header />
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h2>Cargando productos...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <Header />

      {/* HEADER DEL CATÁLOGO */}
      <header className={style.header}>
        <div className={style.headerTop}>
          <div className={style.searchContainer}>
            <input 
              type="text" 
              className={style.searchInput}
              placeholder="Buscar productos..."
              value={terminoBusqueda}
              onChange={(e) => setTerminoBusqueda(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && buscarProductos()}
            />
            <button className={style.btnBuscar} onClick={buscarProductos}>
              Buscar
            </button>
          </div>
          
        </div>

        <nav className={style.navMain}>
          <div className={style.navRow}>
          <div className={style.navCenter}>
            {categorias.map(categoria => (
              <a 
                key={categoria}
                className={`${style.navLink} ${categoriaActiva === categoria ? style.active : ''}`}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  filtrarPorCategoria(categoria);
                }}
              >
                {categoria === 'todos' ? 'Todos' : categoria}
              </a>
            ))}
          </div>
          
          <div className={style.navRight}>
            <button 
              className={style.btnCarrito}
              onClick={() => navigate('/carrito')}
            >
              <span className={style.carritoIcon}>🛒</span>
              Carrito: ${calcularTotalCarritoHeader().toLocaleString('es-CL')}
            </button>
          </div>
          </div>
        </nav>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className={style.main}>
        {/* CATEGORÍAS */}
        <section className={style.categoriasSection}>
          <h2 className={style.sectionTitle}>Categorías</h2>
          <div className={style.categoriasGrid} id="cardsCategorias">
            {categorias.filter(cat => cat !== 'todos').map(categoria => (
              <div 
                key={categoria}
                className={style.categoriaCard}
                onClick={() => filtrarPorCategoria(categoria)}
              >
                <div className={style.categoriaImg}>
                  {obtenerIconoCategoria(categoria)}
                </div>
                <div className={style.categoriaNombre}>{categoria}</div>
              </div>
            ))}
          </div>
        </section>

        {/* PRODUCTOS */}
        <section className={style.productosSection}>
          <div className={style.productosHeader}>
            <h2 className={style.sectionTitle} style={{ margin: 0 }}>
              {categoriaActiva === 'todos' 
                ? `Todos los productos (${productosFiltrados.length})`
                : `${categoriaActiva} (${productosFiltrados.length} productos)`
              }
            </h2>
            <button 
              className={style.btnVerTodos}
              onClick={() => filtrarPorCategoria('todos')}
            >
              Ver Todos
            </button>
          </div>

          {productosFiltrados.length === 0 ? (
            <div className={style.emptyWrap}>
              <p className={style.emptyText}>
                No se encontraron productos
              </p>
              <button 
                className={style.btnSignup}
                onClick={() => filtrarPorCategoria('todos')}
              >
                Ver todos los productos
              </button>
            </div>
          ) : (
            <div className={style.productosGrid}>
              {productosFiltrados.map(producto => (
                <ProductCard key={producto.id} producto={producto} onAgregar={agregarAlCarrito} />
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Catalogo;
import React, { useState, useEffect } from 'react';
import { obtenerProductos } from '../../services/productService';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Header from '../organisms/Header';

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
      'Hogar': '🏠',
      'Deportes': '⚽',
      'Zapatos': '👟',
      'Accesorios': '🕶️',
      'Libros': '📚',
      'Juguetes': '🧸',
      'Belleza': '💄'
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
      <header className="header">
        <div className="header-top">
          <div className="search-container">
            <input 
              type="text" 
              className="search-input" 
              placeholder="Buscar productos..."
              value={terminoBusqueda}
              onChange={(e) => setTerminoBusqueda(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && buscarProductos()}
            />
            <button className="btn-buscar" onClick={buscarProductos}>
              Buscar
            </button>
          </div>
          
          <div className="auth-buttons">
            {estaAutenticado ? (
              <span style={{ color: '#333' }}>Hola, {usuario.nombre}</span>
            ) : (
              <>
                <button 
                  className="btn-login" 
                  onClick={() => navigate('/login')}
                >
                  Iniciar Sesión
                </button>
                <button 
                  className="btn-signup" 
                  onClick={() => navigate('/register')}
                >
                  Registrarse
                </button>
              </>
            )}
          </div>
        </div>

        <nav className="nav-main">
          <div className="nav-center">
            {categorias.map(categoria => (
              <a 
                key={categoria}
                className={`nav-link ${categoriaActiva === categoria ? 'active' : ''}`}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  filtrarPorCategoria(categoria);
                }}
                style={{
                  color: categoriaActiva === categoria ? '#007bff' : '#333',
                  fontWeight: categoriaActiva === categoria ? 'bold' : 'normal'
                }}
              >
                {categoria === 'todos' ? 'Todos' : categoria}
              </a>
            ))}
          </div>
          
          <div className="nav-right">
            <button 
              className="btn-carrito" 
              onClick={() => navigate('/carrito')}
            >
              <span className="carrito-icon">🛒</span>
              Carrito: ${calcularTotalCarritoHeader().toLocaleString('es-CL')}
            </button>
          </div>
        </nav>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="main">
        {/* CATEGORÍAS */}
        <section className="categorias-section">
          <h2 className="section-title">Categorías</h2>
          <div className="categorias-grid" id="cardsCategorias">
            {categorias.filter(cat => cat !== 'todos').map(categoria => (
              <div 
                key={categoria}
                className="categoria-card"
                onClick={() => filtrarPorCategoria(categoria)}
              >
                <div className="categoria-img">
                  {obtenerIconoCategoria(categoria)}
                </div>
                <div className="categoria-nombre">{categoria}</div>
              </div>
            ))}
          </div>
        </section>

        {/* PRODUCTOS */}
        <section className="productos-section">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
            <h2 className="section-title" style={{ margin: 0 }}>
              {categoriaActiva === 'todos' 
                ? `Todos los productos (${productosFiltrados.length})`
                : `${categoriaActiva} (${productosFiltrados.length} productos)`
              }
            </h2>
            <button 
              className="btn-ver-todos"
              onClick={() => filtrarPorCategoria('todos')}
            >
              🔄 Ver Todos
            </button>
          </div>

          {productosFiltrados.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <p style={{ fontSize: '18px', color: '#666', marginBottom: '15px' }}>
                No se encontraron productos
              </p>
              <button 
                className="btn-signup" 
                onClick={() => filtrarPorCategoria('todos')}
              >
                Ver todos los productos
              </button>
            </div>
          ) : (
            <div className="productos-grid">
              {productosFiltrados.map(producto => (
                <div key={producto.id} className="producto-card">
                  <img 
                    src={producto.imagen} 
                    alt={producto.nombre}
                    className="producto-imagen"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x300/cccccc/969696?text=Imagen+No+Disponible';
                    }}
                  />
                  <div className="producto-info">
                    <h3 className="producto-nombre">{producto.nombre || 'Sin nombre'}</h3>
                    <p className="producto-precio">${(producto.precio || 0).toLocaleString('es-CL')}</p>
                    <button 
                      className="btn-agregar"
                      onClick={() => agregarAlCarrito(producto)}
                    >
                      🛒 Agregar al carrito
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Catalogo;
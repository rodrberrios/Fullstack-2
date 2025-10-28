import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Nav = () => {
  const { usuario, logout, estaAutenticado } = useAuth();
  const navigate = useNavigate();

  /**
   * Calcula el total del carrito desde localStorage
   */
  const calcularTotalCarrito = () => {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    return carrito.reduce((total, producto) => {
      return total + (producto.precio || 0) * (producto.cantidad || 1);
    }, 0);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="nav__bar">
      <img className="nav__logo" src="/assets/img/icon.png" alt="Level UP Store Logo" />
      <h2 className="nav__title">
        <Link to="/">Level UP Store</Link>
      </h2>
      <div className="nav__container">
        <ul className="nav__menu">
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/productos">Productos</Link></li>
          <li><Link to="/nosotros">Nosotros</Link></li>
          <li><Link to="/blog">Blog</Link></li>
          <li><Link to="/contacto">Contacto</Link></li>
        </ul>
      </div>
      <div className="carrito__container">
        {/* ✅ MOSTRAR ESTADO DE SESIÓN Y CARRITO */}
        {estaAutenticado ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span style={{ color: 'white' }}>Hola, {usuario.nombre}</span>
            <Link 
              className="carrito" 
              to="/carrito"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                background: '#28a745',
                padding: '8px 15px',
                borderRadius: '20px',
                color: 'white',
                textDecoration: 'none'
              }}
            >
              🛒 ${calcularTotalCarrito().toLocaleString('es-CL')}
            </Link>
            <button 
              onClick={handleLogout}
              style={{
                padding: '5px 10px',
                background: '#ff4444',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Cerrar Sesión
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <Link 
              className="carrito" 
              to="/carrito"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                background: '#28a745',
                padding: '8px 15px',
                borderRadius: '20px',
                color: 'white',
                textDecoration: 'none'
              }}
            >
              🛒 ${calcularTotalCarrito().toLocaleString('es-CL')}
            </Link>
            <Link 
              className="header__link" 
              to="/login"
              style={{
                padding: '8px 15px',
                background: 'white',
                color: '#007bff',
                border: '1px solid #007bff',
                borderRadius: '20px',
                textDecoration: 'none'
              }}
            >
              Inicio Sesión
            </Link>
            <Link 
              className="header__link" 
              to="/register"
              style={{
                padding: '8px 15px',
                background: '#007bff',
                color: 'white',
                border: '1px solid #007bff',
                borderRadius: '20px',
                textDecoration: 'none'
              }}
            >
              Registrarse
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Nav;
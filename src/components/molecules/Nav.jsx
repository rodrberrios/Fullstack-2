import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // ✅ NUEVO

const Nav = () => {
  const { usuario, logout, estaAutenticado } = useAuth(); // ✅ OBTENER ESTADO
  const navigate = useNavigate();

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
        {/* ✅ MOSTRAR ESTADO DE SESIÓN */}
        {estaAutenticado ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span style={{ color: 'white' }}>👤{usuario.nombre}</span>
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
            <Link className="carrito" to="/carrito">Carrito</Link>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '10px' }}>
            <Link className="header__link" to="/login">Inicio Sesión</Link>
            <Link className="header__link" to="/register">Registrarse</Link>
            <Link className="carrito" to="/carrito">Carrito</Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Nav;
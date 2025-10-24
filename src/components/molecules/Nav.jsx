import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './Nav.module.css'; // Importar CSS Modules

const Nav = () => {
  const { usuario, logout, estaAutenticado } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className={styles.navBar}>
      <img 
        className={styles.navLogo} 
        src="/assets/img/icon.png" 
        alt="Level UP Store Logo" 
      />
      <h2 className={styles.navTitle}>
        <Link to="/">Level UP Store</Link>
      </h2>
      <div className={styles.navContainer}>
        <ul className={styles.navMenu}>
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/productos">Productos</Link></li>
          <li><Link to="/nosotros">Nosotros</Link></li>
          <li><Link to="/blog">Blog</Link></li>
          <li><Link to="/contacto">Contacto</Link></li>
        </ul>
      </div>
      <div className={styles.carritoContainer}>
        {/* MOSTRAR ESTADO DE SESIÓN */}
        {estaAutenticado ? (
          <div className={styles.userInfo}>
            <span className={styles.userName}>👤{usuario.nombre}</span>
            <button 
              onClick={handleLogout}
              className={styles.logoutButton}
            >
              Cerrar Sesión
            </button>
            <Link className={styles.carritoLink} to="/carrito">Carrito</Link>
          </div>
        ) : (
          <div className={styles.authLinks}>
            <Link to="/login">Inicio Sesión</Link>
            <Link to="/register">Registrarse</Link>
            <Link className={styles.carritoLink} to="/carrito">Carrito</Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Nav;
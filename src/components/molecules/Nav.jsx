import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import style from './Nav.module.css';

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
    <nav className={style.nav}>
      <div className={style.inner}>
        <Link to="/" className={style.brand}>
          <img className={style.logo} src="/assets/img/icon.png" alt="Level UP Store Logo" />
          <h2 className={style.title}>Level UP Store</h2>
        </Link>

        <ul className={style.menu}>
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/catalogo">Productos</Link></li>
          <li><Link to="/nosotros">Nosotros</Link></li>
          <li><Link to="/blog">Blog</Link></li>
          <li><Link to="/contacto">Contacto</Link></li>
        </ul>

        <div className={style.right}>
          {estaAutenticado ? (
            <>
              <span className={style.user}>👤{usuario.nombre}</span>
              <button className={style.btnLogout} onClick={handleLogout}>
                Cerrar Sesión
              </button>
              <Link className={style.cartLink} to="/carrito">🛒 {calcularTotalCarrito().toLocaleString('es-CL')}</Link>
            </>
          ) : (
            <>
              <Link className={style.linkSecondary} to="/login">Iniciar Sesión</Link>
              <Link className={style.btnPrimary} to="/register">Registrarse</Link>
              <Link className={style.cartLink} to="/carrito">🛒 {calcularTotalCarrito().toLocaleString('es-CL')}</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Nav;
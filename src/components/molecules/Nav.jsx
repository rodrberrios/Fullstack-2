import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Nav.module.css';

const Nav = () => {
    const { usuario, logout, estaAutenticado } = useAuth();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const calcularTotalCarrito = () => {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        return carrito.reduce((total, producto) => {
          return total + (producto.precio || 0) * (producto.cantidad || 1);
        }, 0);
      };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className={styles.nav}>
            <div className={styles.inner}>
                <Link to="/" className={styles.brand}>
                    <img src="/assets/img/icon.png" alt="Logo" className={styles.logo} />
                    <h1 className={styles.title}>Level Up Store</h1>
                </Link>

                <button className={styles.menuButton} onClick={toggleMenu}>
                    ☰
                </button>

                <ul className={`${styles.menu} ${isMenuOpen ? styles.menuOpen : ''}`}>
                    <li><Link to="/">Inicio</Link></li>
                    <li><Link to="/catalogo">Catálogo</Link></li>
                    <li><Link to="/blog">Blog</Link></li>
                    <li><Link to="/nosotros">Nosotros</Link></li>
                </ul>

                <div className={styles.right}>
                    {estaAutenticado ? (
                        <>
                            <span className={styles.user}> <Link to='/perfil'>👤{usuario.nombre}</Link> </span>
                            <button className={styles.btnLogout} onClick={handleLogout}>
                                Cerrar Sesión
                            </button>
                            <Link className={styles.cartLink} to="/carrito">🛒 {calcularTotalCarrito().toLocaleString('es-CL')}</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/carrito" className={styles.cartLink}>🛒</Link>
                            <Link to="/login" className={styles.linkSecondary}>Ingresar</Link>
                            <Link to="/register" className={styles.btnPrimary}>Registrarse</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Nav;
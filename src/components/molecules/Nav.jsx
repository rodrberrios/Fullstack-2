import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Nav.module.css';

const Nav = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
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
                    <Link to="/carrito" className={styles.cartLink}>🛒</Link>
                    <Link to="/login" className={styles.linkSecondary}>Ingresar</Link>
                    <Link to="/registro" className={styles.btnPrimary}>Registrarse</Link>
                </div>
            </div>
        </nav>
    );
};

export default Nav;
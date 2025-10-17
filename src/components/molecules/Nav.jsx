import React from 'react';
import { Link } from 'react-router-dom';
// import './Navbar.css'; 
const Nav = () => {
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
                <Link className="carrito" to="/carrito">Carrito</Link>
            </div>
        </nav>
    );
}

export default Nav;
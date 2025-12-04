import React, { useContext } from 'react';
import { UserContext } from "../../context/AuthContext"
import { Link, useLocation, useNavigate } from 'react-router-dom';
import style from './AsideVendedor.module.css';

const AsideVendedor = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);

    // Función para verificar si el link está activo
    const isActiveLink = (path) => {
        return location.pathname === path;
    };

    // Función para cerrar sesión
    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('usuario');
        navigate('/');
    };

    return (
        <aside className={style.sidebar}>
            <nav className={style.sidebar__nav}>
                {/* Sección Panel Vendedor */}
                <div className={style.nav__section}>
                    <div className={style.nav__title}>Panel Vendedor</div>
                    <ul className={style.nav__list}>
                        <li className={style.nav__item}>
                            <Link
                                to="/vendedor/dashboard"
                                className={`${style.nav__link} ${isActiveLink('/vendedor/dashboard') ? style.active : ''}`}
                            >
                                Dashboard
                            </Link>
                        </li>
                        <li className={style.nav__item}>
                            <Link
                                to="/vendedor/ordenes"
                                className={`${style.nav__link} ${isActiveLink('/vendedor/ordenes') ? style.active : ''}`}
                            >
                                Órdenes
                            </Link>
                        </li>
                        <li className={style.nav__item}>
                            <Link
                                to="/vendedor/productos"
                                className={`${style.nav__link} ${isActiveLink('/vendedor/productos') ? style.active : ''}`}
                            >
                                Productos
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Sección Cuenta */}
                <div className={style.nav__section}>
                    <div className={style.nav__title}>Cuenta</div>
                    <ul className={style.nav__list}>
                        <li className={style.nav__item}>
                            <Link
                                to="/vendedor/perfil"
                                className={`${style.nav__link} ${isActiveLink('/vendedor/perfil') ? style.active : ''}`}
                            >
                                Mi Perfil
                            </Link>
                        </li>
                        <li className={style.nav__item}>
                            <Link
                                to="/"
                                className={style.nav__link}
                            >
                                Tienda
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>

            {/* Footer del Sidebar con info del usuario */}
            <div className={style.sidebar__footer}>
                <div className={style.user__info}>
                    <div className={style.user__avatar}>
                        V
                    </div>
                    <div className={style.user__details}>
                        <p className={style.user__name}>Vendedor</p>
                        <p className={style.user__role}>{user?.nombre}</p>
                    </div>
                </div>
                <button className={style.logout__button} onClick={handleLogout}>
                    <span className={style.logout__icon}></span>
                    Cerrar Sesión
                </button>
            </div>
        </aside>
    );
};

export default AsideVendedor;

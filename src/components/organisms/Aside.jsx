import React, { useContext } from 'react';
import { UserContext } from "../../context/AuthContext"
import { Link, useLocation, useNavigate } from 'react-router-dom';
import style from './Aside.module.css';

const Aside = () => {
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
        {/* Sección Administración */}
        <div className={style.nav__section}>
          <div className={style.nav__title}>Administración</div>
          <ul className={style.nav__list}>
            <li className={style.nav__item}>
              <Link
                to="/dashboard"
                className={`${style.nav__link} ${isActiveLink('/dashboard') ? style.active : ''}`}
              >
                Dashboard
              </Link>
            </li>
            <li className={style.nav__item}>
              <Link
                to="/orders"
                className={`${style.nav__link} ${isActiveLink('/orders') ? style.active : ''}`}
              >
                Ordenes
              </Link>
            </li>
            <li className={style.nav__item}>
              <Link
                to="/inventory"
                className={`${style.nav__link} ${isActiveLink('/inventory') ? style.active : ''}`}
              >
                Productos
              </Link>
            </li>
            <li className={style.nav__item}>
              <Link
                to="/categories"
                className={`${style.nav__link} ${isActiveLink('/categories') ? style.active : ''}`}
              >
                Categorías
              </Link>
            </li>
            <li className={style.nav__item}>
              <Link
                to="/customers"
                className={`${style.nav__link} ${isActiveLink('/customers') ? style.active : ''}`}
              >
                Usuarios
              </Link>
            </li>
            <li className={style.nav__item}>
              <Link
                to="/reports"
                className={`${style.nav__link} ${isActiveLink('/reports') ? style.active : ''}`}
              >
                Reportes
              </Link>
            </li>
            <li className={style.nav__item}>
              <a
                href="http://localhost:5000/api-docs"
                target="_blank"
                rel="noopener noreferrer"
                className={style.nav__link}
              >
                API Docs
              </a>
            </li>
          </ul>
        </div>

        {/* Sección Cuenta */}
        <div className={style.nav__section}>
          <div className={style.nav__title}>Cuenta</div>
          <ul className={style.nav__list}>
            <li className={style.nav__item}>
              <Link
                to="/perfilAdmin"
                className={`${style.nav__link} ${isActiveLink('/perfilAdmin') ? style.active : ''}`}
              >
                Perfil
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
            A
          </div>
          <div className={style.user__details}>
            <p className={style.user__name}>Administrador</p>
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

export default Aside;
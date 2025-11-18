import React from 'react';
import { UserContext } from "../../context/AuthContext"
import { Link, useLocation } from 'react-router-dom';
import style from './Aside.module.css';

const Aside = () => {
  const location = useLocation();
  const { usuario } = UserContext()

  // Función para verificar si el link está activo
  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  return (
    <aside className={style.sidebar}>
      <nav className={style.sidebar__nav}>
        {/* Sección Company */}
        <div className={style.nav__section}>
          <div className={style.nav__title}>Company</div>
          <ul className={style.nav__list}>
            <li className={style.nav__item}>
              <Link 
                to="/admin" 
                className={`${style.nav__link} ${isActiveLink('/admin') ? style.active : ''}`}
              >
                Dashboard
              </Link>
            </li>
            <li className={style.nav__item}>
              <Link 
                to="/orders" 
                className={`${style.nav__link} ${isActiveLink('/admin/orders') ? style.active : ''}`}
              >
                Orders
              </Link>
            </li>
            <li className={style.nav__item}>
              <Link 
                to="/inventory" 
                className={`${style.nav__link} ${isActiveLink('/admin/inventory') ? style.active : ''}`}
              >
                Inventory
              </Link>
            </li>
            <li className={style.nav__item}>
              <Link 
                to="/reports" 
                className={`${style.nav__link} ${isActiveLink('/admin/reports') ? style.active : ''}`}
              >
                Reports
              </Link>
            </li>
            <li className={style.nav__item}>
              <Link 
                to="/employees" 
                className={`${style.nav__link} ${isActiveLink('/admin/employees') ? style.active : ''}`}
              >
                Employees
              </Link>
            </li>
            <li className={style.nav__item}>
              <Link 
                to="/customers" 
                className={`${style.nav__link} ${isActiveLink('/admin/customers') ? style.active : ''}`}
              >
                Customers
              </Link>
            </li>
          </ul>
        </div>
        
        {/* Sección Ecosystems */}
        <div className={style.nav__section}>
          <div className={style.nav__title}>Ecosystems</div>
          <ul className={style.nav__list}>
            <li className={style.nav__item}>
              <Link 
                to="/settings" 
                className={`${style.nav__link} ${isActiveLink('/admin/settings') ? style.active : ''}`}
              >
                Settings
              </Link>
            </li>
            <li className={style.nav__item}>
              <Link 
                to="/profile" 
                className={`${style.nav__link} ${isActiveLink('/admin/profile') ? style.active : ''}`}
              >
                Profile
              </Link>
            </li>
            <li className={style.nav__item}>
              <a href="#" className={style.nav__link}>Works</a>
            </li>
            <li className={style.nav__item}>
              <a href="#" className={style.nav__link}>Search</a>
            </li>
            <li className={style.nav__item}>
              <a href="#" className={style.nav__link}>Help</a>
            </li>
            <li className={style.nav__item}>
              <a href="#" className={style.nav__link}>Details</a>
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
            <p className={style.user__name}>Administrador {usuario?.nombre}</p>
            <p className={style.user__role}>Admin Level Up</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Aside;
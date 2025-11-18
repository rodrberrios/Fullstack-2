import asideStyles from "./AsideCliente.module.css";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/AuthContext";

export default function AsideCliente({ className = "" }) {
    const { user } = useContext(UserContext);
    
    return (
        <div className={`${asideStyles.sidebarInner} ${className}`}>
            <nav className={asideStyles.sidebar__nav}>
                <div className={asideStyles.nav__section}>
                    <h3 className={asideStyles.welcomeTitle}>
                        ¡Bienvenido, {user?.nombre || user?.correo || "Usuario"}!
                    </h3>
                    <ul className={asideStyles.nav__list}>
                        {/* Nuevo enlace para volver al perfil */}
                        <li className={asideStyles.nav__item}>
                            <Link to="/" className={asideStyles.nav__link}>
                                Inicio
                            </Link>
                        </li>
                        <li className={asideStyles.nav__item}>
                            <Link to="/historialConsultas" className={asideStyles.nav__link}>
                                Historial de Consultas
                            </Link>
                        </li>
                        <li className={asideStyles.nav__item}>
                            <Link to="/historialCompras" className={asideStyles.nav__link}>
                                Historial de Compras
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>

            <div className={asideStyles.sidebar__footer}>
                <a href="/perfilCliente" className={asideStyles.profile__link}>
                    <div className={asideStyles.user__info}>
                        <div className={asideStyles.user__avatar}>{user?.nombre ? user.nombre[0] : 'U'}</div>
                        <div className={asideStyles.user__details}>
                            <p className={asideStyles.user__name}>Ver Mi Perfil</p>
                            <p className={asideStyles.user__role}>Mis datos personales</p>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    );
}
import asideStyles from "./AsideCliente.module.css";
import { Link } from "react-router-dom";

export default function AsideCliente({ className = "" }) {
    return (
        <div className={`${asideStyles.sidebarInner} ${className}`}>
            <nav className={asideStyles.sidebar__nav}>
                <div className={asideStyles.nav__section}>
                    <h3 className={asideStyles.nav__title}>Navegación</h3>
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
                <a href="/perfil" className={asideStyles.profile__link}>
                    <div className={asideStyles.user__info}>
                        <div className={asideStyles.user__avatar}>U</div>
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
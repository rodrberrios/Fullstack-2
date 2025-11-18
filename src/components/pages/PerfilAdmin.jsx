import React, { useContext } from "react";
import { Link, useLocation } from 'react-router-dom';
import { UserContext } from "../../../context/AuthContext"
import style from './PerfilAdmin.module.css';
import Aside from "../../organisms/Aside";

const PerfilAdmin = () => {
    const { usuario } = useContext(UserContext); // Aqui se accede al usuario desde el contexto

    return(
        <div className={style.container}>
            {/* Sidebar */}
            <Aside></Aside>
            
            {/* Main Content */}
            <main className={style.main}>
                <div className={style.main__header}>
                    <h1 className={style.main__title}>¡Hola {usuario?.nombre}!</h1>
                    <p className={style.main__subtitle}>Bienvenido al panel de control de Level UP Store</p>
                </div>

                
                <div className={style.quick__actions}>
                    <Link to="/admin/orders/new" className={style.action__button}>Nueva Orden</Link>
                    <Link to="/admin/inventory" className={style.action__button}>Gestionar Inventario</Link>
                    <Link to="/admin/reports" className={style.action__button}>Ver Reportes</Link>
                    <Link to="/admin/inventory/new" className={style.action__button}>Agregar Producto</Link>
                </div>

                {/* Dashboard Stats */}
                <div className={style.dashboard}>
                    <div className={style.dashboard__card}>
                        <div className={style.card__header}>
                            <h3 className={style.card__title}>Ventas Hoy</h3>
                            <div className={style.card__icon}>💰</div>
                        </div>
                        <div className={style.card__stats}>$12,458</div>
                        <p className={style.card__content}>+15% respecto al día anterior</p>
                        <div className={style.card__footer}>
                            <Link to="/admin/reports/sales" className={style.card__link}>Ver detalles</Link>
                        </div>
                    </div>

                    <div className={style.dashboard__card}>
                        <div className={style.card__header}>
                            <h3 className={style.card__title}>Órdenes Activas</h3>
                            <div className={style.card__icon}>📦</div>
                        </div>
                        <div className={style.card__stats}>47</div>
                        <p className={style.card__content}>12 pendientes de envío</p>
                        <div className={style.card__footer}>
                            <Link to="/admin/orders" className={style.card__link}>Gestionar órdenes</Link>
                        </div>
                    </div>

                    <div className={style.dashboard__card}>
                        <div className={style.card__header}>
                            <h3 className={style.card__title}>Inventario</h3>
                            <div className={style.card__icon}>📊</div>
                        </div>
                        <div className={style.card__stats}>89%</div>
                        <p className={style.card__content}>15 productos con stock bajo</p>
                        <div className={style.card__footer}>
                            <Link to="/admin/inventory" className={style.card__link}>Revisar stock</Link>
                        </div>
                    </div>

                    <div className={style.dashboard__card}>
                        <div className={style.card__header}>
                            <h3 className={style.card__title}>Clientes Nuevos</h3>
                            <div className={style.card__icon}>👥</div>
                        </div>
                        <div className={style.card__stats}>23</div>
                        <p className={style.card__content}>Este mes</p>
                        <div className={style.card__footer}>
                            <Link to="/admin/customers" className={style.card__link}>Ver clientes</Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PerfilAdmin;
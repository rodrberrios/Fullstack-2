import React, { useContext, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { UserContext } from "../../context/AuthContext"
import { db } from "../../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import style from './PerfilAdmin.module.css';
import Aside from "../organisms/Aside";

const PerfilAdmin = () => {
    const { user } = useContext(UserContext);
    const [stats, setStats] = useState({
        orders: 0,
        products: 0,
        users: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Fetch Orders
                const ordersSnapshot = await getDocs(collection(db, "compras"));
                const ordersCount = ordersSnapshot.size;

                // Fetch Products
                const productsSnapshot = await getDocs(collection(db, "producto"));
                const productsCount = productsSnapshot.size;

                // Fetch Users
                const usersSnapshot = await getDocs(collection(db, "usuarios"));
                const usersCount = usersSnapshot.size;

                setStats({
                    orders: ordersCount,
                    products: productsCount,
                    users: usersCount
                });
            } catch (error) {
                console.error("Error fetching dashboard stats:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className={style.container}>
            <Aside />

            <main className={style.main}>
                <div className={style.header}>
                    <h1 className={style.title}>Resumen General</h1>
                    <p className={style.subtitle}>Bienvenido, {user?.nombre}</p>
                </div>

                {/* Summary Cards Section */}
                <div className={style.summaryGrid}>
                    <div className={`${style.summaryCard} ${style.cardBlue}`}>
                        <div className={style.summaryContent}>
                            <span className={style.summaryLabel}>COMPRAS</span>
                            <h2 className={style.summaryValue}>{loading ? "..." : stats.orders}</h2>
                            <p className={style.summaryTrend}>Total de órdenes registradas</p>
                        </div>
                        <div className={style.summaryIcon}>🛒</div>
                    </div>

                    <div className={`${style.summaryCard} ${style.cardGreen}`}>
                        <div className={style.summaryContent}>
                            <span className={style.summaryLabel}>PRODUCTOS</span>
                            <h2 className={style.summaryValue}>{loading ? "..." : stats.products}</h2>
                            <p className={style.summaryTrend}>Inventario total</p>
                        </div>
                        <div className={style.summaryIcon}>📦</div>
                    </div>

                    <div className={`${style.summaryCard} ${style.cardOrange}`}>
                        <div className={style.summaryContent}>
                            <span className={style.summaryLabel}>USUARIOS</span>
                            <h2 className={style.summaryValue}>{loading ? "..." : stats.users}</h2>
                            <p className={style.summaryTrend}>Usuarios registrados</p>
                        </div>
                        <div className={style.summaryIcon}>👥</div>
                    </div>
                </div>

                {/* Navigation Grid Section */}
                <div className={style.navGrid}>
                    <Link to="/admin" className={style.navCard}>
                        <div className={style.navIcon}>⚡</div>
                        <h3 className={style.navTitle}>Dashboard</h3>
                        <p className={style.navDescription}>Visión general de todas las métricas y estadísticas clave del sistema.</p>
                    </Link>

                    <Link to="/admin/orders" className={style.navCard}>
                        <div className={style.navIcon}>🛒</div>
                        <h3 className={style.navTitle}>Ordenes</h3>
                        <p className={style.navDescription}>Gestión y seguimiento de todas las ordenes de compras realizadas.</p>
                    </Link>

                    <Link to="/admin/inventory" className={style.navCard}>
                        <div className={style.navIcon}>📦</div>
                        <h3 className={style.navTitle}>Productos</h3>
                        <p className={style.navDescription}>Administrar inventario y detalles de los productos disponibles.</p>
                    </Link>

                    <Link to="/admin/categories" className={style.navCard}>
                        <div className={style.navIcon}>🏷️</div>
                        <h3 className={style.navTitle}>Categorías</h3>
                        <p className={style.navDescription}>Organizar productos en categorías para facilitar su navegación.</p>
                    </Link>

                    <Link to="/admin/customers" className={style.navCard}>
                        <div className={style.navIcon}>👥</div>
                        <h3 className={style.navTitle}>Usuarios</h3>
                        <p className={style.navDescription}>Gestionar cuentas de usuarios y permisos del sistema.</p>
                    </Link>

                    <Link to="/admin/reports" className={style.navCard}>
                        <div className={style.navIcon}>📊</div>
                        <h3 className={style.navTitle}>Reportes</h3>
                        <p className={style.navDescription}>Visualizar reportes detallados de ventas y rendimiento.</p>
                    </Link>

                    <Link to="/admin/profile" className={style.navCard}>
                        <div className={style.navIcon}>👤</div>
                        <h3 className={style.navTitle}>Perfil</h3>
                        <p className={style.navDescription}>Configurar tu cuenta y preferencias personales.</p>
                    </Link>

                    <Link to="/" className={style.navCard}>
                        <div className={style.navIcon}>🏪</div>
                        <h3 className={style.navTitle}>Tienda</h3>
                        <p className={style.navDescription}>Ir a la vista principal de la tienda online.</p>
                    </Link>
                </div>
            </main>
        </div>
    );
};

export default PerfilAdmin;
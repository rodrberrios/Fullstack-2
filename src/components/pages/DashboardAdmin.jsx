import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import Aside from '../organisms/Aside';
import style from './DashboardAdmin.module.css';

const DashboardAdmin = () => {
    const [stats, setStats] = useState({
        ordersCount: 0,
        productsCount: 0,
        usersCount: 0,
        totalStock: 0
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
                const totalStock = productsSnapshot.docs.reduce((acc, doc) => acc + (parseInt(doc.data().stock) || 0), 0);

                // Fetch Users
                const usersSnapshot = await getDocs(collection(db, "usuarios"));
                const usersCount = usersSnapshot.size;

                setStats({
                    ordersCount,
                    productsCount,
                    usersCount,
                    totalStock
                });
            } catch (error) {
                console.error("Error fetching dashboard stats:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const navItems = [
        {
            title: "Dashboard",
            path: "/dashboard",
            description: "Visión general de todas las métricas y estadísticas clave del sistema.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7"></rect>
                    <rect x="14" y="3" width="7" height="7"></rect>
                    <rect x="14" y="14" width="7" height="7"></rect>
                    <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
            )
        },
        {
            title: "Ordenes",
            path: "/orders",
            description: "Gestión y seguimiento de todas las órdenes de compras realizadas.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
            )
        },
        {
            title: "Productos",
            path: "/inventory",
            description: "Administrar inventario y detalles de los productos disponibles.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                    <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
            )
        },
        {
            title: "Categorias",
            path: "/categories",
            description: "Organizar productos en categorías para facilitar su navegación.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                    <line x1="7" y1="7" x2="7.01" y2="7"></line>
                </svg>
            )
        },
        {
            title: "Usuarios",
            path: "/customers",
            description: "Gestión de cuentas de usuarios y sus roles dentro del sistema.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
            )
        },
        {
            title: "Reportes",
            path: "/reports",
            description: "Generación de informes detallados sobre las operaciones del sistema.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="20" x2="18" y2="10"></line>
                    <line x1="12" y1="20" x2="12" y2="4"></line>
                    <line x1="6" y1="20" x2="6" y2="14"></line>
                </svg>
            )
        },
        {
            title: "Perfil",
            path: "/perfilAdmin",
            description: "Administración de la información personal y configuración de cuenta.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                </svg>
            )
        },
        {
            title: "Tienda",
            path: "/",
            description: "Visualiza tu tienda en tiempo real, visualiza los reportes de usuarios.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
            )
        }
    ];

    return (
        <div className={style.container}>
            <Aside />
            <main className={style.main}>
                <div className={style.header}>
                    <h1 className={style.title}>Resumen General</h1>
                </div>

                <div className={style.summaryGrid}>
                    <div className={`${style.summaryCard} ${style.cardBlue}`}>
                        <div className={style.cardHeader}>
                            <span className={style.cardLabel}>Compras</span>
                            <div className={style.cardIcon}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="9" cy="21" r="1"></circle>
                                    <circle cx="20" cy="21" r="1"></circle>
                                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                                </svg>
                            </div>
                        </div>
                        <div className={style.cardValue}>
                            {loading ? "..." : stats.ordersCount}
                        </div>
                        <div className={style.cardFooter}>
                            Total de órdenes realizadas
                        </div>
                    </div>

                    <div className={`${style.summaryCard} ${style.cardGreen}`}>
                        <div className={style.cardHeader}>
                            <span className={style.cardLabel}>Productos</span>
                            <div className={style.cardIcon}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                                    <line x1="12" y1="22.08" x2="12" y2="12"></line>
                                </svg>
                            </div>
                        </div>
                        <div className={style.cardValue}>
                            {loading ? "..." : stats.productsCount}
                        </div>
                        <div className={style.cardFooter}>
                            Inventario Actual: {loading ? "..." : stats.totalStock}
                        </div>
                    </div>

                    <div className={`${style.summaryCard} ${style.cardOrange}`}>
                        <div className={style.cardHeader}>
                            <span className={style.cardLabel}>Usuarios</span>
                            <div className={style.cardIcon}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="9" cy="7" r="4"></circle>
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                </svg>
                            </div>
                        </div>
                        <div className={style.cardValue}>
                            {loading ? "..." : stats.usersCount}
                        </div>
                        <div className={style.cardFooter}>
                            Usuarios registrados
                        </div>
                    </div>
                </div>

                <div className={style.navGrid}>
                    {navItems.map((item, index) => (
                        <Link to={item.path} key={index} className={style.navCard}>
                            <div className={style.navIconWrapper}>
                                {item.icon}
                            </div>
                            <h3 className={style.navTitle}>{item.title}</h3>
                            <p className={style.navDescription}>{item.description}</p>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default DashboardAdmin;

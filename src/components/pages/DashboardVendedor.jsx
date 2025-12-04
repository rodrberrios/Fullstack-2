import React, { useState, useEffect } from 'react';
import { db } from "../../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import AsideVendedor from "../organisms/AsideVendedor";
import style from './DashboardVendedor.module.css';

const DashboardVendedor = () => {
    const [stats, setStats] = useState({
        totalSales: 0,
        totalOrders: 0,
        totalProducts: 0,
        averageOrder: 0
    });
    const [recentOrders, setRecentOrders] = useState([]);
    const [salesByDay, setSalesByDay] = useState([]);
    const [ordersByStatus, setOrdersByStatus] = useState({
        pendiente: 0,
        procesando: 0,
        completado: 0,
        cancelado: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        setLoading(true);
        try {
            // Fetch orders
            const ordersSnapshot = await getDocs(collection(db, "compras"));
            const ordersData = ordersSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            // Fetch products
            const productsSnapshot = await getDocs(collection(db, "producto"));
            const productsCount = productsSnapshot.size;

            // Calculate statistics
            const totalSales = ordersData.reduce((sum, order) => sum + (order.total || 0), 0);
            const totalOrders = ordersData.length;
            const averageOrder = totalOrders > 0 ? totalSales / totalOrders : 0;

            // Get recent orders (last 5)
            const sortedOrders = ordersData
                .sort((a, b) => {
                    const dateA = a.fecha?.seconds || 0;
                    const dateB = b.fecha?.seconds || 0;
                    return dateB - dateA;
                })
                .slice(0, 5);

            // Calculate sales by day (last 7 days)
            const last7Days = getLast7Days();
            const salesByDayData = last7Days.map(day => {
                const dayOrders = ordersData.filter(order => {
                    if (!order.fecha?.seconds) return false;
                    const orderDate = new Date(order.fecha.seconds * 1000);
                    return orderDate.toDateString() === day.date.toDateString();
                });
                return {
                    day: day.label,
                    sales: dayOrders.reduce((sum, order) => sum + (order.total || 0), 0)
                };
            });

            // Calculate orders by status
            const statusCounts = {
                pendiente: 0,
                procesando: 0,
                completado: 0,
                cancelado: 0
            };
            ordersData.forEach(order => {
                const status = (order.estado || 'pendiente').toLowerCase().replace(/\s+/g, '_');
                if (statusCounts.hasOwnProperty(status)) {
                    statusCounts[status]++;
                } else {
                    statusCounts.pendiente++;
                }
            });

            setStats({
                totalSales,
                totalOrders,
                totalProducts: productsCount,
                averageOrder
            });
            setRecentOrders(sortedOrders);
            setSalesByDay(salesByDayData);
            setOrdersByStatus(statusCounts);
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
        } finally {
            setLoading(false);
        }
    };

    const getLast7Days = () => {
        const days = [];
        const today = new Date();
        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            days.push({
                date: date,
                label: date.toLocaleDateString('es-CL', { weekday: 'short' })
            });
        }
        return days;
    };

    const getMaxSales = () => {
        return Math.max(...salesByDay.map(d => d.sales), 1);
    };

    const getStatusClass = (status) => {
        const normalizedStatus = status?.toLowerCase().replace(/\s+/g, '_') || 'pendiente';
        return style[`status_${normalizedStatus}`] || style.status_pendiente;
    };

    return (
        <div className={style.container}>
            <AsideVendedor />

            <main className={style.main}>
                <div className={style.header}>
                    <h1 className={style.title}>Dashboard Vendedor</h1>
                    <p className={style.subtitle}>Resumen de tu actividad y estadísticas</p>
                    <button className={style.btnRefresh} onClick={fetchDashboardData}>
                        🔄 Actualizar
                    </button>
                </div>

                {loading ? (
                    <p className={style.loading}>Cargando datos...</p>
                ) : (
                    <>
                        {/* Summary Cards */}
                        <div className={style.summaryGrid}>
                            <div className={`${style.summaryCard} ${style.cardBlue}`}>
                                <div className={style.cardContent}>
                                    <span className={style.cardLabel}>VENTAS TOTALES</span>
                                    <h2 className={style.cardValue}>${stats.totalSales.toLocaleString('es-CL')}</h2>
                                    <p className={style.cardTrend}>Total acumulado</p>
                                </div>
                                <div className={style.cardIcon}>💰</div>
                            </div>

                            <div className={`${style.summaryCard} ${style.cardGreen}`}>
                                <div className={style.cardContent}>
                                    <span className={style.cardLabel}>ÓRDENES</span>
                                    <h2 className={style.cardValue}>{stats.totalOrders}</h2>
                                    <p className={style.cardTrend}>Total de pedidos</p>
                                </div>
                                <div className={style.cardIcon}>📦</div>
                            </div>

                            <div className={`${style.summaryCard} ${style.cardOrange}`}>
                                <div className={style.cardContent}>
                                    <span className={style.cardLabel}>PRODUCTOS</span>
                                    <h2 className={style.cardValue}>{stats.totalProducts}</h2>
                                    <p className={style.cardTrend}>En catálogo</p>
                                </div>
                                <div className={style.cardIcon}>🏷️</div>
                            </div>

                            <div className={`${style.summaryCard} ${style.cardPurple}`}>
                                <div className={style.cardContent}>
                                    <span className={style.cardLabel}>PROMEDIO</span>
                                    <h2 className={style.cardValue}>${Math.round(stats.averageOrder).toLocaleString('es-CL')}</h2>
                                    <p className={style.cardTrend}>Por orden</p>
                                </div>
                                <div className={style.cardIcon}>📊</div>
                            </div>
                        </div>

                        {/* Charts Section */}
                        <div className={style.chartsGrid}>
                            {/* Sales Trend Chart */}
                            <div className={style.chartCard}>
                                <h3 className={style.chartTitle}>📈 Ventas Últimos 7 Días</h3>
                                <div className={style.barChart}>
                                    {salesByDay.map((day, index) => (
                                        <div key={index} className={style.barWrapper}>
                                            <div className={style.barContainer}>
                                                <div
                                                    className={style.bar}
                                                    style={{
                                                        height: `${(day.sales / getMaxSales()) * 100}%`,
                                                        minHeight: day.sales > 0 ? '5%' : '0%'
                                                    }}
                                                    title={`$${day.sales.toLocaleString('es-CL')}`}
                                                >
                                                    <span className={style.barValue}>
                                                        {day.sales > 0 ? `$${(day.sales / 1000).toFixed(0)}k` : ''}
                                                    </span>
                                                </div>
                                            </div>
                                            <span className={style.barLabel}>{day.day}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Order Status Distribution */}
                            <div className={style.chartCard}>
                                <h3 className={style.chartTitle}>📊 Estado de Órdenes</h3>
                                <div className={style.statusChart}>
                                    <div className={style.statusItem}>
                                        <div className={`${style.statusDot} ${style.dotPendiente}`}></div>
                                        <span className={style.statusLabel}>Pendiente</span>
                                        <span className={style.statusCount}>{ordersByStatus.pendiente}</span>
                                    </div>
                                    <div className={style.statusItem}>
                                        <div className={`${style.statusDot} ${style.dotProcesando}`}></div>
                                        <span className={style.statusLabel}>Procesando</span>
                                        <span className={style.statusCount}>{ordersByStatus.procesando}</span>
                                    </div>
                                    <div className={style.statusItem}>
                                        <div className={`${style.statusDot} ${style.dotCompletado}`}></div>
                                        <span className={style.statusLabel}>Completado</span>
                                        <span className={style.statusCount}>{ordersByStatus.completado}</span>
                                    </div>
                                    <div className={style.statusItem}>
                                        <div className={`${style.statusDot} ${style.dotCancelado}`}></div>
                                        <span className={style.statusLabel}>Cancelado</span>
                                        <span className={style.statusCount}>{ordersByStatus.cancelado}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Orders */}
                        <div className={style.recentOrders}>
                            <h3 className={style.sectionTitle}>📋 Órdenes Recientes</h3>
                            {recentOrders.length === 0 ? (
                                <p className={style.noData}>No hay órdenes recientes</p>
                            ) : (
                                <div className={style.ordersList}>
                                    {recentOrders.map(order => (
                                        <div key={order.id} className={style.orderCard}>
                                            <div className={style.orderHeader}>
                                                <span className={style.orderId}>#{order.id.substring(0, 8)}</span>
                                                <span className={`${style.statusBadge} ${getStatusClass(order.estado)}`}>
                                                    {order.estado || 'Pendiente'}
                                                </span>
                                            </div>
                                            <div className={style.orderBody}>
                                                <div className={style.orderInfo}>
                                                    <span className={style.orderLabel}>Cliente:</span>
                                                    <span className={style.orderValue}>{order.usuario || 'N/A'}</span>
                                                </div>
                                                <div className={style.orderInfo}>
                                                    <span className={style.orderLabel}>Total:</span>
                                                    <span className={style.orderValue}>${order.total?.toLocaleString('es-CL')}</span>
                                                </div>
                                                <div className={style.orderInfo}>
                                                    <span className={style.orderLabel}>Fecha:</span>
                                                    <span className={style.orderValue}>
                                                        {order.fecha ? new Date(order.fecha.seconds * 1000).toLocaleDateString('es-CL') : 'N/A'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </>
                )}
            </main>
        </div>
    );
};

export default DashboardVendedor;

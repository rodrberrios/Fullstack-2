import React, { useState, useEffect, useContext } from 'react';
import { db } from "../../config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { UserContext } from "../../context/AuthContext";
import Aside from "../organisms/Aside";
import style from './Reports.module.css';

const Reports = () => {
    const { user } = useContext(UserContext);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [salesData, setSalesData] = useState(null);
    const [productData, setProductData] = useState(null);
    const [loading, setLoading] = useState(false);

    const generateReport = async () => {
        if (!startDate || !endDate) {
            alert("Por favor selecciona ambas fechas");
            return;
        }

        setLoading(true);
        try {
            // Convertir las fechas a objetos Date
            const start = new Date(startDate);
            start.setHours(0, 0, 0, 0);
            const end = new Date(endDate);
            end.setHours(23, 59, 59, 999);

            // Obtener todas las compras
            const querySnapshot = await getDocs(collection(db, "compras"));

            // Filtrar compras por rango de fechas
            const salesInRange = querySnapshot.docs.filter(doc => {
                const data = doc.data();
                if (!data.fecha) return false;

                const saleDate = data.fecha.toDate();
                return saleDate >= start && saleDate <= end;
            });

            // Calcular ventas del periodo
            let totalVentas = 0;
            let ingresoTotal = 0;
            const productSales = {};

            salesInRange.forEach(doc => {
                const data = doc.data();
                totalVentas++;
                ingresoTotal += data.total || 0;

                // Contar productos vendidos
                if (data.items && Array.isArray(data.items)) {
                    data.items.forEach(item => {
                        if (!productSales[item.nombre]) {
                            productSales[item.nombre] = {
                                nombre: item.nombre,
                                cantidad: 0,
                                precio: item.precio || 0
                            };
                        }
                        productSales[item.nombre].cantidad += item.cantidad || 1;
                    });
                }
            });

            // Calcular promedio por venta
            const promedioPorVenta = totalVentas > 0 ? ingresoTotal / totalVentas : 0;

            // Obtener todos los productos del inventario
            const productsSnapshot = await getDocs(collection(db, "producto"));
            const totalProductos = productsSnapshot.size;
            const productosActivos = productsSnapshot.docs.filter(doc => {
                const data = doc.data();
                return data.stock > 0;
            }).length;

            // Calcular stock total
            let stockTotal = 0;
            productsSnapshot.docs.forEach(doc => {
                const data = doc.data();
                stockTotal += data.stock || 0;
            });

            // Productos con bajo stock (menos de 5 unidades)
            const productosConBajoStock = productsSnapshot.docs.filter(doc => {
                const data = doc.data();
                return data.stock > 0 && data.stock < 5;
            }).length;

            setSalesData({
                resumenVentas: totalVentas,
                totalVentas: totalVentas,
                ingresosTotales: ingresoTotal,
                periodo: `${startDate} a ${endDate}`,
                promedioPorVenta: promedioPorVenta
            });

            setProductData({
                inventarioProductos: totalProductos,
                totalProductos: totalProductos,
                productosActivos: productosActivos,
                stockTotal: stockTotal,
                productosConBajoStock: productosConBajoStock,
                topProducts: Object.values(productSales).sort((a, b) => b.cantidad - a.cantidad).slice(0, 5)
            });

        } catch (error) {
            console.error("Error generating report:", error);
            alert("Error al generar el reporte");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={style.container}>
            <Aside />

            <main className={style.main}>
                <div className={style.header}>
                    <h1 className={style.title}>Reportes y Análisis</h1>
                    <p className={style.subtitle}>Genera informes detallados del sistema</p>
                </div>

                <div className={style.reportControls}>
                    <h2 className={style.sectionTitle}>Reportes del Sistema</h2>
                    <div className={style.dateFilters}>
                        <div className={style.dateInput}>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className={style.dateField}
                            />
                        </div>
                        <div className={style.dateInput}>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className={style.dateField}
                            />
                        </div>
                        <button
                            className={style.btnGenerate}
                            onClick={generateReport}
                            disabled={loading}
                        >
                            {loading ? '⏳ Generando...' : 'Generar Reporte'}
                        </button>
                    </div>
                </div>

                {salesData && productData && (
                    <div className={style.reportCards}>
                        {/* Tarjeta de Ventas del Periodo */}
                        <div className={style.reportCard}>
                            <h3 className={style.cardTitle}>Ventas del Periodo</h3>
                            <div className={style.cardContent}>
                                <div className={style.statRow}>
                                    <span className={style.statLabel}>Resumen de Ventas</span>
                                    <span className={style.statValue}>{salesData.resumenVentas}</span>
                                </div>
                                <div className={style.statRow}>
                                    <span className={style.statLabel}>Total ventas:</span>
                                    <span className={style.statValue}>{salesData.totalVentas}</span>
                                </div>
                                <div className={style.statRow}>
                                    <span className={style.statLabel}>Ingresos totales:</span>
                                    <span className={style.statValue}>${salesData.ingresosTotales.toLocaleString('es-CL')}</span>
                                </div>
                                <div className={style.statRow}>
                                    <span className={style.statLabel}>Periodo:</span>
                                    <span className={style.statValue}>{salesData.periodo}</span>
                                </div>
                                <div className={style.statRow}>
                                    <span className={style.statLabel}>Promedio por venta:</span>
                                    <span className={style.statValue}>${salesData.promedioPorVenta.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Tarjeta de Productos Más Vendidos */}
                        <div className={style.reportCard}>
                            <h3 className={style.cardTitle}>Productos Más Vendidos</h3>
                            <div className={style.cardContent}>
                                <div className={style.statRow}>
                                    <span className={style.statLabel}>Inventario y Productos</span>
                                </div>
                                <div className={style.statRow}>
                                    <span className={style.statLabel}>Total productos:</span>
                                    <span className={style.statValue}>{productData.totalProductos}</span>
                                </div>
                                <div className={style.statRow}>
                                    <span className={style.statLabel}>Productos activos:</span>
                                    <span className={style.statValue}>{productData.productosActivos}</span>
                                </div>
                                <div className={style.statRow}>
                                    <span className={style.statLabel}>Stock total:</span>
                                    <span className={style.statValue}>{productData.stockTotal} unidades</span>
                                </div>
                                <div className={style.statRow}>
                                    <span className={style.statLabel}>Productos con bajo stock:</span>
                                    <span className={style.statValue}>{productData.productosConBajoStock}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {!salesData && !productData && !loading && (
                    <div className={style.emptyState}>
                        <p className={style.emptyText}>
                            Selecciona un rango de fechas y presiona "Generar Reporte" para visualizar los datos
                        </p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Reports;

import React, { useState, useEffect } from 'react';
import { db } from "../../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import AsideVendedor from "../organisms/AsideVendedor";
import style from './VendedorOrdenes.module.css';

const VendedorOrdenes = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const querySnapshot = await getDocs(collection(db, "compras"));
            const ordersData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setOrders(ordersData);
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleViewDetails = (order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedOrder(null);
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
                    <h1 className={style.title}>Órdenes de Compra</h1>
                    <p className={style.subtitle}>Visualiza todas las órdenes realizadas en el sistema</p>
                </div>

                <div className={style.tableContainer}>
                    <div className={style.tableHeader}>
                        <h2 className={style.tableTitle}>Lista de Órdenes</h2>
                        <div className={style.headerActions}>
                            <button className={style.btnSecondary} onClick={fetchOrders}>
                                Actualizar
                            </button>
                        </div>
                    </div>

                    {loading ? (
                        <p>Cargando órdenes...</p>
                    ) : orders.length === 0 ? (
                        <p className={style.noData}>No hay órdenes registradas</p>
                    ) : (
                        <table className={style.table}>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Cliente</th>
                                    <th>Email</th>
                                    <th>Total</th>
                                    <th>Estado</th>
                                    <th>Fecha</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order.id}>
                                        <td className={style.idCell}>{order.id.substring(0, 8)}...</td>
                                        <td>{order.usuario || 'N/A'}</td>
                                        <td>{order.email || 'N/A'}</td>
                                        <td className={style.priceCell}>${order.total?.toLocaleString('es-CL')}</td>
                                        <td>
                                            <span className={`${style.statusBadge} ${getStatusClass(order.estado)}`}>
                                                {order.estado || 'Pendiente'}
                                            </span>
                                        </td>
                                        <td>
                                            {order.fecha ? new Date(order.fecha.seconds * 1000).toLocaleDateString('es-CL') : 'N/A'}
                                        </td>
                                        <td className={style.actionButtons}>
                                            <button
                                                className={`${style.btnAction} ${style.btnView}`}
                                                onClick={() => handleViewDetails(order)}
                                                title="Ver Detalles"
                                            >
                                                👁️
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* Details Modal */}
                {isModalOpen && selectedOrder && (
                    <div className={style.modalOverlay}>
                        <div className={style.modalContent}>
                            <div className={style.modalHeader}>
                                <h3 className={style.modalTitle}>Detalles de la Orden</h3>
                                <button className={style.closeButton} onClick={handleCloseModal}>×</button>
                            </div>
                            <div className={style.modalBody}>
                                <div className={style.orderDetails}>
                                    <div className={style.detailRow}>
                                        <strong>ID:</strong>
                                        <span>{selectedOrder.id}</span>
                                    </div>
                                    <div className={style.detailRow}>
                                        <strong>Cliente:</strong>
                                        <span>{selectedOrder.usuario || 'N/A'}</span>
                                    </div>
                                    <div className={style.detailRow}>
                                        <strong>Email:</strong>
                                        <span>{selectedOrder.email || 'N/A'}</span>
                                    </div>
                                    <div className={style.detailRow}>
                                        <strong>Fecha:</strong>
                                        <span>
                                            {selectedOrder.fecha
                                                ? new Date(selectedOrder.fecha.seconds * 1000).toLocaleString('es-CL')
                                                : 'N/A'}
                                        </span>
                                    </div>
                                    <div className={style.detailRow}>
                                        <strong>Estado:</strong>
                                        <span className={`${style.statusBadge} ${getStatusClass(selectedOrder.estado)}`}>
                                            {selectedOrder.estado || 'Pendiente'}
                                        </span>
                                    </div>
                                    <div className={style.detailRow}>
                                        <strong>Total:</strong>
                                        <span className={style.totalAmount}>${selectedOrder.total?.toLocaleString('es-CL')}</span>
                                    </div>
                                </div>

                                {selectedOrder.items && selectedOrder.items.length > 0 && (
                                    <div className={style.productsSection}>
                                        <h4 className={style.sectionTitle}>Productos</h4>
                                        <div className={style.productsList}>
                                            {selectedOrder.items.map((item, index) => (
                                                <div key={index} className={style.productItem}>
                                                    <span className={style.productName}>{item.nombre}</span>
                                                    <span className={style.productQuantity}>x{item.cantidad}</span>
                                                    <span className={style.productPrice}>${item.precio?.toLocaleString('es-CL')}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className={style.modalFooter}>
                                <button className={style.btnClose} onClick={handleCloseModal}>Cerrar</button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default VendedorOrdenes;

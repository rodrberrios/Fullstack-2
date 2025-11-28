import React, { useState, useEffect, useContext } from 'react';
import { db } from "../../config/firebase";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { UserContext } from "../../context/AuthContext";
import Aside from "../organisms/Aside";
import style from './Orders.module.css';

const Orders = () => {
    const { user } = useContext(UserContext);
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [statusFilter, setStatusFilter] = useState('Todos');

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const querySnapshot = await getDocs(collection(db, "compras"));
            const ordersData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setOrders(ordersData);
            setFilteredOrders(ordersData);
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    // Filtrar órdenes cuando cambia el filtro
    useEffect(() => {
        if (statusFilter === 'Todos') {
            setFilteredOrders(orders);
        } else {
            setFilteredOrders(orders.filter(order => order.estado === statusFilter));
        }
    }, [statusFilter, orders]);

    const handleOpenModal = (order) => {
        setSelectedOrder({ ...order });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedOrder(null);
    };

    const handleStatusChange = (e) => {
        setSelectedOrder(prev => ({
            ...prev,
            estado: e.target.value
        }));
    };

    const handleSaveStatus = async () => {
        if (!selectedOrder) return;

        try {
            const orderRef = doc(db, "compras", selectedOrder.id);
            await updateDoc(orderRef, {
                estado: selectedOrder.estado
            });

            // Actualizar estado local
            setOrders(orders.map(order =>
                order.id === selectedOrder.id ? { ...order, estado: selectedOrder.estado } : order
            ));

            alert("Estado actualizado correctamente");
            handleCloseModal();
        } catch (error) {
            console.error("Error updating status:", error);
            alert("Error al actualizar el estado");
        }
    };

    const getStatusClass = (status) => {
        const normalizedStatus = status?.toLowerCase().replace(/\s+/g, '_') || 'pendiente';
        return style[`status_${normalizedStatus}`] || style.status_pendiente;
    };

    // Obtener lista única de estados para el filtro
    const uniqueStatuses = ['Todos', ...new Set(orders.map(o => o.estado).filter(Boolean))];

    return (
        <div className={style.container}>
            <Aside />

            <main className={style.main}>
                <div className={style.header}>
                    <h1 className={style.title}>Gestión de Órdenes</h1>
                    <p className={style.subtitle}>Administra y realiza seguimiento de todas las órdenes de compra</p>
                </div>

                <div className={style.tableContainer}>
                    <div className={style.tableHeader}>
                        <h2 className={style.tableTitle}>Lista de Órdenes</h2>
                        <div className={style.headerActions}>
                            <div className={style.filterGroup}>
                                <label className={style.filterLabel}>Filtrar por estado:</label>
                                <select
                                    className={style.filterSelect}
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                >
                                    {uniqueStatuses.map(status => (
                                        <option key={status} value={status}>{status}</option>
                                    ))}
                                </select>
                            </div>
                            <button className={style.btnSecondary} onClick={fetchOrders}>
                                🔄 Actualizar
                            </button>
                        </div>
                    </div>

                    {loading ? (
                        <p>Cargando órdenes...</p>
                    ) : filteredOrders.length === 0 ? (
                        <p className={style.noData}>No hay órdenes con el estado seleccionado</p>
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
                                {filteredOrders.map((order) => (
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
                                                className={`${style.btnAction} ${style.btnEdit}`}
                                                onClick={() => handleOpenModal(order)}
                                                title="Ver y Editar"
                                            >
                                                ✏️
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* Modal de detalles y edición de estado */}
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
                                        <strong>Total:</strong>
                                        <span className={style.totalAmount}>${selectedOrder.total?.toLocaleString('es-CL')}</span>
                                    </div>
                                </div>

                                <div className={style.formGroup}>
                                    <label className={style.label}>Estado de la Orden</label>
                                    <select
                                        className={style.input}
                                        value={selectedOrder.estado || 'Pendiente'}
                                        onChange={handleStatusChange}
                                    >
                                        <option value="Pendiente">Pendiente</option>
                                        <option value="En Preparacion">En Preparación</option>
                                        <option value="En Camino">En Camino</option>
                                        <option value="Entregado">Entregado</option>
                                        <option value="Cancelado">Cancelado</option>
                                    </select>
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
                                <button className={style.btnCancel} onClick={handleCloseModal}>Cerrar</button>
                                <button className={style.btnSave} onClick={handleSaveStatus}>Guardar Estado</button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Orders;

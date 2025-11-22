import React, { useState, useEffect, useContext } from 'react';
import { db } from "../../config/firebase";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { UserContext } from "../../context/AuthContext";
import Aside from "../organisms/Aside";
import style from './Orders.module.css';

const Orders = () => {
    const { user } = useContext(UserContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [statusUpdate, setStatusUpdate] = useState("");

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

    const handleStatusUpdate = async (orderId) => {
        if (!statusUpdate) return;

        try {
            const orderRef = doc(db, "compras", orderId);
            await updateDoc(orderRef, {
                estado: statusUpdate
            });

            // Update local state
            setOrders(orders.map(order =>
                order.id === orderId ? { ...order, estado: statusUpdate } : order
            ));
            setEditingId(null);
            setStatusUpdate("");
        } catch (error) {
            console.error("Error updating status:", error);
            alert("Error al actualizar el estado");
        }
    };

    const handleShowDetails = (order) => {
        const productsList = order.items ? order.items.map(item =>
            `- ${item.nombre} x${item.cantidad} ($${item.precio})`
        ).join('\n') : 'Sin detalles de productos';

        alert(`
            Detalles de la Orden: ${order.id}
            --------------------------------
            Cliente: ${order.usuario || 'N/A'}
            Email: ${order.email || 'N/A'}
            Fecha: ${order.fecha ? new Date(order.fecha.seconds * 1000).toLocaleDateString() : 'N/A'}
            Total: $${order.total}
            Estado: ${order.estado}
            
            Productos:
            ${productsList}
        `);
    };

    const getStatusClass = (status) => {
        const normalizedStatus = status?.toLowerCase().replace(/\s+/g, '_') || 'pendiente';
        return style[`status_${normalizedStatus}`] || style.status_pendiente;
    };

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
                        <button className={style.refreshButton} onClick={fetchOrders}>
                            🔄 Actualizar
                        </button>
                    </div>

                    {loading ? (
                        <p>Cargando órdenes...</p>
                    ) : (
                        <table className={style.table}>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Cliente</th>
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
                                        <td>${order.total?.toLocaleString('es-CL')}</td>
                                        <td>
                                            {editingId === order.id ? (
                                                <select
                                                    className={style.statusSelect}
                                                    value={statusUpdate || order.estado}
                                                    onChange={(e) => setStatusUpdate(e.target.value)}
                                                    onBlur={() => handleStatusUpdate(order.id)}
                                                    autoFocus
                                                >
                                                    <option value="Pendiente">Pendiente</option>
                                                    <option value="En Preparacion">En Preparación</option>
                                                    <option value="En Camino">En Camino</option>
                                                    <option value="Entregado">Entregado</option>
                                                    <option value="Cancelado">Cancelado</option>
                                                </select>
                                            ) : (
                                                <span className={`${style.statusBadge} ${getStatusClass(order.estado)}`}>
                                                    {order.estado || 'Pendiente'}
                                                </span>
                                            )}
                                        </td>
                                        <td>
                                            {order.fecha ? new Date(order.fecha.seconds * 1000).toLocaleDateString() : 'N/A'}
                                        </td>
                                        <td className={style.actionButtons}>
                                            <button
                                                className={`${style.btnAction} ${style.btnEdit}`}
                                                onClick={() => {
                                                    setEditingId(order.id);
                                                    setStatusUpdate(order.estado);
                                                }}
                                                title="Editar Estado"
                                            >
                                                ✏️
                                            </button>
                                            <button
                                                className={`${style.btnAction} ${style.btnDetails}`}
                                                onClick={() => handleShowDetails(order)}
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
            </main>
        </div>
    );
};

export default Orders;

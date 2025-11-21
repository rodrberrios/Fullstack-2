import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/AuthContext";
import { db } from "../../config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import AsideCliente from "../organisms/AsideCliente";
import style from "./HistorialCompras.module.css";

const HistorialCompras = () => {
    const { user } = useContext(UserContext);
    const [compras, setCompras] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCompras = async () => {
            if (!user?.correo) return;

            try {
                // Note: Firestore query on nested fields requires an index or manual filtering if complex
                // For now, we query by cliente.correo
                const q = query(
                    collection(db, "compras"),
                    where("cliente.correo", "==", user.correo)
                );

                const querySnapshot = await getDocs(q);
                const comprasData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                // Sort by date manually
                comprasData.sort((a, b) => b.fecha?.seconds - a.fecha?.seconds);

                setCompras(comprasData);
            } catch (error) {
                console.error("Error fetching compras:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCompras();
    }, [user]);

    const formatDate = (timestamp) => {
        if (!timestamp) return "Fecha desconocida";
        return new Date(timestamp.seconds * 1000).toLocaleDateString("es-CL", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        });
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('es-CL', {
            style: 'currency',
            currency: 'CLP'
        }).format(amount);
    };

    return (
        <div className={style.container}>
            <aside>
                <AsideCliente />
            </aside>

            <main className={style.mainContent}>
                <div className={style.header}>
                    <h1 className={style.title}>Historial de Compras</h1>
                    <p className={style.subtitle}>Revisa el detalle de tus pedidos realizados.</p>
                </div>

                <div className={style.tableContainer}>
                    {loading ? (
                        <div className={style.emptyState}>Cargando compras...</div>
                    ) : compras.length === 0 ? (
                        <div className={style.emptyState}>
                            <div className={style.emptyIcon}>🛍️</div>
                            <p>No has realizado ninguna compra aún.</p>
                        </div>
                    ) : (
                        <table className={style.table}>
                            <thead>
                                <tr>
                                    <th>Orden</th>
                                    <th>Fecha</th>
                                    <th>Total</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {compras.map((compra) => (
                                    <tr key={compra.id}>
                                        <td>#{compra.numeroOrden}</td>
                                        <td>{formatDate(compra.fecha)}</td>
                                        <td>{formatCurrency(compra.total)}</td>
                                        <td>
                                            <span className={`${style.statusBadge} ${compra.estado === 'completada' ? style.statusCompletada :
                                                    compra.estado === 'fallida' ? style.statusFallida :
                                                        style.statusPendiente
                                                }`}>
                                                {compra.estado || 'Pendiente'}
                                            </span>
                                        </td>
                                        <td>
                                            <button className={style.btnDetails}>
                                                Ver Detalles
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

export default HistorialCompras;
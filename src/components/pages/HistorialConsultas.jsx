import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/AuthContext";
import { db } from "../../config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import AsideCliente from "../organisms/AsideCliente";
import style from "./HistorialConsultas.module.css";

const HistorialConsultas = () => {
    const { user } = useContext(UserContext);
    const [consultas, setConsultas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchConsultas = async () => {
            if (!user?.correo) return;

            try {
                const q = query(
                    collection(db, "consultas"),
                    where("email", "==", user.correo)
                );

                const querySnapshot = await getDocs(q);
                const consultasData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                // Sort by date manually since we might not have a composite index yet
                consultasData.sort((a, b) => b.fecha?.seconds - a.fecha?.seconds);

                setConsultas(consultasData);
            } catch (error) {
                console.error("Error fetching consultas:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchConsultas();
    }, [user]);

    const formatDate = (timestamp) => {
        if (!timestamp) return "Fecha desconocida";
        return new Date(timestamp.seconds * 1000).toLocaleDateString("es-CL", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    return (
        <div className={style.container}>
            <aside>
                <AsideCliente />
            </aside>

            <main className={style.mainContent}>
                <div className={style.header}>
                    <h1 className={style.title}>Historial de Consultas</h1>
                    <p className={style.subtitle}>Revisa el estado de tus mensajes enviados.</p>
                </div>

                <div className={style.tableContainer}>
                    {loading ? (
                        <div className={style.emptyState}>Cargando consultas...</div>
                    ) : consultas.length === 0 ? (
                        <div className={style.emptyState}>
                            <div className={style.emptyIcon}>📬</div>
                            <p>No has realizado ninguna consulta aún.</p>
                        </div>
                    ) : (
                        <table className={style.table}>
                            <thead>
                                <tr>
                                    <th>Fecha</th>
                                    <th>Asunto</th>
                                    <th>Mensaje</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {consultas.map((consulta) => (
                                    <tr key={consulta.id}>
                                        <td>{formatDate(consulta.fecha)}</td>
                                        <td>{consulta.asunto}</td>
                                        <td>{consulta.mensaje}</td>
                                        <td>
                                            <span className={`${style.statusBadge} ${consulta.estado === 'resuelto' ? style.statusResuelto : style.statusPendiente}`}>
                                                {consulta.estado || 'Pendiente'}
                                            </span>
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

export default HistorialConsultas;
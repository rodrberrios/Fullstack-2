// PerfilCliente.jsx
import React from "react";
import { useAuth } from "../../context/AuthContext";
import perfilStyles from "./PerfilCliente.module.css";
import AsideCliente from "../organisms/AsideCliente";

export default function PerfilCliente() {
    const { usuario } = useAuth();

    return (
        <div className={perfilStyles.container}>
            <aside className={perfilStyles.sidebar}>
                <AsideCliente />
            </aside>

            <main className={perfilStyles.mainContent}>
                <div className={perfilStyles.welcomeContainer}>
                    <h1 className={perfilStyles.welcomeTitle}>
                        ¡Bienvenido, {usuario?.nombre || usuario?.email}!
                    </h1>
                </div>
            </main>
        </div>
    );
}
// PerfilCliente.jsx
import React, { useContext } from "react";
import { UserContext } from "../../context/AuthContext";
import style from "./PerfilCliente.module.css";
import AsideCliente from "../organisms/AsideCliente";

export default function PerfilCliente() {
    const { usuario } = useContext(UserContext);

    return (
        <div className={style.container}>
            <aside className={style.sidebar}>
                <AsideCliente />
            </aside>

            <main className={style.mainContent}>
                <div className={style.welcomeContainer}>
                    <h1 className={style.welcomeTitle}>
                        ¡Bienvenido, {usuario?.nombre || usuario?.email}!
                    </h1>
                </div>
            </main>
        </div>
    );
}
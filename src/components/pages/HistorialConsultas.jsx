import React from "react";
import AsideCliente from "../organisms/AsideCliente";
import style from "./HistorialConsultas.module.css";

const HistorialConsultas = () => {
    return (
        <div className={style.container}>
            <AsideCliente />
        </div>
    );
};
export default HistorialConsultas;
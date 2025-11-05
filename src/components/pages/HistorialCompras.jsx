import React from "react";
import AsideCliente from "../organisms/AsideCliente";
import style from "./HistorialCompras.module.css";

const HistorialCompras = () => {
    return (
        <div className={style.container}>
            <AsideCliente />
        </div>
    );
};
export default HistorialCompras;
import React from "react";
import Header from "../organisms/Header";
import Footer from "../organisms/Footer";
import style from "./Nosotros.module.css";



const Nosotros = () => {
    return (
        <div className={style.container}>
            <Header></Header>
            <main className={style.nosotrosContainer}>
                <section className={style.section}></section>
                <section className={style.section}></section>
                <section className={style.section}></section>
            </main>
            <Footer></Footer>
        </div>
    );
}

export default Nosotros;
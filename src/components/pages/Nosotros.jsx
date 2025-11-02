import React from "react";
import Header from "../organisms/Header";
import Footer from "../organisms/Footer";
import style from "./Nosotros.module.css";



const Nosotros = () => {
    return (
        <div className={style.container}>
            <Header />
            <main className={style.mainContainer}>
                <section className={style.sectionContainer}>
                    <div className={style.logoContainer}>
                        <img src="" alt="Logo Tienda Level Up Gamer" />
                    </div>
                </section>
                <section className={style.sectionContainer}>
                    <div className={style.nosotrosContainer}>
                        <h2>Quienes Somos?</h2>
                        <p></p>
                    </div>
                </section>
                <section className={style.sectionContainer}>
                    <div className={style.nosotrosContainer}>
                        <h2>Nuestra Mision</h2>
                        <p></p>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default Nosotros;
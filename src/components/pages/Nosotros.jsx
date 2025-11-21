import React from "react";
import Header from "../organisms/Header";
import Footer from "../organisms/Footer";
import style from "./Nosotros.module.css";

const Nosotros = () => {
    return (
        <div className={style.pageContainer}>
            <Header />

            <main className={style.mainContent}>
                <div className={style.heroSection}>
                    <h1 className={style.pageTitle}>Sobre Nosotros</h1>
                    <p className={style.pageSubtitle}>Conoce más sobre la historia y visión de Level Up Gamer</p>
                </div>

                <div className={style.contentGrid}>
                    <section className={style.infoCard}>
                        <div className={style.cardHeader}>
                            <span className={style.icon}>🎮</span>
                            <h2 className={style.cardTitle}>¿Quiénes Somos?</h2>
                        </div>
                        <div className={style.cardBody}>
                            <p className={style.text}>
                                Level-Up Gamer es una tienda online chilena especializada en productos para gamers, creada hace dos años como respuesta a la creciente demanda durante la pandemia. Ofrecemos una amplia variedad de artículos, desde consolas, accesorios y computadores gamers, hasta sillas, ropa personalizada y servicio técnico.
                                Aunque no contamos con tienda física, realizamos despachos a todo Chile, entregando una experiencia cómoda y accesible para todos los entusiastas de los videojuegos.
                            </p>
                        </div>
                    </section>

                    <section className={style.infoCard}>
                        <div className={style.cardHeader}>
                            <span className={style.icon}>🚀</span>
                            <h2 className={style.cardTitle}>Nuestra Misión</h2>
                        </div>
                        <div className={style.cardBody}>
                            <p className={style.text}>
                                Proporcionar productos de alta calidad para gamers en todo el país, ofreciendo una experiencia de compra única y personalizada, con un fuerte enfoque en la satisfacción del cliente y en el crecimiento de la comunidad gamer.
                            </p>
                        </div>
                    </section>
                </div>

                <section className={style.logoSection}>
                    <div className={style.logoPlaceholder}>
                        <span className={style.logoText}>LEVEL UP GAMER</span>
                    </div>
                    {/* <img src="/path/to/logo.png" alt="Level Up Gamer Logo" className={style.logo} /> */}
                </section>
            </main>

            <Footer />
        </div>
    );
}

export default Nosotros;
import React from "react";
import Header from "../organisms/Header";
import Footer from "../organisms/Footer";
import style from "./Blog.module.css";

const Blog = () => {
    const news = [
        {
            id: 1,
            title: "El futuro de los RPGs de mundo abierto",
            date: "21 Nov, 2025",
            excerpt: "Exploramos las nuevas tecnologías que están revolucionando la inmersión y la narrativa en los juegos de rol de próxima generación.",
            image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop",
            link: "#"
        },
        {
            id: 2,
            title: "Torneo Mundial de E-Sports 2025",
            date: "18 Nov, 2025",
            excerpt: "Los mejores equipos del mundo se preparan para el evento más grande del año. Conoce a los favoritos y las sorpresas.",
            image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop",
            link: "#"
        },
        {
            id: 3,
            title: "Reseña: Cyber-Odyssey 2077",
            date: "15 Nov, 2025",
            excerpt: "Analizamos a fondo la esperada secuela. ¿Cumple con las expectativas o se queda corta ante el hype?",
            image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=2065&auto=format&fit=crop",
            link: "#"
        }
    ];

    return (
        <div className={style.pageContainer}>
            <Header />

            <main className={style.mainContent}>
                <div className={style.headerSection}>
                    <h1 className={style.pageTitle}>Blog de Noticias</h1>
                    <p className={style.pageSubtitle}>Las últimas novedades del mundo gaming</p>
                </div>

                <div className={style.blogGrid}>
                    {news.map((item) => (
                        <article key={item.id} className={style.blogCard}>
                            <div className={style.imageContainer}>
                                <img src={item.image} alt={item.title} className={style.blogImage} />
                                <div className={style.overlay}></div>
                            </div>
                            <div className={style.cardContent}>
                                <span className={style.date}>{item.date}</span>
                                <h2 className={style.cardTitle}>{item.title}</h2>
                                <p className={style.excerpt}>{item.excerpt}</p>
                                <a href={item.link} className={style.readMore}>
                                    Leer más <span className={style.arrow}>→</span>
                                </a>
                            </div>
                        </article>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default Blog;
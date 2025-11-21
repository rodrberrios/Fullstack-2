import React, { useEffect, useState } from "react";
import Header from "../organisms/Header";
import Footer from "../organisms/Footer";
import style from "./Home.module.css";
import { obtenerProductos } from '../../services/productService';
import ProductCard from "../molecules/ProductCard";

const Home = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargar = async () => {
      try {
        const lista = await obtenerProductos();
        setProductos(Array.isArray(lista) ? lista : []);
      } catch (e) {
        console.error('Error cargando productos para Home:', e);
      } finally {
        setCargando(false);
      }
    };
    cargar();
  }, []);

  return (
    <div className={style.pageContainer}>
      <Header />

      <main className={style.mainContent}>
        <section className={style.heroSection}>
          <div className={style.heroContent}>
            <h1 className={style.heroTitle}>Level Up Gamer</h1>
            <p className={style.heroSubtitle}>
              Level-Up Gamer es una tienda online chilena especializada en productos para gamers.
            </p>
            <a href="/catalogo" className={style.heroButton}>Explorar Tienda</a>
          </div>
          <div className={style.heroImageContainer}>
            <img src="/assets/img/icon.png" alt="Level UP Store Logo" className={style.heroImage} />
          </div>
        </section>

        <section className={style.featuredSection}>
          <div className={style.sectionHeader}>
            <h2 className={style.sectionTitle}>Productos Destacados</h2>
            <a className={style.viewAllLink} href="/catalogo">
              Ver todo el catálogo <span className={style.arrow}>→</span>
            </a>
          </div>

          {cargando ? (
            <div className={style.loadingContainer}>
              <div className={style.spinner}></div>
              <p>Cargando productos...</p>
            </div>
          ) : (
            <div className={style.productsGrid}>
              {(productos || []).slice(0, 8).map((p) => (
                <ProductCard key={p.id} producto={p} />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
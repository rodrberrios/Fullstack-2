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
    <div className={style.container}>  {/* Cambia "container" por style.container */}
      <Header />
      <main className={style['main-container']}>
        <section className={style['title-container']}>
          <div>
            <h2>Level Up Gamer</h2>
            <p>Somos Una tienda que vende perifericos de las mas alta calidad no apto para FLACOUS!.</p>
          </div>
          <div>
            <img src="/assets/img/icon.png" alt="Level UP Store Logo" /> 
          </div>
        </section>

        <section className={style['main-products']}>
          <div className={style['products-header']}>
            <h3>Productos destacados</h3>
            <a className={style['ver-todos-link']} href="/catalogo">Ver catálogo</a>
          </div>
          {cargando ? (
            <div className={style['loading']}>Cargando...</div>
          ) : (
            <div className={style['products-grid']}>
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
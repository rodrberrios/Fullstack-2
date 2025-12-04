import React, { useEffect, useState } from "react";
import Header from "../organisms/Header";
import Footer from "../organisms/Footer";
import style from "./Home.module.css";
import { obtenerProductos } from '../../services/productService';
import ProductCard from "../molecules/ProductCard";
import { db } from '../../config/firebase';
import { doc, updateDoc } from 'firebase/firestore';

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

  // Agregar al carrito con gestión de stock (Lógica compartida con Catalogo)
  const agregarAlCarrito = async (producto) => {
    // Verificar si hay stock disponible
    if (producto.stock === undefined || producto.stock <= 0) {
      alert('No hay stock disponible para este producto');
      return;
    }

    const carritoActual = JSON.parse(localStorage.getItem('carrito')) || [];
    const productoExistente = carritoActual.find(item => item.id === producto.id);
    let nuevoCarrito;

    // Verificar si hay suficiente stock para agregar otra unidad
    if (productoExistente) {
      const cantidadEnCarrito = productoExistente.cantidad || 1;
      if (producto.stock <= cantidadEnCarrito) {
        alert('No hay más stock disponible de este producto');
        return;
      }
      nuevoCarrito = carritoActual.map(item =>
        item.id === producto.id
          ? { ...item, cantidad: (item.cantidad || 1) + 1 }
          : item
      );
    } else {
      nuevoCarrito = [...carritoActual, { ...producto, cantidad: 1 }];
    }

    try {
      // Intentar actualizar stock en Firebase (puede fallar si no hay permisos, pero actualizamos local)
      const productoRef = doc(db, 'producto', producto.id);
      await updateDoc(productoRef, {
        stock: producto.stock - 1
      });

      // Actualizar estado local de productos
      setProductos(prevProductos =>
        prevProductos.map(p =>
          p.id === producto.id ? { ...p, stock: p.stock - 1 } : p
        )
      );

      // Guardar en carrito
      localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));

      // Disparar evento para actualizar header si es necesario (opcional)
      window.dispatchEvent(new Event('storage'));

      alert(`"${producto.nombre}" agregado al carrito`);
    } catch (error) {
      console.error('Error al actualizar stock:', error);
      // Si falla firebase (ej. permisos), igual guardamos en local storage para el usuario
      localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
      alert(`"${producto.nombre}" agregado al carrito (Stock local actualizado)`);
    }
  };

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
            <a href="/nosotros" className={style.heroButton}>Acerca de nosotros</a>
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
                <ProductCard key={p.id} producto={p} onAgregar={agregarAlCarrito} />
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
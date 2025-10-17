const Home = () => {
  return (
    <div className="container">
      {/* NAVBAR */}
      <nav className="nav__bar">
        <img className="nav__logo" src="./assets/img/icon.png" alt="Level UP Store Logo" />
        <h2 className="nav__title">
          <a href="/">Level UP Store</a>
        </h2>
        <div className="nav__container">
          <ul className="nav__menu">
            <li><a href="/">Inicio</a></li>
            <li><a href="/productos">Productos</a></li>
            <li><a href="/nosotros">Nosotros</a></li>
            <li><a href="/blog">Blog</a></li>
            <li><a href="/contacto">Contacto</a></li>
          </ul>
        </div>
        <div className="carrito__container">
          <a className="carrito" href="/carrito">Carrito</a>
        </div>
      </nav>

      {/* HEADER */}
      <header>
        <div className="header__container">
          <a className="header__link" href="/login">Inicio Sesión</a>
          <a className="header__link" href="/register">Registrarse</a>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main>
        <section className="main__section">
          <div>
            <h1 className="main__title">LEVEL UP GAMER</h1>
            <p>Tu tienda de videojuegos favorita</p>
          </div>
          <img className="main__img" src="./assets/img/icon.png" alt="Level UP Gamer" />
        </section>

        <section className="productos__section">
          <div>Descubre nuestros productos exclusivos</div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer__container">
          <h5 className="footer__title">Level UP Gamer</h5>
          <div className="footer__links">
            <ul>
              <li><a href="#">Instagram</a></li>
              <li><a href="#">Twitter</a></li>
              <li><a href="#">Facebook</a></li>
            </ul>
          </div>
        </div>

        <div>
          <input 
            type="text" 
            id="correo" 
            name="correo" 
            placeholder="Ejemplo: Francisco@duocuc.cl" 
          />
          <a href="/register">
            <button type="button">Suscribirse</button>
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Home;
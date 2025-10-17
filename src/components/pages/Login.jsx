import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { verificarCredenciales } from '../../services/authService';
import { validarCorreo } from '../../utils/register';

const Login = () => {
  const [formData, setFormData] = useState({
    correo: '',
    clave: ''
  });
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Limpiar mensaje de error cuando el usuario escriba
    if (mensaje) setMensaje('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');
    setCargando(true);

    const { correo, clave } = formData;

    // Validaciones básicas
    if (!correo.trim() || !clave.trim()) {
      setMensaje('Todos los campos son obligatorios');
      setCargando(false);
      return;
    }

    if (!validarCorreo(correo)) {
      setMensaje('El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com');
      setCargando(false);
      return;
    }

    try {
      // Verificar credenciales en Firebase
      const usuario = await verificarCredenciales(correo.trim(), clave.trim());
      
      setMensaje(`¡Bienvenido de vuelta ${usuario.nombre}!`);

      // Redirección según tipo de usuario
      setTimeout(() => {
        const destino = usuario.correo.toLowerCase() === "admin@duoc.cl" 
          ? `/admin?nombre=${encodeURIComponent(usuario.nombre)}`
          : `/cliente?nombre=${encodeURIComponent(usuario.nombre)}`;
        
        navigate(destino);
      }, 1500);

    } catch (error) {
      setMensaje(error.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="container">
      {/* NAVBAR (igual que Register) */}
      <nav className="nav__bar">
        <img className="nav__logo" src="./assets/img/icon.png" alt="Level UP Store" />
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

      {/* FORMULARIO DE LOGIN */}
      <main className="main__register">
        <section className="form__container section__register">
          <form onSubmit={handleSubmit} className="form__register">
            <div className="div__register">
              <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Iniciar Sesión</h2>
              
              {/* CORREO */}
              <label htmlFor="correo">Correo</label>
              <input 
                type="email" 
                id="correo" 
                name="correo" 
                value={formData.correo}
                onChange={handleChange}
                placeholder="tu-correo@duoc.cl" 
                required 
              />

              {/* CONTRASEÑA */}
              <label htmlFor="clave">Contraseña</label>
              <input 
                type="password"
                id="clave" 
                name="clave" 
                value={formData.clave}
                onChange={handleChange}
                placeholder="Tu contraseña" 
                required 
              />

              {/* BOTÓN DE LOGIN */}
              <button 
                type="submit" 
                disabled={cargando}
                style={{ opacity: cargando ? 0.6 : 1 }}
              >
                {cargando ? 'VERIFICANDO...' : 'INICIAR SESIÓN'}
              </button>

              {/* ENLACE A REGISTRO */}
              <div style={{ textAlign: 'center', marginTop: '15px' }}>
                <span>¿No tienes cuenta? </span>
                <Link to="/register" style={{ color: '#007bff' }}>Regístrate aquí</Link>
              </div>

              {/* MENSAJES */}
              {mensaje && (
                <div style={{
                  marginTop: '15px', 
                  padding: '10px',
                  borderRadius: '5px',
                  color: mensaje.includes('Bienvenido') ? 'green' : 'red',
                  backgroundColor: mensaje.includes('Bienvenido') ? '#d4edda' : '#f8d7da',
                  textAlign: 'center'
                }}>
                  {mensaje}
                </div>
              )}
            </div>
          </form>
        </section>
      </main>
      
      {/* FOOTER (igual que Register) */}
      <footer className="footer">
        <div className="footer__container">
          <h4>Level UP Gamer</h4>
          <div className="footer__links">
            <ul>
              <li><a href="#">Instagram</a></li>
              <li><a href="#">Twitter</a></li>
              <li><a href="#">Facebook</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Login;
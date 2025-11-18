
import { useNavigate, Link, useHistory } from 'react-router-dom';
import { useContext, useEffect } from "react";
import { verificarCredenciales } from '../../services/authService';
import { validarCorreo } from '../../utils/register';
import { useAuth } from '../../context/AuthContext';
import Nav from "../molecules/Nav";
import Footer from '../organisms/Footer';
import style from './Login.module.css';

const Login = () => {
  const [formData, setFormData] = useState({
    correo: '',
    clave: ''
  });
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (mensaje) setMensaje('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');
    setCargando(true);

    const { correo, clave } = formData;

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
      const usuario = await verificarCredenciales(correo.trim(), clave.trim());
      login(usuario);
      
      setMensaje(`¡Bienvenido de vuelta ${usuario.nombre}!`);

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
    <div className={style.container}>
      {/* NAVBAR */}
      
      <Nav></Nav>

      {/* FORMULARIO DE LOGIN */}
      <main className={style.main__register}>
        <section className={`${style.form__container} ${style.section__register}`}>
          <form onSubmit={handleSubmit} className={style.form__register}>
            <div className={style.div__register}>
              <h2>Iniciar Sesión</h2>
              
              {/* CORREO */}
              <div className={style.form__group}>
                <label htmlFor="correo" className={style.form__label}>Correo Electrónico</label>
                <input 
                  type="email" 
                  id="correo" 
                  name="correo" 
                  value={formData.correo}
                  onChange={handleChange}
                  placeholder="tu-correo@duoc.cl" 
                  required 
                  className={style.form__input}
                />
              </div>

              {/* CONTRASEÑA */}
              <div className={style.form__group}>
                <label htmlFor="clave" className={style.form__label}>Contraseña</label>
                <input 
                  type="password"
                  id="clave" 
                  name="clave" 
                  value={formData.clave}
                  onChange={handleChange}
                  placeholder="Ingresa tu contraseña" 
                  required 
                  className={style.form__input}
                />
              </div>

              {/* BOTÓN DE LOGIN */}
              <button 
                type="submit" 
                disabled={cargando}
                className={style.submit__button}
              >
                {cargando ? 'VERIFICANDO...' : 'INICIAR SESIÓN'}
              </button>

              {/* ENLACE A REGISTRO */}
              <div className={style.register__link}>
                <span>¿No tienes cuenta? </span>
                <Link to="/register">Regístrate aquí</Link>
              </div>

              {/* MENSAJES */}
              {mensaje && (
                <div className={`${style.message__alert} ${
                  mensaje.includes('Bienvenido') ? style.message__success : style.message__error
                }`}>
                  {mensaje}
                </div>
              )}
            </div>
          </form>
        </section>
      </main>
      
      <Footer></Footer>
    </div>
  );
};

export default Login;
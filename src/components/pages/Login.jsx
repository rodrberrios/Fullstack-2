
import { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { validarCorreo } from '../../utils/register';
import { UserContext } from '../../context/AuthContext';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import Nav from "../molecules/Nav";
import Footer from '../organisms/Footer';
import style from './Login.module.css';

const Login = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    correo: '',
    clave: ''
  });
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    // Solo redirigir si el usuario ya está autenticado en el contexto
    if (user) {
      navigate(user.rol === "admin" ? "/perfilAdmin" : "/perfilCliente");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Limpiar mensaje cuando el usuario empiece a escribir
    if (mensaje) {
      setMensaje('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    setMensaje('');

    // Validación de correo
    if (!validarCorreo(formData.correo.trim())) {
      setMensaje("El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com.");
      setCargando(false);
      return;
    }

    try {
      // Buscar usuario en Firestore
      const usuariosRef = collection(db, "usuarios");
      const q = query(
        usuariosRef,
        where("correo", "==", formData.correo.trim().toLowerCase()),
        where("clave", "==", formData.clave)
      );

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Usuario encontrado
        const usuarioDoc = querySnapshot.docs[0];
        const datosUsuario = usuarioDoc.data();

        // Verificar si la cuenta está activa
        if (datosUsuario.activo === false) {
          setMensaje("Tu cuenta ha sido desactivada. Contacta al administrador.");
          setCargando(false);
          return;
        }

        const usuarioData = {
          id: usuarioDoc.id,
          ...datosUsuario,
          rol: datosUsuario.rol || "cliente"
        };

        // Guardar en localStorage
        localStorage.setItem("usuario", JSON.stringify(usuarioData));

        // Actualizar contexto
        setUser(usuarioData);

        setMensaje(`Bienvenido ${usuarioData.nombre}!`);

        // Verificar si hay una ruta de retorno guardada
        const redirectPath = localStorage.getItem('redirectAfterLogin');

        // Redirección después de 1 segundo
        setTimeout(() => {
          if (redirectPath) {
            localStorage.removeItem('redirectAfterLogin');
            navigate(redirectPath);
          } else {
            navigate(usuarioData.rol === "admin" ? "/perfilAdmin" : "/perfilCliente");
          }
        }, 1000);
      } else {
        setMensaje("Correo o contraseña incorrectos.");
      }
    } catch (error) {
      console.error('Error al iniciar sesión: ', error);
      setMensaje('Error al iniciar sesión. Por favor, intenta nuevamente.');
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
                <div className={`${style.message__alert} ${mensaje.includes('Bienvenido') ? style.message__success : style.message__error
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
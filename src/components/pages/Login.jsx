
import { useNavigate, Link } from 'react-router-dom';
import { useContext, useEffect } from "react";
import { validarCorreo } from '../../utils/register';
import { UserContext } from '../../context/AuthContext';
import Nav from "../molecules/Nav";
import Footer from '../organisms/Footer';
import style from './Login.module.css';

const Login = () => {
  const { setUser } = useContext(UserContext);
  const history = userHistory();

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if(usuario) {
      setUser(usuario); // se actualiza el contexto
      // Se redirige dependiendo el rol
      history.push(usuario.rol === "admin" ? "/perfilAdmin" : "perfilCliente");
    }
  }, [setUser, history]); // Solo se ejecuta una vez al montar el componente

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
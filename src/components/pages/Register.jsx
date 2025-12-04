import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../services/firestoreService';
import { validarFormularioCompleto, validarCorreo } from '../../utils/register';
import Header from '../organisms/Header';
import Footer from '../organisms/Footer';
import style from './Register.module.css'; // Importar los estilos

const Register = () => {
  const [formData, setFormData] = useState({
    run: '',
    nombre: '',
    correo: '',
    clave: '',
    fecha: ''
  });
  const [mensaje, setMensaje] = useState('');
  const [errores, setErrores] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errores[e.target.name]) {
      setErrores({
        ...errores,
        [e.target.name]: ''
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Limpiar mensajes anteriores
    setMensaje('');
    setErrores({});

    // 1. Validación de Correo
    if (!validarCorreo(formData.correo.trim())) {
      setMensaje("El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com.");
      return;
    }

    // 2. Validación completa del formulario
    const validacion = validarFormularioCompleto(formData);

    if (!validacion.esValido) {
      setErrores(validacion.errores);
      const primerError = Object.values(validacion.errores)[0];
      setMensaje(primerError);
      return;
    }

    // Si la validación fue exitosa
    try {
      // Guardar en Firebase
      await createUser(formData);

      setMensaje(`Bienvenido ${formData.nombre.trim()}!`);

      // Redirección después de 1.5 segundos
      setTimeout(() => {
        // Redirigir a login para que el usuario inicie sesión
        navigate('/login');
      }, 1500);

    } catch (error) {
      setMensaje('Error al registrar usuario: ' + error.message);
    }
  };

  return (
    <div className={style.container}>
      <Header />

      {/* FORMULARIO */}
      <main className={style.main__register}>
        <section className={`${style.form__container} ${style.section__register}`}>
          <form onSubmit={handleSubmit} className={style.form__register}>
            <div className={style.div__register}>
              <h2>Registro</h2>

              {/* RUN */}
              <div className={style.form__group}>
                <label htmlFor="run" className={style.form__label}>RUN</label>
                <input
                  type="text"
                  id="run"
                  name="run"
                  value={formData.run}
                  onChange={handleChange}
                  placeholder="123456789"
                  required
                  className={style.form__input}
                />
                {errores.run && <span className={style.error__message}>{errores.run}</span>}
              </div>

              {/* NOMBRE COMPLETO */}
              <div className={style.form__group}>
                <label htmlFor="nombre" className={style.form__label}>Nombre</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Francisco"
                  required
                  className={style.form__input}
                />
                {errores.nombre && <span className={style.error__message}>{errores.nombre}</span>}
              </div>

              {/* CORREO */}
              <div className={style.form__group}>
                <label htmlFor="correo" className={style.form__label}>Correo</label>
                <input
                  type="email"
                  id="correo"
                  name="correo"
                  value={formData.correo}
                  onChange={handleChange}
                  placeholder="Francisco@duocuc.cl"
                  required
                  className={style.form__input}
                />
                {errores.correo && <span className={style.error__message}>{errores.correo}</span>}
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
                  placeholder="Entre 6 y 10 caracteres"
                  minLength="6"
                  maxLength="10"
                  required
                  className={style.form__input}
                />
                {errores.clave && <span className={style.error__message}>{errores.clave}</span>}
              </div>

              {/* FECHA NACIMIENTO */}
              <div className={style.form__group}>
                <label htmlFor="fecha" className={style.form__label}>Fecha de nacimiento</label>
                <input
                  className={style.fecha}
                  type="date"
                  id="fecha"
                  name="fecha"
                  value={formData.fecha}
                  onChange={handleChange}
                  required
                />
                {errores.fecha && <span className={style.error__message}>{errores.fecha}</span>}
              </div>

              {/* BOTON DE REGISTRO */}
              <button type="submit" className={style.submit__button}>REGISTRARSE</button>

              <div className={style.login__link}>
                <span>¿Ya tienes cuenta? </span>
                <a href="/login">Iniciar sesión</a>
              </div>

              {/* MENSAJES GENERALES */}
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

      <Footer />
    </div>
  );
};

export default Register;
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../services/firestoreService';
import {  validarFormularioCompleto,  validarCorreo } from '../../utils/register';




//----------------------------------VALIDACIONES----------------------------------------------
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
        const destino = formData.correo.toLowerCase() === "admin@duoc.cl" 
          ? `/admin?nombre=${encodeURIComponent(formData.nombre.trim())}`
          : `/cliente?nombre=${encodeURIComponent(formData.nombre.trim())}`;
        
        navigate(destino);
      }, 1500);

    } catch (error) {
      setMensaje('Error al registrar usuario: ' + error.message);
    }
  };

  //----------------------------------VALIDACIONES----------------------------------------------

  return (
    <div className="container">
      {/* NAVBAR (igual que antes) */}
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

      {/* FORMULARIO */}
      <main className="main__register">
        <section className="form__container section__register">
          <form onSubmit={handleSubmit} className="form__register">
            <div className="div__register">
              {/* RUN */}
              <label htmlFor="run">RUN</label>
              <input 
                type="text" 
                id="run" 
                name="run" 
                value={formData.run}
                onChange={handleChange}
                placeholder="123456789" 
                required 
              />
              {errores.run && <span style={{color: 'red', fontSize: '12px'}}>{errores.run}</span>}

              {/* NOMBRE COMPLETO */}
              <label htmlFor="nombre">Nombre</label>
              <input 
                type="text" 
                id="nombre" 
                name="nombre" 
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Francisco" 
                required 
              />
              {errores.nombre && <span style={{color: 'red', fontSize: '12px'}}>{errores.nombre}</span>}

              {/* CORREO */}
              <label htmlFor="correo">Correo</label>
              <input 
                type="email" 
                id="correo" 
                name="correo" 
                value={formData.correo}
                onChange={handleChange}
                placeholder="Francisco@duocuc.cl" 
                required 
              />
              {errores.correo && <span style={{color: 'red', fontSize: '12px'}}>{errores.correo}</span>}

              {/* CONTRASEÑA */}
              <label htmlFor="clave">Contraseña</label>
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
              />
              {errores.clave && <span style={{color: 'red', fontSize: '12px'}}>{errores.clave}</span>}

              {/* FECHA NACIMIENTO */}
              <label htmlFor="fecha">Fecha de nacimiento</label>
              <input 
                className="fecha" 
                type="date" 
                id="fecha" 
                name="fecha" 
                value={formData.fecha}
                onChange={handleChange}
                required 
              />
              {errores.fecha && <span style={{color: 'red', fontSize: '12px'}}>{errores.fecha}</span>}

              {/* BOTON DE REGISTRO */}
              <button type="submit">REGISTRARSE</button>
              <a href="/login">Iniciar sesión</a>

              {/* MENSAJES GENERALES */}
              {mensaje && (
                <div id="mensaje" style={{
                  marginTop: '10px', 
                  color: mensaje.includes('Bienvenido') ? 'green' : 'red'
                }}>
                  {mensaje}
                </div>
              )}
            </div>
          </form>
        </section>
      </main>
      
      {/* FOOTER (igual que antes) */}
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

export default Register;
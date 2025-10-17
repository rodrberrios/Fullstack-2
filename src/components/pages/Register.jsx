import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../services/firestoreService';

const Register = () => {
  const [formData, setFormData] = useState({
    run: '',
    nombre: '',
    correo: '',
    fecha: ''
  });
  const [mensaje, setMensaje] = useState('');
  const [errorFecha, setErrorFecha] = useState('');
  const navigate = useNavigate();

  // TUS MISMAS FUNCIONES DE VALIDACIÓN
  const validarCorreo = (correo) => {
    const regex = /^[\w.+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;
    return regex.test(correo);
  };

  const validarRun = (run) => {
    const regex = /^\d{7,8}[0-9K]$/i;
    return regex.test(run);
  };

  const validarFecha = (fecha) => {
    const hoy = new Date();
    const fechaNacimiento = new Date(fecha);
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const mes = hoy.getMonth() - fechaNacimiento.getMonth();

    if(mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())){
      edad--;
    }
    return edad >= 18;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let run = formData.run.trim();
    let nombre = formData.nombre.trim();
    let correo = formData.correo.trim();
    let fecha = formData.fecha;
    
    let mensajeTemp = "";
    setErrorFecha("");

    // 1. Validación de Correo (Prioridad Alta)
    if(!validarCorreo(correo)){
      setMensaje("El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com.");
      return;
    } 

    // 2. Resto de validaciones
    if(!validarRun(run)){
      mensajeTemp = "El RUN es inválido.";
    } else if(nombre === ""){
      mensajeTemp = "El nombre es obligatorio.";
    } else if(!validarFecha(fecha)){
      mensajeTemp = "Debes ser mayor de 18 años para registrarte.";
      setErrorFecha("Debes ser mayor de 18 años");
    } else {
      mensajeTemp = "Formulario enviado correctamente";
    }

    setMensaje(mensajeTemp);

    // Si la validación fue exitosa
    if (mensajeTemp === "Formulario enviado correctamente") {
      try {
        // Guardar en Firebase
        await createUser({ run, nombre, correo, fecha });
        
        setMensaje(`Bienvenido ${nombre}!`);

        // Redirección después de 1.5 segundos
        setTimeout(() => {
          const destino = correo.toLowerCase() === "admin@duoc.cl" 
            ? `/admin?nombre=${encodeURIComponent(nombre)}`
            : `/cliente?nombre=${encodeURIComponent(nombre)}`;
          
          navigate(destino);
        }, 1500);

      } catch (error) {
        setMensaje('Error al registrar usuario: ' + error.message);
      }
    }
  };

  return (
    <div className="container">
      {/* NAVBAR IDÉNTICO AL ORIGINAL */}
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

      {/* FORMULARIO IDÉNTICO AL ORIGINAL */}
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
                placeholder="run" 
                required 
              />

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
              {errorFecha && (
                <span style={{color: 'red', fontSize: '14px'}}>{errorFecha}</span>
              )}

              {/* BOTON DE REGISTRO */}
              <button type="submit">REGISTRARSE</button>
              <a href="/login">Iniciar sesión</a>

              {/* MENSAJES */}
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
      
      {/* FOOTER IDÉNTICO AL ORIGINAL */}
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
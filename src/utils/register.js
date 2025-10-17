// Validaciones para el formulario de registro

export const validarCorreo = (correo) => {
    const regex = /^[\w.+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;
    return regex.test(correo);
  };
  
  export const validarRun = (run) => {
    const regex = /^\d{7,8}[0-9K]$/i;
    return regex.test(run);
  };
  
  export const validarFecha = (fecha) => {
    const hoy = new Date();
    const fechaNacimiento = new Date(fecha);
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const mes = hoy.getMonth() - fechaNacimiento.getMonth();
  
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
      edad--;
    }
    return edad >= 18;
  };
  
  export const validarClave = (clave) => {
    return clave.length >= 6 && clave.length <= 10;
  };
  
  // Función principal que valida todos los campos
  export const validarFormularioCompleto = (formData) => {
    const { run, nombre, correo, clave, fecha } = formData;
    const errores = {};
  
    if (!validarRun(run.trim())) {
      errores.run = "El RUN es inválido.";
    }
  
    if (nombre.trim() === "") {
      errores.nombre = "El nombre es obligatorio.";
    }
  
    if (!validarCorreo(correo.trim())) {
      errores.correo = "El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com.";
    }
  
    if (!validarClave(clave.trim())) {
      errores.clave = "La contraseña debe tener entre 6 y 10 caracteres.";
    }
  
    if (!validarFecha(fecha)) {
      errores.fecha = "Debes ser mayor de 18 años para registrarte.";
    }
  
    return {
      esValido: Object.keys(errores).length === 0,
      errores
    };
  };
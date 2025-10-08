


/* VALIDACIONES DE LA PROFE */
function validarCorreo(correo) {
    const regex = /^[\w.+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i; // Acepta dominios duoc.cl, profesor.duoc.cl y gmail.com
    return regex.test(correo);// Retorna true si el correo es válido, false si no lo es
}

function validarRun(run) {
    const regex  = /^\d{7,8}[0-9K]$/i; //usamos regex para validar el formato del run
    return regex.test(run);
}

function validarFecha(fecha){
    const hoy = new Date();
    const fechaNacimiento = new Date(fecha);

    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const mes = hoy.getMonth() - fechaNacimiento.getMonth();

    if(mes<0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())){
        edad --;
    }
    return edad >=18;
}


document.getElementById("formUsuario").addEventListener("submit", function(e){
    e.preventDefault(); // Evita que la página se recargue
    
    let run = document.getElementById("run").value.trim();
    let nombre = document.getElementById("nombre").value.trim();
    let correo = document.getElementById("correo").value.trim();
    let fecha = document.getElementById("fecha").value; // Obtener el valor de la fecha
    let mensaje = "";
    
    const correoInput = document.getElementById("correo");
    const fechaLabel = document.getElementById("fecha_label"); // Para mostrar el error de fecha
    
    // 1. Limpiar mensajes previos
    correoInput.setCustomValidity("");
    fechaLabel.innerText = ""; // Limpiar mensaje de fecha

    // 2. Validación de Correo (Prioridad Alta - usa error nativo)
    if(!validarCorreo(correo)){
        correoInput.setCustomValidity("El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com.");
        correoInput.reportValidity(); 
        return;
    } 

    
    if(!validarRun(run)){
        mensaje = "El RUN es inválido.";
    }else if(nombre === ""){
        mensaje = "El nombre es obligatorio.";
    }else if(!validarFecha(fecha)){ // Llamamos a la función de validación de edad
        mensaje = "Debes ser mayor de 18 años para registrarte.";
        fechaLabel.innerText = "Debes ser mayor de 18 años";
        fechaLabel.style.color = "red";
    }    else {
        mensaje = "Formulario enviado correctamente";
    }

    
    document.getElementById("mensaje").innerText = mensaje;

    // Si la validación fue exitosa, proceder a la redirección
    if (mensaje === "Formulario enviado correctamente") {
        let nombreUsuario = nombre;
        const destino = correo.toLowerCase() === "admin@duoc.cl" ? 
                             `assets/page/perfilAdmin.html?nombre=${encodeURIComponent(nombreUsuario)}` :
                             `assets/page/perfilCliente.html?nombre=${encodeURIComponent(nombreUsuario)}`;
        
        document.getElementById("mensaje").innerText = `Bienvenido ${nombreUsuario}!`; // Usar innerText para actualizar el mensaje antes de redirigir

        setTimeout(() => {
            window.location.href = destino;
        }, 1500);
    }
});
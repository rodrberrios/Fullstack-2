export function validarCorreo(correo) {
    const regex = /^[\w.+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i; // Acepta dominios duoc.cl, profesor.duoc.cl y gmail.com
    return regex.test(correo);// Retorna true si el correo es válido, false si no lo es
}

export function validarRun(run) {
    const regex  = /^\d{7,8}[0-9K]$/i; //usamos regex para validar el formato del run
    return regex.test(run);
}

export function validarFecha(fecha){
    const hoy = new Date();
    const fechaNacimiento = new Date(fecha);

    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const mes = hoy.getMonth() - fechaNacimiento.getMonth();

    if(mes<0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())){
        edad --;
    }
    return edad >=18;
}
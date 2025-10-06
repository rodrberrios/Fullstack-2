

function Registrarse(){
    validarEmail();
    validarClave();
    mismaClave();
    validarNombre();
    validarFecha();
    if( validarEmail() && validarClave() && mismaClave() && validarNombre() && validarFecha()){
        return true;
    }else{
        return false;
    }

}

function iniciarSesion(){
    validarUser();
    validarClave();
    validarEmail();

    if(validarEmail() && validarClave() && validarUser()){
        return true;
    }else{
        return false;
    }
}

function validarEmail(){ 
    const correo = document.getElementById("correo");

    if(correo.value.trim() === ""){
        correo.placeholder = "Este campo es obligatorio";
        return false;
    }else{
        correo.placeholder = "Francisco@duocuc.cl"; 
        return true;
        
    }
}

function validarClave(){
    const clave = document.getElementById("clave");

    if(clave.value.trim() === ""){
        clave.placeholder = "CAMPO-OBLIGATORIO";
        return false;
    }else{
        clave.placeholder = "contraseña";
        return true;

    }
}

function validarUser(){
    const correo = document.getElementById("correo");
    const clave = document.getElementById("clave");


    if(correo.value === "admin@duoc.cl" && clave.value === "admin"){
        correo.placeholder = "admin@duoc.cl";
        clave.placeholder = "admin clave"
        return true;

    }else if(correo.value === "cliente@duoc.cl" && clave.value === "cliente"){
        correo.placeholder = "cliente@duoc.cl";
        clave.placeholder = "clave cliente"
        return true;

    }else{
        return false
    }
}

function mismaClave(){
    const clave = document.getElementById("clave");
    const clave2 = document.getElementById("clave2");
    
    if(clave.value === clave2.value){
        return true;
    }else{
        clave2.value = "";
        clave2.placeholder = "Contraseñas no coinciden"
    }
}

function validarNombre(){
    const nombre = document.getElementById("nombre");

    if(nombre.value.trim()===""){
        nombre.placeholder="Este campo es obligatorio";
        return false;

    }else{
        return true;
    }

}

function validarFecha(){
    const fecha = document.getElementById("fecha");
    const fecha_label = document.getElementById("fecha_label");

    if(fecha.value.trim()===""){
            fecha_label.innerText = "Ingrese una fecha"
            fecha_label.style.color = "red"
            return false;
    }else{
        fecha_label.innerText = ""
    }
}
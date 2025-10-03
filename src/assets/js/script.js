
function iniciarSesion(){
    validarEmail();
    validarClave()

}



function validarEmail(){
    
    const correo = document.getElementById("correo").value;

    if(correo.trim() === ""){
        correo.placeholder = "Este campo es obligatorio";
        correo.style.color = "red";
        return false;
    }else{
        correo.placeholder = "Francisco@duocuc.cl"; 
        correo.style.color = "black";  
        return true;
    }


}


function validarEmail(){
    const correo = document.getElementById("correo");

    if(correo.value.trim() === ""){
        correo.placeholder = "CAMPO OBLIGATORIO";
        return false;
    }else{
        correo.placeholder = "Francisco@duocuc.cl";
        return true;
    }

    
}

function validarClave(){
    const clave = document.getElementById("clave");

    if(clave.value.trim() === ""){
        clave.placeholder = "CAMPO OBLIGATORIO";
        return false;
    }else{
        clave.placeholder = "contraseña";
        return true;
    }

    
}


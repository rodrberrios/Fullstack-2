import React, { useState } from "react";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import { validarCorreo, validarRun, validarFecha } from "../../utils/Script";
import { addUser } from "../../services/firestoreService";
import { useHistory } from "react-router-dom";

const UserForm = () =>{
    const [form, setForm] = useState({ run:"", nombre:"", correo:"", clave:"", fecha:""});
    const [msg, setMsg] = useState("");
    const history = useHistory();

    const handleChange = e => setForm({ ...form, [e.target.id]: e.target.value});

    const handleSubmit = async e => {
        e.preventDefault();
        const { run, nombre, correo, clave, fecha} = form;
        if (!validarRun(run)) return setMsg("RUN incorrecto");
        if (!nombre) return setMsg("Nombre es vacio");
        if (!validarCorreo(correo)) return setMsg("Correo Incorrecto");
        if (!validarFecha(fecha)) return setMsg("debe ser mayor de edad");

        await addUser(form);
        setMsg("Formulario se envio correctamente");
        setTimeout(()=>  {
            history.push(correo ==="admin@duoc.cl" ? "/perfil-admin?nombre="+nombre : "/perfil-cliente?nombre="+nombre);
        }, 1000);
    };

    return(
        <form onSubmit={handleSubmit}>
            <Input id="run" label="RUN" value={form.run} onChange={handleChange} required />
            <Input id="nombre" label="Nombre" value={form.nombre} onChange={handleChange} required />
            <Input id="correo" label="Correo" type="email" value={form.correo} onChange={handleChange} required />
            <Input id="clave" label="Clave" type="password" value={form.clave} onChange={handleChange} required />
            <Input id="fecha" label="Fecha de Nacimiento" type="date" value={form.fecha} onChange={handleChange} required />
            <Button type="submit">Enviar</Button>
            <p style={{color: "crimson"}}>{msg}</p>
        </form>
    );
};

export default UserForm;

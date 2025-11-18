import React, { useState } from "react";
import Footer from "../organisms/Footer";
import Header from "../organisms/Header";

const Contacto = () => {
    const [formData, setFormData] = useState({
        nombre: "",
        email: "",
        asunto: "",
        mensaje: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Datos del formulario:", formData);
        alert("Formulario enviado (consola para ver los datos)");
    };

    return (
        <div>
            <Header></Header>
            
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="nombre">Nombre:</label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="asunto">Asunto:</label>
                    <input
                        type="text"
                        id="asunto"
                        name="asunto"
                        value={formData.asunto}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="mensaje">Mensaje:</label>
                    <textarea
                        id="mensaje"
                        name="mensaje"
                        value={formData.mensaje}
                        onChange={handleChange}
                        rows="5"
                        required
                    />
                </div>

                <button type="submit">Enviar</button>
            </form>

            <Footer />
        </div>
    );
}

export default Contacto;
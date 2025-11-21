import React, { useState } from "react";
import { db } from "../../config/firebase";
import { collection, addDoc } from "firebase/firestore";
import Footer from "../organisms/Footer";
import Header from "../organisms/Header";
import style from "./Contacto.module.css";

const Contacto = () => {
    const [formData, setFormData] = useState({
        nombre: "",
        email: "",
        asunto: "",
        mensaje: ""
    });
    const [enviando, setEnviando] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEnviando(true);

        try {
            await addDoc(collection(db, "consultas"), {
                ...formData,
                fecha: new Date(),
                estado: "pendiente"
            });

            alert("Mensaje enviado con éxito. Te responderemos pronto.");
            setFormData({
                nombre: "",
                email: "",
                asunto: "",
                mensaje: ""
            });
        } catch (error) {
            console.error("Error al enviar mensaje:", error);
            alert("Hubo un error al enviar el mensaje. Intenta nuevamente.");
        } finally {
            setEnviando(false);
        }
    };

    return (
        <div className={style.pageContainer}>
            <Header />

            <main className={style.mainContent}>
                <div className={style.formContainer}>
                    <h1 className={style.title}>Contáctanos</h1>
                    <p className={style.subtitle}>Estamos aquí para ayudarte. Envíanos un mensaje.</p>

                    <form onSubmit={handleSubmit} className={style.form}>
                        <div className={style.formGroup}>
                            <label htmlFor="nombre" className={style.label}>Nombre</label>
                            <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                className={style.input}
                                value={formData.nombre}
                                onChange={handleChange}
                                placeholder="Tu nombre completo"
                                required
                            />
                        </div>

                        <div className={style.formGroup}>
                            <label htmlFor="email" className={style.label}>Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className={style.input}
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="tu@email.com"
                                required
                            />
                        </div>

                        <div className={style.formGroup}>
                            <label htmlFor="asunto" className={style.label}>Asunto</label>
                            <input
                                type="text"
                                id="asunto"
                                name="asunto"
                                className={style.input}
                                value={formData.asunto}
                                onChange={handleChange}
                                placeholder="¿En qué podemos ayudarte?"
                                required
                            />
                        </div>

                        <div className={style.formGroup}>
                            <label htmlFor="mensaje" className={style.label}>Mensaje</label>
                            <textarea
                                id="mensaje"
                                name="mensaje"
                                className={style.textarea}
                                value={formData.mensaje}
                                onChange={handleChange}
                                rows="5"
                                placeholder="Escribe tu mensaje aquí..."
                                required
                            />
                        </div>

                        <button type="submit" className={style.submitButton} disabled={enviando}>
                            {enviando ? "Enviando..." : "Enviar Mensaje"}
                        </button>
                    </form>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default Contacto;
import React, { useState, useEffect, useContext } from 'react';
import { db } from "../../config/firebase";
import { collection, doc, updateDoc, getDocs, query, where } from "firebase/firestore";
import { UserContext } from "../../context/AuthContext";
import AsideVendedor from "../organisms/AsideVendedor";
import style from './PerfilVendedor.module.css';

const PerfilVendedor = () => {
    const { user, setUser } = useContext(UserContext);
    const [userData, setUserData] = useState({
        nombre: '',
        correo: '',
        telefono: '',
        direccion: '',
        rut: '',
        rol: ''
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchUserData();
    }, [user]);

    const fetchUserData = async () => {
        if (!user || !user.correo) return;

        setLoading(true);
        try {
            const q = query(collection(db, "usuarios"), where("correo", "==", user.correo));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const doc = querySnapshot.docs[0];
                const data = doc.data();
                setUserData({
                    id: doc.id,
                    nombre: data.nombre || '',
                    correo: data.correo || '',
                    telefono: data.telefono || '',
                    direccion: data.direccion || '',
                    rut: data.rut || data.run || '',
                    rol: data.rol || ''
                });
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSaveChanges = async () => {
        if (!userData.nombre) {
            alert("El nombre es obligatorio");
            return;
        }

        setSaving(true);
        try {
            const userRef = doc(db, "usuarios", userData.id);
            await updateDoc(userRef, {
                nombre: userData.nombre,
                telefono: userData.telefono,
                direccion: userData.direccion
            });

            // Actualizar el contexto del usuario
            setUser(prev => ({
                ...prev,
                nombre: userData.nombre
            }));

            // Actualizar localStorage
            const storedUser = JSON.parse(localStorage.getItem('usuario') || '{}');
            storedUser.nombre = userData.nombre;
            localStorage.setItem('usuario', JSON.stringify(storedUser));

            alert("Perfil actualizado correctamente");
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Error al actualizar el perfil");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className={style.container}>
            <AsideVendedor />

            <main className={style.main}>
                <div className={style.header}>
                    <h1 className={style.title}>Mi Perfil</h1>
                    <p className={style.subtitle}>Administra tu información personal</p>
                </div>

                <div className={style.profileContainer}>
                    {loading ? (
                        <p>Cargando datos...</p>
                    ) : (
                        <>
                            <div className={style.profileCard}>
                                <h2 className={style.cardTitle}>Información Personal</h2>
                                <div className={style.formGrid}>
                                    <div className={style.formGroup}>
                                        <label className={style.label}>Nombre *</label>
                                        <input
                                            type="text"
                                            name="nombre"
                                            className={style.input}
                                            value={userData.nombre}
                                            onChange={handleInputChange}
                                            placeholder="Tu nombre completo"
                                        />
                                        <p className={style.helperText}>Puedes modificar tu nombre</p>
                                    </div>

                                    <div className={style.formGroup}>
                                        <label className={style.label}>Email</label>
                                        <input
                                            type="email"
                                            className={`${style.input} ${style.inputDisabled}`}
                                            value={userData.correo}
                                            disabled
                                        />
                                        <p className={style.helperText}>El email no puede ser modificado</p>
                                    </div>

                                    <div className={style.formGroup}>
                                        <label className={style.label}>Teléfono</label>
                                        <input
                                            type="text"
                                            name="telefono"
                                            className={style.input}
                                            value={userData.telefono}
                                            onChange={handleInputChange}
                                            placeholder="+56 9 1234 5678"
                                        />
                                    </div>

                                    <div className={style.formGroup}>
                                        <label className={style.label}>RUN/RUT</label>
                                        <input
                                            type="text"
                                            className={`${style.input} ${style.inputDisabled}`}
                                            value={userData.rut}
                                            disabled
                                        />
                                        <p className={style.helperText}>El RUT no puede ser modificado</p>
                                    </div>

                                    <div className={style.formGroupFull}>
                                        <label className={style.label}>Dirección</label>
                                        <input
                                            type="text"
                                            name="direccion"
                                            className={style.input}
                                            value={userData.direccion}
                                            onChange={handleInputChange}
                                            placeholder="Calle Principal 123, Comuna, Ciudad"
                                        />
                                    </div>

                                    <div className={style.formGroup}>
                                        <label className={style.label}>Rol</label>
                                        <input
                                            type="text"
                                            className={`${style.input} ${style.inputDisabled}`}
                                            value={userData.rol === 'vendedor' ? 'Vendedor' : userData.rol}
                                            disabled
                                        />
                                        <p className={style.helperText}>El rol es asignado por el administrador</p>
                                    </div>
                                </div>

                                <div className={style.actions}>
                                    <button
                                        className={style.btnSave}
                                        onClick={handleSaveChanges}
                                        disabled={saving}
                                    >
                                        {saving ? '💾 Guardando...' : 'Guardar Cambios'}
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </main>
        </div>
    );
};

export default PerfilVendedor;

import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from "../../context/AuthContext";
import { db } from "../../config/firebase";
import { collection, doc, updateDoc, getDocs, query, where } from "firebase/firestore";
import Aside from '../organisms/Aside';
import style from './PerfilAdmin.module.css';

const PerfilAdmin = () => {
    const { user, setUser } = useContext(UserContext);
    const [userData, setUserData] = useState({
        id: '',
        nombre: '',
        correo: '',
        telefono: '',
        rut: ''
    });
    const [passwordData, setPasswordData] = useState({
        claveActual: '',
        claveNueva: '',
        claveConfirmar: ''
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
                const docSnap = querySnapshot.docs[0];
                const data = docSnap.data();
                setUserData({
                    id: docSnap.id,
                    nombre: data.nombre || '',
                    correo: data.correo || '',
                    telefono: data.telefono || '',
                    rut: data.rut || data.run || ''
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

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSaveChanges = async () => {
        if (!userData.nombre) {
            alert("El nombre es obligatorio");
            return;
        }

        // Validar contraseña si se está intentando cambiar
        if (passwordData.claveActual || passwordData.claveNueva || passwordData.claveConfirmar) {
            if (!passwordData.claveActual || !passwordData.claveNueva || !passwordData.claveConfirmar) {
                alert("Debes completar todos los campos de contraseña");
                return;
            }

            if (passwordData.claveNueva !== passwordData.claveConfirmar) {
                alert("Las contraseñas nuevas no coinciden");
                return;
            }

            if (passwordData.claveNueva.length < 6 || passwordData.claveNueva.length > 10) {
                alert("La contraseña debe tener entre 6 y 10 caracteres");
                return;
            }

            try {
                const q = query(collection(db, "usuarios"), where("correo", "==", user.correo));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const currentData = querySnapshot.docs[0].data();
                    if (currentData.clave !== passwordData.claveActual) {
                        alert("La contraseña actual es incorrecta");
                        return;
                    }
                }
            } catch (error) {
                console.error("Error verifying password:", error);
                alert("Error al verificar la contraseña");
                return;
            }
        }

        setSaving(true);
        try {
            const userRef = doc(db, "usuarios", userData.id);
            const updateData = {
                nombre: userData.nombre,
                telefono: userData.telefono
            };

            if (passwordData.claveNueva) {
                updateData.clave = passwordData.claveNueva;
            }

            await updateDoc(userRef, updateData);

            setUser(prev => ({
                ...prev,
                nombre: userData.nombre
            }));

            const storedUser = JSON.parse(localStorage.getItem('usuario') || '{}');
            storedUser.nombre = userData.nombre;
            localStorage.setItem('usuario', JSON.stringify(storedUser));

            setPasswordData({
                claveActual: '',
                claveNueva: '',
                claveConfirmar: ''
            });

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
            <Aside />

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
                                    </div>

                                    <div className={style.formGroup}>
                                        <label className={style.label}>Email</label>
                                        <input
                                            type="email"
                                            className={`${style.input} ${style.inputDisabled}`}
                                            value={userData.correo}
                                            disabled
                                        />
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
                                    </div>
                                </div>

                                <div className={style.passwordSection}>
                                    <h3 className={style.sectionTitle}>Cambiar Contraseña</h3>
                                    <div className={style.formGrid}>
                                        <div className={style.formGroup}>
                                            <label className={style.label}>Contraseña Actual</label>
                                            <input
                                                type="password"
                                                name="claveActual"
                                                className={style.input}
                                                value={passwordData.claveActual}
                                                onChange={handlePasswordChange}
                                                placeholder="Ingresa tu contraseña actual"
                                            />
                                        </div>

                                        <div className={style.formGroup}>
                                            <label className={style.label}>Nueva Contraseña</label>
                                            <input
                                                type="password"
                                                name="claveNueva"
                                                className={style.input}
                                                value={passwordData.claveNueva}
                                                onChange={handlePasswordChange}
                                                placeholder="6-10 caracteres"
                                                minLength="6"
                                                maxLength="10"
                                            />
                                        </div>

                                        <div className={style.formGroup}>
                                            <label className={style.label}>Confirmar Nueva Contraseña</label>
                                            <input
                                                type="password"
                                                name="claveConfirmar"
                                                className={style.input}
                                                value={passwordData.claveConfirmar}
                                                onChange={handlePasswordChange}
                                                placeholder="Repite la nueva contraseña"
                                                minLength="6"
                                                maxLength="10"
                                            />
                                        </div>
                                    </div>
                                    <p className={style.helperText}>Deja estos campos vacíos si no deseas cambiar tu contraseña</p>
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

export default PerfilAdmin;
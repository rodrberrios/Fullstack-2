import React, { useContext } from 'react';
import { UserContext } from "../../context/AuthContext";
import AsideCliente from '../organisms/AsideCliente';
import style from './PerfilCliente.module.css';

const Perfil = () => {
    const { user } = useContext(UserContext);

    return (
        <div className={style.container}>
            <aside className={style.sidebar}>
                <AsideCliente />
            </aside>
            <main className={style.mainContent}>                
                <div className={style.profileContainer}>
                    <section className={style.profileCard}>
                        <div className={style.avatar}>
                            {user?.nombre?.charAt(0) || user?.email?.charAt(0) || 'U'}
                        </div>
                        <div className={style.profileInfo}>
                            <h2 className={style.profileName}>
                                {user?.nombre || 'Usuario'}
                            </h2>
                            <p className={style.profileMeta}>
                                {user?.email || 'Correo no especificado'}
                            </p>
                            <button className={style.btnEdit}>                      
                                Editar
                            </button>
                        </div>
                    </section>

                    <section className={style.contentCard}>
                        <h3>Datos Personales</h3>
                        <div className={style.formGroup}>
                            <label>Nombre completo</label>
                            <input 
                                type="text" 
                                name="nombre"
                                value={user?.nombre || ''}
                                readOnly
                                placeholder="Nombre no especificado"
                            />
                        </div>
                        <div className={style.formGroup}>
                            <label>Email</label>
                            <input 
                                type="email" 
                                name="email"
                                value={user?.email || ''}
                                readOnly
                                placeholder="Email no especificado"
                            />
                        </div>
                        <div className={style.formGroup}>
                            <label>Teléfono</label>
                            <input 
                                type="tel" 
                                name="telefono"
                                value={user?.telefono || ''}
                                readOnly
                                placeholder="Teléfono no especificado"
                            />
                        </div>
                        <div className={style.formGroup}>
                            <label>Dirección</label>
                            <input 
                                type="text" 
                                name="direccion"
                                value={user?.direccion || ''}
                                readOnly
                                placeholder="Dirección no especificada"
                            />
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default Perfil;
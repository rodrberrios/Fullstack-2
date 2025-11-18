import React, { useContext } from 'react';
import { UserContext } from "../../context/AuthContext";
import AsideCliente from '../organisms/AsideCliente';
import style from './Perfil.module.css';

const Perfil = () => {
    const { usuario } = useContext(UserContext);

    return (
        <div className={style.container}>
            <aside className={style.sidebar}>
                <AsideCliente />
            </aside>
            <main className={style.mainContent}>                
                <div className={style.profileContainer}>
                    <section className={style.profileCard}>
                        <div className={style.avatar}>
                            {usuario?.nombre?.charAt(0) || usuario?.email?.charAt(0) || 'U'}
                        </div>
                        <div className={style.profileInfo}>
                            <h2 className={style.profileName}>
                                {usuario?.nombre || 'Usuario'}
                            </h2>
                            <p className={style.profileMeta}>
                                {usuario?.email || 'Correo no especificado'}
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
                                value={usuario?.nombre || ''}
                                readOnly
                                placeholder="Nombre no especificado"
                            />
                        </div>
                        <div className={style.formGroup}>
                            <label>Email</label>
                            <input 
                                type="email" 
                                name="email"
                                value={usuario?.email || ''}
                                readOnly
                                placeholder="Email no especificado"
                            />
                        </div>
                        <div className={style.formGroup}>
                            <label>Teléfono</label>
                            <input 
                                type="tel" 
                                name="telefono"
                                value={usuario?.telefono || ''}
                                readOnly
                                placeholder="Teléfono no especificado"
                            />
                        </div>
                        <div className={style.formGroup}>
                            <label>Dirección</label>
                            <input 
                                type="text" 
                                name="direccion"
                                value={usuario?.direccion || ''}
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
import React, { useState, useEffect, useContext } from 'react';
import { db } from "../../config/firebase";
import { collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { UserContext } from "../../context/AuthContext";
import Aside from "../organisms/Aside";
import style from './Customers.module.css';

const Customers = () => {
    const { user } = useContext(UserContext);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const querySnapshot = await getDocs(collection(db, "usuarios"));
            const usersData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setUsers(usersData);
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (userId) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
            try {
                await deleteDoc(doc(db, "usuarios", userId));
                setUsers(users.filter(u => u.id !== userId));
                alert("Usuario eliminado correctamente");
            } catch (error) {
                console.error("Error deleting user:", error);
                alert("Error al eliminar el usuario");
            }
        }
    };

    const handleEdit = (userData) => {
        setEditingUser({ ...userData });
        setIsEditModalOpen(true);
    };

    const handleToggleActive = async (userData) => {
        const newStatus = !userData.activo;
        try {
            const userRef = doc(db, "usuarios", userData.id);
            await updateDoc(userRef, { activo: newStatus });
            setUsers(users.map(u => u.id === userData.id ? { ...u, activo: newStatus } : u));
            alert(`Usuario ${newStatus ? 'activado' : 'desactivado'} correctamente`);
        } catch (error) {
            console.error("Error updating user status:", error);
            alert("Error al actualizar el estado del usuario");
        }
    };

    const handleChangeRole = (userData) => {
        setEditingUser({ ...userData });
        setIsRoleModalOpen(true);
    };

    const handleCloseModals = () => {
        setIsEditModalOpen(false);
        setIsRoleModalOpen(false);
        setEditingUser(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditingUser(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSaveEdit = async () => {
        if (!editingUser) return;

        if (!editingUser.nombre || !editingUser.correo) {
            alert("Por favor completa al menos el nombre y correo del usuario");
            return;
        }

        try {
            const userRef = doc(db, "usuarios", editingUser.id);
            const { id, clave, ...updateData } = editingUser; // Excluir password de la actualización
            await updateDoc(userRef, updateData);
            setUsers(users.map(u => u.id === editingUser.id ? editingUser : u));
            alert("Usuario actualizado correctamente");
            handleCloseModals();
        } catch (error) {
            console.error("Error saving user:", error);
            alert("Error al guardar el usuario");
        }
    };

    const handleSaveRole = async () => {
        if (!editingUser) return;

        try {
            const userRef = doc(db, "usuarios", editingUser.id);
            await updateDoc(userRef, { rol: editingUser.rol });
            setUsers(users.map(u => u.id === editingUser.id ? { ...u, rol: editingUser.rol } : u));
            alert("Rol actualizado correctamente");
            handleCloseModals();
        } catch (error) {
            console.error("Error updating role:", error);
            alert("Error al actualizar el rol");
        }
    };

    return (
        <div className={style.container}>
            <Aside />

            <main className={style.main}>
                <div className={style.header}>
                    <h1 className={style.title}>Gestión de Usuarios</h1>
                    <p className={style.subtitle}>Administra cuentas de usuarios y los roles dentro del sistema</p>
                </div>

                <div className={style.tableContainer}>
                    <div className={style.tableHeader}>
                        <h2 className={style.tableTitle}>Lista de Usuarios</h2>
                        <div className={style.headerActions}>
                            <button className={style.btnSecondary} onClick={fetchUsers}>
                                🔄 Actualizar
                            </button>
                        </div>
                    </div>

                    {loading ? (
                        <p>Cargando usuarios...</p>
                    ) : (
                        <table className={style.table}>
                            <thead>
                                <tr>
                                    <th>RUN</th>
                                    <th>Nombre</th>
                                    <th>Email</th>
                                    <th>Teléfono</th>
                                    <th>Dirección</th>
                                    <th>Rol</th>
                                    <th>Estado</th>
                                    <th>Fecha Registro</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((userData) => (
                                    <tr key={userData.id}>
                                        <td>{userData.rut || userData.run || 'N/A'}</td>
                                        <td className={style.userName}>{userData.nombre}</td>
                                        <td>{userData.correo}</td>
                                        <td>{userData.telefono || 'N/A'}</td>
                                        <td>{userData.direccion || 'N/A'}</td>
                                        <td>
                                            <span className={`${style.roleBadge} ${style[`role_${userData.rol || 'cliente'}`]}`}>
                                                {userData.rol === 'admin' ? 'Admin' : userData.rol === 'vendedor' ? 'Vendedor' : 'Cliente'}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={`${style.statusBadge} ${userData.activo !== false ? style.status_activo : style.status_inactivo}`}>
                                                {userData.activo !== false ? 'Activo' : 'Inactivo'}
                                            </span>
                                        </td>
                                        <td>
                                            {userData.fechaRegistro ? new Date(userData.fechaRegistro.seconds * 1000).toLocaleDateString('es-CL') : 'N/A'}
                                        </td>
                                        <td className={style.actionButtons}>
                                            <button
                                                className={`${style.btnAction} ${style.btnEdit}`}
                                                onClick={() => handleEdit(userData)}
                                                title="Editar"
                                            >
                                                ✏️
                                            </button>
                                            <button
                                                className={`${style.btnAction} ${style.btnToggle}`}
                                                onClick={() => handleToggleActive(userData)}
                                                title={userData.activo !== false ? "Desactivar" : "Activar"}
                                            >
                                                {userData.activo !== false ? '🔒' : '🔓'}
                                            </button>
                                            <button
                                                className={`${style.btnAction} ${style.btnRole}`}
                                                onClick={() => handleChangeRole(userData)}
                                                title="Cambiar Rol"
                                            >
                                                👤
                                            </button>
                                            <button
                                                className={`${style.btnAction} ${style.btnDelete}`}
                                                onClick={() => handleDelete(userData.id)}
                                                title="Eliminar"
                                            >
                                                🗑️
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* Edit Modal */}
                {isEditModalOpen && editingUser && (
                    <div className={style.modalOverlay}>
                        <div className={style.modalContent}>
                            <div className={style.modalHeader}>
                                <h3 className={style.modalTitle}>Editar Usuario</h3>
                                <button className={style.closeButton} onClick={handleCloseModals}>×</button>
                            </div>
                            <div className={style.modalBody}>
                                <div className={style.formGroup}>
                                    <label className={style.label}>Nombre *</label>
                                    <input
                                        type="text"
                                        name="nombre"
                                        className={style.input}
                                        value={editingUser.nombre || ''}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className={style.formGroup}>
                                    <label className={style.label}>Email *</label>
                                    <input
                                        type="email"
                                        name="correo"
                                        className={style.input}
                                        value={editingUser.correo || ''}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className={style.formGroup}>
                                    <label className={style.label}>Teléfono</label>
                                    <input
                                        type="text"
                                        name="telefono"
                                        className={style.input}
                                        value={editingUser.telefono || ''}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className={style.formGroup}>
                                    <label className={style.label}>Dirección</label>
                                    <input
                                        type="text"
                                        name="direccion"
                                        className={style.input}
                                        value={editingUser.direccion || ''}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className={style.formGroup}>
                                    <label className={style.label}>RUN/RUT</label>
                                    <input
                                        type="text"
                                        name="rut"
                                        className={style.input}
                                        value={editingUser.rut || editingUser.run || ''}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className={style.modalFooter}>
                                <button className={style.btnCancel} onClick={handleCloseModals}>Cancelar</button>
                                <button className={style.btnSave} onClick={handleSaveEdit}>Guardar</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Role Change Modal */}
                {isRoleModalOpen && editingUser && (
                    <div className={style.modalOverlay}>
                        <div className={style.modalContent}>
                            <div className={style.modalHeader}>
                                <h3 className={style.modalTitle}>Cambiar Rol de Usuario</h3>
                                <button className={style.closeButton} onClick={handleCloseModals}>×</button>
                            </div>
                            <div className={style.modalBody}>
                                <div className={style.userInfo}>
                                    <p><strong>Usuario:</strong> {editingUser.nombre}</p>
                                    <p><strong>Email:</strong> {editingUser.correo}</p>
                                </div>
                                <div className={style.formGroup}>
                                    <label className={style.label}>Seleccionar Rol</label>
                                    <select
                                        name="rol"
                                        className={style.input}
                                        value={editingUser.rol || 'cliente'}
                                        onChange={handleInputChange}
                                    >
                                        <option value="cliente">Cliente</option>
                                        <option value="vendedor">Vendedor</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </div>
                            </div>
                            <div className={style.modalFooter}>
                                <button className={style.btnCancel} onClick={handleCloseModals}>Cancelar</button>
                                <button className={style.btnSave} onClick={handleSaveRole}>Cambiar Rol</button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Customers;

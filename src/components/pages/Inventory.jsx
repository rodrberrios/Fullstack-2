import React, { useState, useEffect, useContext } from 'react';
import { db } from "../../config/firebase";
import { collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { UserContext } from "../../context/AuthContext";
import Aside from "../organisms/Aside";
import style from './Inventory.module.css';

const Inventory = () => {
    const { user } = useContext(UserContext);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const querySnapshot = await getDocs(collection(db, "producto"));
            const productsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setProducts(productsData);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (productId) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
            try {
                await deleteDoc(doc(db, "producto", productId));
                setProducts(products.filter(product => product.id !== productId));
                alert("Producto eliminado correctamente");
            } catch (error) {
                console.error("Error deleting product:", error);
                alert("Error al eliminar el producto");
            }
        }
    };

    const handleEdit = (product) => {
        setEditingProduct({ ...product });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingProduct(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditingProduct(prev => ({
            ...prev,
            [name]: name === 'precio' || name === 'stock' ? Number(value) : value
        }));
    };

    const handleSaveProduct = async () => {
        if (!editingProduct) return;

        try {
            const productRef = doc(db, "producto", editingProduct.id);
            const { id, ...updateData } = editingProduct; // Exclude ID from update data

            await updateDoc(productRef, updateData);

            // Update local state
            setProducts(products.map(p => p.id === editingProduct.id ? editingProduct : p));

            alert("Producto actualizado correctamente");
            handleCloseModal();
        } catch (error) {
            console.error("Error updating product:", error);
            alert("Error al actualizar el producto");
        }
    };

    const handleAdd = () => {
        alert("Agregar nuevo producto (Funcionalidad pendiente)");
    };

    return (
        <div className={style.container}>
            <Aside />

            <main className={style.main}>
                <div className={style.header}>
                    <h1 className={style.title}>Gestión de Productos</h1>
                    <p className={style.subtitle}>Administra el inventario y detalles de productos</p>
                </div>

                <div className={style.tableContainer}>
                    <div className={style.tableHeader}>
                        <h2 className={style.tableTitle}>Lista de Productos</h2>
                        <div className={style.headerActions}>
                            <button className={style.btnPrimary} onClick={handleAdd}>
                                ➕ Nuevo Producto
                            </button>
                            <button className={style.btnSecondary} onClick={fetchProducts}>
                                🔄 Actualizar
                            </button>
                        </div>
                    </div>

                    {loading ? (
                        <p>Cargando productos...</p>
                    ) : (
                        <table className={style.table}>
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Precio</th>
                                    <th>Stock</th>
                                    <th>Categoría</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product.id}>
                                        <td className={style.productName}>{product.nombre}</td>
                                        <td className={style.productPrice}>${product.precio?.toLocaleString('es-CL')}</td>
                                        <td>{product.stock || 0}</td>
                                        <td>{product.categoria || 'General'}</td>
                                        <td>
                                            <span className={`${style.statusBadge} ${product.stock > 0 ? style.status_activo : style.status_inactivo}`}>
                                                {product.stock > 0 ? 'Activo' : 'Inactivo'}
                                            </span>
                                        </td>
                                        <td className={style.actionButtons}>
                                            <button
                                                className={`${style.btnAction} ${style.btnEdit}`}
                                                onClick={() => handleEdit(product)}
                                                title="Editar"
                                            >
                                                ✏️
                                            </button>
                                            <button
                                                className={`${style.btnAction} ${style.btnDelete}`}
                                                onClick={() => handleDelete(product.id)}
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
                {isModalOpen && editingProduct && (
                    <div className={style.modalOverlay}>
                        <div className={style.modalContent}>
                            <div className={style.modalHeader}>
                                <h3 className={style.modalTitle}>Editar Producto</h3>
                                <button className={style.closeButton} onClick={handleCloseModal}>×</button>
                            </div>
                            <div className={style.modalBody}>
                                <div className={style.formGroup}>
                                    <label className={style.label}>Nombre</label>
                                    <input
                                        type="text"
                                        name="nombre"
                                        className={style.input}
                                        value={editingProduct.nombre || ''}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className={style.formGroup}>
                                    <label className={style.label}>Precio</label>
                                    <input
                                        type="number"
                                        name="precio"
                                        className={style.input}
                                        value={editingProduct.precio || 0}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className={style.formGroup}>
                                    <label className={style.label}>Stock</label>
                                    <input
                                        type="number"
                                        name="stock"
                                        className={style.input}
                                        value={editingProduct.stock || 0}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className={style.formGroup}>
                                    <label className={style.label}>Categoría</label>
                                    <input
                                        type="text"
                                        name="categoria"
                                        className={style.input}
                                        value={editingProduct.categoria || ''}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className={style.formGroup}>
                                    <label className={style.label}>URL de Imagen</label>
                                    <input
                                        type="text"
                                        name="img"
                                        className={style.input}
                                        value={editingProduct.img || ''}
                                        onChange={handleInputChange}
                                        placeholder="https://..."
                                    />
                                </div>
                            </div>
                            <div className={style.modalFooter}>
                                <button className={style.btnCancel} onClick={handleCloseModal}>Cancelar</button>
                                <button className={style.btnSave} onClick={handleSaveProduct}>Guardar</button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Inventory;

import React, { useState, useEffect } from 'react';
import { db } from "../../config/firebase";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import Aside from "../organisms/Aside";
import style from './Categories.module.css';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isProductsModalOpen, setIsProductsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);

    // Fetch categories and products
    const fetchCategoriesAndProducts = async () => {
        setLoading(true);
        try {
            // Fetch products
            const productsSnapshot = await getDocs(collection(db, "producto"));
            const productsData = productsSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setProducts(productsData);

            // Extract unique categories from products
            const categoryMap = new Map();

            productsData.forEach(product => {
                if (product.categoria && product.categoria.trim() !== '') {
                    if (!categoryMap.has(product.categoria)) {
                        categoryMap.set(product.categoria, {
                            nombre: product.categoria,
                            descripcion: product.descripcionCategoria || '',
                            activo: product.activoCategoria !== false,
                            productCount: 1
                        });
                    } else {
                        const cat = categoryMap.get(product.categoria);
                        cat.productCount++;
                    }
                }
            });

            setCategories(Array.from(categoryMap.values()));
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategoriesAndProducts();
    }, []);

    const handleOpenModal = (category = null) => {
        if (category) {
            setEditingCategory({ ...category });
        } else {
            setEditingCategory({
                nombre: '',
                descripcion: '',
                activo: true,
                isNew: true
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingCategory(null);
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setEditingCategory(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSaveCategory = async () => {
        if (!editingCategory || !editingCategory.nombre.trim()) {
            alert("Por favor ingresa un nombre para la categoría");
            return;
        }

        const categoryName = editingCategory.nombre.trim();
        const categoryDesc = editingCategory.descripcion?.trim() || '';
        const categoryActive = editingCategory.activo !== false;

        try {
            if (editingCategory.isNew) {
                // Creating a new category - just add to the list, will be assigned to products later
                alert("Categoría creada. Ahora puedes asignarla a productos.");
                setCategories([...categories, {
                    nombre: categoryName,
                    descripcion: categoryDesc,
                    activo: categoryActive,
                    productCount: 0
                }]);
            } else {
                // Update all products with this category
                const productsToUpdate = products.filter(p => p.categoria === editingCategory.nombre);

                for (const product of productsToUpdate) {
                    const productRef = doc(db, "producto", product.id);
                    await updateDoc(productRef, {
                        categoria: categoryName,
                        descripcionCategoria: categoryDesc,
                        activoCategoria: categoryActive
                    });
                }

                // Update local state
                setCategories(categories.map(c =>
                    c.nombre === editingCategory.nombre
                        ? { ...c, nombre: categoryName, descripcion: categoryDesc, activo: categoryActive }
                        : c
                ));

                setProducts(products.map(p =>
                    p.categoria === editingCategory.nombre
                        ? {
                            ...p,
                            categoria: categoryName,
                            descripcionCategoria: categoryDesc,
                            activoCategoria: categoryActive
                        }
                        : p
                ));

                alert(`${productsToUpdate.length} producto(s) actualizado(s) correctamente`);
            }

            handleCloseModal();
        } catch (error) {
            console.error("Error saving category:", error);
            alert("Error al guardar la categoría");
        }
    };

    const handleDeleteCategory = async (category) => {
        const productsInCategory = products.filter(p => p.categoria === category.nombre);

        if (productsInCategory.length > 0) {
            const confirm = window.confirm(
                `Esta categoría tiene ${productsInCategory.length} producto(s). ¿Deseas eliminarla? Los productos quedarán sin categoría.`
            );

            if (!confirm) return;

            try {
                // Remove category from all products
                for (const product of productsInCategory) {
                    const productRef = doc(db, "producto", product.id);
                    await updateDoc(productRef, {
                        categoria: '',
                        descripcionCategoria: '',
                        activoCategoria: true
                    });
                }

                setCategories(categories.filter(c => c.nombre !== category.nombre));
                setProducts(products.map(p =>
                    p.categoria === category.nombre
                        ? { ...p, categoria: '', descripcionCategoria: '', activoCategoria: true }
                        : p
                ));

                alert("Categoría eliminada correctamente");
            } catch (error) {
                console.error("Error deleting category:", error);
                alert("Error al eliminar la categoría");
            }
        } else {
            setCategories(categories.filter(c => c.nombre !== category.nombre));
            alert("Categoría eliminada correctamente");
        }
    };

    const handleShowProducts = (categoryName) => {
        setSelectedCategory(categoryName);
        setIsProductsModalOpen(true);
    };

    const handleCloseProductsModal = () => {
        setIsProductsModalOpen(false);
        setSelectedCategory(null);
    };

    const handleAssignCategory = async (productId, categoryName) => {
        try {
            const category = categories.find(c => c.nombre === categoryName);
            const productRef = doc(db, "producto", productId);

            await updateDoc(productRef, {
                categoria: categoryName,
                descripcionCategoria: category?.descripcion || '',
                activoCategoria: category?.activo !== false
            });

            setProducts(products.map(p =>
                p.id === productId
                    ? {
                        ...p,
                        categoria: categoryName,
                        descripcionCategoria: category?.descripcion || '',
                        activoCategoria: category?.activo !== false
                    }
                    : p
            ));

            // Update category counts
            await fetchCategoriesAndProducts();

            alert("Categoría asignada correctamente");
        } catch (error) {
            console.error("Error assigning category:", error);
            alert("Error al asignar la categoría");
        }
    };

    const productsInSelectedCategory = selectedCategory
        ? products.filter(p => p.categoria === selectedCategory)
        : [];

    const productsWithoutCategory = products.filter(p => !p.categoria || p.categoria.trim() === '');

    return (
        <div className={style.container}>
            <Aside />

            <main className={style.main}>
                <div className={style.header}>
                    <h1 className={style.title}>Gestión de Categorías</h1>
                    <p className={style.subtitle}>Administra las categorías de productos</p>
                </div>

                <div className={style.tableContainer}>
                    <div className={style.tableHeader}>
                        <h2 className={style.tableTitle}>Lista de Categorías</h2>
                        <div className={style.headerActions}>
                            <button className={style.btnPrimary} onClick={() => handleOpenModal()}>
                                ➕ Nueva Categoría
                            </button>
                            <button className={style.btnSecondary} onClick={fetchCategoriesAndProducts}>
                                🔄 Actualizar
                            </button>
                        </div>
                    </div>

                    {loading ? (
                        <p>Cargando categorías...</p>
                    ) : categories.length === 0 ? (
                        <p className={style.noData}>No hay categorías. Crea una nueva para comenzar.</p>
                    ) : (
                        <table className={style.table}>
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Descripción</th>
                                    <th>Estado</th>
                                    <th>Productos</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((category, index) => (
                                    <tr key={index}>
                                        <td className={style.categoryName}>{category.nombre}</td>
                                        <td className={style.description}>
                                            {category.descripcion || 'Sin descripción'}
                                        </td>
                                        <td>
                                            <span className={`${style.statusBadge} ${category.activo ? style.statusActive : style.statusInactive}`}>
                                                {category.activo ? 'Activa' : 'Inactiva'}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={style.productCount}>
                                                {category.productCount} producto{category.productCount !== 1 ? 's' : ''}
                                            </span>
                                        </td>
                                        <td className={style.actionButtons}>
                                            <button
                                                className={`${style.btnAction} ${style.btnEdit}`}
                                                onClick={() => handleOpenModal(category)}
                                                title="Editar"
                                            >
                                                ✏️
                                            </button>
                                            <button
                                                className={`${style.btnAction} ${style.btnView}`}
                                                onClick={() => handleShowProducts(category.nombre)}
                                                title="Ver Productos"
                                            >
                                                👁️
                                            </button>
                                            <button
                                                className={`${style.btnAction} ${style.btnDelete}`}
                                                onClick={() => handleDeleteCategory(category)}
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

                    {productsWithoutCategory.length > 0 && (
                        <div className={style.warningBox}>
                            <p>⚠️ Hay {productsWithoutCategory.length} producto{productsWithoutCategory.length !== 1 ? 's' : ''} sin categoría asignada</p>
                        </div>
                    )}
                </div>

                {/* Modal para Crear/Editar Categoría */}
                {isModalOpen && editingCategory && (
                    <div className={style.modalOverlay}>
                        <div className={style.modalContent}>
                            <div className={style.modalHeader}>
                                <h3 className={style.modalTitle}>
                                    {editingCategory.isNew ? 'Nueva Categoría' : 'Editar Categoría'}
                                </h3>
                                <button className={style.closeButton} onClick={handleCloseModal}>×</button>
                            </div>
                            <div className={style.modalBody}>
                                <div className={style.formGroup}>
                                    <label className={style.label}>Nombre de la Categoría *</label>
                                    <input
                                        type="text"
                                        name="nombre"
                                        className={style.input}
                                        value={editingCategory.nombre}
                                        onChange={handleInputChange}
                                        placeholder="Ej: Periféricos, Componentes, etc."
                                        autoFocus
                                    />
                                </div>
                                <div className={style.formGroup}>
                                    <label className={style.label}>Descripción</label>
                                    <textarea
                                        name="descripcion"
                                        className={style.input}
                                        value={editingCategory.descripcion || ''}
                                        onChange={handleInputChange}
                                        placeholder="Descripción de la categoría..."
                                        rows="3"
                                    />
                                </div>
                                <div className={style.formGroup}>
                                    <label className={style.checkboxLabel}>
                                        <input
                                            type="checkbox"
                                            name="activo"
                                            checked={editingCategory.activo !== false}
                                            onChange={handleInputChange}
                                            className={style.checkbox}
                                        />
                                        <span>Categoría activa</span>
                                    </label>
                                </div>
                                {!editingCategory.isNew && (
                                    <p className={style.infoText}>
                                        ℹ️ Al guardar, se actualizarán todos los productos con esta categoría
                                    </p>
                                )}
                            </div>
                            <div className={style.modalFooter}>
                                <button className={style.btnCancel} onClick={handleCloseModal}>Cancelar</button>
                                <button className={style.btnSave} onClick={handleSaveCategory}>
                                    Guardar
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Modal para Ver Productos de una Categoría */}
                {isProductsModalOpen && selectedCategory && (
                    <div className={style.modalOverlay}>
                        <div className={style.modalContent}>
                            <div className={style.modalHeader}>
                                <h3 className={style.modalTitle}>Productos en "{selectedCategory}"</h3>
                                <button className={style.closeButton} onClick={handleCloseProductsModal}>×</button>
                            </div>
                            <div className={style.modalBody}>
                                {productsInSelectedCategory.length === 0 ? (
                                    <p className={style.noData}>No hay productos en esta categoría</p>
                                ) : (
                                    <div className={style.productsList}>
                                        {productsInSelectedCategory.map(product => (
                                            <div key={product.id} className={style.productItem}>
                                                <div className={style.productInfo}>
                                                    <span className={style.productName}>{product.nombre}</span>
                                                    <span className={style.productPrice}>
                                                        ${product.precio?.toLocaleString('es-CL')}
                                                    </span>
                                                </div>
                                                <span className={style.productStock}>
                                                    Stock: {product.stock || 0}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {productsWithoutCategory.length > 0 && (
                                    <div className={style.assignSection}>
                                        <h4 className={style.sectionTitle}>Asignar productos sin categoría</h4>
                                        <div className={style.productsList}>
                                            {productsWithoutCategory.map(product => (
                                                <div key={product.id} className={style.productItem}>
                                                    <div className={style.productInfo}>
                                                        <span className={style.productName}>{product.nombre}</span>
                                                        <span className={style.productPrice}>
                                                            ${product.precio?.toLocaleString('es-CL')}
                                                        </span>
                                                    </div>
                                                    <button
                                                        className={style.btnAssign}
                                                        onClick={() => handleAssignCategory(product.id, selectedCategory)}
                                                    >
                                                        Asignar
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className={style.modalFooter}>
                                <button className={style.btnCancel} onClick={handleCloseProductsModal}>Cerrar</button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Categories;

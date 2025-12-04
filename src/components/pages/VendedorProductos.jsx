import React, { useState, useEffect } from 'react';
import { db } from "../../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import AsideVendedor from "../organisms/AsideVendedor";
import style from './VendedorProductos.module.css';

const VendedorProductos = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    const handleViewDetails = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    };

    return (
        <div className={style.container}>
            <AsideVendedor />

            <main className={style.main}>
                <div className={style.header}>
                    <h1 className={style.title}>Productos</h1>
                    <p className={style.subtitle}>Visualiza el catálogo completo de productos</p>
                </div>

                <div className={style.tableContainer}>
                    <div className={style.tableHeader}>
                        <h2 className={style.tableTitle}>Lista de Productos</h2>
                        <div className={style.headerActions}>
                            <button className={style.btnSecondary} onClick={fetchProducts}>
                                Actualizar
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
                                                className={`${style.btnAction} ${style.btnView}`}
                                                onClick={() => handleViewDetails(product)}
                                                title="Ver Detalles"
                                            >
                                                👁️
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* Details Modal */}
                {isModalOpen && selectedProduct && (
                    <div className={style.modalOverlay}>
                        <div className={style.modalContent}>
                            <div className={style.modalHeader}>
                                <h3 className={style.modalTitle}>Detalles del Producto</h3>
                                <button className={style.closeButton} onClick={handleCloseModal}>×</button>
                            </div>
                            <div className={style.modalBody}>
                                {selectedProduct.img && (
                                    <div className={style.productImage}>
                                        <img src={selectedProduct.img} alt={selectedProduct.nombre} />
                                    </div>
                                )}
                                <div className={style.detailRow}>
                                    <strong>Nombre:</strong>
                                    <span>{selectedProduct.nombre}</span>
                                </div>
                                <div className={style.detailRow}>
                                    <strong>Precio:</strong>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        {selectedProduct.precioAnterior > selectedProduct.precio && (
                                            <span style={{ textDecoration: 'line-through', color: '#6b7280', fontSize: '0.9em' }}>
                                                ${selectedProduct.precioAnterior?.toLocaleString('es-CL')}
                                            </span>
                                        )}
                                        <span className={style.priceValue}>
                                            ${selectedProduct.precio?.toLocaleString('es-CL')}
                                            {selectedProduct.precioAnterior > selectedProduct.precio && (
                                                <span style={{ color: '#22c55e', marginLeft: '8px', fontSize: '0.9em' }}>
                                                    (-{Math.round(((selectedProduct.precioAnterior - selectedProduct.precio) / selectedProduct.precioAnterior) * 100)}%)
                                                </span>
                                            )}
                                        </span>
                                    </div>
                                </div>
                                <div className={style.detailRow}>
                                    <strong>Stock:</strong>
                                    <span>{selectedProduct.stock || 0} unidades</span>
                                </div>
                                <div className={style.detailRow}>
                                    <strong>Categoría:</strong>
                                    <span>{selectedProduct.categoria || 'General'}</span>
                                </div>
                                <div className={style.detailRow}>
                                    <strong>Estado:</strong>
                                    <span className={`${style.statusBadge} ${selectedProduct.stock > 0 ? style.status_activo : style.status_inactivo}`}>
                                        {selectedProduct.stock > 0 ? 'Activo' : 'Sin Stock'}
                                    </span>
                                </div>
                                {selectedProduct.descripcion && (
                                    <div className={style.detailRowFull}>
                                        <strong>Descripción:</strong>
                                        <p>{selectedProduct.descripcion}</p>
                                    </div>
                                )}
                            </div>
                            <div className={style.modalFooter}>
                                <button className={style.btnClose} onClick={handleCloseModal}>Cerrar</button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default VendedorProductos;

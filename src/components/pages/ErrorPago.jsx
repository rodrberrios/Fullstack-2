import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../organisms/Header';
import style from './ErrorPago.module.css';

/**
 * Componente de Error en el Pago
 * Muestra los detalles cuando falla el procesamiento del pago
 */
const ErrorPago = () => {
  const [compra, setCompra] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ultimaCompra = JSON.parse(localStorage.getItem('ultimaCompra'));

    if (!ultimaCompra) {
      navigate('/carrito');
      return;
    }

    setCompra(ultimaCompra);
  }, [navigate]);

  /**
   * Redirige al checkout para reintentar el pago
   */
  const reintentarPago = () => {
    navigate('/checkout');
  };

  if (!compra) {
    return (
      <div className="container">
        <Header />
        <div className="cargando">
          <div className="spinner">🔄</div>
          <p>Cargando detalles de la compra...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={style.container}>
      <Header />

      <div className={style.errorContainer}>
        {/* Encabezado */}
        <div className={style.errorHeader}>
          <div className={style.errorTitulo}>
            <span className={style.iconoError}>❌</span>
            <h1>No se pudo realizar el pago <span>{compra.numeroOrden}</span></h1>
          </div>
          <h2 className={style.errorSubtitulo}>Detalle de compra</h2>
          <button
            className={style.btnReintentarPago}
            onClick={reintentarPago}
          >
            Volver a realizar el pago
          </button>

          {/* Mensaje de ayuda adicional */}
          <div className={style.ayudaContainer}>
            <div className={style.ayudaTitulo}>¿Necesitas ayuda?</div>
            <p className={style.ayudaTexto}>
              Si el problema persiste, contacta con nuestro soporte técnico.
            </p>
          </div>
        </div>

        {/* Información del Cliente */}
        <section className={style.infoCliente}>
          <h2 className={style.sectionTitle}>Información del Cliente</h2>

          <div className={`${style.formCliente} ${style.readonly}`}>
            <div className={style.formRow}>
              <div className={style.formGroup}>
                <label>Nombre</label>
                <input
                  type="text"
                  value={compra.cliente.nombre}
                  readOnly
                />
              </div>
              <div className={style.formGroup}>
                <label>Apellidos</label>
                <input
                  type="text"
                  value={compra.cliente.apellidos}
                  readOnly
                />
              </div>
              <div className={style.formGroup}>
                <label>Correo</label>
                <input
                  type="email"
                  value={compra.cliente.correo}
                  readOnly
                />
              </div>
            </div>
          </div>
        </section>

        {/* Dirección de Entrega */}
        <section className={style.direccionEntrega}>
          <h2 className={style.sectionTitle}>Dirección de entrega de los productos</h2>

          <div className={`${style.formDireccion} ${style.readonly}`}>
            <div className={style.formRow}>
              <div className={style.formGroup}>
                <label>Calle</label>
                <input
                  type="text"
                  value={compra.direccion.calle}
                  readOnly
                />
              </div>
              <div className={style.formGroup}>
                <label>Departamento</label>
                <input
                  type="text"
                  value={compra.direccion.departamento || 'N/A'}
                  readOnly
                />
              </div>
            </div>
            <div className={style.formRow}>
              <div className={style.formGroup}>
                <label>Región</label>
                <input
                  type="text"
                  value={compra.direccion.region}
                  readOnly
                />
              </div>
              <div className={style.formGroup}>
                <label>Comuna</label>
                <input
                  type="text"
                  value={compra.direccion.comuna}
                  readOnly
                />
              </div>
            </div>
            <div className={`${style.formGroup} ${style.fullWidth}`}>
              <label>Indicaciones</label>
              <textarea
                value={compra.direccion.indicaciones || 'Ninguna'}
                readOnly
              />
            </div>
          </div>
        </section>

        {/* Tabla de Productos */}
        <div className={style.tablaCheckoutContainer}>
          <table className={style.tablaCheckout}>
            {/* ... contenido de la tabla ... */}
          </table>
        </div>

        {/* Total */}
        <div className={style.totalPagadoContainer}>
          <div className={style.totalPagado}>
            <span className={style.totalText}>Total: $</span>
            <span className={style.totalPrecio}>
              {compra.total.toLocaleString('es-CL')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPago;
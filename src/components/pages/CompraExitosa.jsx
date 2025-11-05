import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../organisms/Header';
import style from './CompraExitosa.module.css';

/**
 * Componente de Compra Exitosa
 * Muestra los detalles de la compra completada
 */
const CompraExitosa = () => {
  const [compra, setCompra] = useState(null);
  const [searchParams] = useSearchParams();
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
   * Simula la impresión de la boleta en PDF
   */
  const imprimirBoletaPDF = () => {
    alert('Generando boleta en PDF...\nLa descarga comenzará en breve.');
    // En una implementación real, aquí se generaría el PDF
  };

  /**
   * Simula el envío de la boleta por email
   */
  const enviarBoletaEmail = () => {
    if (!compra) return;
    alert(`Boleta enviada a: ${compra.cliente.correo}\nRevisa tu bandeja de entrada.`);
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

      <div className={style.exitoContainer}>
        {/* Encabezado */}
        <div className={style.exitoHeader}>
          <span className={style.codigoOrden}>{compra.numeroOrden}</span>
          <div className={style.exitoTitulo}>
            <span className={style.iconoExito}>✅</span>
            <h1>Se ha realizado la compra nro <span>{compra.numeroOrden}</span></h1>
          </div>
          <p className={style.exitoSubtitulo}>Completa la siguiente información</p>
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

        {/* Total Pagado */}
        <div className={style.totalPagadoContainer}>
          <div className={style.totalPagado}>
            <span className={style.totalText}>Total Pagado: $</span>
            <span className={style.totalPrecio}>
              {compra.total.toLocaleString('es-CL')}
            </span>
          </div>
        </div>

        {/* Botones Finales */}
        <div className={style.exitoFooter}>
          <button
            className={style.btnImprimirPdf}
            onClick={imprimirBoletaPDF}
          >
            Imprimir Boleta en PDF
          </button>
          <button
            className={style.btnEnviarEmail}
            onClick={enviarBoletaEmail}
          >
            Enviar Boleta por Email
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompraExitosa;
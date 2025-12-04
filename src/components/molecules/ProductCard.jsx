import React from 'react';
import style from './ProductCard.module.css';

const ProductCard = ({ producto, onAgregar }) => {
  // Manejar errores de imagen
  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/400x400/111318/94a3b8?text=Sin+Imagen';
  };

  return (
    <div className={style.card}>
      <div className={style.imageContainer}>
        <img
          src={producto.img || producto.imagen || 'https://via.placeholder.com/400x400/111318/94a3b8?text=Sin+Imagen'}
          alt={producto.nombre}
          className={style.image}
          onError={handleImageError}
        />
        {producto.stock !== undefined && producto.stock === 0 && (
          <div className={style.outOfStock}>Agotado</div>
        )}
        {producto.precioAnterior && producto.precioAnterior > producto.precio && (
          <div className={style.offerBadge}>¡Oferta!</div>
        )}
      </div>

      <div className={style.content}>
        <div className={style.category}>{producto.categoria || 'General'}</div>
        <h3 className={style.title}>{producto.nombre}</h3>

        {producto.descripcion && (
          <p className={style.description}>
            {producto.descripcion.length > 80
              ? producto.descripcion.substring(0, 80) + '...'
              : producto.descripcion}
          </p>
        )}

        <div className={style.priceContainer}>
          {producto.precioAnterior && producto.precioAnterior > producto.precio ? (
            <>
              <span className={style.oldPrice}>${producto.precioAnterior.toLocaleString('es-CL')}</span>
              <span className={style.price}>${producto.precio.toLocaleString('es-CL')}</span>
            </>
          ) : (
            <span className={style.price}>${producto.precio?.toLocaleString('es-CL')}</span>
          )}
        </div>

        <div className={style.footer}>
          {producto.stock !== undefined && (
            <span className={style.stock}>
              {producto.stock > 0 ? `${producto.stock} disponibles` : 'Sin stock'}
            </span>
          )}
          <button
            className={style.button}
            onClick={() => onAgregar(producto)}
            disabled={producto.stock === 0}
          >
            {producto.stock === 0 ? 'Agotado' : 'Agregar'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

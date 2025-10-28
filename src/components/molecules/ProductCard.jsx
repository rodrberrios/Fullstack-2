import React from 'react';
import style from './ProductCard.module.css';

const ProductCard = ({ producto, onAgregar }) => {
  const { id, nombre, precio, imagen } = producto || {};

  return (
    <div className={style.card} key={id}>
      <div className={style.imageWrap}>
        <img
          className={style.image}
          src={imagen}
          alt={nombre || 'Producto'}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x300/cccccc/969696?text=Imagen+No+Disponible';
          }}
        />
      </div>
      <div className={style.info}>
        <h4 className={style.name}>{nombre || 'Sin nombre'}</h4>
        {precio !== undefined && (
          <p className={style.price}>${(precio || 0).toLocaleString('es-CL')}</p>
        )}
        {onAgregar && (
          <button className={style.btn} onClick={() => onAgregar(producto)}>
            Agregar al carrito
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;


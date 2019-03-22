import React from "react";
import { Link } from "react-router-dom";
import "./ProductItem.css";
const ProductItem = props => {
  const { _id, name, price, image, category, discount } = props.product;
  const { handleOnClick } = props;
  return (
    <div className="product-card">
      {discount && discount > 0 ? (
        <div className="badge">{discount}% off</div>
      ) : null}
      <div className="product-tumb">
        <img src={image} alt={name} />
      </div>
      <div className="product-details">
        <span className="product-catagory">{category.name}</span>
        <h4>
          <Link to={`/product/${_id}`}>{name}</Link>
        </h4>
        <div className="product-bottom-details">
          <div className="product-price">
            {discount && discount > 0 ? <small>$ {price}</small> : null}{' '}
            ${discount && discount > 0 ? Number(price - discount * price * 0.01).toFixed(2) : price}
          </div>
          <div className="product-links">
            <i className="fas fa-cart-plus fa-2x" onClick={handleOnClick} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;

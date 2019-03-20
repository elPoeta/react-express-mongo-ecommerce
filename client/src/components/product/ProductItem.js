import React from "react";
import "./ProductItem.css";
const ProductItem = props => {
  const { name, price, image, category } = props.product;
  const { handleOnClick } = props;
  return (
    <div className="product-card">
      <div className="badge">25% off</div>
      <div className="product-tumb">
        <img src={image} alt={name} />
      </div>
      <div className="product-details">
        <span className="product-catagory">{category.name}</span>
        <h4>
          <a href="#">{name}</a>
        </h4>
        <div className="product-bottom-details">
          <div className="product-price">
            <small>$96.00</small>U${price}
          </div>
          <div className="product-links">
            <a href="">
              <i className="fa fa-heart" />
            </a>
            <a href="#" onClick={handleOnClick}>
              <i className="fas fa-cart-plus" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;

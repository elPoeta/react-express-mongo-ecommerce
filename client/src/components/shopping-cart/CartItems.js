import React from "react";

const CartItems = ({
  product,
  quantity,
  handleAddOnClick,
  handleRemoveItemOnClick,
  handleRemoveProductOnClick
}) => {
  return (
    <div className="cart-items-container">
      <i
        className="fas fa-times-circle i-remove-color"
        onClick={handleRemoveProductOnClick}
      />
      <figure>
        <img src={product.image} alt={product.name} />
      </figure>
      <h3>
        {" "}
        {product.discount && product.discount > 0 ? (
          <i class="fas fa-tags i-sale-color" />
        ) : null}{" "}
        {product.name}
      </h3>
      <p>
        ${" "}
        {product.discount && product.discount > 0
          ? Number(
              product.price - product.discount * product.price * 0.01
            ).toFixed(2)
          : product.price}
      </p>
      <ul className="product-detail-icons">
        <li>
          <i
            className="fas fa-plus-circle  i-add-color"
            onClick={handleAddOnClick}
          />
        </li>

        <li>
          <span className="cart-item-qty">{quantity}</span>
        </li>
        <li>
          <i
            className="fas fa-minus-circle i-minus-color"
            onClick={handleRemoveItemOnClick}
          />
        </li>
      </ul>
      <p>
        {" "}
        ${" "}
        {product.discount && product.discount > 0
          ? Number(
              product.price - product.discount * product.price * 0.01
            ).toFixed(2) * quantity
          : product.price * quantity}
      </p>
    </div>
  );
};

export default CartItems;

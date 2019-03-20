import React from 'react'

const ProductItem = props => {
    const { name, price, image } = props.product;
    const { handleOnClick } = props;
    return (
        <div>
            <img src={image} alt={name} />
            <h3>{name}</h3>
            <p>{price}</p>
            <button onClick={handleOnClick}>Add cart</button>
        </div>
    )
}

export default ProductItem

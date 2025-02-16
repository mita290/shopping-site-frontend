import React from "react";

const Product = ({ product, onAddToCart }) => {
    return (
        <div className="product">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <button onClick={() => onAddToCart(product)}>Add To Cart</button>
        </div>
    );
};

export default Product;
import React from "react";
import Product from "./Product";

const ProductList = ({ products, onAddToCart }) => {
    return (
        <ul className="product-list">
            {products.map(product => (
                <li key={product.id}>
                    <Product product={product} onAddToCart={onAddToCart} />
                </li>
            ))}
        </ul>
    );
};

export default ProductList;

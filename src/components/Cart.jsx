import React from "react";

const Cart = ({ cartItems, onRemoveFromCart  }) => {
    const cartTotal = (cartItems) => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    return (
        <div className="cart">
            <h2>Cart</h2>
            <h3>Cart Total: ${cartTotal(cartItems)}</h3>
            <div className="sub-cart">
                {cartItems.length === 0 ? (
                    <p>No items in cart.</p>
                ) : (
                    cartItems.map(item => (
                        <div key={item.id}>
                            <p><b>Item:</b> {item.name}</p>
                            <p><b>Price / Item:</b> ${item.price}</p>
                            <p><b>Quantity:</b> {item.quantity}</p>
                            <p><b>Total Price:</b> ${item.price * item.quantity}</p>
                            <button onClick={() => onRemoveFromCart(item.id)}>Remove</button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Cart;

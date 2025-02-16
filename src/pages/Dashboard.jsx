import React, { useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import ProductList from "../components/ProductList";
import Cart from "../components/Cart";

const Dashboard = () => {
    const [cartItems, setCartItems] = useState([]);

    const products = [
        { id: 1, name: 'Apple', description: 'Fresh apples', price: 10 },
        { id: 2, name: 'Orange', description: 'Fresh oranges', price: 20 },
        { id: 3, name: 'Banana', description: 'Fresh bananas', price: 15 },
        { id: 4, name: 'Grapes', description: 'Fresh grapes', price: 25 },
        { id: 5, name: 'Mango', description: 'Juicy mangoes', price: 30 },
        { id: 6, name: 'Pineapple', description: 'Tropical pineapples', price: 35 },
        { id: 7, name: 'Watermelon', description: 'Refreshing watermelon', price: 40 },
        { id: 8, name: 'Strawberry', description: 'Sweet strawberries', price: 50 }
    ];

    const handleAddToCart = (product) => {
        const existingItem = cartItems.find(item => item.id === product.id);
        if (existingItem) {
            setCartItems(cartItems.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
        } else {
            setCartItems([...cartItems, { ...product, quantity: 1 }]);
        }
    };
    const handleRemoveFromCart = (productId) => {
        setCartItems(cartItems.filter(item => item.id !== productId));
    };


    const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition({
        commands: [
            {
                command: 'add *',
                callback: (productName) => handleAddProductToCart(productName),
            },
            {
                command: 'remove *',
                callback: (productName) => handleRemoveProductFromCart(productName),
            },
            {
                command: 'clear',
                callback: ({ resetTranscript }) => resetTranscript(),
            },
            {
                command: 'open *',
                callback: (site) => {
                    const newWindow = window.open(`http://${site}.com`, '_blank');
                    if (!newWindow || newWindow.closed || typeof newWindow.closed == 'undefined') {
                        alert('Pop-up blocked! Please allow pop-ups for this website.');
                    }
                }
            }          
        ]
    });

    const handleAddProductToCart = (productName) => {
        const product = products.find(p => p.name.toLowerCase() === productName.toLowerCase());
        if (product) {
            handleAddToCart(product);  
        } else {
            alert(`Product "${productName}" not found!`);
        }
    };

    const handleRemoveProductFromCart = (productName) => {
        const product = products.find(p => p.name.toLowerCase() === productName.toLowerCase());
        if (product) {
            handleRemoveFromCart(product.id);  // Call the function to remove the product from the cart
        } else {
            alert(`Product "${productName}" not found in the cart!`);
        }
    };

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    return (
        <div className="dashboard">
            <div className="microphone">
                    <p>Microphone: {listening ? 'on' : 'off'}</p>
                    <div className="button-panel">
                        <button onClick={() => SpeechRecognition.startListening({ continuous: true })}>Start</button>
                        <button onClick={SpeechRecognition.stopListening}>Stop</button>
                        <button onClick={resetTranscript}>Reset</button>
                    </div>
                    <p>{transcript}</p>
                </div>
            <div className="sub-dashboard">           
                <ProductList products={products} onAddToCart={handleAddToCart} />
                <Cart cartItems={cartItems} onRemoveFromCart={handleRemoveFromCart} />
            </div>
        </div>
    );
};

export default Dashboard;

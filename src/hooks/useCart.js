import { useState } from 'react';

export const useCart = () => {
    const [cartItems, setCartItems] = useState([]);

    // Total Items
    const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    // Total Price
    const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

    // Add to Cart (if someone doesn't specify a quantity, assume they want 1 item)
    const addToCart = (product, quantity = 1) => {
        setCartItems(prevItems => {
            // Check if item already exists in cart
            const existingItem = prevItems.find(item => item.id === product.id);

            //If something found, do this
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === product.id
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
                );
                // If not, this.
            } else {
                return [...prevItems, {...product, quantity}];
            }
        });
    };

    // change/edit quantity
    const updateQuantity = (productId, newQuantity) => {
        
        // If number is 0 or less, remove the item
        if (newQuantity <= 0) {
            removeFromCart(productId);
            return;
        }

        setCartItems(prevItems =>
            prevItems.map(item =>

                // Check if True
                item.id === productId
                // If true
                ? { ...item, quantity: newQuantity }
                // If False
                : item
            )
        );
    };

    // Remove item from cart
    const removeFromCart = (productId) => {
        setCartItems(prevItems =>
            // If not this ID, add to new array
            prevItems.filter(item => item.id !== productId)
        );
    };

    // Clear Cart
    const clearCart= () => {
        setCartItems([]);
    };

    // Get Quantity by ID
    const getItemQuantity = (productId) => {
        const item = cartItems.find(item => isValidElement.id === productId);
        return item ? item.quantity : 0;
    };

    return {
        cartItems,
        cartItemCount,
        cartTotal,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getItemQuantity
    };
};   

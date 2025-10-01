import { useState, useCallback } from 'react';

export const useCart = () => {
    const [cartItems, setCartItems] = useState([]);

    // Total Items
    const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    // Total Price
    const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

    // ===== STRATEGY: Use functional setState to avoid dependencies =====
    
    // Add to Cart
    const addToCart = useCallback((product, quantity = 1) => {
        setCartItems(prevItems => {
            // EXPLANATION: Using prevItems => ... means we don't need cartItems in dependencies
            // We're working with the CURRENT state React gives us, not stale state
            
            const existingItem = prevItems.find(item => item.id === product.id);

            if (existingItem) {
                // Item exists: update its quantity
                return prevItems.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                // Item doesn't exist: add it
                return [...prevItems, { ...product, quantity }];
            }
        });
    }, []); 
    // EXPLANATION: Empty array because we don't reference any external variables
    // Everything we need (product, quantity) comes from parameters
    // cartItems is accessed via prevItems, not directly

    // Update quantity
    const updateQuantity = useCallback((productId, newQuantity) => {
        setCartItems(prevItems => {
            // EXPLANATION: Handle removal case INSIDE setState
            // This way we don't need to call removeFromCart (no dependency!)
            
            if (newQuantity <= 0) {
                // Remove the item by filtering it out
                return prevItems.filter(item => item.id !== productId);
            }

            // Update the quantity
            return prevItems.map(item =>
                item.id === productId
                    ? { ...item, quantity: newQuantity }
                    : item
            );
        });
    }, []);
    // EXPLANATION: Empty array! We eliminated the dependency on removeFromCart
    // by handling the removal logic inline

    // Remove item from cart
    const removeFromCart = useCallback((productId) => {
        setCartItems(prevItems =>
            prevItems.filter(item => item.id !== productId)
        );
    }, []);
    // EXPLANATION: Empty array because we use prevItems, not cartItems directly

    // Clear Cart
    const clearCart = useCallback(() => {
        setCartItems([]);
    }, []);
    // EXPLANATION: Empty array because we're just setting to a new empty array
    // No dependencies needed

    // Get Quantity by ID
    const getItemQuantity = useCallback((productId) => {
        const item = cartItems.find(item => item.id === productId);
        return item ? item.quantity : 0;
    }, [cartItems]);
    // EXPLANATION: MUST include cartItems because we read from it directly
    // We can't use prevItems pattern here because we're not calling setState
    // This function will be recreated whenever cartItems changes
    // That's okay - it's a quick lookup function

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
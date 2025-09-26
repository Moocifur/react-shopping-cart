import { renderHook, act } from '@testing-library/react';
import { useCart } from '../useCart';
import { expect } from 'vitest';

describe('useCart hook', () => {

    test('should initialize with empty cart', () => {
        const { result } = renderHook(() => useCart());

        expect(result.current.cartItems).toEqual([]);
        expect(result.current.cartItemCount).toBe(0);
        expect(result.current.cartTotal).toBe(0);
    });

    test('should add item to cart', () => {
        // 1. Create a fake shopping cart (empty to start)
        const { result } = renderHook(() => useCart());

        // 2. Create a fake product to add
        const mockProduct = {
            id: 1,
            title: 'Test Product',
            price: 10.99,
            image: 'test.jpg'
        };

        // 3. Add the product to cart with quantity of 2
        act(() => {
            result.current.addToCart(mockProduct, 2);
        });
        // 4. CHECK: Is there now 1 item in the cart?
        expect(result.current.cartItems).toHaveLength(1);

        // 5. CHECK: Does that item have all the product info PLUS quantity: 2?
        expect(result.current.cartItems[0]).toEqual({
            ...mockProduct, // All the original product properties
            quantity: 2 // Plus the quantity we added
        });

        // 6. CHECK: Does the total count equal 2?
        expect(result.current.cartItemCount).toBe(2);

        // 7. CHECK: Is the total price correct? (10.99 × 2 = 21.98)
        expect(result.current.cartTotal).toBe(21.98);
    });

    test('should update existing item quantity when adding same product', () => {
        // 1. Create a fake shopping cart (empty to start)
        const { result } = renderHook(() => useCart());

        // 2. Create a fake product to add
        const mockProduct = {
            id: 1,
            title: 'Test Product',
            price: 10.99,
            image: 'test.jpg'
        };

        // 3. Add the product to cart for the FIRST time with quantity of 1
        act(() => {
            result.current.addToCart(mockProduct, 1);
        });

        // 4. Add the SAME product to cart again with quantity of 2
        //    (This should UPDATE the existing item, not create a new one)
        act(() => {
            result.current.addToCart(mockProduct, 2);
        });

        // 5. CHECK: Should still have 1 unique item in cart (not 2 seperate items)
        expect(result.current.cartItems).toHaveLength(1);

        // 6. CHECK: That one item should have the quantity of 3 (1 + 2 = 3)
        expect(result.current.cartItems[0].quantity).toBe(3);

        // 7. CHECK: total item count should be 3 (same as quantity)
        expect(result.current.cartItemCount).toBe(3);
    })

    test('should remove item from cart', () => {
        // 1. Create a fake shopping cart (empty to start)
        const { result } = renderHook(() => useCart());

        // 2. Create a fake product to add
        const mockProduct = {
            id: 1,
            title: 'Test Product',
            price: 10.99,
            image: 'test.jpg'
        };

        // 3. First, Add the product to cart with the quantity of 2
        // (We need something in the cart before we can remove it!)
        act(() => {
            result.current.addToCart(mockProduct, 2);
        });

        // 4. Now REMOVE the cart using its ID (1)
        // (This should remove the item, regardless of quantity)
        act (() => {
            result.current.removeFromCart(1);
        });

        // 5. CHECK: Cart should now be empty (no items left)
        expect(result.current.cartItems).toHaveLength(0);

        // 6. CHECK: Total item count should be 0 (since cart is empty)
        expect(result.current.cartItemCount).toBe(0);

        // 7. CHECK: Total price should be 0 (since cart is empty)
        expect(result.current.cartTotal).toBe(0);
    });

    test('should update item quantity', () => {
        // 1. Create a fake shopping cart (empty to start)
        const { result } = renderHook(() => useCart());

        // 2. Create a fake product to add
        const mockProduct = {
            id: 1,
            title: 'Test Product',
            price: 10.99,
            image: 'test/jpg'
        };

        // 3. Add product to cart with quantity pf 2
        act(() => {
            result.current.addToCart(mockProduct, 2);
        });

        // 4. Update the quanitity from 2 to 5 using the product ID (1)
        // (This simulates user changing quantity in cart, like with +/- buttons)
        act(() => {
            result.current.updateQuantity(1, 5);
        });

        // 5. CHECK: The item's quantity should now be 5 (not 2)
        expect(result.current.cartItems[0].quantity).toBe(5);

        // 6. CHECK: Total item count should be 5 (matches the quantity);
        expect(result.current.cartItemCount).toBe(5);
    });

    test('should remove item when quantity updated to 0', () => {
        // 1. Create a fake shopping cart (empty to start)
        const { result } = renderHook(() => useCart());

        // 2. Create a fake product to add
        const mockProduct = {
            id: 1,
            title: 'Test Product',
            price: 10.99,
            image: 'test.jpg'
        };

        // 3. Add the product t0 cart with quantity of 2
        act(() => {
            result.current.addToCart(mockProduct, 2);
        });

        // 4. Update the quantity to 0 using the product ID (1)
        // (This should be smart enough to remove the item entirely)
        act(() => {
            result.current.updateQuantity(1, 0);
        });

        // 5. CHECK: Cart should be empty (item removed when quantity = 0)
    });

    test('should clear all items from cart', () => {
        // 1. Create a fake shopping cart (empty to start)
        const { result } = renderHook(() => useCart());

        // 2. Create TWO different fake products
        const mockProduct1 = { id: 1, title: 'Product 1', price: 10, image: 'test1.jpg' };
        const mockProduct2 = { id: 1, title: 'Product 2', price: 20, image: 'test2.jpg' };

        // 3. Add BOTH products to cart (creating a cart with multiple items)
        act(() => {
            result.current.addToCart(mockProduct1, 1); // Product 1 x 1
            result.current.addToCart(mockProduct2, 2); // Product 2 x 2
        });

        // At this point: cart has 2 different products, total count = 3 items

        // 4. Clear the ENTIRE cart (remove everything at once)
        // (This simulates "Clear Cart" button functionality)
        act(() => {
            result.current.clearCart();
        });

        // 5. CHECK: Cart should be completely empty (no items)
        expect(result.current.cartItemCount).toBe(0);

        // 7. CHECK: Total price should be 0
        expect(result.current.cartTotal).toBe(0);
    });
})
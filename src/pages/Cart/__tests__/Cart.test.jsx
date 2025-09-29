import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Cart from '../Cart';

const mockCartItems = [
    {
        id: 1,
        title: 'Test Product 1',
        price: 10.99,
        image: 'test1.jpg',
        quantity: 2
    },
    {
        id: 2,
        title: 'Test Product 2',
        price: 20.99,
        image: 'test2.jpg',
        quantity: 1
    }
];

// SETUP: create fake functions to track if cart functions get called
const mockUpdateQuantity = vi.fn();
const mockRemoveFromCart = vi.fn();
const mockClearCart = vi.fn();

describe('Cart', () => {
    // SETUP: Before each est, reset all mock functions
    // (This prevents tests from interfering with each other)
    beforeEach(() => {
        mockUpdateQuantity.mockClear();
        mockRemoveFromCart.mockClear();
        mockClearCart.mockClear();
    });

    test('displays empty cart message when no items', () => {
        // 1. Render cart component with empty cart
        render(
            <Cart
                cartItems={[]} // Empty array = no items
                cartTotal={0}
                updateQuantity={mockUpdateQuantity}
                removeFromCart={mockRemoveFromCart}
                clearCart={mockClearCart}
            />
        );

        // 2. CHECK: Does it show empty cart message?
        expect(screen.getByText('Your cart is empty')).toBeInTheDocument();

        // 3. CHECK: Does it how "Continue Shopping" button
        expect(screen.getByText('Continue Shopping')).toBeInTheDocument();
    });

    test('displays cart items when items exist', () => {
        // 1. Render Cart component with 2 items
        render(
            <Cart
                cartItems={mockCartItems} // Has 2 items
                cartTotal={42.97}
                updateQuantity={mockUpdateQuantity}
                removeFromCart={mockRemoveFromCart}
                clearCart={mockClearCart}
            />
        );

        // 2. CHECK: Does first product appear?
        expect(screen.getByText('Test Product 1')).toBeInTheDocument();

        // 3. CHECK: Does secondproduct appear?
        expect(screen.getByText('Test Product 2')).toBeInTheDocument();

        // 4. CHECK: Does it show correct total item count (2 + 1 = 3 items)?
        expect(screen.getByText('3 items in your cart')).toBeInTheDocument();
    });

    test('displays correct order summary', () => {
        // 1. Render Cart component with items
        render(
            <Cart
                cartItems={mockCartItems}
                cartTotal={42.97}
                updateQuantity={mockUpdateQuantity}
                removeFromCart={mockUpdateQuantity}
                clearCart={mockClearCart}
            />
        );

        // 2. CHECK: Does subtotal show correct amount?
        expect(screen.getByText('$42.97')).toBeInTheDocument(); // Subtotal

        // 3. CHECK: Does shopping show as free?
        expect(screen.getByText('Free')).toBeInTheDocument(); // Shipping

        // CHECK: Does tax calculation show correct amount (8% of $42.97)?
        expect(screen.getByText('$3.44')).toBeInTheDocument() // Tax (8%)

        // 5. CHECK: Does final total include tax ($42.97 + $3.44)?
        expect(screen.getByText('$46.41')).toBeInTheDocument(); // Total with tax
    });

    test('calls clearCart when clear button clicked', async () => {
        // 1. Setup user interaction simulator
        const user = userEvent.setup();

        // 2. Render Cart component with items
        render(
            <Cart
                cartItems={mockCartItems}
                cartTotal={42.97}
                updateQuantity={mockUpdateQuantity}
                removeFromCart={mockRemoveFromCart}
                clearCart={mockClearCart}
            />
        );

        // 3. Find the "Clear Cart" button
        const clearButton = screen.getByText('Clear Cart');

        // 4. USER ACTION: Click the clear button
        await user.click(clearButton);

        // 5. CHECK: Was the clearCart function called exactly once?
        expect(mockClearCart).toHaveBeenCalledTimes(1);
    });
});
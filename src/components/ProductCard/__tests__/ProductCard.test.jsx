import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductCard from '../ProductCard';
// import { vi } from 'vitest';

// SETUP: Create fake data that all tests will use
const mockProduct = {
    id: 1,
    title: 'Test Product',
    price: 29.99,
    image: 'https://example.com/image.jpg',
    description: 'A test product',
    category: 'test'
};

// SETUP: Create a fake function to track if addToCart gets called
const mockAddToCart = vi.fn();

describe('ProductCard', () => {
    // SETUP: Before each test, reset the mock function
    // (This prevents tests from interfering with each other)
    beforeEach(() => {
        mockAddToCart.mockClear();
    });

    test('renders product information correctly', () => {
        // 1. Render the productCard component withour fake data
        render(
            <ProductCard
                product={mockProduct}
                addToCart={mockAddToCart}
                currentQuantity={0} // Item not in cart yet
            />
        );

        // 2. CHECK: Does the product title appear ob screen?
        expect(screen.getByText('Test Product')).toBeInTheDocument();

        // 3. CHECK: Does the price appear formatted correctly?
        expect(screen.getByText('$29.99')).toBeInTheDocument();

        // 4. CHECK: Does the image src and alt attributes?
        expect(screen.getByAltText('Test Product')).toHaveAttribute('src', mockProduct.image);
    });

    test('shows current quantity when item is in cart', () => {
        // 1. Render the ProductCard but this time item IS already in cart (quantity: 3)
        render(
            <ProductCard
                product={mockProduct}
                addToCart={mockAddToCart}
                currentQuantity={3} // Item already in cart with quantity 3
            />
        );

        // 2. CHECK: Does it show "In cart: 3" somewhere on the component?
        expect(screen.getByText('In cart: 3')).toBeInTheDocument();
    });

    test('allows quantity adjustment with buttons', async () => {
        // 1. Setup user interaction simulator
        const user = userEvent.setup();

        // 2. Render the ProductCard
        render(
            <ProductCard
                product={mockProduct}
                addToCart={mockAddToCart}
                currentQuantity={0}
            />
        );

        // 3. Find the quantity control elements (+ button, - button, input field)
        const incrementBtn = screen.getByText('+');
        const decrementBtn = screen.getByText('-');
        const quantityInput = screen.getByDisplayValue('1'); // Should start at 1

        // 4. TEST INCREMENT: Click + button
        await user.click(incrementBtn);
        expect(quantityInput).toHaveValue(2); // Should now show 2

        // 5. TEST DECREMENT: Click - button
        await user.click(decrementBtn);
        expect(quantityInput).toHaveValue(1); //Should go back to 1

        // 6. TEST MINIMUM LIMIT: Try to go below 1
        await user.click(decrementBtn);
        expect(quantityInput).toHaveValue(1); // Should stay at 1 (can't go to 0)
    });

    test('allows manual quantity input', async () => {
        // 1. Setup user interaction simulator
        const user = userEvent.setup();

        // 2. Render the ProjectCard
        render(
            <ProductCard
                product={mockProduct}
                addToCart={mockAddToCart}
                currentQuantity={0}
            />
        );

        // 3. Find the quantity input field
        const quantityInput = screen.getByDisplayValue('1');

        // 4. TEST MANUAL INPUT: Clear field and type new number
        await user.clear(quantityInput); // Clear the "1"
        await user.type(quantityInput, '5'); // Type "5"

        // 5. CHECK: Does the input now show 5?
        expect(quantityInput).toHaveValue(5);
    });

    test('calls addToCart with correct product and quantity', async () => {
        // 1. Setup user interaction simulator
        const user = userEvent.setup();

        // 2. Render the ProductCard
        render(
            <ProductCard
                product={mockProduct}
                addToCart={mockAddToCart}
                currentQuantity={0}
            />
        );

        // 3. Find the elements we need to interact with
        const addToCartBtn = screen.getByText('Add to Cart');
        const quantityInput = screen.getByDisplayValue('1');

        // 4. USER ACTION: Change quantity to 3
        await user.clear(quantityInput);
        await user.type(quantityInput, '3');

        // 5. USER ACTION: Click "Add to Cart" button
        await user.click(addToCartBtn);

        // 6. CHECK: Was the addToCart function called with the right arguments?
        expect(mockAddToCart).toHaveBeenCalledWith(mockProduct, 3);
    });

    test('resets quantity to 1 after adding to cart', async () => {
        // 1. Setup user interaction simulator
        const user = userEvent.setup();

        // 2. Render the ProductCard
        render(
            <ProductCard
                product={mockProduct}
                addToCart={mockAddToCart}
                currentQuantity={0}
            />
        );

        // 3. Find the elements we need
        const addToCartBtn = screen.getByText('Add to Cart');
        const quantityInput = screen.getByDisplayValue('1');

        // 4. USER ACTION: Change quantity to 3
        await user.clear(quantityInput);
        await user.type(quantityInput, '3');

        // 5. USER ACTION: Click "Add to Cart"
        await user.click(addToCartBtn);

        // 6. CHECK: After adding to cart, does quantity reset back to 1?
        //    (This is good UX - ready for user to add more if they want)
        expect(quantityInput).toHaveValue(1);
    });
});
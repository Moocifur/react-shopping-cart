import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navigation from '../Navigation';

// SETUP: Helper funtion to render with router
// (Navigation uses React Router links, so we need to wrap it in BrowserRouter)
const renderWithRouter = (component) => {
    return render(
        <BrowserRouter>
        {component}
        </BrowserRouter>
    );
};

describe('Navigation', () => {
    test('renders all navigation links', () => {
        // 1. Render the Navigation component with 0 items in cart
        renderWithRouter(<Navigation cartItemCount={0} />);

        // 2. CHECK: Does the logo/brand name appear?
        expect(screen.getByText('ShopCart')).toBeInTheDocument();

        // 3. CHECK: Does the Home Link appear?
        expect(screen.getByText('Home')).toBeInTheDocument();

        // 4. CHECK: Does the Shop Link appear?
        expect(screen.getByText('Shop')).toBeInTheDocument();

        // 5. CHECK: Does the Cart Link appear with correct count?
        expect(screen.getByText('Cart (0)')).toBeInTheDocument();
    });

    test('displays correct cart item count', () => {
        // 1. Render Navigation with 5 items in cart
        renderWithRouter(<Navigation cartItemCount={5} />);

        // 2. CHECK: Does the cart show the correct number (5)?
        expect(screen.getByText('Cart (5)')).toBeInTheDocument();
    });

    test('logo links to home page', () => {
        // 1. Render the Navigation component
        renderWithRouter(<Navigation cartItemCount={0} />);

        // 2. Find the logo text element
        const logoLink = screen.getByText('ShopCart');

        // 3. CHECK: Does clicking the logo take you to home page ("/")?
        expect(logoLink.closest('a')).toHaveAttribute('href', '/');
    });

    test('navigation links have correct hrefs', () => {
        // 1. Render the Navigation component
        renderWithRouter(<Navigation cartItemCount={0} />);

        // 2. CHECK: Does Home link go to correct URL?
        expect(screen.getByText('Home').closest('a')).toHaveAttribute('href', '/');

        // 3. CHECK: Does Shop link go to correct URL?
        expect(screen.getByText('Shop').closest('a')).toHaveAttribute('href', '/shop');

        //4. CHECK: Does Cart link go to correct URL?
        expect(screen.getByText('Cart (0)').closest('a')).toHaveAttribute('href', '/cart');
    })
})
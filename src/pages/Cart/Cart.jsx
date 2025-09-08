import CartItem from '../../components/CartItem/CartItem';
import styles from './Cart.module.css';

function Cart({ cartItems, cartTotal, updateQuantity, removeFromCart, clearCart }) {
    // to get total item quantity
    const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    
    // If the cart is empty, dom this
    if (cartItems.length === 0) {

    }
    return (
        <div className={styles.cart}>
            <h1>Shopping Cart</h1>
            <p>Cart cards go here i think</p>
        </div>
    );
}

export default Cart;
import CartItem from '../../components/CartItem/CartItem';
import styles from './Cart.module.css';

function Cart({ cartItems, cartTotal, updateQuantity, removeFromCart, clearCart }) {
    // to get total item quantity
    const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    
    // If the cart is empty, dom this
    if (cartItems.length === 0) {
        return (
            <div className={styles.cart}>
                <h1>Shopping Cart</h1>
                <div className={styles.emptyCart}>
                    <p>Your cart is empty</p>
                    <a href="/shop" className={styles.shopLink}>
                        Continue Shopping
                    </a>
                </div>
            </div>
        );
    }

    // If items do this
    return (
        <div className={styles.cart}>
            <h1>Shopping Cart</h1>

            <div className={styles.cartHeader}>
                <p className={styles.itemCount}>
                    {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
                </p>
                <button
                    onClick={clearCart}
                    className={styles.clearBtn}
                    type="button"
                >
                    Clear Cart
                </button>    
            </div>

            <div className={styles.cartContent}>

                {/* The Card Items Container */}
                <div className={styles.cartItems}>
                    {/* Make the Cards with the items */}
                    {cartItems.map(item => (
                        <CartItem
                            key={item.id}
                            item={item}
                            updateQuantity={updateQuantity}
                            removeFromCart={removeFromCart}
                        />
                    ))}
                </div>

                {/* Order Summary Card */}
                <div className={styles.cartSummary}>
                    <div className={styles.summaryCard}>
                        <h3>Order Summary</h3>

                        {/* Subtotal */}
                        <div className={styles.summaryRow}>
                            <span>Subtotal ({itemCount} items):</span>
                            <span>${cartTotal.toFixed(2)}</span>
                        </div>

                        {/* Shipping */}
                        <div className={styles.summaryRow}>
                            <span>Shipping:</span>
                            <span>Free</span>
                        </div>

                        {/* Tax */}
                        <div className={styles.summaryRow}>
                            <span>Tax:</span>
                            <span>${(cartTotal * 0.08).toFixed(2)}</span>
                        </div>

                        {/* Divider Line */}
                        <hr className={styles.divider} />

                        {/* The Total  */}
                        <div className={`${styles.summaryRow} ${styles.total}`}>
                            <span>Total:</span>
                            <span>${(cartTotal * 1.08).toFixed(2)}</span>
                        </div>

                        {/* Checkout Button */}
                        <button className={styles.checkoutBtn}>
                            Proceed to Checkout
                        </button>

                        {/* Continue Shopping */}
                        <a href="/shop" className={styles.continueShopping}>
                            Continue Shopping 
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
    
}

export default Cart;
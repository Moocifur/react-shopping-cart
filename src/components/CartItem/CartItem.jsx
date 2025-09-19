import { useState } from 'react';
import styles from './CartItem.module.css';

function CartItem({item, updateQuantity, removeFromCart }) {
    const [quantity, setQuantity] = useState(item.quantity);

    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value) || 1;
        setQuantity(newQuantity);
        updateQuantity(item.id, newQuantity);
    };

    const incrementQuantity = () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        updateQuantity(item.id, newQuantity);
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            updateQuantity(item.id, newQuantity);
        }
    };

    const handleRemove = () => {
        removeFromCart(item.id);
    };

    const itemTotal = (item.price * quantity).toFixed(2);

    return (
        <div className={styles.cartItem}>
            <div className={styles.imageContainer}>
                <img src={item.image} alt={item.title} className={styles.image} />
            </div>

            <div className={styles.details}>
                <h3 className={styles.title}>{item.title}</h3>
                <p className={styles.price}>{item.price.toFixed(2)} each</p>
            </div>

            <div className={styles.controls}>

                <div className={styles.quantityControls}>
                    <button onClick={decrementQuantity} className={styles.quantityBtn} disabled={quantity <= 1} type="button">-</button>
                    <input type="number" min="1" value={quantity} onChange={handleQuantityChange} className={styles.quantityInput}/>
                    <button onClick={incrementQuantity} className={styles.quantityBtn} type="button">+</button>
                </div>

                <div className={styles.itemTotal}>
                    Total: ${itemTotal}
                </div>
                <button onClick={handleRemove} className={styles.removeBtn} type="button">Remove</button>
            </div>
        </div>
    );
}

export default CartItem;
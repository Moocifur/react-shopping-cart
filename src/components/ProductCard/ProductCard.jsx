import { useState } from 'react';
import styles from './ProductCard.module.css';

function ProductCard({ product, addToCart, currentQuantity = 0 }) {
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (e) => {
        const value = e.target.value;
        
        // Allow empty input temporarily, but ensure minimum of 1
        if ( value === '' ) {
            setQuantity('');
            return;
        };

        const numericValue = parseInt(value);

        // Only set to 1 if it's actually invalid, not just empty
        if (isNaN(numericValue) || numericValue < 1) {
            setQuantity(1);
        } else {
            setQuantity(numericValue);
        }
    };

    const incrementQuantity = () => {
        setQuantity(prev => {
            // Handle case where prev might be empty string
            const current = prev === '' ? 0 : prev;
            return current + 1;
        });
    };

    const decrementQuantity = () => {
        setQuantity(prev => {
            // Handle case where prev might be empty string
            const current = prev === '' ? 1 : prev;
            return Math.max(1, current - 1);
        });
    };

    const handleAddToCart = () => {
        const qtyToAdd = quantity === '' || quantity < 1 ? 1 : quantity;
        addToCart(product, qtyToAdd);
        setQuantity(1); // reset Quantity after Adding
    };

    // Handle blur event - set to 1 if empty when user leave input
    const handleBlur = () => {
        if (quantity === '' || quantity < 1) {
            setQuantity(1);
        }
    }

    return (
        // The Card
        <div className={styles.card}>

            {/* Image */}
            <div className={styles.imageContainer}>
                <img src={product.image} alt={product.title} className={styles.image} />
            </div>

            {/* Cards Content */}
            <div className={styles.content}>
                <h3 className={styles.title}>{product.title}</h3>
                
                {/* Make sure its 2 decimals */}
                <p className={styles.price}>${product.price.toFixed(2)}</p>
                
                {/* If number is greater than 0, show tab */}
                {currentQuantity > 0 && (
                    <p className={styles.inCart}>In cart: {currentQuantity}</p>
                )}

                {/* -[]+ */}
                <div className={styles.controls}>
                    <div className={styles.quantityControls}>
                        <button onClick={decrementQuantity} className={styles.quantityBtn} type="button">-</button>
                        <input type="number" min="1" value={quantity} onChange={handleQuantityChange} onBlur={handleBlur} className={styles.quantityInput}/>
                        <button onClick={incrementQuantity} className={styles.quantityBtn} type="button">+</button>
                    </div>

                    <button onClick={handleAddToCart} className={styles.addToCartBtn}>Add to Cart</button>
                </div>

            </div>
        </div>
    )
}

export default ProductCard;
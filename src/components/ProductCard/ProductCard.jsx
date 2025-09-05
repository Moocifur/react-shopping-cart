import { useState } from 'react';
import styles from '/.ProductCard.module.css';

function ProductCard({ product, addToCart, currentQuantity = 0 }) {
    const [quantity, setQuantity] = useState(1);
}
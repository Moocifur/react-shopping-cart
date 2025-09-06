import { useState, useEffect } from 'react';
import { fakeStoreApi } from '../../services/fakeStoreApi';
import ProductCard from '../../components/ProductCard/ProductCard';
import styles from './Shop.module.css';

function Shop({ addToCart, getItemQuantity }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const productsData = await fakeStoreApi.getAllProducts();
        setProducts(productsData);
        setError(null);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className={styles.shop}>
        <div className={styles.loading}>Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.shop}>
        <div className={styles.error}>{error}</div>
      </div>
    );
  }

  return (
    <div className={styles.shop}>
      <h1>Our Products</h1>
      <div className={styles.productsGrid}>
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
            currentQuantity={getItemQuantity(product.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default Shop;
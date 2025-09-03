import styles from './Home.module.css';

function Home() {
    return (
        <div className={styles.home}>
            <h1>Welcome to Our Store</h1>
            <p>Discover amazing products at great prices!</p>
            
            <div className={styles.heroSection}>
                <h2>Featured Collections</h2>
                <p>Browse our carefully curated selection of products.</p>
            </div>
        </div>
    );
}

export default Home;
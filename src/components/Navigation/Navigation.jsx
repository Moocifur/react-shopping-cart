import { Link, NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

function Navigation({ cartItemCount = 0 }) {
    return (
        <nav className={styles.nav}>
            <div className={styles.navContainer}>

                {/* Logo - Left Side */}
                <Link to="/" className={styles.logo}>ShopCart</Link>

                {/* Navigation Links */}
                <div className={styles.navLink}>

                    <NavLink to="/" className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>
                        Home
                    </NavLink>
                    
                    <NavLink to="/shop" className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>
                        Shop
                    </NavLink>

                    <NavLink to="/cart" className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>
                        Cart ({cartItemCount})
                    </NavLink>

                </div>
            </div>
        </nav>
    );
}

export default Navigation;
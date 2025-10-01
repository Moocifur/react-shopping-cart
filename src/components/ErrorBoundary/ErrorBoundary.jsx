import { Component } from 'react';
import PropTypes from 'prop-types'
import styles from './ErrorBoundary.module.css';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error caught by boundry:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className={styles.errorBoundary}>
                    <h2>Oops! Something went wrong</h2>
                    <p>We're sorry, but something unexpected happened.</p>
                    <button
                        onClick={() => window.location.reload()}
                        className={styles.reloadButton}
                    >
                        Reload Page
                    </button>    
                </div>
            );
        }

        return this.props.children;
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.node.isRequired
};

export default ErrorBoundary;
import { Component } from 'react';
import PropTypes from 'prop-types'
import styles from './ErrorBoundry.module.css';

class ErrorBoundry extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDeriveStateFromError(error) {

    }

    componentDidCatch(error, errorInfo) {
        console.error('Error caught by boundry:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className={styles.errorBoundry}>
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

export default ErrorBoundry;
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useCart } from './hooks/useCart'
import Navigation from './components/Navigation/Navigation';
import Home from './pages/Home/Home';
import Shop from './pages/Shop/Shop';
import Cart from './pages/Cart/Cart'
import './App.css';

function App() {

  const {
    cartItems,
    cartItemCount,
    cartTotal,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getItemQuantity
  } = useCart();
  
  return (
    <Router>
      <div className="App">
        <Navigation cartItemCount={cartItemCount} />

        <main>
          <Routes>

            {/* Home Page */}
            <Route path="/" element={<Home />} />

            {/* Shop Page */}
            {/* Dropping it Down as props */}
            <Route path="/shop" element={<Shop addToCart={addToCart} getItemQuantity={getItemQuantity} />} />

            {/* Cart Page */}
            <Route path="/cart" element={<Cart cartItems={cartItems} cartTotal={cartTotal} updateQuantity={updateQuantity} removeFromCart={removeFromCart} clearCart={clearCart} />} />

          </Routes>
        </main>        
      </div>
    </Router>
  )
}

export default App

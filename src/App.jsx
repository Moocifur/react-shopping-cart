import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import Home from './pages/Home/Home';
import Shop from './pages/Shop/Shop';
import Cart from './pages/Cart/Cart'
import './App.css';

function App() {
  const cartItemCount = 0;
  
  return (
    <Router>
      <div className="App">
        <Navigation cartItemCount={cartItemCount} />

        <main>
          <Routes>

            {/* Home Page */}
            <Route path="/" element={<Home />} />

            {/* Shop Page */}
            <Route path="shop" element={<Shop />} />

            {/* Cart Page */}
            <Route path="cart" element={<Cart />} />

            Cart ({cartItemCount})
          </Routes>
        </main>        
      </div>
    </Router>
  )
}

export default App

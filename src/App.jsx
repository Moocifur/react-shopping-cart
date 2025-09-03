import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home/Home';
import Navigation from './components/Navigation/Navigation'
import './App.css'

function App() {
  const cartItemCount = 0;
  
  return (
    <Router>
      <div className="App">
        <Navigation cartItemCount={cartItemCount} />
        

        
      </div>
    </Router>
  )
}

export default App

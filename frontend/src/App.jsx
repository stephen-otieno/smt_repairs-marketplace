// frontend/src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CartDrawer from './components/CartDrawer';
import { CartProvider } from './context/CartContext';
import Checkout from './pages/Checkout';
import Admin from './pages/Admin';
import './App.css';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="app-container">
          <Navbar />
          <CartDrawer />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/admin" element={<Admin />} /> 
            </Routes>

          </main>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;


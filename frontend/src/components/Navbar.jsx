// frontend/src/components/Navbar.jsx
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import smtLogo from '../assets/image.png';


function Navbar() {
  const { cartCount, toggleCart } = useContext(CartContext);

  return (
    <nav className="navbar">
      <div className="nav-brand">
       <Link to="/" className="brand-link">
          <img src={smtLogo} alt="SMT Logo" className="brand-icon" />
          <span className="brand-text">SMT</span>
        </Link>
      </div>

      <div className="nav-search">
        <input type="text" placeholder="Search chargers, laptops, bulbs..." className="search-input" />
        <button className="search-btn">Search</button>
      </div>

      <div className="nav-links">
        <Link to="/admin" className="admin-link">Admin</Link>
        <div className="cart-container">
          <button className="cart-btn" onClick={toggleCart}>
            Cart <span className="cart-badge">{cartCount}</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
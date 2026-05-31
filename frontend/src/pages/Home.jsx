// frontend/src/pages/Home.jsx
import { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';

// Dummy data to simulate MongoDB records
const dummyProducts = [
  {
    _id: "1",
    title: "20W Fast Charger Type-C",
    category: "Chargers",
    originalPrice: 1500,
    currentPrice: 1300,
    image: "https://via.placeholder.com/200?text=Fast+Charger"
  },
  {
    _id: "2",
    title: "Wireless Bluetooth Earphones",
    category: "Earphones",
    originalPrice: 3500,
    currentPrice: 2800,
    image: "https://via.placeholder.com/200?text=Earphones"
  },
  {
    _id: "3",
    title: "4-Way Extension Socket",
    category: "Accessories",
    originalPrice: 1200,
    currentPrice: 950,
    image: "https://via.placeholder.com/200?text=Extension+Socket"
  },
  {
    _id: "4",
    title: "Smart LED Electric Bulb",
    category: "Lighting",
    originalPrice: 850,
    currentPrice: 600,
    image: "https://via.placeholder.com/200?text=Smart+Bulb"
  }
];

function Home() {
  const [products] = useState(dummyProducts);
  const { addToCart } = useContext(CartContext);

  return (
    <div className="home-page">
      <header className="home-header">
        <h2>Latest Electronics & Gadgets</h2>
        <div className="category-filters">
          <button className="filter-btn active">All</button>
          <button className="filter-btn">Chargers</button>
          <button className="filter-btn">Earphones</button>
          <button className="filter-btn">Lighting</button>
        </div>
      </header>

      <div className="product-grid">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <div className="image-container">
              <img src={product.image} alt={product.title} />
              <span className="category-tag">{product.category}</span>
            </div>

            <div className="product-info">
              <h3>{product.title}</h3>
              <div className="price-container">
                <span className="original-price">Ksh. {product.originalPrice}</span>
                <span className="current-price">Ksh. {product.currentPrice}</span>
              </div>
              <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
                Add to Cart
              </button>           
               </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
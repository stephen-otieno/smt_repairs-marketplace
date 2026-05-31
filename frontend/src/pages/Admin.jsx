// frontend/src/pages/Admin.jsx
import { useState } from 'react';

function Admin() {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Chargers',
    originalPrice: '',
    currentPrice: '',
    stock: '',
    image: ''
  });
  
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // TODO: Replace with Axios POST request when Node.js backend is ready
    // Example: await axios.post('http://localhost:5000/api/products', formData);
    
    console.log("Product Data Ready for Database:", formData);
    
    setStatusMessage(`Success! "${formData.title}" is ready to be added to the database.`);
    
    // Clear the form after simulated upload
    setFormData({
      title: '',
      category: 'Chargers',
      originalPrice: '',
      currentPrice: '',
      stock: '',
      image: ''
    });

    // Clear success message after 3 seconds
    setTimeout(() => setStatusMessage(''), 3000);
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h2>Admin Dashboard</h2>
        <p>Upload new electronic devices to the marketplace.</p>
      </div>

      <div className="admin-form-container">
        {statusMessage && <div className="status-message">{statusMessage}</div>}

        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-row">
            <div className="form-group half-width">
              <label>Product Title</label>
              <input 
                type="text" 
                name="title" 
                value={formData.title} 
                onChange={handleChange} 
                placeholder="e.g., 20W Fast Charger"
                required 
              />
            </div>
            
            <div className="form-group half-width">
              <label>Category</label>
              <select name="category" value={formData.category} onChange={handleChange} required>
                <option value="Chargers">Chargers</option>
                <option value="Earphones">Earphones</option>
                <option value="Lighting">Lighting</option>
                <option value="Smartphones">Smartphones</option>
                <option value="Laptops">Laptops</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group third-width">
              <label>Original Price (Ksh) [Was]</label>
              <input 
                type="number" 
                name="originalPrice" 
                value={formData.originalPrice} 
                onChange={handleChange} 
                placeholder="1500"
                required 
              />
            </div>

            <div className="form-group third-width">
              <label>Current Price (Ksh) [Now]</label>
              <input 
                type="number" 
                name="currentPrice" 
                value={formData.currentPrice} 
                onChange={handleChange} 
                placeholder="1300"
                required 
              />
            </div>

            <div className="form-group third-width">
              <label>Stock Quantity</label>
              <input 
                type="number" 
                name="stock" 
                value={formData.stock} 
                onChange={handleChange} 
                placeholder="50"
                required 
              />
            </div>
          </div>

          <div className="form-group">
            <label>Image URL</label>
            <input 
              type="text" 
              name="image" 
              value={formData.image} 
              onChange={handleChange} 
              placeholder="https://example.com/image.jpg"
              required 
            />
            <small className="help-text">For the MVP, provide a direct link to the product image.</small>
          </div>

          <button type="submit" className="upload-btn">Upload Product</button>
        </form>
      </div>
    </div>
  );
}

export default Admin;
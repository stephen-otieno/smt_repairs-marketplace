// frontend/src/pages/Checkout.jsx
import { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const { cartItems, cartTotal } = useContext(CartContext);
  const navigate = useNavigate();
  
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [paymentInitiated, setPaymentInitiated] = useState(false);

  // Format and validate Kenyan phone numbers for Safaricom Daraja API
  const formatPhoneNumber = (number) => {
    let formattedNumber = number.replace(/\s+/g, ''); // Remove spaces
    
    // Replace leading +254 or 0 with 254
    if (formattedNumber.startsWith('+254')) {
      formattedNumber = formattedNumber.substring(1);
    } else if (formattedNumber.startsWith('0')) {
      formattedNumber = '254' + formattedNumber.substring(1);
    }

    // Check if it matches Safaricom/Airtel format 2547... or 2541... and is 12 digits long
    const phoneRegex = /^254(7|1)\d{8}$/;
    if (!phoneRegex.test(formattedNumber)) {
      return null;
    }
    return formattedNumber;
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setError('');

    if (cartItems.length === 0) {
      setError('Your cart is empty.');
      return;
    }

    const validPhone = formatPhoneNumber(phone);
    if (!validPhone) {
      setError('Please enter a valid M-Pesa number (e.g., 0712345678 or 254712345678).');
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Replace this timeout with actual Axios POST request to your Express backend
      // Example: await axios.post('http://localhost:5000/api/mpesa/stkpush', { phone: validPhone, amount: cartTotal });
      
      console.log(`Initiating STK push to ${validPhone} for Ksh. ${cartTotal}`);
      
      // Simulating network request delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setPaymentInitiated(true);
      setIsLoading(false);
    } catch (err) {
      setError('Failed to initiate payment. Please try again.');
      setIsLoading(false);
    }
  };

  if (cartItems.length === 0 && !paymentInitiated) {
    return (
      <div className="empty-checkout">
        <h2>Your cart is empty</h2>
        <button onClick={() => navigate('/')} className="back-btn">Go Shopping</button>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-form-container">
        <h2>M-Pesa Checkout</h2>
        
        {paymentInitiated ? (
          <div className="success-message">
            <h3>Check your phone!</h3>
            <p>An M-Pesa PIN prompt has been sent to your phone. Please enter your PIN to complete the payment.</p>
            <p className="note">Once paid, your order will be confirmed automatically.</p>
          </div>
        ) : (
          <form onSubmit={handlePayment} className="checkout-form">
            <div className="form-group">
              <label>M-Pesa Phone Number</label>
              <input 
                type="text" 
                placeholder="e.g. 0712 345 678" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              {error && <p className="error-text">{error}</p>}
            </div>

            <button type="submit" className="pay-btn" disabled={isLoading}>
              {isLoading ? 'Initiating...' : `Pay Ksh. ${cartTotal}`}
            </button>
          </form>
        )}
      </div>

      <div className="order-summary">
        <h3>Order Summary</h3>
        <div className="summary-items">
          {cartItems.map(item => (
            <div key={item._id} className="summary-item">
              <span>{item.quantity}x {item.title}</span>
              <span>Ksh. {item.currentPrice * item.quantity}</span>
            </div>
          ))}
        </div>
        <div className="summary-total">
          <strong>Total to Pay</strong>
          <strong className="total-price">Ksh. {cartTotal}</strong>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
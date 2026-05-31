// frontend/src/components/CartDrawer.jsx
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

function CartDrawer() {
    const { cartItems, isCartOpen, toggleCart, updateQuantity, removeFromCart, cartTotal } = useContext(CartContext);
    const navigate = useNavigate();

    return (
        <>
            {/* Background Overlay */}
            <div className={`cart-overlay ${isCartOpen ? 'open' : ''}`} onClick={toggleCart}></div>

            {/* Side Drawer */}
            <div className={`cart-drawer ${isCartOpen ? 'open' : ''}`}>
                <div className="cart-header">
                    <h2>Your Cart</h2>
                    <button className="close-btn" onClick={toggleCart}>&times;</button>
                </div>

                <div className="cart-items">
                    {cartItems.length === 0 ? (
                        <p className="empty-cart">Your cart is empty.</p>
                    ) : (
                        cartItems.map(item => (
                            <div key={item._id} className="cart-item">
                                <img src={item.image} alt={item.title} />
                                <div className="item-details">
                                    <h4>{item.title}</h4>
                                    <p className="item-price">Ksh. {item.currentPrice}</p>
                                    <div className="quantity-controls">
                                        <button onClick={() => updateQuantity(item._id, -1)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item._id, 1)}>+</button>
                                    </div>
                                </div>
                                <button className="remove-btn" onClick={() => removeFromCart(item._id)}>Trash</button>
                            </div>
                        ))
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className="cart-footer">
                        <div className="cart-total">
                            <span>Total:</span>
                            <span>Ksh. {cartTotal}</span>
                        </div>
                        <button
                            className="checkout-btn"
                            onClick={() => {
                                toggleCart(); // Close the drawer
                                navigate('/checkout'); // Go to checkout page
                            }}
                        >
                            Proceed to Checkout
                        </button>          </div>
                )}
            </div>
        </>
    );
}

export default CartDrawer;
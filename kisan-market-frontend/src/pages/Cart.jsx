import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OrderService from "../services/OrderService";
import UserService from "../services/UserService";
import { getUser, updateUser } from "../utils/auth";
import {
  getCart,
  updateCartQuantity,
  removeFromCart,
  getCartTotal,
  clearCart,
} from "../utils/cart";
import DemoQR from "../components/DemoQR";
import "./Cart.css";

function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState(getCart());
  const [placing, setPlacing] = useState(false);
  const [deliveryLocation, setDeliveryLocation] = useState(
    getUser()?.deliveryLocation || ""
  );
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("offline");
  const [paid, setPaid] = useState(false);
  const [placedTotal, setPlacedTotal] = useState(null);

  const refresh = (updated) => {
    setCart(updated);
  };

  const handleQuantity = (productId, quantity) => {
    refresh(updateCartQuantity(productId, quantity));
  };

  const handleRemove = (productId) => {
    refresh(removeFromCart(productId));
  };

  const placeOrder = async () => {
    if (cart.length === 0) return;

    setPlacing(true);
    try {
      for (const item of cart) {
        await OrderService.placeOrder({
          productId: item.productId,
          quantity: item.quantity,
          deliveryLocation,
          paymentMethod: paymentMethod.toUpperCase(),
        });
      }

      if (getUser()) {
        UserService.updateProfile({ deliveryLocation })
          .then((response) => updateUser(response.data))
          .catch(() => {});
      }

      const total = getCartTotal();
      clearCart();
      setCart([]);
      setShowPayment(false);
      setPlacedTotal(total);
    } catch (error) {
      const message = error.response?.data?.message || "Order Failed";
      alert(message);
      setShowPayment(false);
    } finally {
      setPlacing(false);
    }
  };

  const total = getCartTotal();

  return (
    <div className="cart-container">
      <h1>🛒 My Cart</h1>

      {cart.length === 0 ? (
        <div className="cart-empty">
          <h2>Your cart is empty</h2>
          <button onClick={() => navigate("/products")}>
            Browse Products
          </button>
        </div>
      ) : (
        <>
          <div className="cart-list">
            {cart.map((item) => (
              <div className="cart-card" key={item.productId}>
                <img
                  src={item.imageUrl || "https://via.placeholder.com/80"}
                  alt={item.name}
                />

                <div className="cart-info">
                  <h2>{item.name}</h2>
                  <p>Price: ₹{item.price}/kg</p>
                  <p>
                    Subtotal: ₹
                    {(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>

                <div className="cart-actions">
                  <div className="qty-controls">
                    <button
                      onClick={() =>
                        handleQuantity(item.productId, item.quantity - 1)
                      }
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleQuantity(item.productId, item.quantity + 1)
                      }
                      disabled={item.quantity >= item.stock}
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="remove-btn"
                    onClick={() => handleRemove(item.productId)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="delivery-location">
              <label htmlFor="delivery-location">Delivery Location</label>
              <input
                id="delivery-location"
                type="text"
                placeholder="Village, District, City"
                value={deliveryLocation}
                onChange={(e) => setDeliveryLocation(e.target.value)}
              />
            </div>

            <h2>Total: ₹{total.toFixed(2)}</h2>
            <button
              onClick={() => {
                if (!deliveryLocation.trim()) {
                  alert("Please add a delivery location");
                  return;
                }
                setShowPayment(true);
              }}
              disabled={placing}
            >
              {placing ? "Placing Order..." : "Proceed to Payment"}
            </button>
            <button
              className="continue-btn"
              onClick={() => navigate("/products")}
            >
              Continue Shopping
            </button>
          </div>
        </>
      )}

      {showPayment && (
        <div className="modal-overlay" onClick={() => setShowPayment(false)}>
          <div
            className="modal-box"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Select Payment Method</h2>
            <p className="modal-total">Total: ₹{total.toFixed(2)}</p>

            <div className="payment-options">
              <button
                type="button"
                className={
                  paymentMethod === "offline"
                    ? "pay-option active"
                    : "pay-option"
                }
                onClick={() => {
                  setPaymentMethod("offline");
                  setPaid(false);
                }}
              >
                💵 Offline (Cash on Delivery)
              </button>

              <button
                type="button"
                className={
                  paymentMethod === "online"
                    ? "pay-option active"
                    : "pay-option"
                }
                onClick={() => {
                  setPaymentMethod("online");
                  setPaid(false);
                }}
              >
                📱 Online (UPI / Card)
              </button>
            </div>

            {paymentMethod === "online" && (
              <div className="demo-payment">
                <DemoQR value={`KM-CART-${total}`} />
                <p className="demo-hint">
                  Scan this QR with any UPI app to pay ₹{total.toFixed(2)}
                </p>
                <button
                  type="button"
                  className="simulate-btn"
                  onClick={() => setPaid(true)}
                >
                  I have completed the payment (Demo)
                </button>
                {paid && <p className="paid-note">✅ Payment Received</p>}
              </div>
            )}

            <div className="modal-actions">
              <button
                type="button"
                className="cancel-btn"
                onClick={() => setShowPayment(false)}
              >
                Cancel
              </button>

              <button
                type="button"
                className="confirm-btn"
                onClick={placeOrder}
                disabled={placing || (paymentMethod === "online" && !paid)}
              >
                {placing ? "Placing Order..." : "Place Order"}
              </button>
            </div>
          </div>
        </div>
      )}

      {placedTotal !== null && (
        <div className="modal-overlay" onClick={() => setPlacedTotal(null)}>
          <div
            className="success-box"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>✅ Order Placed Successfully!</h2>
            <p className="success-amount">
              Total Amount: ₹{placedTotal.toFixed(2)}
            </p>
            <button
              className="confirm-btn"
              onClick={() => navigate("/customer-orders")}
            >
              View My Orders
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;

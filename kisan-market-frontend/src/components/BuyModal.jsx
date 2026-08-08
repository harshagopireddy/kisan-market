import { useState } from "react";
import "./BuyModal.css";
import DemoQR from "./DemoQR";

function BuyModal({ product, defaultLocation, onConfirm, onClose }) {
  const [quantity, setQuantity] = useState(1);
  const [deliveryLocation, setDeliveryLocation] = useState(defaultLocation || "");
  const [paymentMethod, setPaymentMethod] = useState("offline");
  const [paid, setPaid] = useState(false);

  const decrease = () => setQuantity((q) => Math.max(1, q - 1));
  const increase = () => setQuantity((q) => Math.min(product.quantity, q + 1));

  const canConfirm = () =>
    deliveryLocation.trim() &&
    (paymentMethod === "offline" || paid);

  const handleConfirm = () => {
    onConfirm({ quantity, deliveryLocation, paymentMethod });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h2>{product.productName}</h2>

        <p className="modal-price">₹{product.price}/kg</p>

        <p className="modal-stock">
          Available: {product.quantity} kg
          {product.location ? ` • 📍 ${product.location}` : ""}
        </p>

        <p className="modal-contact">
          Contact Farmer: {product.farmerName || "Farmer"} —{" "}
          <a href={`tel:${product.contactNumber}`}>{product.contactNumber}</a>
        </p>

        <label className="modal-label">How much quantity do you need? (kg)</label>

        <div className="modal-qty">
          <button type="button" onClick={decrease} disabled={quantity <= 1}>
            −
          </button>

          <input
            type="number"
            min="1"
            max={product.quantity}
            value={quantity}
            onChange={(e) => {
              const val = parseInt(e.target.value, 10);
              if (!Number.isNaN(val)) {
                setQuantity(Math.min(Math.max(1, val), product.quantity));
              }
            }}
          />

          <button
            type="button"
            onClick={increase}
            disabled={quantity >= product.quantity}
          >
            +
          </button>
        </div>

        <label className="modal-label">Delivery Location</label>

        <input
          type="text"
          className="modal-input"
          placeholder="Village, District, City"
          value={deliveryLocation}
          onChange={(e) => setDeliveryLocation(e.target.value)}
        />

        <label className="modal-label">Payment Method</label>

        <div className="payment-options">
          <button
            type="button"
            className={
              paymentMethod === "offline" ? "pay-option active" : "pay-option"
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
              paymentMethod === "online" ? "pay-option active" : "pay-option"
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
            <DemoQR value={`KM-ORDER-${product.id}-${quantity}`} />
            <p className="demo-hint">
              Scan this QR with any UPI app to pay ₹
              {(product.price * quantity).toFixed(2)}
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

        <p className="modal-total">
          Total: ₹{(product.price * quantity).toFixed(2)}
        </p>

        <div className="modal-actions">
          <button type="button" className="cancel-btn" onClick={onClose}>
            Cancel
          </button>

          <button
            type="button"
            className="confirm-btn"
            onClick={handleConfirm}
            disabled={!canConfirm()}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default BuyModal;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser, updateUser, clearAuth } from "../../utils/auth";
import UserService from "../../services/UserService";
import "./CustomerDashboard.css";

function CustomerDashboard() {
    const navigate = useNavigate();

    const user = getUser();

    const [deliveryLocation, setDeliveryLocation] = useState(
        user?.deliveryLocation || ""
    );
    const [saving, setSaving] = useState(false);

    const logout = () => {
        clearAuth();
        navigate("/");
    };

    const saveDeliveryLocation = () => {
        if (!deliveryLocation.trim()) {
            alert("Please enter your delivery location");
            return;
        }

        setSaving(true);
        UserService.updateProfile({ deliveryLocation })
            .then((response) => {
                updateUser(response.data);
                alert("Delivery location saved!");
            })
            .catch(() => {
                alert("Failed to save delivery location");
            })
            .finally(() => setSaving(false));
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-card">
                <h1>
                    🛒 Customer Dashboard
                </h1>

                <h2>
                    Welcome {user?.name}
                </h2>

                <p>
                    Explore fresh products directly from farmers.
                </p>

                <div className="location-section">
                    <label htmlFor="delivery-location">My Delivery Location</label>
                    <input
                        id="delivery-location"
                        type="text"
                        placeholder="Village, District, City"
                        value={deliveryLocation}
                        onChange={(e) => setDeliveryLocation(e.target.value)}
                    />
                    <button onClick={saveDeliveryLocation} disabled={saving}>
                        {saving ? "Saving..." : "Save Location"}
                    </button>
                </div>

                <button
                    onClick={() => navigate("/products")}
                >
                    🔍 Browse Products
                </button>

                <button
                    onClick={() => navigate("/customer-orders")}
                >
                    📦 My Orders
                </button>

                <button
                    onClick={() => navigate("/cart")}
                >
                    🛒 My Cart
                </button>

                <button
                    onClick={logout}
                >
                    Logout
                </button>
            </div>
        </div>
    );
}

export default CustomerDashboard;

import { useEffect, useState } from "react";
import OrderService from "../../services/OrderService";
import { useLanguage } from "../../i18n/LanguageContext";
import LanguageToggle from "../../components/LanguageToggle";
import "./FarmerOrders.css";

function FarmerOrders() {
  const [orders, setOrders] = useState([]);
  const { t } = useLanguage();

  const refreshOrders = () => {
    OrderService.getOrders()
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    refreshOrders();
  }, []);

  const updateStatus = (id, status) => {
    OrderService.updateStatus(id, status)
      .then(() => {
        alert(t("statusUpdated"));
        refreshOrders();
      })
      .catch((error) => {
        const message = error.response?.data?.message || t("updateFailed");
        alert(message);
      });
  };

  return (
    <div className="orders-container">
      <LanguageToggle />
      <h1>{t("farmerOrders")} 🌾</h1>

      {orders.length === 0 ? (
        <h2>{t("noOrders")}</h2>
      ) : (
        orders.map((order) => (
          <div className="order-card" key={order.id}>
            <h2>{order.productName}</h2>

            <p>{t("buyer")} {order.buyerName}</p>

            <p>{t("email")} {order.buyerEmail}</p>

            {order.deliveryLocation && (
              <p>📍 {t("delivery")} {order.deliveryLocation}</p>
            )}

            <p>{t("quantityLabel")} {order.quantity}</p>

            <p>{t("totalPrice")} ₹{order.totalPrice}</p>

            {order.paymentMethod && (
              <p>
                {t("payment")}{" "}
                {order.paymentMethod === "ONLINE" ? t("online") : t("offlineCod")}
              </p>
            )}

            <h3>{t("status")} {order.status}</h3>

            {order.status === "PLACED" && (
              <button onClick={() => updateStatus(order.id, "ACCEPTED")}>
                {t("accept")}
              </button>
            )}

            {order.status === "ACCEPTED" && (
              <button
                onClick={() => updateStatus(order.id, "OUT FOR DELIVERY")}
              >
                {t("outForDelivery")}
              </button>
            )}

            {order.status === "OUT FOR DELIVERY" && (
              <button onClick={() => updateStatus(order.id, "DELIVERED")}>
                {t("delivered")}
              </button>
            )}

            {order.status === "DELIVERED" && (
              <p className="delivered-note">✅ {t("orderDelivered")}</p>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default FarmerOrders;

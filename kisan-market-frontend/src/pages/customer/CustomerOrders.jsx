import "./CustomerOrders.css";
import { useEffect, useState } from "react";
import OrderService from "../../services/OrderService";
import { getUser } from "../../utils/auth";

function CustomerOrders() {
  const [orders, setOrders] = useState([]);
  const user = getUser();

  useEffect(() => {
    if (!user) return;

    OrderService.getBuyerOrders(user.id)
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user]);

  return (
    <div className="customer-orders-container">
      <h1>My Orders 📦</h1>

      {orders.length === 0 ? (
        <h2>No Orders Found</h2>
      ) : (
        orders.map((order) => (
          <div className="customer-order-card" key={order.id}>
            <h2>{order.productName}</h2>

            <p>Quantity: {order.quantity} kg</p>

            <p>Total Price: ₹{order.totalPrice}</p>

            {order.paymentMethod && (
              <p>
                Payment:{" "}
                {order.paymentMethod === "ONLINE" ? "Online" : "Offline (COD)"}
              </p>
            )}

            <p>Order Date: {order.orderDate}</p>

            <h3>Status: {order.status}</h3>
          </div>
        ))
      )}
    </div>
  );
}

export default CustomerOrders;

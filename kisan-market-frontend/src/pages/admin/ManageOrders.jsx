import { useCallback, useEffect, useState } from "react";
import AdminService from "../../services/AdminService";
import "./ManageOrders.css";

function ManageOrders() {
  const [orders, setOrders] = useState([]);

  const loadOrders = useCallback(() => {
    AdminService.getOrders()
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  return (
    <div className="orders-container">
      <h2>Manage Orders</h2>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product</th>
            <th>Buyer Name</th>
            <th>Email</th>
            <th>Quantity</th>
            <th>Total Price</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.productName}</td>
              <td>{order.buyerName}</td>
              <td>{order.buyerEmail}</td>
              <td>{order.quantity}</td>
              <td>₹{order.totalPrice}</td>
              <td>{order.status}</td>
              <td>{order.orderDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageOrders;

import api from "./api";

class OrderService {
  placeOrder(order) {
    return api.post("/orders/place", order);
  }

  getOrders() {
    return api.get("/orders");
  }

  getBuyerOrders(buyerId) {
    return api.get(`/orders/buyer/${buyerId}`);
  }

  updateStatus(id, status) {
    return api.put(`/orders/status/${id}`, null, { params: { status } });
  }
}

export default new OrderService();

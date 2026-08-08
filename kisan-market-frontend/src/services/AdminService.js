import api from "./api";

class AdminService {
  getStats() {
    return api.get("/admin/stats");
  }

  getUsers() {
    return api.get("/admin/users");
  }

  deleteUser(id) {
    return api.delete(`/admin/users/${id}`);
  }

  getProducts() {
    return api.get("/admin/products");
  }

  deleteProduct(id) {
    return api.delete(`/admin/products/${id}`);
  }

  getOrders() {
    return api.get("/admin/orders");
  }
}

export default new AdminService();

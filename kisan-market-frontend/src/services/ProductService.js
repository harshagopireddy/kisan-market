import api from "./api";

class ProductService {
  addProduct(product) {
    return api.post("/products/add", product);
  }

  getAllProducts() {
    return api.get("/products");
  }

  getProductById(id) {
    return api.get(`/products/${id}`);
  }

  getProductsByFarmer(farmerId) {
    return api.get(`/products/farmer/${farmerId}`);
  }

  deleteProduct(id) {
    return api.delete(`/products/${id}`);
  }

  updateProduct(id, product) {
    return api.put(`/products/${id}`, product);
  }
}

export default new ProductService();

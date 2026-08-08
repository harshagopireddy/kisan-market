import { useCallback, useEffect, useState } from "react";
import AdminService from "../../services/AdminService";
import "./ManageProducts.css";

function ManageProducts() {
  const [products, setProducts] = useState([]);

  const loadProducts = useCallback(() => {
    AdminService.getProducts()
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const deleteProduct = (id) => {
    if (!window.confirm("Delete this product?")) return;

    AdminService.deleteProduct(id)
      .then(() => {
        loadProducts();
      })
      .catch((error) => {
        const message = error.response?.data?.message || "Delete failed";
        alert(message);
      });
  };

  return (
    <div className="products-container">
      <h2>Manage Products</h2>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Farmer</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.productName}</td>
              <td>{product.category}</td>
              <td>{product.quantity}</td>
              <td>₹{product.price}</td>
              <td>{product.farmerName}</td>
              <td>
                <button onClick={() => deleteProduct(product.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageProducts;

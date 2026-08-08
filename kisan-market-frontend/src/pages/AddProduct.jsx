import "./AddProduct.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductService from "../services/ProductService";
import { useLanguage } from "../i18n/LanguageContext";
import LanguageToggle from "../components/LanguageToggle";

function AddProduct() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [product, setProduct] = useState({
    productName: "",
    category: "",
    description: "",
    quantity: "",
    price: "",
    imageUrl: "",
    location: "",
    contactNumber: "",
  });

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    ProductService.addProduct(product)
      .then(() => {
        alert(t("addedSuccess"));
        navigate("/my-products");
      })
      .catch((error) => {
        const message = error.response?.data?.message || t("addFailed");
        alert(message);
      });
  };

  return (
    <div className="product-container">
      <LanguageToggle />
      <div className="product-card">
        <h1>🌾 {t("addProductTitle")}</h1>

        <form className="product-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="productName"
            placeholder={t("productName")}
            value={product.productName}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="category"
            placeholder={t("category")}
            value={product.category}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder={t("description")}
            value={product.description}
            onChange={handleChange}
          />

          <input
            type="number"
            name="quantity"
            placeholder={t("quantity")}
            value={product.quantity}
            onChange={handleChange}
            required
            min="1"
          />

          <input
            type="number"
            name="price"
            placeholder={t("pricePerKg")}
            value={product.price}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
          />

          <input
            type="text"
            name="imageUrl"
            placeholder={t("imageUrl")}
            value={product.imageUrl}
            onChange={handleChange}
          />

          <input
            type="text"
            name="location"
            placeholder={t("location")}
            value={product.location}
            onChange={handleChange}
          />

          <input
            type="tel"
            name="contactNumber"
            placeholder={t("mobileShown")}
            value={product.contactNumber}
            onChange={handleChange}
            pattern="[0-9+ -]{10,15}"
            title="Enter a valid mobile number (10-15 digits)"
            required
          />

          <button type="submit">{t("addProductBtn")}</button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;

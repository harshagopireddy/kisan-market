import "./EditProduct.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductService from "../../services/ProductService";
import { useLanguage } from "../../i18n/LanguageContext";
import LanguageToggle from "../../components/LanguageToggle";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [product, setProduct] = useState({
    productName: "",
    category: "",
    description: "",
    price: "",
    quantity: "",
    imageUrl: "",
    location: "",
    contactNumber: "",
  });

  useEffect(() => {
    ProductService.getProductById(id)
      .then((response) => {
        setProduct(response.data);
      })
      .catch(() => {
        alert(t("notFound"));
        navigate("/my-products");
      });
  }, [id, navigate, t]);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const updateProduct = (e) => {
    e.preventDefault();

    ProductService.updateProduct(id, product)
      .then(() => {
        alert(t("updatedSuccess"));
        navigate("/my-products");
      })
      .catch((error) => {
        const message = error.response?.data?.message || t("updateFailed");
        alert(message);
      });
  };

  return (
    <div className="edit-container">
      <LanguageToggle />
      <div className="edit-card">
        <h1>✏️ {t("editTitle")}</h1>

        <form onSubmit={updateProduct}>
          <input
            type="text"
            name="productName"
            value={product.productName}
            onChange={handleChange}
            placeholder={t("productName")}
          />

          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleChange}
            placeholder={t("categoryShort")}
          />

          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder={t("descShort")}
          />

          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder={t("priceShort")}
            min="0"
            step="0.01"
          />

          <input
            type="number"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            placeholder={t("quantityShort")}
            min="0"
          />

          <input
            type="text"
            name="imageUrl"
            value={product.imageUrl}
            onChange={handleChange}
            placeholder={t("imageUrl")}
          />

          <input
            type="text"
            name="location"
            value={product.location}
            onChange={handleChange}
            placeholder={t("locationShort")}
          />

          <input
            type="tel"
            name="contactNumber"
            value={product.contactNumber}
            onChange={handleChange}
            placeholder={t("mobileShort")}
          />

          <button type="submit">{t("updateBtn")}</button>
        </form>
      </div>
    </div>
  );
}

export default EditProduct;

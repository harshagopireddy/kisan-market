import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductService from "../../services/ProductService";
import { getUser } from "../../utils/auth";
import { useLanguage } from "../../i18n/LanguageContext";
import LanguageToggle from "../../components/LanguageToggle";
import "./MyProducts.css";

function MyProducts() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const user = getUser();
  const { t } = useLanguage();

  const loadProducts = useCallback(() => {
    if (!user) return;

    ProductService.getProductsByFarmer(user.id)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const deleteProduct = (id) => {
    if (window.confirm(t("deleteConfirm"))) {
      ProductService.deleteProduct(id)
        .then(() => {
          alert(t("deleteSuccess"));
          loadProducts();
        })
        .catch((error) => {
          const message = error.response?.data?.message || t("deleteFailed");
          alert(message);
        });
    }
  };

  return (
    <div className="my-products-container">
      <LanguageToggle />
      <h1>🌾 {t("myProductsTitle")}</h1>

      <div className="product-list">
        {products.length === 0 ? (
          <h2>{t("noProducts")}</h2>
        ) : (
          products.map((product) => (
            <div className="product-card" key={product.id}>
              <img
                src={product.imageUrl || "https://via.placeholder.com/250"}
                alt={product.productName}
              />

              <h2>{product.productName}</h2>

              <p>{t("categoryLabel")} {product.category}</p>

              <p>{t("priceLabel")} ₹{product.price}{t("perKg")}</p>

              <p>{t("quantityLabel")} {product.quantity} {t("kg")}</p>

              {product.location && <p>📍 {product.location}</p>}

              <button onClick={() => navigate(`/edit-product/${product.id}`)}>
                ✏️ {t("edit")}
              </button>

              <button onClick={() => deleteProduct(product.id)}>
                🗑 {t("delete")}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MyProducts;

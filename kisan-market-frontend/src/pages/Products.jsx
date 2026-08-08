import "./Products.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductService from "../services/ProductService";
import OrderService from "../services/OrderService";
import { getUser } from "../utils/auth";
import { addToCart, getCartCount } from "../utils/cart";
import BuyModal from "../components/BuyModal";

function Products() {
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(getCartCount());
  const [buyProduct, setBuyProduct] = useState(null);
  const [search, setSearch] = useState("");
  const [placedAmount, setPlacedAmount] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    ProductService.getAllProducts()
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const filteredProducts = products.filter((product) => {
    const term = search.trim().toLowerCase();
    if (!term) return true;
    return (
      product.productName?.toLowerCase().includes(term) ||
      product.category?.toLowerCase().includes(term)
    );
  });

  const requireLogin = () => {
    if (!getUser()) {
      alert("Please login to buy products");
      navigate("/");
      return false;
    }
    return true;
  };

  const handleBuyClick = (product) => {
    if (!requireLogin()) return;

    if (product.quantity <= 0) {
      alert("This product is out of stock");
      return;
    }

    setBuyProduct(product);
  };

  const confirmBuy = (orderDetails) => {
    OrderService.placeOrder({
      productId: buyProduct.id,
      quantity: orderDetails.quantity,
      deliveryLocation: orderDetails.deliveryLocation,
      paymentMethod: orderDetails.paymentMethod || "OFFLINE",
    })
      .then(() => {
        setPlacedAmount(buyProduct.price * orderDetails.quantity);
        addToCart(buyProduct, orderDetails.quantity);
        setCartCount(getCartCount());
        setBuyProduct(null);
        ProductService.getAllProducts().then((response) => {
          setProducts(response.data);
        });
      })
      .catch((error) => {
        const message = error.response?.data?.message || "Order Failed";
        alert(message);
      });
  };

  const addToCartHandler = (product) => {
    if (!requireLogin()) return;

    if (product.quantity <= 0) {
      alert("This product is out of stock");
      return;
    }

    addToCart(product);
    setCartCount(getCartCount());
    alert("Added to Cart!");
  };

  return (
    <div className="products-container">
      <div className="products-header">
        <h1>Available Products 🛒</h1>

        <div className="header-actions">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={() => setSearch(search)}>🔍 Search</button>
          </div>

          <button className="cart-link" onClick={() => navigate("/cart")}>
            🛒 Cart ({cartCount})
          </button>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <p className="no-products">No products found for "{search}"</p>
      ) : (
        <div className="product-list">
          {filteredProducts.map((product) => (
          <div className="product-card" key={product.id}>
            <img
              src={product.imageUrl || "https://via.placeholder.com/200"}
              alt={product.productName}
            />

            <h2>{product.productName}</h2>

            <p>Category: {product.category}</p>

            <p>Price: ₹{product.price}/kg</p>

            <p>Quantity: {product.quantity} kg</p>

            {product.location && <p>📍 {product.location}</p>}

            {product.contactNumber && (
              <p>
                📞{" "}
                <a href={`tel:${product.contactNumber}`}>
                  {product.contactNumber}
                </a>
              </p>
            )}

            <button onClick={() => addToCartHandler(product)}>
              Add to Cart
            </button>

            <button onClick={() => handleBuyClick(product)}>Buy Now</button>
          </div>
        ))}
      </div>
      )}

      {buyProduct && (
        <BuyModal
          product={buyProduct}
          defaultLocation={getUser()?.deliveryLocation}
          onConfirm={confirmBuy}
          onClose={() => setBuyProduct(null)}
        />
      )}

      {placedAmount !== null && (
        <div className="modal-overlay" onClick={() => setPlacedAmount(null)}>
          <div
            className="success-box"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>✅ Order Placed Successfully!</h2>
            <p className="success-amount">
              Total Amount: ₹{placedAmount.toFixed(2)}
            </p>
            <button
              className="confirm-btn"
              onClick={() => setPlacedAmount(null)}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;

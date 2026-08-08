import { useNavigate } from "react-router-dom";
import { getUser } from "../../utils/auth";
import { useLanguage } from "../../i18n/LanguageContext";
import LanguageToggle from "../../components/LanguageToggle";
import "./FarmerDashboard.css";

function FarmerDashboard() {

    const navigate = useNavigate();
    const { t } = useLanguage();
    const user = getUser();

    const logout = () => {
        localStorage.removeItem("auth");
        navigate("/");
    };

    return (
        <div className="dashboard-container">
            <LanguageToggle />
            <div className="dashboard-card">

                <h1>🌾 {t("farmerDashboard")}</h1>

                <h2>{t("welcome")} {user?.name}</h2>

                <p>{t("manageProducts")}</p>

                <button onClick={() => navigate("/add-product")}>
                    ➕ {t("addProduct")}
                </button>

                <button onClick={() => navigate("/my-products")}>
                    📦 {t("myProducts")}
                </button>

                <button onClick={() => navigate("/farmer-orders")}>
                    📋 {t("myOrders")}
                </button>

                <button onClick={logout}>
                    {t("logout")}
                </button>

            </div>
        </div>
    );
}

export default FarmerDashboard;

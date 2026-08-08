import "./Login.css";
import logo from "../assets/Logos/logo.png";
import { FaEnvelope, FaLock, FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import UserService from "../services/UserService";
import { setAuth } from "../utils/auth";
import { useLanguage } from "../i18n/LanguageContext";
import LanguageToggle from "../components/LanguageToggle";

function Login() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await UserService.login(loginData);
      const auth = response.data;

      if (auth?.user) {
        setAuth(auth);

        const role = auth.user.role;
        if (role === "FARMER") navigate("/farmer-dashboard");
        else if (role === "CUSTOMER") navigate("/customer-dashboard");
        else if (role === "ADMIN") navigate("/admin-dashboard");
        else navigate("/products");
      }
    } catch (error) {
      const message = error.response?.data?.message || "Invalid Email or Password";
      alert(message);
    }
  };

  return (
    <div className="login-container">
      <LanguageToggle />
      <div className="login-card">
        <img src={logo} alt="Logo" className="logo" />

        <h1>{t("loginTitle")}</h1>
        <p className="subtitle">{t("loginSubtitle")}</p>

        <form className="login-form" onSubmit={handleLogin}>
          <div className="input-box">
            <FaEnvelope className="icon" />
            <input
              type="email"
              name="email"
              placeholder={t("emailPlaceholder")}
              value={loginData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-box">
            <FaLock className="icon" />
            <input
              type="password"
              name="password"
              placeholder={t("passwordPlaceholder")}
              value={loginData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button className="login-btn" type="submit">
            <FaSignInAlt className="btn-icon" /> {t("loginBtn")}
          </button>
        </form>

        <p className="register-text">{t("newHere")}</p>
        <Link to="/register" className="register-btn-link">
          <FaUserPlus className="btn-icon" /> {t("createAccount")}
        </Link>

        <p className="home-text">
          <Link to="/">{t("backHome")}</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;

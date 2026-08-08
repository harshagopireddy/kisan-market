import "./Register.css";
import logo from "../assets/Logos/logo.png";
import { FaUser, FaEnvelope, FaPhone, FaLock, FaUserTag, FaCheckCircle, FaSignInAlt, FaHome, FaUserPlus } from "react-icons/fa";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserService from "../services/UserService";
import { useLanguage } from "../i18n/LanguageContext";
import LanguageToggle from "../components/LanguageToggle";

function Register() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "FARMER",
  });
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await UserService.register(user);
      setSuccess(true);
    } catch (error) {
      const message = error.response?.data?.message || "Registration Failed";
      alert(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="register-container">
      <LanguageToggle />
      {success ? (
        <div className="register-card success-card">
          <FaCheckCircle className="success-icon" />
          <h1>{t("successTitle")}</h1>
          <p className="subtitle">
            {t("successMsg")}
          </p>

          <button className="register-success-btn" onClick={() => navigate("/login")}>
            <FaSignInAlt /> {t("loginNow")}
          </button>

          <button className="register-home-btn" onClick={() => navigate("/")}>
            <FaHome /> {t("backHome")}
          </button>
        </div>
      ) : (
        <div className="register-card">
          <img src={logo} alt="Logo" className="logo" />

          <h1>{t("createAccountTitle")}</h1>
          <p className="subtitle">{t("registerSubtitle")}</p>

          <form className="register-form" onSubmit={handleRegister}>
            <div className="input-box">
              <FaUser className="icon" />
              <input
                type="text"
                name="name"
                placeholder={t("fullName")}
                value={user.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-box">
              <FaEnvelope className="icon" />
              <input
                type="email"
                name="email"
                placeholder={t("emailAddress")}
                value={user.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-box">
              <FaPhone className="icon" />
              <input
                type="tel"
                name="phone"
                placeholder={t("mobileNumber")}
                value={user.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-box">
              <FaLock className="icon" />
              <input
                type="password"
                name="password"
                placeholder={t("passwordHint")}
                value={user.password}
                onChange={handleChange}
                required
                minLength={8}
              />
            </div>

            <div className="input-box">
              <FaUserTag className="icon" />
              <select name="role" value={user.role} onChange={handleChange}>
                <option value="FARMER">{t("roleFarmer")}</option>
                <option value="CUSTOMER">{t("roleCustomer")}</option>
              </select>
            </div>

            <button type="submit" className="register-btn" disabled={submitting}>
              <FaUserPlus /> {submitting ? t("creating") : t("createAccount")}
            </button>
          </form>

          <p className="login-text">
            {t("haveAccount")} <Link to="/login">{t("login")}</Link>
          </p>

          <p className="home-text">
            <Link to="/">{t("backHome")}</Link>
          </p>
        </div>
      )}
    </div>
  );
}

export default Register;

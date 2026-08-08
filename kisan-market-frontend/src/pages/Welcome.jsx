import "./Welcome.css";
import logo from "../assets/Logos/logo.png";
import heroBg from "../assets/backgrounds/hero-bg.jpg";
import farmer1 from "../assets/Farmer Images/farmer1.jpg";
import farmer2 from "../assets/Farmer Images/farmer2.jpg";
import farmer3 from "../assets/Farmer Images/farmer3.jpg";
import {
  FaSeedling,
  FaHandshake,
  FaTruckFast,
  FaLeaf,
  FaArrowRight,
} from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useLanguage } from "../i18n/LanguageContext";
import LanguageToggle from "../components/LanguageToggle";

function Welcome() {
  const { t } = useLanguage();

  const features = [
    {
      icon: <FaSeedling />,
      title: t("feature1Title"),
      desc: t("feature1Desc"),
    },
    {
      icon: <FaHandshake />,
      title: t("feature2Title"),
      desc: t("feature2Desc"),
    },
    {
      icon: <FaTruckFast />,
      title: t("feature3Title"),
      desc: t("feature3Desc"),
    },
  ];

  const farmers = [
    { src: farmer1, name: t("farmer1Name"), crop: t("farmer1Crop") },
    { src: farmer2, name: t("farmer2Name"), crop: t("farmer2Crop") },
    { src: farmer3, name: t("farmer3Name"), crop: t("farmer3Crop") },
  ];

  return (
    <div className="welcome-page">
      <nav className="welcome-nav">
        <div className="nav-brand">
          <img src={logo} alt="Kisan Market Logo" />
          <span>{t("navBrand")}</span>
        </div>
        <div className="nav-actions">
          <LanguageToggle inNav />
          <Link to="/login" className="nav-link">
            {t("login")}
          </Link>
          <Link to="/register" className="nav-register-btn">
            {t("register")}
          </Link>
        </div>
      </nav>

      <section className="hero">
        <img src={heroBg} alt="Farm field" className="hero-bg" />
        <div className="hero-overlay" />
        <div className="hero-content">
          <span className="hero-badge">
            <FaLeaf /> {t("badge")}
          </span>
          <h1>
            {t("heroTitle1")}
            <br />
            {t("heroTitle2")} <span className="highlight">{t("heroTitleYou")}</span>
          </h1>
          <p className="hero-desc">{t("heroDesc")}</p>
          <div className="hero-buttons">
            <Link to="/register" className="btn btn-primary">
              {t("createAccount")} <FaArrowRight />
            </Link>
            <Link to="/login" className="btn btn-secondary">
              {t("login")}
            </Link>
          </div>
        </div>
      </section>

      <section className="features">
        <h2>{t("whyTitle")}</h2>
        <p className="section-sub">{t("whySub")}</p>
        <div className="feature-grid">
          {features.map((feature, index) => (
            <div className="feature-card" key={index}>
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="farmers-section">
        <h2>{t("farmersTitle")}</h2>
        <p className="section-sub">{t("farmersSub")}</p>
        <div className="farmer-grid">
          {farmers.map((farmer, index) => (
            <div className="farmer-card" key={index}>
              <img src={farmer.src} alt={farmer.name} />
              <div className="farmer-info">
                <h3>{farmer.name}</h3>
                <p>{farmer.crop}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-banner">
        <h2>{t("ctaTitle")}</h2>
        <p>{t("ctaDesc")}</p>
        <div className="cta-buttons">
          <Link to="/register" className="btn btn-primary">
            {t("registerNow")} <FaArrowRight />
          </Link>
          <Link to="/login" className="btn btn-outline-light">
            {t("login")}
          </Link>
        </div>
      </section>

      <footer className="welcome-footer">
        <p>
          &copy; {new Date().getFullYear()} {t("footer")}
        </p>
      </footer>
    </div>
  );
}

export default Welcome;

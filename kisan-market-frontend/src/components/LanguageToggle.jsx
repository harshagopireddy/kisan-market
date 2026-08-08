import { useEffect, useRef, useState } from "react";
import { FaGlobe } from "react-icons/fa";
import { useLanguage } from "../i18n/LanguageContext";
import "./LanguageToggle.css";

const languages = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिंदी" },
  { code: "te", label: "తెలుగు" },
];

function LanguageToggle({ inNav = false }) {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const current = languages.find((l) => l.code === lang) || languages[0];

  return (
    <div className={inNav ? "lang-toggle in-nav" : "lang-toggle"} ref={ref}>
      <button
        className="lang-toggle-btn"
        onClick={() => setOpen(!open)}
        type="button"
      >
        <FaGlobe className="lang-globe" />
        <span>{current.label}</span>
      </button>

      {open && (
        <div className="lang-menu">
          {languages.map((l) => (
            <button
              key={l.code}
              className={
                l.code === lang ? "lang-option active" : "lang-option"
              }
              onClick={() => {
                setLang(l.code);
                setOpen(false);
              }}
              type="button"
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default LanguageToggle;

import React, { useState } from "react";
import scss from "./Register.module.scss";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useMain } from "../../../context/MainContext";

const API_URL = "https://69653e01e8ce952ce1f49d37.mockapi.io/user";

const Register = () => {
  const { t } = useMain();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!name || !email || !password) {
      alert(t("register_alert_fill"));
      return;
    }

    const newUser = {
      name,
      email,
      password,
      createdAt: new Date().toISOString(),
    };

    setLoading(true);
    try {
      await axios.post(API_URL, newUser);
      alert(t("register_alert_success"));
      navigate("/login");
    } catch (error) {
      console.error("Register error:", error);
      alert(t("register_alert_error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={scss.wrapper}>
      <div className={scss.card}>
        <h1>{t("register_title")}</h1>
        <p className={scss.subtitle}>
          {loading ? t("register_subtitle_loading") : t("register_subtitle")}
        </p>

        <div className={scss.formGroup}>
          <label>{t("register_full_name")}</label>
          <input
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className={scss.formGroup}>
          <label>{t("register_email")}</label>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className={scss.formGroup}>
          <label>{t("register_password")}</label>
          <input
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
        </div>

        <button
          className={scss.button}
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? t("register_button_loading") : t("register_button")}
        </button>

        <p className={scss.loginText}>
          {t("register_have_account")} <NavLink to="/login">{t("register_login_link")}</NavLink>
        </p>
      </div>
    </div>
  );
};

export default Register;

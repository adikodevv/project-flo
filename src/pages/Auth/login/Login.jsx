import React, { useState } from "react";
import scss from "./Login.module.scss";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useMain } from "../../../context/MainContext";

const API_URL = "https://69653e01e8ce952ce1f49d37.mockapi.io/user";

const Login = () => {
  const { t } = useMain();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert(t("login_alert_fill"));
      return;
    }

    setLoading(true);
    try {
      const { data: users } = await axios.get(API_URL);
      const user = users.find((u) => u.email === email && u.password === password);

      if (!user) {
        alert(t("login_alert_invalid"));
        return;
      }

      if (user.email === "admin@gmail.com") {
        alert(t("login_alert_admin_welcome", { name: user.name || "Admin" }));
        localStorage.setItem("isAuth", "true");
        navigate("/admin");
        return;
      }

      alert(t("login_alert_admin_only"));
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      alert(t("login_alert_server"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={scss.login_container}>
      <div className={scss.login}>
        <h1>{t("login_title")}</h1>
        <h3>{loading ? t("login_loading") : t("login_welcome")}</h3>

        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />

        <input
          type="password"
          placeholder="******"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />

        <button onClick={handleLogin} disabled={loading}>
          {loading ? t("login_button_loading") : t("login_button")}
        </button>

        <NavLink to="/register">
          <button type="button" className={scss.register_btn}>
            {t("login_no_account")}
            <span> {t("login_register_link")}</span>
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default Login;

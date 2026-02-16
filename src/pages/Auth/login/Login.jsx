import React, { useState } from "react";
import scss from "./Login.module.scss";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "https://69653e01e8ce952ce1f49d37.mockapi.io/user";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Состояние загрузки

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      return alert("Заполните все поля!");
    }

    setLoading(true);
    try {
      // 1. Получаем список всех пользователей из API
      const { data: users } = await axios.get(API_URL);

      // 2. Ищем пользователя, у которого совпадают email и password
      const user = users.find(
        (u) => u.email === email && u.password === password,
      );

      if (user) {
        // Проверяем, является ли он админом (если в API есть поле role или по email)
        if (user.email === "admin@gmail.com") {
          alert(`Добро пожаловать, Админ ${user.name}!`);
          localStorage.setItem("isAuth", "true"); // Сохраняем статус входа
          navigate("/admin");
        } else {
          alert("У вас нет прав администратора");
          navigate("/"); // Обычных пользователей отправляем на главную
        }
      } else {
        alert("Неверный email или пароль!");
      }
    } catch (error) {
      console.error("Ошибка при входе:", error);
      alert("Ошибка соединения с сервером");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={scss.login_container}>
      <div className={scss.login}>
        <h1>ВХОД</h1>
        <h3>{loading ? "Загрузка..." : "Добро пожаловать!"}</h3>

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
          {loading ? "Входим..." : "Войти"}
        </button>

        <NavLink to="/register">
          <button type="button" className={scss.register_btn}>
            Нет аккаунта?<span> Регистрация</span>
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default Login;

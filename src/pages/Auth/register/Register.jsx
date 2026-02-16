import React, { useState } from "react";
import scss from "./Register.module.scss";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "https://69653e01e8ce952ce1f49d37.mockapi.io/user";

const Register = () => {
  // 1. Создаем стейты для всех полей
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // 2. Функция регистрации
  const handleRegister = async () => {
    // Простейшая валидация
    if (!name || !email || !password) {
      return alert("Пожалуйста, заполните все поля!");
    }

    const newUser = {
      name,
      email,
      password,
      createdAt: new Date().toISOString(), // Добавим дату для порядка
    };

    setLoading(true);
    try {
      await axios.post(API_URL, newUser);

      alert("Регистрация прошла успешно!");
      navigate("/login"); // После регистрации отправляем на логин
    } catch (error) {
      console.error("Ошибка при регистрации:", error);
      alert("Произошла ошибка при создании аккаунта.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={scss.wrapper}>
      <div className={scss.card}>
        <h1>Регистрация</h1>
        <p className={scss.subtitle}>
          {loading ? "Создаем аккаунт..." : "Создайте свой аккаунт"}
        </p>

        <div className={scss.formGroup}>
          <label>Полное имя</label>
          <input
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className={scss.formGroup}>
          <label>Email</label>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className={scss.formGroup}>
          <label>Пароль</label>
          <input
            type="password"
            placeholder="••••••••"
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
          {loading ? "Загрузка..." : "Зарегистрироваться"}
        </button>

        <p className={scss.loginText}>
          Уже есть аккаунт? <NavLink to="/login">Войти</NavLink>
        </p>
      </div>
    </div>
  );
};

export default Register;

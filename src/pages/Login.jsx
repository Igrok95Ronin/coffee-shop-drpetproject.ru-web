// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

// Функция для форматирования номера, аналогичная предыдущему примеру
function formatPhoneNumber(phone) {
  let cleaned = phone.trim();
  if (cleaned.startsWith("+")) {
    cleaned = cleaned.slice(1);
  }
  if (cleaned.startsWith("8")) {
    cleaned = "7" + cleaned.slice(1);
  }
  return cleaned;
}

function Login({ setIsAuth }) {
  const navigate = useNavigate();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Очистка ошибки перед проверками

    // 1. Убираем лишние пробелы/табы
    const trimmedPhone = phoneNumber.trim();
    const trimmedPassword = password.trim();

    // 2. Форматируем номер
    const formattedPhone = formatPhoneNumber(trimmedPhone);

    // --- Проверки для номера телефона ---
    if (!formattedPhone) {
      setErrorMessage("Номер телефона не должен быть пустым");
      return;
    }
    if (!/^\d+$/.test(formattedPhone)) {
      setErrorMessage("Номер телефона может содержать только цифры");
      return;
    }
    if (formattedPhone.length < 10 || formattedPhone.length > 11) {
      setErrorMessage("Некорректная длина номера. Ожидается 10 или 11 цифр");
      return;
    }

    // --- Проверки для пароля ---
    // Только латинские буквы и цифры, минимум 6 символов
    if (!/^[A-Za-z0-9]{6,}$/.test(trimmedPassword)) {
      setErrorMessage("Пароль должен быть не короче 6 символов и содержать только латинские буквы и цифры");
      return;
    }

    try {
      const response = await api.post("/login", {
        phoneNumber: formattedPhone,
        password: trimmedPassword,
      });
      console.log(response.data);

      setIsAuth(true);
      navigate("/protected1");
    } catch (error) {
      console.error("Ошибка при логине:", error);
      setErrorMessage(error.response?.data?.error?.message || error.response?.data?.message || "Неизвестная ошибка");
    }
  };

  return (
    <div>
      <h2>Вход</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Номер телефона ( 79630581031 ):</label>
          <br />
          <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        </div>
        <div>
          <label>Пароль:</label>
          <br />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Войти</button>
      </form>

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
}

export default Login;

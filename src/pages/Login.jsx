import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function Login({ setIsAuth }) {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const formattedPhone = formatPhoneNumber(phoneNumber.trim());
    const trimmedPassword = password.trim();

    if (!/^\d+$/.test(formattedPhone)) {
      setErrorMessage("Номер телефона может содержать только цифры");
      return;
    }
    if (formattedPhone.length < 10 || formattedPhone.length > 11) {
      setErrorMessage("Некорректная длина номера. Ожидается 10 или 11 цифр");
      return;
    }
    if (!/^[A-Za-z0-9]{6,}$/.test(trimmedPassword)) {
      setErrorMessage("Пароль должен быть не короче 6 символов и содержать только латинские буквы и цифры");
      return;
    }

    try {
      const response = await api.post("/login", {
        phoneNumber: formattedPhone,
        password: trimmedPassword,
      });

      setIsAuth(true);

      // Сохраняем роль пользователя
      const { role } = response.data;
      localStorage.setItem("userRole", role);

      // Если админ, перенаправляем на /add-product
      navigate(role === "admin" ? "/add-product" : "/protected1");
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Ошибка при логине");
    }
  };

  return (
    <div className="login__box">
      <div className="login-container">
        <h2>Вход</h2>
        <form onSubmit={handleSubmit}>
          <label>Номер телефона ( 79630581031 ):</label>
          <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />

          <label>Пароль:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

          <button type="submit">Войти</button>
        </form>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
}

export default Login;

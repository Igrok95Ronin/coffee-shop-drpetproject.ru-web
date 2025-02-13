// src/pages/Register.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

// Функция для форматирования номера (убираем `+`, заменяем ведущую `8` на `7`)
function formatPhoneNumber(phone) {
  // Убираем пробелы и табы по краям
  let cleaned = phone.trim();
  // Убираем `+` в начале, если есть
  if (cleaned.startsWith("+")) {
    cleaned = cleaned.slice(1);
  }
  // Если номер начинается с `8`, заменяем `8` на `7`
  if (cleaned.startsWith("8")) {
    cleaned = "7" + cleaned.slice(1);
  }
  return cleaned;
}

function Register() {
  const navigate = useNavigate();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Отправка номера телефона (получение SMS)
  const handleSendSms = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    // 1. Убираем лишние пробелы/табы
    const trimmedPhone = phoneNumber.trim();

    // 2. Форматируем номер
    const formattedPhone = formatPhoneNumber(trimmedPhone);

    // 3. Проверяем, что он не пуст
    if (!formattedPhone) {
      setErrorMessage("Номер телефона не должен быть пустым");
      return;
    }

    // 4. Проверяем, что номер содержит только цифры
    if (!/^\d+$/.test(formattedPhone)) {
      setErrorMessage("Номер телефона (после преобразования) может содержать только цифры");
      return;
    }

    // 5. (Опционально) Проверяем длину
    if (formattedPhone.length < 10 || formattedPhone.length > 11) {
      setErrorMessage("Некорректная длина номера. Ожидается 10 или 11 цифр");
      return;
    }

    try {
      const response = await api.post("http://localhost:8082/send-sms", {
        phoneNumber: formattedPhone,
      });
      console.log("SMS отправлено:", response.data);
    } catch (error) {
      console.error("Ошибка при отправке SMS:", error);
      setErrorMessage(error.response?.data?.message || error.response?.data || "Неизвестная ошибка");
    }
  };

  // Отправка данных на /register с phoneNumber, code и password
  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    // Убираем лишние пробелы/табы перед проверками
    const trimmedPhone = phoneNumber.trim();
    const trimmedCode = verificationCode.trim();
    const trimmedPassword = password.trim();

    // Ещё раз форматируем номер (тот же алгоритм), чтобы
    // при отправке он был точно в нужном виде
    const formattedPhone = formatPhoneNumber(trimmedPhone);

    // --- Проверки кода подтверждения ---
    // Должен содержать ровно 4 цифры
    if (!/^\d{4}$/.test(trimmedCode)) {
      setErrorMessage("Код подтверждения должен содержать ровно 4 цифры (без пробелов и символов)");
      return;
    }

    // --- Проверки пароля ---
    // Только латинские буквы и цифры, минимум 6 символов
    if (!/^[A-Za-z0-9]{6,}$/.test(trimmedPassword)) {
      setErrorMessage("Пароль должен быть не короче 6 символов и содержать только латинские буквы и цифры");
      return;
    }

    try {
      const response = await api.post("/register", {
        phoneNumber: formattedPhone,
        code: trimmedCode,
        password: trimmedPassword,
      });
      console.log("Регистрация успешна:", response.data);
      navigate("/login");
    } catch (error) {
      console.error("Ошибка при регистрации:", error);
      setErrorMessage(error.response?.data?.message || error.response?.data || "Неизвестная ошибка");
    }
  };

  return (
    <div>
      <h2>Отправка номера</h2>
      <form onSubmit={handleSendSms}>
        <div>
          <label>Номер телефона ( 79630581031 ):</label>
          <br />
          <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        </div>
        <button type="submit">Отправить SMS</button>
      </form>

      <h2>Регистрация</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>Код подтверждения:</label>
          <br />
          <input type="text" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} />
        </div>
        <div>
          <label>Пароль:</label>
          <br />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Зарегистрироваться</button>
      </form>

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
}

export default Register;

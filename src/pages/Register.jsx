// src/pages/Register.jsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

// Вспомогательная функция для форматирования номера
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

function Register() {
  const navigate = useNavigate();

  // Состояния для полей
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [password, setPassword] = useState("");

  // Состояние для отображения ошибок
  const [errorMessage, setErrorMessage] = useState("");

  // Состояния для таймера, чтобы блокировать кнопку отправки СМС
  const [isSmsDisabled, setIsSmsDisabled] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  // Хук для обратного отсчёта таймера
  useEffect(() => {
    let intervalId;
    if (isSmsDisabled && timeLeft > 0) {
      intervalId = setInterval(() => {
        setTimeLeft((prev) => {
          const next = prev - 1;
          if (next <= 0) {
            setIsSmsDisabled(false);
            return 0;
          }
          return next;
        });
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isSmsDisabled, timeLeft]);

  // Обработчик отправки номера для получения кода
  const handleSendSms = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const formattedPhone = formatPhoneNumber(phoneNumber.trim());
    if (!formattedPhone) {
      setErrorMessage("Введите номер телефона.");
      return;
    }
    if (!/^\d+$/.test(formattedPhone)) {
      setErrorMessage("Номер должен содержать только цифры.");
      return;
    }
    if (formattedPhone.length < 10 || formattedPhone.length > 11) {
      setErrorMessage("Некорректный номер. Должно быть 10-11 цифр.");
      return;
    }

    try {
      await api.post("/send-sms", { phoneNumber: formattedPhone });
      setIsSmsDisabled(true);
      setTimeLeft(300); // блокируем повторную отправку на 5 минут
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Ошибка при отправке SMS.");
    }
  };

  // Обработчик отправки кода подтверждения и пароля
  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const formattedPhone = formatPhoneNumber(phoneNumber.trim());

    if (!/^\d{4}$/.test(verificationCode.trim())) {
      setErrorMessage("Код должен содержать 4 цифры.");
      return;
    }
    if (!/^[A-Za-z0-9]{6,}$/.test(password.trim())) {
      setErrorMessage("Пароль должен быть не менее 6 символов (латиница/цифры).");
      return;
    }

    try {
      await api.post("/register", {
        phoneNumber: formattedPhone,
        code: verificationCode.trim(),
        password: password.trim(),
      });
      // Если регистрация прошла успешно, переходим на страницу логина
      navigate("/login");
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Ошибка регистрации.");
    }
  };

  // Текст кнопки отправки СМС (меняется при блокировке)
  const renderSmsButtonText = () => {
    return isSmsDisabled ? `Повторно через ${timeLeft} c` : "Отправить SMS";
  };

  return (
    <div className="register__box">
      <div className="register-container">
        <h2 className="register-title">Регистрация</h2>

        {/* Форма для отправки номера телефона и получения кода */}
        <form className="register-form" onSubmit={handleSendSms}>
          <input
            className="register-input"
            type="text"
            placeholder="Номер телефона"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <button className="register-button" type="submit" disabled={isSmsDisabled}>
            {renderSmsButtonText()}
          </button>
        </form>

        {/* Форма для ввода кода и пароля */}
        <form className="register-form register-form-margin" onSubmit={handleRegister}>
          <input
            className="register-input"
            type="text"
            placeholder="Код подтверждения"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
          <input
            className="register-input"
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="register-button" type="submit">
            Зарегистрироваться
          </button>
        </form>

        {/* Вывод ошибки, если она есть */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
}

export default Register;

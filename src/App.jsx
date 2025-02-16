// src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import { Footer } from "./components/Footer/Footer";
import Sidebar from "./components/Sidebar/Sidebar";

import Home from "./pages/Home";
import Sale from "./pages/Sale";
import Company from "./pages/Company";
import PaymentAndDelivery from "./pages/PaymentAndDelivery";
import Contacts from "./pages/Contacts";
import Points from "./pages/Points";
import Search from "./pages/Search";

import Register from "./pages/Register";
import Login from "./pages/Login";

import ProtectedOne from "./pages/ProtectedOne";
import ProtectedTwo from "./pages/ProtectedTwo";

import ProtectedRoute from "./components/ProtectedRoute";
import api from "./api";

import "./App.scss";

function App() {
  const [isAuth, setIsAuth] = useState(false);

  // Допустим, мы хотим при загрузке приложения проверить авторизацию 1 раз
  useEffect(() => {
    checkAuth();
  }, []);

  // Функция для проверки авторизации
  const checkAuth = async () => {
    try {
      await api.get("/protected"); // если 200 - всё ок
      setIsAuth(true);
    } catch (err) {
      // если ошибка - значит не авторизованы
      setIsAuth(false);
    }
  };

  return (
    <>
      <BrowserRouter>
        {/* Передаём isAuth и setIsAuth в NavBar, чтобы там менять кнопки */}
        {/* <NavBar isAuth={isAuth} setIsAuth={setIsAuth} /> */}
        <Sidebar isAuth={isAuth} setIsAuth={setIsAuth} />
        <main className="main">
          <Routes>
            {/* Главная страница */}
            <Route path="/" element={<Home />} />
            <Route path="/sale" element={<Sale />} />
            <Route path="/company" element={<Company />} />
            <Route path="/payment-and-delivery" element={<PaymentAndDelivery />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/Points" element={<Points />} />
            <Route path="/Search" element={<Search />} />

            {/* Регистрация и Логин */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />

            {/* Защищённые страницы */}
            <Route
              path="/protected1"
              element={
                <ProtectedRoute setIsAuth={setIsAuth}>
                  <ProtectedOne />
                </ProtectedRoute>
              }
            />
            <Route
              path="/protected2"
              element={
                <ProtectedRoute setIsAuth={setIsAuth}>
                  <ProtectedTwo />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;

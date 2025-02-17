// src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import { Footer } from "./components/Footer/Footer";
import TopBar from "./components/TopBar/TopBar";
import ImageSlider from "./components/ImageSlider/ImageSlider";

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
import Basket from "./pages/Basket";

// Компонент, отвечающий за основное содержимое
function MainContent({ setIsAuth }) {
  const location = useLocation();

  // Определяем, должны ли отображаться слайдер
  const showImageSlider =
    location.pathname !== "/register" && location.pathname !== "/login";

  return (
    <main className="main">
      {showImageSlider && <ImageSlider />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/basket"
          element={
            <ProtectedRoute setIsAuth={setIsAuth}>
              <Basket />
            </ProtectedRoute>
          }
        />
        <Route path="/sale" element={<Sale />} />
        <Route path="/company" element={<Company />} />
        <Route
          path="/payment-and-delivery"
          element={<PaymentAndDelivery />}
        />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/Points" element={<Points />} />
        <Route path="/Search" element={<Search />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
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
  );
}

function App() {
  const [isAuth, setIsAuth] = useState(false);

  // Проверка авторизации при загрузке приложения
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      await api.get("/protected"); // Если ответ 200, значит всё ок
      setIsAuth(true);
    } catch (err) {
      setIsAuth(false);
    }
  };

  return (
    <BrowserRouter>
      <TopBar isAuth={isAuth} setIsAuth={setIsAuth} />
      <MainContent setIsAuth={setIsAuth} />
      <Footer />
    </BrowserRouter>
  );
}

export default App;

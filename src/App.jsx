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
import AddProduct from "./pages/AddProduct";

import Register from "./pages/Register";
import Login from "./pages/Login";

import ProtectedOne from "./pages/ProtectedOne";
import ProtectedTwo from "./pages/ProtectedTwo";

import ProtectedRoute from "./components/ProtectedRoute";
import api from "./api";

import "./App.scss";
import Basket from "./pages/Basket";

function MainContent({ setIsAuth, userRole }) {
  const location = useLocation();

  // Определяем, должны ли отображаться слайдер
  const showImageSlider = location.pathname !== "/register" && location.pathname !== "/login";

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
        <Route path="/payment-and-delivery" element={<PaymentAndDelivery />} />
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

        {/* Доступ к добавлению продукта только для администратора */}
        {userRole === "admin" && (
          <Route
            path="/add-product"
            element={
              <ProtectedRoute setIsAuth={setIsAuth} requiredRole="admin">
                {userRole === "admin" ? <AddProduct /> : <div>Нет доступа</div>}
              </ProtectedRoute>
            }
          />
        )}
      </Routes>
    </main>
  );
}

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [userRole, setUserRole] = useState(null); // Добавляем состояние для роли

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await api.get("/protected"); // Если ответ 200, значит всё ок
      setIsAuth(true);

      // Получаем актуальную роль с сервера
      const roleResponse = await api.get("/check-role");
      setUserRole(roleResponse.data.role);
    } catch (err) {
      setIsAuth(false);
      setUserRole(null);
    }
  };

  return (
    <BrowserRouter>
      <TopBar isAuth={isAuth} setIsAuth={setIsAuth} userRole={userRole} />
      <MainContent setIsAuth={setIsAuth} userRole={userRole} />
      <Footer />
    </BrowserRouter>
  );
}

export default App;

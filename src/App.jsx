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
import ProductPage from "./pages/ProductPage";

import Register from "./pages/Register";
import Login from "./pages/Login";

import ProtectedOne from "./pages/ProtectedOne";
import ProtectedTwo from "./pages/ProtectedTwo";

import ProtectedRoute from "./components/ProtectedRoute";
import api from "./api";

import "./App.scss";
import Basket from "./pages/Basket";

function MainContent({ setIsAuth, userRole, setUserRole, isAuth, products, setProducts }) {
  const location = useLocation();

  // Определяем, должны ли отображаться слайдер
  const showImageSlider =
    location.pathname !== "/register" &&
    location.pathname !== "/login" &&
    location.pathname !== "/search" &&
    location.pathname !== "/basket" &&
    !location.pathname.startsWith("/product/");

  return (
    <main className="main">
      {showImageSlider && <ImageSlider />}
      <Routes>
        <Route path="/" element={<Home isAuth={isAuth} products={products} setProducts={setProducts} />} />
        <Route path="/product/:id" element={<ProductPage isAuth={isAuth} />} />
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
        <Route path="/Search" element={<Search products={products} setProducts={setProducts} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} setUserRole={setUserRole} />} />

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

  const [products, setProducts] = useState([]);

  // console.log(products);

  useEffect(() => {
    checkAuth();
    fetchData();
  }, []);

  // Получение данных из таблицы карзины для отображения количества и кнопок
  const fetchData = async () => {
    try {
      const response = await api.get("/basket");
      setProducts(response.data);
    } catch (err) {}
  };

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

  // ✅ Добавляем `handleLogout`
  const handleLogout = async () => {
    try {
      await api.post("/logout");
    } catch (err) {
      console.error("Ошибка при выходе:", err);
    }

    setIsAuth(false);
    setUserRole(null);
    localStorage.removeItem("userRole");

    navigate("/login"); // Перенаправляем на страницу логина
  };

  return (
    <BrowserRouter>
      <TopBar
        isAuth={isAuth}
        setIsAuth={setIsAuth}
        userRole={userRole}
        handleLogout={handleLogout}
        products={products}
        setProducts={setProducts} // ✅ Добавляем setProducts
      />

      <MainContent
        setIsAuth={setIsAuth}
        userRole={userRole}
        setUserRole={setUserRole}
        isAuth={isAuth}
        products={products}
        setProducts={setProducts} // ✅ Добавляем setProducts
      />
      {/* ✅ Передаём setUserRole */}
      <Footer />
    </BrowserRouter>
  );
}

export default App;

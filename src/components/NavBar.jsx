// src/components/NavBar.jsx
//  Не используется
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

function NavBar({ isAuth, setIsAuth }) {
  const navigate = useNavigate();

  // Обработчик выхода (Exit)
  const handleLogout = async () => {
    try {
      await api.post("/logout");
      // Если всё ок, ставим isAuth в false
      setIsAuth(false);
      // И перебрасываем на / (или /login)
      navigate("/login");
    } catch (err) {
      console.error("Ошибка при логауте:", err);
    }
  };

  return (
    <section className="nav">
      <div className="container">
        <div className="nav__box">
          <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
            {/* Общая ссылка на Home */}
            <Link to="/" style={{ marginRight: "1rem" }}>
              Home
            </Link>
            <Link to="/sale" style={{ marginRight: "1rem" }}>
              Акции
            </Link>
            <Link to="/company" style={{ marginRight: "1rem" }}>
              О компании
            </Link>
            <Link to="/payment-and-delivery" style={{ marginRight: "1rem" }}>
              Оплата и доставка
            </Link>
            <Link to="/contacts" style={{ marginRight: "1rem" }}>
              Контакты
            </Link>
            <Link to="/points" style={{ marginRight: "1rem" }}>
              Баллы
            </Link>
            <Link to="/search" style={{ marginRight: "1rem" }}>
              Поиск
            </Link>

            {/* Если user НЕ авторизован */}
            {!isAuth && (
              <>
                <Link to="/register" style={{ marginRight: "1rem" }}>
                  Register
                </Link>
                <Link to="/login" style={{ marginRight: "1rem" }}>
                  Login
                </Link>
              </>
            )}

            {/* Если user АВТОРИЗОВАН */}
            {isAuth && (
              <>
                <Link to="/protected1" style={{ marginRight: "1rem" }}>
                  Protected1
                </Link>
                <Link to="/protected2" style={{ marginRight: "1rem" }}>
                  Protected2
                </Link>
                <button onClick={handleLogout}>Exit</button>
              </>
            )}
          </nav>
        </div>
      </div>
    </section>
  );
}

export default NavBar;

// src/pages/Home.jsx
import React from "react";
import HelmetMeta from "../components/HelmetMeta/HelmetMeta";

function Home() {
  return (
    <section className="home">
      <div className="container">
        <div className="home__box">
          <HelmetMeta
            title="Главная | Мое приложение"
            description="Это главная страница"
            keywords="скидки, акции, распродажа, товары, магазин"
          />
          <h2>Главная страница (Public)</h2>
          <p>Сюда доступ есть у всех.</p>
        </div>
      </div>
    </section>
  );
}

export default Home;

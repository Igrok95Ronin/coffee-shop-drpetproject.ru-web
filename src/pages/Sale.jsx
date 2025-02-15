// src/pages/Home.jsx
import React from "react";
import HelmetMeta from "../components/HelmetMeta/HelmetMeta";

function Sale() {
  return (
    <div>
      <HelmetMeta
        title="Акции | Мое приложение"
        description="Все актуальные акции на товары"
        keywords="скидки, акции, распродажа, товары, магазин"
      />
      <h2>Акции (Public)</h2>
      <p>Сюда доступ есть у всех.</p>
    </div>
  );
}

export default Sale;

// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HelmetMeta from "../components/HelmetMeta/HelmetMeta";
import { Card, CardMedia, CardContent, Typography, CardActions, Button } from "@mui/material";

import api from "../api";

import "./Home.scss";

function Home() {
  // Состояния для хранения данных и ошибок
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Асинхронная функция для получения данных
  const fetchData = async () => {
    try {
      const response = await api.get("/");
      setData(response.data); // Сохранение полученных данных
    } catch (err) {
      console.error("Произошла ошибка при получении данных:", err);
      setError(err);
    } finally {
      setLoading(false); // Завершение загрузки
    }
  };

  // Выполнение запроса при монтировании компонента
  useEffect(() => {
    fetchData();
  }, []); // Пустой массив зависимостей означает, что эффект выполнится один раз

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error.message}</p>;

  console.log(data);

  return (
    <section className="home">
      <div className="container">
        <div className="home__box">
          <HelmetMeta
            title="Главная | Мое приложение"
            description="Это главная страница"
            keywords="скидки, акции, распродажа, товары, магазин"
          />

          <div className="home__wrapperCard">
            {data.map((prod) => (
              <Card className="home__card" key={prod.id} sx={{ maxWidth: 215 }}>
                <Link to={`/product/${prod.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                  <CardMedia className="home__img" component="img" height="286" image={prod.imgSrc} alt={prod.name} />
                  <CardContent className="home__content">
                    <Typography className="home__price">{prod.price} ₽</Typography>
                    <Typography className="home__name" variant="h2">
                      {prod.name}
                    </Typography>
                  </CardContent>
                </Link>
                <CardActions className="home__btnWrp">
                  <Button variant="contained" className="home__btnCard" size="small">
                    В корзину
                  </Button>
                </CardActions>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;

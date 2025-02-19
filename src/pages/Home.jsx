import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HelmetMeta from "../components/HelmetMeta/HelmetMeta";
import { Card, CardMedia, CardContent, Typography, CardActions, Button } from "@mui/material";

import api from "../api";
import "./Home.scss";

function Home() {
  const [data, setData] = useState([]); // Массив товаров
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0); // Для пагинации
  const [hasMore, setHasMore] = useState(true); // Флаг для кнопки

  // Загрузка товаров
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await api.get("/", {
        params: {
          limit: 24,
          offset: offset,
        },
      });

      const newProducts = response.data;

      // Если меньше 20 записей — отключаем кнопку "Показать еще"
      if (newProducts.length < 24) {
        setHasMore(false);
      }

      // Обновляем состояние
      setData((prev) => [...prev, ...newProducts]);
      setOffset((prevOffset) => prevOffset + 24);
    } catch (err) {
      console.error("Ошибка при получении данных:", err);
    } finally {
      setLoading(false);
    }
  };

  // Первоначальная загрузка
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="home">
      <div className="container">
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

        {/* Кнопка "Показать еще" */}
        {hasMore && (
          <div className="home__btnMore">
            <Button
              className="home__btnShow"
              variant="contained"
              size="small"
              onClick={fetchData}
              disabled={loading}
              color="inherit"
            >
              {loading ? "Загрузка..." : "Показать еще"}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

export default Home;

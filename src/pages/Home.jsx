import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HelmetMeta from "../components/HelmetMeta/HelmetMeta";
import { Card, CardMedia, CardContent, Typography, CardActions, Button, Skeleton } from "@mui/material";

import api from "../api";
import "./Home.scss";

function Home() {
  const [data, setData] = useState([]);       // Массив товаров
  const [loading, setLoading] = useState(false); // Первичная загрузка
  const [loadingMore, setLoadingMore] = useState(false); // Для кнопки "Показать еще"
  const [offset, setOffset] = useState(0);    // Для пагинации
  const [hasMore, setHasMore] = useState(true); // Флаг для кнопки

  // Загрузка товаров
  const fetchData = async (isInitial = false) => {
    if (isInitial) {
      setLoading(true);   // Для первой загрузки
    } else {
      setLoadingMore(true); // Для подгрузки
    }

    try {
      const response = await api.get("/", {
        params: { limit: 24, offset: offset },
      });

      const newProducts = response.data;

      if (newProducts.length < 24) {
        setHasMore(false); // Если меньше 24 — больше данных нет
      }

      setData((prev) => [...prev, ...newProducts]);
      setOffset((prevOffset) => prevOffset + 24);
    } catch (err) {
      console.error("Ошибка при получении данных:", err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // Первоначальная загрузка
  useEffect(() => {
    fetchData(true);
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
          {/* Skeleton при первичной загрузке */}
          {loading && (
            [...Array(24)].map((_, index) => (
              <Card className="home__card" key={`skeleton-${index}`} sx={{ width: 215 }}>
                <Skeleton variant="rectangular" height={286} />
                <CardContent>
                  <Skeleton variant="text" height={24} width="80%" />
                  <Skeleton variant="text" height={20} width="60%" />
                </CardContent>
                <CardActions>
                  <Skeleton variant="rectangular" height={36} width="100%" />
                </CardActions>
              </Card>
            ))
          )}

          {/* Отображаем карточки товаров */}
          {data.map((prod) => (
            <Card className="home__card" key={prod.id} sx={{ maxWidth: 215 }}>
              <Link to={`/product/${prod.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                <CardMedia
                  className="home__img"
                  component="img"
                  height="286"
                  image={prod.imgSrc}
                  alt={prod.name}
                />
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

          {/* Skeleton при подгрузке новых данных */}
          {loadingMore && (
            [...Array(24)].map((_, index) => (
              <Card className="home__card" key={`skeleton-more-${index}`} sx={{ width: 215 }}>
                <Skeleton variant="rectangular" height={286} />
                <CardContent>
                  <Skeleton variant="text" height={24} width="80%" />
                  <Skeleton variant="text" height={20} width="60%" />
                </CardContent>
                <CardActions>
                  <Skeleton variant="rectangular" height={36} width="100%" />
                </CardActions>
              </Card>
            ))
          )}
        </div>

        {/* Кнопка "Показать еще" */}
        {hasMore && !loading && (
          <div className="home__btnMore">
            <Button
              className="home__btnShow"
              variant="contained"
              size="small"
              onClick={() => fetchData(false)}
              disabled={loadingMore}
              color="inherit"
            >
              {loadingMore ? "Загрузка..." : "Показать еще"}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

export default Home;

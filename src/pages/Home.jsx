// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import HelmetMeta from "../components/HelmetMeta/HelmetMeta";
import { Card, CardMedia, CardContent, Typography, CardActions, Button, Skeleton } from "@mui/material";

import { useFetchProducts } from "../hooks/useFetchProducts"; // <-- Импортируем наш кастомный хук
import AddInBasket from "../components/AddInBasket/AddInBasket"; // Добавить товар в корзину

import "./Home.scss";

function Home({ isAuth, products, setProducts }) {
  // Используем хук (по умолчанию 24)
  const { data, loading, loadingMore, hasMore, fetchMore } = useFetchProducts(24);

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
          {loading &&
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
            ))}

          {/* Отображаем карточки товаров */}
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
              {isAuth && (
                <CardActions className="home__btnWrp">
                  {/* Компонент который вставляет кнопку Добавить в корзину */}
                  <AddInBasket prod={prod} products={products} setProducts={setProducts} />
                </CardActions>
              )}
            </Card>
          ))}

          {/* Skeleton при подгрузке новых данных */}
          {loadingMore &&
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
            ))}
        </div>

        {/* Кнопка "Показать еще" */}
        {hasMore && !loading && (
          <div className="home__btnMore">
            <Button
              className="home__btnShow"
              variant="contained"
              size="small"
              onClick={fetchMore} // <-- Используем метод из хука
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

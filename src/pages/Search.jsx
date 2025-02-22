// src/pages/Search.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardMedia, CardContent, Typography, CardActions, Button, Skeleton } from "@mui/material";

import AddInBasket from "../components/AddInBasket/AddInBasket"; // Добавить товар в корзину

import useSearchProducts from "../hooks/useSearchProducts";
import "./Search.scss"; // Стили для страницы поиска (по аналогии с search.scss)

function Search({ products, setProducts }) {
  // Используем кастомный хук:
  // - limit = 24 (можно менять)
  const { data, loading, loadingMore, hasMore, fetchMore, q, total } = useSearchProducts(24);

  return (
    <section className="search">
      <div className="container">
        <div className="search__box">
          <CardActions className="search__btnWrp">
            <Button variant="contained" className="search__btnCard search__btnSearch" size="small">
              Результаты поиска по запросу: <em> {q} </em> ( {total} )
            </Button>
          </CardActions>
          <div className="search__wrapperCard">
            {/* Скелетоны при первой загрузке */}
            {loading &&
              [...Array(24)].map((_, index) => (
                <Card className="search__card" key={`skeleton-search-${index}`} sx={{ width: 215 }}>
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
              <Card className="search__card" key={prod.id} sx={{ maxWidth: 215 }}>
                <Link to={`/product/${prod.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                  <CardMedia component="img" height="286" image={prod.imgSrc} alt={prod.name} />
                  <CardContent className="search__content">
                    <Typography className="search__price">{prod.price} ₽</Typography>
                    <Typography className="search__name" variant="h2">
                      {prod.name}
                    </Typography>
                  </CardContent>
                </Link>
                <CardActions className="search__btnWrp">
                  {/* Компонент который вставляет кнопку Добавить в корзину */}
                  <AddInBasket prod={prod} products={products} setProducts={setProducts} />
                </CardActions>
              </Card>
            ))}

            {/* Скелетоны при догрузке (когда нажимаем "Показать ещё") */}
            {loadingMore &&
              [...Array(24)].map((_, index) => (
                <Card className="search__card" key={`skeleton-more-search-${index}`} sx={{ width: 215 }}>
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

          {/* Кнопка "Показать ещё" */}
          {hasMore && !loading && (
            <div className="search__btnMore">
              <Button
                className="search__btnShow"
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
      </div>
    </section>
  );
}

export default Search;

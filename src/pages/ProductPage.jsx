import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";

import ImageGallery from "react-image-gallery";
import api from "../api";

import "react-image-gallery/styles/css/image-gallery.css";
import "./ProductPage.scss";

// Импортируем наш компонент лупы
import ZoomableImage from "../components/ZoomableImage/ZoomableImage";

function ProductPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/product/${id}`);
        setData(response.data);
      } catch (err) {
        console.error("Произошла ошибка при получении данных:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error.message}</p>;
  if (!data) return <p>Данные не найдены</p>;

  const galleryItems = [];

  if (data.imgSrc) {
    galleryItems.push({
      original: data.imgSrc,
      thumbnail: data.imgSrc,
      originalAlt: data.name,
      thumbnailAlt: data.name,
    });
  }

  if (data.imgsSrc && data.imgsSrc.length > 0) {
    data.imgsSrc.forEach((src) => {
      galleryItems.push({
        original: src,
        thumbnail: src,
        originalAlt: data.name,
        thumbnailAlt: data.name,
      });
    });
  }

  // Функция рендера основного слайда
  const renderZoomableSlide = (item) => {
    return <ZoomableImage src={item.original} alt={item.originalAlt} />;
  };

  return (
    <section className="productPage">
      <div className="container">
        <div className="productPage__box">
          <div className="productPage__left">
            {galleryItems.length > 0 && (
              <ImageGallery
                items={galleryItems}
                showPlayButton={true}
                thumbnailPosition="left"
                autoPlay={false}
                additionalClass="productPage__image-gallery"
                renderItem={renderZoomableSlide} // Заменяем стандартный рендер
              />
            )}
          </div>
          <div className="productPage__center">
            <div className="productPage__info-card">
              <h1 className="productPage__name">{data.name}</h1>

              <div className="productPage__description">
                <h2>Описание</h2>
                <div className="productPage__description-content">
                  <p>{data.description}</p>
                </div>
              </div>

              {data.characteristics && (
                <div className="productPage__characteristics">
                  <h2>Характеристики</h2>
                  <div className="productPage__characteristics-content">
                    <ul>
                      {Object.entries(data.characteristics).map(([key, value]) => (
                        <li key={key}>
                          <span className="characteristic-key">{key}:</span>
                          <span className="characteristic-value">{value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Блок с ценой и кнопкой */}
              <div className="productPage__purchase">
                <h2 className="productPage__price">{data.price} ₽</h2>

                <Button
                  variant="contained"
                  className={data.inBasket ? "productPage__btnInCard" : "productPage__btnCard"}
                  size="medium"
                >
                  {data.inBasket ? "В корзине" : "Добавить в корзину"}
                </Button>
              </div>
            </div>
          </div>

          {/* <div className="productPage__right">
            <div className="productPage__price-card">
              <h2 className="productPage__price">{data.price} ₽</h2>

              <Button variant="contained" className={data.inBasket ? "home__btnInCard" : "home__btnCard"} size="medium">
                {data.inBasket ? "В корзине" : "Добавить в корзину"}
              </Button>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}

export default ProductPage;

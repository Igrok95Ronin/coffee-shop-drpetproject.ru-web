import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "./ImageSlider.scss"; // Подключаем кастомные стили

const slides = [
  {
    images: ["/1.jpg", "/2.jpg"],
    title: "Первый слайд",
    description: "Описание первого слайда",
  },
  {
    images: ["/3.jpg", "/4.jpg"],
    title: "Второй слайд",
    description: "Описание второго слайда",
  },
  {
    images: ["/5.jpg", "/6.jpg"],
    title: "Третий слайд",
    description: "Описание третьего слайда",
  },
  {
    images: ["/7.jpg", "/8.jpg"],
    title: "Четвертый слайд",
    description: "Описание четвертого слайда",
  },
];

const ImageSlider = () => {
  return (
    <div className="slider-container container">
      <Swiper
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
        modules={[Navigation, Pagination, Autoplay]}
        className="custom-swiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="swiper-slide">
            <div className="slide-content">
              {/* Контейнер для двух изображений */}
              <div className="slide-images">
                {slide.images.map((src, i) => (
                  <img key={i} src={src} alt={`Slide ${index} Image ${i}`} className="slide-image" />
                ))}
              </div>
              <div className="slide-text">
                <h2>{slide.title}</h2>
                <p>{slide.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSlider;

// src/hooks/useSearchProducts.js
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // Чтобы брать q из URL
import api from "../api";

export default function useSearchProducts(limit = 24) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false); // загрузка первого экрана
  const [loadingMore, setLoadingMore] = useState(false); // загрузка «Показать еще»
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);

  // Забираем параметр ?q из URL, используя React Router
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const q = params.get("q") || "";

  // Основная функция для загрузки товаров
  const fetchData = async (isInitial = false) => {
    // При первой загрузке показываем один скелетон, при догрузке — другой
    if (isInitial) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }

    try {
      // Делаем GET-запрос на бэкенд /search
      const response = await api.get("/search", {
        params: { q, limit, offset },
      });
      // На бэкенде мы возвращаем { "products": [...], "total": N }
      const { products, total } = response.data;

      setTotal(total);

      // Если total = 0 (ничего не найдено), сразу прячем кнопку
      if (total === 0) {
        setHasMore(false);
      }

      // Если вернулось меньше, чем limit, данных больше нет
      if (products.length < limit) {
        setHasMore(false);
      }

      // Добавляем полученные товары к предыдущим
      setData((prev) => [...prev, ...products]);

      // Увеличиваем смещение для следующей порции
      setOffset((prevOffset) => prevOffset + limit);
    } catch (err) {
      console.error("Ошибка при поиске:", err);
      // Тут можно показать пользователю уведомление
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // Загружаем данные, когда компонент маунтится или когда q меняется
  useEffect(() => {
    // Сбрасываем старые результаты, если пользователь меняет запрос q
    setData([]);
    setOffset(0);
    setHasMore(true);
    setTotal(0); // сбрасываем total

    // Первая загрузка (isInitial = true)
    fetchData(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  // Функция для догрузки при клике «Показать ещё»
  const fetchMore = () => fetchData(false);

  return {
    data, // Товары
    loading, // Флаг первичной загрузки
    loadingMore, // Флаг загрузки дополнительных товаров
    hasMore, // Можно ли ещё подгружать
    fetchMore, // Функция для подгрузки по кнопке
    q, // Сам поисковый запрос (можно выводить на UI)
    total,
  };
}

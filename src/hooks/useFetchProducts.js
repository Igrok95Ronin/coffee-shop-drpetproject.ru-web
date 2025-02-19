// src/hooks/useFetchProducts.js
import { useState, useEffect } from "react";
import api from "../api";

/**
 * Кастомный хук для загрузки продуктов с пагинацией.
 *
 * @param {number} limit - сколько товаров загружать за один раз (по умолчанию 24).
 * @returns {Object} { data, loading, loadingMore, hasMore, fetchMore }
 */
export function useFetchProducts(limit = 24) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);       // Загрузка при первой инициализации
  const [loadingMore, setLoadingMore] = useState(false); // Загрузка при нажатии "Показать ещё"
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  // Основная функция для запроса товаров
  const fetchData = async (isInitial = false) => {
    // Показываем скелетон для первичной загрузки или для догрузки
    if (isInitial) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }

    try {
      // Делаем GET-запрос
      const response = await api.get("/", {
        params: { limit, offset },
      });

      const newProducts = response.data;

      // Если вернулось меньше, чем лимит, значит записей больше нет
      if (newProducts.length < limit) {
        setHasMore(false);
      }

      // Добавляем новые товары к старым
      setData((prev) => [...prev, ...newProducts]);
      setOffset((prevOffset) => prevOffset + limit);
    } catch (err) {
      console.error("Ошибка при получении данных:", err);
      // Здесь можно обрабатывать ошибку, например, показывать уведомление
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // Загружаем первые данные при маунте компонента
  useEffect(() => {
    fetchData(true);
  }, []);

  // Метод для подгрузки по клику "Показать ещё"
  const fetchMore = () => fetchData(false);

  return {
    data,         // список товаров
    loading,      // флаг первичной загрузки
    loadingMore,  // флаг загрузки дополнительной порции товаров
    hasMore,      // есть ли ещё данные
    fetchMore,    // функция для догрузки
  };
}

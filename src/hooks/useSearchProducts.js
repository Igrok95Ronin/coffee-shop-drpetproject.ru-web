import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import api from "../api";

export default function useSearchProducts(limit = 24) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const q = params.get("q")?.trim() || "";

  // 🌟 Главная функция загрузки данных
  const fetchData = async (newOffset = 0, isInitial = false) => {
    if (isInitial) {
      setLoading(true);
      setData([]);      // Сбрасываем данные при новом запросе
      setOffset(0);     // Всегда начинаем с 0
    } else {
      setLoadingMore(true);
    }

    try {
      const response = await api.get("/search", {
        params: { q, limit, offset: newOffset },  // Используем переданный offset
      });

      const { products, total } = response.data;
      setTotal(total);

      if (products.length < limit) {
        setHasMore(false);
      }

      setData((prev) => (newOffset === 0 ? products : [...prev, ...products]));
      setOffset(newOffset + limit);  // Обновляем offset для следующей подгрузки
    } catch (err) {
      console.error("Ошибка при поиске:", err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // 🌟 Обновление при изменении `q`
  useEffect(() => {
    setHasMore(true);
    fetchData(0, true);  // Всегда начинаем с offset = 0
  }, [q]);

  // 🌟 Функция для подгрузки
  const fetchMore = () => {
    fetchData(offset, false);  // Используем актуальный offset
  };

  return { data, loading, loadingMore, hasMore, fetchMore, q, total };
}

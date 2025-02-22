import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Skeleton } from "@mui/material";

import api from "../../api";

export default function AddInBasket({ prod, products, setProducts }) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async (prodID) => {
    setLoading(true);
    try {
      await api.post("/addtobasket", { prodID: prodID });
      setProducts((prevProducts) => [...prevProducts, { id: prodID }]);
    } catch (err) {
      console.error("Произошла ошибка при добавлении товара:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {products.some((basket) => basket.id === prod.id) ? (
        <Link to="/basket" style={{ textDecoration: "none", width: "100%" }}>
          <Button variant="contained" className="home__btnInCard" size="small" fullWidth>
            В корзине
          </Button>
        </Link>
      ) : loading ? (
        // Скелетон во время загрузки
        <Skeleton variant="rectangular" height={36} width="100%" sx={{ borderRadius: "8px" }} />
      ) : (
        <Button variant="contained" className="home__btnCard" size="small" fullWidth onClick={() => fetchData(prod.id)}>
          Добавить в корзину
        </Button>
      )}

      {error && <p style={{ color: "red" }}>Ошибка: {error.message}</p>}
    </>
  );
}

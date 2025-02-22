import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Container,
  Grid,
  Button,
  CircularProgress,
  Box,
  Paper,
  Divider,
  Checkbox,
  IconButton,
  TextField,
} from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";
import { useSpring, animated } from "@react-spring/web";
import api from "../api";

import "./Basket.scss";

function Basket() {
  const [products, setProducts] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  // Получение данных
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/basket");
        const initialData = response.data.map((prod) => ({
          ...prod,
          quantity: 1,
        }));
        setProducts(initialData);
        setSelectedItems(initialData.reduce((acc, prod) => ({ ...acc, [prod.id]: false }), {}));
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Удаление товара
  const handleDelete = (id) => {
    setProducts(products.filter((prod) => prod.id !== id));
    const newSelected = { ...selectedItems };
    delete newSelected[id];
    setSelectedItems(newSelected);
  };

  // Изменение количества товара
  const handleQuantityChange = (id, value) => {
    const updatedProducts = products.map((prod) =>
      prod.id === id ? { ...prod, quantity: Math.max(1, Math.min(99, value)) } : prod
    );
    setProducts(updatedProducts);
  };

  // Переключение чекбокса
  const handleCheckboxChange = (id) => {
    setSelectedItems({ ...selectedItems, [id]: !selectedItems[id] });
  };

  // Подсчёт итоговой суммы
  const calculateTotal = () => {
    return products
      .filter((prod) => selectedItems[prod.id])
      .reduce((total, prod) => total + prod.price * prod.quantity, 0);
  };

  // Анимация для итоговой цены
  const animatedPrice = useSpring({
    total: calculateTotal(),
    from: { total: totalPrice },
    config: { duration: 500 },
    onChange: ({ value }) => setTotalPrice(Math.round(value.total)),
  });

  // Склонение слова "товар"
  const getProductWord = (count) => {
    if (count % 10 === 1 && count % 100 !== 11) return "товар";
    if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) return "товара";
    return "товаров";
  };

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", height: "80vh" }}>
        <CircularProgress />
      </Box>
    );

  if (error) return <Typography color="error">Ошибка загрузки: {error.message}</Typography>;

  return (
    <Container
      className="basket"
      sx={{
        background: "linear-gradient(135deg, #e0f7fa 0%, #80deea 100%)", // Градиентный фон
        minHeight: "100vh",
        py: 4,
        px: 2,
        borderRadius: 3,
        mb: 2,
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          textAlign: "left",
          fontWeight: "bold",
          mt: 2,
          color: "#333", // Цвет заголовка
        }}
      >
        Корзина ({products.length} {getProductWord(products.length)})
      </Typography>

      <Grid container spacing={3}>
        {/* Левая часть - список товаров */}
        <Grid item xs={12} md={8}>
          {products.map((prod) => (
            <Card
              key={prod.id}
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2,
                p: 2,
                borderRadius: "12px",
                boxShadow: 3,
                backgroundColor: "#ffffff", // Белый фон карточки
              }}
            >
              <Checkbox checked={!!selectedItems[prod.id]} onChange={() => handleCheckboxChange(prod.id)} />

              <Link to={`/product/${prod.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                <CardMedia
                  component="img"
                  sx={{ width: 80, height: 80, borderRadius: 2 }}
                  image={prod.imgSrc}
                  alt={prod.name}
                />
              </Link>

              <CardContent sx={{ flex: 1 }}>
                <Link to={`/product/${prod.id}`} style={{ textDecoration: "none", color: "#007bff" }}>
                  <Typography
                    variant="h6"
                    noWrap
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {prod.name}
                  </Typography>
                </Link>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 2,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    mb: 1,
                  }}
                >
                  {prod.description}
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <IconButton
                    size="small"
                    onClick={() => handleQuantityChange(prod.id, prod.quantity - 1)}
                    sx={{ p: 0.5, minWidth: "30px", height: "30px" }}
                  >
                    <Remove fontSize="small" />
                  </IconButton>

                  <TextField
                    type="text"
                    size="small"
                    value={prod.quantity}
                    onChange={(e) => handleQuantityChange(prod.id, parseInt(e.target.value) || 1)}
                    inputProps={{
                      min: 1,
                      max: 99,
                      style: { textAlign: "center", fontSize: "12px", padding: "7px 5px" },
                    }}
                    sx={{
                      width: "40px",
                      "& input::-webkit-inner-spin-button, & input::-webkit-outer-spin-button": { display: "none" },
                    }}
                  />

                  <IconButton
                    size="small"
                    onClick={() => handleQuantityChange(prod.id, prod.quantity + 1)}
                    sx={{ p: 0.5, minWidth: "30px", height: "30px" }}
                  >
                    <Add fontSize="small" />
                  </IconButton>
                </Box>
              </CardContent>

              <Typography variant="h6" sx={{ mr: 2 }}>
                {prod.price * prod.quantity} ₽
              </Typography>

              <IconButton color="error" onClick={() => handleDelete(prod.id)}>
                <Delete fontSize="small" />
              </IconButton>
            </Card>
          ))}
        </Grid>

        {/* Правая часть - итоговая стоимость */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              boxShadow: 4,
              borderRadius: "12px",
              position: "sticky",
              top: "90px",
              zIndex: 10,
              backgroundColor: "#ffffff", // Белый фон блока с итогами
            }}
          >
            <Typography variant="h6" gutterBottom>
              Итог заказа
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Typography variant="body1" gutterBottom>
              Товары: {products.filter((prod) => selectedItems[prod.id]).length}{" "}
              {getProductWord(products.filter((prod) => selectedItems[prod.id]).length)}
            </Typography>

            <Typography variant="h6" sx={{ fontWeight: "bold", color: "primary.main" }}>
              Итого: <animated.span>{animatedPrice.total.to((val) => Math.round(val).toLocaleString())}</animated.span>{" "}
              ₽
            </Typography>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3 }}
              disabled={calculateTotal() === 0}
              onClick={() => alert("Заказ оформлен!")}
            >
              Заказать
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Basket;

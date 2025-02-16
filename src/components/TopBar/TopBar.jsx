import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Button,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Badge,
} from "@mui/material";
import { Menu as MenuIcon, Search as SearchIcon, ShoppingCart as ShoppingCartIcon } from "@mui/icons-material";
import { styled, alpha } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api";

// Стили для поиска
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": { backgroundColor: alpha(theme.palette.common.white, 0.25) },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: { marginLeft: theme.spacing(1), width: "auto" },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  transition: theme.transitions.create("width"),
  [theme.breakpoints.up("md")]: { width: "20ch" },
}));

const TopBar = ({ isAuth, setIsAuth }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (isOpen) => () => {
    setOpen(isOpen);
  };

  // Обработчик выхода
  const handleLogout = async () => {
    try {
      await api.post("/logout");
      setIsAuth(false);
      navigate("/login");
      setOpen(false); // Закрываем меню
    } catch (err) {
      console.error("Ошибка при логауте:", err);
    }
  };

  return (
    <>
      {/* Верхняя панель */}
      <AppBar position="static">
        <Toolbar>
          {/* Кнопка-гамбургер */}
          <IconButton edge="start" color="inherit" sx={{ mr: 2 }} onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>

          {/* Название/Логотип */}
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}
          >
            My App
          </Typography>

          {/* Поле поиска */}
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Поиск…" inputProps={{ "aria-label": "search" }} />
          </Search>

          {/* Кнопки авторизации и корзина */}
          <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
            {!isAuth ? (
              <>
                <Button color="inherit" component={Link} to="/login">
                  Login
                </Button>
                <Button color="inherit" component={Link} to="/register">
                  Register
                </Button>
              </>
            ) : (
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            )}

            {/* Если user авторизован */}
            {isAuth && (
              <>
                {/* Иконка корзины */}
                <IconButton color="inherit" component={Link} to="/basket" sx={{ ml: 2 }}>
                  <Badge badgeContent={3} color="error">
                    {" "}
                    {/* 3 — примерное кол-во товаров в корзине */}
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Боковое меню (Drawer) */}
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <List style={{ width: 250 }}>
          {/* Общие ссылки */}
          <ListItem component={Link} to="/">
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem component={Link} to="/sale">
            <ListItemText primary="Акции" />
          </ListItem>
          <ListItem component={Link} to="/company">
            <ListItemText primary="О компании" />
          </ListItem>
          <ListItem component={Link} to="/payment-and-delivery">
            <ListItemText primary="Оплата и доставка" />
          </ListItem>
          <ListItem component={Link} to="/contacts">
            <ListItemText primary="Контакты" />
          </ListItem>
          <ListItem component={Link} to="/points">
            <ListItemText primary="Баллы" />
          </ListItem>
          <ListItem component={Link} to="/search">
            <ListItemText primary="Поиск" />
          </ListItem>

          {/* Если user НЕ авторизован */}
          {!isAuth ? (
            <>
              <ListItem component={Link} to="/register">
                <ListItemText primary="Register" />
              </ListItem>
              <ListItem component={Link} to="/login">
                <ListItemText primary="Login" />
              </ListItem>
            </>
          ) : (
            <>
              <ListItem component={Link} to="/protected1">
                <ListItemText primary="Protected1" />
              </ListItem>
              <ListItem component={Link} to="/protected2">
                <ListItemText primary="Protected2" />
              </ListItem>
              <ListItem>
                <Button variant="outlined" color="error" onClick={handleLogout} fullWidth>
                  Exit
                </Button>
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
    </>
  );
};

export default TopBar;

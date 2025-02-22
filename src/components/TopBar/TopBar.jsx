import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, IconButton, Typography, InputBase, Button, Box, Badge } from "@mui/material";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  ShoppingCart as ShoppingCartIcon,
  LocalPhone as LocalPhoneIcon,
  Email as EmailIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import DrawerMenu from "./DrawerMenu"; // Импорт нового компонента
import { Link as RouterLink } from "react-router-dom";

import "./TopBar.scss";

// Обёртка для Link, которая не передаёт проп "button" в DOM
const LinkBehavior = React.forwardRef(({ button, ...props }, ref) => <RouterLink ref={ref} {...props} />);

const TopBar = ({ isAuth, setIsAuth, userRole, handleLogout, products }) => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const toggleDrawer = (isOpen) => () => {
    setOpen(isOpen);
  };

  // Обработчик поиска (по нажатию Enter)
  const handleSearchSubmit = (e) => {
    if (e.key === "Enter") {
      const trimmedValue = searchValue.trim();
      if (trimmedValue.length >= 3) {
        navigate(`/search?q=${encodeURIComponent(trimmedValue)}`);
      }
    }
  };

  return (
    <>
      {/* Верхняя панель */}
      <AppBar className="topBar__main" position="static">
        <div className="container">
          <Toolbar disableGutters sx={{ minHeight: "54px !important", padding: 0 }}>
            {/* ЛОГОТИП */}
            <Typography
              variant="h6"
              component={LinkBehavior}
              to="/"
              sx={{ textDecoration: "none", color: "inherit", mr: 2 }}
            >
              Город Бизнеса (G2B)
            </Typography>

            {/* КНОПКА-ГАМБУРГЕР */}
            <IconButton edge="start" color="inherit" sx={{ mr: 0 }} onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>

            {/* Поле поиска */}
            <div className="topbar-search">
              <div className="topbar-search-icon-wrapper">
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Поиск…"
                inputProps={{ "aria-label": "search" }}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={handleSearchSubmit}
                className="topbar-styled-input-base"
              />
            </div>

            {/* Контактные данные */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: "5px", marginRight: "10px" }}>
              {/* Телефон */}
              <Typography variant="body1" sx={{ fontSize: "12px", fontWeight: "bold" }}>
                <IconButton component="a" href="tel:+79659655989" sx={{ color: "white", padding: "0 10px 0 0" }}>
                  <LocalPhoneIcon sx={{ fontSize: "16px" }} />
                </IconButton>
                <a href="tel:+79659655989" style={{ color: "white", textDecoration: "none" }}>
                  8 965 965 59 89
                </a>
              </Typography>
              {/* Email */}
              <Typography variant="body1" sx={{ fontSize: "12px", fontWeight: "bold" }}>
                <IconButton component="a" href="mailto:g2b@migcom.ru" sx={{ color: "white", padding: "0 10px 0 0" }}>
                  <EmailIcon sx={{ fontSize: "16px" }} />
                </IconButton>
                <a href="mailto:g2b@migcom.ru" style={{ color: "white", textDecoration: "none" }}>
                  g2b@migcom.ru
                </a>
              </Typography>
            </Box>

            {/* Кнопки авторизации и корзина */}
            <Box sx={{ display: "flex", alignItems: "center", ml: "auto", padding: "0 0 0 10px" }}>
              {!isAuth ? (
                <div className="topBarBtn__wrapper">
                  <Button
                    className="topBarBtn__exit"
                    sx={{ padding: 0 }}
                    color="inherit"
                    component={LinkBehavior}
                    to="/login"
                  >
                    Войти
                  </Button>
                  <Button
                    className="topBarBtn__exit"
                    sx={{ padding: 0 }}
                    color="inherit"
                    component={LinkBehavior}
                    to="/register"
                  >
                    Зарегистрироваться
                  </Button>
                </div>
              ) : (
                <Button className="topBarBtn__exit" color="inherit" onClick={handleLogout}>
                  Выход
                </Button>
              )}

              {isAuth && (
                <IconButton color="inherit" component={LinkBehavior} to="/basket" sx={{ ml: 2 }}>
                  <Badge badgeContent={products.length} color="error">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
              )}
            </Box>
          </Toolbar>
        </div>
      </AppBar>

      {/* Боковое меню (Drawer) вынесено в отдельный компонент */}
      <DrawerMenu
        open={open}
        toggleDrawer={toggleDrawer}
        isAuth={isAuth}
        userRole={userRole}
        handleLogout={handleLogout}
        products={products}
      />
    </>
  );
};

export default TopBar;

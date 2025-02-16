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
  ListItemIcon,
  ListItemText,
  Badge,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  ShoppingCart as ShoppingCartIcon,
  LocalPhone as LocalPhoneIcon,
  Email as EmailIcon,
  Home as HomeIcon,
  LocalOffer as LocalOfferIcon,
  Info as InfoIcon,
  LocalShipping as LocalShippingIcon,
  ContactMail as ContactMailIcon,
  Stars as StarsIcon,
  PersonAdd as PersonAddIcon,
  LockOpen as LockOpenIcon,
  VerifiedUser as VerifiedUserIcon,
  Security as SecurityIcon,
} from "@mui/icons-material";
import { styled, alpha } from "@mui/material/styles";
import { Link as RouterLink , useNavigate } from "react-router-dom";
import api from "../../api";

import "./TopBar.scss";

// Обёртка для Link, которая не передаёт проп "button" в DOM
const LinkBehavior = React.forwardRef(({ button, ...props }, ref) => (
    <RouterLink ref={ref} {...props} />
  ));

// Стили для поиска
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": { backgroundColor: alpha(theme.palette.common.white, 0.25) },
  flexGrow: 1,
  height: "50px",
  display: "flex",
  alignItems: "center",
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(2),
  paddingLeft: theme.spacing(5),
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  position: "absolute",
  left: theme.spacing(1),
  top: "50%",
  transform: "translateY(-50%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "rgba(255, 255, 255, 0.5)",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  height: "100%",
  fontSize: "18px",
  paddingLeft: theme.spacing(4),
}));

const TopBar = ({ isAuth, setIsAuth }) => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
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

  // Обработчик поиска (по нажатию Enter)
  const handleSearchSubmit = (e) => {
    if (e.key === "Enter") {
      navigate(`/search?q=${encodeURIComponent(searchValue)}`);
    }
  };

  return (
    <>
      {/* Верхняя панель */}
      <AppBar position="static" sx={{ padding: "8px 0" }}>
        <div className="container">
          <Toolbar disableGutters sx={{ minHeight: "54px !important", padding: 0 }}>
            {/* ЛОГОТИП */}
            <Typography variant="h6" component={LinkBehavior} to="/" sx={{ textDecoration: "none", color: "inherit", mr: 2 }}>
              My App
            </Typography>

            {/* КНОПКА-ГАМБУРГЕР */}
            <IconButton edge="start" color="inherit" sx={{ mr: 0 }} onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>

            {/* Поле поиска */}
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Поиск…"
                inputProps={{ "aria-label": "search" }}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={handleSearchSubmit}
              />
            </Search>

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
                  <Button className="topBarBtn__exit" sx={{ padding: 0 }} color="inherit" component={LinkBehavior} to="/login">
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

              {/* Корзина, если пользователь авторизован */}
              {isAuth && (
                <IconButton color="inherit" component={LinkBehavior} to="/basket" sx={{ ml: 2 }}>
                  <Badge badgeContent={3} color="error">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
              )}
            </Box>
          </Toolbar>
        </div>
      </AppBar>

      {/* Боковое меню (Drawer) */}
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <List className="drawer-list">
          {/* Общие ссылки */}
          <ListItem button component={LinkBehavior} to="/" className="drawer-list-item">
            <ListItemIcon className="drawer-list-item-icon">
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Главная" className="drawer-list-item-text" />
          </ListItem>
          <ListItem button component={LinkBehavior} to="/sale" className="drawer-list-item">
            <ListItemIcon className="drawer-list-item-icon">
              <LocalOfferIcon />
            </ListItemIcon>
            <ListItemText primary="Акции" className="drawer-list-item-text" />
          </ListItem>
          <ListItem button component={LinkBehavior} to="/company" className="drawer-list-item">
            <ListItemIcon className="drawer-list-item-icon">
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="О компании" className="drawer-list-item-text" />
          </ListItem>
          <ListItem button component={LinkBehavior} to="/payment-and-delivery" className="drawer-list-item">
            <ListItemIcon className="drawer-list-item-icon">
              <LocalShippingIcon />
            </ListItemIcon>
            <ListItemText primary="Оплата и доставка" className="drawer-list-item-text" />
          </ListItem>
          <ListItem button component={LinkBehavior} to="/contacts" className="drawer-list-item">
            <ListItemIcon className="drawer-list-item-icon">
              <ContactMailIcon />
            </ListItemIcon>
            <ListItemText primary="Контакты" className="drawer-list-item-text" />
          </ListItem>
          <ListItem button component={LinkBehavior} to="/points" className="drawer-list-item">
            <ListItemIcon className="drawer-list-item-icon">
              <StarsIcon />
            </ListItemIcon>
            <ListItemText primary="Баллы" className="drawer-list-item-text" />
          </ListItem>
          <ListItem button component={LinkBehavior} to="/search" className="drawer-list-item">
            <ListItemIcon className="drawer-list-item-icon">
              <SearchIcon />
            </ListItemIcon>
            <ListItemText primary="Поиск" className="drawer-list-item-text" />
          </ListItem>
          <ListItem button component={LinkBehavior} to="/basket" className="drawer-list-item">
            <ListItemIcon className="drawer-list-item-icon">
              <Badge badgeContent={3} color="error">
                <ShoppingCartIcon />
              </Badge>
            </ListItemIcon>
            <ListItemText primary="Корзина" className="drawer-list-item-text" />
          </ListItem>

          {/* Если пользователь НЕ авторизован */}
          {!isAuth ? (
            <>
              <ListItem button component={LinkBehavior} to="/register" className="drawer-list-item">
                <ListItemIcon className="drawer-list-item-icon">
                  <PersonAddIcon />
                </ListItemIcon>
                <ListItemText primary="Register" className="drawer-list-item-text" />
              </ListItem>
              <ListItem button component={LinkBehavior} to="/login" className="drawer-list-item">
                <ListItemIcon className="drawer-list-item-icon">
                  <LockOpenIcon />
                </ListItemIcon>
                <ListItemText primary="Login" className="drawer-list-item-text" />
              </ListItem>
            </>
          ) : (
            <>
              <ListItem button component={LinkBehavior} to="/protected1" className="drawer-list-item">
                <ListItemIcon className="drawer-list-item-icon">
                  <VerifiedUserIcon />
                </ListItemIcon>
                <ListItemText primary="Protected1" className="drawer-list-item-text" />
              </ListItem>
              <ListItem button component={LinkBehavior} to="/protected2" className="drawer-list-item">
                <ListItemIcon className="drawer-list-item-icon">
                  <SecurityIcon />
                </ListItemIcon>
                <ListItemText primary="Protected2" className="drawer-list-item-text" />
              </ListItem>
              <ListItem className="drawer-list-item">
                <Button variant="outlined" color="error" onClick={handleLogout} fullWidth className="drawer-button">
                  Выход
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

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
  flexGrow: 1, // Растягивается на всю ширину
  height: "50px", // Высота поиска
  display: "flex",
  alignItems: "center",
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(2),
  paddingLeft: theme.spacing(5), // Отступ для иконки
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  position: "absolute",
  left: theme.spacing(1), // Иконка слева
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
  height: "100%", // Высота 100% от родителя (50px)
  fontSize: "18px",
  paddingLeft: theme.spacing(4), // Смещение текста вправо от иконки
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
          <Toolbar disableGutters sx={{ minHeight: 90, padding: 0 }}>
            {/* ЛОГОТИП */}
            <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: "none", color: "inherit", mr: 2 }}>
              My App
            </Typography>

            {/* КНОПКА-ГАМБУРГЕР */}
            <IconButton edge="start" color="inherit" sx={{ mr: 2 }} onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>

            {/* Поле поиска (на всю ширину и высотой 50px) */}
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Поиск…"
                inputProps={{ "aria-label": "search" }}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={handleSearchSubmit} // Обработка Enter
              />
            </Search>

            {/* Кнопки авторизации и корзина */}
            <Box sx={{ display: "flex", alignItems: "center", ml: "auto" }}>
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
                  Выход
                </Button>
              )}

              {/* Если user авторизован */}
              {isAuth && (
                <>
                  {/* Иконка корзины */}
                  <IconButton color="inherit" component={Link} to="/basket" sx={{ ml: 2 }}>
                    <Badge badgeContent={3} color="error">
                      <ShoppingCartIcon />
                    </Badge>
                  </IconButton>
                </>
              )}
            </Box>
          </Toolbar>
        </div>
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

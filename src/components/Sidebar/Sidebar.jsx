import React, { useState } from "react";
import { Drawer, List, ListItem, ListItemText, IconButton, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api";

const Sidebar = ({ isAuth, setIsAuth }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (isOpen) => () => {
    setOpen(isOpen);
  };

  // Обработчик выхода (Exit)
  const handleLogout = async () => {
    try {
      await api.post("/logout");
      setIsAuth(false);
      navigate("/login");
      setOpen(false); // Закрываем меню после выхода
    } catch (err) {
      console.error("Ошибка при логауте:", err);
    }
  };

  return (
    <div>
      {/* Кнопка-гамбургер */}
      <IconButton onClick={toggleDrawer(true)}>
        <MenuIcon />
      </IconButton>

      {/* Боковое меню */}
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
    </div>
  );
};

export default Sidebar;

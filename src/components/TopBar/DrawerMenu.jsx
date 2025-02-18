import React from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Badge, Button } from "@mui/material";
import {
  Home as HomeIcon,
  LocalOffer as LocalOfferIcon,
  Info as InfoIcon,
  LocalShipping as LocalShippingIcon,
  ContactMail as ContactMailIcon,
  Stars as StarsIcon,
  Search as SearchIcon,
  ShoppingCart as ShoppingCartIcon,
  PersonAdd as PersonAddIcon,
  LockOpen as LockOpenIcon,
  VerifiedUser as VerifiedUserIcon,
  Security as SecurityIcon,
} from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import "./TopBar.scss";

// Обёртка для Link, которая не передаёт проп "button" в DOM
const LinkBehavior = React.forwardRef(({ button, ...props }, ref) => <RouterLink ref={ref} {...props} />);

const DrawerMenu = ({ open, toggleDrawer, isAuth, userRole, handleLogout }) => {
  return (
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
            <ListItem button component={LinkBehavior} to="/basket" className="drawer-list-item">
              <ListItemIcon className="drawer-list-item-icon">
                <Badge badgeContent={3} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </ListItemIcon>
              <ListItemText primary="Корзина" className="drawer-list-item-text" />
            </ListItem>
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

            {/* Показываем "Добавить продукт" только если роль admin */}
            {userRole === "admin" && (
              <ListItem button component={LinkBehavior} to="/add-product" className="drawer-list-item">
                <ListItemIcon className="drawer-list-item-icon">
                  <SecurityIcon />
                </ListItemIcon>
                <ListItemText primary="Добавить продукт" className="drawer-list-item-text" />
              </ListItem>
            )}

            <ListItem className="drawer-list-item">
              <Button variant="outlined" color="error" onClick={handleLogout} fullWidth className="drawer-button">
                Выход
              </Button>
            </ListItem>
          </>
        )}
      </List>
    </Drawer>
  );
};

export default DrawerMenu;

import React from "react";
import { Box, Typography, Container, Divider, List, ListItem, ListItemText } from "@mui/material";

function Company() {
  return (
    <Box py={4}>
      <Container>
        <Typography variant="h3" component="h1" align="center" gutterBottom>
          О компании Город Бизнеса
        </Typography>

        <Typography variant="h5" component="h2" gutterBottom>
          О нас
        </Typography>
        <Typography paragraph>
          Город Бизнеса — сеть специализированных магазинов по продаже кофе швейцарской фирмы Blaser и кофейного
          оборудования ведущих мировых производителей: De`Longhi, Saeco, Gaggia, Spidem, Elektra, Schaerer, Mazzer,
          Bravilor Bonamat, Dalla Corte, Macap, Ditting с дегустационным залом и сервисным центром.
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h5" component="h2" gutterBottom>
          Наши преимущества
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Широкий ассортимент кофе швейцарской компании Blasercafe и моносортов собственной обжарки." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Официальный импортер кофейного оборудования от мировых производителей." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Профессиональная консультация и помощь при выборе кофейного оборудования." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Гарантийное и послегарантийное обслуживание квалифицированными инженерами сервисного центра." />
          </ListItem>
        </List>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h5" component="h2" gutterBottom>
          История компании
        </Typography>
        <Typography paragraph>
          История невероятных приключений эспрессо в Украине начинается с 1995 года. Основатели компании Город Бизнеса
          впервые познакомили украинцев с кофе Blasercafe, который сразу выделился на рынке непревзойденным качеством и
          приемлемой ценой.
        </Typography>
        <Typography paragraph>
          Два года активной работы на выставках принесли плоды: в 1998 году открылся первый магазин Город Бизнеса в
          Харькове, а затем магазины начали появляться в других городах Украины. С 2014 года успешно развивается сеть
          магазинов в Грузии.
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h5" component="h2" gutterBottom>
          Контакты
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Харьков 'Город Бизнеса'" secondary="Тел.: (057) 752-05-12 | Факс: (057) 752-05-11" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Киев 'Город Бизнеса'" secondary="Тел.: (044) 496-21-83 | Факс: (044) 496-21-81" />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Сервисный центр в Харькове"
              secondary="ул. Кооперативная, 6/8 | Тел.: (057) 757-83-53"
            />
          </ListItem>
          <ListItem>
            <ListItemText primary="Сервисный центр в Киеве" secondary="ул. Васильковская, 30 | Тел.: (044) 496-21-82" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Горячая линия" secondary="0-800-212-098" />
          </ListItem>
        </List>

        <Typography variant="body1" align="center" mt={4}>
          Официальный сайт:{" "}
          <a href="https://g2bhoreca.shop" target="_blank" rel="noopener noreferrer">
            g2bhoreca.shop
          </a>
        </Typography>
      </Container>
    </Box>
  );
}

export default Company;

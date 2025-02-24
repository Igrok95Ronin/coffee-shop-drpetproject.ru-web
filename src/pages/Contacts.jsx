import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Button,
} from "@mui/material";
import { Phone, Email, LocationOn, AccessTime } from "@mui/icons-material";

function Contacts() {
  return (
    <Box py={4}>
      <Container>
        <Typography variant="h3" component="h1" align="center" gutterBottom>
          Контакты
        </Typography>

        <Typography variant="h5" gutterBottom>
          Город Бизнеса — международная сеть специализированных магазинов по продаже кофейного оборудования и кофе с дегустационным залом, сервисным центром и кофейными уголками.
        </Typography>

        {/* Контакты магазинов */}
        <Grid container spacing={4} mb={4}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Харьков «Город Бизнеса»
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon><Phone /></ListItemIcon>
                    <ListItemText primary="(057) 752-05-12" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><Phone /></ListItemIcon>
                    <ListItemText primary="(097) 966-83-80" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><Email /></ListItemIcon>
                    <ListItemText primary="kharkovdk@gmail.com" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Киев «Город Бизнеса»
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon><Phone /></ListItemIcon>
                    <ListItemText primary="(044) 496-21-83" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><Phone /></ListItemIcon>
                    <ListItemText primary="(050) 555-14-47" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><Email /></ListItemIcon>
                    <ListItemText primary="kiev@domkofe.ua" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Сервисные центры */}
        <Typography variant="h4" gutterBottom>
          Контакты сервисных центров по Украине
        </Typography>
        <Grid container spacing={4} mb={4}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Сервисный центр в Харькове
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon><LocationOn /></ListItemIcon>
                    <ListItemText primary="ул. Кооперативная, 6/8" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><Phone /></ListItemIcon>
                    <ListItemText primary="(057) 757-83-53 / (093) 351-31-33" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><LocationOn /></ListItemIcon>
                    <ListItemText primary="ул. Сумская, 73" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><Phone /></ListItemIcon>
                    <ListItemText primary="(057) 719-41-80" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Сервисный центр в Киеве
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon><LocationOn /></ListItemIcon>
                    <ListItemText primary="ул. Васильковская, 30" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><Phone /></ListItemIcon>
                    <ListItemText primary="(044) 496-21-82 / (099) 420-66-21" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* График работы */}
        <Typography variant="h4" gutterBottom>
          График работы
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon><AccessTime /></ListItemIcon>
            <ListItemText primary="Пн-Пт: с 9:00 до 18:00" />
          </ListItem>
          <ListItem>
            <ListItemIcon><AccessTime /></ListItemIcon>
            <ListItemText primary="Суббота: с 10:00 до 18:00" />
          </ListItem>
          <ListItem>
            <ListItemIcon><AccessTime /></ListItemIcon>
            <ListItemText primary="Воскресенье: выходной" />
          </ListItem>
        </List>

        <Typography variant="h4" gutterBottom>
          Свяжитесь с нами
        </Typography>
        <Box component="form" noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Ваше имя" required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Ваш e-mail" required type="email" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Сообщение" multiline rows={4} required />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary">
                Отправить
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

export default Contacts;

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
  Divider,
} from "@mui/material";
import { Star, ShoppingCart, Discount } from "@mui/icons-material";

function Points() {
  return (
    <Box py={4}>
      <Container>
        <Typography variant="h3" component="h1" align="center" gutterBottom>
          Программа лояльности: Баллы за покупки
        </Typography>

        <Typography variant="h5" gutterBottom>
          Как это работает?
        </Typography>
        <Typography paragraph>
          Каждый раз, когда вы совершаете покупку в магазине "Город Бизнеса", вы получаете баллы, которые можно использовать для получения скидок на будущие покупки. Чем больше вы покупаете, тем больше баллов накапливаете и тем больше скидку можете получить.
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h5" gutterBottom>
          Преимущества программы
        </Typography>
        <Grid container spacing={4} mb={4}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <ListItemIcon>
                  <ShoppingCart color="primary" />
                </ListItemIcon>
                <Typography variant="h6" gutterBottom>
                  Получайте баллы за покупки
                </Typography>
                <Typography>
                  За каждые 100 грн, потраченные в нашем магазине, вы получаете 10 баллов на ваш аккаунт.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <ListItemIcon>
                  <Star color="secondary" />
                </ListItemIcon>
                <Typography variant="h6" gutterBottom>
                  Копите баллы и экономьте
                </Typography>
                <Typography>
                  Чем больше баллов вы накопите, тем большую скидку получите. 100 баллов = скидка 5%, 200 баллов = скидка 10%.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <ListItemIcon>
                  <Discount color="success" />
                </ListItemIcon>
                <Typography variant="h6" gutterBottom>
                  Используйте баллы на кассе
                </Typography>
                <Typography>
                  При оформлении следующей покупки вы можете использовать накопленные баллы и получить скидку прямо на кассе.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h5" gutterBottom>
          Как начисляются баллы?
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon><Star /></ListItemIcon>
            <ListItemText primary="10 баллов за каждые 100 грн покупки." />
          </ListItem>
          <ListItem>
            <ListItemIcon><Star /></ListItemIcon>
            <ListItemText primary="Баллы начисляются автоматически сразу после оплаты заказа." />
          </ListItem>
          <ListItem>
            <ListItemIcon><Star /></ListItemIcon>
            <ListItemText primary="Срок действия баллов — 6 месяцев с момента начисления." />
          </ListItem>
        </List>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h5" gutterBottom>
          Пример использования баллов
        </Typography>
        <Typography>
          Если вы совершили покупку на 1000 грн, вы получите 100 баллов. При следующей покупке вы сможете использовать эти баллы и получить скидку 5%.
        </Typography>

        <Box mt={4} textAlign="center">
          <Typography variant="h6" color="primary">
            Начните копить баллы уже сегодня и экономьте на каждой следующей покупке!
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Points;
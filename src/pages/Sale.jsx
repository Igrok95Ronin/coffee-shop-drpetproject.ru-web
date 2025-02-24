import React from "react";
import HelmetMeta from "../components/HelmetMeta/HelmetMeta";
import { Box, Typography, Container, Grid, Card, CardMedia, CardContent } from "@mui/material";

function Sale() {
  return (
    <Box py={4}>
      <Container>
        <HelmetMeta
          title="Акции | Мое приложение"
          description="Все актуальные акции на товары"
          keywords="скидки, акции, распродажа, товары, магазин"
        />

        <Typography variant="h3" component="h1" align="center" gutterBottom>
          Акции от Город Бизнеса
        </Typography>

        <Grid container spacing={4} mb={4}>
          {/* Первая акция */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardMedia
                component="img"
                height="300"
                image="/sale/miele-banner-01-11-2021-ru2.png"
                alt="Кофе из самого сердца Европы!"
              />
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Кофе из самого сердца Европы!
                </Typography>
                <Typography>
                  Скидки на кофемашины Miele: MIELE CM 6160, CM 6360, CM 6560, CM6350 GRGR gray, CM6350 LOWE white,
                  CM6350 OBSW black.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Вторая акция */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardMedia component="img" height="300" image="/sale/keepcup-family-set.jpg" alt="Keep Cup Family Set" />
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Keep Cup Family Set
                </Typography>
                <Typography>
                  Специальное предложение на покупку эко-чашек Keep Cup: при покупке 2-х чашек скидка -5%, 3-х -7.5%,
                  4-я ExtraSmall -20%.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Typography variant="h4" component="h2" gutterBottom>
          Где купить кофемашину по акции
        </Typography>
        <Typography paragraph>
          Оформить покупку понравившейся вам кофемашины со скидкой можно онлайн в нашем интернет-магазине. Актуальные
          цены указаны на сайте Город Бизнеса. Оплата и доставка осуществляются удобным вам способом.
        </Typography>

        <Typography variant="h4" component="h2" gutterBottom>
          На какие товары распространяются скидки?
        </Typography>
        <Typography paragraph>
          Акции распространяются на автоматические кофемашины, кофеварки, капсульные кофемашины, а также на посуду,
          чайники и аксессуары.
        </Typography>

        <Typography variant="h4" component="h2" gutterBottom>
          Как воспользоваться скидкой?
        </Typography>
        <Typography paragraph>
          Чтобы купить товар по акционной цене, просто добавьте его в корзину. Цена и размер скидки указаны на сайте.
          После оформления покупки товар будет доставлен удобным для вас способом.
        </Typography>
      </Container>
    </Box>
  );
}

export default Sale;

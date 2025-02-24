import React from "react";
import { Box, Typography, Container, List, ListItem, ListItemIcon, ListItemText, Divider, Grid, Card, CardContent } from "@mui/material";
import { CreditCard, LocalShipping, AccessTime, CheckCircle } from "@mui/icons-material";

function PaymentAndDelivery() {
  return (
    <Box py={4}>
      <Container>
        <Typography variant="h3" component="h1" align="center" gutterBottom>
          Оплата и доставка товара
        </Typography>

        <Divider sx={{ my: 3 }} />

        {/* Оплата */}
        <Typography variant="h4" gutterBottom>
          Оплата
        </Typography>

        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Наличный расчет
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <CreditCard />
                    </ListItemIcon>
                    <ListItemText primary="Наличными при получении в магазинах сети Город Бизнеса." />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CreditCard />
                    </ListItemIcon>
                    <ListItemText primary="Наличными при доставке нашей службой логистики." />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CreditCard />
                    </ListItemIcon>
                    <ListItemText primary="Оплата по терминалу при получении нашей службой логистики." />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Безналичный расчет
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <CreditCard />
                    </ListItemIcon>
                    <ListItemText primary="Оплата онлайн при помощи карты Visa или MasterCard." />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CreditCard />
                    </ListItemIcon>
                    <ListItemText primary="Безналичный расчет для юридических лиц (счет выставляется после оформления заказа)." />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Рассрочка */}
        <Typography variant="h4" gutterBottom>
          Кредит «Мгновенная рассрочка» от ПриватБанк
        </Typography>
        <Typography paragraph>
          В нашем интернет-магазине вы можете приобрести товар по кредитной программе «Мгновенная рассрочка» до 24 месяцев с ежемесячной комиссией 2,9% от ПриватБанка. Программа доступна владельцам карт ПриватБанк.
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <CheckCircle />
            </ListItemIcon>
            <ListItemText primary="Выберите товар и поместите в корзину." />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircle />
            </ListItemIcon>
            <ListItemText primary="Выберите способ оплаты — «Кредит «Мгновенная рассрочка» и укажите количество платежей." />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircle />
            </ListItemIcon>
            <ListItemText primary="Совершите покупку, сделав первый взнос с карты ПриватБанка." />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircle />
            </ListItemIcon>
            <ListItemText primary="Каждые 30 дней с момента покупки с вашей карты будет сниматься сумма ежемесячного платежа." />
          </ListItem>
        </List>

        <Divider sx={{ my: 3 }} />

        {/* Доставка */}
        <Typography variant="h4" gutterBottom>
          Доставка
        </Typography>
        <Typography paragraph>
          Мы отправляем заказы по всей Украине с помощью «Новой Почты» и других перевозчиков. Получив товар на складе, вы сможете проверить его комплектацию.
        </Typography>

        <List>
          <ListItem>
            <ListItemIcon>
              <LocalShipping />
            </ListItemIcon>
            <ListItemText primary="Стоимость доставки согласно тарифам перевозчика." />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <LocalShipping />
            </ListItemIcon>
            <ListItemText primary="При покупке от 2000 грн — доставка бесплатная до отделения Новой Почты." />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <LocalShipping />
            </ListItemIcon>
            <ListItemText primary="Срок доставки 2-3 дня." />
          </ListItem>
        </List>

        <Divider sx={{ my: 3 }} />

        {/* Время доставки */}
        <Typography variant="h4" gutterBottom>
          Время доставки
        </Typography>
        <Typography variant="h6" gutterBottom>
          По Киеву и Харькову
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <AccessTime />
            </ListItemIcon>
            <ListItemText primary="Будние дни: с 12:00 до 18:00." />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <AccessTime />
            </ListItemIcon>
            <ListItemText primary="Суббота и воскресенье доставка обычно не осуществляется." />
          </ListItem>
        </List>

        <Typography variant="h6" gutterBottom>
          По Украине
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <AccessTime />
            </ListItemIcon>
            <ListItemText primary="Будние дни: с 11:00 до 17:00." />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <AccessTime />
            </ListItemIcon>
            <ListItemText primary="Заказы, сделанные в выходные, обрабатываются в понедельник." />
          </ListItem>
        </List>
      </Container>
    </Box>
  );
}

export default PaymentAndDelivery;
import React from 'react';
import { Box, Typography, Container, Card, CardContent, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Lock, CheckCircle, Security } from '@mui/icons-material';

function ProtectedOne() {
  return (
    <Box py={4}>
      <Container>
        <Typography variant="h3" component="h1" align="center" gutterBottom>
          Личный кабинет
        </Typography>

        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Добро пожаловать в защищенный раздел!
            </Typography>
            <Typography paragraph>
              Здесь вы можете управлять своим аккаунтом, просматривать персональные предложения и следить за историей своих покупок.
            </Typography>

            <Typography variant="h6" gutterBottom>
              Возможности личного кабинета
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                <ListItemText primary="Просмотр и редактирование личных данных." />
              </ListItem>
              <ListItem>
                <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                <ListItemText primary="История заказов и их статус." />
              </ListItem>
              <ListItem>
                <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                <ListItemText primary="Доступ к персональным скидкам и бонусным баллам." />
              </ListItem>
              <ListItem>
                <ListItemIcon><CheckCircle color="primary" /></ListItemIcon>
                <ListItemText primary="Настройка уведомлений и подписок." />
              </ListItem>
            </List>

            <Typography variant="h6" gutterBottom>
              Безопасность ваших данных
            </Typography>
            <Typography paragraph>
              Мы заботимся о вашей конфиденциальности. Все данные надёжно защищены с помощью современных методов шифрования.
            </Typography>

            <Box textAlign="center" mt={3}>
              <Lock color="secondary" fontSize="large" />
              <Typography variant="body1" mt={1}>
                Ваши данные в безопасности — только вы имеете доступ к этой информации.
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default ProtectedOne;
import React from 'react';
import { Box, Typography, Container, Card, CardContent, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Shield, Star, History, Settings } from '@mui/icons-material';

function ProtectedTwo() {
  return (
    <Box py={4}>
      <Container>
        <Typography variant="h3" component="h1" align="center" gutterBottom>
          Эксклюзивные возможности
        </Typography>

        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Добро пожаловать в расширенный раздел!
            </Typography>
            <Typography paragraph>
              Этот раздел доступен только для авторизованных пользователей. Здесь вы найдете дополнительные возможности и эксклюзивный контент.
            </Typography>

            <Typography variant="h6" gutterBottom>
              Что вы можете здесь сделать?
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon><Star color="primary" /></ListItemIcon>
                <ListItemText primary="Получить доступ к эксклюзивным предложениям и скидкам." />
              </ListItem>
              <ListItem>
                <ListItemIcon><History color="primary" /></ListItemIcon>
                <ListItemText primary="Просматривать историю своих активностей на сайте." />
              </ListItem>
              <ListItem>
                <ListItemIcon><Settings color="primary" /></ListItemIcon>
                <ListItemText primary="Настроить персональные параметры аккаунта." />
              </ListItem>
              <ListItem>
                <ListItemIcon><Shield color="secondary" /></ListItemIcon>
                <ListItemText primary="Управлять настройками безопасности и конфиденциальности." />
              </ListItem>
            </List>

            <Typography variant="h6" gutterBottom>
              Почему это важно?
            </Typography>
            <Typography paragraph>
              Используя эти функции, вы можете сделать свое взаимодействие с платформой более удобным, безопасным и персонализированным.
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default ProtectedTwo;
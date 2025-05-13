import express from 'express';
import bodyParser from 'body-parser';
import requestRoutes from './routes/requestRoutes';
import { sequelize } from './database';

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Роуты
app.use('/api', requestRoutes);

// Запуск сервера и синхронизация базы данных
sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
});

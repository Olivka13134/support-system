import express from 'express';
import bodyParser from 'body-parser';
import requestRoutes from './routes/requestRoutes';
import { sequelize } from './database';
import { config } from './config';

const app = express();
const port = config.port;

app.use(bodyParser.json());

// Роуты
app.use('/api', requestRoutes);

// Запуск сервера и синхронизация базы данных
sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
});

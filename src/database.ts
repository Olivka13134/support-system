import { Sequelize } from 'sequelize';
import { config } from './config';

// Создание подключения к базе данных с использованием переменных окружения
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: config.db.host, // Используем переменную окружения
  username: config.db.user,
  password: config.db.password,
  database: config.db.database,
  logging: false, // Отключаем логирование SQL запросов (если не нужно)
});

export { sequelize };

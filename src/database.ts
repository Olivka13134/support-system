import { Sequelize } from 'sequelize';

// Настройки подключения к MySQL
const sequelize = new Sequelize(
  'support_system', // Имя базы данных
  'root', // Имя пользователя
  '', // Пароль
  {
    host: 'localhost', // Адрес MySQL сервера
    dialect: 'mysql',  // Используем MySQL
    logging: false,    // Выключаем логирование SQL запросов
  }
);

export { sequelize };

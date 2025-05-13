import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  'support_system', // Имя базы данных
  'root', // Имя пользователя
  '', // Пароль
  {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
  }
);

export { sequelize };

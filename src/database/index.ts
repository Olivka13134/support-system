import { Sequelize } from 'sequelize';
import { config } from '../config';

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: config.db.host,
  username: config.db.user,
  password: config.db.password,
  database: config.db.database,
  logging: false,
});

export { sequelize };
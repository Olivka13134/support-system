import dotenv from 'dotenv';

// Загружаем переменные окружения из файла .env
dotenv.config();

// Теперь можно использовать process.env для доступа к переменным окружения
export const config = {
  db: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'support_system',
  },
  port: process.env.PORT || 3000,
};

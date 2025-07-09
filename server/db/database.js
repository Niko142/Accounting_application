const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

// Конфигурация БД
let dbConfig;

if (process.env.DATABASE_URL) {
  // Для продакшена на Render
  dbConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  };
} else {
  // Для локальной разработки или Docker

  // Автоматическое определение host в зависимости от варианта сборки
  const host = process.env.DOCKER_ENV === 'true' ? 'db' : 'localhost';

  dbConfig = {
    host: host,
    user: process.env.USER_NAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT || 5432,
    ssl: false
  };
}

const db = new Pool(dbConfig);

// Автоматическое определение host в зависимости от вариант сборки проекта
// const host = process.env.DOCKER_ENV === 'true' ? 'db' : 'localhost';

// const db = new Pool({
//   host: host,
//   user: process.env.USER_NAME,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DATABASE,
//   port: process.env.DB_PORT || 5432,
//   ssl: false,
// });

// Подключение к БД
db.connect((err) => {
  if (err) {
    console.error("Ошибка подключения к PostgreSQL:", err.stack);
  } else {
    console.log("Соединение с PostgreSQL успешно установлено");
  }
});

module.exports = db;
const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

// Автоматическое определение host в зависимости от вариант сборки проекта
const host = process.env.DOCKER_ENV === 'true' ? 'db' : 'localhost';

const db = new Pool({
  // host: process.env.HOST,
  host: host,
  user: process.env.USER_NAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DB_PORT,
  ssl: false,
});

// Подключение к БД
db.connect((err) => {
  if (err) {
    console.error("Ошибка подключения к PostgreSQL:", err.stack);
  } else {
    console.log("Соединение с PostgreSQL успешно установлено");
  }
});

module.exports = db;
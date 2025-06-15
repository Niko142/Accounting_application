const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const db = new Pool({
  host: process.env.HOST,
  user: process.env.USER_NAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DB_PORT,
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
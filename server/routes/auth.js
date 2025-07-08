const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("@/db/database");

const router = express.Router();

// Запрос для авторизации в системе
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Проверка на наличие пользователя
    const result = await new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM users WHERE username = $1",
        [username],
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        }
      );
    });

    if (result.rows.length === 0) {
      return res
        .status(401)
        .json({ message: "Пользователь с таким логином не найден!!!" });
    }

    const user = result.rows[0];

    // Хеширование пароля для безопасности
    const passwordCompare = await bcrypt.compare(password, user.password);

    if (!passwordCompare) {
      return res.status(401).json({ message: "Ошибка: неверный пароль!!!" });
    }

    // Уникальный токен авторизации, действующий 4 часа
    const token = jwt.sign(
      {
        id: user.user_id,
        username: user.username,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "4h" }
    );

    return res.status(200).json({
      message: "Успешная авторизация",
      token,
      user: {
        id: user.user_id,
        username: user.username,
      },
    });
  } catch (err) {
    console.error("Ошибка при авторизации:", err);
    return res
      .status(500)
      .json({ message: err.message || "Ошибка сервера при попытке входа" });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Проверка на наличие пользователя
    const foundUser = await new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM users WHERE username = $1",
        [username],
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        }
      );
    });

    if (foundUser.rows.length > 0) {
      return res
        .status(400)
        .json({ message: "Пользователь с таким логином уже существует!" });
    }

    // Хеширование пароля
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Создаем нового пользователя
    const result = await db.query(
      "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING username",
      [username, hashedPassword]
    );

    return res.status(201).json({
      message: "Пользователь успешно зарегистрирован в системе",
      user: result.rows[0].username,
    });
  } catch (err) {
    console.error("Ошибка сервера при регистрации", err);
    return res.status(500).json({
      message:
        err.message || "Ошибка сервера при формировании нового пользователя",
    });
  }
});

module.exports = router;

const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db/database");

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

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
        .json({ message: "Пользователь с таким никнеймом не найден!!!" });
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

module.exports = router;
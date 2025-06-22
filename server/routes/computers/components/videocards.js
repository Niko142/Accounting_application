const express = require("express");
const db = require("@db/database");
const verifyJwtToken = require("@utils/verifyToken");

const router = express.Router();

router.use(verifyJwtToken);

router.get("/", async (_, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM videocard WHERE location = 'Склад' ORDER BY id_videocard ASC"
    );
    return res.json(result.rows);
  } catch (err) {
    console.log("Ошибка сервера", err);
    return res
      .status(500)
      .json({ message: "Ошибка сервера при получении данных" });
  }
});

router.post("/add", async (req, res) => {
  try {
    const { model, price, location } = req.body;

    const result = await db.query(
      "INSERT INTO videocard (model, price, location) VALUES ($1, $2, $3)",
      [model, price, location]
    );

    return res.status(201).json({
      message: "Видеокарта успешно добавлена",
      videocard: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: err.message || "Ошибка сервера при добавлении видеокарты",
    });
  }
});

router.put("/location/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { location } = req.body;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        message: "Некорректный ID видеокарты",
      });
    }

    if (!location) {
      return res.status(400).json({
        message: "Поле 'location' не указано",
      });
    }

    const result = await db.query(
      "UPDATE videocard SET location = $1 WHERE id_videocard = $2 RETURNING *",
      [location, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Видеокарта не найдена",
      });
    }

    return res.status(201).json({
      message: "Расположение видеокарты успешно обновлено",
      videocard: result.rows[0],
    });
  } catch (err) {
    console.error("Ошибка изменения местоположения:", err);
    return res.status(500).json({
      message: "Ошибка сервера при обновлении местоположения видеокарты",
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        message: "Некорректный ID видеокарты",
      });
    }

    const result = await db.query(
      "DELETE FROM videocard WHERE id_videocard = $1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Запись о видеокарте не найдена",
      });
    }

    return res.status(200).json({
      message: "Запись о видеокарте успешно удалена",
      processor: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Ошибка сервера при утилизации видеокарты",
    });
  }
});

router.put("/computer/:id", async (req, res) => {
  const { id } = req.params;
  const { videocard } = req.body;

  try {
    if (!id || isNaN(id)) {
      return res.status(400).json({
        message: "Некорректный ID видеокарты",
      });
    }
    const result = await db.query(
      "UPDATE computer SET videocard_id = $1 WHERE id_computer = $2 RETURNING *",
      [videocard, id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Компьютер не найден" });
    }
    return res.status(200).json({ message: "Видеокарта успешно обновлена" });
  } catch (err) {
    console.error("Ошибка при обновлении видеокарты:", err);
    res.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
});

module.exports = router;

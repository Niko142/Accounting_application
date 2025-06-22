const express = require("express");
const db = require("@db/database");
const verifyJwtToken = require("@utils/verifyToken");

const router = express.Router();

router.use(verifyJwtToken);

router.get("/", async (_, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM memory WHERE location = 'Склад' ORDER BY id_memory ASC"
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
    const { model, type, volume, price, location } = req.body;

    const result = await db.query(
      "INSERT INTO memory (model, type, volume, price, location) VALUES ($1, $2, $3, $4, $5)",
      [model, type, volume, price, location]
    );

    return res.status(201).json({
      message: "ОЗУ успешно добавлена",
      memory: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: err.message || "Ошибка сервера при добавлении ОЗУ",
    });
  }
});

router.put("/location/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { location } = req.body;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        message: "Некорректный ID ОЗУ",
      });
    }

    if (!location) {
      return res.status(400).json({
        message: "Поле 'location' не указано",
      });
    }

    const result = await db.query(
      "UPDATE memory SET location = $1 WHERE id_memory = $2 RETURNING *",
      [location, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "ОЗУ не найдена",
      });
    }

    return res.status(201).json({
      message: "Расположение ОЗУ успешно обновлено",
      memory: result.rows[0],
    });
  } catch (err) {
    console.error("Ошибка изменения местоположения:", err);
    return res.status(500).json({
      message: "Ошибка сервера при обновлении местоположения ОЗУ",
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        message: "Некорректный ID ОЗУ",
      });
    }
    const result = await db.query(
      "DELETE FROM memory WHERE id_memory = $1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Запись об ОЗУ не найдена",
      });
    }

    return res.status(200).json({
      message: "Запись об ОЗУ успешно удалена",
      memory: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Ошибка сервера при утилизации ОЗУ",
    });
  }
});

router.put("/computer/:id", async (req, res) => {
  const { id } = req.params;
  const { memory } = req.body;

  try {
    if (!id || isNaN(id)) {
      return res.status(400).json({
        message: "Некорректный ID ОЗУ",
      });
    }
    const result = await db.query(
      "UPDATE computer SET memory_id = $1 WHERE id_computer = $2 RETURNING *",
      [memory, id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Компьютер не найден" });
    }
    return res.status(200).json({ message: "Память успешно обновлена" });
  } catch (err) {
    console.error("Ошибка при обновлении памяти:", err);
    res.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
});

module.exports = router;

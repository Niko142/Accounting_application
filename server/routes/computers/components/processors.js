const express = require("express");
const db = require("@db/database");
const verifyJwtToken = require("@utils/verifyToken");

const router = express.Router();

router.use(verifyJwtToken);

router.get("/processor", async (_, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM processor WHERE location = 'Склад' ORDER BY id_processor ASC"
    );
    return res.json(result.rows);
  } catch (err) {
    console.log("Ошибка сервера", err);
    return res
      .status(500)
      .json({ message: "Ошибка сервера при получении данных" });
  }
});

router.post("/add_processor", async (req, res) => {
  try {
    const { model, rate, price, location } = req.body;

    const result = await db.query(
      "INSERT INTO processor (model, rate, price, location) VALUES ($1, $2, $3, $4)",
      [model, rate, price, location]
    );

    return res.status(201).json({
      message: "Процессор успешно добавлен",
      processor: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: err.message || "Ошибка сервера при добавлении процессора",
    });
  }
});

router.put("/update_processor/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { location } = req.body;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        message: "Некорректный ID процессора",
      });
    }

    if (!location) {
      return res.status(400).json({
        message: "Поле 'location' не указано",
      });
    }

    const result = await db.query(
      "UPDATE processor SET location = $1 WHERE id_processor = $2 RETURNING *",
      [location, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Процессор не найден",
      });
    }

    return res.status(201).json({
      message: "Расположение процессора успешно обновлено",
      processor: result.rows[0],
    });
  } catch (err) {
    console.error("Ошибка изменения местоположения:", err);
    return res.status(500).json({
      message: "Ошибка сервера при обновлении местоположения процессора",
    });
  }
});

router.delete("/delete-processor/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        message: "Некорректный ID процессора",
      });
    }
    const result = await db.query(
      "DELETE FROM processor WHERE id_processor = $1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Запись о процессоре не найдена",
      });
    }

    return res.status(200).json({
      message: "Запись о процессоре успешно удалена",
      processor: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Ошибка сервера при утилизации процессора",
    });
  }
});

router.put("/update_computer_processor/:id", async (req, res) => {
  const { id } = req.params;
  const { processor } = req.body;

  try {
    if (!id || isNaN(id)) {
      return res.status(400).json({
        message: "Некорректный ID процессора",
      });
    }
    const result = await db.query(
      "UPDATE computer SET processor_id = $1 WHERE id_computer = $2 RETURNING *",
      [processor, id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Компьютер не найден" });
    }
    return res.status(200).json({ message: "Процессор успешно обновлен" });
  } catch (err) {
    console.error("Ошибка при обновлении процессора:", err);
    res.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
});

module.exports = router;

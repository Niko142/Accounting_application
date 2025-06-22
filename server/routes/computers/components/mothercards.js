const express = require("express");
const db = require("@db/database");
const verifyJwtToken = require("@utils/verifyToken");

const router = express.Router();

router.use(verifyJwtToken);

router.get("/", async (_, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM mothercard WHERE location = 'Склад' ORDER BY id_mothercard ASC"
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
    const { model, type, rate, price, location } = req.body;

    const result = await db.query(
      "INSERT INTO mothercard (model, type, rate, price, location) VALUES ($1, $2, $3, $4, $5)",
      [model, type, rate, price, location]
    );

    return res.status(201).json({
      message: "Материнская плата успешно добавлена",
      mothercard: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: err.message || "Ошибка сервера при добавлении материнской платы",
    });
  }
});

router.put("/location/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { location } = req.body;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        message: "Некорректный ID материнской платы",
      });
    }

    if (!location) {
      return res.status(400).json({
        message: "Поле 'location' не указано",
      });
    }

    const result = await db.query(
      "UPDATE mothercard SET location = $1 WHERE id_mothercard = $2 RETURNING *",
      [location, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Материнская плата не найдена",
      });
    }

    return res.status(201).json({
      message: "Расположение материнской платы успешно обновлено",
      mothercard: result.rows[0],
    });
  } catch (err) {
    console.error("Ошибка изменения местоположения:", err);
    return res.status(500).json({
      message: "Ошибка сервера при обновлении местоположения материнской платы",
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        message: "Некорректный ID материнской платы",
      });
    }
    const result = await db.query(
      "DELETE FROM mothercard WHERE id_mothercard = $1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Запись о материнской плате не найдена",
      });
    }

    return res.status(200).json({
      message: "Запись о материнской плате успешно удалена",
      mothercard: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Ошибка сервера при утилизации материнской платы",
    });
  }
});

router.put("/computer/:id", async (req, res) => {
  const { id } = req.params;
  const { mothercard } = req.body;

  try {
    if (!id || isNaN(id)) {
      return res.status(400).json({
        message: "Некорректный ID материнской карты",
      });
    }
    const result = await db.query(
      "UPDATE computer SET mothercard_id = $1 WHERE id_computer = $2 RETURNING *",
      [mothercard, id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Компьютер не найден" });
    }
    return res
      .status(200)
      .json({ message: "Материнская плата успешно обновлена" });
  } catch (err) {
    console.error("Ошибка при обновлении материнской платы:", err);
    res.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
});

module.exports = router;

const express = require("express");
const db = require("@db/database");
const verifyJwtToken = require("@utils/verifyToken");

const router = express.Router();

router.use(verifyJwtToken);

router.get("/", async (_, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM disk WHERE location = 'Склад' ORDER BY id_disk ASC"
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
    const { model, volume, price, location } = req.body;

    const result = await db.query(
      "INSERT INTO disk (model, volume, price, location) VALUES ($1, $2, $3, $4)",
      [model, volume, price, location]
    );

    return res.status(201).json({
      message: "Диск успешно добавлен",
      disk: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: err.message || "Ошибка сервера при добавлении диска",
    });
  }
});

router.put("/location/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { location } = req.body;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        message: "Некорректный ID диска",
      });
    }

    if (!location) {
      return res.status(400).json({
        message: "Поле 'location' не указано",
      });
    }

    const result = await db.query(
      "UPDATE disk SET location = $1 WHERE id_disk = $2 RETURNING *",
      [location, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Диск не найден",
      });
    }

    return res.status(201).json({
      message: "Расположение диска успешно обновлено",
      memory: result.rows[0],
    });
  } catch (err) {
    console.error("Ошибка изменения местоположения:", err);
    return res.status(500).json({
      message: "Ошибка сервера при обновлении местоположения диска",
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        message: "Некорректный ID диска",
      });
    }
    const result = await db.query(
      "DELETE FROM disk WHERE id_disk = $1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Запись о диске не найдена",
      });
    }

    return res.status(200).json({
      message: "Запись о диске успешно удалена",
      disk: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Ошибка сервера при утилизации диска",
    });
  }
});

router.put("/computer/:id", async (req, res) => {
  const { id } = req.params;
  const { disk } = req.body;

  try {
    if (!id || isNaN(id)) {
      return res.status(400).json({
        message: "Некорректный ID диска",
      });
    }
    const result = await db.query(
      "UPDATE computer SET disk_id = $1 WHERE id_computer = $2 RETURNING *",
      [disk, id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Компьютер не найден" });
    }
    return res.status(200).json({ message: "Диск успешно обновлен" });
  } catch (err) {
    console.error("Ошибка при обновлении диска:", err);
    res.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
});

module.exports = router;
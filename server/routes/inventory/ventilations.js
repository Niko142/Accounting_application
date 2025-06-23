const express = require("express");
const db = require("@/db/database");
const verifyJwtToken = require("@/utils/verifyToken");

const router = express.Router();

router.use(verifyJwtToken);

// Запрос на получение данных о всех сплит-системах
router.get("/", async (_, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM ventilation_description ORDER BY ventilation_id ASC"
    );
    return res.json(result.rows);
  } catch (err) {
    console.error("Ошибка сервера", err);
    return res
      .status(500)
      .json({ message: "Ошибка сервера при получении данных" });
  }
});

// Запрос на получение данных о сплит-системах на складе
router.get("/warehouse", async (_, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM ventilation_description WHERE location = 'Склад' ORDER BY ventilation_id ASC"
    );
    return res.json(result.rows);
  } catch (err) {
    console.error("Ошибка сервера", err);
    return res
      .status(500)
      .json({ message: "Ошибка сервера при получении данных" });
  }
});

// Запрос на формирование записи о новой сплит-системе
router.post("/", async (req, res) => {
  try {
    const { model, filter, warm, price, location, status } = req.body;

    const result = await db.query(
      "INSERT INTO ventilation_description (model, filter, warm, price, location, status) VALUES ($1, $2, $3, $4, $5, $6)",
      [model, filter, warm, price, location, status]
    );

    return res.status(201).json({
      message: "Система вентиляции успешно добавлена на склад",
      ventilation: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: err.message || "Ошибка сервера при добавлении сплит-системы",
    });
  }
});

// Запрос на обновление данных о материальном лице
router.put("/employee/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { employee } = req.body;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        message: "Некорректный ID сплит-системы",
      });
    }

    if (!employee) {
      return res.status(400).json({
        message: "Поле 'employee' обязательно для заполнения",
      });
    }

    const result = await db.query(
      "UPDATE ventilation_description SET employee = $1 WHERE ventilation_id = $2 RETURNING *",
      [employee, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Сплит-система не найдена",
      });
    }

    return res.status(200).json({
      message: "Сплит-система успешно обновлена",
      ventilation: result.rows[0],
    });
  } catch (err) {
    console.error("Ошибка при обновлении сплит-системы:", err);
    return res.status(500).json({
      message: "Ошибка сервера при обновлении сплит-системы",
    });
  }
});
// Запрос на получение данных о текущем расположении
router.patch("/location/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { location, status } = req.body;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        message: "Некорректный ID вентиляции",
      });
    }

    const result = await db.query(
      "UPDATE ventilation_description SET location = $1, status = $2 WHERE ventilation_id = $3 RETURNING *",
      [location, status, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Объект не найден",
      });
    }

    return res.status(200).json({
      message: "Дополнительные данные успешно обновлены",
      updateItem: result.rows[0],
    });
  } catch (err) {
    console.error("Ошибка при обновлении данных сплит-системы", err);
    return res.status(500).json({
      message:
        err.message || "Ошибка сервера при обновлении данных сплит-системы",
    });
  }
});

// Запрос на возврат сплит-системы обратно на склад
router.patch("/:id/return-to-storage", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        message: "Некорректный ID вентиляции",
      });
    }
    const result = await db.query(
      "UPDATE ventilation_description SET status = 'В резерве', location = 'Склад' WHERE ventilation_id = $1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Вентиляция не найдена",
      });
    }
    res.status(200).json({
      message: "Вентиляция успешно возвращена на склад",
      returnItem: result.rows[0],
    });
  } catch (err) {
    console.error("Ошибка сервера:", err);
    return res.status(500).json({
      message: "Ошибка сервера при возврате вентиляции на склад",
    });
  }
});

// Запрос на изменение статуса и расположение сплит-системы
router.put("/:id/repair-status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status, location } = req.body;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        message: "Некорректный ID сплит-системы",
      });
    }
    const result = await db.query(
      "UPDATE ventilation_description SET status = $1, location = $2 WHERE ventilation_id = $3 RETURNING *",
      [status, location, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Сплит-система с указанным ID не найдена",
      });
    }
    return res.status(200).json({
      message: "Данные вентиляции успешно обновлены",
      ventilation: result.rows[0],
    });
  } catch (err) {
    console.error("Ошибка при обновлении сплит-системы:", err);
    return res.status(500).json({
      message: "Внутренняя ошибка сервера при обновлении данных",
    });
  }
});

// Запрос на утилизацию сплит-системы
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || isNaN(id)) {
      return res.status(400).json({
        message: "Некорректный ID сплит-системы",
      });
    }
    const result = await db.query(
      "DELETE FROM ventilation_description WHERE ventilation_id = $1 RETURNING *",
      [id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Запись о сплит-системе не найдена",
      });
    }
    return res.status(200).json({
      message: "Запись о сплит-системе успешно удалена",
      ventilation: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Ошибка сервера при утилизации сплит-системы",
    });
  }
});

module.exports = router;

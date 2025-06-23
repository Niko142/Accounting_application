const express = require("express");
const db = require("@/db/database");
const verifyJwtToken = require("@/utils/verifyToken");

const router = express.Router();

router.use(verifyJwtToken);

// Запрос на получение данных о всех мониторах
router.get("/", async (_, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM screen_description ORDER BY screen_id ASC"
    );
    return res.json(result.rows);
  } catch (err) {
    console.error("Ошибка сервера", err);
    return res
      .status(500)
      .json({ message: "Ошибка сервера при получении данных" });
  }
});

// Запрос на получение данных о мониторах на складе
router.get("/warehouse", async (_, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM screen_description WHERE location = 'Склад' ORDER BY screen_id ASC"
    );
    return res.json(result.rows);
  } catch (err) {
    console.error("Ошибка сервера", err);
    return res
      .status(500)
      .json({ message: "Ошибка сервера при получении данных" });
  }
});

// Запрос на получение данных о мониторах в  эксплуатации
router.get("/screens-deployed", async (_, res) => {
  try {
    const result = await db.query(
      `SELECT * FROM screen_description 
      WHERE location <> 'Склад' AND location <> '-'
      ORDER BY screen_id ASC`
    );
    return res.json(result.rows);
  } catch (err) {
    console.log("Ошибка сервера", err);
    return res
      .status(500)
      .json({ message: "Ошибка сервера при получении данных" });
  }
});

// Запрос на формирование записи о новом мониторе
router.post("/", async (req, res) => {
  try {
    const { model, diagonal, rate, type, price, location, status } = req.body;

    const result = await db.query(
      "INSERT INTO screen_description (model, diagonal, rate, type, price, location, status) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [model, diagonal, rate, type, price, location, status]
    );

    return res.status(201).json({
      message: "Монитор успешно добавлен на склад",
      screen: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: err.message || "Ошибка сервера при добавлении монитора",
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
        message: "Некорректный ID монитора",
      });
    }

    if (!employee) {
      return res.status(400).json({
        message: "Поле 'employee' обязательно для заполнения",
      });
    }

    const result = await db.query(
      "UPDATE screen_description SET employee = $1 WHERE screen_id = $2 RETURNING *",
      [employee, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Монитор не найден",
      });
    }

    return res.status(200).json({
      message: "Монитор успешно обновлен",
      screen: result.rows[0],
    });
  } catch (err) {
    console.error("Ошибка при обновлении монитора:", err);
    return res.status(500).json({
      message: "Ошибка сервера при обновлении монитора",
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
        message: "Некорректный ID монитора",
      });
    }

    const result = await db.query(
      "UPDATE screen_description SET location = $1, status = $2 WHERE screen_id = $3 RETURNING *",
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
    console.error("Ошибка при обновлении данных монитора", err);
    return res.status(500).json({
      message: err.message || "Ошибка сервера при обновлении данных монитора",
    });
  }
});

// Запрос на возврат монитора обратно на склад
router.patch("/:id/return-to-storage", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        message: "Некорректный ID монитора",
      });
    }
    const result = await db.query(
      "UPDATE screen_description SET status = 'В резерве', location = 'Склад' WHERE screen_id = $1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Монитор не найден",
      });
    }
    res.status(200).json({
      message: "Монитор успешно возвращен на склад",
      returnItem: result.rows[0],
    });
  } catch (err) {
    console.error("Ошибка сервера:", err);
    return res.status(500).json({
      message: "Ошибка сервера при возврате монитора на склад",
    });
  }
});

// Запрос на изменение статуса и расположение монитора
router.put("/:id/repair-status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status, location } = req.body;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        message: "Некорректный ID монитора",
      });
    }
    const result = await db.query(
      "UPDATE screen_description SET status = $1, location = $2 WHERE screen_id = $3 RETURNING *",
      [status, location, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Монитор с указанным ID не найден",
      });
    }
    return res.status(200).json({
      message: "Данные монитора успешно обновлены",
      screen: result.rows[0],
    });
  } catch (err) {
    console.error("Ошибка при обновлении монитора:", err);
    return res.status(500).json({
      message: "Внутренняя ошибка сервера при обновлении данных",
    });
  }
});

// Запрос на утилизацию монитора
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || isNaN(id)) {
      return res.status(400).json({
        message: "Некорректный ID монитора",
      });
    }
    const result = await db.query(
      "DELETE FROM screen_description WHERE screen_id = $1 RETURNING *",
      [id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Запись о мониторе не найдена",
      });
    }
    return res.status(200).json({
      message: "Запись о мониторе успешно удалена",
      screen: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Ошибка сервера при утилизации монитора",
    });
  }
});

module.exports = router;

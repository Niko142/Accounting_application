const express = require("express");
const db = require("@/db/database");
const verifyJwtToken = require("@/utils/verifyToken");

const router = express.Router();

router.use(verifyJwtToken);

// Запрос на получение данных о всех МФУ
router.get("/", async (_, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM scanner_description ORDER BY scanner_id ASC"
    );
    return res.json(result.rows);
  } catch (err) {
    console.error("Ошибка сервера", err);
    return res
      .status(500)
      .json({ message: "Ошибка сервера при получении данных" });
  }
});

// Запрос на получение данных о МФУ на складе
router.get("/warehouse", async (_, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM scanner_description WHERE location = 'Склад' ORDER BY scanner_id ASC"
    );
    return res.json(result.rows);
  } catch (err) {
    console.error("Ошибка сервера", err);
    return res
      .status(500)
      .json({ message: "Ошибка сервера при получении данных" });
  }
});

// Запрос на получение данных о МФУ в эксплуатации
router.get("/scanners-deployed", async (_, res) => {
  try {
    const result = await db.query(
      `SELECT * FROM scanner_description 
      WHERE location <> 'Склад' AND location <> '-'
      ORDER BY scanner_id ASC`
    );
    return res.json(result.rows);
  } catch (err) {
    console.log("Ошибка сервера", err);
    return res
      .status(500)
      .json({ message: "Ошибка сервера при получении данных" });
  }
});

// Запрос на формирование записи о новом МФУ
router.post("/", async (req, res) => {
  try {
    const { nam, color, speed, price, location, status } = req.body;

    const result = await db.query(
      "INSERT INTO scanner_description (nam, color, speed, price, location, status) VALUES ($1, $2, $3, $4, $5, $6)",
      [nam, color, speed, price, location, status]
    );

    return res.status(201).json({
      message: "МФУ успешно добавлен на склад",
      scanner: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: err.message || "Ошибка сервера при добавлении МФУ",
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
        message: "Некорректный ID сканера",
      });
    }

    if (!employee) {
      return res.status(400).json({
        message: "Поле 'employee' обязательно для заполнения",
      });
    }

    const result = await db.query(
      "UPDATE scanner_description SET employee = $1 WHERE scanner_id = $2 RETURNING *",
      [employee, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Сканер не найден",
      });
    }

    return res.status(200).json({
      message: "Сканер успешно обновлен",
      scanner: result.rows[0],
    });
  } catch (err) {
    console.error("Ошибка при обновлении сканера:", err);
    return res.status(500).json({
      message: "Ошибка сервера при обновлении сканера",
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
        message: "Некорректный ID МФУ",
      });
    }

    const result = await db.query(
      "UPDATE scanner_description SET location = $1, status = $2 WHERE scanner_id = $3 RETURNING *",
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
    console.error("Ошибка при обновлении данных МФУ", err);
    return res.status(500).json({
      message: err.message || "Ошибка сервера при обновлении данных МФУ",
    });
  }
});

// Запрос на возврат МФУ обратно на склад
router.patch("/:id/return-to-storage", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        message: "Некорректный ID МФУ",
      });
    }
    const result = await db.query(
      "UPDATE scanner_description SET status = 'В резерве', location = 'Склад' WHERE scanner_id = $1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "МФУ не найдено",
      });
    }
    res.status(200).json({
      message: "МФУ успешно возвращено на склад",
      returnItem: result.rows[0],
    });
  } catch (err) {
    console.error("Ошибка сервера:", err);
    return res.status(500).json({
      message: "Ошибка сервера при возврате МФУ на склад",
    });
  }
});

// Запрос на изменение статуса и расположение МФУ
router.put("/:id/repair-status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status, location } = req.body;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        message: "Некорректный ID МФУ",
      });
    }
    const result = await db.query(
      "UPDATE scanner_description SET status = $1, location = $2 WHERE scanner_id = $3 RETURNING *",
      [status, location, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "МФУ с указанным ID не найдено",
      });
    }
    return res.status(200).json({
      message: "Данные МФУ успешно обновлены",
      scanner: result.rows[0],
    });
  } catch (err) {
    console.error("Ошибка при обновлении МФУ:", err);
    return res.status(500).json({
      message: "Внутренняя ошибка сервера при обновлении данных",
    });
  }
});

// Запрос на утилизацию МФУ
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || isNaN(id)) {
      return res.status(400).json({
        message: "Некорректный ID МФУ",
      });
    }
    const result = await db.query(
      "DELETE FROM scanner_description WHERE scanner_id = $1 RETURNING *",
      [id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Запись о МФУ не найдена",
      });
    }
    return res.status(200).json({
      message: "Запись о МФУ успешно удалена",
      scanner: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Ошибка сервера при утилизации МФУ",
    });
  }
});

module.exports = router;

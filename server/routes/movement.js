const express = require("express");
const db = require("@/db/database");
const verifyJwtToken = require("@/utils/verifyToken");

const router = express.Router();

router.use(verifyJwtToken);

// Запрос на получение данных о существующих аудиториях
router.get("/audiences", async (_, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM cabinet ORDER BY cabinet_id ASC"
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Данные не найдены" });
    }
    return res.json(result.rows);
  } catch (err) {
    console.log("Ошибка сервера", err);
    return res
      .status(500)
      .json({ message: "Ошибка сервера при получении данных" });
  }
});

// Запрос на получение истории закрепления объектов за аудиториями
router.get("/history-pinning", async (_, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM pinning_cabinet ORDER BY id_pinning ASC"
    );
    return res.json(result.rows);
  } catch (err) {
    console.log("Ошибка сервера", err);
    return res
      .status(500)
      .json({ message: "Ошибка сервера при получении данных" });
  }
});

// Запрос на добавление записи о закрепленном объекте
// за конкретным объектом
router.post("/pinning-audience", async (req, res) => {
  try {
    const { date, category, type, reason, unit, start, end } = req.body;

    await db.query(
      "INSERT INTO pinning_cabinet (date, category, type, reason, unit, start_location, end_location) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [date, category, type, reason, unit, start, end]
    );

    return res.status(200).json({
      message: "Объект успешно закреплен за аудиторией",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: err.message || "Ошибка сервера при закреплении объекта",
    });
  }
});

// Запрос на удаление записи объекта в ремонте 
// (принцип - "объект возвращен на склад")
router.delete("/delete-repair/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        message: "Некорректный ID записи",
      });
    }
    const result = await db.query(
      "DELETE FROM repair WHERE id_repair = $1 RETURNING *",
      [id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Не удалось найти запись объекта",
      });
    }
    return res.status(200).json({
      message: "Запись об объекте в ремонте успешно удалена",
      deleteItem: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Ошибка сервера при удалении записи об объекте в ремонте",
    });
  }
});

module.exports = router;

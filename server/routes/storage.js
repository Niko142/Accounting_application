const express = require("express");
const db = require("@/db/database");
const verifyJwtToken = require("@/utils/verifyToken");

const router = express.Router();

router.use(verifyJwtToken);

// Запрос на получение истории замены комплектующих у компьютера
router.get("/component-changes", async (_, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM replacement ORDER BY date ASC"
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Данные не найдены" });
    }
    return res.json(result.rows);
  } catch (err) {
    console.error("Ошибка сервера", err);
    return res
      .status(500)
      .json({ message: "Ошибка сервера при получении данных" });
  }
});

// Запрос на составление записи об утилизированном объекте
router.post("/disposals", async (req, res) => {
  try {
    const { date, category, type, number, model, reason } = req.body;

    await db.query(
      "INSERT INTO utilization (date, category, type, number, model, reason) VALUES ($1, $2, $3, $4, $5, $6)",
      [date, category, type, number, model, reason]
    );

    return res.status(200).json({ message: "Запись успешно сформирована" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: err.message || "Ошибка сервера при создании записи утилизации",
    });
  }
});

// Запрос на организации отправки объекта в ремонт
router.post("/repair-orders", async (req, res) => {
  try {
    const { date, category, type, model, number, end, description } = req.body;

    await db.query(
      "INSERT INTO repair (date, category, type, model, number, end_date, description) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [date, category, type, model, number, end, description]
    );

    return res
      .status(201)
      .json({ message: "Объект успешно отправлен в ремонт" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: err.message || "Ошибка сервера при отправке объекта в ремонт",
    });
  }
});

// Запрос на формирование записи о замене комплектующих
router.post("/component-replacements", async (req, res) => {
  try {
    const { name, type, old_part, new_part, date } = req.body;

    const result = await db.query(
      "INSERT INTO replacement (name, type, old_part, new_part, date) VALUES ($1, $2, $3, $4, $5)",
      [name, type, old_part, new_part, date]
    );
    return res.status(201).json({
      message: "Комплектующее компьютера успешно заменено",
      replaceItem: result.rows,
    });
  } catch (err) {
    console.error("Ошибка сервера", err);
    return res.status(500).json({
      message: "Ошибка сервера при добавлении записи о замене",
    });
  }
});

module.exports = router;

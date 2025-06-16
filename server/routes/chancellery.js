const express = require("express");
const db = require("../db/database");
const verifyJwtToken = require("../utils/verifyToken");

const router = express.Router();

router.use(verifyJwtToken);

/*
 * Запросы по части канцелярии
 */
router.get("/", async (_, res) => {
  try {
    const result = await db.query(
      "SELECT id_chancellery, type, name, unit, price, amounts, (price * amounts) AS itog_price FROM chancellery ORDER BY id_chancellery ASC"
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
    const { type, name, unit, price, amounts } = req.body;

    const result = await db.query(
      "INSERT INTO chancellery (type, name, unit, price, amounts) VALUES ($1, $2, $3, $4, $5)",
      [type, name, unit, price, amounts]
    );
    return res.status(201).json({
      message: "Категория канцелярской техники успешно добавлена",
      chancellery: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: err.message || "Ошибка сервера при добавлении новой категории",
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        message: "Неверный ID категории",
      });
    }
    const result = await db.query(
      "SELECT * FROM chancellery WHERE id_chancellery = $1",
      [id]
    );
    return res.status(200).json({
      message: "Объект успешно выбран",
      item: result.rows[0],
    });
  } catch (err) {
    console.error("Ошибка сервера: ", err);
    return res.status(500).json({
      message:
        err.message || "Возникла внутрення ошибка сервера при выборе категории",
    });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        message: "Некорректный ID категории",
      });
    }
    const result = await db.query(
      "DELETE FROM chancellery WHERE id_chancellery = $1 RETURNING *",
      [id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Категория не найдена",
      });
    }
    return res.status(200).json({
      message: "Категория успешно успешно удалена",
      deleteItem: result.rows[0],
    });
  } catch (err) {
    console.error("Ошибка при удалении сотрудника:", err);
    return res.status(500).json({
      message: "Ошибка сервера при удалении категории",
    });
  }
});

router.patch("/update", async (req, res) => {
  try {
    const { amounts, id } = req.body;

    const result = await db.query(
      "UPDATE chancellery SET amounts = $1 WHERE id_chancellery = $2 RETURNING *",
      [amounts, id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Канцелярский предмет не найден",
      });
    }
    return res.status(200).json({
      message: "Количество объектов канцеляции обновлено!!!",
      updateItem: result.rows[0],
    });
  } catch (err) {
    return res.status(500).json({
      message:
        "Ошибка сервера при обновлении количества канцелярских товаров!!!",
    });
  }
});

module.exports = router;

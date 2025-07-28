const express = require("express");
const db = require("@/db/database");
const verifyJwtToken = require("@/utils/verifyToken");

const router = express.Router();

router.use(verifyJwtToken);

// Запрос на получение данных о всей мебели
router.get("/", async (_, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM furniture_description ORDER BY furniture_id ASC"
    );
    return res.json(result.rows);
  } catch (err) {
    console.error("Ошибка сервера", err);
    return res
      .status(500)
      .json({ message: "Ошибка сервера при получении данных" });
  }
});

// Запрос на получение данных о мебели на складе
router.get("/warehouse", async (_, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM furniture_description WHERE location = 'Склад' ORDER BY furniture_id ASC"
    );
    return res.json(result.rows);
  } catch (err) {
    console.error("Ошибка сервера", err);
    return res
      .status(500)
      .json({ message: "Ошибка сервера при получении данных" });
  }
});

// Запрос на получение данных о мебели в эксплуатации
router.get("/furniture-deployed", async (_, res) => {
  try {
    const result = await db.query(
      `SELECT * FROM furniture_description 
      WHERE location <> 'Склад' AND location <> '-'
      ORDER BY furniture_id ASC`
    );
    return res.json(result.rows);
  } catch (err) {
    console.log("Ошибка сервера", err);
    return res
      .status(500)
      .json({ message: "Ошибка сервера при получении данных" });
  }
});

// Запрос на формирование записи о новой мебели
router.post("/", async (req, res) => {
  try {
    const { name, model, price, location, status } = req.body;

    const result = await db.query(
      "INSERT INTO furniture_description (name, model, price, location, status) VALUES ($1, $2, $3, $4, $5)",
      [name, model, price, location, status]
    );

    return res.status(201).json({
      message: "Мебель успешно добавлена на склад",
      furniture: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: err.message || "Ошибка сервера при добавлении мебели" });
  }
});

// Запрос на обновление данных о материальном лице
router.put("/employee/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { employee } = req.body;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        message: "Некорректный ID мебели",
      });
    }

    if (!employee) {
      return res.status(400).json({
        message: "Поле 'employee' обязательно для заполнения",
      });
    }

    const result = await db.query(
      "UPDATE furniture_description SET employee = $1 WHERE furniture_id = $2 RETURNING *",
      [employee, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Мебель не найдена",
      });
    }

    return res.status(200).json({
      message: "Мебель успешно обновлена",
      furniture: result.rows[0],
    });
  } catch (err) {
    console.error("Ошибка при обновлении мебели:", err);
    return res.status(500).json({
      message: "Ошибка сервера при обновлении мебели",
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
        message: "Некорректный ID мебели",
      });
    }

    const result = await db.query(
      "UPDATE furniture_description SET location = $1, status = $2 WHERE furniture_id = $3 RETURNING *",
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
    console.error("Ошибка при обновлении данных мебели", err);
    return res.status(500).json({
      message: err.message || "Ошибка сервера при обновлении данных мебели",
    });
  }
});

// Запрос на возврат мебели обратно на склад
router.patch("/:id/return-to-storage", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        message: "Некорректный ID мебели",
      });
    }
    const result = await db.query(
      "UPDATE furniture_description SET status = 'В резерве', location = 'Склад' WHERE furniture_id = $1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Мебель не найдена",
      });
    }
    res.status(200).json({
      message: "Мебель успешно возвращена на склад",
      returnItem: result.rows[0],
    });
  } catch (err) {
    console.error("Ошибка сервера:", err);
    return res.status(500).json({
      message: "Ошибка сервера при возврате мебели на склад",
    });
  }
});

// Запрос на изменение статуса и расположение мебели
router.put("/:id/repair-status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status, location } = req.body;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        message: "Некорректный ID мебели",
      });
    }
    const result = await db.query(
      "UPDATE furniture_description SET status = $1, location = $2 WHERE furniture_id = $3 RETURNING *",
      [status, location, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Мебель с указанным ID не найдена",
      });
    }
    return res.status(200).json({
      message: "Данные мебели успешно обновлены",
      furniture: result.rows[0],
    });
  } catch (err) {
    console.error("Ошибка при обновлении мебели:", err);
    return res.status(500).json({
      message: "Внутренняя ошибка сервера при обновлении данных",
    });
  }
});

// Запрос на утилизацию мебели
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || isNaN(id)) {
      return res.status(400).json({
        message: "Некорректный ID мебели",
      });
    }
    const result = await db.query(
      "DELETE FROM furniture_description WHERE furniture_id = $1 RETURNING *",
      [id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Запись о мебели не найдена",
      });
    }
    return res.status(200).json({
      message: "Запись о мебели успешно удалена",
      furniture: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Ошибка сервера при утилизации мебели",
    });
  }
});

module.exports = router;

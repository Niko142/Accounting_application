const express = require("express");
const db = require("@/db/database");
const verifyJwtToken = require("@/utils/verifyToken");

const router = express.Router();

router.use(verifyJwtToken);

// Запрос на получение данных о всех ноутбуках
router.get("/", async (_, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM laptop_description ORDER BY laptop_id ASC"
    );
    return res.json(result.rows);
  } catch (err) {
    console.error("Ошибка сервера", err);
    return res
      .status(500)
      .json({ message: "Ошибка сервера при получении данных" });
  }
});

// Запрос на получение данных о ноутбуках на складе
router.get("/warehouse", async (_, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM laptop_description WHERE location = 'Склад' ORDER BY laptop_id ASC"
    );
    return res.json(result.rows);
  } catch (err) {
    console.error("Ошибка сервера", err);
    return res
      .status(500)
      .json({ message: "Ошибка сервера при получении данных" });
  }
});

// Запрос на получение данных о ноутбуках в эксплуатации
router.get("/laptops-deployed", async (_, res) => {
  try {
    const result = await db.query(
      `SELECT * FROM laptop_description 
      WHERE location <> 'Склад' AND location <> '-'
      ORDER BY laptop_id ASC`
    );
    return res.json(result.rows);
  } catch (err) {
    console.log("Ошибка сервера", err);
    return res
      .status(500)
      .json({ message: "Ошибка сервера при получении данных" });
  }
});

// Запрос на формирование записи о новом ноутбуке
router.post("/", async (req, res) => {
  try {
    const {
      model,
      systems,
      videocard,
      processor,
      memory,
      volume,
      price,
      location,
      status,
    } = req.body;

    const result = await db.query(
      `INSERT INTO laptop_description (model, systems, videocard, processor, memory, volume, price, location, status) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [
        model,
        systems,
        videocard,
        processor,
        memory,
        volume,
        price,
        location,
        status,
      ]
    );

    return res.status(201).json({
      message: "Ноутбук успешно добавлен на склад",
      laptop: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: err.message || "Ошибка сервера при добавлении ноутбука",
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
        message: "Некорректный ID ноутбука",
      });
    }

    if (!employee) {
      return res.status(400).json({
        message: "Поле 'employee' обязательно для заполнения",
      });
    }

    const result = await db.query(
      "UPDATE laptop_description SET employee = $1 WHERE laptop_id = $2 RETURNING *",
      [employee, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Ноутбук не найден",
      });
    }

    return res.status(200).json({
      message: "Ноутбук успешно обновлен",
      laptop: result.rows[0],
    });
  } catch (err) {
    console.error("Ошибка при обновлении ноутбука:", err);
    return res.status(500).json({
      message: "Ошибка сервера при обновлении ноутбука",
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
        message: "Некорректный ID ноутбука",
      });
    }

    const result = await db.query(
      "UPDATE laptop_description SET location = $1, status = $2 WHERE laptop_id = $3 RETURNING *",
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
    console.error("Ошибка при обновлении данных ноутбука", err);
    return res.status(500).json({
      message: err.message || "Ошибка сервера при обновлении данных ноутбука",
    });
  }
});

// Запрос на возврта ноутбука обратно на склад
router.patch("/:id/return-to-storage", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        message: "Некорректный ID ноутбука",
      });
    }
    const result = await db.query(
      "UPDATE laptop_description SET status = 'В резерве', location = 'Склад' WHERE laptop_id = $1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Ноутбук не найден",
      });
    }
    res.status(200).json({
      message: "Ноутбук успешно возвращен на склад",
      returnItem: result.rows[0],
    });
  } catch (err) {
    console.error("Ошибка сервера:", err);
    return res.status(500).json({
      message: "Ошибка сервера при возврате ноутбука на склад",
    });
  }
});

// Запрос на изменение статуса и расположение ноутбука
router.put("/:id/repair-status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status, location } = req.body;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        message: "Некорректный ID ноутбука",
      });
    }
    const result = await db.query(
      "UPDATE laptop_description SET status = $1, location = $2 WHERE laptop_id = $3 RETURNING *",
      [status, location, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Ноутбук с указанным ID не найден",
      });
    }
    return res.status(200).json({
      message: "Данные ноутбука успешно обновлены",
      laptop: result.rows[0],
    });
  } catch (err) {
    console.error("Ошибка при обновлении ноутбука:", err);
    return res.status(500).json({
      message: "Внутренняя ошибка сервера при обновлении данных",
    });
  }
});

// Запрос на утилизацию ноутбука
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || isNaN(id)) {
      return res.status(400).json({
        message: "Некорректный ID ноутбука",
      });
    }
    const result = await db.query(
      "DELETE FROM laptop_description WHERE laptop_id = $1 RETURNING *",
      [id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Запись о ноутбуке не найдена",
      });
    }
    return res.status(200).json({
      message: "Запись о ноутбуке успешно удалена",
      laptop: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Ошибка сервера при утилизации ноутбука",
    });
  }
});

module.exports = router;

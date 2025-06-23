const express = require("express");
const db = require("@/db/database");
const verifyJwtToken = require("@/utils/verifyToken");

const router = express.Router();

router.use(verifyJwtToken);

// Запрос на получение данных о всех камерах
router.get("/", async (_, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM camera_description ORDER BY camera_id ASC"
    );
    return res.json(result.rows);
  } catch (err) {
    console.error("Ошибка сервера", err);
    return res
      .status(500)
      .json({ message: "Ошибка сервера при получении данных" });
  }
});

// Запрос на получение данных о камерах на складе
router.get("/warehouse", async (_, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM camera_description WHERE location = 'Склад' ORDER BY camera_id ASC"
    );
    return res.json(result.rows);
  } catch (err) {
    console.error("Ошибка сервера", err);
    return res
      .status(500)
      .json({ message: "Ошибка сервера при получении данных" });
  }
});

// Запрос на получение данных о камерах в эксплуатации
router.get("/cameras-deployed", async (_, res) => {
  try {
    const result = await db.query(
      `SELECT * FROM camera_description 
      WHERE location <> 'Склад' AND location <> '-'
      ORDER BY camera_id ASC`
    );
    return res.json(result.rows);
  } catch (err) {
    console.log("Ошибка сервера", err);
    return res
      .status(500)
      .json({ message: "Ошибка сервера при получении данных" });
  }
});

// Запрос на формирование записи о новой камере
router.post("/", async (req, res) => {
  try {
    const { model, resolution, angle, bracing, price, location, status } =
      req.body;

    const result = await db.query(
      "INSERT INTO camera_description (model, resolution, angle, bracing, price, location, status) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [model, resolution, angle, bracing, price, location, status]
    );
    return res.status(201).json({
      message: "Камера успешно добавлена на склад",
      camera: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: err.message || "Ошибка сервера при добавлении камеры",
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
        message: "Некорректный ID камеры",
      });
    }

    if (!employee) {
      return res.status(400).json({
        message: "Поле 'employee' обязательно для заполнения",
      });
    }

    const result = await db.query(
      "UPDATE camera_description SET employee = $1 WHERE camera_id = $2 RETURNING *",
      [employee, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Камера не найдена",
      });
    }

    return res.status(200).json({
      message: "Камера успешно обновлена",
      camera: result.rows[0],
    });
  } catch (err) {
    console.error("Ошибка при обновлении камеры:", err);
    return res.status(500).json({
      message: "Ошибка сервера при обновлении камеры",
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
        message: "Некорректный ID камеры",
      });
    }

    const result = await db.query(
      "UPDATE camera_description SET location = $1, status = $2 WHERE camera_id = $3 RETURNING *",
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
    console.error("Ошибка при обновлении данных камеры", err);
    return res.status(500).json({
      message: err.message || "Ошибка сервера при обновлении данных камеры",
    });
  }
});

// Запрос на возврат камеры обратно на склад
router.patch("/:id/return-to-storage", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        message: "Некорректный ID камеры",
      });
    }
    const result = await db.query(
      "UPDATE camera_description SET status = 'В резерве', location = 'Склад' WHERE camera_id = $1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Камера не найдена",
      });
    }
    res.status(200).json({
      message: "Камера успешно возвращена на склад",
      returnItem: result.rows[0],
    });
  } catch (err) {
    console.error("Ошибка сервера:", err);
    return res.status(500).json({
      message: "Ошибка сервера при возврате камеры на склад",
    });
  }
});

// Запрос на изменение статуса и расположение камеры
router.put("/:id/repair-status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status, location } = req.body;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        message: "Некорректный ID камеры",
      });
    }
    const result = await db.query(
      "UPDATE camera_description SET status = $1, location = $2 WHERE camera_id = $3 RETURNING *",
      [status, location, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Камера с указанным ID не найдена",
      });
    }
    return res.status(200).json({
      message: "Данные камеры успешно обновлены",
      camera: result.rows[0],
    });
  } catch (err) {
    console.error("Ошибка при обновлении камеры:", err);
    return res.status(500).json({
      message: "Внутренняя ошибка сервера при обновлении данных",
    });
  }
});

// Запрос на утилизацию камеры
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || isNaN(id)) {
      return res.status(400).json({
        message: "Некорректный ID камеры",
      });
    }
    const result = await db.query(
      "DELETE FROM camera_description WHERE camera_id = $1 RETURNING *",
      [id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Запись о камере не найдена",
      });
    }
    return res.status(200).json({
      message: "Запись о камере успешно удалена",
      camera: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Ошибка сервера при утилизации камеры",
    });
  }
});

module.exports = router;

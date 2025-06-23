const express = require("express");
const db = require("@/db/database");
const verifyJwtToken = require("@/utils/verifyToken");

const router = express.Router();

router.use(verifyJwtToken);

// Запрос на получение данных о всех компьютерах
router.get("/", async (_, res) => {
  try {
    const result = await db.query(
      `SELECT id_computer, computer.employee, computer.location, computer.status, name, 
      videocard.model AS videocards, processor.model AS processors, 
      mothercard.model AS mothercards, memory.model AS memories, 
      disk.model AS disks 
    FROM computer 
    INNER JOIN videocard ON computer.videocard_id = videocard.id_videocard 
    INNER JOIN processor ON computer.processor_id = processor.id_processor 
    INNER JOIN mothercard ON computer.mothercard_id = mothercard.id_mothercard 
    INNER JOIN memory ON computer.memory_id = memory.id_memory 
    INNER JOIN disk ON computer.disk_id = disk.id_disk
    ORDER BY id_computer ASC`
    );
    return res.json(result.rows);
  } catch (err) {
    console.error("Ошибка сервера", err);
    return res
      .status(500)
      .json({ message: "Ошибка сервера при получении данных" });
  }
});

// Запрос на получение данных о компьютерах на складе
router.get("/warehouse", async (_, res) => {
  try {
    const result = await db.query(
      `SELECT id_computer, videocard_id AS id_videocard, processor_id AS id_processor, mothercard_id AS id_mothercard, 
      memory_id AS id_memory, disk_id AS id_disk, name, videocard.model AS videocards, processor.model AS processors, 
      mothercard.model AS mothercards, memory.model AS memories, disk.model AS disks, computer.location 
    FROM computer 
    INNER JOIN videocard ON computer.videocard_id = videocard.id_videocard 
    INNER JOIN processor ON computer.processor_id = processor.id_processor 
    INNER JOIN mothercard ON computer.mothercard_id = mothercard.id_mothercard 
    INNER JOIN memory ON computer.memory_id = memory.id_memory 
    INNER JOIN disk ON computer.disk_id = disk.id_disk AND computer.location = 'Склад'
    ORDER BY id_computer ASC`
    );
    return res.json(result.rows);
  } catch (err) {
    console.error("Ошибка сервера", err);
    return res
      .status(500)
      .json({ message: "Ошибка сервера при получении данных" });
  }
});

// Запрос на получение данных о компьютерах в эксплуатации
router.get("/computers-deployed", async (_, res) => {
  try {
    const result = await db.query(
      `SELECT * FROM computer 
      WHERE location <> 'Склад' AND location <> '-'
      ORDER BY id_computer ASC`
    );
    return res.json(result.rows);
  } catch (err) {
    console.log("Ошибка сервера", err);
    return res
      .status(500)
      .json({ message: "Ошибка сервера при получении данных" });
  }
});

// Запрос на формирование записи о новом компьютере
router.post("/", async (req, res) => {
  try {
    const {
      name,
      videocard_id,
      processor_id,
      mothercard_id,
      memory_id,
      disk_id,
      location,
      status,
    } = req.body;

    const result = await db.query(
      `INSERT INTO computer (name, videocard_id, processor_id, mothercard_id, memory_id, disk_id, location, status) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        name,
        videocard_id,
        processor_id,
        mothercard_id,
        memory_id,
        disk_id,
        location,
        status,
      ]
    );
    return res.status(201).json({
      message: "Компьютер успешно собран и добавлен на склад",
      computer: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: err.message || "Ошибка сервера при добавлении компьютера",
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
        message: "Некорректный ID компьютера",
      });
    }

    if (!employee) {
      return res.status(400).json({
        message: "Поле 'employee' обязательно для заполнения",
      });
    }

    const result = await db.query(
      "UPDATE computer SET employee = $1 WHERE id_computer = $2 RETURNING *",
      [employee, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Компьютер не найден",
      });
    }

    return res.status(200).json({
      message: "Компьютер успешно обновлен",
      computer: result.rows[0],
    });
  } catch (err) {
    console.error("Ошибка при обновлении компьютера:", err);
    return res.status(500).json({
      message: "Ошибка сервера при обновлении компьютера",
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
        message: "Некорректный ID компьютера",
      });
    }

    const result = await db.query(
      "UPDATE computer SET location = $1, status = $2 WHERE id_computer = $3 RETURNING *",
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
    console.error("Ошибка при обновлении данных компьютера", err);
    return res.status(500).json({
      message: err.message || "Ошибка сервера при обновлении данных компьютера",
    });
  }
});

// Запрос на возврат компьютера обратно на склад
router.patch("/:id/return-to-storage", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        message: "Некорректный ID компьютера",
      });
    }
    const result = await db.query(
      "UPDATE computer SET status = 'В резерве', location = 'Склад' WHERE id_computer = $1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Компьютер не найден",
      });
    }
    res.status(200).json({
      message: "Компьютер успешно возвращен на склад",
      returnItem: result.rows[0],
    });
  } catch (err) {
    console.error("Ошибка сервера:", err);
    return res.status(500).json({
      message: "Ошибка сервера при возврате компьютера на склад",
    });
  }
});

// Запрос на изменение статуса и расположение компьютера
router.put("/:id/repair-status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status, location } = req.body;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        message: "Некорректный ID компьютера",
      });
    }
    const result = await db.query(
      "UPDATE computer SET status = $1, location = $2 WHERE id_computer = $3 RETURNING *",
      [status, location, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Компьютер с указанным ID не найден",
      });
    }
    return res.status(200).json({
      message: "Данные компьютера успешно обновлены",
      computer: result.rows[0],
    });
  } catch (err) {
    console.error("Ошибка при обновлении компьютера:", err);
    return res.status(500).json({
      message: "Внутренняя ошибка сервера при обновлении данных",
    });
  }
});

// Запрос на утилизацию компьютера
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || isNaN(id)) {
      return res.status(400).json({
        message: "Некорректный ID компьютера",
      });
    }
    const result = await db.query(
      "DELETE FROM computer WHERE id_computer = $1 RETURNING *",
      [id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Запись о компьютере не найдена",
      });
    }
    return res.status(200).json({
      message: "Запись о компьютере успешно удалена",
      computer: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Ошибка сервера при утилизации компьютера",
    });
  }
});

module.exports = router;

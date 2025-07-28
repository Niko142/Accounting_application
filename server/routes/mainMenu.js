const express = require("express");
const db = require("@/db/database");
const verifyJwtToken = require("@/utils/verifyToken");

const router = express.Router();

router.use(verifyJwtToken);

/*
 * Запросы для блока "Учет"
 */

router.get("/computers", async (_, res) => {
  try {
    const result = await db.query(
      `SELECT id_computer, computer.location AS location, computer.status AS status, computer.name AS name, 
      videocard.model AS videocards, processor.model AS processors, mothercard.model AS mothercards, 
      memory.model AS memories, disk.model AS disks, 
      COALESCE(employee.name, '.') AS names, 
      COALESCE(employee.surname, '.') AS surname, 
      COALESCE(employee.patronymic, '.') AS patronymic 
    FROM computer
    INNER JOIN videocard ON computer.videocard_id = videocard.id_videocard 
    INNER JOIN processor ON computer.processor_id = processor.id_processor 
    INNER JOIN mothercard ON computer.mothercard_id = mothercard.id_mothercard 
    INNER JOIN memory ON computer.memory_id = memory.id_memory 
    INNER JOIN disk ON computer.disk_id = disk.id_disk 
    LEFT JOIN employee ON computer.employee = employee.employee_id 
    ORDER BY id_computer ASC`
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

router.get("/laptops", async (_, res) => {
  try {
    const result = await db.query(
      `SELECT 
      laptop_id, model, systems, videocard, processor, memory, volume, price, 
      laptop_description.location, status, 
      COALESCE(employee.name, '.') AS name, 
      COALESCE(employee.surname, '.') AS surname, 
      COALESCE(employee.patronymic, '.') AS patronymic 
    FROM laptop_description 
    LEFT JOIN employee ON laptop_description.employee = employee.employee_id 
    ORDER BY laptop_id ASC`
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

router.get("/screens", async (_, res) => {
  try {
    const result = await db.query(
      `SELECT screen_id, model, diagonal, rate, type, price, screen_description.location, status, 
      COALESCE(employee.name, '.') AS name, 
      COALESCE(employee.surname, '.') AS surname, 
      COALESCE(employee.patronymic, '.') AS patronymic 
    FROM screen_description 
    LEFT JOIN employee ON screen_description.employee = employee.employee_id
    ORDER BY screen_id ASC`
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

router.get("/scanners", async (_, res) => {
  try {
    const result = await db.query(
      `SELECT scanner_id, nam, color, speed, price, scanner_description.location, status, 
      COALESCE(employee.name, '.') AS name, 
      COALESCE(employee.surname, '.') AS surname, 
      COALESCE(employee.patronymic, '.') AS patronymic 
    FROM scanner_description 
    LEFT JOIN employee ON scanner_description.employee = employee.employee_id
    ORDER BY scanner_id ASC`
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

router.get("/cameras", async (_, res) => {
  try {
    const result = await db.query(
      `SELECT camera_id, model, resolution, angle, price, camera_description.location, status, 
      COALESCE(employee.name, '.') AS name, 
      COALESCE(employee.surname, '.') AS surname, 
      COALESCE(employee.patronymic, '.') AS patronymic 
    FROM camera_description 
    LEFT JOIN employee ON camera_description.employee = employee.employee_id
    ORDER BY camera_id ASC`
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

router.get("/furniture", async (_, res) => {
  try {
    const result = await db.query(
      `SELECT furniture_id, furniture_description.name AS name, model, price, furniture_description.location, status, 
      COALESCE(employee.name, '.') AS names, 
      COALESCE(employee.surname, '.') AS surname, 
      COALESCE(employee.patronymic, '.') AS patronymic 
    FROM furniture_description 
    LEFT JOIN employee ON furniture_description.employee = employee.employee_id
    ORDER BY furniture_id ASC`
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

router.get("/ventilations", async (_, res) => {
  try {
    const result = await db.query(
      `SELECT ventilation_id, model, price, ventilation_description.location, status, 
      COALESCE(employee.name, '.') AS name, 
      COALESCE(employee.surname, '.') AS surname, 
      COALESCE(employee.patronymic, '.') AS patronymic 
    FROM ventilation_description 
    LEFT JOIN employee ON ventilation_description.employee = employee.employee_id
    ORDER BY ventilation_id ASC`
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

// Запрос для получения истории утилизации объектов в организации
router.get("/utilization-history", async (_, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM utilization ORDER BY id_utilization ASC"
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

module.exports = router;

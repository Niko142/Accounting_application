const express = require("express");
const db = require("@/db/database");
const verifyJwtToken = require("@/utils/verifyToken");

const router = express.Router();

router.use(verifyJwtToken);

/*
 * Запросы, связанные с материально-ответственными лицамиз
 */

// Запрос для получения информации о материальных лицах
router.get("/employees", async (_, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM employee ORDER BY employee_id"
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

// Запрос для получения истории закрепления объектов 
// за материальными лицами
router.get("/pinning-history", async (_, res) => {
  try {
    const result = await db.query(
      `SELECT id_pinning, date, category, type, unit, employee.name AS name, employee.surname AS surname, employee.patronymic AS patronymic 
      FROM pinning_employee 
      INNER JOIN employee ON pinning_employee.employee = employee.employee_id 
      ORDER BY id_pinning ASC`
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

// Запрос для добавления нового сотрудника
router.post("/employees", async (req, res) => {
  try {
    const { name, surname, patronymic, email, phone } = req.body;

    await db.query(
      "INSERT INTO employee (name, surname, patronymic, email, phone) VALUES ($1, $2, $3, $4, $5)",
      [name, surname, patronymic, email, phone]
    );
    return res.status(201).json({
      message: "Сотрудник успешно назначен",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: err.message || "Ошибка сервера при назначении нового лица",
    });
  }
});

// Запрос для удаления записи о сотруднике в случае увольнения
router.delete("/layoff/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        message: "Некорректный ID материального лица",
      });
    }
    const result = await db.query(
      "DELETE FROM employee WHERE employee_id = $1 RETURNING *",
      [id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Запись о материальном лице не найдена",
      });
    }
    return res.status(200).json({
      message: "Запись о материальном лице успешно удалена",
      employee: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Ошибка сервера при удалении материального лица",
    });
  }
});

// Запрос для формирования записи о закреплении объекта 
// за конкретным материальным лицом
router.post("/pinning-employee", async (req, res) => {
  try {
    const { date, category, type, unit, employee } = req.body;

    await db.query(
      "INSERT INTO pinning_employee (date, category, type, unit, employee) VALUES ($1, $2, $3, $4, $5)",
      [date, category, type, unit, employee]
    );
    return res.status(200).json({
      message: "Объект успешно закреплен за материальным лицом",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: err.message || "Ошибка сервера при закреплении объекта",
    });
  }
});

module.exports = router;

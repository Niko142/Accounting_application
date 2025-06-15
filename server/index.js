const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./db/database");
const verifyJwtToken = require("./utils/verifyToken");

// Импорт маршрутов
const authRoutes = require("./routes/auth");
const chancelleryRoutes = require("./routes/chancellery");
const employeeRoutes = require("./routes/employee");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Маршрутизация запросов
app.use("/api/auth", authRoutes);
app.use("/api/chancellery", chancelleryRoutes);
app.use("/api/employee", employeeRoutes);

/**
 * Запросы блока "Учет"
 */
app.get("/main_computer", verifyJwtToken, async (_, res) => {
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

app.get("/main_laptop", async (_, res) => {
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

app.get("/main_screen", verifyJwtToken, async (_, res) => {
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

app.get("/main_scanner", verifyJwtToken, async (_, res) => {
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

app.get("/main_camera", verifyJwtToken, async (_, res) => {
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

app.get("/main_furniture", verifyJwtToken, async (_, res) => {
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

app.get("/main_ventilation", verifyJwtToken, async (_, res) => {
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

app.get("/select_utilization", verifyJwtToken, async (_, res) => {
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

app.post("/furniture", verifyJwtToken, async (req, res) => {
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
      .json({ message: err.message || "Ошибка сервера при добавлении мебеди" });
  }
});

app.get("/select_furniture", verifyJwtToken, (_, res) => {
  db.query("SELECT * FROM furniture_description", (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result.rows);
    }
  });
});

app.get("/sklad_furniture", verifyJwtToken, (_, res) => {
  db.query(
    "SELECT * FROM furniture_description WHERE location = 'Склад'",
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result.rows);
      }
    }
  );
});

app.post("/ventilation", verifyJwtToken, async (req, res) => {
  try {
    const { model, filter, warm, price, location, status } = req.body;

    const result = await db.query(
      "INSERT INTO ventilation_description (model, filter, warm, price, location, status) VALUES ($1, $2, $3, $4, $5, $6)",
      [model, filter, warm, price, location, status]
    );

    return res.status(201).json({
      message: "Система вентиляции успешно добавлена на склад",
      ventilation: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: err.message || "Ошибка сервера при добавлении сплит-системы",
    });
  }
});

app.get("/select_ventilation", verifyJwtToken, (_, res) => {
  db.query("SELECT * FROM ventilation_description", (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result.rows);
    }
  });
});

app.get("/sklad_ventilation", verifyJwtToken, (_, res) => {
  db.query(
    "SELECT * FROM ventilation_description WHERE location = 'Склад'",
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result.rows);
      }
    }
  );
});

app.post("/laptop", verifyJwtToken, async (req, res) => {
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

app.get("/select_laptop", verifyJwtToken, (_, res) => {
  db.query("SELECT * FROM laptop_description", (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result.rows);
    }
  });
});

app.get("/sklad_laptop", verifyJwtToken, (_, res) => {
  db.query(
    "SELECT * FROM laptop_description WHERE location = 'Склад'",
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result.rows);
      }
    }
  );
});

app.post("/scanner", verifyJwtToken, async (req, res) => {
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

app.get("/select_scanner", verifyJwtToken, (_, res) => {
  db.query("SELECT * FROM scanner_description", (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result.rows);
    }
  });
});

app.get("/sklad_scanner", verifyJwtToken, (_, res) => {
  db.query(
    "SELECT * FROM scanner_description WHERE location = 'Склад'",
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result.rows);
      }
    }
  );
});

app.post("/screen", verifyJwtToken, async (req, res) => {
  try {
    const { model, diagonal, rate, type, price, location, status } = req.body;

    const result = await db.query(
      "INSERT INTO screen_description (model, diagonal, rate, type, price, location, status) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [model, diagonal, rate, type, price, location, status]
    );

    return res.status(201).json({
      message: "Монитор успешно добавлен на склад",
      screen: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: err.message || "Ошибка сервера при добавлении монитора",
    });
  }
});

app.get("/select_screen", verifyJwtToken, (_, res) => {
  db.query("SELECT * FROM screen_description", (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result.rows);
    }
  });
});

app.get("/sklad_screen", verifyJwtToken, (_, res) => {
  db.query(
    "SELECT * FROM screen_description WHERE location = 'Склад'",
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result.rows);
      }
    }
  );
});

app.post("/camera", verifyJwtToken, async (req, res) => {
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

app.get("/select_camera", verifyJwtToken, (_, res) => {
  db.query("SELECT * FROM camera_description", (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result.rows);
    }
  });
});

app.get("/sklad_camera", verifyJwtToken, (_, res) => {
  db.query(
    "SELECT * FROM camera_description WHERE location = 'Склад'",
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result.rows);
      }
    }
  );
});

app.get("/videocard", verifyJwtToken, async (_, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM videocard WHERE location = 'Склад' ORDER BY id_videocard ASC"
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

app.get("/processor", verifyJwtToken, async (_, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM processor WHERE location = 'Склад' ORDER BY id_processor ASC"
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

app.get("/mothercard", verifyJwtToken, async (_, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM mothercard WHERE location = 'Склад' ORDER BY id_mothercard ASC"
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

app.get("/memory", verifyJwtToken, async (_, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM memory WHERE location = 'Склад' ORDER BY id_memory ASC"
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

app.get("/disk", verifyJwtToken, async (_, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM disk WHERE location = 'Склад' ORDER BY id_disk ASC"
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

app.get("/computer", verifyJwtToken, (_, res) => {
  db.query(
    `SELECT id_computer, computer.employee, computer.location, computer.status, name, 
      videocard.model AS videocards, processor.model AS processors, 
      mothercard.model AS mothercards, memory.model AS memories, 
      disk.model AS disks 
    FROM computer 
    INNER JOIN videocard ON computer.videocard_id = videocard.id_videocard 
    INNER JOIN processor ON computer.processor_id = processor.id_processor 
    INNER JOIN mothercard ON computer.mothercard_id = mothercard.id_mothercard 
    INNER JOIN memory ON computer.memory_id = memory.id_memory 
    INNER JOIN disk ON computer.disk_id = disk.id_disk`,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result.rows);
      }
    }
  );
});

app.get("/sklad_computer", verifyJwtToken, (_, res) => {
  db.query(
    `SELECT id_computer, videocard_id AS id_videocard, processor_id AS id_processor, mothercard_id AS id_mothercard, 
      memory_id AS id_memory, disk_id AS id_disk, name, videocard.model AS videocards, processor.model AS processors, 
      mothercard.model AS mothercards, memory.model AS memories, disk.model AS disks, computer.location 
    FROM computer 
    INNER JOIN videocard ON computer.videocard_id = videocard.id_videocard 
    INNER JOIN processor ON computer.processor_id = processor.id_processor 
    INNER JOIN mothercard ON computer.mothercard_id = mothercard.id_mothercard 
    INNER JOIN memory ON computer.memory_id = memory.id_memory 
    INNER JOIN disk ON computer.disk_id = disk.id_disk AND computer.location = 'Склад'`,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result.rows);
      }
    }
  );
});

app.post("/add_computer", verifyJwtToken, async (req, res) => {
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

app.post("/add_videocard", verifyJwtToken, async (req, res) => {
  try {
    const { model, price, location } = req.body;

    const result = await db.query(
      "INSERT INTO videocard (model, price, location) VALUES ($1, $2, $3)",
      [model, price, location]
    );

    return res.status(201).json({
      message: "Видеокарта успешно добавлена",
      videocard: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: err.message || "Ошибка сервера при добавлении видеокарты",
    });
  }
});

app.post("/add_processor", verifyJwtToken, async (req, res) => {
  try {
    const { model, rate, price, location } = req.body;

    const result = await db.query(
      "INSERT INTO processor (model, rate, price, location) VALUES ($1, $2, $3, $4)",
      [model, rate, price, location]
    );

    return res.status(201).json({
      message: "Процессор успешно добавлен",
      processor: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: err.message || "Ошибка сервера при добавлении процессора",
    });
  }
});

app.post("/add_mothercard", verifyJwtToken, async (req, res) => {
  try {
    const { model, type, rate, price, location } = req.body;

    const result = await db.query(
      "INSERT INTO mothercard (model, type, rate, price, location) VALUES ($1, $2, $3, $4, $5)",
      [model, type, rate, price, location]
    );

    return res.status(201).json({
      message: "Материнская плата успешно добавлена",
      mothercard: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: err.message || "Ошибка сервера при добавлении материнской платы",
    });
  }
});

app.post("/add_memory", verifyJwtToken, async (req, res) => {
  try {
    const { model, type, volume, price, location } = req.body;

    const result = await db.query(
      "INSERT INTO memory (model, type, volume, price, location) VALUES ($1, $2, $3, $4, $5)",
      [model, type, volume, price, location]
    );

    return res.status(201).json({
      message: "ОЗУ успешно добавлена",
      memory: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: err.message || "Ошибка сервера при добавлении ОЗУ",
    });
  }
});

app.post("/add_disk", verifyJwtToken, async (req, res) => {
  try {
    const { model, volume, price, location } = req.body;

    const result = await db.query(
      "INSERT INTO disk (model, volume, price, location) VALUES ($1, $2, $3, $4)",
      [model, volume, price, location]
    );

    return res.status(201).json({
      message: "Диск успешно добавлен",
      disk: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: err.message || "Ошибка сервера при добавлении диска",
    });
  }
});

app.get("/cabinet", verifyJwtToken, async (_, res) => {
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

app.put("/update_ventilation/:id", verifyJwtToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { employee } = req.body;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        message: "Некорректный ID сплит-системы",
      });
    }

    if (!employee) {
      return res.status(400).json({
        message: "Поле 'employee' обязательно для заполнения",
      });
    }

    const result = await db.query(
      "UPDATE ventilation_description SET employee = $1 WHERE ventilation_id = $2 RETURNING *",
      [employee, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Сплит-система не найдена",
      });
    }

    return res.status(200).json({
      message: "Сплит-система успешно обновлена",
      ventilation: result.rows[0],
    });
  } catch (err) {
    console.error("Ошибка при обновлении сплит-системы:", err);
    return res.status(500).json({
      message: "Ошибка сервера при обновлении сплит-системы",
    });
  }
});

app.put("/update_furniture/:id", verifyJwtToken, async (req, res) => {
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

app.put("/update_computer/:id", verifyJwtToken, async (req, res) => {
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

app.put("/update_laptop/:id", verifyJwtToken, async (req, res) => {
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

app.put("/update_screen/:id", verifyJwtToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { employee } = req.body;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        message: "Некорректный ID монитора",
      });
    }

    if (!employee) {
      return res.status(400).json({
        message: "Поле 'employee' обязательно для заполнения",
      });
    }

    const result = await db.query(
      "UPDATE screen_description SET employee = $1 WHERE screen_id = $2 RETURNING *",
      [employee, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Монитор не найден",
      });
    }

    return res.status(200).json({
      message: "Монитор успешно обновлен",
      screen: result.rows[0],
    });
  } catch (err) {
    console.error("Ошибка при обновлении монитора:", err);
    return res.status(500).json({
      message: "Ошибка сервера при обновлении монитора",
    });
  }
});

app.put("/update_scanner/:id", verifyJwtToken, async (req, res) => {
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

app.put("/update_camera/:id", verifyJwtToken, async (req, res) => {
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

app.post("/pinning-cabinet", verifyJwtToken, async (req, res) => {
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

app.get("/history-cabinet", verifyJwtToken, async (_, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM pinning_cabinet ORDER BY id_pinning ASC"
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

// Подумать - исправить ли id

app.patch("/location_computer", verifyJwtToken, async (req, res) => {
  try {
    const { location, status, id } = req.body;

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

app.patch("/location_laptop", verifyJwtToken, async (req, res) => {
  try {
    const { location, status, id } = req.body;

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

app.patch("/location_screen", verifyJwtToken, async (req, res) => {
  try {
    const { location, status, id } = req.body;

    const result = await db.query(
      "UPDATE screen_description SET location = $1, status = $2 WHERE screen_id = $3 RETURNING *",
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
    console.error("Ошибка при обновлении данных монитора", err);
    return res.status(500).json({
      message: err.message || "Ошибка сервера при обновлении данных монитора",
    });
  }
});

app.patch("/location_scanner", verifyJwtToken, async (req, res) => {
  try {
    const { location, status, id } = req.body;

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

app.patch("/location_camera", verifyJwtToken, async (req, res) => {
  try {
    const { location, status, id } = req.body;

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

app.patch("/location_furniture", verifyJwtToken, async (req, res) => {
  try {
    const { location, status, id } = req.body;

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

app.patch("/location_ventilation", verifyJwtToken, async (req, res) => {
  try {
    const { location, status, id } = req.body;

    const result = await db.query(
      "UPDATE ventilation_description SET location = $1, status = $2 WHERE ventilation_id = $3 RETURNING *",
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
    console.error("Ошибка при обновлении данных сплит-системы", err);
    return res.status(500).json({
      message:
        err.message || "Ошибка сервера при обновлении данных сплит-системы",
    });
  }
});

app.put("/update_videocard/:id", verifyJwtToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { location } = req.body;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        message: "Некорректный ID видеокарты",
      });
    }

    if (!location) {
      return res.status(400).json({
        message: "Поле 'location' не указано",
      });
    }

    const result = await db.query(
      "UPDATE videocard SET location = $1 WHERE id_videocard = $2 RETURNING *",
      [location, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Видеокарта не найдена",
      });
    }

    return res.status(201).json({
      message: "Расположение видеокарты успешно обновлено",
      videocard: result.rows[0],
    });
  } catch (err) {
    console.error("Ошибка изменения местоположения:", err);
    return res.status(500).json({
      message: "Ошибка сервера при обновлении местоположения видеокарты",
    });
  }
});

app.put("/update_processor/:id", verifyJwtToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { location } = req.body;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        message: "Некорректный ID процессора",
      });
    }

    if (!location) {
      return res.status(400).json({
        message: "Поле 'location' не указано",
      });
    }

    const result = await db.query(
      "UPDATE processor SET location = $1 WHERE id_processor = $2 RETURNING *",
      [location, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Процессор не найден",
      });
    }

    return res.status(201).json({
      message: "Расположение процессора успешно обновлено",
      processor: result.rows[0],
    });
  } catch (err) {
    console.error("Ошибка изменения местоположения:", err);
    return res.status(500).json({
      message: "Ошибка сервера при обновлении местоположения процессора",
    });
  }
});

app.put("/update_mothercard/:id", verifyJwtToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { location } = req.body;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        message: "Некорректный ID материнской платы",
      });
    }

    if (!location) {
      return res.status(400).json({
        message: "Поле 'location' не указано",
      });
    }

    const result = await db.query(
      "UPDATE mothercard SET location = $1 WHERE id_mothercard = $2 RETURNING *",
      [location, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Материнская плата не найдена",
      });
    }

    return res.status(201).json({
      message: "Расположение материнской платы успешно обновлено",
      mothercard: result.rows[0],
    });
  } catch (err) {
    console.error("Ошибка изменения местоположения:", err);
    return res.status(500).json({
      message: "Ошибка сервера при обновлении местоположения материнской платы",
    });
  }
});

app.put("/update_memory/:id", verifyJwtToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { location } = req.body;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        message: "Некорректный ID ОЗУ",
      });
    }

    if (!location) {
      return res.status(400).json({
        message: "Поле 'location' не указано",
      });
    }

    const result = await db.query(
      "UPDATE memory SET location = $1 WHERE id_memory = $2 RETURNING *",
      [location, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "ОЗУ не найдена",
      });
    }

    return res.status(201).json({
      message: "Расположение ОЗУ успешно обновлено",
      memory: result.rows[0],
    });
  } catch (err) {
    console.error("Ошибка изменения местоположения:", err);
    return res.status(500).json({
      message: "Ошибка сервера при обновлении местоположения ОЗУ",
    });
  }
});

app.put("/update_disk/:id", verifyJwtToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { location } = req.body;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        message: "Некорректный ID диска",
      });
    }

    if (!location) {
      return res.status(400).json({
        message: "Поле 'location' не указано",
      });
    }

    const result = await db.query(
      "UPDATE disk SET location = $1 WHERE id_disk = $2 RETURNING *",
      [location, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Диск не найден",
      });
    }

    return res.status(201).json({
      message: "Расположение диска успешно обновлено",
      memory: result.rows[0],
    });
  } catch (err) {
    console.error("Ошибка изменения местоположения:", err);
    return res.status(500).json({
      message: "Ошибка сервера при обновлении местоположения диска",
    });
  }
});

app.get("/computer_movement", verifyJwtToken, async (_, res) => {
  try {
    const result = await db.query(
      `SELECT * FROM computer 
      WHERE location <> 'Склад' AND location <> '-'
      ORDER BY id_computer ASC`
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

app.get("/laptop_movement", verifyJwtToken, async (_, res) => {
  try {
    const result = await db.query(
      `SELECT * FROM laptop_description 
      WHERE location <> 'Склад' AND location <> '-'
      ORDER BY laptop_id ASC`
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

app.get("/screen_movement", verifyJwtToken, async (_, res) => {
  try {
    const result = await db.query(
      `SELECT * FROM screen_description 
      WHERE location <> 'Склад' AND location <> '-'
      ORDER BY screen_id ASC`
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

app.get("/scanner_movement", verifyJwtToken, async (_, res) => {
  try {
    const result = await db.query(
      `SELECT * FROM scanner_description 
      WHERE location <> 'Склад' AND location <> '-'
      ORDER BY scanner_id ASC`
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

app.get("/camera_movement", verifyJwtToken, async (_, res) => {
  try {
    const result = await db.query(
      `SELECT * FROM camera_description 
      WHERE location <> 'Склад' AND location <> '-'
      ORDER BY camera_id ASC`
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

app.get("/furniture_movement", verifyJwtToken, async (_, res) => {
  try {
    const result = await db.query(
      `SELECT * FROM furniture_description 
      WHERE location <> 'Склад' AND location <> '-'
      ORDER BY furniture_id ASC`
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

app.delete("/delete-computer/:id", verifyJwtToken, async (req, res) => {
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

app.delete("/delete-laptop/:id", verifyJwtToken, async (req, res) => {
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

app.delete("/delete-screen/:id", verifyJwtToken, async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || isNaN(id)) {
      return res.status(400).json({
        message: "Некорректный ID монитора",
      });
    }
    const result = await db.query(
      "DELETE FROM screen_description WHERE screen_id = $1 RETURNING *",
      [id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Запись о мониторе не найдена",
      });
    }
    return res.status(200).json({
      message: "Запись о мониторе успешно удалена",
      screen: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Ошибка сервера при утилизации монитора",
    });
  }
});

app.delete("/delete-scanner/:id", verifyJwtToken, async (req, res) => {
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

app.delete("/delete-camera/:id", verifyJwtToken, async (req, res) => {
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

app.delete("/delete-furniture/:id", verifyJwtToken, async (req, res) => {
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

app.delete("/delete-ventilation/:id", verifyJwtToken, async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || isNaN(id)) {
      return res.status(400).json({
        message: "Некорректный ID сплит-системы",
      });
    }
    const result = await db.query(
      "DELETE FROM ventilation_description WHERE ventilation_id = $1 RETURNING *",
      [id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Запись о сплит-системе не найдена",
      });
    }
    return res.status(200).json({
      message: "Запись о сплит-системе успешно удалена",
      ventilation: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Ошибка сервера при утилизации сплит-системы",
    });
  }
});

app.post("/utilization", verifyJwtToken, async (req, res) => {
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

app.delete("/delete-disk/:id", verifyJwtToken, async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        message: "Некорректный ID диска",
      });
    }
    const result = await db.query(
      "DELETE FROM disk WHERE id_disk = $1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Запись о диске не найдена",
      });
    }

    return res.status(200).json({
      message: "Запись о диске успешно удалена",
      disk: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Ошибка сервера при утилизации диска",
    });
  }
});

app.delete("/delete-memory/:id", verifyJwtToken, async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        message: "Некорректный ID ОЗУ",
      });
    }
    const result = await db.query(
      "DELETE FROM memory WHERE id_memory = $1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Запись об ОЗУ не найдена",
      });
    }

    return res.status(200).json({
      message: "Запись об ОЗУ успешно удалена",
      memory: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Ошибка сервера при утилизации ОЗУ",
    });
  }
});

app.delete("/delete-mothercard/:id", verifyJwtToken, async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        message: "Некорректный ID материнской платы",
      });
    }
    const result = await db.query(
      "DELETE FROM mothercard WHERE id_mothercard = $1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Запись о материнской плате не найдена",
      });
    }

    return res.status(200).json({
      message: "Запись о материнской плате успешно удалена",
      mothercard: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Ошибка сервера при утилизации материнской платы",
    });
  }
});

app.delete("/delete-processor/:id", verifyJwtToken, async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        message: "Некорректный ID процессора",
      });
    }
    const result = await db.query(
      "DELETE FROM processor WHERE id_processor = $1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Запись о процессоре не найдена",
      });
    }

    return res.status(200).json({
      message: "Запись о процессоре успешно удалена",
      processor: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Ошибка сервера при утилизации процессора",
    });
  }
});

app.delete("/delete-videocard/:id", verifyJwtToken, async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        message: "Некорректный ID видеокарты",
      });
    }

    const result = await db.query(
      "DELETE FROM videocard WHERE id_videocard = $1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Запись о видеокарте не найдена",
      });
    }

    return res.status(200).json({
      message: "Запись о видеокарте успешно удалена",
      processor: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Ошибка сервера при утилизации видеокарты",
    });
  }
});

app.post("/repair", verifyJwtToken, async (req, res) => {
  try {
    const { date, category, type, model, number, end, description } = req.body;

    await db.query(
      "INSERT INTO repair (date, category, type, model, number, end_date, description) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [date, category, type, model, number, end, description]
    );

    return res
      .status(200)
      .json({ message: "Объект успешно отправлен в ремонт" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: err.message || "Ошибка сервера при отправке объекта в ремонт",
    });
  }
});

// app.post("/repair_ventilation", verifyJwtToken, (req, res) => {
//   const { status, location, id } = req.body;
//   db.query(
//     "UPDATE ventilation_description SET status = $1, location = $2 WHERE ventilation_id = $3",
//     [status, location, id],
//     (err, result) => {
//       if (err) {
//         res.send({ err: err });
//       } else {
//         res.send({ message: "Успешное добавление" });
//       }
//     }
//   );
// });

app.put("/repair_ventilation/:id", verifyJwtToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status, location } = req.body;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        message: "Некорректный ID сплит-системы",
      });
    }
    const result = await db.query(
      "UPDATE ventilation_description SET status = $1, location = $2 WHERE ventilation_id = $3 RETURNING *",
      [status, location, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Сплит-система с указанным ID не найдена",
      });
    }
    return res.status(200).json({
      message: "Данные вентиляции успешно обновлены",
      ventilation: result.rows[0],
    });
  } catch (err) {
    console.error("Ошибка при обновлении сплит-системы:", err);
    return res.status(500).json({
      message: "Внутренняя ошибка сервера при обновлении данных",
    });
  }
});

// app.post("/repair_furniture", verifyJwtToken, (req, res) => {
//   const { status, location, id } = req.body;
//   db.query(
//     "UPDATE furniture_description SET status = $1, location = $2 WHERE furniture_id = $3",
//     [status, location, id],
//     (err, result) => {
//       if (err) {
//         res.send({ err: err });
//       } else {
//         res.send({ message: "Успешное добавление" });
//       }
//     }
//   );
// });

app.put("/repair_furniture/:id", verifyJwtToken, async (req, res) => {
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

// app.post("/repair_computer", verifyJwtToken, (req, res) => {
//   const { status, location, id } = req.body;
//   db.query(
//     "UPDATE computer SET status = $1, location = $2 WHERE id_computer = $3",
//     [status, location, id],
//     (err, result) => {
//       if (err) {
//         res.send({ err: err });
//       } else {
//         res.send({ message: "Успешное добавление" });
//       }
//     }
//   );
// });

app.put("/repair_computer/:id", verifyJwtToken, async (req, res) => {
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

// app.post("/repair_laptop", verifyJwtToken, (req, res) => {
//   const { status, location, id } = req.body;
//   db.query(
//     "UPDATE laptop_description SET status = $1, location = $2 WHERE laptop_id = $3",
//     [status, location, id],
//     (err, result) => {
//       if (err) {
//         res.send({ err: err });
//       } else {
//         res.send({ message: "Успешное добавление" });
//       }
//     }
//   );
// });

app.put("/repair_laptop/:id", verifyJwtToken, async (req, res) => {
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

// app.post("/repair_screen", verifyJwtToken, (req, res) => {
//   const { status, location, id } = req.body;

//   db.query(
//     "UPDATE screen_description SET status = $1, location = $2 WHERE screen_id = $3",
//     [status, location, id],
//     (err, result) => {
//       if (err) {
//         res.send({ err: err });
//       } else {
//         res.send({ message: "Успешное добавление" });
//       }
//     }
//   );
// });

app.put("/repair_screen/:id", verifyJwtToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status, location } = req.body;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        message: "Некорректный ID монитора",
      });
    }
    const result = await db.query(
      "UPDATE screen_description SET status = $1, location = $2 WHERE screen_id = $3 RETURNING *",
      [status, location, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Монитор с указанным ID не найден",
      });
    }
    return res.status(200).json({
      message: "Данные монитора успешно обновлены",
      screen: result.rows[0],
    });
  } catch (err) {
    console.error("Ошибка при обновлении монитора:", err);
    return res.status(500).json({
      message: "Внутренняя ошибка сервера при обновлении данных",
    });
  }
});

// app.post("/repair_scanner", verifyJwtToken, (req, res) => {
//   const { status, location, id } = req.body;

//   db.query(
//     "UPDATE scanner_description SET status = $1, location = $2 WHERE scanner_id = $3",
//     [status, location, id],
//     (err, result) => {
//       if (err) {
//         res.send({ err: err });
//       } else {
//         res.send({ message: "Успешное добавление" });
//       }
//     }
//   );
// });

app.put("/repair_scanner/:id", verifyJwtToken, async (req, res) => {
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

// app.post("/repair_camera", verifyJwtToken, (req, res) => {
//   const { status, location, id } = req.body;

//   db.query(
//     "UPDATE camera_description SET status = $1, location = $2 WHERE camera_id = $3",
//     [status, location, id],
//     (err, result) => {
//       if (err) {
//         res.send({ err: err });
//       } else {
//         res.send({ message: "Успешное добавление" });
//       }
//     }
//   );
// });

app.put("/repair_camera/:id", verifyJwtToken, async (req, res) => {
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

app.get("/select_repair", verifyJwtToken, (_, res) => {
  db.query("SELECT * FROM repair", (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result.rows);
    }
  });
});

app.get("/select_repair_computer", verifyJwtToken, (_, res) => {
  db.query("SELECT * FROM repair WHERE type = 'Компьютер'", (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result.rows);
    }
  });
});

app.get("/select_repair_laptop", verifyJwtToken, (_, res) => {
  db.query("SELECT * FROM repair WHERE type = 'Ноутбук'", (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result.rows);
    }
  });
});

app.get("/select_repair_screen", verifyJwtToken, (_, res) => {
  db.query("SELECT * FROM repair WHERE type = 'Монитор'", (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result.rows);
    }
  });
});

app.get("/select_repair_scanner", verifyJwtToken, (_, res) => {
  db.query("SELECT * FROM repair WHERE type = 'МФУ'", (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result.rows);
    }
  });
});

app.get("/select_repair_camera", verifyJwtToken, (_, res) => {
  db.query("SELECT * FROM repair WHERE type = 'Камера'", (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result.rows);
    }
  });
});

app.get("/select_repair_ventilation", verifyJwtToken, (_, res) => {
  db.query(
    "SELECT * FROM repair WHERE category = 'Система вентиляции'",
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result.rows);
      }
    }
  );
});

app.get("/select_repair_furniture", verifyJwtToken, (_, res) => {
  db.query("SELECT * FROM repair WHERE category = 'Мебель'", (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result.rows);
    }
  });
});

app.delete("/delete-repair/:del", verifyJwtToken, (req, res) => {
  const del = req.params.del;
  db.query("DELETE FROM repair WHERE id_repair = $1", [del], (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result.rows);
    }
  });
});

app.patch("/ventilation_from_repair/:id", verifyJwtToken, (req, res) => {
  const id = req.params.id;
  db.query(
    "UPDATE ventilation_description SET status = 'В резерве', location = 'Склад' WHERE ventilation_id = $1",
    [id],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send({ message: "Успех" });
      }
    }
  );
});

app.patch("/furniture_from_repair/:id", verifyJwtToken, (req, res) => {
  const id = req.params.id;
  db.query(
    "UPDATE furniture_description SET status = 'В резерве', location = 'Склад' WHERE furniture_id = $1",
    [id],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send({ message: "Успех" });
      }
    }
  );
});

app.patch("/computer_from_repair/:id", verifyJwtToken, (req, res) => {
  const id = req.params.id;
  db.query(
    "UPDATE computer SET status = 'В резерве', location = 'Склад' WHERE id_computer = $1",
    [id],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send({ message: "Успех" });
      }
    }
  );
});

app.patch("/laptop_from_repair/:id", verifyJwtToken, (req, res) => {
  const id = req.params.id;
  db.query(
    "UPDATE laptop_description SET status = 'В резерве', location = 'Склад' WHERE laptop_id = $1",
    [id],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send({ message: "Успех" });
      }
    }
  );
});

app.patch("/screen_from_repair/:id", verifyJwtToken, (req, res) => {
  const id = req.params.id;
  db.query(
    "UPDATE screen_description SET status = 'В резерве', location = 'Склад' WHERE screen_id = $1",
    [id],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send({ message: "Успех" });
      }
    }
  );
});

app.patch("/scanner_from_repair/:id", verifyJwtToken, (req, res) => {
  const id = req.params.id;
  db.query(
    "UPDATE scanner_description SET status = 'В резерве', location = 'Склад' WHERE scanner_id = $1",
    [id],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send({ message: "Успех" });
      }
    }
  );
});

app.patch("/camera_from_repair/:id", verifyJwtToken, (req, res) => {
  const id = req.params.id;
  db.query(
    "UPDATE camera_description SET status = 'В резерве', location = 'Склад' WHERE camera_id = $1",
    [id],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send({ message: "Успех" });
      }
    }
  );
});

app.post("/replace", verifyJwtToken, (req, res) => {
  const { name, type, old_part, new_part, date } = req.body;

  db.query(
    "INSERT INTO replacement (name, type, old_part, new_part, date) VALUES ($1, $2, $3, $4, $5)",
    [name, type, old_part, new_part, date],
    (err, result) => {
      if (err) {
        res.send({
          err: err,
          details: {
            code: err.code,
            message: err.message,
            constraint: err.constraint,
          },
        });
      } else {
        res.send({ message: "Успешное добавление" });
      }
    }
  );
});

// Подумать насчет этого

app.patch("/update_computer_videocard", verifyJwtToken, (req, res) => {
  const { videocard, id } = req.body;

  db.query(
    "UPDATE computer SET videocard_id = $1 WHERE id_computer = $2",
    [videocard, id],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send({ message: "Успешное добавление" });
      }
    }
  );
});

app.patch("/update_computer_processor", verifyJwtToken, (req, res) => {
  const { processor, id } = req.body;

  db.query(
    "UPDATE computer SET processor_id = $1 WHERE id_computer = $2",
    [processor, id],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send({ message: "Успешное добавление" });
      }
    }
  );
});

app.patch("/update_computer_mothercard", verifyJwtToken, (req, res) => {
  const { mothercard, id } = req.body;

  db.query(
    "UPDATE computer SET mothercard_id = $1 WHERE id_computer = $2",
    [mothercard, id],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send({ message: "Успешное добавление" });
      }
    }
  );
});

app.patch("/update_computer_memory", verifyJwtToken, (req, res) => {
  const { memory, id } = req.body;

  db.query(
    "UPDATE computer SET memory_id = $1 WHERE id_computer = $2",
    [memory, id],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send({ message: "Успешное добавление" });
      }
    }
  );
});

app.patch("/update_computer_disk", verifyJwtToken, (req, res) => {
  const { disk, id } = req.body;

  db.query(
    "UPDATE computer SET disk_id = $1 WHERE id_computer = $2",
    [disk, id],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send({ message: "Успешное добавление" });
      }
    }
  );
});

app.get("/change", verifyJwtToken, async (_, res) => {
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

app.use("*", (_, res) => {
  res.status(404).json({ error: "Маршрут не найден" });
});

app.listen(process.env.PORT, () => {
  console.log(`Сервер успешно запущен`);
});

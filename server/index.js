require("module-alias/register");

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("@db/database");
const verifyJwtToken = require("@utils/verifyToken");

// Настроить подключение

// Подключение основных маршрутов
const authRoutes = require("@routes/auth");
const chancelleryRoutes = require("@routes/chancellery");
const employeeRoutes = require("@routes/employee");
const mainRoutes = require("@routes/mainMenu");
const movementRoutes = require("@routes/movement");
const storageRoutes = require("@routes/storage");

// Подключение маршрутов компонентов
const videocardRoutes = require("@routes/computers/components/videocards");
const processorRoutes = require("@routes/computers/components/processors");
const mothercardRoutes = require("@routes/computers/components/mothercards");
const memoryRoutes = require("@routes/computers/components/memories");
const diskRoutes = require("@routes/computers/components/disks");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Применение запросов
app.use("/api/auth", authRoutes); // Запросы об авторизации в системе
app.use("/api/chancellery", chancelleryRoutes); // Запросы по части канцелярии
app.use("/api/employee", employeeRoutes); // Запросы, связанные с материальными лицами
app.use("/api/main", mainRoutes); // Запросы блока "Учет" - главный раздел
app.use("/api/movement", movementRoutes); // Запросы, связанные с перемещением объектов
app.use("/api/storage", storageRoutes); // Запросы, связанные со складом

// Примение запросов о комплектующих
app.use("/api/computers/videocards", videocardRoutes); // Запросы, связанные с видеокартой
app.use("/api/computers/processors", processorRoutes); // Запросы, связанные с процессором
app.use("/api/computers/mothercards", mothercardRoutes); // Запросы, связанные с материнской платой
app.use("/api/computers/memories", memoryRoutes); // Запросы, связанные с ОЗУ
app.use("/api/computers/disks", diskRoutes); // Запросы, связанные с диском

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

app.get("/select_furniture", verifyJwtToken, async (_, res) => {
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

app.get("/sklad_furniture", verifyJwtToken, async (_, res) => {
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

app.get("/select_ventilation", verifyJwtToken, async (_, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM ventilation_description ORDER BY ventilation_id ASC"
    );
    return res.json(result.rows);
  } catch (err) {
    console.error("Ошибка сервера", err);
    return res
      .status(500)
      .json({ message: "Ошибка сервера при получении данных" });
  }
});

app.get("/sklad_ventilation", verifyJwtToken, async (_, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM ventilation_description WHERE location = 'Склад' ORDER BY ventilation_id ASC"
    );
    return res.json(result.rows);
  } catch (err) {
    console.error("Ошибка сервера", err);
    return res
      .status(500)
      .json({ message: "Ошибка сервера при получении данных" });
  }
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

app.get("/select_laptop", verifyJwtToken, async (_, res) => {
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

app.get("/sklad_laptop", verifyJwtToken, async (_, res) => {
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

app.get("/select_scanner", verifyJwtToken, async (_, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM scanner_description ORDER BY scanner_id ASC"
    );
    return res.json(result.rows);
  } catch (err) {
    console.error("Ошибка сервера", err);
    return res
      .status(500)
      .json({ message: "Ошибка сервера при получении данных" });
  }
});

app.get("/sklad_scanner", verifyJwtToken, async (_, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM scanner_description WHERE location = 'Склад' ORDER BY scanner_id ASC"
    );
    return res.json(result.rows);
  } catch (err) {
    console.error("Ошибка сервера", err);
    return res
      .status(500)
      .json({ message: "Ошибка сервера при получении данных" });
  }
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

app.get("/select_screen", verifyJwtToken, async (_, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM screen_description ORDER BY screen_id ASC"
    );
    return res.json(result.rows);
  } catch (err) {
    console.error("Ошибка сервера", err);
    return res
      .status(500)
      .json({ message: "Ошибка сервера при получении данных" });
  }
});

app.get("/sklad_screen", verifyJwtToken, async (_, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM screen_description WHERE location = 'Склад' ORDER BY screen_id ASC"
    );
    return res.json(result.rows);
  } catch (err) {
    console.error("Ошибка сервера", err);
    return res
      .status(500)
      .json({ message: "Ошибка сервера при получении данных" });
  }
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

app.get("/select_camera", verifyJwtToken, async (_, res) => {
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

app.get("/sklad_camera", verifyJwtToken, async (_, res) => {
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

app.get("/computer", verifyJwtToken, async (_, res) => {
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

app.get("/sklad_computer", verifyJwtToken, async (_, res) => {
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

app.patch("/location_computer/:id", verifyJwtToken, async (req, res) => {
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

app.patch("/location_laptop/:id", verifyJwtToken, async (req, res) => {
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

app.patch("/location_screen/:id", verifyJwtToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { location, status } = req.body;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        message: "Некорректный ID монитора",
      });
    }

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

app.patch("/location_scanner/:id", verifyJwtToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { location, status } = req.body;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        message: "Некорректный ID МФУ",
      });
    }

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

app.patch("/location_camera/:id", verifyJwtToken, async (req, res) => {
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

app.patch("/location_furniture/:id", verifyJwtToken, async (req, res) => {
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

app.patch("/location_ventilation/:id", verifyJwtToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { location, status } = req.body;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        message: "Некорректный ID вентиляции",
      });
    }

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

app.get("/computer_movement", verifyJwtToken, async (_, res) => {
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

app.get("/laptop_movement", verifyJwtToken, async (_, res) => {
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

app.get("/screen_movement", verifyJwtToken, async (_, res) => {
  try {
    const result = await db.query(
      `SELECT * FROM screen_description 
      WHERE location <> 'Склад' AND location <> '-'
      ORDER BY screen_id ASC`
    );
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

app.get("/select_repair", verifyJwtToken, async (_, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM repair ORDER BY id_repair ASC"
    );
    return res.json(result.rows);
  } catch (err) {
    console.error("Ошибка сервера", err);
    return res
      .status(500)
      .json({ message: "Ошибка сервера при получении данных" });
  }
});

app.get("/select_repair_computer", verifyJwtToken, async (_, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM repair WHERE type = 'Компьютер'"
    );
    return res.json(result.rows);
  } catch (err) {
    console.error("Ошибка сервера", err);
    return res
      .status(500)
      .json({ message: "Ошибка сервера при получении данных" });
  }
});

app.get("/select_repair_laptop", verifyJwtToken, async (_, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM repair WHERE type = 'Ноутбук'"
    );
    return res.json(result.rows);
  } catch (err) {
    console.error("Ошибка сервера", err);
    return res
      .status(500)
      .json({ message: "Ошибка сервера при получении данных" });
  }
});

app.get("/select_repair_screen", verifyJwtToken, async (_, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM repair WHERE type = 'Монитор'"
    );
    return res.json(result.rows);
  } catch (err) {
    console.error("Ошибка сервера", err);
    return res
      .status(500)
      .json({ message: "Ошибка сервера при получении данных" });
  }
});

app.get("/select_repair_scanner", verifyJwtToken, async (_, res) => {
  try {
    const result = await db.query("SELECT * FROM repair WHERE type = 'МФУ'");
    return res.json(result.rows);
  } catch (err) {
    console.error("Ошибка сервера", err);
    return res
      .status(500)
      .json({ message: "Ошибка сервера при получении данных" });
  }
});

app.get("/select_repair_camera", verifyJwtToken, async (_, res) => {
  try {
    const result = await db.query("SELECT * FROM repair WHERE type = 'Камера'");
    return res.json(result.rows);
  } catch (err) {
    console.error("Ошибка сервера", err);
    return res
      .status(500)
      .json({ message: "Ошибка сервера при получении данных" });
  }
});

app.get("/select_repair_ventilation", verifyJwtToken, async (_, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM repair WHERE category = 'Система вентиляции'"
    );
    return res.json(result.rows);
  } catch (err) {
    console.error("Ошибка сервера", err);
    return res
      .status(500)
      .json({ message: "Ошибка сервера при получении данных" });
  }
});

app.get("/select_repair_furniture", verifyJwtToken, async (_, res) => {
  try {
    const result = await db.query("SELECT * FROM repair WHERE type = 'Мебель'");
    return res.json(result.rows);
  } catch (err) {
    console.error("Ошибка сервера", err);
    return res
      .status(500)
      .json({ message: "Ошибка сервера при получении данных" });
  }
});

app.patch("/ventilation_from_repair/:id", verifyJwtToken, async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        message: "Некорректный ID вентиляции",
      });
    }
    const result = await db.query(
      "UPDATE ventilation_description SET status = 'В резерве', location = 'Склад' WHERE ventilation_id = $1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Вентиляция не найдена",
      });
    }
    res.status(200).json({
      message: "Вентиляция успешно возвращена на склад",
      returnItem: result.rows[0],
    });
  } catch (err) {
    console.error("Ошибка сервера:", err);
    return res.status(500).json({
      message: "Ошибка сервера при возврате вентиляции на склад",
    });
  }
});

app.patch("/furniture_from_repair/:id", verifyJwtToken, async (req, res) => {
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
      message: "Вентиляция успешно возвращена на склад",
      returnItem: result.rows[0],
    });
  } catch (err) {
    console.error("Ошибка сервера:", err);
    return res.status(500).json({
      message: "Ошибка сервера при возврате мебели на склад",
    });
  }
});

app.patch("/computer_from_repair/:id", verifyJwtToken, async (req, res) => {
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

app.patch("/laptop_from_repair/:id", verifyJwtToken, async (req, res) => {
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

app.patch("/screen_from_repair/:id", verifyJwtToken, async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        message: "Некорректный ID монитора",
      });
    }
    const result = await db.query(
      "UPDATE screen_description SET status = 'В резерве', location = 'Склад' WHERE screen_id = $1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Монитор не найден",
      });
    }
    res.status(200).json({
      message: "Монитор успешно возвращен на склад",
      returnItem: result.rows[0],
    });
  } catch (err) {
    console.error("Ошибка сервера:", err);
    return res.status(500).json({
      message: "Ошибка сервера при возврате монитора на склад",
    });
  }
});

app.patch("/scanner_from_repair/:id", verifyJwtToken, async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        message: "Некорректный ID МФУ",
      });
    }
    const result = await db.query(
      "UPDATE scanner_description SET status = 'В резерве', location = 'Склад' WHERE scanner_id = $1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "МФУ не найдено",
      });
    }
    res.status(200).json({
      message: "МФУ успешно возвращено на склад",
      returnItem: result.rows[0],
    });
  } catch (err) {
    console.error("Ошибка сервера:", err);
    return res.status(500).json({
      message: "Ошибка сервера при возврате МФУ на склад",
    });
  }
});

app.patch("/camera_from_repair/:id", verifyJwtToken, async (req, res) => {
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

app.use("*", (_, res) => {
  res.status(404).json({ error: "Маршрут не найден" });
});

app.listen(process.env.PORT, () => {
  console.log(`Сервер успешно запущен`);
});

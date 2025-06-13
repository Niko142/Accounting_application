const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const { Pool } = require("pg");
const verifyJwtToken = require("./utils/verifyToken");
const bcrypt = require("bcryptjs");

dotenv.config();

app.use(express.json());
app.use(cors());

// Структурировать потом запросы
// И унифицировать запросы

const db = new Pool({
  // host: 'db',
  host: process.env.HOST, // Для локальной сборки
  user: process.env.USER_NAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DB_PORT,
});

// Подключение к БД
db.connect((err) => {
  if (err) {
    console.error("Ошибка подключения к PostgreSQL:", err.stack);
  } else {
    console.log("Соединение с PostgreSQL успешно установлено");
  }
});

// Запрос для авторизации
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const result = await new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM users WHERE username = $1",
        [username],
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        }
      );
    });

    if (result.rows.length === 0) {
      return res
        .status(401)
        .json({ message: "Пользователь с таким никнеймом не найден!!!" });
    }

    const user = result.rows[0];

    // Хеширование пароля для безопасности
    const passwordCompare = await bcrypt.compare(password, user.password);

    if (!passwordCompare) {
      return res.status(401).json({ message: "Ошибка: неверный пароль!!!" });
    }

    // Уникальный токен авторизации, действующий 4 часа
    const token = jwt.sign(
      {
        id: user.user_id,
        username: user.username,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "4h" }
    );

    return res.status(200).json({
      message: "Успешная авторизация",
      token,
      user: {
        id: user.user_id,
        username: user.username,
      },
    });
  } catch (err) {
    console.error("Ошибка при авторизации:", err);
    return res
      .status(500)
      .json({ message: err.message || "Ошибка сервера при попытке входа" });
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

app.post("/add-employee", verifyJwtToken, async (req, res) => {
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

app.get("/main_laptop", (_, res) => {
  db.query(
    `SELECT 
      laptop_id, model, systems, videocard, processor, memory, volume, price, 
      laptop_description.location, status, 
      COALESCE(employee.name, '.') AS name, 
      COALESCE(employee.surname, '.') AS surname, 
      COALESCE(employee.patronymic, '.') AS patronymic 
    FROM laptop_description 
    LEFT JOIN employee ON laptop_description.employee = employee.employee_id`,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result.rows);
      }
    }
  );
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

app.get("/main_scanner", verifyJwtToken, (_, res) => {
  db.query(
    `SELECT scanner_id, nam, color, speed, price, scanner_description.location, status, 
      COALESCE(employee.name, '.') AS name, 
      COALESCE(employee.surname, '.') AS surname, 
      COALESCE(employee.patronymic, '.') AS patronymic 
    FROM scanner_description 
    LEFT JOIN employee ON scanner_description.employee = employee.employee_id`,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result.rows);
      }
    }
  );
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

app.get("/main_screen", verifyJwtToken, (_, res) => {
  db.query(
    `SELECT screen_id, model, diagonal, rate, type, price, screen_description.location, status, 
      COALESCE(employee.name, '.') AS name, 
      COALESCE(employee.surname, '.') AS surname, 
      COALESCE(employee.patronymic, '.') AS patronymic 
    FROM screen_description 
    LEFT JOIN employee ON screen_description.employee = employee.employee_id`,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result.rows);
      }
    }
  );
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

app.get("/main_camera", verifyJwtToken, (_, res) => {
  db.query(
    `SELECT camera_id, model, resolution, angle, price, camera_description.location, status, 
      COALESCE(employee.name, '.') AS name, 
      COALESCE(employee.surname, '.') AS surname, 
      COALESCE(employee.patronymic, '.') AS patronymic 
    FROM camera_description 
    LEFT JOIN employee ON camera_description.employee = employee.employee_id`,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result.rows);
      }
    }
  );
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

app.get("/select_employee", verifyJwtToken, (_, res) => {
  db.query("SELECT * FROM employee", (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result.rows);
    }
  });
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

app.get("/main_furniture", verifyJwtToken, (_, res) => {
  db.query(
    `SELECT furniture_id, furniture_description.name AS name, model, price, furniture_description.location, status, 
      COALESCE(employee.name, '.') AS names, 
      COALESCE(employee.surname, '.') AS surname, 
      COALESCE(employee.patronymic, '.') AS patronymic 
    FROM furniture_description 
    LEFT JOIN employee ON furniture_description.employee = employee.employee_id`,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result.rows);
      }
    }
  );
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

app.get("/select_ventilation", verifyJwtToken, (_, res) => {
  db.query("SELECT * FROM ventilation_description", (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result.rows);
    }
  });
});

app.get("/main_ventilation", verifyJwtToken, (_, res) => {
  db.query(
    `SELECT ventilation_id, model, price, ventilation_description.location, status, 
      COALESCE(employee.name, '.') AS name, 
      COALESCE(employee.surname, '.') AS surname, 
      COALESCE(employee.patronymic, '.') AS patronymic 
    FROM ventilation_description 
    LEFT JOIN employee ON ventilation_description.employee = employee.employee_id`,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result.rows);
      }
    }
  );
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

app.get("/videocard", verifyJwtToken, (_, res) => {
  db.query(
    "SELECT * FROM videocard WHERE location = 'Склад'",
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result.rows);
      }
    }
  );
});

app.get("/processor", verifyJwtToken, (_, res) => {
  db.query(
    "SELECT * FROM processor WHERE location = 'Склад'",
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result.rows);
      }
    }
  );
});

app.get("/mothercard", verifyJwtToken, (_, res) => {
  db.query(
    "SELECT * FROM mothercard WHERE location = 'Склад'",
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result.rows);
      }
    }
  );
});

app.get("/memory", verifyJwtToken, (_, res) => {
  db.query("SELECT * FROM memory WHERE location = 'Склад'", (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result.rows);
    }
  });
});

app.get("/disk", verifyJwtToken, (_, res) => {
  db.query("SELECT * FROM disk WHERE location = 'Склад'", (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result.rows);
    }
  });
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

app.get("/main_computer", verifyJwtToken, (_, res) => {
  db.query(
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
    LEFT JOIN employee ON computer.employee = employee.employee_id`,
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
      videocard,
      processor,
      mothercard,
      memory,
      disk,
      location,
      status,
    } = req.body;

    const result = await db.query(
      `INSERT INTO computer (name, videocard_id, processor_id, mothercard_id, memory_id, disk_id, location, status) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [name, videocard, processor, mothercard, memory, disk, location, status]
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

app.post("/pinning-employee", verifyJwtToken, async (req, res) => {
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

app.get("/select_pinning", verifyJwtToken, (_, res) => {
  db.query(
    `SELECT id_pinning, date, category, type, unit, employee.name AS name, employee.surname AS surname, employee.patronymic AS patronymic 
      FROM pinning_employee INNER JOIN employee ON pinning_employee.employee = employee.employee_id`,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result.rows);
      }
    }
  );
});

app.get("/cabinet", verifyJwtToken, (_, res) => {
  db.query("SELECT * FROM cabinet", (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result.rows);
    }
  });
});

app.get("/not_sklad_cabinet", verifyJwtToken, (_, res) => {
  db.query("SELECT * FROM cabinet WHERE number <> 'Склад'", (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result.rows);
    }
  });
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

app.get("/history-cabinet", verifyJwtToken, (_, res) => {
  db.query("SELECT * FROM pinning_cabinet", (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result.rows);
    }
  });
});

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

app.patch("/update_videocard", verifyJwtToken, (req, res) => {
  const { location, id } = req.body;

  db.query(
    "UPDATE videocard SET location = $1 WHERE id_videocard = $2",
    [location, id],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send({ message: "Успешное добавление" });
      }
    }
  );
});

app.patch("/update_processor", verifyJwtToken, (req, res) => {
  const { location, id } = req.body;

  db.query(
    "UPDATE processor SET location = $1 WHERE id_processor = $2",
    [location, id],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send({ message: "Успешное добавление" });
      }
    }
  );
});

app.patch("/update_mothercard", verifyJwtToken, (req, res) => {
  const { location, id } = req.body;

  db.query(
    "UPDATE mothercard SET location = $1 WHERE id_mothercard = $2",
    [location, id],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send({ message: "Успешное добавление" });
      }
    }
  );
});

app.patch("/update_memory", verifyJwtToken, (req, res) => {
  const { location, id } = req.body;

  db.query(
    "UPDATE memory SET location = $1 WHERE id_memory = $2",
    [location, id],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send({ message: "Успешное добавление" });
      }
    }
  );
});

app.patch("/update_disk", verifyJwtToken, (req, res) => {
  const { location, id } = req.body;

  db.query(
    "UPDATE disk SET location = $1 WHERE id_disk = $2",
    [location, id],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send({ message: "Успешное добавление" });
      }
    }
  );
});

app.get("/computer_movement", verifyJwtToken, (_, res) => {
  db.query(
    "SELECT * FROM computer WHERE location <> 'Склад' AND location <> '-'",
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result.rows);
      }
    }
  );
});

app.get("/laptop_movement", verifyJwtToken, (_, res) => {
  db.query(
    "SELECT * FROM laptop_description WHERE location <> 'Склад' AND location <> '-'",
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result.rows);
      }
    }
  );
});

app.get("/screen_movement", verifyJwtToken, (_, res) => {
  db.query(
    "SELECT * FROM screen_description WHERE location <> 'Склад' AND location <> '-'",
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result.rows);
      }
    }
  );
});

app.get("/scanner_movement", verifyJwtToken, (_, res) => {
  db.query(
    "SELECT * FROM scanner_description WHERE location <> 'Склад' AND location <> '-'",
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result.rows);
      }
    }
  );
});

app.get("/camera_movement", verifyJwtToken, (_, res) => {
  db.query(
    "SELECT * FROM camera_description WHERE location <> 'Склад' AND location <> '-'",
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result.rows);
      }
    }
  );
});

app.get("/furniture_movement", verifyJwtToken, (_, res) => {
  db.query(
    "SELECT * FROM furniture_description WHERE location <> 'Склад' AND location <> '-'",
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result.rows);
      }
    }
  );
});

app.delete("/delete-employee/:id", verifyJwtToken, async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        message: "Некорректный ID вентиляции",
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

app.delete("/delete-computer", verifyJwtToken, (req, res) => {
  // try {
  //   const {id} = req.params;
  // }
  const id = req.body.id;
  db.query(
    "DELETE FROM computer WHERE id_computer = $1",
    [id],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send({ message: "Успешное добавление" });
      }
    }
  );
});

app.delete("/delete-laptop", verifyJwtToken, (req, res) => {
  const id = req.body.id;
  db.query(
    "DELETE FROM laptop_description WHERE laptop_id = $1",
    [id],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send({ message: "Успешное добавление" });
      }
    }
  );
});

app.delete("/delete-screen", verifyJwtToken, (req, res) => {
  const id = req.body.id;
  db.query(
    "DELETE FROM screen_description WHERE screen_id = $1",
    [id],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send({ message: "Успешное добавление" });
      }
    }
  );
});

app.delete("/delete-scanner", verifyJwtToken, (req, res) => {
  const id = req.body.id;
  db.query(
    "DELETE FROM scanner_description WHERE scanner_id = $1",
    [id],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send({ message: "Успешное добавление" });
      }
    }
  );
});

app.delete("/delete-camera", verifyJwtToken, (req, res) => {
  const id = req.body.id;
  db.query(
    "DELETE FROM camera_description WHERE camera_id = $1",
    [id],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send({ message: "Успешное добавление" });
      }
    }
  );
});

app.delete("/delete-ventilation", verifyJwtToken, (req, res) => {
  const id = req.body.id;
  db.query(
    "DELETE FROM ventilation_description WHERE ventilation_id = $1",
    [id],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send({ message: "Успешное добавление" });
      }
    }
  );
});

app.delete("/delete-furniture", verifyJwtToken, (req, res) => {
  const id = req.body.id;
  db.query(
    "DELETE FROM furniture_description WHERE furniture_id = $1",
    [id],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send({ message: "Успешное добавление" });
      }
    }
  );
});

app.get("/computer/:id", verifyJwtToken, (req, res) => {
  const id = req.params.id;
  db.query(
    `SELECT id_computer, name, employee, status, computer.location AS location, videocard_id, 
      videocard.model AS videocards, processor_id, processor.model AS processors, mothercard_id, 
      mothercard.model AS mothercards, memory_id, memory.model AS memories, disk_id, disk.model AS disks 
    FROM computer 
    INNER JOIN videocard ON computer.videocard_id = videocard.id_videocard 
    INNER JOIN processor ON computer.processor_id = processor.id_processor 
    INNER JOIN mothercard ON computer.mothercard_id = mothercard.id_mothercard 
    INNER JOIN memory ON computer.memory_id = memory.id_memory 
    INNER JOIN disk ON computer.disk_id = disk.id_disk WHERE id_computer = $1`,
    [id],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result.rows);
      }
    }
  );
});

app.get("/select_laptop/:id", verifyJwtToken, (req, res) => {
  const id = req.params.id;
  db.query(
    "SELECT * FROM laptop_description WHERE laptop_id = $1",
    [id],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result.rows);
      }
    }
  );
});

app.get("/select_screen/:id", verifyJwtToken, (req, res) => {
  const id = req.params.id;
  db.query(
    "SELECT * FROM screen_description WHERE screen_id = $1",
    [id],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result.rows);
      }
    }
  );
});

app.get("/select_scanner/:id", verifyJwtToken, (req, res) => {
  const id = req.params.id;
  db.query(
    "SELECT * FROM scanner_description WHERE scanner_id = $1",
    [id],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result.rows);
      }
    }
  );
});

app.get("/select_camera/:id", verifyJwtToken, (req, res) => {
  const id = req.params.id;
  db.query(
    "SELECT * FROM camera_description WHERE camera_id = $1",
    [id],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result.rows);
      }
    }
  );
});

app.get("/select_furniture/:id", verifyJwtToken, (req, res) => {
  const id = req.params.id;
  db.query(
    "SELECT * FROM furniture_description WHERE furniture_id = $1",
    [id],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result.rows);
      }
    }
  );
});

app.get("/select_ventilation/:id", verifyJwtToken, (req, res) => {
  const id = req.params.id;
  db.query(
    "SELECT * FROM ventilation_description WHERE ventilation_id = $1",
    [id],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result.rows);
      }
    }
  );
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

app.get("/select_utilization", verifyJwtToken, (_, res) => {
  db.query("SELECT * FROM utilization", (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result.rows);
    }
  });
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

// Подумать насчет этого

app.post("/repair_ventilation", verifyJwtToken, (req, res) => {
  const { status, location, id } = req.body;
  db.query(
    "UPDATE ventilation_description SET status = $1, location = $2 WHERE ventilation_id = $3",
    [status, location, id],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send({ message: "Успешное добавление" });
      }
    }
  );
});

app.post("/repair_furniture", verifyJwtToken, (req, res) => {
  const { status, location, id } = req.body;
  db.query(
    "UPDATE furniture_description SET status = $1, location = $2 WHERE furniture_id = $3",
    [status, location, id],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send({ message: "Успешное добавление" });
      }
    }
  );
});

app.post("/repair_computer", verifyJwtToken, (req, res) => {
  const { status, location, id } = req.body;
  db.query(
    "UPDATE computer SET status = $1, location = $2 WHERE id_computer = $3",
    [status, location, id],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send({ message: "Успешное добавление" });
      }
    }
  );
});

app.post("/repair_laptop", verifyJwtToken, (req, res) => {
  const { status, location, id } = req.body;
  db.query(
    "UPDATE laptop_description SET status = $1, location = $2 WHERE laptop_id = $3",
    [status, location, id],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send({ message: "Успешное добавление" });
      }
    }
  );
});

app.post("/repair_screen", verifyJwtToken, (req, res) => {
  const { status, location, id } = req.body;

  db.query(
    "UPDATE screen_description SET status = $1, location = $2 WHERE screen_id = $3",
    [status, location, id],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send({ message: "Успешное добавление" });
      }
    }
  );
});

app.post("/repair_scanner", verifyJwtToken, (req, res) => {
  const { status, location, id } = req.body;

  db.query(
    "UPDATE scanner_description SET status = $1, location = $2 WHERE scanner_id = $3",
    [status, location, id],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send({ message: "Успешное добавление" });
      }
    }
  );
});

app.post("/repair_camera", verifyJwtToken, (req, res) => {
  const { status, location, id } = req.body;

  db.query(
    "UPDATE camera_description SET status = $1, location = $2 WHERE camera_id = $3",
    [status, location, id],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send({ message: "Успешное добавление" });
      }
    }
  );
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

app.get("/change", verifyJwtToken, (_, res) => {
  db.query("SELECT * FROM replacement", (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result.rows);
    }
  });
});

app.get("/chancellery", verifyJwtToken, (_, res) => {
  db.query(
    "SELECT id_chancellery, type, name, unit, price, amounts, (price * amounts) AS itog_price FROM chancellery",
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result.rows);
      }
    }
  );
});

app.post("/add-chancellery", verifyJwtToken, async (req, res) => {
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

// Донастроить и подправить

// app.get("/select_chancellery/:id", verifyJwtToken, async (req, res) => {
//   try {
//     const { id } = req.params;
//     if (!id || isNaN(id)) {
//       return res.status(400).json({
//         message: "Неверный ID категории",
//       });
//     }

//     const result = await db.query(
//       "SELECT * FROM chancellery WHERE id_chancellery = $1",
//       [id]
//     );

//     if (result.rows.length === 0) {
//       return res.status(404).json({ message: "Объект не найден" });
//     }

//     return res.status(200).json({
//       message: "Объект успешно выбран",
//       item: result.rows[0],
//     });
//   } catch (err) {
//     console.error("Ошибка сервера: ", err);
//     return res.status(500).json({
//       message:
//         err.message || "Возникла внутрення ошибка сервера при выборе категории",
//     });
//   }
// });

app.delete("/delete-chancellery/:id", verifyJwtToken, async (req, res) => {
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

app.patch("/update-chancellery", verifyJwtToken, async (req, res) => {
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

app.listen(process.env.PORT, () => {
  console.log(`Сервер успешно запущен`);
});

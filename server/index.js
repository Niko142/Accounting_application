const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const { Pool } = require("pg");

dotenv.config();

app.use(express.json());
app.use(cors());

const db = new Pool({
  host: 'db',
  // host: process.env.HOST, // Для локальной сборки
  user: process.env.USER_NAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DB_PORT,
});

db.connect((err) => {
  if (err) {
    console.error("Ошибка подключения к PostgreSQL:", err.stack);
  } else {
    console.log("Соединение с PostgreSQL успешно установлено");
  }
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE username = $1 AND password = $2",
    [username, password],
    (err, result) => {
      if (err) {
        res.send({
          message:
            "Не удалось войти в систему. Проверьте правильность написания логина или пароля",
          status: 400,
        });
      }
      if (result.rows.length > 0) {
        res.send({ message: "Успешная авторизация", status: 200 });
      } else {
        res.send({
          message:
            "Не удалось войти в систему. Проверьте правильность логина или пароля",
          status: 400,
        });
      }
    }
  );
});

app.post("/furniture", (req, res) => {
  const { name, model, price, location, status } = req.body;

  db.query(
    "INSERT INTO furniture_description (name, model, price, location, status) VALUES ($1, $2, $3, $4, $5)",
    [name, model, price, location, status],
    (err, result) => {
      if (err) {
        res.send({ message: "Ошибка при добавлении мебели на склад" });
      } else {
        res.send({ message: "Успешное добавление" });
      }
    }
  );
});

app.post("/ventilation", (req, res) => {
  const { model, filter, warm, price, location, status } = req.body;

  db.query(
    "INSERT INTO ventilation_description (model, filter, warm, price, location, status) VALUES ($1, $2, $3, $4, $5, $6)",
    [model, filter, warm, price, location, status],
    (err, result) => {
      if (err) {
        res.send({
          message: "Ошибка при добавлении системы вентиляции на склад",
        });
      } else {
        res.send({ message: "Успешное добавление" });
      }
    }
  );
});

app.post("/add-employee", (req, res) => {
  const { name, surname, patronymic, email, phone } = req.body;

  db.query(
    "INSERT INTO employee (name, surname, patronymic, email, phone) VALUES ($1, $2, $3, $4, $5)",
    [name, surname, patronymic, email, phone],
    (err, result) => {
      if (err) {
        res.send({ message: "Ошибка при добавлении материального лица" });
      } else {
        res.send({ message: "Успешное добавление" });
      }
    }
  );
});

app.post("/laptop", (req, res) => {
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
  db.query(
    "INSERT INTO laptop_description (model, systems, videocard, processor, memory, volume, price, location, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
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
    ],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send({ message: "Успешное добавление" });
      }
    }
  );
});

app.get("/select_laptop", (_, res) => {
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

app.get("/sklad_laptop", (_, res) => {
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

app.post("/scanner", (req, res) => {
  const { nam, color, speed, price, location, status } = req.body;

  db.query(
    "INSERT INTO scanner_description (nam, color, speed, price, location, status) VALUES ($1, $2, $3, $4, $5, $6)",
    [nam, color, speed, price, location, status],
    (err, result) => {
      if (err) {
        res.send({ message: "Ошибка при добавлении МФУ" });
      } else {
        res.send({ message: "Успешное добавление" });
      }
    }
  );
});

app.get("/select_scanner", (_, res) => {
  db.query("SELECT * FROM scanner_description", (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result.rows);
    }
  });
});

app.get("/main_scanner", (_, res) => {
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

app.get("/sklad_scanner", (_, res) => {
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

app.post("/screen", (req, res) => {
  const { model, diagonal, rate, type, price, location, status } = req.body;

  db.query(
    "INSERT INTO screen_description (model, diagonal, rate, type, price, location, status) VALUES ($1, $2, $3, $4, $5, $6, $7)",
    [model, diagonal, rate, type, price, location, status],
    (err, result) => {
      if (err) {
        res.send({ message: "Ошибка при добавлении монитора" });
      } else {
        res.send({ message: "Успешное добавление" });
      }
    }
  );
});

app.get("/select_screen", (_, res) => {
  db.query("SELECT * FROM screen_description", (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result.rows);
    }
  });
});

app.get("/main_screen", (_, res) => {
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

app.get("/sklad_screen", (_, res) => {
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

app.post("/camera", (req, res) => {
  const { model, resolution, angle, bracing, price, location, status } =
    req.body;

  db.query(
    "INSERT INTO camera_description (model, resolution, angle, bracing, price, location, status) VALUES ($1, $2, $3, $4, $5, $6, $7)",
    [model, resolution, angle, bracing, price, location, status],
    (err, result) => {
      if (err) {
        res.send({ message: "Ошибка при добавлении монитора" });
      } else {
        res.send({ message: "Успешное добавление" });
      }
    }
  );
});

app.get("/select_camera", (_, res) => {
  db.query("SELECT * FROM camera_description", (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result.rows);
    }
  });
});

app.get("/main_camera", (_, res) => {
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

app.get("/sklad_camera", (_, res) => {
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

app.get("/select_employee", (_, res) => {
  db.query("SELECT * FROM employee", (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result.rows);
    }
  });
});

app.get("/select_furniture", (_, res) => {
  db.query("SELECT * FROM furniture_description", (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result.rows);
    }
  });
});

app.get("/main_furniture", (_, res) => {
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

app.get("/sklad_furniture", (_, res) => {
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

app.get("/select_ventilation", (_, res) => {
  db.query("SELECT * FROM ventilation_description", (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result.rows);
    }
  });
});

app.get("/main_ventilation", (_, res) => {
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

app.get("/sklad_ventilation", (_, res) => {
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

app.get("/videocard", (_, res) => {
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

app.post("/post_videocard", (_, res) => {
  db.query("SELECT * FROM videocard", (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result.rows);
    }
  });
});

app.get("/processor", (_, res) => {
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

app.get("/mothercard", (_, res) => {
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

app.get("/memory", (_, res) => {
  db.query("SELECT * FROM memory WHERE location = 'Склад'", (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result.rows);
    }
  });
});

app.get("/disk", (_, res) => {
  db.query("SELECT * FROM disk WHERE location = 'Склад'", (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result.rows);
    }
  });
});

app.get("/computer", (_, res) => {
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

app.get("/main_computer", (_, res) => {
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

app.get("/sklad_computer", (_, res) => {
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

app.post("/add_computer", (req, res) => {
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

  db.query(
    "INSERT INTO computer (name, videocard_id, processor_id, mothercard_id, memory_id, disk_id, location, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
    [name, videocard, processor, mothercard, memory, disk, location, status],
    (err) => {
      if (err) {
        res.send({ message: "Ошибка при добавлении видекарты" });
      } else {
        res.send({ message: "Успешное добавление" });
      }
    }
  );
});

app.post("/add_videocard", (req, res) => {
  const { model, price, location } = req.body;

  db.query(
    "INSERT INTO videocard (model, price, location) VALUES ($1, $2, $3)",
    [model, price, location],
    (err) => {
      if (err) {
        res.send({ message: "Ошибка при добавлении видекарты" });
      } else {
        res.send({ message: "Успешное добавление" });
      }
    }
  );
});

app.post("/add_processor", (req, res) => {
  const { model, rate, price, location } = req.body;

  db.query(
    "INSERT INTO processor (model, rate, price, location) VALUES ($1, $2, $3, $4)",
    [model, rate, price, location],
    (err) => {
      if (err) {
        res.send({ message: "Ошибка при добавлении видекарты" });
      } else {
        res.send({ message: "Успешное добавление" });
      }
    }
  );
});

app.post("/add_mothercard", (req, res) => {
  const { model, type, rate, price, location } = req.body;

  db.query(
    "INSERT INTO mothercard (model, type, rate, price, location) VALUES ($1, $2, $3, $4, $5)",
    [model, type, rate, price, location],
    (err, result) => {
      if (err) {
        res.send({ message: "Ошибка при добавлении видекарты" });
      } else {
        res.send({ message: "Успешное добавление" });
      }
    }
  );
});

app.post("/add_memory", (req, res) => {
  const { model, type, volume, price, location } = req.body;

  db.query(
    "INSERT INTO memory (model, type, volume, price, location) VALUES ($1, $2, $3, $4, $5)",
    [model, type, volume, price, location],
    (err, result) => {
      if (err) {
        res.send({ message: "Ошибка при добавлении видекарты" });
      } else {
        res.send({ message: "Успешное добавление" });
      }
    }
  );
});

app.post("/add_disk", (req, res) => {
  const { model, volume, price, location } = req.body;

  db.query(
    "INSERT INTO disk (model, volume, price, location) VALUES ($1, $2, $3, $4)",
    [model, volume, price, location],
    (err, result) => {
      if (err) {
        res.send({ message: "Ошибка при добавлении видекарты" });
      } else {
        res.send({ message: "Успешное добавление" });
      }
    }
  );
});

app.post("/pinning-employee", (req, res) => {
  const { date, category, type, unit, employee } = req.body;

  db.query(
    "INSERT INTO pinning_employee (date, category, type, unit, employee) VALUES ($1, $2, $3, $4, $5)",
    [date, category, type, unit, employee],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send({ message: "Успешное добавление" });
      }
    }
  );
});

app.get("/select_pinning", (_, res) => {
  db.query(
    "SELECT id_pinning, date, category, type, unit, employee.name AS name, employee.surname AS surname, employee.patronymic AS patronymic FROM pinning_employee INNER JOIN employee ON pinning_employee.employee = employee.employee_id",
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result.rows);
      }
    }
  );
});

app.get("/cabinet", (_, res) => {
  db.query("SELECT * FROM cabinet", (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result.rows);
    }
  });
});

app.get("/not_sklad_cabinet", (_, res) => {
  db.query("SELECT * FROM cabinet WHERE number <> 'Склад'", (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result.rows);
    }
  });
});

app.post("/update_ventilation", (req, res) => {
  const { employee, id } = req.body;

  db.query(
    "UPDATE ventilation_description SET employee = $1 WHERE ventilation_id = $2",
    [employee, id],
    (err) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send({ message: "Успешное добавление" });
      }
    }
  );
});

app.post("/update_furniture", (req, res) => {
  const { employee, id } = req.body;

  db.query(
    "UPDATE furniture_description SET employee = $1 WHERE furniture_id = $2",
    [employee, id],
    (err) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send({ message: "Успешное добавление" });
      }
    }
  );
});

app.post("/update_computer", (req, res) => {
  const { employee, id } = req.body;

  db.query(
    "UPDATE computer SET employee = $1 WHERE id_computer = $2",
    [employee, id],
    (err) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send({ message: "Успешное добавление" });
      }
    }
  );
});

app.post("/update_laptop", (req, res) => {
  const { employee, id } = req.body;

  db.query(
    "UPDATE laptop_description SET employee = $1 WHERE laptop_id = $2",
    [employee, id],
    (err) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send({ message: "Успешное добавление" });
      }
    }
  );
});

app.post("/update_screen", (req, res) => {
  const { employee, id } = req.body;

  db.query(
    "UPDATE screen_description SET employee = $1 WHERE screen_id = $2",
    [employee, id],
    (err) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send({ message: "Успешное добавление" });
      }
    }
  );
});

app.post("/update_scanner", (req, res) => {
  const { employee, id } = req.body;

  db.query(
    "UPDATE scanner_description SET employee = $1 WHERE scanner_id = $2",
    [employee, id],
    (err) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send({ message: "Успешное добавление" });
      }
    }
  );
});

app.post("/update_camera", (req, res) => {
  const { employee, id } = req.body;

  db.query(
    "UPDATE camera_description SET employee = $1 WHERE camera_id = $2",
    [employee, id],
    (err) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send({ message: "Успешное добавление" });
      }
    }
  );
});

app.post("/pinning-cabinet", (req, res) => {
  const { date, category, type, reason, unit, start, end } = req.body;

  db.query(
    "INSERT INTO pinning_cabinet (date, category, type, reason, unit, start_location, end_location) VALUES ($1, $2, $3, $4, $5, $6, $7)",
    [date, category, type, reason, unit, start, end],
    (err) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send({ message: "Успешное добавление" });
      }
    }
  );
});

app.get("/history-cabinet", (_, res) => {
  db.query("SELECT * FROM pinning_cabinet", (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result.rows);
    }
  });
});

app.patch("/location_computer", (req, res) => {
  const { location, status, id } = req.body;

  db.query(
    "UPDATE computer SET location = $1, status = $2 WHERE id_computer = $3",
    [location, status, id],
    (err) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send({ message: "Успешное добавление" });
      }
    }
  );
});

app.patch("/location_laptop", (req, res) => {
  const { location, status, id } = req.body;

  db.query(
    "UPDATE laptop_description SET location = $1, status = $2 WHERE laptop_id = $3",
    [location, status, id],
    (err) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send({ message: "Успешное добавление" });
      }
    }
  );
});

app.patch("/location_screen", (req, res) => {
  const { location, status, id } = req.body;

  db.query(
    "UPDATE screen_description SET location = $1, status = $2 WHERE screen_id = $3",
    [location, status, id],
    (err) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send({ message: "Успешное добавление" });
      }
    }
  );
});

app.patch("/location_scanner", (req, res) => {
  const { location, status, id } = req.body;

  db.query(
    "UPDATE scanner_description SET location = $1, status = $2 WHERE scanner_id = $3",
    [location, status, id],
    (err) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send({ message: "Успешное добавление" });
      }
    }
  );
});

app.patch("/location_camera", (req, res) => {
  const { location, status, id } = req.body;

  db.query(
    "UPDATE camera_description SET location = $1, status = $2 WHERE camera_id = $3",
    [location, status, id],
    (err) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send({ message: "Успешное добавление" });
      }
    }
  );
});

app.patch("/location_furniture", (req, res) => {
  const { location, status, id } = req.body;

  db.query(
    "UPDATE furniture_description SET location = $1, status = $2 WHERE furniture_id = $3",
    [location, status, id],
    (err) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send({ message: "Успешное добавление" });
      }
    }
  );
});

app.patch("/location_ventilation", (req, res) => {
  const { location, status, id } = req.body;

  db.query(
    "UPDATE ventilation_description SET location = $1, status = $2 WHERE ventilation_id = $3",
    [location, status, id],
    (err) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send({ message: "Успешное добавление" });
      }
    }
  );
});

app.patch("/update_videocard", (req, res) => {
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

app.patch("/update_processor", (req, res) => {
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

app.patch("/update_mothercard", (req, res) => {
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

app.patch("/update_memory", (req, res) => {
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

app.patch("/update_disk", (req, res) => {
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

app.get("/computer_movement", (_, res) => {
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

app.get("/laptop_movement", (_, res) => {
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

app.get("/screen_movement", (_, res) => {
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

app.get("/scanner_movement", (_, res) => {
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

app.get("/camera_movement", (_, res) => {
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

app.get("/furniture_movement", (_, res) => {
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

app.delete("/delete-employee/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    "DELETE FROM employee WHERE employee_id = $1",
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

app.delete("/delete-computer", (req, res) => {
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

app.delete("/delete-laptop", (req, res) => {
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

app.delete("/delete-screen", (req, res) => {
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

app.delete("/delete-scanner", (req, res) => {
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

app.delete("/delete-camera", (req, res) => {
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

app.delete("/delete-ventilation", (req, res) => {
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

app.delete("/delete-furniture", (req, res) => {
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

app.get("/computer/:id", (req, res) => {
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

app.get("/select_laptop/:id", (req, res) => {
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

app.get("/select_screen/:id", (req, res) => {
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

app.get("/select_scanner/:id", (req, res) => {
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

app.get("/select_camera/:id", (req, res) => {
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

app.get("/select_furniture/:id", (req, res) => {
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

app.get("/select_ventilation/:id", (req, res) => {
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

app.post("/utilization", (req, res) => {
  const { date, category, type, number, model, reason } = req.body;

  db.query(
    "INSERT INTO utilization (date, category, type, number, model, reason) VALUES ($1, $2, $3, $4, $5, $6)",
    [date, category, type, number, model, reason],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send({ message: "Успешное добавление" });
      }
    }
  );
});

app.get("/select_utilization", (_, res) => {
  db.query("SELECT * FROM utilization", (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result.rows);
    }
  });
});

app.delete("/delete-disk/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM disk WHERE id_disk = $1", [id], (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result.rows);
    }
  });
});

app.delete("/delete-memory/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM memory WHERE id_memory = $1", [id], (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result.rows);
    }
  });
});

app.delete("/delete-mothercard/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    "DELETE FROM mothercard WHERE id_mothercard = $1",
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

app.delete("/delete-processor/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    "DELETE FROM processor WHERE id_processor = $1",
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

app.delete("/delete-videocard/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    "DELETE FROM videocard WHERE id_videocard = $1",
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

app.post("/repair", (req, res) => {
  const { date, category, type, model, number, end, description } = req.body;

  db.query(
    "INSERT INTO repair (date, category, type, model, number, end_date, description) VALUES ($1, $2, $3, $4, $5, $6, $7)",
    [date, category, type, model, number, end, description],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send({ message: "Успешное добавление" });
      }
    }
  );
});

app.post("/repair_ventilation", (req, res) => {
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

app.post("/repair_furniture", (req, res) => {
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

app.post("/repair_computer", (req, res) => {
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

app.post("/repair_laptop", (req, res) => {
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

app.post("/repair_screen", (req, res) => {
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

app.post("/repair_scanner", (req, res) => {
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

app.post("/repair_camera", (req, res) => {
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

app.get("/select_repair", (_, res) => {
  db.query("SELECT * FROM repair", (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result.rows);
    }
  });
});

app.get("/select_repair_computer", (_, res) => {
  db.query("SELECT * FROM repair WHERE type = 'Компьютер'", (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result.rows);
    }
  });
});

app.get("/select_repair_laptop", (_, res) => {
  db.query("SELECT * FROM repair WHERE type = 'Ноутбук'", (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result.rows);
    }
  });
});

app.get("/select_repair_screen", (_, res) => {
  db.query("SELECT * FROM repair WHERE type = 'Монитор'", (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result.rows);
    }
  });
});

app.get("/select_repair_scanner", (_, res) => {
  db.query("SELECT * FROM repair WHERE type = 'МФУ'", (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result.rows);
    }
  });
});

app.get("/select_repair_camera", (_, res) => {
  db.query("SELECT * FROM repair WHERE type = 'Камера'", (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result.rows);
    }
  });
});

app.get("/select_repair_ventilation", (_, res) => {
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

app.get("/select_repair_furniture", (_, res) => {
  db.query("SELECT * FROM repair WHERE category = 'Мебель'", (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result.rows);
    }
  });
});

app.delete("/delete-repair/:del", (req, res) => {
  const del = req.params.del;
  db.query("DELETE FROM repair WHERE id_repair = $1", [del], (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result.rows);
    }
  });
});

app.patch("/ventilation_from_repair/:id", (req, res) => {
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

app.patch("/furniture_from_repair/:id", (req, res) => {
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

app.patch("/computer_from_repair/:id", (req, res) => {
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

app.patch("/laptop_from_repair/:id", (req, res) => {
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

app.patch("/screen_from_repair/:id", (req, res) => {
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

app.patch("/scanner_from_repair/:id", (req, res) => {
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

app.patch("/camera_from_repair/:id", (req, res) => {
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

app.post("/replace", (req, res) => {
  const { name, type, old_part, new_part, date } = req.body;

  db.query(
    "INSERT INTO replacement (name, type, old_part, new_part, date) VALUES ($1, $2, $3, $4, $5)",
    [name, type, old_part, new_part, date],
    (err, result) => {
      if (err) {
        res.send({ err: err, details: {
          code: err.code,
          message: err.message,
          constraint: err.constraint,
        } });
      } else {
        res.send({ message: "Успешное добавление" });
      }
    }
  );
});

app.patch("/update_computer_videocard", (req, res) => {
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

app.patch("/update_computer_processor", (req, res) => {
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
app.patch("/update_computer_mothercard", (req, res) => {
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
app.patch("/update_computer_memory", (req, res) => {
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
app.patch("/update_computer_disk", (req, res) => {
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

app.get("/change", (_, res) => {
  db.query("SELECT * FROM replacement", (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result.rows);
    }
  });
});

app.get("/chancellery", (_, res) => {
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

app.post("/add-chancellery", (req, res) => {
  const { type, name, unit, price, amounts } = req.body;

  db.query(
    "INSERT INTO chancellery (type, name, unit, price, amounts) VALUES ($1, $2, $3, $4, $5)",
    [type, name, unit, price, amounts],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send({ message: "Успешное добавление" });
      }
    }
  );
});

app.get("/select_chancellery/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    "SELECT * FROM chancellery WHERE id_chancellery = $1",
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

app.delete("/delete-chancellery/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    "DELETE FROM chancellery WHERE id_chancellery = $1",
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

app.post("/update-chancellery", (req, res) => {
  const { amounts, id } = req.body;

  db.query(
    "UPDATE chancellery SET amounts = $1 WHERE id_chancellery = $2",
    [amounts, id],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send({ message: "Успех" });
      }
    }
  );
});

app.listen(process.env.PORT, () => {
  console.log(`Сервер успешно запущен`);
});

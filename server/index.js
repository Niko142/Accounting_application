const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");

dotenv.config();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER_NAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
});

db.connect(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Соединение установлено успешно");
  }
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password],
    (err, result) => {
      if (err) {
        res.send({
          message:
            "Не удалось войти в систему. Проверьте правильность написания логина или пароля",
          status: 400,
        });
      }
      if (result.length > 0) {
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
  const name = req.body.name;
  const model = req.body.model;
  const price = req.body.price;
  const location = req.body.location;
  const status = req.body.status;
  db.query(
    "INSERT INTO furniture_description (name, model, price, location, status) VALUES (?, ?, ?, ?, ?)",
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
  const model = req.body.model;
  const filter = req.body.filter;
  const warm = req.body.warm;
  const price = req.body.price;
  const location = req.body.location;
  const status = req.body.status;
  db.query(
    "INSERT INTO ventilation_description (model, filter, warm, price, location, status) VALUES (?, ?, ?, ?, ?, ?)",
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
  const name = req.body.name;
  const surname = req.body.surname;
  const patronymic = req.body.patronymic;
  const email = req.body.email;
  const phone = req.body.phone;
  db.query(
    "INSERT INTO employee (name, surname, patronymic, email, phone) VALUES (?, ?, ?, ?, ?)",
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
  const model = req.body.model;
  const systems = req.body.systems;
  const videocard = req.body.videocard;
  const processor = req.body.processor;
  const memory = req.body.memory;
  const volume = req.body.volume;
  const price = req.body.price;
  const location = req.body.location;
  const status = req.body.status;
  db.query(
    "INSERT INTO laptop_description (model, systems, videocard, processor, memory, volume, price, location, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
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
app.get("/select_laptop", (req, res) => {
  db.query("SELECT * FROM laptop_description", (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result);
    }
  });
});

app.get("/main_laptop", (req, res) => {
  db.query(
    "SELECT laptop_id, model, systems, videocard, processor, memory, volume, price, laptop_description.location, status, COALESCE(employee.name, '.') AS name, COALESCE(employee.surname, '.') AS surname, COALESCE(employee.patronymic, '.') AS patronymic FROM laptop_description LEFT JOIN employee ON laptop_description.employee = employee.employee_id",
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/sklad_laptop", (req, res) => {
  db.query(
    "SELECT * FROM laptop_description WHERE location = 'Склад'",
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/scanner", (req, res) => {
  const nam = req.body.nam;
  const color = req.body.color;
  const speed = req.body.speed;
  const price = req.body.price;
  const location = req.body.location;
  const status = req.body.status;
  db.query(
    "INSERT INTO scanner_description (nam, color, speed, price, location, status) VALUES (?, ?, ?, ?, ?, ?)",
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
app.get("/select_scanner", (req, res) => {
  db.query("SELECT * FROM scanner_description", (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result);
    }
  });
});

app.get("/main_scanner", (req, res) => {
  db.query(
    "SELECT scanner_id, nam, color, speed, price, scanner_description.location, status, COALESCE(employee.name, '.') AS name, COALESCE(employee.surname, '.') AS surname, COALESCE(employee.patronymic, '.') AS patronymic FROM scanner_description LEFT JOIN employee ON scanner_description.employee = employee.employee_id",
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/sklad_scanner", (req, res) => {
  db.query(
    "SELECT * FROM scanner_description WHERE location = 'Склад'",
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/screen", (req, res) => {
  const model = req.body.model;
  const diagonal = req.body.diagonal;
  const rate = req.body.rate;
  const type = req.body.type;
  const price = req.body.price;
  const location = req.body.location;
  const status = req.body.status;
  db.query(
    "INSERT INTO screen_description (model, diagonal, rate, type, price, location, status) VALUES (?, ?, ?, ?, ?, ?, ?)",
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

app.get("/select_screen", (req, res) => {
  db.query("SELECT * FROM screen_description", (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result);
    }
  });
});

app.get("/main_screen", (req, res) => {
  db.query(
    "SELECT screen_id, model, diagonal, rate, type, price, screen_description.location, status, COALESCE(employee.name, '.') AS name, COALESCE(employee.surname, '.') AS surname, COALESCE(employee.patronymic, '.') AS patronymic FROM screen_description LEFT JOIN employee ON screen_description.employee = employee.employee_id",
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/sklad_screen", (req, res) => {
  db.query(
    "SELECT * FROM screen_description WHERE location = 'Склад'",
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/camera", (req, res) => {
  const model = req.body.model;
  const resolution = req.body.resolution;
  const angle = req.body.angle;
  const bracing = req.body.bracing;
  const price = req.body.price;
  const location = req.body.location;
  const status = req.body.status;
  db.query(
    "INSERT INTO camera_description (model, resolution, angle, bracing, price, location, status) VALUES (?, ?, ?, ?, ?, ?, ?)",
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

app.get("/select_camera", (req, res) => {
  db.query("SELECT * FROM camera_description", (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result);
    }
  });
});

app.get("/main_camera", (req, res) => {
  db.query(
    "SELECT camera_id, model, resolution, angle, price, camera_description.location, status, COALESCE(employee.name, '.') AS name, COALESCE(employee.surname, '.') AS surname, COALESCE(employee.patronymic, '.') AS patronymic FROM camera_description LEFT JOIN employee ON camera_description.employee = employee.employee_id",
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/sklad_camera", (req, res) => {
  db.query(
    "SELECT * FROM camera_description WHERE location = 'Склад'",
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/select_employee", (req, res) => {
  db.query("SELECT * FROM employee", (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result);
    }
  });
});

app.get("/select_furniture", (req, res) => {
  db.query("SELECT * FROM furniture_description", (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result);
    }
  });
});

app.get("/main_furniture", (req, res) => {
  db.query(
    "SELECT furniture_id, furniture_description.name AS name, model, price, furniture_description.location, status, COALESCE(employee.name, '.') AS names, COALESCE(employee.surname, '.') AS surname, COALESCE(employee.patronymic, '.') AS patronymic FROM furniture_description LEFT JOIN employee ON furniture_description.employee = employee.employee_id",
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/sklad_furniture", (req, res) => {
  db.query(
    "SELECT * FROM furniture_description WHERE location = 'Склад'",
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/select_ventilation", (req, res) => {
  db.query("SELECT * FROM ventilation_description", (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result);
    }
  });
});

app.get("/main_ventilation", (req, res) => {
  db.query(
    "SELECT ventilation_id, model, price, ventilation_description.location, status, COALESCE(employee.name, '.') AS name, COALESCE(employee.surname, '.') AS surname, COALESCE(employee.patronymic, '.') AS patronymic FROM ventilation_description LEFT JOIN employee ON ventilation_description.employee = employee.employee_id",
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/sklad_ventilation", (req, res) => {
  db.query(
    "SELECT * FROM ventilation_description WHERE location = 'Склад'",
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/videocard", (req, res) => {
  db.query(
    "SELECT * FROM videocard WHERE location = 'Склад'",
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});
app.post("/post_videocard", (req, res) => {
  db.query("SELECT * FROM videocard", (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result);
    }
  });
});

app.get("/processor", (req, res) => {
  db.query(
    "SELECT * FROM processor WHERE location = 'Склад'",
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/mothercard", (req, res) => {
  db.query(
    "SELECT * FROM mothercard WHERE location = 'Склад'",
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/memory", (req, res) => {
  db.query("SELECT * FROM memory WHERE location = 'Склад'", (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result);
    }
  });
});

app.get("/disk", (req, res) => {
  db.query("SELECT * FROM disk WHERE location = 'Склад'", (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result);
    }
  });
});

app.get("/computer", (req, res) => {
  db.query(
    "SELECT id_computer, computer.employee, computer.location, computer.status, name, videocard.model AS videocards, processor.model AS processors, mothercard.model AS mothercards, memory.model AS memories, disk.model AS disks FROM computer INNER JOIN videocard ON computer.videocard_id = videocard.id_videocard INNER JOIN processor ON computer.processor_id = processor.id_processor INNER JOIN mothercard ON computer.mothercard_id = mothercard.id_mothercard INNER JOIN memory ON computer.memory_id = memory.id_memory INNER JOIN disk ON computer.disk_id = disk.id_disk",
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/main_computer", (req, res) => {
  db.query(
    "SELECT id_computer, computer.location AS location, computer.status AS status, computer.name AS name, videocard.model AS videocards, processor.model AS processors, mothercard.model AS mothercards, memory.model AS memories, disk.model AS disks, COALESCE(employee.name, '.') AS names, COALESCE(employee.surname, '.') AS surname, COALESCE(employee.patronymic, '.') AS patronymic FROM computer INNER JOIN videocard ON computer.videocard_id = videocard.id_videocard INNER JOIN processor ON computer.processor_id = processor.id_processor INNER JOIN mothercard ON computer.mothercard_id = mothercard.id_mothercard INNER JOIN memory ON computer.memory_id = memory.id_memory INNER JOIN disk ON computer.disk_id = disk.id_disk LEFT JOIN employee ON computer.employee = employee.employee_id",
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/sklad_computer", (req, res) => {
  db.query(
    "SELECT id_computer, name, videocard.model AS videocards, processor.model AS processors, mothercard.model AS mothercards, memory.model AS memories, disk.model AS disks, computer.location FROM computer INNER JOIN videocard ON computer.videocard_id = videocard.id_videocard INNER JOIN processor ON computer.processor_id = processor.id_processor INNER JOIN mothercard ON computer.mothercard_id = mothercard.id_mothercard INNER JOIN memory ON computer.memory_id = memory.id_memory INNER JOIN disk ON computer.disk_id = disk.id_disk AND computer.location = 'Склад'",
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/add_computer", (req, res) => {
  const name = req.body.name;
  const videocard = req.body.videocard_id;
  const processor = req.body.processor_id;
  const mothercard = req.body.mothercard_id;
  const memory = req.body.memory_id;
  const disk = req.body.disk_id;
  const location = req.body.location;
  const status = req.body.status;
  db.query(
    "INSERT INTO computer (name, videocard_id, processor_id, mothercard_id, memory_id, disk_id, location, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
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
  const model = req.body.model;
  const price = req.body.price;
  const location = req.body.location;
  db.query(
    "INSERT INTO videocard (model, price, location) VALUES (?, ?, ?)",
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
  const model = req.body.model;
  const rate = req.body.rate;
  const price = req.body.price;
  const location = req.body.location;
  db.query(
    "INSERT INTO processor (model, rate, price, location) VALUES (?, ?, ?, ?)",
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
  const model = req.body.model;
  const type = req.body.type;
  const rate = req.body.rate;
  const price = req.body.price;
  const location = req.body.location;
  db.query(
    "INSERT INTO mothercard (model, type, rate, price, location) VALUES (?, ?, ?, ?, ?)",
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
  const model = req.body.model;
  const type = req.body.type;
  const volume = req.body.volume;
  const price = req.body.price;
  const location = req.body.location;
  db.query(
    "INSERT INTO memory (model, type, volume, price, location) VALUES (?, ?, ?, ?, ?)",
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
  const model = req.body.model;
  const volume = req.body.volume;
  const price = req.body.price;
  const location = req.body.location;
  db.query(
    "INSERT INTO disk (model, volume, price, location) VALUES (?, ?, ?, ?)",
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
  const date = req.body.date;
  const type = req.body.type;
  const category = req.body.category;
  const unit = req.body.unit;
  const employee = req.body.employee;

  db.query(
    "INSERT INTO pinning_employee (date, category, type, unit, employee) VALUES (?, ?, ?, ?, ?)",
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

app.get("/select_pinning", (req, res) => {
  db.query(
    "SELECT id_pinning, date, category, type, unit, employee.name AS name, employee.surname AS surname, employee.patronymic AS patronymic FROM pinning_employee INNER JOIN employee ON pinning_employee.employee = employee.employee_id",
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/cabinet", (req, res) => {
  db.query("SELECT * FROM cabinet", (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result);
    }
  });
});

app.get("/not_sklad_cabinet", (req, res) => {
  db.query("SELECT * FROM cabinet WHERE number <> 'Склад'", (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result);
    }
  });
});

app.post("/update_ventilation", (req, res) => {
  const employee = req.body.employee;
  const id = req.body.id;
  db.query(
    "UPDATE ventilation_description SET employee = ? WHERE ventilation_id = ?",
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
  const employee = req.body.employee;
  const id = req.body.id;
  db.query(
    "UPDATE furniture_description SET employee = ? WHERE furniture_id = ?",
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
  const employee = req.body.employee;
  const id = req.body.id;
  db.query(
    "UPDATE computer SET employee = ? WHERE id_computer = ?",
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
  const employee = req.body.employee;
  const id = req.body.id;
  db.query(
    "UPDATE laptop_description SET employee = ? WHERE laptop_id = ?",
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
  const employee = req.body.employee;
  const id = req.body.id;
  db.query(
    "UPDATE screen_description SET employee = ? WHERE screen_id = ?",
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
  const employee = req.body.employee;
  const id = req.body.id;
  db.query(
    "UPDATE scanner_description SET employee = ? WHERE scanner_id = ?",
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
  const employee = req.body.employee;
  const id = req.body.id;
  db.query(
    "UPDATE camera_description SET employee = ? WHERE camera_id = ?",
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
  const date = req.body.date;
  const type = req.body.type;
  const category = req.body.category;
  const reason = req.body.reason;
  const unit = req.body.unit;
  const start = req.body.start;
  const end = req.body.end;
  db.query(
    "INSERT INTO pinning_cabinet (date, category, type, reason, unit, start_location, end_location) VALUES (?, ?, ?, ?, ?, ?, ?)",
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

app.get("/history-cabinet", (req, res) => {
  db.query("SELECT * FROM pinning_cabinet", (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result);
    }
  });
});

app.patch("/location_computer", (req, res) => {
  const location = req.body.location;
  const status = req.body.status;
  const id = req.body.id;
  db.query(
    "UPDATE computer SET location = ?, status = ? WHERE id_computer = ?",
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
  const location = req.body.location;
  const status = req.body.status;
  const id = req.body.id;
  db.query(
    "UPDATE laptop_description SET location = ?, status = ? WHERE laptop_id = ?",
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
  const location = req.body.location;
  const status = req.body.status;
  const id = req.body.id;
  db.query(
    "UPDATE screen_description SET location = ?, status = ? WHERE screen_id = ?",
    [location, status, id,],
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
  const location = req.body.location;
  const status = req.body.status;
  const id = req.body.id;
  db.query(
    "UPDATE scanner_description SET location = ?, status = ? WHERE scanner_id = ?",
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
  const location = req.body.location;
  const status = req.body.status;
  const id = req.body.id;
  db.query(
    "UPDATE camera_description SET location = ?, status = ? WHERE camera_id = ?",
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
  const location = req.body.location;
  const status = req.body.status;
  const id = req.body.id;
  db.query(
    "UPDATE furniture_description SET location = ?, status = ? WHERE furniture_id = ?",
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
  const location = req.body.location;
  const status = req.body.status;
  const id = req.body.id;
  db.query(
    "UPDATE ventilation_description SET location = ?, status = ? WHERE ventilation_id = ?",
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

app.post("/update_videocard", (req, res) => {
  const location = req.body.location;
  const id = req.body.id;
  db.query(
    "UPDATE videocard SET location = ? WHERE id_videocard = ?",
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

app.post("/update_processor", (req, res) => {
  const location = req.body.location;
  const id = req.body.id;
  db.query(
    "UPDATE processor SET location = ? WHERE id_processor = ?",
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

app.post("/update_mothercard", (req, res) => {
  const location = req.body.location;
  const id = req.body.id;
  db.query(
    "UPDATE mothercard SET location = ? WHERE id_mothercard = ?",
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

app.post("/update_memory", (req, res) => {
  const location = req.body.location;
  const id = req.body.id;
  db.query(
    "UPDATE memory SET location = ? WHERE id_memory = ?",
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

app.post("/update_disk", (req, res) => {
  const location = req.body.location;
  const id = req.body.id;
  db.query(
    "UPDATE disk SET location = ? WHERE id_disk = ?",
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

app.get("/computer_movement", (req, res) => {
  db.query(
    "SELECT * FROM computer WHERE location <> 'Склад' AND location <> '-'",
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/laptop_movement", (req, res) => {
  db.query(
    "SELECT * FROM laptop_description WHERE location <> 'Склад' AND location <> '-'",
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/screen_movement", (req, res) => {
  db.query(
    "SELECT * FROM screen_description WHERE location <> 'Склад' AND location <> '-'",
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/scanner_movement", (req, res) => {
  db.query(
    "SELECT * FROM scanner_description WHERE location <> 'Склад' AND location <> '-'",
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/camera_movement", (req, res) => {
  db.query(
    "SELECT * FROM camera_description WHERE location <> 'Склад' AND location <> '-'",
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/furniture_movement", (req, res) => {
  db.query(
    "SELECT * FROM furniture_description WHERE location <> 'Склад' AND location <> '-'",
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete-employee/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM employee WHERE employee_id = ?", id, (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result);
    }
  });
});

app.delete("/delete-computer", (req, res) => {
  const id = req.body.id;
  db.query("DELETE FROM computer WHERE id_computer = ?", id, (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send({ message: "Успешное добавление" });
    }
  });
});

app.delete("/delete-laptop", (req, res) => {
  const id = req.body.id;
  db.query(
    "DELETE FROM laptop_description WHERE laptop_id = ?",
    id,
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
    "DELETE FROM screen_description WHERE screen_id = ?",
    id,
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
    "DELETE FROM scanner_description WHERE scanner_id = ?",
    id,
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
    "DELETE FROM camera_description WHERE camera_id = ?",
    id,
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
    "DELETE FROM ventilation_description WHERE ventilation_id = ?",
    id,
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
    "DELETE FROM furniture_description WHERE furniture_id = ?",
    id,
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
    "SELECT id_computer, name, employee, status, computer.location AS location, videocard_id, videocard.model AS videocards, processor_id, processor.model AS processors, mothercard_id, mothercard.model AS mothercards, memory_id, memory.model AS memories, disk_id, disk.model AS disks FROM computer INNER JOIN videocard ON computer.videocard_id = videocard.id_videocard INNER JOIN processor ON computer.processor_id = processor.id_processor INNER JOIN mothercard ON computer.mothercard_id = mothercard.id_mothercard INNER JOIN memory ON computer.memory_id = memory.id_memory INNER JOIN disk ON computer.disk_id = disk.id_disk WHERE id_computer = ?",
    id,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/select_laptop/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    "SELECT * FROM laptop_description WHERE laptop_id = ?",
    id,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/select_screen/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    "SELECT * FROM screen_description WHERE screen_id = ?",
    id,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/select_scanner/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    "SELECT * FROM scanner_description WHERE scanner_id = ?",
    id,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/select_camera/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    "SELECT * FROM camera_description WHERE camera_id = ?",
    id,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/select_furniture/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    "SELECT * FROM furniture_description WHERE furniture_id = ?",
    id,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/select_ventilation/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    "SELECT * FROM ventilation_description WHERE ventilation_id = ?",
    id,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/utilization", (req, res) => {
  const date = req.body.date;
  const category = req.body.category;
  const type = req.body.type;
  const number = req.body.number;
  const model = req.body.model;
  const reason = req.body.reason;
  db.query(
    "INSERT INTO utilization (date, category, type, number, model, reason) VALUES (?, ?, ?, ?, ?, ?)",
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

app.get("/select_utilization", (req, res) => {
  db.query("SELECT * FROM utilization", (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result);
    }
  });
});

app.delete("/delete-disk/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM disk WHERE id_disk = ?", id, (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result);
    }
  });
});
app.delete("/delete-memory/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM memory WHERE id_memory = ?", id, (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result);
    }
  });
});
app.delete("/delete-mothercard/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    "DELETE FROM mothercard WHERE id_mothercard = ?",
    id,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});
app.delete("/delete-processor/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    "DELETE FROM processor WHERE id_processor = ?",
    id,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});
app.delete("/delete-videocard/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    "DELETE FROM videocard WHERE id_videocard = ?",
    id,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/status_computer", (req, res) => {
  const status = req.body.status;
  const id = req.body.id;
  db.query(
    "UPDATE computer SET status = ? WHERE id_computer = ?",
    [status, id],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send({ message: "Успешное добавление" });
      }
    }
  );
});

app.post("/status_laptop", (req, res) => {
  const status = req.body.status;
  const id = req.body.id;
  db.query(
    "UPDATE laptop_description SET status = ? WHERE laptop_id = ?",
    [status, id],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send({ message: "Успешное добавление" });
      }
    }
  );
});

app.post("/status_screen", (req, res) => {
  const status = req.body.status;
  const id = req.body.id;
  db.query(
    "UPDATE screen_description SET status = ? WHERE screen_id = ?",
    [status, id],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send({ message: "Успешное добавление" });
      }
    }
  );
});

app.post("/status_scanner", (req, res) => {
  const status = req.body.status;
  const id = req.body.id;
  db.query(
    "UPDATE scanner_description SET status = ? WHERE scanner_id = ?",
    [status, id],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send({ message: "Успешное добавление" });
      }
    }
  );
});

app.post("/status_camera", (req, res) => {
  const status = req.body.status;
  const id = req.body.id;
  db.query(
    "UPDATE camera_description SET status = ? WHERE camera_id = ?",
    [status, id],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send({ message: "Успешное добавление" });
      }
    }
  );
});

app.post("/status_furniture", (req, res) => {
  const status = req.body.status;
  const id = req.body.id;
  db.query(
    "UPDATE furniture_description SET status = ? WHERE furniture_id = ?",
    [status, id],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send({ message: "Успешное добавление" });
      }
    }
  );
});

app.post("/status_ventilation", (req, res) => {
  const status = req.body.status;
  const id = req.body.id;
  db.query(
    "UPDATE ventilation_description SET status = ? WHERE ventilation_id = ?",
    [status, id],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send({ message: "Успешное добавление" });
      }
    }
  );
});

app.post("/repair", (req, res) => {
  const date = req.body.date;
  const category = req.body.category;
  const type = req.body.type;
  const model = req.body.model;
  const number = req.body.number;
  const end = req.body.end;
  const description = req.body.description;
  db.query(
    "INSERT INTO repair (date, category, type, model, number, end_date, description) VALUES (?, ?, ?, ?, ?, ?, ?)",
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
  const status = req.body.status;
  const location = req.body.location;
  const id = req.body.id;
  db.query(
    "UPDATE ventilation_description SET status = ?, location = ? WHERE ventilation_id = ?",
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
  const status = req.body.status;
  const location = req.body.location;
  const id = req.body.id;
  db.query(
    "UPDATE furniture_description SET status = ?, location = ? WHERE furniture_id = ?",
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
  const status = req.body.status;
  const location = req.body.location;
  const id = req.body.id;
  db.query(
    "UPDATE computer SET status = ?, location = ? WHERE id_computer = ?",
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
  const status = req.body.status;
  const location = req.body.location;
  const id = req.body.id;
  db.query(
    "UPDATE laptop_description SET status = ?, location = ? WHERE laptop_id = ?",
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
  const status = req.body.status;
  const location = req.body.location;
  const id = req.body.id;
  db.query(
    "UPDATE screen_description SET status = ?, location = ? WHERE screen_id = ?",
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
  const status = req.body.status;
  const location = req.body.location;
  const id = req.body.id;
  db.query(
    "UPDATE scanner_description SET status = ?, location = ? WHERE scanner_id = ?",
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
  const status = req.body.status;
  const location = req.body.location;
  const id = req.body.id;
  db.query(
    "UPDATE camera_description SET status = ?, location = ? WHERE camera_id = ?",
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

app.get("/select_repair", (req, res) => {
  db.query("SELECT * FROM repair", (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result);
    }
  });
});

app.get("/select_repair_computer", (req, res) => {
  db.query("SELECT * FROM repair WHERE type = 'Компьютер'", (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result);
    }
  });
});

app.get("/select_repair_laptop", (req, res) => {
  db.query("SELECT * FROM repair WHERE type = 'Ноутбук'", (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result);
    }
  });
});

app.get("/select_repair_screen", (req, res) => {
  db.query("SELECT * FROM repair WHERE type = 'Монитор'", (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result);
    }
  });
});

app.get("/select_repair_scanner", (req, res) => {
  db.query("SELECT * FROM repair WHERE type = 'МФУ'", (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result);
    }
  });
});

app.get("/select_repair_camera", (req, res) => {
  db.query("SELECT * FROM repair WHERE type = 'Камера'", (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result);
    }
  });
});

app.get("/select_repair_ventilation", (req, res) => {
  db.query(
    "SELECT * FROM repair WHERE category = 'Система вентиляции'",
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/select_repair_furniture", (req, res) => {
  db.query("SELECT * FROM repair WHERE category = 'Мебель'", (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result);
    }
  });
});

app.delete("/delete-repair/:del", (req, res) => {
  const del = req.params.del;
  db.query("DELETE FROM repair WHERE id_repair = ?", del, (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result);
    }
  });
});

app.patch("/ventilation_from_repair/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    "UPDATE ventilation_description SET status = 'В резерве', location = 'Склад' WHERE ventilation_id = ?",
    id,
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
    "UPDATE furniture_description SET status = 'В резерве', location = 'Склад' WHERE furniture_id = ?",
    id,
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
    "UPDATE computer SET status = 'В резерве', location = 'Склад' WHERE id_computer = ?",
    id,
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
    "UPDATE laptop_description SET status = 'В резерве', location = 'Склад' WHERE laptop_id = ?",
    id,
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
    "UPDATE screen_description SET status = 'В резерве', location = 'Склад' WHERE screen_id = ?",
    id,
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
    "UPDATE scanner_description SET status = 'В резерве', location = 'Склад' WHERE scanner_id = ?",
    id,
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
    "UPDATE camera_description SET status = 'В резерве', location = 'Склад' WHERE camera_id = ?",
    id,
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
  const name = req.body.name;
  const type = req.body.type;
  const start = req.body.start;
  const end = req.body.end;
  const date = req.body.date;
  db.query(
    "INSERT INTO replacement (name, type, start, end, date) VALUES (?, ?, ?, ?, ?)",
    [name, type, start, end, date],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send({ message: "Успешное добавление" });
      }
    }
  );
});

app.post("/update_computer_videocard", (req, res) => {
  const videocard = req.body.videocard;
  const id = req.body.id;
  db.query(
    "UPDATE computer SET videocard_id = ? WHERE id_computer = ?",
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
app.post("/update_computer_processor", (req, res) => {
  const processor = req.body.processor;
  const id = req.body.id;
  db.query(
    "UPDATE computer SET processor_id = ? WHERE id_computer = ?",
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
app.post("/update_computer_mothercard", (req, res) => {
  const mothercard = req.body.mothercard;
  const id = req.body.id;
  db.query(
    "UPDATE computer SET mothercard_id = ? WHERE id_computer = ?",
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
app.post("/update_computer_memory", (req, res) => {
  const memory = req.body.memory;
  const id = req.body.id;
  db.query(
    "UPDATE computer SET memory_id = ? WHERE id_computer = ?",
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
app.post("/update_computer_disk", (req, res) => {
  const disk = req.body.disk;
  const id = req.body.id;
  db.query(
    "UPDATE computer SET disk_id = ? WHERE id_computer = ?",
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

app.get("/change", (req, res) => {
  db.query("SELECT * FROM replacement", (err, result) => {
    if (err) {
      res.send({ err: err });
    } else {
      res.send(result);
    }
  });
});

app.get("/chancellery", (req, res) => {
  db.query(
    "SELECT id_chancellery, type, name, unit, price, amounts, (price * amounts) AS itog_price FROM chancellery",
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/add-chancellery", (req, res) => {
  const type = req.body.type;
  const name = req.body.name;
  const unit = req.body.unit;
  const price = req.body.price;
  const amounts = req.body.amounts;
  db.query(
    "INSERT INTO chancellery (type, name, unit, price, amounts) VALUES (?, ?, ?, ?, ?)",
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
    "SELECT * FROM chancellery WHERE id_chancellery = ?",
    id,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete-chancellery/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    "DELETE FROM chancellery WHERE id_chancellery = ?",
    id,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/update-chancellery", (req, res) => {
  const amounts = req.body.amounts;
  const id = req.body.id;
  db.query(
    "UPDATE chancellery SET amounts = ? WHERE id_chancellery = ?",
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

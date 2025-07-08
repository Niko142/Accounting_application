require("module-alias/register");

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Подключение основных маршрутов
const authRoutes = require("@routes/auth");
const chancelleryRoutes = require("@routes/chancellery");
const employeeRoutes = require("@routes/employee");
const mainRoutes = require("@routes/mainMenu");
const movementRoutes = require("@routes/movement");
const storageRoutes = require("@routes/storage");
const excelRoutes = require('@routes/excel');

// Подключение маршрутов основных категорий объектов
const computerRoutes = require("@routes/computers/computers");
const laptopRoutes = require("@routes/inventory/laptops");
const screenRoutes = require("@routes/inventory/screens");
const scannerRoutes = require("@routes/inventory/scanners");
const cameraRoutes = require("@routes/inventory/cameras");
const furnitureRoutes = require("@routes/inventory/furniture");
const ventilationRoutes = require("@routes/inventory/ventilations");

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

// Применение запросов к основным маршрутам
app.use("/api/auth", authRoutes); // Запросы об авторизации в системе
app.use("/api/chancellery", chancelleryRoutes); // Запросы по части канцелярии
app.use("/api/employee", employeeRoutes); // Запросы, связанные с материальными лицами
app.use("/api/main", mainRoutes); // Запросы блока "Учет" - главный раздел
app.use("/api/movement", movementRoutes); // Запросы, связанные с перемещением объектов
app.use("/api/storage", storageRoutes); // Запросы, связанные со складом
app.use("/api/files", excelRoutes); // Запросы, связанные с импортом файлов для формирования новых записей

// Применение запросов к основными категориям объектов
app.use("/api/computers", computerRoutes); // Запросы, связанные с компьютерами
app.use("/api/laptops", laptopRoutes); // Запросы, связанные с ноутбуками
app.use("/api/screens", screenRoutes); // Запросы, связанные с мониторами
app.use("/api/scanners", scannerRoutes); // Запросы, связанные с МФУ
app.use("/api/cameras", cameraRoutes); // Запросы, связанные с камерой
app.use("/api/furniture", furnitureRoutes); // Запросы, связанные с мебелью
app.use("/api/ventilations", ventilationRoutes); // Запросы, связанные со сплит-системами

// Применение запросов о комплектующих
app.use("/api/computers/videocards", videocardRoutes); // Запросы, связанные с видеокартой
app.use("/api/computers/processors", processorRoutes); // Запросы, связанные с процессором
app.use("/api/computers/mothercards", mothercardRoutes); // Запросы, связанные с материнской платой
app.use("/api/computers/memories", memoryRoutes); // Запросы, связанные с ОЗУ
app.use("/api/computers/disks", diskRoutes); // Запросы, связанные с диском

app.use('/', (_, res) => {
  res.status(200).json({message: 'Сервер успешно запущен'})
})

app.use("*", (_, res) => {
  res.status(404).json({ error: "Маршрут не найден" });
});

app.listen(process.env.PORT, () => {
  console.log(`Сервер успешно запущен`);
});

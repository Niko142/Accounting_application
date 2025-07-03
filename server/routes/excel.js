const express = require("express");
const db = require("@/db/database");
const verifyJwtToken = require("@/utils/verifyToken");

const router = express.Router();

router.use(verifyJwtToken);

// Запрос на отправку данных из файла
// на сервер для последующей обработки
router.post("/excel-import", async (req, res) => {
  try {
    const { category, data } = req.body;

    if (!category) {
      return res.status(400).json({
        message: "Категория не указана",
      });
    }

    if (!data || data.length === 0) {
      return res.status(400).json({
        message: "Данные для импорта отсутствуют",
      });
    }

    const result = await processImportData(category, data);

    return res.status(200).json({
      message: "Отправка данных на сервер прошла успешно",
      responseData: result,
      recordsCount: data.length,
    });
  } catch (err) {
    console.error("Ошибка сервера при отправке данных", err);
    return res.status(500).json({
      message: "Внутренняя ошибка сервера при обновлении данных",
    });
  }
});

// Функция обработки данных по категориям
async function processImportData(category, data) {
  const categoryProcessors = {
    laptop: processLaptops,
    screen: processScreens,
    scanner: processScanners,
    camera: processCameras,
    furniture: processFurniture,
    ventilation: processVentilations,
  };

  // Определение используемой операции на основе категории
  const handler = categoryProcessors[category];
  if (!handler) {
    throw new Error(`Данная категория отсутствует: ${category}`);
  }
  // Обработка каждой записи
  for (const record of data) {
    await handler(record);
  }
}

// Обработка добавления ноутбуков
async function processLaptops(laptopsData) {
  try {
    const { model, systems, videocard, processor, memory, volume, price } =
      laptopsData;

    await db.query(
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
        "Склад",
        "В резерве",
      ]
    );
  } catch (err) {
    return { success: false, error: err };
  }
}

// Обработка добавления мониторов
async function processScreens(screensData) {
  try {
    const { model, diagonal, rate, type, price } = screensData;

    await db.query(
      `INSERT INTO screen_description (model, diagonal, rate, type, price, location, status) 
     VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [model, diagonal, rate, type, price, "Склад", "В резерве"]
    );
  } catch (err) {
    return { success: false, error: err };
  }
}

// Обработка добавления МФУ
async function processScanners(scannersData) {
  try {
    const { name, color, speed, price } = scannersData;

    await db.query(
      `INSERT INTO scanner_description (nam, color, speed, price, location, status) 
     VALUES ($1, $2, $3, $4, $5, $6)`,
      [name, color, speed, price, "Склад", "В резерве"]
    );
  } catch (err) {
    return { success: false, error: err };
  }
}

// Обработка добавления камер
async function processCameras(camerasData) {
  try {
    const { model, resolution, angle, bracing, price } = camerasData;

    await db.query(
      `INSERT INTO camera_description (model, resolution, angle, bracing, price, location, status) 
     VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [model, resolution, angle, bracing, price, "Склад", "В резерве"]
    );
  } catch (err) {
    return { success: false, error: err };
  }
}

// Обработка добавления мебели
async function processFurniture(furnitureData) {
  try {
    const { name, model, price } = furnitureData;

    await db.query(
      `INSERT INTO furniture_description (name, model, price, location, status) 
     VALUES ($1, $2, $3, $4, $5)`,
      [name, model, price, "Склад", "В резерве"]
    );
  } catch (err) {
    return { success: false, error: err };
  }
}

// Обработка добавления сплит-систем
async function processVentilations(ventilationsData) {
  try {
    const { model, filter, warm, price } = ventilationsData;

    await db.query(
      `INSERT INTO ventilation_description (model, filter, warm, price, location, status) 
     VALUES ($1, $2, $3, $4, $5, $6)`,
      [model, filter, warm, price, "Склад", "В резерве"]
    );
  } catch (err) {
    return { success: false, error: err };
  }
}

module.exports = router;

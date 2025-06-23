import {
  videocardColumns,
  processorColumns,
  mothercardColumns,
  memoryColumns,
  diskColumns,
  computerStorageColumns,
  laptopStorageColumns,
  screenStorageColumns,
  scannerStorageColumns,
  cameraStorageColumns,
  furnitureStorageColumns,
  ventilationStorageColumns,
} from 'data/storageColumns';

// Конфиг данных
export const COMPONENT_CONFIG = {
  videocard: { columns: videocardColumns },
  processor: { columns: processorColumns },
  mothercard: { columns: mothercardColumns },
  memory: { columns: memoryColumns },
  disk: { columns: diskColumns },
};

export const OBJECT_CONFIG = {
  computer: { id: 'id_computer', columns: computerStorageColumns },
  laptop: { id: 'laptop_id', columns: laptopStorageColumns },
  screen: { id: 'screen_id', columns: screenStorageColumns },
  scanner: { id: 'scanner_id', columns: scannerStorageColumns },
  camera: { id: 'camera_id', columns: cameraStorageColumns },
  furniture: { id: 'furniture_id', columns: furnitureStorageColumns },
  ventilation: { id: 'ventilation_id', columns: ventilationStorageColumns },
};

export const COMPUTER_COMPONENTS_CONFIG = {
  Видеокарта: {
    id: 'id_videocard',
    componentKey: 'videocard',
    path: 'videocards',
    apiUpdate: 'videocards/computer',
    apiLocation: 'videocards/location',
  },
  Процессор: {
    id: 'id_processor',
    componentKey: 'processor',
    path: 'processors',
    apiUpdate: 'processors/computer',
    apiLocation: 'processors/location',
  },
  'Материнская плата': {
    id: 'id_mothercard',
    componentKey: 'mothercard',
    path: 'mothercards',
    apiUpdate: 'mothercards/computer',
    apiLocation: 'mothercards/location',
  },
  'Оперативная память': {
    id: 'id_memory',
    componentKey: 'memory',
    path: 'memories',
    apiUpdate: 'memories/computer',
    apiLocation: 'memories/location',
  },
  'Жесткий диск': {
    id: 'id_disk',
    componentKey: 'disk',
    path: 'disks',
    apiUpdate: 'disks/computer',
    apiLocation: 'disks/location',
  },
};

// Для составления правильных ключей к колонкам таблицым
export const componentMap = {
  videocard: 'videocards',
  processor: 'processors',
  mothercard: 'mothercards',
  memory: 'memories',
  disk: 'disks',
};

// Конвертирование типа для записи в БД и возможности возврата объекта
export const categoryMap = {
  computer: 'Компьютер',
  laptop: 'Ноутбук',
  screen: 'Монитор',
  scanner: 'МФУ',
  camera: 'Камера',
  furniture: 'Мебель',
  ventilation: 'Система вентиляции',
};

export const categoryPathMap = {
  computer: 'computers',
  laptop: 'laptops',
  screen: 'screens',
  scanner: 'scanners',
  camera: 'cameras',
  furniture: 'furniture',
  ventilation: 'ventilations',
};

// Вывод имени объекта в зависимости от его name в БД
export const objNames = new Map()
  .set('computer', (obj) => obj.name)
  .set('furniture', (obj) => `${obj.name} ${obj.model}`)
  .set('scanner', (obj) => obj.nam);

// Разделение на категории
export const objCategories = new Map()
  .set('furniture', 'Мебель')
  .set('ventilation', 'Система вентиляции');

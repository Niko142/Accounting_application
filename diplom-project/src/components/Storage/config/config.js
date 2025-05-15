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
    apiUpdate: 'update_computer_videocard',
    apiLocation: 'update_videocard',
  },
  Процессор: {
    id: 'id_processor',
    componentKey: 'processor',
    apiUpdate: 'update_computer_processor',
    apiLocation: 'update_processor',
  },
  'Материнская плата': {
    id: 'id_mothercard',
    componentKey: 'mothercard',
    apiUpdate: 'update_computer_mothercard',
    apiLocation: 'update_mothercard',
  },
  'Оперативная память': {
    id: 'id_memory',
    componentKey: 'memory',
    apiUpdate: 'update_computer_memory',
    apiLocation: 'update_memory',
  },
  'Жесткий диск': {
    id: 'id_disk',
    componentKey: 'disk',
    apiUpdate: 'update_computer_disk',
    apiLocation: 'update_disk',
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

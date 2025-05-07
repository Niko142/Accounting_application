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

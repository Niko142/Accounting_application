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
  videocard: {
    columns: videocardColumns,
  },
  processor: {
    columns: processorColumns,
  },
  mothercard: {
    columns: mothercardColumns,
  },
  memory: {
    columns: memoryColumns,
  },
  disk: {
    columns: diskColumns,
  },
};

export const OBJECT_CONFIG = {
  computer: {
    columns: computerStorageColumns,
  },
  laptop: {
    columns: laptopStorageColumns,
  },
  screen: { columns: screenStorageColumns },
  scanner: { columns: scannerStorageColumns },
  camera: { columns: cameraStorageColumns },
  furniture: { columns: furnitureStorageColumns },
  ventilation: { columns: ventilationStorageColumns },
};

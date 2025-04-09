import { useCallback } from 'react';

export const usePinningTypes = (items, setId, handlePinningItem, prefix) => {
  // Делаем общий setFunction, чтобы убрать избыточность
  const createSetFunction = useCallback(
    (key) => (e) => {
      const resetState = {
        computers: null,
        laptops: null,
        screens: null,
        scanners: null,
        cameras: null,
        furniture: null,
        ventilation: null,
      };
      setId({ ...resetState, [key]: e.key });
    },
    [setId],
  );

  const equipmentTypes = {
    Компьютер: {
      id: 'computers',
      options: items.computers,
      setFunction: createSetFunction('computers'),
      pinningFunction: () =>
        handlePinningItem(`${prefix}_computer`, 'computers'),
    },
    Ноутбук: {
      id: 'laptops',
      options: items.laptops,
      setFunction: createSetFunction('laptops'),
      pinningFunction: () => handlePinningItem(`${prefix}_laptop`, 'laptops'),
    },
    Монитор: {
      id: 'screens',
      options: items.screens,
      setFunction: createSetFunction('screens'),
      pinningFunction: () => handlePinningItem(`${prefix}_screen`, 'screens'),
    },
    МФУ: {
      id: 'scanners',
      options: items.scanners,
      setFunction: createSetFunction('scanners'),
      pinningFunction: () => handlePinningItem(`${prefix}_scanner`, 'scanners'),
    },
    Камера: {
      id: 'cameras',
      options: items.cameras,
      setFunction: createSetFunction('cameras'),
      pinningFunction: () => handlePinningItem(`${prefix}_camera`, 'cameras'),
    },
  };

  const selectedTypes = {
    Мебель: {
      id: 'furniture',
      options: items.furniture,
      setFunction: createSetFunction('furniture'),
      pinningFunction: () =>
        handlePinningItem(`${prefix}_furniture`, 'furniture'),
    },
    'Система вентиляции': {
      id: 'ventilation',
      options: items.ventilation,
      setFunction: createSetFunction('ventilation'),
      pinningFunction: () =>
        handlePinningItem(`${prefix}_ventilation`, 'ventilation'),
    },
  };

  return { equipmentTypes, selectedTypes };
};

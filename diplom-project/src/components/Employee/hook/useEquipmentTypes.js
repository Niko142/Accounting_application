import { useCallback } from 'react';

export const useEquipmentTypes = (items, setId, handlePinningItem) => {
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
      pinningFunction: () => handlePinningItem('update_computer', 'computers'),
    },
    Ноутбук: {
      id: 'laptops',
      options: items.laptops,
      setFunction: createSetFunction('laptops'),
      pinningFunction: () => handlePinningItem('update_laptop', 'laptops'),
    },
    Монитор: {
      id: 'screens',
      options: items.screens,
      setFunction: createSetFunction('screens'),
      pinningFunction: () => handlePinningItem('update_screen', 'screens'),
    },
    МФУ: {
      id: 'scanners',
      options: items.scanners,
      setFunction: createSetFunction('scanners'),
      pinningFunction: () => handlePinningItem('update_scanner', 'scanners'),
    },
    Камера: {
      id: 'cameras',
      options: items.cameras,
      setFunction: createSetFunction('cameras'),
      pinningFunction: () => handlePinningItem('update_camera', 'cameras'),
    },
  };

  const selectedTypes = {
    Мебель: {
      id: 'furniture',
      options: items.furniture,
      setFunction: createSetFunction('furniture'),
      pinningFunction: () => handlePinningItem('update_furniture', 'furniture'),
    },
    'Система вентиляции': {
      id: 'ventilation',
      options: items.ventilation,
      setFunction: createSetFunction('ventilation'),
      pinningFunction: () =>
        handlePinningItem('update_ventilation', 'ventilation'),
    },
  };

  return { equipmentTypes, selectedTypes };
};

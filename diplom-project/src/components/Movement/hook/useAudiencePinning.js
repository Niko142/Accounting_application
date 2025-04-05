import { useCallback } from 'react';

export const useAudiencePinning = (items, setId, handleAudiencePinning) => {
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
        handleAudiencePinning('location_computer', 'computers'),
    },
    Ноутбук: {
      id: 'laptops',
      options: items.laptops,
      setFunction: createSetFunction('laptops'),
      pinningFunction: () =>
        handleAudiencePinning('location_laptop', 'laptops'),
    },
    Монитор: {
      id: 'screens',
      options: items.screens,
      setFunction: createSetFunction('screens'),
      pinningFunction: () =>
        handleAudiencePinning('location_screen', 'screens'),
    },
    МФУ: {
      id: 'scanners',
      options: items.scanners,
      setFunction: createSetFunction('scanners'),
      pinningFunction: () =>
        handleAudiencePinning('location_scanner', 'scanners'),
    },
    Камера: {
      id: 'cameras',
      options: items.cameras,
      setFunction: createSetFunction('cameras'),
      pinningFunction: () =>
        handleAudiencePinning('location_camera', 'cameras'),
    },
  };

  const selectedTypes = {
    Мебель: {
      id: 'furniture',
      options: items.furniture,
      setFunction: createSetFunction('furniture'),
      pinningFunction: () =>
        handleAudiencePinning('location_furniture', 'furniture'),
    },
    'Система вентиляции': {
      id: 'ventilation',
      options: items.ventilation,
      setFunction: createSetFunction('ventilation'),
      pinningFunction: () =>
        handleAudiencePinning('location_ventilation', 'ventilation'),
    },
  };

  return { equipmentTypes, selectedTypes };
};

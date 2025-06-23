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
        handlePinningItem(`api/computers/${prefix}`, 'computers'),
    },
    Ноутбук: {
      id: 'laptops',
      options: items.laptops,
      setFunction: createSetFunction('laptops'),
      pinningFunction: () =>
        handlePinningItem(`api/laptops/${prefix}`, 'laptops'),
    },
    Монитор: {
      id: 'screens',
      options: items.screens,
      setFunction: createSetFunction('screens'),
      pinningFunction: () =>
        handlePinningItem(`api/screens/${prefix}`, 'screens'),
    },
    МФУ: {
      id: 'scanners',
      options: items.scanners,
      setFunction: createSetFunction('scanners'),
      pinningFunction: () =>
        handlePinningItem(`api/scanners/${prefix}`, 'scanners'),
    },
    Камера: {
      id: 'cameras',
      options: items.cameras,
      setFunction: createSetFunction('cameras'),
      pinningFunction: () =>
        handlePinningItem(`api/cameras/${prefix}`, 'cameras'),
    },
  };

  const selectedTypes = {
    Мебель: {
      id: 'furniture',
      options: items.furniture,
      setFunction: createSetFunction('furniture'),
      pinningFunction: () =>
        handlePinningItem(`api/furniture/${prefix}`, 'furniture'),
    },
    'Система вентиляции': {
      id: 'ventilation',
      options: items.ventilation,
      setFunction: createSetFunction('ventilation'),
      pinningFunction: () =>
        handlePinningItem(`api/ventilations/${prefix}`, 'ventilation'),
    },
  };

  return { equipmentTypes, selectedTypes };
};

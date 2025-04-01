import { React, useCallback, useMemo } from 'react';
import { instance } from 'services/api';
import DataTable from 'components/Table/Table';
import { repairColumns } from 'data/columns';

export default function RepairTable({ repair }) {
  const ReturnObject = useCallback(async (id, del, type) => {
    const endpoints = {
      Мебель: 'furniture_from_repair',
      'Система вентиляции': 'ventilation_from_repair',
      Компьютер: 'computer_from_repair',
      Ноутбук: 'laptop_from_repair',
      Монитор: 'screen_from_repair',
      МФУ: 'scanner_from_repair',
      Камера: 'camera_from_repair',
    };

    // добавить обновление состояния

    try {
      console.log('Вызов ReturnObject:', { id, del, type });
      console.log('Эндпоинт:', endpoints[type]);
      const response = await instance.patch(`/${endpoints[type]}/${id}`);
      if (response.data.message === 'Успех') {
        await instance.delete(`/delete-repair/${del}`);
      }
    } catch (error) {
      console.error('Ошибка при возврате объекта:', error);
    }
  }, []);

  const memoizedColumns = useMemo(
    () => repairColumns(ReturnObject),
    [ReturnObject],
  );

  const memoizedData = useMemo(() => repair || [], [repair]);

  return <DataTable head={memoizedColumns} mockData={memoizedData} />;
}

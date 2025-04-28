import Button from 'components/Button/Button';
import React from 'react';

// Cell для цены объекта
function getPriceColumn() {
  return ({ value }) => `${value} руб.`;
}

/*
 * Колонки для комплектующих
 * */

export const videocardColumns = (onDelete) => [
  { Header: 'ID', accessor: 'id_videocard' },
  { Header: 'Модель', accessor: 'model' },
  { Header: 'Стоимость', accessor: 'price', Cell: getPriceColumn() },
  {
    Header: 'Действия',
    accessor: 'actions',
    Cell: ({ row }) => (
      <div>
        <Button
          isDelete
          variant="destructive"
          onClick={() => onDelete(row.original.id_videocard)}
        >
          Удалить
        </Button>
      </div>
    ),
  },
];

export const processorColumns = (onDelete) => [
  { Header: 'ID', accessor: 'id_processor' },
  { Header: 'Модель', accessor: 'model' },
  { Header: 'Частота', accessor: 'rate' },
  { Header: 'Стоимость', accessor: 'price', Cell: getPriceColumn() },
  {
    Header: 'Действия',
    accessor: 'actions',
    Cell: ({ row }) => (
      <div>
        <Button
          isDelete
          variant="destructive"
          onClick={() => onDelete(row.original.id_processor)}
        >
          Удалить
        </Button>
      </div>
    ),
  },
];

export const mothercardColumns = (onDelete) => [
  { Header: 'ID', accessor: 'id_mothercard' },
  { Header: 'Модель', accessor: 'model' },
  { Header: 'Тип памяти', accessor: 'type' },
  { Header: 'Частота', accessor: 'rate' },
  { Header: 'Стоимость', accessor: 'price', Cell: getPriceColumn() },
  {
    Header: 'Действия',
    accessor: 'actions',
    Cell: ({ row }) => (
      <div>
        <Button
          isDelete
          variant="destructive"
          onClick={() => onDelete(row.original.id_mothercard)}
        >
          Удалить
        </Button>
      </div>
    ),
  },
];

export const memoryColumns = (onDelete) => [
  { Header: 'ID', accessor: 'id_memory' },
  { Header: 'Модель', accessor: 'model' },
  { Header: 'Тип памяти', accessor: 'type' },
  { Header: 'Объем', accessor: 'volume' },
  { Header: 'Стоимость', accessor: 'price', Cell: getPriceColumn() },
  {
    Header: 'Действия',
    accessor: 'actions',
    Cell: ({ row }) => (
      <div>
        <Button
          isDelete
          variant="destructive"
          onClick={() => onDelete(row.original.id_memory)}
        >
          Удалить
        </Button>
      </div>
    ),
  },
];

export const diskColumns = (onDelete) => [
  { Header: 'ID', accessor: 'id_disk' },
  { Header: 'Модель', accessor: 'model' },
  { Header: 'Объем', accessor: 'volume' },
  { Header: 'Стоимость', accessor: 'price', Cell: getPriceColumn() },
  {
    Header: 'Действия',
    accessor: 'actions',
    Cell: ({ row }) => (
      <div>
        <Button
          isDelete
          variant="destructive"
          onClick={() => onDelete(row.original.id_memory)}
        >
          Удалить
        </Button>
      </div>
    ),
  },
];

/*
 * Колонки для разных типов и категорий объектов
 * */

export const computerStorageColumns = (onDelete, onRepair, onChange) => [
  { Header: 'ID', accessor: 'id_computer' },
  { Header: 'Модель', accessor: 'name' },
  { Header: 'Видеокарта', accessor: 'videocards' },
  { Header: 'Процессор', accessor: 'processors' },
  { Header: 'Материнская плата', accessor: 'mothercards' },
  { Header: 'ОЗУ', accessor: 'memories' },
  { Header: 'Жесткий диск', accessor: 'disks' },
  {
    Header: 'Действия',
    accessor: 'actions',
    Cell: ({ row }) => (
      <div className="actions-wrapper">
        <Button
          isEdit
          variant="destructive"
          onClick={() => onDelete(row.original.id_computer)}
        >
          Изменить
        </Button>
        <Button
          isDelete
          variant="outline"
          onClick={() => onRepair(row.original.id_computer)}
        >
          Удалить
        </Button>
        <Button
          isDelete
          variant="change"
          onClick={() => onChange(row.original.id_computer)}
        >
          Удалить
        </Button>
      </div>
    ),
  },
];

// Потом добавить Cell для полей, чтобы не писать в формах ГЦ и тд

export const laptopStorageColumns = (onDelete, onRepair) => [
  { Header: 'ID', accessor: 'laptop_id' },
  { Header: 'Модель', accessor: 'model' },
  { Header: 'Система', accessor: 'systems' },
  { Header: 'Видеокарта', accessor: 'videocard' },
  { Header: 'Процессор', accessor: 'processor' },
  { Header: 'Объем ОЗУ', accessor: 'memory' },
  { Header: 'Объем диска', accessor: 'volume' },
  { Header: 'Стоимость', accessor: 'price', Cell: getPriceColumn() },
  {
    Header: 'Действия',
    accessor: 'actions',
    Cell: ({ row }) => (
      <div className="actions-wrapper">
        <Button
          isEdit
          variant="destructive"
          onClick={() => onDelete(row.original.laptop_id)}
        >
          Изменить
        </Button>
        <Button
          isDelete
          variant="outline"
          onClick={() => onRepair(row.original.laptop_id)}
        >
          Удалить
        </Button>
      </div>
    ),
  },
];

export const screenStorageColumns = (onDelete, onRepair) => [
  { Header: 'ID', accessor: 'screen_id' },
  { Header: 'Модель', accessor: 'model' },
  { Header: 'Диагональ', accessor: 'diagonal' },
  { Header: 'Частота', accessor: 'rate' },
  { Header: 'Тип матрицы', accessor: 'type' },
  { Header: 'Стоимость', accessor: 'price', Cell: getPriceColumn() },
  {
    Header: 'Действия',
    accessor: 'actions',
    Cell: ({ row }) => (
      <div className="actions-wrapper">
        <Button
          isEdit
          variant="destructive"
          onClick={() => onDelete(row.original.screen_id)}
        >
          Изменить
        </Button>
        <Button
          isDelete
          variant="outline"
          onClick={() => onRepair(row.original.screen_id)}
        >
          Удалить
        </Button>
      </div>
    ),
  },
];

export const scannerStorageColumns = (onDelete, onRepair) => [
  { Header: 'ID', accessor: 'scanner_id' },
  { Header: 'Модель', accessor: 'nam' },
  { Header: 'Цвет печати', accessor: 'color' },
  { Header: 'Скорость печати (стр/мин)', accessor: 'speed' },
  { Header: 'Стоимость', accessor: 'price', Cell: getPriceColumn() },
  {
    Header: 'Действия',
    accessor: 'actions',
    Cell: ({ row }) => (
      <div className="actions-wrapper">
        <Button
          isEdit
          variant="destructive"
          onClick={() => onDelete(row.original.scanner_id)}
        >
          Изменить
        </Button>
        <Button
          isDelete
          variant="outline"
          onClick={() => onRepair(row.original.scanner_id)}
        >
          Удалить
        </Button>
      </div>
    ),
  },
];

export const cameraStorageColumns = (onDelete, onRepair) => [
  { Header: 'ID', accessor: 'camera_id' },
  { Header: 'Модель', accessor: 'model' },
  { Header: 'Разрешение', accessor: 'resolution' },
  { Header: 'Угол наклона', accessor: 'angle' },
  { Header: 'Наличие крепления', accessor: 'bracing' },
  { Header: 'Стоимость', accessor: 'price', Cell: getPriceColumn() },
  {
    Header: 'Действия',
    accessor: 'actions',
    Cell: ({ row }) => (
      <div className="actions-wrapper">
        <Button
          isEdit
          variant="destructive"
          onClick={() => onDelete(row.original.camera_id)}
        >
          Изменить
        </Button>
        <Button
          isDelete
          variant="outline"
          onClick={() => onRepair(row.original.camera_id)}
        >
          Удалить
        </Button>
      </div>
    ),
  },
];

export const furnitureStorageColumns = (onDelete, onRepair) => [
  { Header: 'ID', accessor: 'furniture_id' },
  { Header: 'Наименование', accessor: 'name' },
  { Header: 'Модель', accessor: 'model' },
  { Header: 'Стоимость', accessor: 'price', Cell: getPriceColumn() },
  {
    Header: 'Действия',
    accessor: 'actions',
    Cell: ({ row }) => (
      <div className="actions-wrapper">
        <Button
          isEdit
          variant="destructive"
          onClick={() => onDelete(row.original.furniture_id)}
        >
          Изменить
        </Button>
        <Button
          isDelete
          variant="outline"
          onClick={() => onRepair(row.original.furniture_id)}
        >
          Удалить
        </Button>
      </div>
    ),
  },
];

export const ventilationStorageColumns = (onDelete, onRepair) => [
  { Header: 'ID', accessor: 'ventilation_id' },
  { Header: 'Модель', accessor: 'model' },
  { Header: 'Фильтр', accessor: 'filter' },
  { Header: 'Возможность обогрева', accessor: 'warm' },
  { Header: 'Стоимость', accessor: 'price', Cell: getPriceColumn() },
  {
    Header: 'Действия',
    accessor: 'actions',
    Cell: ({ row }) => (
      <div className="actions-wrapper">
        <Button
          isEdit
          variant="destructive"
          onClick={() => onDelete(row.original.ventilation_id)}
        >
          Изменить
        </Button>
        <Button
          isDelete
          variant="outline"
          onClick={() => onRepair(row.original.ventilation_id)}
        >
          Удалить
        </Button>
      </div>
    ),
  },
];

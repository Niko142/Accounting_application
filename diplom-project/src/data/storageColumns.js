import Button from 'components/Button/Button';
import React from 'react';

// Cell для цены объекта
function getPriceColumn() {
  return ({ value }) => `${value} руб.`;
}

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

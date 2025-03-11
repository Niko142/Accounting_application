import React from 'react';
import Button from 'components/Button/Button';

export const chancelleryColumns = (onEdit, onDelete) => [
  { Header: 'ID', accessor: 'id_chancellery' },
  { Header: 'Группа', accessor: 'type' },
  { Header: 'Наименование', accessor: 'name' },
  { Header: 'Ед.изм', accessor: 'unit' },
  { Header: 'Цена', accessor: 'price', Cell: ({ value }) => `${value} руб.` },
  { Header: 'Кол-во', accessor: 'amounts' },
  {
    Header: 'Сумма',
    accessor: 'itog_price',
    Cell: ({ value }) => `${value} руб.`,
  },
  {
    Header: 'Действия',
    accessor: 'actions',
    Cell: ({ row }) => (
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '5px',
        }}
      >
        <Button
          isEdit
          variant="outline"
          onClick={() => onEdit(row.original.id_chancellery)}
        >
          Изменить
        </Button>
        <Button
          isDelete
          variant="destructive"
          onClick={() => onDelete(row.original.id_chancellery)}
        >
          Удалить
        </Button>
      </div>
    ),
  },
];

export const ventilationAccColumns = () => [
  { Header: 'ID', accessor: 'ventilation_id' },
  { Header: 'Модель', accessor: 'model' },
  { Header: 'Цена', accessor: 'price', Cell: ({ value }) => `${value} руб.` },
  { Header: 'Расположение', accessor: 'location' },
  {
    Header: 'Материальное лицо',
    accessor: 'initials',
    Cell: ({ row }) => `${row.surname} ${row.name} ${row.patronymic}`,
  },
  { Header: 'Статус', accessor: 'status' },
];

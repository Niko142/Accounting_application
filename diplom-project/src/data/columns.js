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
      <>
        <Button
          variant="outline"
          onClick={() => onEdit(row.original.id_chancellery)}
        >
          Изменить
        </Button>
        <Button
          variant="destructive"
          onClick={() => onDelete(row.original.id_chancellery)}
        >
          Удалить
        </Button>
      </>
    ),
  },
];

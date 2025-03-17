import { React } from 'react';
import Button from 'components/Button/Button';
import moment from 'moment';
import 'moment/locale/ru';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faDeleteLeft } from '@fortawesome/free-solid-svg-icons';

function getPriceColumn() {
  return ({ value }) => `${value} руб.`;
}

function getPersonColumn() {
  return ({ row }) => {
    const { surname, name, patronymic } = row.original;
    return `${surname} ${name} ${patronymic}`.trim();
  };
}

function getDateColumn() {
  return ({ value }) =>
    moment(value).isValid() ? moment(value).format('LLL') : '...';
}

export const chancelleryColumns = (onEdit, onDelete) => [
  { Header: 'ID', accessor: 'id_chancellery' },
  { Header: 'Группа', accessor: 'type' },
  { Header: 'Наименование', accessor: 'name' },
  { Header: 'Ед.изм', accessor: 'unit' },
  { Header: 'Цена', accessor: 'price', Cell: getPriceColumn() },
  { Header: 'Кол-во', accessor: 'amounts' },
  {
    Header: 'Сумма',
    accessor: 'itog_price',
    Cell: getPriceColumn(),
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

// КОЛОНКИ для блока "УЧЕТ"

export const ventilationColumns = [
  { Header: 'ID', accessor: 'ventilation_id' },
  { Header: 'Модель', accessor: 'model' },
  { Header: 'Цена', accessor: 'price', Cell: getPriceColumn() },
  { Header: 'Расположение', accessor: 'location' },
  {
    Header: 'Материальное лицо',
    accessor: 'initials',
    Cell: getPersonColumn(),
  },
  { Header: 'Статус', accessor: 'status' },
];

export const furnitureColumns = [
  { Header: 'ID', accessor: 'furniture_id' },
  {
    name: 'Наименование',
    accessor: 'mark',
    Cell: ({ row }) => {
      const { name, model } = row.original;
      return `${name} ${model}`.trim();
    },
  },
  {
    Header: 'Цена',
    accessor: 'price',
    Cell: getPriceColumn(),
  },
  { Header: 'Расположение', accessor: 'location' },
  {
    Header: 'Материальное лицо',
    accessor: 'material_person',
    Cell: ({ row }) => {
      const { surname, names, patronymic } = row.original;
      return `${surname} ${names} ${patronymic}`.trim();
    },
  },
  { Header: 'Статус', accessor: 'status' },
];

export const categoryOptions = (data) => [
  { value: 'Компьютер', column: computerColumns, data: data.computer },
  { value: 'Ноутбук', column: laptopColumns, data: data.laptop },
  { value: 'Монитор', column: screenColumns, data: data.screen },
  { value: 'МФУ', column: scannerColumns, data: data.scanner },
  { value: 'Камера', column: cameraColumns, data: data.camera },
];

export const computerColumns = [
  {
    Header: 'ID',
    accessor: 'id_computer',
  },
  { Header: 'Модель', accessor: 'name' },
  { Header: 'Видеокарта', accessor: 'videocards' },
  {
    Header: 'Процессор',
    accessor: 'processors',
  },
  {
    Header: 'Плата',
    accessor: 'mothercards',
  },
  { Header: 'Опер. память', accessor: 'memories' },
  { Header: 'Диск', accessor: 'disks' },
  {
    Header: 'Расположение',
    accessor: 'location',
  },
  {
    Header: 'Материальное лицо',
    accessor: 'material_person',
    Cell: ({ row }) => {
      const { surname, names, patronymic } = row.original;
      return `${surname} ${names} ${patronymic}`.trim();
    },
  },
  {
    Header: 'Статус',
    accessor: 'status',
  },
];

export const laptopColumns = [
  {
    Header: 'ID',
    accessor: 'laptop_id',
  },
  { Header: 'Модель', accessor: 'model' },
  {
    Header: 'Система',
    accessor: 'systems',
  },
  {
    Header: 'Видеокарта',
    accessor: 'videocard',
  },
  {
    Header: 'Процессор',
    accessor: 'processor',
  },
  { name: 'Память', accessor: 'memory' },
  { name: 'Объем', accessor: 'volume' },
  {
    Header: 'Цена',
    accessor: 'price',
    Cell: getPriceColumn(),
  },
  {
    Header: 'Расположение',
    accessor: 'location',
  },
  {
    Header: 'Материальное лицо',
    accessor: 'material_person',
    Cell: getPersonColumn(),
  },
  {
    Header: 'Статус',
    accessor: 'status',
  },
];

export const screenColumns = [
  {
    Header: 'ID',
    accessor: 'screen_id',
  },
  { Header: 'Модель', accessor: 'model' },
  {
    Header: 'Диагональ',
    accessor: 'diagonal',
  },
  { Header: 'Частота', accessor: 'rate' },
  {
    Header: 'Тип матрицы',
    accessor: 'type',
  },
  {
    Header: 'Цена',
    accessor: 'price',
    Cell: getPriceColumn(),
  },
  {
    Header: 'Расположение',
    accessor: 'location',
  },
  {
    Header: 'Материальное лицо',
    accessor: 'material_person',
    Cell: getPersonColumn(),
  },
  {
    Header: 'Статус',
    accessor: 'status',
  },
];

export const scannerColumns = [
  { Header: 'ID', accessor: 'scanner_id' },
  { Header: 'Модель', accessor: 'nam' },
  { Header: 'Цвет печати', accessor: 'color' },
  { Header: 'Скорость печати', accessor: 'speed' },
  { Header: 'Цена', accessor: 'price', Cell: getPriceColumn() },
  { Header: 'Расположение', accessor: 'location' },
  {
    Header: 'Материальное лицо',
    accessor: 'material_person',
    Cell: getPersonColumn(),
  },
  { Header: 'Статус', accessor: 'status' },
];

export const cameraColumns = [
  { Header: 'ID', accessor: 'camera_id' },
  { Header: 'Модель', accessor: 'model' },
  { Header: 'Разрешение', accessor: 'resolution' },
  { Header: 'Угол обзора', accessor: 'angle' },
  { Header: 'Цена', accessor: 'price', Cell: getPriceColumn() },
  { Header: 'Расположение', accessor: 'location' },
  {
    Header: 'Материальное лицо',
    accessor: 'material_person',
    Cell: getPersonColumn(),
  },
  { Header: 'Статус', accessor: 'status' },
];

export const utilizationColumns = [
  {
    Header: 'Номер записи',
    accessor: 'id_utilization',
  },
  {
    Header: 'Дата утилизации',
    accessor: 'date',
    Cell: ({ value }) =>
      moment(value).isValid() ? moment(value).format('LLL') : '...',
  },
  {
    Header: 'Категория',
    accessor: 'category',
  },
  { Header: 'Тип', accessor: 'type' },
  {
    Header: 'Инвентарный номер',
    accessor: 'number',
  },
  {
    Header: 'Наименование средства',
    accessor: 'model',
  },
  {
    Header: 'Причина утилизации',
    accessor: 'reason',
  },
];

// Блок "Материально-ответственные лица"

export const pinningEmployeeColumns = [
  {
    Header: 'ID',
    accessor: 'id_pinning',
  },
  {
    Header: 'Категория',
    accessor: 'category',
  },
  { Header: 'Тип', accessor: 'type' },
  {
    Header: 'Наименование',
    accessor: 'unit',
  },
  {
    Header: 'Сотрудник',
    accessor: 'materialPerson',
    Cell: getPersonColumn(),
  },
  {
    Header: 'Дата закрепления',
    accessor: 'date',
    Cell: getDateColumn(),
  },
];

// переименовать
export const employeeColumns = (onMove, onDelete) => [
  { Header: 'ID', accessor: 'employee_id' },
  { Header: 'Имя', accessor: 'name' },
  { Header: 'Фамилия', accessor: 'surname' },
  { Header: 'Отчество', accessor: 'patronymic' },
  { Header: 'Email', accessor: 'email' },
  { Header: 'Номер', accessor: 'phone' },
  {
    Header: 'Действия',
    Cell: ({ row }) => (
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '5px',
        }}
      >
        <Button isMove variant="outline" onClick={() => onMove()}>
          Закрепить <FontAwesomeIcon size="lg" icon={faLock} />
        </Button>
        <Button
          isDelete
          variant="destructive"
          onClick={() => onDelete(row.original.employee_id)}
        >
          Удалить <FontAwesomeIcon size="lg" icon={faDeleteLeft} />
        </Button>
      </div>
    ),
  },
];

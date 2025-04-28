import { React } from 'react';
import Button from 'components/Button/Button';
import moment from 'moment';
import 'moment/locale/ru';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faDeleteLeft } from '@fortawesome/free-solid-svg-icons';

// Cell для цены объекта
function getPriceColumn() {
  return ({ value }) => `${value} руб.`;
}

// Cell для описания материально-ответственного лица
function getPersonColumn() {
  return ({ row }) => {
    const { surname, name, patronymic } = row.original;
    return `${surname} ${name} ${patronymic}`.trim();
  };
}

// Cell для даты
function getDateColumn() {
  return ({ value }) =>
    moment(value).isValid() ? moment(value).format('LLL') : '...';
}

/**
 * Блок "Канцелярия"
 * */

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
      <div className="actions-wrapper">
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

/**
 * Блок "Учет"
 * */

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
    Header: 'Описание',
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
  { Header: 'Память', accessor: 'memory' },
  { Header: 'Объем', accessor: 'volume' },
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

/**
 * Блок "Материально-ответственные лица"
 * */

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
      <div className="actions-wrapper">
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

/**
 * Блок "Склад"
 * */

export const changeDetailsColumns = [
  { Header: 'Модель компьютера', accessor: 'name' },
  { Header: 'Тип комплектующего', accessor: 'type' },
  { Header: 'До замены:', accessor: 'start' },
  { Header: 'После замены:', accessor: 'end' },
  { Header: 'Дата изменения', accessor: 'date' },
];

/**
 * Блок "Перемещение"
 * */

export const audienceColumns = [
  { Header: 'Id', accessor: 'cabinet_id' },
  { Header: 'Номер аудитории', accessor: 'number' },
  { Header: 'Описание', accessor: 'description' },
];

export const historyColumns = [
  { Header: 'ID', accessor: 'id_pinning' },
  { Header: 'Категория', accessor: 'category' },
  { Header: 'Тип', accessor: 'type' },
  { Header: 'Причина', accessor: 'reason' },
  { Header: 'Наименование', accessor: 'unit' },
  { Header: 'Откуда', accessor: 'start_location' },
  { Header: 'Куда', accessor: 'end_location' },
  { Header: 'Дата закрепления', accessor: 'date', Cell: getDateColumn() },
];

export const repairColumns = (handle) => [
  { Header: 'ID', accessor: 'id_repair' },
  { Header: 'Модель', accessor: 'model' },
  { Header: 'Дата отправки', accessor: 'date', Cell: getDateColumn() },
  { Header: 'Дата окончания', accessor: 'end_date', Cell: getDateColumn() },
  { Header: 'Причина отправки в ремонт', accessor: 'description' },
  {
    Header: 'Действия',
    accessor: 'actions',
    Cell: ({ row }) => {
      const { original } = row;
      const endDate = new Date(Date.parse(original.end_date));
      const currentDate = new Date();

      return (
        <Button
          isMove={endDate <= currentDate}
          disabled={endDate > currentDate}
          onClick={() => {
            handle(original.number, original.id_repair, original.type);
          }}
        >
          Вернуть из ремонта
        </Button>
      );
    },
  },
];

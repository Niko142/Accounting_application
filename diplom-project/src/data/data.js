export const categories = [
  { value: '', name: 'Выберите...' },
  { value: '1', name: 'Компьютер' },
  { value: '2', name: 'Ноутбук' },
  { value: '3', name: 'Монитор' },
  { value: '4', name: 'МФУ' },
  { value: '5', name: 'Камера' },
];

export const components = [
  { value: '', name: 'Выберите нужную категорию...' },
  { value: '1', name: 'Видеокарта' },
  { value: '2', name: 'Процессор' },
  { value: '3', name: 'Материнская плата' },
  { value: '4', name: 'Оперативная память' },
  { value: '5', name: 'Жесткий диск' },
];

export const product_groups = [
  { value: 'Бумажно-беловые товары', name: 'Бумажно-беловые товары' },
  { value: 'Письменные принадлежности', name: 'Письменные принадлежности' },
  { value: 'Предметы хранения', name: 'Предметы хранения' },
  { value: 'Принадлежности для офиса', name: 'Принадлежности для офиса' },
  { value: 'Расходные материалы', name: 'Расходные материалы' },
];

export const category = [
  { value: 'Оргтехника', label: 'Оргтехника' },
  { value: 'Мебель', label: 'Мебель' },
  {
    value: 'Система вентиляции',
    label: 'Система вентиляции/кондиционирования',
  },
];

export const type = [
  { value: 'Компьютер', label: 'Компьютер' },
  { value: 'Ноутбук', label: 'Ноутбук' },
  { value: 'Монитор', label: 'Монитор' },
  { value: 'МФУ', label: 'МФУ' },
  { value: 'Камера', label: 'Камера' },
];

export const reason = [
  { value: 'Введение в эксплуатацию', label: 'Введение в эксплуатацию' },
  {
    value: 'Смена рабочего пространства',
    label: 'Смена рабочего пространства',
  },
  {
    value: 'Неполадки',
    label: 'Неполадки, связанные с материальным средством',
  },
  { value: 'Возвращение на склад', label: 'Возвращение на склад' },
  { value: 'Утилизация', label: 'Утилизация' },
];

export const categoryOptions = (data) => [
  { value: 'Компьютер', column: computer_column, data: data.computer },
  { value: 'Ноутбук', column: laptop_column, data: data.laptop },
  { value: 'Монитор', column: screen_column, data: data.screen },
  { value: 'МФУ', column: scanner_column, data: data.scanner },
  { value: 'Камера', column: camera_column, data: data.camera },
];

// Эти потом можно убрать
export const ventilation_column = [
  {
    name: 'Номер',
    selector: (row) => row.ventilation_id,
    sortable: true,
    grow: 0.4,
  },
  { name: 'Модель', selector: (row) => row.model, sortable: true, grow: 1 },
  {
    name: 'Цена',
    selector: (row) => row.price + ' руб.',
    sortable: true,
    grow: 0.5,
  },
  {
    name: 'Расположение',
    selector: (row) => row.location,
    sortable: true,
    grow: 0.5,
  },
  {
    name: 'Материальное лицо',
    selector: (row) => row.surname + ' ' + row.name + ' ' + row.patronymic,
    sortable: true,
  },
  { name: 'Статус', selector: (row) => row.status, sortable: true },
];

export const furniture_column = [
  { name: 'Номер', selector: (row) => row.furniture_id, sortable: true },
  {
    name: 'Наименование',
    selector: (row) => row.name + ' ' + row.model,
    sortable: true,
    grow: 1.5,
  },
  { name: 'Цена', selector: (row) => row.price + ' руб.', sortable: true },
  { name: 'Расположение', selector: (row) => row.location, sortable: true },
  {
    name: 'Материальное лицо',
    selector: (row) => row.surname + ' ' + row.names + ' ' + row.patronymic,
    sortable: true,
  },
  { name: 'Статус', selector: (row) => row.status, sortable: true },
];

export const computer_column = [
  {
    name: 'Номер',
    selector: (row) => row.id_computer,
    sortable: true,
    grow: 0.2,
  },
  { name: 'Модель', selector: (row) => row.name, sortable: true },
  { name: 'Видеокарта', selector: (row) => row.videocards, sortable: true },
  {
    name: 'Процессор',
    selector: (row) => row.processors,
    sortable: true,
    grow: 0.8,
  },
  {
    name: 'Плата',
    selector: (row) => row.mothercards,
    sortable: true,
    grow: 0.9,
  },
  { name: 'Опер. память', selector: (row) => row.memories, sortable: true },
  { name: 'Диск', selector: (row) => row.disks, sortable: true, grow: 0.85 },
  {
    name: 'Расположение',
    selector: (row) => row.location,
    sortable: true,
    grow: 0.65,
  },
  {
    name: 'Материальное лицо',
    selector: (row) => row.surname + ' ' + row.names + ' ' + row.patronymic,
    sortable: true,
  },
  { name: 'Статус', selector: (row) => row.status, sortable: true, grow: 0.7 },
];

export const laptop_column = [
  {
    name: 'Номер',
    selector: (row) => row.laptop_id,
    sortable: true,
    grow: 0.2,
  },
  { name: 'Модель', selector: (row) => row.model, sortable: true },
  {
    name: 'Система',
    selector: (row) => row.systems,
    sortable: true,
    grow: 0.4,
  },
  {
    name: 'Видеокарта',
    selector: (row) => row.videocard,
    sortable: true,
    grow: 0.6,
  },
  {
    name: 'Процессор',
    selector: (row) => row.processor,
    sortable: true,
    grow: 0.75,
  },
  { name: 'Память', selector: (row) => row.memory, sortable: true, grow: 0.2 },
  { name: 'Объем', selector: (row) => row.volume, sortable: true, grow: 0.2 },
  {
    name: 'Цена',
    selector: (row) => row.price + ' руб.',
    sortable: true,
    grow: 0.2,
  },
  {
    name: 'Расположение',
    selector: (row) => row.location,
    sortable: true,
    grow: 0.5,
  },
  {
    name: 'Материальное лицо',
    selector: (row) => row.surname + ' ' + row.name + ' ' + row.patronymic,
    sortable: true,
    grow: 0.85,
  },
  { name: 'Статус', selector: (row) => row.status, sortable: true, grow: 0.6 },
];

export const screen_column = [
  {
    name: 'Номер',
    selector: (row) => row.screen_id,
    sortable: true,
    grow: 0.2,
  },
  { name: 'Модель', selector: (row) => row.model, sortable: true },
  {
    name: 'Диагональ',
    selector: (row) => row.diagonal,
    sortable: true,
    grow: 0.4,
  },
  { name: 'Частота', selector: (row) => row.rate, sortable: true, grow: 0.3 },
  {
    name: 'Тип матрицы',
    selector: (row) => row.type,
    sortable: true,
    grow: 0.33,
  },
  {
    name: 'Цена',
    selector: (row) => row.price + ' руб.',
    sortable: true,
    grow: 0.3,
  },
  {
    name: 'Расположение',
    selector: (row) => row.location,
    sortable: true,
    grow: 0.5,
  },
  {
    name: 'Материальное лицо',
    selector: (row) => row.surname + ' ' + row.name + ' ' + row.patronymic,
    sortable: true,
    grow: 0.8,
  },
  { name: 'Статус', selector: (row) => row.status, sortable: true, grow: 0.6 },
];

export const scanner_column = [
  { name: 'Номер', selector: (row) => row.scanner_id, sortable: true },
  { name: 'Модель', selector: (row) => row.nam, sortable: true, grow: 1.5 },
  { name: 'Цвет печати', selector: (row) => row.color, sortable: true },
  { name: 'Скорость печати', selector: (row) => row.speed, sortable: true },
  { name: 'Цена', selector: (row) => row.price + ' руб.', sortable: true },
  { name: 'Расположение', selector: (row) => row.location, sortable: true },
  {
    name: 'Материальное лицо',
    selector: (row) => row.surname + ' ' + row.name + ' ' + row.patronymic,
    sortable: true,
    grow: 1.5,
  },
  { name: 'Статус', selector: (row) => row.status, sortable: true },
];

export const camera_column = [
  { name: 'Номер', selector: (row) => row.camera_id, sortable: true },
  { name: 'Модель', selector: (row) => row.model, sortable: true, grow: 1.3 },
  { name: 'Разрешение', selector: (row) => row.resolution, sortable: true },
  { name: 'Угол обзора', selector: (row) => row.angle, sortable: true },
  { name: 'Цена', selector: (row) => row.price + ' руб.', sortable: true },
  { name: 'Расположение', selector: (row) => row.location, sortable: true },
  {
    name: 'Материальное лицо',
    selector: (row) => row.surname + ' ' + row.name + ' ' + row.patronymic,
    sortable: true,
    grow: 1.5,
  },
  { name: 'Статус', selector: (row) => row.status, sortable: true },
];

export const change_column = [
  {
    name: 'Модель компьютера',
    selector: (row) => row.name,
    sortable: true,
    grow: 1,
  },
  {
    name: 'Тип запчасти',
    selector: (row) => row.type,
    sortable: true,
    grow: 0.4,
  },
  { name: 'До замены', selector: (row) => row.start, sortable: true, grow: 1 },
  { name: 'После замены', selector: (row) => row.end, sortable: true, grow: 1 },
  {
    name: 'Дата замены',
    selector: (row) => row.date,
    sortable: true,
    grow: 0.5,
  },
];

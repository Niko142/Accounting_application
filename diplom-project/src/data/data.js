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

export const repairCategories = [
  'computer',
  'laptop',
  'screen',
  'scanner',
  'camera',
  'furniture',
  'ventilation',
];

export const enumCategories = [
  'Все',
  'Компьютер',
  'Ноутбук',
  'Монитор',
  'МФУ',
  'Камера',
  'Мебель',
  'Система вентиляции',
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

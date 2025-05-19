// Убрать потом лишние данные
import { faCouch, faComputer, faFan } from '@fortawesome/free-solid-svg-icons';

export const categories = [
  { value: '', label: '. . .' },
  { value: 'computer', label: 'Компьютер' },
  { value: 'laptop', label: 'Ноутбук' },
  { value: 'screen', label: 'Монитор' },
  { value: 'scanner', label: 'МФУ' },
  { value: 'camera', label: 'Камера' },
];

export const components = [
  { value: '', label: 'Выберите нужную категорию...' },
  { value: 'Видеокарта', label: 'Видеокарта' },
  { value: 'Процессор', label: 'Процессор' },
  { value: 'Материнка', label: 'Материнская плата' },
  { value: 'ОЗУ', label: 'Оперативная память' },
  { value: 'Диск', label: 'Жесткий диск' },
];

export const componentCategories = [
  { value: 'videocard', label: 'Видеокарта' },
  { value: 'processor', label: 'Процессор' },
  { value: 'mothercard', label: 'Материнская плата' },
  { value: 'memory', label: 'Оперативная память' },
  { value: 'disk', label: 'Жесткий диск' },
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

export const objectCategories = [
  { value: 'technic', label: 'Оргтехника', image: faComputer },
  { value: 'furniture', label: 'Мебель', image: faCouch },
  { value: 'ventilation', label: 'Сплит-системы', image: faFan },
];

export const computerPartsCategories = [
  { value: 'videocard', label: 'Видеокарта' },
  { value: 'processor', label: 'Процессор' },
  { value: 'mothercard', label: 'Материнская плата' },
  { value: 'memory', label: 'Оперативная память' },
  { value: 'disk', label: 'Жесткий диск' },
];

export const matrixOptions = [
  { value: '', label: '. . .' },
  { value: 'TN', label: 'TN' },
  { value: 'VA', label: 'VA' },
  { value: 'IPS', label: 'IPS' },
];

export const filterOptions = [
  { value: '', label: '. . .' },
  { value: 'Базовый', label: 'Базовый' },
  { value: 'Угольный', label: 'Угольный' },
  { value: 'Полимерный', label: 'Полимерный' },
  { value: 'С ионами серебра', label: 'С ионами серебра' },
  { value: 'Фотокаталитический', label: 'Фотокаталитический' },
  { value: 'Плазменный', label: 'Плазменный' },
];

export const warmOptions = [
  { value: '', label: '. . .' },
  { value: 'Да', label: 'Да' },
  { value: 'Нет', label: 'Нет' },
];

export const colorOptions = [
  { value: '', label: '. . .' },
  { value: 'Черно-белая', label: 'Черно-белая' },
  { value: 'Цветная', label: 'Цветная' },
];

export const resolutionOptions = [
  { value: '', label: '. . .' },
  { value: '640x480', label: '640x480 (VGA)' },
  { value: '1280x720', label: '1280x720 (HD)' },
  { value: '1920x1080', label: '1920x1080 (Full HD)' },
  { value: '2048x1080', label: '2048x1080 (2K DCI)' },
  { value: '2560x1440', label: '2560x1440 (2K QHD)' },
  { value: '3840x2160', label: '3840x2160 (4K UHD)' },
];

export const bracingOptions = [
  { value: '', label: '. . .' },
  { value: 'Отсутствует', label: 'Отсутствует' },
  { value: 'Присутствует', label: 'Присутствует' },
];

export const systemOptions = [
  { value: '', label: '. . .' },
  { value: 'Windows XP', label: 'Windows XP' },
  { value: 'Windows 7', label: 'Windows 7' },
  { value: 'Windows 8', label: 'Windows 8' },
  { value: 'Windows 10', label: 'Windows 10' },
  { value: 'Windows 11', label: 'Windows 11' },
  { value: 'Linux', label: 'Linux' },
];

export const memoryOptions = [
  { value: '', label: 'Выбери объем памяти' },
  { value: '2', label: '2 ГБ' },
  { value: '4', label: '4 ГБ' },
  { value: '8', label: '8 ГБ' },
  { value: '16', label: '16 ГБ' },
  { value: '32', label: '32 ГБ' },
  { value: '64', label: '64 ГБ' },
  { value: '128', label: '128 ГБ' },
  { value: 'custom', label: 'Другое ...' },
];

export const ddrOptions = [
  { value: 'DDR2', label: 'DDR2' },
  { value: 'DDR3', label: 'DDR3' },
  { value: 'DDR4', label: 'DDR4' },
  { value: 'DDR5', label: 'DDR5' },
];

export const reasonUtilOptions = [
  { value: '', label: '. . .' },
  {
    value: 'Замена на более новый объект',
    label: 'Замена на более новый объект',
  },
  { value: 'Наличие дефекта/ов', label: 'Наличие дефекта/ов' },
  { value: 'Естественный износ', label: 'Естественный износ' },
  { value: 'Срок эксплуатации истек', label: 'Срок эксплуатации истек' },
  { value: 'Выход из строя', label: 'Выход из строя' },
  { value: 'Не подлежит ремонту', label: 'Не подлежит ремонту' },
];

export default function Validation(values) {
  let error = {}; //Пароль

  if (values.password === '') {
    error.password = 'Пароль не должен быть пустым';
  } else {
    error.password = '';
  } //Логин

  if (values.username === '') {
    error.username = 'Пользователь не должен быть пустым';
  } else {
    error.username = '';
  } //Имя

  if (values.name === '' || values.name === null) {
    error.name = 'Имя не должно быть пустым';
  } else {
    error.name = '';
  } //Фамилия

  if (values.surname === '') {
    error.surname = 'Фамилия не должна быть пустой';
  } else {
    error.surname = '';
  } //Отчество

  if (values.patronymic === '') {
    error.patronymic = 'Отчество не должно бьть пустым';
  } else {
    error.patronymic = '';
  } //Email

  function isValid(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  if (!isValid(values.email)) {
    error.email = 'Неправильный формат email';
  } else {
    error.email = '';
  }

  if (values.email === '') {
    error.email = 'Email не должен быть пустым';
  } //Наименование модели

  if (values.model === '') {
    error.model = 'Наименование модели не должно быть пустым';
  } else {
    error.model = '';
  } //Цена

  function isNumber(price) {
    return /^\d+$/.test(price);
  }

  if (values.price === '') {
    error.price = 'Значение цены не должно быть пустым';
  } else if (!isNumber(values.price)) {
    error.price = 'Цена должна содержать только целочисленные символы';
  } else {
    error.price = '';
  } //Разрешение

  function isResolution(resolution) {
    return /(\d{3,4})x(\d{3,4})/.test(resolution);
  }

  if (values.resolution === '') {
    error.resolution = 'Разрешение камеры не должно быть пустым';
  } else if (!isResolution(values.resolution)) {
    error.resolution = 'Неправильный формат ввода значения';
  } else {
    error.resolution = '';
  } //Угол обзора

  if (values.angle === '') {
    error.angle = 'Угол обзора не должно быть пустым';
  } else if (!isNumber(values.angle)) {
    error.angle = 'Угол должен содержать только целочисленные символы';
  } else {
    error.angle = '';
  } //Разрешение монитора

  function isRate(value) {
    return /^\d+\sГЦ$/.test(value);
  }

  if (values.rate === '') {
    error.rate = 'Разрешение экрана не должно быть пустым';
  } else if (!isRate(values.rate)) {
    error.rate = 'Неправильный формат ввода значения';
  } else {
    error.rate = '';
  } //Диагональ

  function isDiagonal(value) {
    return /^(\d{2}(\.\d{0,2})?|\.?\d{1,2})$/.test(value);
  }

  if (values.diagonal === '') {
    error.diagonal = 'Значение диагонали не должно быть пустым';
  } else if (!isDiagonal(values.diagonal)) {
    error.diagonal = 'Неверный формат ввода';
  } else {
    error.diagonal = '';
  } //Скорость печати

  if (values.speed === '') {
    error.speed = 'Значение скорости печати не должно быть пустым';
  } else if (!isNumber(values.speed)) {
    error.speed =
      'Скорость печати должна содержать только целочисленные символы';
  } else {
    error.speed = '';
  }

  function isVolume(value) {
    return /^\d+\sГБ$/.test(value);
  } //ОЗУ

  if (values.memory === '') {
    error.memory = 'Поле ОЗУ не должно быть пустым';
  } else if (!isVolume(values.memory)) {
    error.memory = 'Неправильный формат ввода значения';
  } else {
    error.memory = '';
  } //Объем жесткого диска

  if (values.volume === '') {
    error.volume = 'Значение объема не должен быть пустым';
  } else if (!isVolume(values.volume)) {
    error.volume = 'Неправильный формат ввода значения';
  } else {
    error.volume = '';
  }

  if (values.videocard === '') {
    error.videocard = "Поле 'Видеокарта' не должно быть пустым";
  } else {
    error.videocard = '';
  }

  if (values.processor === '') {
    error.processor = "Поле 'Процессор' не должно быть пустым";
  } else {
    error.processor = '';
  }

  return error;
}

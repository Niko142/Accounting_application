import React, { useEffect, useRef, useState } from 'react';
import instance from 'services/api';
import { FILE_PATH } from 'constants/path';
import { categories } from 'data/data';
import { read, utils } from 'xlsx';
import Button from 'components/Button/Button';
import { toast } from 'react-toastify';

const ExcelParser = () => {
  const [status, setStatus] = useState(null); // Статус текущих ситуаций
  const [error, setError] = useState(null); // Сообщения об ошибках
  const [objData, setObjData] = useState([]); // Загруженные записи из файла
  const [category, setCategory] = useState(''); // Выбранная категория
  const [isUploading, setIsUploading] = useState(false); // Статус загрузки данных на сервер

  const fileRef = useRef(null);

  // Шаблоны заголовков для разных категорий объектов
  const templates = {
    // С компьютером пока не решил как поступить
    computer: [
      'name',
      'videocard',
      'processor',
      'mothercard',
      'memory',
      'disk',
    ],
    laptop: [
      'model',
      'systems',
      'videocard',
      'processor',
      'memory',
      'volume',
      'price',
    ],
    screen: ['model', 'diagonal', 'rate', 'type', 'price'],
    scanner: ['name', 'color', 'speed', 'price'],
    camera: ['model', 'resolution', 'angle', 'bracing', 'price'],
    furniture: ['name', 'model', 'price'],
    ventilation: ['model', 'filter', 'warm', 'price'],
  };

  // Функция для сброса состояний
  const resetStates = () => {
    setStatus(null);
    setError(null);
    setObjData([]);
  };

  // Очистка файла для повторного добавления
  const resetFileData = () => {
    if (fileRef.current) {
      fileRef.current.value = '';
    }
  };

  // Сброс данных при обновлении категории
  useEffect(() => {
    resetStates();
    resetFileData();
  }, [category]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    resetStates();

    // Если файл не выбран
    if (!file) {
      return;
    }

    // Если категория не была выбрана
    if (!category) {
      setError('Категория не выбрана');
      return;
    }

    const reader = new FileReader(); // Формируем экземпляр для чтения файла
    setStatus('Загрузка ...');

    // При загрузке файла
    reader.onload = (e) => {
      try {
        const workbook = read(e.target.result, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = utils.sheet_to_json(worksheet);
        const headers = Object.keys(jsonData[0] || {}).map((header) =>
          header.toLowerCase(),
        ); // Заголовки загруженного файла

        const requiredHeaders = templates[category] || []; // Заголовки шаблона
        const missing = requiredHeaders.filter((h) => !headers.includes(h));

        if (jsonData.length === 0) {
          setError('Загруженный файл является пустым!!!');
          return;
        }

        if (missing.length > 0) {
          setStatus(null);
          setError('Ошибка: формат не соответствует выбранной категории');
          return;
        }
        setStatus(`Обнаружено записей: ${jsonData.length}`);

        // Добавление записей в state с приведением заголовка в нижний регистр
        setObjData(
          jsonData.map((item) =>
            Object.fromEntries(
              Object.entries(item).map(([key, value]) => [
                key.toLowerCase(),
                value,
              ]),
            ),
          ),
        );
      } catch (err) {
        setStatus(null);
        setError('Ошибка при чтении данных из выбранного файла');
        console.error('Ошибка при чтении файла', err);
      }
    };

    // При отмене запроса
    reader.onabort = () => {
      setStatus(null);
      setError('Операция чтения файла была прервана');
    };

    // При возникновении ошибки
    reader.onerror = () => {
      setStatus(null);
      setError('Возникла ошибка при чтении файла');
      console.log('Ошибка: ', reader.error);
    };

    reader.readAsArrayBuffer(file);
  };

  const handleSubmit = async () => {
    setIsUploading(true);
    try {
      // Набор отправляемых данных
      const payload = {
        category: category,
        data: objData,
      };

      const response = await instance.post(
        `${FILE_PATH}/excel-import`,
        payload,
      );

      setStatus(
        `Успешно отправлено ${response.data.length || objData.length} записей`,
      );

      toast.success('Успешное добавление записей из файла');

      // Очистка данных формы с некоторой задержкой
      setTimeout(() => {
        resetStates();
        resetFileData();
        setCategory(null);
      }, 200);
    } catch (err) {
      toast.error('Ошибка при отправке данных на сервер');
      console.error('Ошибка отправки:', err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="excel-import">
      <h3>Импорт записей из накладной</h3>
      <select
        className="main__input"
        name="category-obj"
        onChange={(e) => setCategory(e.target.value)}
        defaultValue=""
      >
        <option value="" disabled>
          Выберите категорию...
        </option>
        {categories.map((item, ind) => (
          <option key={ind} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
      <input
        type="file"
        className="input-file"
        accept=".xlsx,.xls"
        ref={fileRef}
        onChange={handleFileUpload}
      />
      {/* Валидация статусов и ошибок */}
      {status && <div className="validation success">{status}</div>}
      {error && <div className="validation error">{error}</div>}

      {objData.length > 0 && (
        <div className="success-actions">
          {/* Вывод части записей из загруженного файла*/}
          <ol>
            <h4>Информация о первых 5 записях:</h4>
            {objData.slice(0, 5).map((item, ind) => (
              <li key={ind}>{item.model || item.name}</li>
            ))}
          </ol>

          <Button
            onClick={handleSubmit}
            disabled={isUploading}
            isActive={!isUploading}
            className="btn btn-primary"
          >
            {isUploading ? 'Отправка...' : 'Отправить данные на сервер'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ExcelParser;

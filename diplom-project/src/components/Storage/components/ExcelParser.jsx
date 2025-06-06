import { categories } from 'data/data';
import React, { useState } from 'react';
import { read, utils } from 'xlsx';

const ExcelParser = () => {
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [objData, setObjData] = useState([]);
  const [category, setCategory] = useState(null);

  // Шаблоны для разных категорий объектов
  const templates = {
    computer: [''], // Вот тут подумать (пока не готов)
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

  const handleFileUpload = (e) => {
    if (category) {
      const file = e.target.files[0];
      const reader = new FileReader();

      setStatus('Загрузка ...');

      reader.onload = (e) => {
        try {
          const workbook = read(e.target.result, { type: 'buffer' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = utils.sheet_to_json(worksheet);

          const headers = Object.keys(jsonData[0] || {}); // Заголовки
          const requiredHeaders = templates[category] || []; // Заголовки согласно шаблону

          const missing = requiredHeaders.filter((h) => !headers.includes(h));
          if (missing.length > 0) {
            setStatus('');
            setError('Ошибка: формат не соответствует выбранной категории');
            return;
          }

          setStatus(`Обнаружено записей: ${jsonData.length}`);
          setObjData(jsonData);
        } catch (err) {
          setError('Ошибка при чтении данных из выбранного файла');
          console.error('Ошибка при чтении файла', err);
        }
      };

      reader.onerror = () => {
        setStatus('Неудачное считывание данных ...');
        console.log(reader.error);
      };

      reader.readAsArrayBuffer(file);
    } else {
      setError('Категория не выбрана');
    }
  };

  return (
    <div className="excel-import">
      <h3>Импорт Excel</h3>
      <select
        className="main__input"
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="" disabled>
          Выберите категорию
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
        onChange={handleFileUpload}
      />

      {/* Валидация статусов и ошибок */}
      {status && <div className="validation success">{status}</div>}
      {error && <div className="validation error">{error}</div>}

      {/* Вывод названий моделей */}
      <ul>
        {objData.map((item, ind) => (
          <li key={ind}>{item.model}</li>
        ))}
      </ul>
    </div>
  );
};

export default ExcelParser;

import React, { useState } from 'react';
import { read, utils } from 'xlsx';

const ExcelParser = () => {
  const [status, setStatus] = useState('');
  const [objData, setObjData] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    setStatus('Загрузка ...');

    reader.onload = (e) => {
      try {
        const workbook = read(e.target.result, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = utils.sheet_to_json(worksheet);

        // console.log(jsonData);
        setStatus(`Обнаружено записей: ${jsonData.length}`);
        setObjData(jsonData);
      } catch (err) {
        setStatus('Ошибка при чтении данных из выбранного файла');
        console.error('Ошибка при чтении файла', err);
      }
    };

    reader.onerror = () => {
      setStatus('Неудачное считывание данных ...');
      console.log(reader.error);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="excel-import">
      <h3>Импорт Excel</h3>
      <input
        type="file"
        className="input-file"
        accept=".xlsx,.xls"
        onChange={handleFileUpload}
      />
      {status}
      <ul>
        {objData.map((item, ind) => (
          <li key={ind}>{item.model}</li>
        ))}
      </ul>
    </div>
  );
};

export default ExcelParser;

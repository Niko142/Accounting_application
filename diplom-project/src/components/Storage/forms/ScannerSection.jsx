import { React, useState } from 'react';
import Button from 'components/Button/Button';
import Axios from 'axios';
import Success from '../Success';
import Validation from 'components/FormAuthorization/Validation';

export default function ScannerSelection() {
  const [scanner, setScanner] = useState({
    model: '',
    color: '',
    speed: '',
    price: '',
  });
  const [errors, setErrors] = useState({});
  const [addStatus, setAddStatus] = useState('');

  const handleScannerChange = (event) => {
    setScanner((scanner) => ({
      ...scanner,
      [event.target.name]: event.target.value,
    }));
    console.log(scanner);
  };

  const FormSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(scanner));

    if (errors.model === '' && errors.speed === '' && errors.price === '') {
      Axios.post('http://localhost:3001/scanner', {
        nam: scanner.model,
        color: scanner.color,
        speed: scanner.speed,
        price: scanner.price,
        location: 'Склад',
        status: 'В резерве',
      }).then((response) => {
        console.log(response);
        if (response.data.message === 'Успешное добавление') {
          console.log(response);
          setAddStatus(true);
        } else {
          setAddStatus(false);
        }
      });
    } else {
      setAddStatus(false);
    }
  };

  return (
    <form style={{ width: '420px' }} onSubmit={FormSubmit}>
      <label htmlFor="name" className="add">
        Наименование:
      </label>
      <input
        type="text"
        id="form-input"
        name="model"
        value={scanner.model}
        style={{ borderColor: errors.model ? 'red' : null }}
        onChange={handleScannerChange}
      />

      {errors.model && <span className="err">{errors.model}</span>}

      <label htmlFor="color" className="add">
        Цвет печати:
      </label>
      <select
        id="form-input"
        name="color"
        value={scanner.color}
        onChange={handleScannerChange}
      >
        <option>...</option>
        <option>Черно-белая</option>
        <option>Цветная</option>
        <option>Оба</option>
      </select>
      <label htmlFor="speed" className="add">
        Скорость печати (стр/мин):
      </label>
      <input
        type="text"
        name="speed"
        id="form-input"
        value={scanner.speed}
        style={{ borderColor: errors.speed ? 'red' : null }}
        onChange={handleScannerChange}
      />

      {errors.speed && <span className="err">{errors.speed}</span>}

      <label htmlFor="price" className="add">
        Цена:
      </label>
      <input
        type="text"
        id="form-input"
        name="price"
        value={scanner.price}
        style={{ borderColor: errors.price ? 'red' : null }}
        onChange={handleScannerChange}
      />

      {errors.price && <span className="err">{errors.price}</span>}

      <Button isActive style={{ marginLeft: '9rem' }} type="submit">
        Добавить
      </Button>
      {addStatus === true && <Success>Успешное добавление МФУ</Success>}
    </form>
  );
}

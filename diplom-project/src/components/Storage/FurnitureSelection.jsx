import { React, useState } from 'react';
import Button from 'components/Button/Button';
import './Furniture.css';
import Axios from 'axios';
import Success from './Success';
import Validation from 'components/FormAuthorization/Validation';

export default function FurnitureSelection() {
  const [furniture, setFurniture] = useState({
    name: '',
    model: '',
    price: '',
  });
  const [errors, setErrors] = useState({});
  const [addStatus, setAddStatus] = useState('');

  const handleFurnitureChange = (event) => {
    setFurniture((furniture) => ({
      ...furniture,
      [event.target.name]: event.target.value,
    }));
    console.log(furniture);
  };

  const FormSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(furniture));
    if (errors.name === '' && errors.model === '' && errors.price === '') {
      Axios.post('http://localhost:3001/furniture', {
        name: furniture.name,
        model: furniture.model,
        price: furniture.price,
        location: 'Склад',
        status: 'Находится в резерве',
      }).then((response) => {
        console.log(response);
        if (response.data.message === 'Успешное добавление') {
          console.log(response);
          setAddStatus(true);
        } else {
          setAddStatus(false);
        }
      });
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
        name="name"
        value={furniture.name}
        style={{ borderColor: errors.name ? 'red' : null }}
        onChange={handleFurnitureChange}
      />
      {errors.name && <span className="err">{errors.name}</span>}
      <label htmlFor="model" className="add">
        Модель:
      </label>
      <input
        type="text"
        id="form-input"
        name="model"
        value={furniture.model}
        style={{ borderColor: errors.model ? 'red' : null }}
        onChange={handleFurnitureChange}
      />
      {errors.model && <span className="err">{errors.model}</span>}
      <label htmlFor="price" className="add">
        Цена:
      </label>
      <input
        type="text"
        id="form-input"
        name="price"
        value={furniture.price}
        style={{ borderColor: errors.price ? 'red' : null }}
        onChange={handleFurnitureChange}
      />
      {errors.price && <span className="err">{errors.price}</span>}
      <Button isActive style={{ marginLeft: '9rem' }} type="submit">
        Добавить
      </Button>
      {addStatus === true && <Success>Успешное добавление записи</Success>}
    </form>
  );
}

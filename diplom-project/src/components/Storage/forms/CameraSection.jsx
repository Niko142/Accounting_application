import { React, useState } from 'react';
import Success from '../Success';
import Button from 'components/Button/Button';
import Fail from '../Fail';
import Axios from 'axios';
import Validation from 'components/FormAuthorization/Validation';

export default function CameraSection() {
  const [camera, setCamera] = useState({
    model: '',
    resolution: '',
    angle: '',
    bracing: '',
    price: '',
  });
  const [errors, setErrors] = useState({});
  const [addStatus, setAddStatus] = useState(null);

  const handleCameraChange = (event) => {
    setCamera((camera) => ({
      ...camera,
      [event.target.name]: event.target.value,
    }));
    console.log(camera);
  };

  const FormSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(camera));
    if (
      errors.model === '' &&
      errors.resolution === '' &&
      errors.angle === '' &&
      errors.price === ''
    ) {
      Axios.post('http://localhost:3001/camera', {
        model: camera.model,
        resolution: camera.resolution,
        angle: camera.angle,
        bracing: camera.bracing,
        price: camera.price,
        location: 'Склад',
        status: 'В резерве',
      }).then((response) => {
        console.log(response);
        if (response.data.message === 'Успешное добавление') {
          console.log(response);
          setAddStatus(true);
        } else {
          console.log('Ошибка');
        }
      });
    } else {
      setAddStatus(false);
    }
  };

  return (
    <form style={{ width: '420px' }} onSubmit={FormSubmit}>
      <label htmlFor="model" className="add">
        Модель:
      </label>
      <input
        type="text"
        id="form-input"
        name="model"
        value={camera.model}
        style={{ borderColor: errors.model ? 'red' : null }}
        onChange={handleCameraChange}
      />

      {errors.model && <span className="err">{errors.model}</span>}

      <label htmlFor="resolution" className="add">
        Разрешение (в формате `значения`x`значения``):
      </label>
      <input
        type="text"
        id="form-input"
        name="resolution"
        value={camera.resolution}
        style={{ borderColor: errors.resolution ? 'red' : null }}
        onChange={handleCameraChange}
      />

      {errors.resolution && <span className="err">{errors.resolution}</span>}

      <label htmlFor="angle" className="add">
        Угол обзора (градусы):
      </label>
      <input
        type="text"
        id="form-input"
        name="angle"
        value={camera.angle}
        style={{ borderColor: errors.angle ? 'red' : null }}
        onChange={handleCameraChange}
      />

      {errors.angle && <span className="err">{errors.angle}</span>}

      <label htmlFor="bracing" className="add">
        Крепление:
      </label>
      <select
        id="form-input"
        name="bracing"
        value={camera.bracing}
        onChange={handleCameraChange}
      >
        <option>...</option>
        <option>Отсутствует</option>
        <option>Присутствует</option>
      </select>
      <label htmlFor="price" className="add">
        Цена:
      </label>
      <input
        type="text"
        id="form-input"
        name="price"
        value={camera.price}
        style={{ borderColor: errors.price ? 'red' : null }}
        onChange={handleCameraChange}
      />
      {errors.price && <span className="err">{errors.price}</span>}
      <Button isActive style={{ marginLeft: '9rem' }} type="submit">
        Добавить
      </Button>
      {addStatus === true && <Success>Успешное добавление камеры</Success>}
      {addStatus === false && (
        <Fail>Возникла ошибка при добавлении камеры</Fail>
      )}
    </form>
  );
}

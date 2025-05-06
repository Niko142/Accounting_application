import { React } from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import { instance } from 'services/api';
import Button from 'components/Button/Button';
import { bracingOptions, resolutionOptions } from 'data/data';

export default function AddCameraForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: 'onSubmit' });

  const onSubmit = async (data) => {
    try {
      await instance.post('/camera', {
        model: data.model,
        resolution: data.resolution,
        angle: data.angle,
        bracing: data.bracing,
        price: data.price,
        location: 'Склад',
        status: 'В резерве',
      });

      reset();
      toast.success('Камера успешно добавлена на склад');
    } catch (err) {
      toast.error(
        err.response?.data?.message || 'Не удалось добавить камеру на склад',
      );
    }
  };

  return (
    <form className="storage__form" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="model">Модель:</label>
      <input
        type="text"
        className="main__input"
        id="model"
        {...register('model', {
          required: 'Поле обязательно для заполнения',
        })}
      />

      {errors.model?.message && (
        <span className="form__error">{errors.model?.message}</span>
      )}

      <label htmlFor="resolution">Разрешение:</label>
      <select
        className="main__input"
        id="resolution"
        {...register('resolution', {
          required: 'Поле обязательно для заполнения',
        })}
      >
        {resolutionOptions.map((item, ind) => (
          <option key={ind} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>

      {errors.resolution?.message && (
        <span className="form__error">{errors.resolution?.message}</span>
      )}

      <label htmlFor="angle">Угол обзора:</label>
      <input
        type="text"
        id="angle"
        className="main__input"
        {...register('angle', {
          required: 'Поле обязательно для заполнения',
          pattern: {
            value: /^[1-9]\d*$/,
            message: 'Введите целое число',
          },
          validate: {
            maxAngle: (v) =>
              parseInt(v) <= 360 || 'Угол не может быть больше 360°',
          },
        })}
      />

      {errors.angle?.message && (
        <span className="form__error">{errors.angle?.message}</span>
      )}

      <label htmlFor="bracing">Крепление:</label>
      <select
        className="main__input"
        id="bracing"
        {...register('bracing', {
          required: 'Поле обязательно для заполнения',
        })}
      >
        {bracingOptions.map((item, ind) => (
          <option key={ind} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>

      {errors.bracing?.message && (
        <span className="form__error">{errors.bracing?.message}</span>
      )}

      <label htmlFor="price">Стоимость:</label>
      <input
        className="main__input"
        type="text"
        id="price"
        {...register('price', {
          required: 'Поле обязательно для заполнения',
          pattern: {
            value: /^[0-9]+$/,
            message: 'Неправильный формат ввода значения',
          },
        })}
      />

      {errors.price?.message && (
        <span className="form__error">{errors.price?.message}</span>
      )}

      <Button isActive type="submit">
        Добавить
      </Button>

      <ToastContainer />
    </form>
  );
}

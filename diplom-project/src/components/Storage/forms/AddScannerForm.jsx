import { React } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { instance } from 'services/api';
import Button from 'components/Button/Button';
import { colorOptions } from 'data/data';

export default function AddScannerForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: 'onSubmit' });

  const onSubmit = async (data) => {
    try {
      await instance.post('/api/scanners/', {
        nam: data.model,
        color: data.color,
        speed: data.speed,
        price: data.price,
        location: 'Склад',
        status: 'В резерве',
      });

      reset();
      toast.success('МФУ успешно добавлен на склад');
    } catch (err) {
      toast.error(
        err.response?.data?.message || 'Не удалось добавить МФУ на склад',
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

      <label htmlFor="color">Цвет печати:</label>
      <select
        id="color"
        className="main__input"
        {...register('color', {
          required: 'Поле обязательно для заполнения',
        })}
      >
        {colorOptions.map((item, ind) => (
          <option key={ind} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>

      {errors.color?.message && (
        <span className="form__error">{errors.color?.message}</span>
      )}

      <label htmlFor="speed">Скорость печати (стр./мин):</label>
      <input
        type="text"
        className="main__input"
        id="speed"
        {...register('speed', {
          required: 'Поле обязательно для заполнения',
          pattern: {
            value: /^[0-9]+$/,
            message: 'Введите целое число',
          },
          validate: {
            maxSpeed: (v) =>
              parseInt(v) <= 100 ||
              'Скорость печати не может превышать 100 стр./мин',
          },
        })}
      />

      {errors.speed?.message && (
        <span className="form__error">{errors.speed?.message}</span>
      )}

      <label htmlFor="price">Стоимость:</label>
      <input
        type="text"
        className="main__input"
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
    </form>
  );
}

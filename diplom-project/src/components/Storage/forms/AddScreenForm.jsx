import { React } from 'react';
import { useForm } from 'react-hook-form';
import { matrixOptions } from 'data/data';
import { toast } from 'react-toastify';
import { instance } from 'services/api';
import Button from 'components/Button/Button';

export default function AddScreenForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: 'onSubmit' });

  const onSubmit = async (data) => {
    try {
      await instance.post('/api/screens/', {
        model: data.model,
        diagonal: data.diagonal,
        rate: data.rate,
        type: data.type,
        price: data.price,
        location: 'Склад',
        status: 'В резерве',
      });

      reset();
      toast.success('Монитор успешно добавлен на склад');
    } catch (err) {
      toast.error(
        err.response?.data?.message || 'Не удалось добавить монитор на склад',
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

      <label htmlFor="diagonal">Диагональ (дюймы):</label>
      <input
        type="text"
        id="diagonal"
        className="main__input"
        {...register('diagonal', {
          required: 'Поле обязательно для заполнения',
          pattern: {
            value: /^[0-9]+(\.[0-9]+)?$/,
            message: 'Введите корректное число',
          },
        })}
      />

      {errors.diagonal?.message && (
        <span className="form__error">{errors.diagonal?.message}</span>
      )}

      <label htmlFor="rate">Частота (ГЦ):</label>
      <input
        type="text"
        className="main__input"
        id="rate"
        {...register('rate', {
          required: 'Поле обязательно для заполнения',
          pattern: {
            value: /^[0-9]+$/,
            message: 'Введите целое число',
          },
        })}
      />

      {errors.rate?.message && (
        <span className="form__error">{errors.rate?.message}</span>
      )}

      <label htmlFor="type">Тип матрицы:</label>
      <select
        className="main__input"
        id="type"
        {...register('type', {
          required: 'Поле обязательно для заполнения',
        })}
      >
        {matrixOptions.map((item, ind) => (
          <option key={ind} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>

      {errors.type?.message && (
        <span className="form__error">{errors.type?.message}</span>
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
    </form>
  );
}

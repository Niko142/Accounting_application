import { React } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { instance } from 'services/api';
import Button from 'components/Button/Button';
import { filterOptions, warmOptions } from 'data/data';

export default function AddVentilationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: 'onSubmit' });

  const onSubmit = async (data) => {
    try {
      await instance.post('/api/ventilations/', {
        model: data.model,
        filter: data.filter,
        warm: data.warm,
        price: data.price,
        location: 'Склад',
        status: 'В резерве',
      });

      reset();
      toast.success('Система вентиляции успешно добавлена на склад');
    } catch (err) {
      toast.error(
        err.response?.data?.message || 'Не удалось добавить систему на склад',
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

      <label htmlFor="filter">Тип фильтра:</label>
      <select
        id="filter"
        className="main__input"
        {...register('filter', {
          required: 'Поле обязательно для заполнения',
        })}
      >
        {filterOptions.map((item, ind) => (
          <option key={ind} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>

      {errors.filter?.message && (
        <span className="form__error">{errors.filter?.message}</span>
      )}

      <label htmlFor="warm">Возможность обогрева:</label>
      <select
        className="main__input"
        id="warm"
        {...register('warm', {
          required: 'Поле обязательно для заполнения',
        })}
      >
        {warmOptions.map((item, ind) => (
          <option key={ind} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>

      {errors.warm?.message && (
        <span className="form__error">{errors.warm?.message}</span>
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

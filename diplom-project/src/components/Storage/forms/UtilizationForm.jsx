import React from 'react';
import { useForm } from 'react-hook-form';
import Button from 'components/Button/Button';
import { reasonUtilOptions } from 'data/data';

export default function UtilizationForm({ onSubmit, objectName }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onSubmit' });

  return (
    <form className="utilization__form" onSubmit={handleSubmit(onSubmit)}>
      <p className="utilization__form-title">
        Выбранный объект: <span>{objectName}</span>
      </p>

      <label className="date">Дата назначения утилизации:</label>
      <input
        type="datetime-local"
        className="main__input"
        id="date"
        {...register('date', {
          required: 'Дата не выбрана',
        })}
      />

      {errors.date?.message && (
        <span className="form__error">{errors.date?.message}</span>
      )}

      <label htmlFor="reason">Причина утилизации:</label>
      <select
        className="main__input"
        id="reason"
        {...register('reason', {
          required: 'Выберите опцию',
        })}
      >
        {reasonUtilOptions.map((item, ind) => (
          <option key={ind} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>

      {errors.reason?.message && (
        <span className="form__error">{errors.reason?.message}</span>
      )}

      <Button isActive type="submit">
        Утилизировать
      </Button>
    </form>
  );
}

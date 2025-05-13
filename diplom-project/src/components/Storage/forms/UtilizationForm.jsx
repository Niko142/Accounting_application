import React from 'react';
import { useForm } from 'react-hook-form';
import Button from 'components/Button/Button';
import { reasonUtilOptions } from 'data/data';

export default function UtilizationForm({ onSubmit, objectName }) {
  const { register, handleSubmit } = useForm({ mode: 'onSubmit' });

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
        {...register('date')}
      />

      <label htmlFor="reason">Причина утилизации:</label>
      <select className="main__input" id="reason" {...register('reason')}>
        {reasonUtilOptions.map((item, ind) => (
          <option key={ind} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>

      <Button isActive type="submit">
        Утилизировать
      </Button>
    </form>
  );
}

import React from 'react';
import { useForm } from 'react-hook-form';
import Button from 'components/Button/Button';
import { reasonUtilOptions } from 'data/data';

export default function UtilizationForm({ onSubmit, objectName }) {
  const { register, handleSubmit } = useForm({ mode: 'onSubmit' });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p>
        Выбранный объект: <strong>{objectName}</strong>
      </p>

      <label className="date">Дата утилизации:</label>
      <input
        type="datetime-local"
        className="main__input"
        id="date"
        {...register('date')}
      />

      <label htmlFor="reason">Причина</label>
      <select className="main__input" id="reason" {...register('reason')}>
        {reasonUtilOptions.map((item, ind) => (
          <option key={ind} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>

      <Button type="submit">Утилизировать</Button>
    </form>
  );
}

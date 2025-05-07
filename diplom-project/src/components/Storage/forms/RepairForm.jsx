import React from 'react';
import { useForm } from 'react-hook-form';
import Button from 'components/Button/Button';

export default function RepairForm({ onSubmit, objectName }) {
  const { register, handleSubmit } = useForm({ mode: 'onSubmit' });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p>
        Выбранный объект: <strong>{objectName}</strong>
      </p>

      <label htmlFor="start">Дата начала ремонта:</label>
      <input
        type="datetime-local"
        className="main__input"
        id="start"
        {...register('start')}
      />

      <label htmlFor="end">Дата окончания ремонта:</label>
      <input
        type="datetime-local"
        className="main__input"
        id="end"
        {...register('end')}
      />

      <label htmlFor="description">Описание проблемы:</label>
      <textarea
        className="main__input"
        id="description"
        {...register('description')}
      />

      <Button type="submit">Отправить</Button>
    </form>
  );
}

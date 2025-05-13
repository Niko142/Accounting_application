import React from 'react';
import { useForm } from 'react-hook-form';
import Button from 'components/Button/Button';

export default function RepairForm({ onSubmit, objectName }) {
  const { register, handleSubmit } = useForm({ mode: 'onSubmit' });

  return (
    <form className="repair__form" onSubmit={handleSubmit(onSubmit)}>
      <p className="repair__form-title">
        Выбранный объект: <span>{objectName}</span>
      </p>

      <label htmlFor="date">Дата начала ремонта:</label>
      <input
        type="datetime-local"
        className="main__input"
        id="start"
        {...register('date')}
      />

      <label htmlFor="end">Предполагаемая дата окончания:</label>
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

      <Button isActive type="submit">
        Отправить
      </Button>
    </form>
  );
}

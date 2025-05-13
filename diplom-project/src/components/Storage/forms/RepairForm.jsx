import React from 'react';
import { useForm } from 'react-hook-form';
import Button from 'components/Button/Button';

export default function RepairForm({ onSubmit, objectName }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onSubmit' });

  return (
    <form className="repair__form" onSubmit={handleSubmit(onSubmit)}>
      <p className="repair__form-title">
        Выбранный объект: <span>{objectName}</span>
      </p>

      <label htmlFor="date">Дата начала ремонта:</label>
      <input
        type="datetime-local"
        className="main__input"
        id="date"
        {...register('date', {
          required: 'Дата начала не выбрана',
        })}
      />

      {errors.date?.message && (
        <span className="form__error">{errors.date?.message}</span>
      )}

      <label htmlFor="end">Предполагаемая дата окончания:</label>
      <input
        type="datetime-local"
        className="main__input"
        id="end"
        {...register('end', {
          required: 'Дата окончания не выбрана',
        })}
      />

      {errors.end?.message && (
        <span className="form__error">{errors.end?.message}</span>
      )}

      <label htmlFor="description">Описание проблемы:</label>
      <textarea
        className="main__input"
        id="description"
        {...register('description', {
          required: 'Поле обязательно для заполнения',
        })}
      />

      {errors.description?.message && (
        <span className="form__error">{errors.description?.message}</span>
      )}

      <Button isActive type="submit">
        Отправить
      </Button>
    </form>
  );
}

import React from 'react';
import Button from 'components/Button/Button';
import { useForm } from 'react-hook-form';
import 'react-phone-number-input/style.css';

export default function AddEmployeeForm({ onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const hadleDataSubmit = (data) => {
    onSubmit(data);
    console.log(data);
  };

  return (
    <form className="section_employee" onSubmit={handleSubmit(hadleDataSubmit)}>
      <label htmlFor="name">Имя:</label>
      <input
        type="text"
        className="main__input"
        id="name"
        name="name"
        {...register('name', {
          required: 'Поле обязательно для заполнения',
          maxLength: {
            value: 40,
            message: 'Значение не должно превышать более 40 символов',
          },
        })}
      />
      {errors.name?.message && (
        <span className="form__error">{errors.name?.message}</span>
      )}
      <label htmlFor="surname" className="add">
        Фамилия:
      </label>
      <input
        type="text"
        className="main__input"
        id="surname"
        name="surname"
        {...register('surname', {
          required: 'Поле обязательно для заполнения',
          maxLength: {
            value: 40,
            message: 'Значение не должно превышать более 40 символов',
          },
        })}
      />
      {errors.surname?.message && (
        <span className="form__error">{errors.surname?.message}</span>
      )}
      <label htmlFor="patronymic" className="add">
        Отчество:
      </label>
      <input
        type="text"
        className="main__input"
        id="patronymic"
        name="patronymic"
        {...register('patronymic', {
          required: 'Поле обязательно для заполнения',
          maxLength: {
            value: 40,
            message: 'Значение не должно превышать более 40 символов',
          },
        })}
      />
      {errors.patronymic?.message && (
        <span className="form__error">{errors.patronymic?.message}</span>
      )}
      <label htmlFor="email" className="add">
        Email:
      </label>
      <input
        type="email"
        className="main__input"
        id="email"
        name="email"
        {...register('email', {
          required: 'Поле обязательно для заполнения',
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
            message: 'Некорректный формат ввода',
          },
        })}
      />
      {errors.email?.message && (
        <span className="form__error">{errors.email?.message}</span>
      )}
      <label htmlFor="phone" className="add">
        Номер телефона:
      </label>
      <input
        type="tel"
        className="main__input"
        id="phone"
        name="phone"
        placeholder="Формат: +7 или 8"
        {...register('phone', {
          required: 'Поле обязательно для заполнения',
          pattern: {
            value: /^(\+7|8)[0-9]{10}$/,
            message: 'Некорректный формат номера',
          },
        })}
      />
      {errors.phone?.message && (
        <span className="form__error">{errors.phone?.message}</span>
      )}
      <Button isActive style={{ marginTop: '15px', display: 'block' }}>
        Добавить
      </Button>
    </form>
  );
}

import React from 'react';
import { product_groups } from 'data';
import { useForm } from 'react-hook-form';
import Button from 'components/Button/Button';

const AddProductForm = ({ onSubmit }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      type: '...',
      name: '',
      unit: '...',
      price: '',
      amounts: '',
    },
    mode: 'onSubmit',
  });

  const hadleDataSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(hadleDataSubmit)}>
      <label htmlFor="type">Товарная группа:</label>
      <select
        className="main__input"
        name="type"
        id="type"
        {...register('type', {
          validate: (value) => value !== '...' || 'Выберите категорию товара',
        })}
      >
        <option value={'...'}>...</option>
        {product_groups.map((option, i) => {
          return (
            <option key={i} value={option.value}>
              {option.name}
            </option>
          );
        })}
      </select>
      <label htmlFor="name">Описание принадлежности:</label>
      <textarea
        className="main__input"
        name="name"
        id="name"
        placeholder="Описание"
        {...register('name', {
          required: 'Поле обязательно для заполнения',
        })}
      ></textarea>
      <label htmlFor="unit">Единица измерения:</label>
      <select
        className="main__input"
        name="unit"
        id="unit"
        {...register('unit', {
          validate: (value) => value !== '...' || 'Выберите единицу измерения',
        })}
      >
        <option>...</option>
        <option>шт.</option>
        <option>пач.</option>
        <option>уп.</option>
      </select>
      <label htmlFor="price">Цена (за 1 единицу):</label>
      <input
        type="number"
        className="main__input"
        name="price"
        id="price"
        placeholder="до 1000 рублей"
        {...register('price', {
          required: true,
          validate: (value) => {
            const regex = /^\d{1,3}(\.\d{1,2})?$/;
            if (!regex.test(value)) {
              return 'Цена должна быть в формате до 999.99';
            }
            const numericValue = parseFloat(value);
            if (numericValue > 999.99) {
              return 'Цена не может быть больше 999.99';
            }
            return true;
          },
        })}
      />
      <label htmlFor="amount">Количество:</label>
      <input
        type="number"
        className="main__input"
        name="amounts"
        id="amount"
        placeholder="Макс: 3000 единиц"
        {...register('amounts', {
          required: 'Поле обязательно для заполнения',
          validate: (amount) =>
            (amount > 0 && amount < 3_000) ||
            'Количество превышает допустимое значение',
          valueAsNumber: true,
        })}
      />
      <Button isActive style={{ marginTop: '10px' }}>
        Добавить
      </Button>
    </form>
  );
};

export default AddProductForm;

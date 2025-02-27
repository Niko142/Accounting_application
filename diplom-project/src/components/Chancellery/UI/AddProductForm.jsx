import React from 'react';
import { product_groups } from 'data';

const AddProductForm = ({ state, setState }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form action="">
      <label htmlFor="type">Товарная группа:</label>
      <select
        className="main__input"
        name="type"
        id="type"
        value={state.type}
        onChange={handleChange}
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
        value={state.name}
        onChange={handleChange}
      ></textarea>
      <label htmlFor="unit">Единица измерения:</label>
      <select
        className="main__input"
        name="unit"
        id="unit"
        value={state.unit}
        onChange={handleChange}
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
        value={state.price}
        onChange={handleChange}
      />
      <label htmlFor="amount">Количество:</label>
      <input
        type="number"
        className="main__input"
        name="amounts"
        id="amount"
        value={state.amounts}
        onChange={handleChange}
      />
    </form>
  );
};

export default AddProductForm;

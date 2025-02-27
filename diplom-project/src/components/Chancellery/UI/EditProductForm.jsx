import React, { useState, useEffect } from 'react';

const EditProductForm = ({ state, onChange }) => {
  const [amount, setAmount] = useState(state.amounts);

  useEffect(() => {
    setAmount(state.amounts);
  }, [state.amounts]);

  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value);
    if (onChange) {
      onChange({ ...state, amounts: value });
    }
  };

  return (
    <form action="">
      <textarea disabled value={state.name} className="main__input" />
      <label htmlFor="amounts"></label>
      <input
        type="number"
        value={amount}
        id="amounts"
        className="main__input"
        onChange={handleAmountChange}
      />
    </form>
  );
};

export default EditProductForm;

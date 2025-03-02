import { useChancellery } from 'context/ChancelleryContext';
import React, { useState, useEffect } from 'react';

const EditProductForm = () => {
  const { currentGroup, setCurrentGroup } = useChancellery();
  const [amount, setAmount] = useState(currentGroup.amounts);

  useEffect(() => {
    setAmount(currentGroup.amounts);
  }, [currentGroup.amounts]);

  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value);
    if (setCurrentGroup) {
      setCurrentGroup({ ...currentGroup, amounts: value });
    }
  };

  return (
    <form action="">
      <textarea readOnly value={currentGroup.name} className="main__input" />
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

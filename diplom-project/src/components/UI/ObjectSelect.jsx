import { React } from 'react';
import Select from 'react-select';

const ObjectSelect = ({ label, options, setState, selectedKey }) => {
  const selectedOption = options.find((opt) => opt.key === selectedKey) || null;
  return (
    <>
      <label htmlFor="item">{label}:</label>
      <Select
        inputId="item"
        classNamePrefix="pinning-select"
        options={options}
        value={selectedOption}
        onChange={(selected) => {
          console.log('Выбранный объект:', selected);
          setState(selected ?? null);
        }}
        placeholder={label}
      />
    </>
  );
};

export default ObjectSelect;

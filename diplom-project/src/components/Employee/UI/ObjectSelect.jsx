import { React } from 'react';
import Select from 'react-select';

const ObjectSelect = ({ label, options, setState }) => {
  return (
    <>
      <label htmlFor="">{label}:</label>
      <Select
        classNamePrefix="pinning-select"
        options={options}
        onChange={setState}
        placeholder={label}
      />
    </>
  );
};

export default ObjectSelect;

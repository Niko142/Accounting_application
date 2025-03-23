import { React } from 'react';
import Select from 'react-select';

const ObjectSelect = ({ label, options, setState, setId }) => {
  return (
    <>
      <label htmlFor={setId}>{label}:</label>
      <Select
        options={options}
        onChange={(e) => {
          setState(e ? e.value : '');
          setId && setId(e ? { [setId]: +e.key } : {});
        }}
        placeholder={label}
        isClearable
      />
    </>
  );
};

export default ObjectSelect;

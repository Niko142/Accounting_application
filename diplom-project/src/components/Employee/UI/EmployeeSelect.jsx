import { React } from 'react';
import Select from 'react-select';

const EmployeeSelect = ({ options, setState }) => {
  return (
    <>
      <label htmlFor="employee">
        Выберите сотрудника, который будет закреплен за объектом:
      </label>
      <Select
        classNamePrefix="pinning-select"
        options={options}
        onChange={setState}
        placeholder="Сотрудник..."
      />
    </>
  );
};

export default EmployeeSelect;

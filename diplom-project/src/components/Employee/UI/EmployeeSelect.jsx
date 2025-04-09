import { React } from 'react';
import Select from 'react-select';

const EmployeeSelect = ({ options, setState, selectedEmployee }) => {
  const formattedOptions = options.map((employee) => ({
    value: `${employee.surname} ${employee.name}`, // Отображаем ФИО
    label: `${employee.surname} ${employee.name}`,
    key: employee.employee_id, // ID
  }));

  const selectedOption =
    formattedOptions.find((opt) => opt.key === selectedEmployee?.key) || null;

  return (
    <>
      <label htmlFor="employee">
        Выберите сотрудника, который будет закреплен за объектом:
      </label>
      <Select
        classNamePrefix="pinning-select"
        maxMenuHeight={150}
        options={formattedOptions}
        value={selectedOption}
        onChange={(selected) => {
          console.log('Выбранный сотрудник:', selected);
          setState(selected ?? null);
        }}
        placeholder="Сотрудник..."
      />
    </>
  );
};

export default EmployeeSelect;

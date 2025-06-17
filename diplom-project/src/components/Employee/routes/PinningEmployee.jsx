import Header from 'components/Header/Header';
import Select from 'react-select';
import { category, type } from 'data/data';
import { React, useEffect, useState } from 'react';
import Button from 'components/Button/Button';
import { toast, ToastContainer } from 'react-toastify';
import TableContainer from 'components/UI/TableContainer';
import EmployeeSelect from '../UI/EmployeeSelect';
import ObjectSelect from '../../UI/ObjectSelect';
import { fetchAllItems, pinningItem } from 'services/pinning';
import { useEmployee } from 'context/EmployeeContext';
import { usePinningTypes } from 'components/hooks/usePinningTypes';
import ReturnButton from 'components/UI/ReturnButton';

export default function PinningEmployee() {
  const { employees } = useEmployee();

  const [id, setId] = useState({
    computers: null,
    laptops: null,
    screens: null,
    scanners: null,
    cameras: null,
    furniture: null,
    ventilation: null,
  });
  const [items, setItems] = useState({
    computers: [],
    laptops: [],
    screens: [],
    scanners: [],
    cameras: [],
    furniture: [],
    ventilation: [],
  });

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [date, setDate] = useState(null);
  const [selectedType, setSelectedType] = useState('-');
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const isValid = date !== null && selectedEmployee !== null;

  const handlePinningItem = async (endpoint, itemsKey) => {
    try {
      await pinningItem({
        endpoint,
        itemsKey,
        idState: id,
        itemsState: items,
        employee: selectedEmployee,
        formData: {
          date: date,
          category: selectedCategory,
          type: selectedType,
        },
      });
      toast.success('Оборудование закреплено успешно');
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchAllItems(setItems, controller).catch((err) => {
      toast.error(err.message);
    });
    return () => controller.abort();
  }, []);

  const PinningBlock = ({
    label,
    options,
    setFunction,
    pinningFunction,
    isValid,
    employeeOptions,
    setEmployee,
    selectedKey,
    selectedEmployee,
  }) => (
    <article>
      <ObjectSelect
        label={label}
        options={options}
        setState={setFunction}
        selectedKey={selectedKey}
      />
      <EmployeeSelect
        options={employeeOptions}
        setState={setEmployee}
        selectedEmployee={selectedEmployee}
      />
      <Button
        id="pinning__btn"
        disabled={!isValid}
        isActive={isValid}
        onClick={pinningFunction}
      >
        Отправить
      </Button>
    </article>
  );

  const { equipmentTypes, selectedTypes } = usePinningTypes(
    items,
    setId,
    handlePinningItem,
    'update',
  );

  return (
    <>
      <Header />
      <TableContainer Lg>
        <form className="pinning__form" onSubmit={(e) => e.preventDefault()}>
          <div className="pinning__title">
            <h3>Закрепление материального лица за конкретным объектом</h3>
            <ReturnButton />
          </div>

          <hr className="pinning__line" />

          <div className="pinning__container">
            <article>
              <label htmlFor="date">Дата назначения:</label>
              <input
                type="datetime-local"
                className="main__input"
                id="date"
                onChange={(e) => setDate(e.target.value)}
              />
              <label htmlFor="category">Категория:</label>
              <Select
                inputId="category"
                classNamePrefix="pinning-select"
                isClearable
                placeholder="Выберите категорию объекта"
                options={category}
                onChange={(e) => setSelectedCategory(e?.value || '')}
              />
              {selectedCategory === 'Оргтехника' && (
                <>
                  <label htmlFor="type">Тип:</label>
                  <Select
                    inputId="type"
                    classNamePrefix="pinning-select"
                    isClearable
                    placeholder="Выберите тип оргтехники"
                    options={type}
                    onChange={(e) => setSelectedType(e?.value || '')}
                  />
                </>
              )}
            </article>
            {/* Все что касается категории оргтехники */}
            {equipmentTypes[selectedType] && (
              <PinningBlock
                label={selectedType}
                options={equipmentTypes[selectedType].options}
                setFunction={equipmentTypes[selectedType].setFunction}
                pinningFunction={equipmentTypes[selectedType].pinningFunction}
                isValid={isValid}
                employeeOptions={employees}
                setEmployee={setSelectedEmployee}
                selectedKey={id?.[equipmentTypes[selectedType].id]}
                selectedEmployee={selectedEmployee}
              />
            )}
            {/* Касаемо категории мебели и систем вентиляции */}
            {selectedTypes[selectedCategory] && (
              <PinningBlock
                label={selectedCategory}
                options={selectedTypes[selectedCategory].options}
                setFunction={selectedTypes[selectedCategory].setFunction}
                pinningFunction={
                  selectedTypes[selectedCategory].pinningFunction
                }
                isValid={isValid}
                employeeOptions={employees}
                setEmployee={setSelectedEmployee}
                selectedKey={id?.[selectedTypes[selectedCategory].id]}
                selectedEmployee={selectedEmployee}
              />
            )}
          </div>
          <ToastContainer />
        </form>
      </TableContainer>
    </>
  );
}

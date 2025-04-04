import Header from 'components/Header/Header';
import Select from 'react-select';
import { category, type } from 'data/data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { React, useEffect, useState } from 'react';
import Button from 'components/Button/Button';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import TableContainer from 'components/UI/TableContainer';
import EmployeeSelect from './UI/EmployeeSelect';
import ObjectSelect from './UI/ObjectSelect';
import { fetchAllItems, pinningItem } from 'services/pinning';
import { useEmployee } from 'context/EmployeeContext';
import { useEquipmentTypes } from './hook/useEquipmentTypes';

export default function PinningEmployee() {
  const { employees } = useEmployee();
  const navigate = useNavigate();
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

  const [selected, setSelected] = useState(null);
  const [data, setData] = useState(null);
  const [types, setTypes] = useState('-');
  const [employee, setEmployees] = useState(null);

  const isValid = data !== null && employee !== null;

  const handlePinningItem = async (endpoint, itemsKey) => {
    try {
      await pinningItem({
        endpoint,
        itemsKey,
        idState: id,
        itemsState: items,
        employee,
        formData: { date: data, category: selected, type: types },
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

  const { equipmentTypes, selectedTypes } = useEquipmentTypes(
    items,
    setId,
    handlePinningItem,
  );

  return (
    <>
      <Header />
      <TableContainer Lg>
        <form className="pinning__form" onSubmit={(e) => e.preventDefault()}>
          <div className="pinning__title">
            <h3>Закрепление материального лица за конкретным объектом</h3>
            <FontAwesomeIcon
              className="navigate-back"
              icon={faArrowLeft}
              onClick={() => navigate(-1)}
            />
          </div>

          <hr className="pinning__line" />

          <div className="pinning__container">
            <article>
              <label htmlFor="date">Дата назначения:</label>
              <input
                type="datetime-local"
                className="main__input"
                id="date"
                onChange={(e) => setData(e.target.value)}
              />
              <label htmlFor="category">Категория:</label>
              <Select
                classNamePrefix="pinning-select"
                isClearable
                placeholder="Выберите категорию объекта"
                options={category}
                onChange={(e) => setSelected(e?.value || '')}
              />
              {selected === 'Оргтехника' && (
                <>
                  <label htmlFor="type">Тип:</label>
                  <Select
                    classNamePrefix="pinning-select"
                    isClearable
                    placeholder="Выберите тип оргтехники"
                    options={type}
                    onChange={(e) => setTypes(e?.value || '')}
                  />
                </>
              )}
            </article>
            {/* Все что касается категории оргтехники */}
            {equipmentTypes[types] && (
              <article>
                <ObjectSelect
                  label={`${types}`}
                  options={equipmentTypes[types].options}
                  setState={equipmentTypes[types].setFunction}
                />
                <EmployeeSelect options={employees} setState={setEmployees} />
                <Button
                  id="pinning__btn"
                  disabled={!isValid}
                  isActive={isValid}
                  onClick={equipmentTypes[types].pinningFunction}
                >
                  Закрепить объект
                </Button>
              </article>
            )}
            {/* Касаемо категории мебели и систем вентиляции */}
            {selectedTypes[selected] && (
              <article>
                <ObjectSelect
                  label={`${selected}`}
                  options={selectedTypes[selected].options}
                  setState={selectedTypes[selected].setFunction}
                />
                <EmployeeSelect options={employees} setState={setEmployees} />
                <Button
                  id="pinning__btn"
                  disabled={!isValid}
                  isActive={isValid}
                  onClick={selectedTypes[selected].pinningFunction}
                >
                  Закрепить объект
                </Button>
              </article>
            )}
          </div>
          <ToastContainer />
        </form>
      </TableContainer>
    </>
  );
}

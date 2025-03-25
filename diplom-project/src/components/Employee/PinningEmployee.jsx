import Header from 'components/Header/Header';
import Select from 'react-select';
import { category, type } from 'data/data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { React, useEffect, useState } from 'react';
import Axios from 'axios';
import Button from 'components/Button/Button';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import TableContainer from 'components/UI/TableContainer';
import EmployeeSelect from './UI/EmployeeSelect';
import ObjectSelect from './UI/ObjectSelect';

export default function PinningEmployee() {
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
    employees: [],
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
  const [valid, setValid] = useState(false);

  useEffect(() => {
    setValid(data !== null && employee !== null);
  }, [data, employee]);

  const pinningItem = (endpoint, itemsKey) => {
    if (!id[itemsKey]) {
      toast.error('Ошибка: объект не выбран!');
      return;
    }

    const selectedObject = items[itemsKey]?.find(
      (obj) =>
        obj.key === id[itemsKey] ||
        obj[`${itemsKey.slice(0, -1)}_id`] === id[itemsKey],
    );

    Axios.post('http://localhost:3001/pinning-employee', {
      date: data,
      category: selected,
      type: types,
      unit: selectedObject.label,
      employee: employee.key,
    })
      .then((res) => {
        res.data.message === 'Успешное добавление'
          ? toast.success('Успешное закрепление')
          : toast.error('Ошибка при закреплении объекта');
      })
      .catch((error) => {
        console.error('Ошибка при закреплении:', error);
        toast.error('Ошибка сервера при закреплении');
      });

    Axios.post(`http://localhost:3001/${endpoint}`, {
      employee: employee.key,
      id: id[itemsKey],
    })
      .then((response) => {
        response.data.message === 'Успешное добавление'
          ? toast.success('Объект закреплён за сотрудником')
          : toast.error('Ошибка при обновлении объекта');
      })
      .catch((error) => {
        console.error('Ошибка при обновлении объекта:', error);
        toast.error('Ошибка сервера при обновлении объекта');
      });
  };

  const fetchItems = async (endpoint, key, valueKey = 'model', idKey) => {
    try {
      const res = await Axios.get(`http://localhost:3001/${endpoint}`);
      const arr = res.data.map((item) => ({
        value: item[valueKey],
        label: item[valueKey],
        key: item[idKey],
        [`${idKey}`]: item[idKey],
      }));
      setItems((prev) => ({ ...prev, [key]: arr }));
    } catch (error) {
      console.error(`Ошибка загрузки ${key}:`, error);
      toast.error(`Не удалось загрузить ${key}`);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        await Promise.all([
          fetchItems('select_employee', 'employees', 'surname', 'employee_id'),
          fetchItems('computer', 'computers', 'name', 'id_computer'),
          fetchItems('select_laptop', 'laptops', 'model', 'laptop_id'),
          fetchItems('select_screen', 'screens', 'model', 'screen_id'),
          fetchItems('select_scanner', 'scanners', 'nam', 'scanner_id'),
          fetchItems('select_camera', 'cameras', 'model', 'camera_id'),
          fetchItems('select_furniture', 'furniture', 'name', 'furniture_id'),
          fetchItems(
            'select_ventilation',
            'ventilation',
            'model',
            'ventilation_id',
          ),
        ]);
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
        toast.error('Не удалось загрузить данные');
      }
    };
    loadData();
  }, []);

  const equipmentTypes = {
    Компьютер: {
      id: 'computers',
      options: items.computers,
      setFunction: (e) =>
        setId({
          computers: e.key,
          laptops: null,
          screens: null,
          scanners: null,
          cameras: null,
        }),
      pinningFunction: () => pinningItem('update_computer', 'computers'),
    },
    Ноутбук: {
      id: 'laptops',
      options: items.laptops,
      setFunction: (e) =>
        setId({
          laptops: e.key,
          computers: null,
          screens: null,
          scanners: null,
          cameras: null,
        }),
      pinningFunction: () => pinningItem('update_laptop', 'laptops'),
    },
    Монитор: {
      id: 'screens',
      options: items.screens,
      setFunction: (e) =>
        setId({
          screens: e.key,
          computers: null,
          laptops: null,
          scanners: null,
          cameras: null,
        }),
      pinningFunction: () => pinningItem('update_screen', 'screens'),
    },
    МФУ: {
      id: 'scanners',
      options: items.scanners,
      setFunction: (e) =>
        setId({
          scanners: e.key,
          computers: null,
          laptops: null,
          screens: null,
          cameras: null,
        }),
      pinningFunction: () => pinningItem('update_scanner', 'scanners'),
    },
    Камера: {
      id: 'cameras',
      options: items.cameras,
      setFunction: (e) =>
        setId({
          cameras: e.key,
          computers: null,
          laptops: null,
          screens: null,
          scanners: null,
        }),
      pinningFunction: () => pinningItem('update_camera', 'cameras'),
    },
  };

  const selectedTypes = {
    Мебель: {
      id: 'furniture',
      options: items.furniture,
      setFunction: (e) =>
        setId({
          furniture: e.key,
          ventilation: null,
        }),
      pinningFunction: () => pinningItem('update_furniture', 'furniture'),
    },
    'Система вентиляции': {
      id: 'ventilation',
      options: items.ventilation,
      setFunction: (e) =>
        setId({
          ventilation: e.key,
          furniture: null,
        }),
      pinningFunction: () => pinningItem('update_ventilation', 'ventilation'),
    },
  };

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
                <EmployeeSelect
                  options={items.employees}
                  setState={setEmployees}
                />
                <Button
                  id="pinning__btn"
                  disabled={!valid}
                  isActive={valid}
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
                <EmployeeSelect
                  options={items.employees}
                  setState={setEmployees}
                />
                <Button
                  id="pinning__btn"
                  disabled={!valid}
                  isActive={valid}
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

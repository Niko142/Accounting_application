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

// Убрать излишние state (их очень много)
export default function PinningEmployee() {
  const navigate = useNavigate();
  const [id, setId] = useState({
    computer: null,
    laptop: null,
    screen: null,
    scanner: null,
    camera: null,
    furniture: null,
    ventilation: null,
  });
  const [selected, setSelected] = useState(null);
  const [data, setData] = useState(null);
  const [types, setTypes] = useState('-');
  const [selectedEmployee, setEmployee] = useState(['']);
  const [employee, setEmployees] = useState(null);
  const [selectFurniture, setFurniture] = useState(['']);
  const [furniture, setFurnitures] = useState(null);
  const [selectVentilation, setVentilation] = useState(['']);
  const [ventilation, setVentilations] = useState(null);
  const [selectComputer, setComputer] = useState(['']);
  const [computer, setComputers] = useState(null);
  const [selectLaptop, setLaptop] = useState(['']);
  const [laptop, setLaptops] = useState(null);
  const [selectScreen, setScreen] = useState(['']);
  const [screen, setScreens] = useState(null);
  const [selectScanner, setScanner] = useState(['']);
  const [scanner, setScanners] = useState(null);
  const [selectCamera, setCamera] = useState(['']);
  const [camera, setCameras] = useState(null);

  const [valid, setValid] = useState(false);

  useEffect(() => {
    if (data === null || employee === '') {
      setValid(false);
    } else {
      setValid(true);
    }
  }, [data, employee]);

  const pinningFurniture = () => {
    Axios.post('http://localhost:3001/pinning-employee', {
      date: data,
      category: selected,
      type: types,
      unit: furniture,
      employee: employee,
    }).then((response) => {
      console.log(response);
      if (response.data.message === 'Успешное добавление') {
        console.log(response);
        toast.success('Успешное закрепление мебели');
      } else {
        toast.error('Возникла ошибка при закреплении');
      }
    });
    Axios.post('http://localhost:3001/update_furniture', {
      employee: employee,
      id: id.furniture,
    }).then((response) => {
      if (response.data.message === 'Успешное добавление') {
        console.log(response);
        toast.success(
          'Успешное закрепление вентиляционной системы за сотрудником',
        );
      } else {
        toast.error('Возникла ошибка при закреплении');
      }
    });
  };

  const pinningVentilation = () => {
    Axios.post('http://localhost:3001/pinning-employee', {
      date: data,
      category: selected,
      type: types,
      unit: ventilation,
      employee: employee,
    }).then((response) => {
      console.log(response);
      if (response.data.message === 'Успешное добавление') {
        console.log(response);
        toast.success('Запись успешно создана');
      } else {
        toast.error('Возникла ошибка при добавлении записи');
      }
    });
    Axios.post('http://localhost:3001/update_ventilation', {
      employee: employee,
      id: id.ventilation,
      model: ventilation,
    }).then((response) => {
      if (response.data.message === 'Успешное добавление') {
        console.log(response);
        toast.success(
          'Успешное закрепление вентиляционной системы за сотрудником',
        );
      } else {
        toast.error('Возникла ошибка при закреплении');
      }
    });
  };

  const pinningComputer = () => {
    Axios.post('http://localhost:3001/pinning-employee', {
      date: data,
      category: selected,
      type: types,
      unit: computer,
      employee: employee,
    }).then((response) => {
      console.log(response);
      if (response.data.message === 'Успешное добавление') {
        console.log(response);
        toast.success('Запись успешно создана');
      } else {
        toast.error('Возникла ошибка при создании записи');
      }
    });
    Axios.post('http://localhost:3001/update_computer', {
      employee: employee,
      id: id.computer,
      name: computer,
    }).then((response) => {
      if (response.data.message === 'Успешное добавление') {
        console.log(response);
        toast.success('Успешное закрепление компьютера за сотрудником');
      } else {
        toast.error('Возникла ошибка при закреплении');
      }
    });
  };

  const pinningLaptop = () => {
    Axios.post('http://localhost:3001/pinning-employee', {
      date: data,
      category: selected,
      type: types,
      unit: laptop,
      employee: employee,
    }).then((response) => {
      console.log(response);
      if (response.data.message === 'Успешное добавление') {
        console.log(response);
        toast.success('Запись успешно создана');
      } else {
        toast.error('Возникла ошибка при создании записи');
      }
    });
    Axios.post('http://localhost:3001/update_laptop', {
      employee: employee,
      id: id.laptop,
      model: laptop,
    }).then((response) => {
      if (response.data.message === 'Успешное добавление') {
        console.log(response);
        toast.success('Успешное закрепление ноутбука за сотрудником');
      } else {
        toast.error('Возникла ошибка при закреплении');
      }
    });
  };

  const pinningScreen = () => {
    Axios.post('http://localhost:3001/pinning-employee', {
      date: data,
      category: selected,
      type: types,
      unit: screen,
      employee: employee,
    }).then((response) => {
      console.log(response);
      if (response.data.message === 'Успешное добавление') {
        console.log(response);
        toast.success('Запись успешно создана');
      } else {
        toast.error('Возникла ошибка при создании записи');
      }
    });
    Axios.post('http://localhost:3001/update_screen', {
      employee: employee,
      id: id.screen,
      model: screen,
    }).then((response) => {
      if (response.data.message === 'Успешное добавление') {
        console.log(response);
        toast.success('Успешное закрепление монитора за сотрудником');
      } else {
        toast.error('Возникла ошибка при закреплении');
      }
    });
  };
  const pinningScanner = () => {
    Axios.post('http://localhost:3001/pinning-employee', {
      date: data,
      category: selected,
      type: types,
      unit: scanner,
      employee: employee,
    }).then((response) => {
      console.log(response);
      if (response.data.message === 'Успешное добавление') {
        console.log(response);
        toast.success('Запись успешно создана');
      } else {
        toast.error('Возникла ошибка при создании записи');
      }
    });
    Axios.post('http://localhost:3001/update_scanner', {
      employee: employee,
      id: id.scanner,
      nam: scanner,
    }).then((response) => {
      if (response.data.message === 'Успешное добавление') {
        console.log(response);
        toast.success('Успешное закрепление МФУ за сотрудником');
      } else {
        toast.error('Возникла ошибка при закреплении');
      }
    });
  };

  const pinningCamera = () => {
    Axios.post('http://localhost:3001/pinning-employee', {
      date: data,
      category: selected,
      type: types,
      unit: camera,
      employee: employee,
    }).then((response) => {
      console.log(response);
      if (response.data.message === 'Успешное добавление') {
        console.log(response);
        toast.success('Запись успешно создана');
      } else {
        toast.error('Возникла ошибка при создании записи');
      }
    });
    Axios.post('http://localhost:3001/update_camera', {
      employee: employee,
      id: id.camera,
      model: camera,
    }).then((response) => {
      if (response.data.message === 'Успешное добавление') {
        console.log(response);
        toast.success('Успешное закрепление камеры за сотрудником');
      } else {
        toast.error('Возникла ошибка при закреплении');
      }
    });
  };

  useEffect(() => {
    const FetchEmployee = async () => {
      const arr = [];
      await Axios.get('http://localhost:3001/select_employee').then((res) => {
        let result = res.data;
        result.map((employee) => {
          return arr.push({
            value: employee.employee_id,
            label:
              employee.surname +
              ' ' +
              employee.name +
              ' ' +
              employee.patronymic,
          });
        });
        setEmployee(arr);
      });
    };
    FetchEmployee();
  }, []);

  useEffect(() => {
    const FetchComputer = async () => {
      const arr = [];
      await Axios.get('http://localhost:3001/computer').then((res) => {
        let result = res.data;
        result.map((computer) => {
          return arr.push({
            value: computer.name,
            label: computer.name,
            key: computer.id_computer,
          });
        });
        setComputer(arr);
      });
    };
    FetchComputer();
  }, []);

  useEffect(() => {
    const FetchLaptop = async () => {
      const arr = [];
      await Axios.get('http://localhost:3001/select_laptop').then((res) => {
        let result = res.data;
        result.map((laptop) => {
          return arr.push({
            value: laptop.model,
            label: laptop.model,
            key: laptop.laptop_id,
          });
        });
        setLaptop(arr);
      });
    };
    FetchLaptop();
  }, []);

  useEffect(() => {
    const FetchScreen = async () => {
      const arr = [];
      await Axios.get('http://localhost:3001/select_screen').then((res) => {
        let result = res.data;
        result.map((screen) => {
          return arr.push({
            value: screen.model,
            label: screen.model,
            key: screen.screen_id,
          });
        });
        setScreen(arr);
      });
    };
    FetchScreen();
  }, []);

  useEffect(() => {
    const FetchScanner = async () => {
      const arr = [];
      await Axios.get('http://localhost:3001/select_scanner').then((res) => {
        let result = res.data;
        result.map((scanner) => {
          return arr.push({
            value: scanner.nam,
            label: scanner.nam,
            key: scanner.scanner_id,
          });
        });
        setScanner(arr);
      });
    };
    FetchScanner();
  }, []);

  useEffect(() => {
    const FetchCamera = async () => {
      const arr = [];
      await Axios.get('http://localhost:3001/select_camera').then((res) => {
        let result = res.data;
        result.map((camera) => {
          return arr.push({
            value: camera.model,
            label: camera.model,
            key: camera.camera_id,
          });
        });
        setCamera(arr);
      });
    };
    FetchCamera();
  }, []);

  useEffect(() => {
    const FetchFurniture = async () => {
      const arr = [];
      await Axios.get('http://localhost:3001/select_furniture').then((res) => {
        let result = res.data;
        result.map((furniture) => {
          return arr.push({
            value: furniture.name + ' ' + furniture.model,
            label: furniture.name + ' ' + furniture.model,
            key: furniture.furniture_id,
          });
        });
        setFurniture(arr);
      });
    };
    FetchFurniture();
  }, []);

  useEffect(() => {
    const FetchVentilation = async () => {
      const arr = [];
      await Axios.get('http://localhost:3001/select_ventilation').then(
        (res) => {
          let result = res.data;
          result.map((ventilation) => {
            return arr.push({
              value: ventilation.model,
              label: ventilation.model,
              key: ventilation.ventilation_id,
            });
          });
          setVentilation(arr);
        },
      );
    };
    FetchVentilation();
  }, []);

  const FormSubmit = (event) => {
    event.preventDefault();
  };

  const equipmentTypes = {
    Компьютер: {
      id: 'computer',
      options: selectComputer,
      setFunction: setComputers,
      pinningFunction: pinningComputer,
    },
    Ноутбук: {
      id: 'laptop',
      options: selectLaptop,
      setFunction: setLaptops,
      pinningFunction: pinningLaptop,
    },
    Монитор: {
      id: 'screen',
      options: selectScreen,
      setFunction: setScreens,
      pinningFunction: pinningScreen,
    },
    МФУ: {
      id: 'scanner',
      options: selectScanner,
      setFunction: setScanners,
      pinningFunction: pinningScanner,
    },
    Камера: {
      id: 'camera',
      options: selectCamera,
      setFunction: setCameras,
      pinningFunction: pinningCamera,
    },
  };

  const selectedTypes = {
    Мебель: {
      id: 'furniture',
      options: selectFurniture,
      setFunction: setFurnitures,
      pinningFunction: pinningFurniture,
    },
    'Система вентиляции': {
      id: 'ventilation',
      options: selectVentilation,
      setFunction: setVentilations,
      pinningFunction: pinningVentilation,
    },
  };

  return (
    <>
      <Header />
      <TableContainer Lg>
        <form className="pinning__form" onSubmit={FormSubmit}>
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
                onChange={(e) => {
                  setData(e.target.value);
                }}
              />
              <label htmlFor="category">Категория:</label>
              <Select
                classNamePrefix="pinning-select"
                isClearable
                placeholder="Выберите категорию объекта"
                options={category}
                onChange={(e) => (e ? setSelected(e.value) : setSelected(''))}
              />
              {selected === 'Оргтехника' && (
                <>
                  <label htmlFor="type">Тип:</label>
                  <Select
                    classNamePrefix="pinning-select"
                    isClearable
                    placeholder="Выберите тип оргтехники"
                    options={type}
                    onChange={(e) => (e ? setTypes(e.value) : setTypes(''))}
                  />
                </>
              )}
            </article>
            {equipmentTypes[types] && (
              <article>
                <ObjectSelect
                  label={`${types}`}
                  options={equipmentTypes[types].options}
                  setState={equipmentTypes[types].setFunction}
                  setId={setId}
                />
                <EmployeeSelect
                  options={selectedEmployee}
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
            {selectedTypes[selected] && (
              <article>
                <ObjectSelect
                  label={`${selected}`}
                  options={selectedTypes[selected].options}
                  setState={selectedTypes[selected].setFunction}
                  setId={setId}
                />
                <EmployeeSelect
                  options={selectedEmployee}
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

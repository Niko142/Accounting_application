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

// Убрать все это
export default function PinningEmployee() {
  const navigate = useNavigate('');
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
  }, [data, employee, valid]);

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

  // Сброс состояния (пока не до конца, потому что все состояния надо убирать)
  function resetField() {
    setId({});
    setSelected(null);
    setData(null);
    setTypes('-');
    setEmployees(null);
    setValid(false);
  }

  const FormSubmit = (event) => {
    event.preventDefault();
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
          {/* grid */}
          <article
            style={{
              width: '500px',
              height: '250px',
              padding: '10px',
              float: 'left',
            }}
          >
            <label htmlFor="date">Дата назначения:</label>
            <input
              type="datetime-local"
              className="main__input"
              id="date"
              onChange={(e) => {
                setData(e.target.value);
                console.log(data);
              }}
            />
            <label htmlFor="category">Выберите категорию объекта:</label>
            <section className="pinning">
              <Select
                isClearable
                placeholder=""
                options={category}
                onChange={(e) => (!e ? setSelected('') : setSelected(e.value))}
              />
            </section>
            <section className="pinning">
              {selected === 'Оргтехника' && (
                <>
                  {' '}
                  <label htmlFor="type" className="add">
                    Выберите тип техники:
                  </label>
                  <Select
                    isClearable
                    placeholder=""
                    options={type}
                    onChange={(e) => (!e ? setTypes('') : setTypes(e.value))}
                  />
                </>
              )}
            </section>
            <Button isActive onClick={() => resetField()}>
              Сбросить все
            </Button>
          </article>
          {/* Избыточный код, исправить */}
          {types === 'Компьютер' && (
            <div className="pinning_form">
              <section className="pinning">
                <label htmlFor="computer" className="add">
                  Выберите необходимый компьютер:
                </label>
                <Select
                  options={selectComputer}
                  onChange={(e) => {
                    setComputers(e.value);
                    setId({ computer: +e.key });
                  }}
                  placeholder="Компьютер"
                />
              </section>
              <label htmlFor="employee" className="add">
                Выберите сотрудника, которому будет присвоен компьютер:
              </label>
              <Select
                options={selectedEmployee}
                onChange={(e) => setEmployees(+e.value)}
                placeholder="Сотрудник..."
              />
              <section
                style={{ position: 'relative', top: '10rem', right: '10rem' }}
              >
                <Button
                  disabled={!valid}
                  isActive={valid}
                  onClick={pinningComputer}
                >
                  Закрепить
                </Button>
                <ToastContainer />
              </section>
            </div>
          )}
          {types === 'Ноутбук' && (
            <div className="pinning_form">
              <section className="pinning">
                <label htmlFor="computer" className="add">
                  Выберите необходимый ноутбук:
                </label>
                <Select
                  options={selectLaptop}
                  onChange={(e) => {
                    setLaptops(e.value);
                    setId({ laptop: +e.key });
                  }}
                  placeholder="Ноутбук"
                />
              </section>
              <label htmlFor="employee" className="add">
                Выберите сотрудника, которому будет присвоен ноутбук:
              </label>
              <Select
                options={selectedEmployee}
                onChange={(e) => setEmployees(+e.value)}
                placeholder="Сотрудник..."
              />
              <section
                style={{ position: 'relative', top: '10rem', right: '10rem' }}
              >
                <Button
                  disabled={!valid}
                  isActive={valid}
                  onClick={pinningLaptop}
                >
                  Закрепить
                </Button>
                <ToastContainer />
              </section>
            </div>
          )}

          {types === 'Монитор' && (
            <div className="pinning_form">
              <section className="pinning">
                <label htmlFor="computer" className="add">
                  Выберите необходимый монитор:
                </label>
                <Select
                  options={selectScreen}
                  onChange={(e) => {
                    setScreens(e.value);
                    setId({ screen: +e.key });
                  }}
                  placeholder="Монитор"
                />
              </section>
              <label htmlFor="employee" className="add">
                Выберите сотрудника, которому будет присвоен монитор:
              </label>
              <Select
                options={selectedEmployee}
                onChange={(e) => setEmployees(+e.value)}
                placeholder="Сотрудник..."
              />
              <section
                style={{ position: 'relative', top: '10rem', right: '10rem' }}
              >
                <Button
                  disabled={!valid}
                  isActive={valid}
                  onClick={pinningScreen}
                >
                  Закрепить
                </Button>
                <ToastContainer />
              </section>
            </div>
          )}

          {types === 'МФУ' && (
            <div className="pinning_form">
              <section className="pinning">
                <label htmlFor="scanner" className="add">
                  Выберите необходимый МФУ:
                </label>
                <Select
                  options={selectScanner}
                  onChange={(e) => {
                    setScanners(e.value);
                    setId({ scanner: +e.key });
                  }}
                  placeholder="МФУ"
                />
              </section>
              <label htmlFor="employee" className="add">
                Выберите сотрудника, которому будет присвоен МФУ:
              </label>
              <Select
                options={selectedEmployee}
                onChange={(e) => setEmployees(+e.value)}
                placeholder="Сотрудник..."
              />
              <section
                style={{ position: 'relative', top: '10rem', right: '10rem' }}
              >
                <Button
                  disabled={!valid}
                  isActive={valid}
                  onClick={pinningScanner}
                >
                  Закрепить
                </Button>
                <ToastContainer />
              </section>
            </div>
          )}

          {types === 'Камера' && (
            <div className="pinning_form">
              <section className="pinning">
                <label htmlFor="camera" className="add">
                  Выберите необходимую камеру:
                </label>
                <Select
                  options={selectCamera}
                  onChange={(e) => {
                    setCameras(e.value);
                    setId({ camera: +e.key });
                  }}
                  placeholder="Камера"
                />
              </section>
              <label htmlFor="employee" className="add">
                Выберите сотрудника, которому будет присвоена камера:
              </label>
              <Select
                options={selectedEmployee}
                onChange={(e) => setEmployees(+e.value)}
                placeholder="Сотрудник..."
              />
              <section
                style={{ position: 'relative', top: '10rem', right: '10rem' }}
              >
                <Button
                  disabled={!valid}
                  isActive={valid}
                  onClick={pinningCamera}
                >
                  Закрепить
                </Button>
                <ToastContainer />
              </section>
            </div>
          )}

          {selected === 'Мебель' && (
            <div className="pinning_form">
              <section className="pinning">
                <label htmlFor="furniture" className="add">
                  Выберите необходимую мебель из имеющегося списка:
                </label>
                <Select
                  options={selectFurniture}
                  onChange={(e) => {
                    setFurnitures(e.value);
                    setId({ furniture: +e.key });
                  }}
                  placeholder="Мебель"
                />
              </section>
              <label htmlFor="employee" className="add">
                Выберите сотрудника, которому будет присвоена мебель:
              </label>
              <Select
                options={selectedEmployee}
                onChange={(e) => setEmployees(+e.value)}
                placeholder="Сотрудник..."
              />
              <section
                style={{ position: 'relative', top: '10rem', right: '10rem' }}
              >
                <Button
                  disabled={!valid}
                  isActive={valid}
                  onClick={pinningFurniture}
                >
                  Закрепить
                </Button>
                <ToastContainer />
              </section>
            </div>
          )}
          {selected === 'Система вентиляции' && (
            <div className="pinning_form">
              <section className="pinning">
                <label htmlFor="ventilation">
                  Выберите систему из имеющегося списка:
                </label>
                <Select
                  options={selectVentilation}
                  onChange={(e) => {
                    setVentilations(e.value);
                    setId({ ventilation: +e.key });
                  }}
                  placeholder="Система вентиляции..."
                />
              </section>
              <label htmlFor="employee">
                Выберите сотрудника, которому будет присвоена система:
              </label>
              <Select
                options={selectedEmployee}
                onChange={(e) => setEmployees(+e.value)}
                placeholder="Сотрудник..."
              />
              <section
                style={{ position: 'relative', top: '10rem', right: '10rem' }}
              >
                <Button
                  disabled={!valid}
                  isActive={valid}
                  onClick={pinningVentilation}
                >
                  Закрепить
                </Button>
                <ToastContainer />
              </section>
            </div>
          )}
        </form>
      </TableContainer>
    </>
  );
}

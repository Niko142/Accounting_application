import { React, useEffect, useState } from 'react';
import Button from 'components/Button/Button';
import Header from 'components/Header/Header';
import { category, type, reason } from 'data/data';
import Select from 'react-select';
import Axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function PinningCabinet() {
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
  const [data, setData] = useState(null);
  const [cabinet, setCabinet] = useState(['']);
  const [getCabinet, setCabinets] = useState(null);
  const [computer, setComputer] = useState(['']);
  const [getComputer, setComputers] = useState(null);
  const [laptop, setLaptop] = useState(['']);
  const [getLaptop, setLaptops] = useState(null);
  const [screen, setScreen] = useState(['']);
  const [getScreen, setScreens] = useState(null);
  const [scanner, setScanner] = useState(['']);
  const [getScanner, setScanners] = useState(null);
  const [camera, setCamera] = useState(['']);
  const [getCamera, setCameras] = useState(null);
  const [furniture, setFurniture] = useState(['']);
  const [getFurniture, setFurnitures] = useState(null);
  const [ventilation, setVentilation] = useState(['']);
  const [getVentilation, setVentilations] = useState(null);
  const [selected, setSelected] = useState(null);
  const [types, setTypes] = useState('-');

  const FormSubmit = (event) => {
    event.preventDefault();
  };

  const Label = ({ children }) => {
    return (
      <>
        <label className="add">{children}</label>
      </>
    );
  };

  useEffect(() => {
    const FetchCabinet = async () => {
      const arr = [];
      await Axios.get('http://localhost:3001/not_sklad_cabinet').then((res) => {
        let result = res.data;
        result.map((cabinet) => {
          return arr.push({
            value: cabinet.number,
            label: 'Кабинет: ' + cabinet.number,
          });
        });
        setCabinet(arr);
      });
    };
    FetchCabinet();
  }, []);

  useEffect(() => {
    const FetchComputer = async () => {
      const arr = [];
      await Axios.get('http://localhost:3001/sklad_computer').then((res) => {
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
      await Axios.get('http://localhost:3001/sklad_laptop').then((res) => {
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
      await Axios.get('http://localhost:3001/sklad_screen').then((res) => {
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
      await Axios.get('http://localhost:3001/sklad_scanner').then((res) => {
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
      await Axios.get('http://localhost:3001/sklad_camera').then((res) => {
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
      await Axios.get('http://localhost:3001/sklad_furniture').then((res) => {
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
      await Axios.get('http://localhost:3001/sklad_ventilation').then((res) => {
        let result = res.data;
        result.map((ventilation) => {
          return arr.push({
            value: ventilation.model,
            label: ventilation.model,
            key: ventilation.ventilation_id,
          });
        });
        setVentilation(arr);
      });
    };
    FetchVentilation();
  }, []);

  const pinningComputer = () => {
    Axios.post('http://localhost:3001/pinning-cabinet', {
      date: data,
      category: selected,
      type: types,
      reason: 'Введение в эксплуатацию',
      unit: getComputer,
      start: 'Склад',
      end: getCabinet,
    }).then((response) => {
      console.log(response);
      if (response.data.message === 'Успешное добавление') {
        console.log(response);
        toast.success('Запись успешно создана');
      } else {
        toast.error('Возникла ошибка при создании записи');
      }
    });
    Axios.post('http://localhost:3001/location_computer', {
      location: getCabinet,
      status: 'В эксплуатации',
      id: id.computer,
      name: getComputer,
    }).then((response) => {
      if (response.data.message === 'Успешное добавление') {
        console.log(response);
        toast.success('Успешное закрепление компьютера за кабинетом');
      } else {
        toast.error('Возникла ошибка при закреплении');
      }
    });
  };

  const pinningLaptop = () => {
    Axios.post('http://localhost:3001/pinning-cabinet', {
      date: data,
      category: selected,
      type: types,
      reason: 'Введение в эксплуатацию',
      unit: getLaptop,
      start: 'Склад',
      end: getCabinet,
    }).then((response) => {
      console.log(response);
      if (response.data.message === 'Успешное добавление') {
        console.log(response);
        toast.success('Запись успешно создана');
      } else {
        toast.error('Возникла ошибка при создании записи');
      }
    });
    Axios.post('http://localhost:3001/location_laptop', {
      location: getCabinet,
      status: 'В эксплуатации',
      id: id.laptop,
      model: getLaptop,
    }).then((response) => {
      if (response.data.message === 'Успешное добавление') {
        console.log(response);
        toast.success('Успешное закрепление ноутбука за кабинетом');
      } else {
        toast.error('Возникла ошибка при закреплении');
      }
    });
  };

  const pinningScreen = () => {
    Axios.post('http://localhost:3001/pinning-cabinet', {
      date: data,
      category: selected,
      type: types,
      reason: 'Введение в эксплуатацию',
      unit: getScreen,
      start: 'Склад',
      end: getCabinet,
    }).then((response) => {
      console.log(response);
      if (response.data.message === 'Успешное добавление') {
        console.log(response);
        toast.success('Запись успешно создана');
      } else {
        toast.error('Возникла ошибка при создании записи');
      }
    });
    Axios.post('http://localhost:3001/location_screen', {
      location: getCabinet,
      status: 'В эксплуатации',
      id: id.screen,
      model: getScreen,
    }).then((response) => {
      if (response.data.message === 'Успешное добавление') {
        console.log(response);
        toast.success('Успешное закрепление монитора за кабинетом');
      } else {
        toast.error('Возникла ошибка при закреплении');
      }
    });
  };

  const pinningScanner = () => {
    Axios.post('http://localhost:3001/pinning-cabinet', {
      date: data,
      category: selected,
      type: types,
      reason: 'Введение в эксплуатацию',
      unit: getScanner,
      start: 'Склад',
      end: getCabinet,
    }).then((response) => {
      console.log(response);
      if (response.data.message === 'Успешное добавление') {
        console.log(response);
        toast.success('Запись успешно создана');
      } else {
        toast.error('Возникла ошибка при создании записи');
      }
    });
    Axios.post('http://localhost:3001/location_scanner', {
      location: getCabinet,
      status: 'В эксплуатации',
      id: id.scanner,
      nam: getScanner,
    }).then((response) => {
      if (response.data.message === 'Успешное добавление') {
        console.log(response);
        toast.success('Успешное закрепление МФУ за кабинетом');
      } else {
        toast.error('Возникла ошибка при закреплении');
      }
    });
  };

  const pinningCamera = () => {
    Axios.post('http://localhost:3001/pinning-cabinet', {
      date: data,
      category: selected,
      type: types,
      reason: 'Введение в эксплуатацию',
      unit: getCamera,
      start: 'Склад',
      end: getCabinet,
    }).then((response) => {
      console.log(response);
      if (response.data.message === 'Успешное добавление') {
        console.log(response);
        toast.success('Запись успешно создана');
      } else {
        toast.error('Возникла ошибка при создании записи');
      }
    });
    Axios.post('http://localhost:3001/location_camera', {
      location: getCabinet,
      status: 'В эксплуатации',
      id: id.camera,
      model: getCamera,
    }).then((response) => {
      if (response.data.message === 'Успешное добавление') {
        console.log(response);
        toast.success('Успешное закрепление камеры за кабинетом');
      } else {
        toast.error('Возникла ошибка при закреплении');
      }
    });
  };

  const pinningFurniture = () => {
    Axios.post('http://localhost:3001/pinning-cabinet', {
      date: data,
      category: selected,
      type: types,
      reason: 'Введение в эксплуатацию',
      unit: getFurniture,
      start: 'Склад',
      end: getCabinet,
    }).then((response) => {
      console.log(response);
      if (response.data.message === 'Успешное добавление') {
        console.log(response);
        toast.success('Запись успешно создана');
      } else {
        toast.error('Возникла ошибка при создании записи');
      }
    });
    Axios.post('http://localhost:3001/location_furniture', {
      location: getCabinet,
      status: 'В эксплуатации',
      id: id.furniture,
    }).then((response) => {
      if (response.data.message === 'Успешное добавление') {
        console.log(response);
        toast.success('Успешное закрепление мебели за кабинетом');
      } else {
        toast.error('Возникла ошибка при закреплении');
      }
    });
  };

  const pinningVentilation = () => {
    Axios.post('http://localhost:3001/pinning-cabinet', {
      date: data,
      category: selected,
      type: types,
      reason: 'Введение в эксплуатацию',
      unit: getVentilation,
      start: 'Склад',
      end: getCabinet,
    }).then((response) => {
      console.log(response);
      if (response.data.message === 'Успешное добавление') {
        console.log(response);
        toast.success('Запись успешно создана');
      } else {
        toast.error('Возникла ошибка при создании записи');
      }
    });
    Axios.post('http://localhost:3001/location_ventilation', {
      location: getCabinet,
      status: 'В эксплуатации',
      id: id.ventilation,
      model: getVentilation,
    }).then((response) => {
      if (response.data.message === 'Успешное добавление') {
        console.log(response);
        toast.success('Успешное закрепление системы за кабинетом');
      } else {
        toast.error('Возникла ошибка при закреплении');
      }
    });
  };

  return (
    <>
      <Header />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <form
          style={{
            marginTop: '2rem',
            border: '2px solid #000',
            width: '60%',
            height: '530px',
          }}
          onSubmit={FormSubmit}
        >
          <div
            style={{
              marginLeft: '5px',
              padding: '5px',
              borderBottom: '1px solid #ccc',
            }}
          >
            <h3>Закрепление материального средства за кабинетом</h3>
          </div>
          <div style={{ width: '500px', padding: '10px', float: 'left' }}>
            <Label>Дата закрепления</Label>
            <input
              type="datetime-local"
              id="form-input"
              name="data"
              onChange={(e) => {
                setData(e.target.value);
                console.log(data);
              }}
            />
            <Label>Категория</Label>
            <section className="pinning">
              <Select
                isClearable
                placeholder=""
                options={category}
                name="category"
                onChange={(e) => (!e ? setSelected('') : setSelected(e.value))}
              />
            </section>
            <section className="pinning">
              {selected === 'Оргтехника' && (
                <>
                  {' '}
                  <Label>Тип</Label>
                  <Select
                    isClearable
                    placeholder=""
                    options={type}
                    onChange={(e) => (!e ? setTypes('') : setTypes(e.value))}
                  />
                </>
              )}
            </section>
          </div>

          {types === 'Компьютер' && (
            <div className="pinning_form">
              <section className="pinning">
                <Label>Причина перемещения</Label>
                <Select
                  options={reason}
                  defaultValue={reason[0]}
                  isDisabled
                ></Select>
              </section>
              <section className="pinning">
                <Label>Выберите необходимый компьютер</Label>
                <Select
                  placeholder=""
                  options={computer}
                  onChange={(e) => {
                    setComputers(e.value);
                    setId({ computer: +e.key });
                  }}
                ></Select>
              </section>
              <Label>Откуда</Label>
              <input
                type="text"
                id="form-input"
                defaultValue="Кабинет"
                disabled
              />
              <Label>Куда</Label>
              <Select
                placeholder=""
                options={cabinet}
                onChange={(e) => setCabinets(e.value)}
              ></Select>
              <ToastContainer />
            </div>
          )}

          {types === 'Ноутбук' && (
            <div className="pinning_form">
              <section className="pinning">
                <Label>Причина перемещения</Label>
                <Select
                  options={reason}
                  defaultValue={reason[0]}
                  isDisabled
                ></Select>
              </section>
              <section className="pinning">
                <Label>Выберите необходимый ноутбук</Label>
                <Select
                  placeholder=""
                  options={laptop}
                  onChange={(e) => {
                    setLaptops(e.value);
                    setId({ laptop: +e.key });
                  }}
                ></Select>
              </section>
              <Label>Откуда</Label>
              <input
                type="text"
                id="form-input"
                defaultValue="Кабинет"
                disabled
              />
              <Label>Куда</Label>
              <Select
                placeholder=""
                options={cabinet}
                onChange={(e) => setCabinets(e.value)}
              ></Select>
              <ToastContainer />
            </div>
          )}
          {types === 'Монитор' && (
            <div className="pinning_form">
              <section className="pinning">
                <Label>Причина перемещения</Label>
                <Select
                  options={reason}
                  defaultValue={reason[0]}
                  isDisabled
                ></Select>
              </section>
              <section className="pinning">
                <Label>Выберите необходимый монитор</Label>
                <Select
                  placeholder=""
                  options={screen}
                  onChange={(e) => {
                    setScreens(e.value);
                    setId({ screen: +e.key });
                  }}
                ></Select>
              </section>
              <Label>Откуда</Label>
              <input
                type="text"
                id="form-input"
                defaultValue="Кабинет"
                disabled
              />
              <Label>Куда</Label>
              <Select
                placeholder=""
                options={cabinet}
                onChange={(e) => setCabinets(e.value)}
              ></Select>
              <ToastContainer />
            </div>
          )}
          {types === 'МФУ' && (
            <div className="pinning_form">
              <section className="pinning">
                <Label>Причина перемещения</Label>
                <Select
                  options={reason}
                  defaultValue={reason[0]}
                  isDisabled
                ></Select>
              </section>
              <section className="pinning">
                <Label>Выберите необходимый МФУ</Label>
                <Select
                  placeholder=""
                  options={scanner}
                  onChange={(e) => {
                    setScanners(e.value);
                    setId({ scanner: +e.key });
                  }}
                ></Select>
              </section>
              <Label>Откуда</Label>
              <input
                type="text"
                id="form-input"
                defaultValue="Кабинет"
                disabled
              />
              <Label>Куда</Label>
              <Select
                placeholder=""
                options={cabinet}
                onChange={(e) => setCabinets(e.value)}
              ></Select>
              <ToastContainer />
            </div>
          )}
          {types === 'Камера' && (
            <div className="pinning_form">
              <section className="pinning">
                <Label>Причина перемещения</Label>
                <Select
                  options={reason}
                  defaultValue={reason[0]}
                  isDisabled
                ></Select>
              </section>
              <section className="pinning">
                <Label>Выберите необходимую камеру</Label>
                <Select
                  placeholder=""
                  options={camera}
                  onChange={(e) => {
                    setCameras(e.value);
                    setId({ camera: +e.key });
                  }}
                ></Select>
              </section>
              <Label>Откуда</Label>
              <input
                type="text"
                id="form-input"
                defaultValue="Кабинет"
                disabled
              />
              <Label>Куда</Label>
              <Select
                placeholder=""
                options={cabinet}
                onChange={(e) => setCabinets(e.value)}
              ></Select>
              <ToastContainer />
            </div>
          )}

          {selected === 'Мебель' && (
            <div className="pinning_form">
              <section className="pinning">
                <Label>Причина перемещения</Label>
                <Select
                  options={reason}
                  defaultValue={reason[0]}
                  isDisabled
                ></Select>
              </section>
              <section className="pinning">
                <Label>Выберите необходимую мебель</Label>
                <Select
                  placeholder=""
                  options={furniture}
                  onChange={(e) => {
                    setFurnitures(e.value);
                    setId({ furniture: +e.key });
                  }}
                ></Select>
              </section>
              <Label>Откуда</Label>
              <input
                type="text"
                id="form-input"
                defaultValue="Кабинет"
                disabled
              />
              <Label>Куда</Label>
              <Select
                placeholder=""
                options={cabinet}
                onChange={(e) => setCabinets(e.value)}
              ></Select>
              <ToastContainer />
            </div>
          )}

          {selected === 'Система вентиляции' && (
            <div className="pinning_form">
              <section className="pinning">
                <Label>Причина перемещения</Label>
                <Select
                  placeholder=""
                  options={reason}
                  defaultValue={reason[0]}
                  isDisabled
                ></Select>
              </section>
              <section className="pinning">
                <Label>Выберите необходимую систему</Label>
                <Select
                  options={ventilation}
                  onChange={(e) => {
                    setVentilations(e.value);
                    setId({ ventilation: +e.key });
                  }}
                ></Select>
              </section>
              <Label>Откуда</Label>
              <input
                type="text"
                id="form-input"
                defaultValue="Кабинет"
                disabled
              />
              <Label>Куда</Label>
              <Select
                placeholder=""
                name="cabinet"
                options={cabinet}
                onChange={(e) => setCabinets(e.value)}
              ></Select>
              <ToastContainer />
            </div>
          )}

          <footer
            style={{
              backgroundColor: '#F5F5F5',
              position: 'fixed',
              width: '60%',
              height: '3.5rem',
              bottom: '17.2rem',
              paddingTop: '12px',
            }}
          >
            <Button id="image-button" onClick={() => navigate('/movement')}>
              Назад
            </Button>
            <Button isActive onClick={() => window.location.reload()}>
              Обновить
            </Button>
            {types === 'Компьютер' && (
              <Button
                isActive
                style={{ float: 'right' }}
                onClick={pinningComputer}
              >
                Оформить
              </Button>
            )}
            {types === 'Ноутбук' && (
              <Button
                isActive
                style={{ float: 'right' }}
                onClick={pinningLaptop}
              >
                Оформить
              </Button>
            )}
            {types === 'Монитор' && (
              <Button
                isActive
                style={{ float: 'right' }}
                onClick={pinningScreen}
              >
                Оформить
              </Button>
            )}
            {types === 'МФУ' && (
              <Button
                isActive
                style={{ float: 'right' }}
                onClick={pinningScanner}
              >
                Оформить
              </Button>
            )}
            {types === 'Камера' && (
              <Button
                isActive
                style={{ float: 'right' }}
                onClick={pinningCamera}
              >
                Оформить
              </Button>
            )}
            {selected === 'Мебель' && (
              <Button
                isActive
                style={{ float: 'right' }}
                onClick={pinningFurniture}
              >
                Оформить
              </Button>
            )}
            {selected === 'Система вентиляции' && (
              <Button
                isActive
                style={{ float: 'right' }}
                onClick={pinningVentilation}
              >
                Оформить
              </Button>
            )}
          </footer>
        </form>
      </div>
    </>
  );
}

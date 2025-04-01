import Axios from 'axios';
import { React, useEffect, useState } from 'react';
import Select from 'react-select';
import { reason } from 'data/data';
import Button from 'components/Button/Button';
import { toast, ToastContainer } from 'react-toastify';
import { instance } from 'services/api';

export default function PinningFurniture() {
  const [value, setValue] = useState([]);
  const [location, setLocation] = useState([]);
  const [date, setDate] = useState('');
  const [furniture, setFurniture] = useState('');
  const [key, setKey] = useState('-');
  const [id, setId] = useState('');
  const [cabinet, setCabinet] = useState('');
  const [reasons, setReason] = useState('');
  const [valid, setValid] = useState(false);

  useEffect(() => {
    if (date === '' || furniture === '' || cabinet === '' || reasons === '') {
      setValid(false);
    } else setValid(true);
  }, [date, furniture, cabinet, reasons]);

  useEffect(() => {
    const FetchCabinet = async () => {
      let arr = [];
      await instance.get('/cabinet').then((res) => {
        let result = res.data;
        result.map((cabinet) => {
          return arr.push({
            value: cabinet.number,
            label: 'Кабинет: ' + cabinet.number,
          });
        });
        setLocation(arr);
      });
    };
    FetchCabinet();
  }, []);

  useEffect(() => {
    const FetchData = async () => {
      let arr = [];
      await Axios.get('http://localhost:3001/furniture_movement').then(
        (res) => {
          let result = res.data;
          result.map((furniture) => {
            return arr.push({
              value: furniture.name + ' ' + furniture.model,
              label: furniture.name + ' ' + furniture.model,
              key: furniture.location,
              keys: furniture.furniture_id,
            });
          });
          setValue(arr);
        },
      );
    };
    FetchData();
  }, []);

  // 2 параллельных запроса

  const pinningFurniture = () => {
    Axios.post('http://localhost:3001/pinning-cabinet', {
      date: date,
      category: 'Мебель',
      type: '-',
      reason: reasons,
      unit: furniture,
      start: key,
      end: cabinet,
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
      location: cabinet,
      id: id,
    }).then((response) => {
      if (response.data.message === 'Успешное добавление') {
        console.log(response);
        toast.success('Успешное закрепление мебели за кабинетом');
        if (cabinet === 'Склад') {
          Axios.post('http://localhost:3001/status_furniture', {
            status: 'Находится в резерве',
            id: id,
          });
        }
      } else {
        toast.error('Возникла ошибка при закреплении');
      }
    });
  };

  const FormSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <form className="" onSubmit={FormSubmit}>
        <label>Дата перемещения:</label>
        <input
          type="datetime-local"
          className="main__input"
          onChange={(e) => setDate(e.target.value)}
        />
        <label>Выберите мебель для перемещения:</label>
        <Select
          classNamePrefix="pinning-select"
          options={value}
          placeholder="Мебель..."
          onChange={(e) => {
            setFurniture(e.value);
            setKey(e.key);
            setId(+e.keys);
          }}
        ></Select>
        <label>Откуда</label>
        <input type="text" className="main__input" value={key} disabled />
        <label>Куда</label>
        <Select
          classNamePrefix="pinning-select"
          options={location}
          placeholder="Выбери куда будет перемещен объект"
          onChange={(e) => setCabinet(e.value)}
        ></Select>
        <label>Причина перемещения</label>
        <Select
          classNamePrefix="pinning-select"
          options={reason}
          placeholder="Причина..."
          onChange={(e) => setReason(e.value)}
        ></Select>
        <Button disabled={!valid} isActive={valid} onClick={pinningFurniture}>
          Оформить
        </Button>
        <ToastContainer />
      </form>
    </>
  );
}

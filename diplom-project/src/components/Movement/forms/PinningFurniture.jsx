import { React, useEffect, useState } from 'react';
import { reason } from 'data/data';
import Select from 'react-select';
import Button from 'components/Button/Button';
import { toast, ToastContainer } from 'react-toastify';
import { instance } from 'services/api';
import AudienceSelect from '../components/AudienceSelect';
import { useMovement } from 'context/MovementContext';

export default function PinningFurniture() {
  const { audience } = useMovement();

  const [furnitureOptions, setFurnitureOptions] = useState([]);
  const [furniture, setFurniture] = useState(null);
  const [id, setId] = useState('');

  const [date, setDate] = useState('');
  const [currentAudience, setCurrentAudience] = useState('-');
  const [selectedAudience, setSelectedAudience] = useState(null);
  const [selectedReason, setSelectedReason] = useState(null);

  const isValid =
    date !== '' &&
    furniture !== null &&
    selectedAudience !== null &&
    selectedReason !== null;

  useEffect(() => {
    const FetchData = async () => {
      let arr = [];
      await instance.get('/furniture_movement').then((res) => {
        let result = res.data;
        result.map((furniture) => {
          return arr.push({
            value: `${furniture.name} ${furniture.model}`,
            label: `${furniture.name} ${furniture.model}`,
            key: furniture.location,
            keys: furniture.furniture_id,
          });
        });
        setFurnitureOptions(arr);
      });
    };
    FetchData();
  }, []);

  const pinningFurniture = async () => {
    try {
      const [movementResponse, locationResponse] = await Promise.all([
        instance.post('/pinning-cabinet', {
          date,
          category: 'Мебель',
          type: '-',
          reason: selectedReason,
          unit: furniture,
          start: currentAudience,
          end: selectedAudience,
        }),
        instance.post('/location_furniture', {
          location: selectedAudience,
          id,
        }),
      ]);

      if (movementResponse.data.message === 'Успешное добавление') {
        toast.success('Запись успешно создана');
      }

      if (locationResponse.data.message === 'Успешное добавление') {
        toast.success('Успешное закрепление мебели за кабинетом');
        if (selectedAudience === 'Склад') {
          await instance.post('/status_furniture', {
            status: 'В резерве',
            id,
          });
        }
      }
    } catch (error) {
      toast.error('Возникла ошибка при перемещение объекта');
      console.error('Ошибка:', error);
    }
  };

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>Дата перемещения:</label>
        <input
          type="datetime-local"
          className="main__input"
          onChange={(e) => setDate(e.target.value)}
        />
        <label>Выберите мебель для перемещения:</label>
        <Select
          classNamePrefix="pinning-select"
          options={furnitureOptions}
          placeholder="Мебель..."
          onChange={(e) => {
            setFurniture(e.value);
            setCurrentAudience(e.key);
            setId(+e.keys);
          }}
        ></Select>
        <label>Откуда:</label>
        <input
          type="text"
          className="main__input"
          value={currentAudience}
          readOnly
        />
        <AudienceSelect
          options={audience}
          setState={setSelectedAudience}
          selectedAudience={selectedAudience}
        />
        <label>Причина перемещения</label>
        <Select
          classNamePrefix="pinning-select"
          options={reason}
          placeholder="Причина..."
          onChange={(e) => setSelectedReason(e.value)}
        ></Select>
        <Button
          disabled={!isValid}
          isActive={isValid}
          onClick={pinningFurniture}
        >
          Оформить
        </Button>
        <ToastContainer />
      </form>
    </>
  );
}

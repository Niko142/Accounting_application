import { React, useEffect, useState } from 'react';
import Select from 'react-select';
import { toast, ToastContainer } from 'react-toastify';
import Button from 'components/Button/Button';
import { reason } from 'data/data';
import { instance } from 'services/api';
import AudienceSelect from '../components/AudienceSelect';
import { useMovement } from 'context/MovementContext';
import { MOVEMENT_PATH } from 'constants/path';

export default function PinningForm({
  title,
  category,
  type,
  fetchUrl,
  patchUrl,
  getUnitLabel,
  unitKeyId,
}) {
  const { audience } = useMovement();

  const [options, setOptions] = useState([]);
  const [unit, setUnit] = useState(null);
  const [id, setId] = useState('');
  const [date, setDate] = useState('');
  const [currentAudience, setCurrentAudience] = useState('-');
  const [selectedAudience, setSelectedAudience] = useState(null);
  const [selectedReason, setSelectedReason] = useState(null);

  const isValid = date && unit && selectedAudience && selectedReason;

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        const res = await instance.get(`/api/${fetchUrl}`, {
          signal: abortController.signal,
        });
        const mapped = res.data.map((item) => ({
          value: getUnitLabel(item),
          label: getUnitLabel(item),
          key: item.location,
          keys: item[unitKeyId],
        }));
        setOptions(mapped);
      } catch (error) {
        if (error.name !== 'CanceledError') {
          console.error('Ошибка отправки запроса', error.message);
          throw new Error('Ошибка отправки запроса', error.message);
        }
      }
    };
    fetchData();
    return () => {
      abortController.abort();
    };
  }, [fetchUrl, getUnitLabel, unitKeyId, title]);

  const handleSubmit = async () => {
    try {
      const movementResponse = await instance.post(
        `${MOVEMENT_PATH}/pinning-audience`,
        {
          date,
          category,
          type,
          reason: selectedReason,
          unit,
          start: currentAudience,
          end: selectedAudience.value,
        },
      );

      if (movementResponse.status !== 200) {
        throw new Error(
          movementResponse.data.message ||
            'Ошибка при создании записи о перемещении',
        );
      }

      toast.success(movementResponse.data.message || 'Запись успешно создана');

      const status =
        selectedAudience.value === 'Склад' ? 'В резерве' : 'В эксплуатации';

      const locationResponse = await instance.patch(`/api/${patchUrl}/${id}`, {
        location: selectedAudience.value,
        status,
      });

      if (locationResponse.status !== 200) {
        throw new Error(
          locationResponse.data.message ||
            'Ошибка при обновлении местоположения',
        );
      }

      toast.success('Успешное закрепление за кабинетом');
    } catch (error) {
      toast.error(
        error.response?.data.message ||
          'Произошла ошибка при перемещении объекта',
      );
      console.error('Ошибка:', error);
    }
  };

  return (
    <>
      <form className="movement-form" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="date">Дата перемещения:</label>
        <input
          id="date"
          type="datetime-local"
          className="main__input"
          onChange={(e) => setDate(e.target.value)}
        />
        <label htmlFor="selectComponent">{title} для перемещения:</label>
        <Select
          inputId="selectComponent"
          classNamePrefix="pinning-select"
          options={options}
          maxMenuHeight={150}
          placeholder={title}
          onChange={(e) => {
            setUnit(e.value);
            setCurrentAudience(e.key);
            setId(+e.keys);
          }}
        />
        <AudienceSelect
          options={audience}
          setState={setSelectedAudience}
          selectedAudience={selectedAudience}
        />
        <label htmlFor="reason">Причина перемещения</label>
        <Select
          inputId="reason"
          classNamePrefix="pinning-select"
          maxMenuHeight={110}
          options={reason}
          placeholder="Причина..."
          onChange={(e) => setSelectedReason(e.value)}
        />
        <label htmlFor="currentPlace">Откуда:</label>
        <input
          id="currentPlace"
          type="text"
          className="main__input"
          value={currentAudience}
          readOnly
        />
        <Button disabled={!isValid} isActive={isValid} onClick={handleSubmit}>
          Оформить
        </Button>
        <ToastContainer />
      </form>
    </>
  );
}

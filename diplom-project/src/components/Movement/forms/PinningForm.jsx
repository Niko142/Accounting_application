import { React, useEffect, useState } from 'react';
import Select from 'react-select';
import { toast, ToastContainer } from 'react-toastify';
import Button from 'components/Button/Button';
import { reason } from 'data/data';
import { instance } from 'services/api';
import AudienceSelect from '../components/AudienceSelect';
import { useMovement } from 'context/MovementContext';

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
        const res = await instance.get(fetchUrl, {
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
        if (error.name !== 'AbortError') {
          console.log('Запрос был отменён');
        } else {
          console.error('Ошибка загрузки:', error);
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
      const movementResponse = await instance.post('/pinning-cabinet', {
        date,
        category,
        type,
        reason: selectedReason,
        unit,
        start: currentAudience,
        end: selectedAudience.value,
      });

      if (movementResponse.data.message !== 'Успешное добавление') {
        throw new Error('Ошибка при создании записи о перемещении');
      }

      toast.success('Запись успешно создана');

      const status =
        selectedAudience.value === 'Склад' ? 'В резерве' : 'В эксплуатации';

      const locationResponse = await instance.patch(patchUrl, {
        location: selectedAudience.value,
        status,
        id,
      });

      if (locationResponse.data.message !== 'Успешное добавление') {
        throw new Error('Ошибка при обновлении местоположения');
      }

      toast.success('Успешное закрепление за кабинетом');
    } catch (error) {
      toast.error('Произошла ошибка при перемещении объекта');
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
        <label>{title} для перемещения:</label>
        <Select
          classNamePrefix="pinning-select"
          options={options}
          placeholder={title}
          onChange={(e) => {
            setUnit(e.value);
            setCurrentAudience(e.key);
            setId(+e.keys);
          }}
        />
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
        />
        <Button disabled={!isValid} isActive={isValid} onClick={handleSubmit}>
          Оформить
        </Button>
        <ToastContainer />
      </form>
    </>
  );
}

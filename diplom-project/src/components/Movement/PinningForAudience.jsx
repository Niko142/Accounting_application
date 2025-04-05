import { React, useEffect, useState } from 'react';
import Button from 'components/Button/Button';
import Header from 'components/Header/Header';
import { category, type } from 'data/data';
import Select from 'react-select';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import TableContainer from 'components/UI/TableContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import {
  fetchAllStorageItems,
  pinningItemForAudience,
} from 'services/movement';
import { useMovement } from 'context/MovementContext';
import { useAudiencePinning } from './hook/useAudiencePinning';
import ObjectSelect from 'components/UI/ObjectSelect';
import AudienceSelect from './components/AudienceSelect';

export default function PinningForAudience() {
  const { filteredAudience, viewCabinetInfo } = useMovement();
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

  const [items, setItems] = useState({
    computers: [],
    laptops: [],
    screens: [],
    scanners: [],
    cameras: [],
    furniture: [],
    ventilation: [],
  });

  const [date, setDate] = useState(null);
  const [selected, setSelected] = useState(null);
  const [types, setTypes] = useState('-');
  const [selectedAudience, setSelectedAudiece] = useState(null); // Выбранная аудитория для перемещения

  const isValid = date !== null && items !== null && selectedAudience !== null;

  // Получение данных об объектах на складе
  useEffect(() => {
    const controller = new AbortController();
    fetchAllStorageItems(setItems, controller).catch((err) => {
      toast.error(err.message);
    });
    return () => controller.abort();
  }, []);

  // Получение информации о кабинетах
  useEffect(() => {
    const abortController = new AbortController();
    const loadData = async () => {
      try {
        await viewCabinetInfo(abortController.signal);
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Запрос был отменен');
        }
      }
    };
    loadData();
    return () => abortController.abort();
  }, [viewCabinetInfo]);

  // Обработчик отправки объекта в эксплуатацию
  const handleAudiencePinning = async (endpoint, itemsKey) => {
    try {
      await pinningItemForAudience({
        endpoint,
        itemsKey,
        idState: id,
        itemsState: items,
        audience: selectedAudience,
        formData: { date: date, category: selected, type: types },
      });
      toast.success('Оборудование успешно передано в эксплуатацию');
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Хук на распреление объектов по типам
  const { equipmentTypes, selectedTypes } = useAudiencePinning(
    items,
    setId,
    handleAudiencePinning,
  );

  return (
    <>
      <Header />
      <TableContainer Lg>
        <form onSubmit={(event) => event.preventDefault()}>
          <div className="pinning__title">
            <h3>Закрепление материального средства за кабинетом</h3>
            <FontAwesomeIcon
              className="navigate-back"
              icon={faArrowLeft}
              onClick={() => navigate(-1)}
            />
          </div>

          <hr className="pinning__line" />

          <div className="pinning__container">
            <article>
              <label htmlFor="date">Дата закрепления:</label>
              <input
                type="datetime-local"
                className="main__input"
                id="date"
                onChange={(e) => {
                  setDate(e.target.value);
                }}
              />
              <label htmlFor="category">Категория:</label>
              <Select
                classNamePrefix="pinning-select"
                isClearable
                options={category}
                placeholder="Выберите категорию объекта"
                onChange={(e) => setSelected(e?.value || '')}
              />
              {selected === 'Оргтехника' && (
                <>
                  <label htmlFor="type">Тип:</label>
                  <Select
                    isClearable
                    options={type}
                    id="type"
                    placeholder="Выберите тип оргтехники"
                    onChange={(e) => setTypes(e?.value || '')}
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
                />
                <label>Откуда:</label>
                <input
                  type="text"
                  defaultValue="Склад"
                  className="main__input"
                  disabled
                />
                <AudienceSelect
                  options={filteredAudience}
                  setState={setSelectedAudiece}
                />
                <Button
                  id="pinning__btn"
                  disabled={!isValid}
                  isActive={isValid}
                  onClick={equipmentTypes[types].pinningFunction}
                >
                  Отправить
                </Button>
              </article>
            )}
            {selectedTypes[selected] && (
              <article>
                <ObjectSelect
                  label={`${selected}`}
                  options={selectedTypes[selected].options}
                  setState={selectedTypes[selected].setFunction}
                />
                <AudienceSelect
                  options={filteredAudience}
                  setState={setSelectedAudiece}
                />
                <Button
                  id="pinning__btn"
                  disabled={!isValid}
                  isActive={isValid}
                  onClick={selectedTypes[selected].pinningFunction}
                >
                  Отправить
                </Button>
              </article>
            )}
          </div>
        </form>
        <ToastContainer />
      </TableContainer>
    </>
  );
}

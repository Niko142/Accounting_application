import { React, useEffect, useState } from 'react';
import Button from 'components/Button/Button';
import Header from 'components/Header/Header';
import Select from 'react-select';
import { category, type } from 'data/data';
import { toast, ToastContainer } from 'react-toastify';
import TableContainer from 'components/UI/TableContainer';
import {
  fetchAllStorageItems,
  pinningItemForAudience,
} from 'services/movement';
import { useMovement } from 'context/MovementContext';
import ObjectSelect from 'components/UI/ObjectSelect';
import AudienceSelect from '../components/AudienceSelect';
import { usePinningTypes } from 'components/hooks/usePinningTypes';
import ReturnButton from 'components/UI/ReturnButton';

export default function PinningForAudience() {
  // Отфильтрованная  информация о кабинетах
  const { filteredAudience } = useMovement();

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
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedType, setSelectedType] = useState('-');
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

  // Обработчик отправки объекта в эксплуатацию
  const handleAudiencePinning = async (endpoint, itemsKey) => {
    try {
      await pinningItemForAudience({
        endpoint,
        itemsKey,
        idState: id,
        itemsState: items,
        audience: selectedAudience,
        formData: {
          date: date,
          category: selectedCategory,
          type: selectedType,
        },
      });
      toast.success('Оборудование успешно передано в эксплуатацию');
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Хук на распреление объектов по типам
  const { equipmentTypes, selectedTypes } = usePinningTypes(
    items,
    setId,
    handleAudiencePinning,
    'location',
  );

  // Объединяем логику
  const PinningBlock = ({
    label,
    options,
    setFunction,
    pinningFunction,
    isValid,
    audienceOptions,
    setAudience,
    selectedKey,
    selectedAudience,
  }) => (
    <article>
      <ObjectSelect
        label={label}
        options={options}
        setState={setFunction}
        selectedKey={selectedKey}
      />
      <AudienceSelect
        options={audienceOptions}
        setState={setAudience}
        selectedAudience={selectedAudience}
      />
      <Button
        id="pinning__btn"
        disabled={!isValid}
        isActive={isValid}
        onClick={pinningFunction}
      >
        Отправить
      </Button>
    </article>
  );

  return (
    <>
      <Header />
      <TableContainer Lg>
        <form onSubmit={(event) => event.preventDefault()}>
          <div className="pinning__title">
            <h3>Закрепление материального средства за кабинетом</h3>
            <ReturnButton />
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
                inputId="category"
                classNamePrefix="pinning-select"
                isClearable
                options={category}
                placeholder="Выберите категорию объекта"
                onChange={(e) => setSelectedCategory(e?.value || '')}
              />
              {selectedCategory === 'Оргтехника' && (
                <>
                  <label htmlFor="type">Тип:</label>
                  <Select
                    inputId="type"
                    classNamePrefix="pinning-select"
                    isClearable
                    options={type}
                    id="type"
                    placeholder="Выберите тип оргтехники"
                    onChange={(e) => setSelectedType(e?.value || '')}
                  />
                </>
              )}
            </article>
            {equipmentTypes[selectedType] && (
              <PinningBlock
                label={selectedType}
                options={equipmentTypes[selectedType].options}
                setFunction={equipmentTypes[selectedType].setFunction}
                pinningFunction={equipmentTypes[selectedType].pinningFunction}
                isValid={isValid}
                audienceOptions={filteredAudience}
                setAudience={setSelectedAudiece}
                selectedKey={id?.[equipmentTypes[selectedType].id]}
                selectedAudience={selectedAudience}
              />
            )}
            {selectedTypes[selectedCategory] && (
              <PinningBlock
                label={selectedCategory}
                options={selectedTypes[selectedCategory].options}
                setFunction={selectedTypes[selectedCategory].setFunction}
                pinningFunction={
                  selectedTypes[selectedCategory].pinningFunction
                }
                isValid={isValid}
                audienceOptions={filteredAudience}
                setAudience={setSelectedAudiece}
                selectedKey={id?.[selectedTypes[selectedCategory].id]}
                selectedAudience={selectedAudience}
              />
            )}
          </div>
        </form>
        <ToastContainer />
      </TableContainer>
    </>
  );
}

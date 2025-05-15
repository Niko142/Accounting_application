import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from 'components/Button/Button';
import { useStorage } from 'context/StorageContext';
import { componentMap, COMPUTER_COMPONENTS_CONFIG } from '../config/config';

export default function ChangeDetailsForm({
  onSubmit,
  computerName,
  selectedObject,
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ mode: 'onSubmit' });

  const { components, loadComponents } = useStorage(); // Получение данных о комплектующих из контекста
  const [componentType, setComponentType] = useState(''); // Тип выбранного комплектующего
  const currentConfig = COMPUTER_COMPONENTS_CONFIG[componentType]; // Подборка свойств конфига под выбранный тип

  // Загрузка данных о комплектующих
  useEffect(() => {
    const abortController = new AbortController();

    Object.values(COMPUTER_COMPONENTS_CONFIG).forEach(({ componentKey }) => {
      loadComponents(componentKey, abortController.signal);
    });

    return () => abortController.abort();
  }, [componentType, loadComponents]);

  const handleChangeType = (e) => {
    setComponentType(e.target.value);
    setValue('componentType', e.target.value);
  };

  // Получение текущих данных о выбранном компоненте
  const availableOptions = components?.[currentConfig?.componentKey] || [];

  // Получение наименования текущего компонента для отображения
  const componentKey = componentMap[currentConfig?.componentKey];
  const currentComponent =
    selectedObject?.[componentKey] || 'Категория не выбрана';

  return (
    <form className="change-details__form" onSubmit={handleSubmit(onSubmit)}>
      <p className="change-details__form-title">
        Выбранный компьютер: <span>{computerName}</span>
      </p>

      <label htmlFor="date">Дата проводимой замены:</label>
      <input
        type="datetime-local"
        className="main__input"
        id="date"
        {...register('date', {
          required: 'Дата начала не выбрана',
        })}
      />

      {errors.date?.message && (
        <span className="form__error">{errors.date?.message}</span>
      )}

      <label htmlFor="category">Категория:</label>
      <select
        className="main__input"
        id="category"
        value={componentType}
        {...register('category', {
          required: 'Категория не выбрана',
        })}
        onChange={handleChangeType}
      >
        <option value="" disabled>
          -- выберите компонент для замены --
        </option>
        {Object.keys(COMPUTER_COMPONENTS_CONFIG).map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

      {errors.category?.message && (
        <span className="form__error">{errors.category?.message}</span>
      )}

      {/* Вывод наименования текущего компонента */}
      {componentType && (
        <>
          <label htmlFor="currentComponent">Текущий компонент:</label>
          <input
            type="text"
            className="main__input"
            value={currentComponent}
            disabled
          />
        </>
      )}

      {/* Выбор компонента */}
      <label htmlFor="selectedComponent">Выберите новый компонент:</label>
      <select
        className="main__input"
        id="selectedComponent"
        {...register('selectedComponent', {
          required: 'Компонент для замены не выбран',
        })}
        defaultValue=""
      >
        <option value="" disabled>
          -- выберите компонент из списка --
        </option>
        {availableOptions.map((option) => (
          <option
            key={option[currentConfig.id]}
            value={`${option[currentConfig.id]},${option.model || option.name}`}
          >
            {option.model || option.name}
          </option>
        ))}
      </select>

      {errors.selectedComponent?.message && (
        <span className="form__error">{errors.selectedComponent?.message}</span>
      )}

      <Button isActive type="submit">
        Заменить
      </Button>
    </form>
  );
}

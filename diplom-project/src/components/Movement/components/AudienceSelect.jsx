import { React } from 'react';
import Select from 'react-select';

const AudienceSelect = ({ options, setState }) => {
  const formattedOptions = options.map((audience) => ({
    value: `${audience.number}`, // Отображаем номер аудитории
    label: `Кабинет: ${audience.number}`,
    key: audience.cabinet_id, // ID
  }));

  return (
    <>
      <label htmlFor="">Куда:</label>
      <Select
        classNamePrefix="pinning-select"
        maxMenuHeight={150}
        options={formattedOptions}
        onChange={(selected) => {
          console.log('Выбранная аудитория:', selected);
          setState(selected);
        }}
        placeholder="Куда будет отправлен объект"
      />
    </>
  );
};

export default AudienceSelect;

import { React } from 'react';
import Select from 'react-select';

const AudienceSelect = ({ options, setState, selectedAudience }) => {
  const formattedOptions = options.map((audience) => ({
    value: `${audience.number}`, // Отображаем номер аудитории
    label: `Кабинет: ${audience.number}`,
    key: audience.cabinet_id, // ID
  }));

  const selectedOption =
    formattedOptions.find((opt) => opt.key === selectedAudience?.key) || null;

  return (
    <>
      <label htmlFor="">Куда:</label>
      <Select
        classNamePrefix="pinning-select"
        maxMenuHeight={150}
        options={formattedOptions}
        value={selectedOption}
        onChange={(selected) => {
          console.log('Выбранная аудитория:', selected);
          setState(selected ?? null);
        }}
        placeholder="Куда будет отправлен объект"
      />
    </>
  );
};

export default AudienceSelect;

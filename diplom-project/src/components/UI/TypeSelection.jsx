import Button from 'components/Button/Button';
import { React } from 'react';
export default function TypeSelection({ active, onChange }) {
  return (
    <div className="type__container">
      <Button
        isActive={active === 'technic'}
        onClick={() => onChange('technic')}
      >
        Оргтехника
      </Button>
      <Button
        isActive={active === 'furniture'}
        onClick={() => onChange('furniture')}
      >
        Мебель
      </Button>
      <Button
        isActive={active === 'ventilation'}
        onClick={() => onChange('ventilation')}
      >
        Система вентиляции
      </Button>
    </div>
  );
}

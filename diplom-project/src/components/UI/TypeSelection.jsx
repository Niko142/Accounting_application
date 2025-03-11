import { React } from 'react';
import Button from 'components/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCouch, faComputer } from '@fortawesome/free-solid-svg-icons';

export default function TypeSelection({ active, onChange }) {
  return (
    <div className="type__container">
      <Button
        isActive={active === 'technic'}
        onClick={() => onChange('technic')}
      >
        Оргтехника <FontAwesomeIcon size="lg" icon={faComputer} />
      </Button>
      <Button
        isActive={active === 'furniture'}
        onClick={() => onChange('furniture')}
      >
        Мебель <FontAwesomeIcon size="lg" icon={faCouch} />
      </Button>
      <Button
        isActive={active === 'ventilation'}
        onClick={() => onChange('ventilation')}
      >
        Системы вентиляции
      </Button>
    </div>
  );
}

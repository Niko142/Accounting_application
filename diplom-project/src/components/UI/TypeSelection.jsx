import { React } from 'react';
import Button from 'components/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { objectCategories } from 'data/data';

export default function TypeSelection({ active, onChange }) {
  return (
    <div className="type__container">
      {objectCategories.map((category, ind) => (
        <Button
          key={ind}
          isActive={active === category.value}
          onClick={() => onChange(category.value)}
        >
          {category.label} <FontAwesomeIcon size="lg" icon={category?.image} />
        </Button>
      ))}
    </div>
  );
}

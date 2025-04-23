import React from 'react';
import Button from 'components/Button/Button';
import { computerPartsCategories } from 'data/data';

export default function ComponentsSelection({ active, onChange }) {
  return (
    <section className="component">
      <div className="component__wrapper">
        {computerPartsCategories.map((category) => (
          <Button
            key={category.value}
            isActive={active === category.value}
            onClick={() => onChange(category.value)}
          >
            {category.label}
          </Button>
        ))}
      </div>
    </section>
  );
}

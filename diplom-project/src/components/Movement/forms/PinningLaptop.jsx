import { React } from 'react';
import PinningForm from './PinningForm';

export default function PinningLaptop() {
  // Вот
  return (
    <PinningForm
      title="Ноутбук"
      category="Оргтехника"
      type="Ноутбук"
      fetchUrl="laptops/laptops-deployed"
      patchUrl="laptops/location"
      unitKeyId="laptop_id"
      getUnitLabel={(item) => item.model}
    />
  );
}

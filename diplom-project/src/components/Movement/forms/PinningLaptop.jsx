import { React } from 'react';
import PinningForm from './PinningForm';

export default function PinningLaptop() {
  return (
    <PinningForm
      title="Ноутбук"
      category="Оргтехника"
      type="Ноутбук"
      fetchUrl="/laptop_movement"
      patchUrl="/location_laptop"
      unitKeyId="laptop_id"
      getUnitLabel={(item) => item.model}
    />
  );
}

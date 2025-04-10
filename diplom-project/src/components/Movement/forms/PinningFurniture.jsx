import { React } from 'react';
import PinningForm from './PinningForm';

export default function PinningFurniture() {
  return (
    <PinningForm
      title="Мебель"
      category="Мебель"
      type="-"
      fetchUrl="/furniture_movement"
      patchUrl="/location_furniture"
      unitKeyId="furniture_id"
      getUnitLabel={(item) => `${item.name} ${item.model}`}
    />
  );
}

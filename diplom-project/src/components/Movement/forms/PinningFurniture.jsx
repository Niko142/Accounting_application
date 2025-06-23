import { React } from 'react';
import PinningForm from './PinningForm';

export default function PinningFurniture() {
  return (
    <PinningForm
      title="Мебель"
      category="Мебель"
      type="-"
      fetchUrl="furniture/furniture-deployed"
      patchUrl="furniture/location"
      unitKeyId="furniture_id"
      getUnitLabel={(item) => `${item.name} ${item.model}`}
    />
  );
}

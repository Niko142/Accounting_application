import { React } from 'react';
import PinningForm from './PinningForm';

export default function PinningScreen() {
  return (
    <PinningForm
      title="Монитор"
      category="Оргтехника"
      type="Монитор"
      fetchUrl="/screen_movement"
      patchUrl="/location_screen"
      unitKeyId="laptop_id"
      getUnitLabel={(item) => item.model}
    />
  );
}

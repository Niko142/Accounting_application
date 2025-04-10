import { React } from 'react';
import PinningForm from './PinningForm';

export default function PinningComputer() {
  return (
    <PinningForm
      title="Компьютер"
      category="Оргтехника"
      type="Компьютер"
      fetchUrl="/computer_movement"
      patchUrl="/location_computer"
      unitKeyId="id_computer"
      getUnitLabel={(item) => item.name}
    />
  );
}

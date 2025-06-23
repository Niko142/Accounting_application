import { React } from 'react';
import PinningForm from './PinningForm';

export default function PinningComputer() {
  return (
    <PinningForm
      title="Компьютер"
      category="Оргтехника"
      type="Компьютер"
      fetchUrl="computers/computers-deployed"
      patchUrl="computers/location"
      unitKeyId="id_computer"
      getUnitLabel={(item) => item.name}
    />
  );
}

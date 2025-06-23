import { React } from 'react';
import PinningForm from './PinningForm';

export default function PinningScreen() {
  return (
    <PinningForm
      title="Монитор"
      category="Оргтехника"
      type="Монитор"
      fetchUrl="screens/screens-deployed"
      patchUrl="screens/location"
      unitKeyId="laptop_id"
      getUnitLabel={(item) => item.model}
    />
  );
}

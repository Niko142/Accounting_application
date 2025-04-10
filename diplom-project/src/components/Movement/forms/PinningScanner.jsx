import { React } from 'react';
import PinningForm from './PinningForm';

export default function PinningScanner() {
  return (
    <PinningForm
      title="МФУ"
      category="Оргтехника"
      type="МФУ"
      fetchUrl="/scanner_movement"
      patchUrl="/location_scanner"
      unitKeyId="scanner_id"
      getUnitLabel={(item) => item.nam}
    />
  );
}

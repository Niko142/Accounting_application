import { React } from 'react';
import PinningForm from './PinningForm';

export default function PinningScanner() {
  return (
    <PinningForm
      title="МФУ"
      category="Оргтехника"
      type="МФУ"
      fetchUrl="scanners/scanners-deployed"
      patchUrl="scanners/location"
      unitKeyId="scanner_id"
      getUnitLabel={(item) => item.nam}
    />
  );
}

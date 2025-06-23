import React from 'react';
import PinningForm from './PinningForm';

export default function PinningCamera() {
  return (
    <PinningForm
      title="Камера"
      category="Оргтехника"
      type="Камера"
      fetchUrl="cameras/cameras-deployed"
      patchUrl="cameras/location"
      unitKeyId="camera_id"
      getUnitLabel={(item) => item.model}
    />
  );
}

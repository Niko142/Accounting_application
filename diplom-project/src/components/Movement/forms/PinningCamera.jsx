import React from 'react';
import PinningForm from './PinningForm';

export default function PinningCamera() {
  return (
    <PinningForm
      title="Камера"
      category="Оргтехника"
      type="Камера"
      fetchUrl="/camera_movement"
      patchUrl="/location_camera"
      unitKeyId="camera_id"
      getUnitLabel={(item) => item.model}
    />
  );
}

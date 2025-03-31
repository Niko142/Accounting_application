import { React } from 'react';

import { Outlet } from 'react-router-dom';
import MovementProvider from 'context/MovementContext';

function MovementLayout() {
  return (
    <MovementProvider>
      <Outlet />
    </MovementProvider>
  );
}

export default MovementLayout;

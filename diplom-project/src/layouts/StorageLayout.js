import { React } from 'react';
import StorageProvider from 'context/StorageContext';
import { Outlet } from 'react-router-dom';

function StorageLayout() {
  return (
    <StorageProvider>
      <Outlet />
    </StorageProvider>
  );
}

export default StorageLayout;

import { React, createContext, useContext, useMemo } from 'react';

const StorageContext = createContext();
export const useStorage = () => useContext(StorageContext);

function StorageProvider({ children }) {
  const contextValue = useMemo(() => {}, []);

  return (
    <StorageContext.Provider value={contextValue}>
      {children}
    </StorageContext.Provider>
  );
}

export default StorageProvider;

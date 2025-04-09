// import { useEffect, useState } from 'react';
// import { instance } from 'services/api';

// // Проверить

// export const useStorageItems = (endpoint, fn, excludeStorage = false) => {
//   const [items, setItems] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await instance.get(endpoint);
//         const data = excludeStorage
//           ? res.data.filter((item) => item.location !== 'Склад')
//           : res.data;

//         setItems(data.map(fn));
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchData();
//   }, [endpoint, fn, excludeStorage]);

//   return items;
// };

import { useEffect, useState } from 'react';
import { instance } from 'services/api';

export const useStorageItems = ({ endpoint, excludeStorage = false }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!endpoint) return;

    const fetchData = async () => {
      try {
        const res = await instance.get(endpoint);
        const data = excludeStorage
          ? res.data.filter((item) => item.location !== 'Склад')
          : res.data;

        setItems(data);
      } catch (err) {
        console.error('Ошибка при получении данных:', err);
      }
    };

    fetchData();
  }, [endpoint, excludeStorage]);

  return items;
};

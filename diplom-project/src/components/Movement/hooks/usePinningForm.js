// import { useEffect, useState } from 'react';
// import { toast } from 'react-toastify';
// import { instance } from 'services/api';

// export const usePinningForm = ({
//   category,
//   type = '-',
//   endpoint,
//   updateLocationEndpoint,
//   statusEndpoint,
//   object, // указывает на тип объекта
// }) => {
//   const [form, setForm] = useState({
//     date: '',
//     item: '',
//     itemId: '',
//     from: '',
//     to: '',
//     reason: '',
//   });

//   const [isValid, setIsValid] = useState(false);

//   useEffect(() => {
//     const { date, item, to, reason } = form;
//     setIsValid(!!(date && item && to && reason));
//   }, [form]);

//   const updateField = (field, value) => {
//     setForm((prev) => ({ ...prev, [field]: value }));
//   };

//   const submit = async () => {
//     try {
//       const { date, item, itemId, from, to, reason } = form;

//       const movementRes = await instance.post(endpoint, {
//         date,
//         category,
//         type,
//         reason,
//         unit: item,
//         start: from,
//         end: to,
//         object, // сюда добавили
//       });

//       if (movementRes.data.message === 'Успешное добавление') {
//         toast.success('Запись успешно создана');
//       } else {
//         toast.error('Ошибка при создании записи');
//         return;
//       }

//       const locationRes = await instance.post(updateLocationEndpoint, {
//         location: to,
//         id: itemId,
//       });

//       if (locationRes.data.message === 'Успешное добавление') {
//         toast.success('Местоположение обновлено');

//         if (to === 'Склад' && statusEndpoint) {
//           await instance.post(statusEndpoint, {
//             status: 'В резерве',
//             id: itemId,
//           });
//         }
//       } else {
//         toast.error('Ошибка при закреплении');
//       }
//     } catch (err) {
//       toast.error('Ошибка: ' + err.message);
//     }
//   };

//   return {
//     form,
//     updateField,
//     isValid,
//     submit,
//   };
// };

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { instance } from 'services/api';

export const usePinningForm = ({
  category,
  type = '-',
  endpoint,
  updateLocationEndpoint,
  statusEndpoint,
  object, // например, 'furniture', 'camera', 'laptop'
}) => {
  const [form, setForm] = useState({
    date: '',
    item: '',
    itemId: '',
    from: '',
    to: '',
    reason: '',
  });

  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const { date, item, to, reason } = form;
    setIsValid(!!(date && item && to && reason));
  }, [form]);

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const submit = async () => {
    try {
      const { date, item, itemId, from, to, reason } = form;

      const movementRes = await instance.post(endpoint, {
        date,
        category,
        type,
        reason,
        unit: item,
        start: from,
        end: to,
        object, // сюда добавили
      });

      if (movementRes.data.message === 'Успешное добавление') {
        toast.success('Запись успешно создана');
      } else {
        toast.error('Ошибка при создании записи');
        return;
      }

      const locationRes = await instance.post(updateLocationEndpoint, {
        location: to,
        id: itemId,
      });

      if (locationRes.data.message === 'Успешное добавление') {
        toast.success('Местоположение обновлено');

        if (to === 'Склад' && statusEndpoint) {
          await instance.post(statusEndpoint, {
            status: 'В резерве',
            id: itemId,
          });
        }
      } else {
        toast.error('Ошибка при закреплении');
      }
    } catch (err) {
      toast.error('Ошибка: ' + err.message);
    }
  };

  return {
    form,
    updateField,
    isValid,
    submit,
  };
};

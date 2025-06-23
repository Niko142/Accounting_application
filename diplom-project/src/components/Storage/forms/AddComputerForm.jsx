import { React, useEffect, useState } from 'react';
import Button from 'components/Button/Button';
import { toast, ToastContainer } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { instance } from 'services/api';
import { COMPUTER_PATH } from 'constants/path';

export default function AddComputerForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: 'onSubmit' });

  const [components, setComponents] = useState({
    videocard: [],
    processor: [],
    mothercard: [],
    memory: [],
    disk: [],
  });

  const loadData = async (signal) => {
    try {
      // Перебор path под каждый их компонентов
      const componentMap = [
        'videocards',
        'processors',
        'mothercards',
        'memories',
        'disks',
      ];

      // Выполняем параллельные запросы по каждому из компонентов
      const requests = componentMap.map((path) =>
        instance.get(`${COMPUTER_PATH}/${path}/`, signal),
      );

      const [videocardRes, processorRes, mothercardRes, memoryRes, diskRes] =
        await Promise.all(requests);

      setComponents({
        videocard: videocardRes.data,
        processor: processorRes.data,
        mothercard: mothercardRes.data,
        memory: memoryRes.data,
        disk: diskRes.data,
      });
    } catch (err) {
      console.error('Ошибка при обработке запроса', err);
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    const signal = { signal: abortController.signal };

    loadData(signal);

    return () => {
      abortController.abort();
    };
  }, []);

  const onSubmit = async (data) => {
    try {
      const requests = [
        instance.post(`${COMPUTER_PATH}/`, {
          name: data.name,
          videocard_id: +data.videocard,
          processor_id: +data.processor,
          mothercard_id: +data.mothercard,
          memory_id: +data.memory,
          disk_id: +data.disk,
          location: 'Склад',
          status: 'В резерве',
        }),

        // Запросы на обновление компонентов (чуть поменять)
        instance.put(
          `${COMPUTER_PATH}/videocards/location/${+data.videocard}`,
          {
            location: data.name,
          },
        ),
        instance.put(
          `${COMPUTER_PATH}/processors/location/${+data.processor}`,
          {
            location: data.name,
          },
        ),
        instance.put(
          `${COMPUTER_PATH}/mothercards/location/${+data.mothercard}`,
          {
            location: data.name,
          },
        ),
        instance.put(`${COMPUTER_PATH}/memories/location/${+data.memory}`, {
          location: data.name,
        }),
        instance.put(`${COMPUTER_PATH}/disks/location/${+data.disk}`, {
          location: data.name,
        }),
      ];

      const responses = await Promise.all(requests);

      // Проверка результатов
      const successRes = responses.every((response) => response.status === 201);

      if (successRes) {
        toast.success('Компьютер и компоненты успешно обновлены');
        loadData();
        reset();
      } else {
        throw new Error('Не удалось сформировать добавление компьютера');
      }
    } catch (err) {
      console.error('Ошибка при сохранении:', err);
      toast.error(
        err.response?.data?.message || 'Произошла ошибка при сохранении данных',
      );
    }
  };

  return (
    <form className="storage__form" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name">Наименование:</label>
      <input
        className="main__input"
        id="name"
        {...register('name', {
          required: 'Поле обязательно для заполнения',
        })}
      />

      {errors.price?.name && (
        <span className="form__error">{errors.price?.name}</span>
      )}

      <label htmlFor="videocard">Видеокарта:</label>
      <select
        className="main__input"
        id="videocard"
        defaultValue={''}
        name="videocard"
        {...register('videocard', {
          required: 'Поле обязательно для заполнения',
        })}
      >
        <option disabled value="">
          . . .
        </option>
        {components.videocard.map((item, i) => {
          return (
            <option key={i} value={item.id_videocard}>
              {item.model}
            </option>
          );
        })}
      </select>

      {errors.videocard?.message && (
        <span className="form__error">{errors.videocard?.message}</span>
      )}

      <label htmlFor="processor">Процессор:</label>
      <select
        className="main__input"
        id="processor"
        name="processor"
        defaultValue={''}
        {...register('processor', {
          required: 'Поле обязательно для заполнения',
        })}
      >
        <option disabled value="">
          . . .
        </option>
        {components.processor.map((item, i) => {
          return (
            <option key={i} value={item.id_processor}>
              {item.model}
            </option>
          );
        })}
      </select>

      {errors.processor?.message && (
        <span className="form__error">{errors.processor?.message}</span>
      )}

      <label htmlFor="mothercard">Материнская плата:</label>
      <select
        className="main__input"
        id="mothercard"
        defaultValue={''}
        name="mothercard"
        {...register('mothercard', {
          required: 'Поле обязательно для заполнения',
        })}
      >
        <option disabled value="">
          . . .
        </option>
        {components.mothercard.map((item, i) => {
          return (
            <option key={i} value={item.id_mothercard}>
              {item.model}
            </option>
          );
        })}
      </select>

      {errors.mothercard?.message && (
        <span className="form__error">{errors.mothercard?.message}</span>
      )}

      <label htmlFor="memory">ОЗУ:</label>
      <select
        className="main__input"
        id="memory"
        defaultValue={''}
        name="memory"
        {...register('memory', {
          required: 'Поле обязательно для заполнения',
        })}
      >
        <option disabled value="">
          . . .
        </option>
        {components.memory.map((item, i) => {
          return (
            <option key={i} value={item.id_memory}>
              {item.model}
            </option>
          );
        })}
      </select>

      {errors.memory?.message && (
        <span className="form__error">{errors.memory?.message}</span>
      )}

      <label htmlFor="disk">Жесткий диск:</label>
      <select
        className="main__input"
        id="disk"
        defaultValue={''}
        name="disk"
        {...register('disk', {
          required: 'Поле обязательно для заполнения',
        })}
      >
        <option disabled value="">
          . . .
        </option>
        {components.disk.map((item, i) => {
          return (
            <option key={i} value={item.id_disk}>
              {item.model}
            </option>
          );
        })}
      </select>

      {errors.disk?.message && (
        <span className="form__error">{errors.disk?.message}</span>
      )}

      <Button isActive type="submit">
        Добавить
      </Button>
      <ToastContainer />
    </form>
  );
}

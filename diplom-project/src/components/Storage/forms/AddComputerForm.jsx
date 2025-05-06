import { React, useEffect, useState } from 'react';
import Button from 'components/Button/Button';
import { toast, ToastContainer } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { instance } from 'services/api';
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

  useEffect(() => {
    const abortController = new AbortController();
    const signal = { signal: abortController.signal };

    const fetchData = async () => {
      try {
        const [videocardRes, processorRes, mothercardRes, memoryRes, diskRes] =
          await Promise.all([
            instance.get('/videocard', signal),
            instance.get('/processor', signal),
            instance.get('/mothercard', signal),
            instance.get('/memory', signal),
            instance.get('/disk', signal),
          ]);

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

    fetchData();

    return () => {
      abortController.abort();
    };
  }, []);

  const onSubmit = async (data) => {
    try {
      const requests = [
        instance.post('/add_computer', {
          name: data.name,
          videocard_id: +data.videocard,
          processor_id: +data.processor,
          mothercard_id: +data.mothercard,
          memory_id: +data.memory,
          disk_id: +data.disk,
          location: 'Склад',
          status: 'В резерве',
        }),

        // Запросы на обновление компонентов
        instance.post('/update_videocard', {
          location: data.name,
          id: +data.videocard,
        }),
        instance.post('/update_processor', {
          location: data.name,
          id: +data.processor,
        }),
        instance.post('/update_mothercard', {
          location: data.name,
          id: +data.mothercard,
        }),
        instance.post('/update_memory', {
          location: data.name,
          id: +data.memory,
        }),
        instance.post('/update_disk', {
          location: data.name,
          id: +data.disk,
        }),
      ];

      const responses = await Promise.all(requests);

      // Проверка результатов
      const successRes = responses.every(
        (response) => response.data.message === 'Успешное добавление',
      );

      if (successRes) {
        toast.success('Компьютер и компоненты успешно обновлены');
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

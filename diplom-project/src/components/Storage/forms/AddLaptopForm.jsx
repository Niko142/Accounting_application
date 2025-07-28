import { React } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { toast } from 'react-toastify';
import { instance } from 'services/api';
import Button from 'components/Button/Button';
import { memoryOptions, systemOptions } from 'data/data';

export default function AddLaptopForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({ mode: 'onSubmit' });

  const memoryType = useWatch({ control, name: 'memory' });

  const onSubmit = async (data) => {
    try {
      await instance.post('/api/laptops/', {
        model: data.model,
        systems: data.system,
        videocard: data.videocard,
        processor: data.processor,
        memory: data.memory === 'custom' ? data.customMemory : data.memory,
        volume: data.volume,
        price: data.price,
        location: 'Склад',
        status: 'В резерве',
      });

      reset();
      toast.success('Ноутбук успешно добавлен на склад');
    } catch (err) {
      toast.error(
        err.response?.data?.message || 'Не удалось добавить ноутбук на склад',
      );
    }
  };

  return (
    <form className="storage__form" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="model">Модель:</label>
      <input
        type="text"
        className="main__input"
        id="model"
        {...register('model', {
          required: 'Поле обязательно для заполнения',
        })}
      />

      {errors.model?.message && (
        <span className="form__error">{errors.model?.message}</span>
      )}

      <label htmlFor="system">Операционная система:</label>
      <select
        className="main__input"
        id="system"
        {...register('system', {
          required: 'Поле обязательно для заполнения',
        })}
      >
        {systemOptions.map((item, ind) => (
          <option key={ind} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>

      {errors.system?.message && (
        <span className="form__error">{errors.system?.message}</span>
      )}

      <label htmlFor="videocard">Видеокарта:</label>
      <input
        type="text"
        className="main__input"
        id="videocard"
        {...register('videocard', {
          required: 'Поле обязательно для заполнения',
        })}
      />

      {errors.videocard?.message && (
        <span className="form__error">{errors.videocard?.message}</span>
      )}

      <label htmlFor="processor">Процессор:</label>
      <input
        type="text"
        className="main__input"
        id="processor"
        {...register('processor', {
          required: 'Поле обязательно для заполнения',
        })}
      />

      {errors.processor?.message && (
        <span className="form__error">{errors.processor?.message}</span>
      )}

      <label htmlFor="memory">Объем ОЗУ:</label>
      <select
        className="main__input"
        id="memory"
        {...register('memory', {
          required: 'Выберите объем ОЗУ',
        })}
      >
        {memoryOptions.map((item, index) => (
          <option key={index} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>

      {memoryType === 'custom' && (
        <input
          type="number"
          style={{ marginTop: '10px' }}
          className="main__input"
          placeholder="Введите объем в ГБ"
          {...register('customMemory', {
            required: 'Укажите ваш объем ОЗУ',
            validate: {
              minMemory: (v) => parseInt(v) > 0 || 'Объем должен быть больше 0',
              maxMemory: (v) =>
                parseInt(v) <= 128 || 'Объем ОЗУ превышает допустимый',
            },
          })}
        />
      )}

      {errors.memory?.message && (
        <span className="form__error">{errors.memory.message}</span>
      )}

      {errors.customMemory?.message && (
        <span className="form__error">{errors.customMemory.message}</span>
      )}

      <label htmlFor="volume">Объем жесткого диска (ГБ/ТБ):</label>
      <input
        className="main__input"
        type="text"
        id="volume"
        {...register('volume', {
          required: 'Поле обязательно для заполнения',
          pattern: {
            value: /^[0-9]+\s*(ГБ|ТБ)$/i,
            message: 'Формат: число + "ГБ" или "ТБ" (например 512 ГБ)',
          },
          validate: {
            minSize: (v) => parseInt(v) > 0 || 'Объем должен быть больше 0',
            maxSize: (v) =>
              parseInt(v) <= 999 ||
              'Недопустимый объем памяти (измени формат)!!!',
          },
        })}
      />

      {errors.volume?.message && (
        <span className="form__error">{errors.volume?.message}</span>
      )}

      <label htmlFor="price">Стоимость:</label>
      <input
        className="main__input"
        type="text"
        id="price"
        {...register('price', {
          required: 'Поле обязательно для заполнения',
          pattern: {
            value: /^[0-9]+$/,
            message: 'Неправильный формат ввода значения',
          },
        })}
      />

      {errors.price?.message && (
        <span className="form__error">{errors.price?.message}</span>
      )}

      <Button isActive type="submit">
        Добавить
      </Button>
    </form>
  );
}

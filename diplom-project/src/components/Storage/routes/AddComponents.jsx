import { React, useEffect, useState } from 'react';
import { instance } from 'services/api';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import { componentCategories, ddrOptions, memoryOptions } from 'data/data';

import Button from 'components/Button/Button';
import Header from 'components/Header/Header';
import TableContainer from 'components/UI/TableContainer';
import ReturnButton from 'components/UI/ReturnButton';

import videocardImg from 'assets/images/videocard.png';
import processorImg from 'assets/images/processor.png';
import mothercardImg from 'assets/images/mothercard.png';
import memoryImg from 'assets/images/memory.png';
import diskImg from 'assets/images/disk.png';

// Упростить структуру
export default function AddComponents() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: 'onSubmit' });
  const [category, setCategory] = useState(''); // категория компонента

  // Очищение input-полей при смене категории
  useEffect(() => {
    reset();
  }, [reset, category]);

  const onSubmit = async (formData) => {
    const payload = {
      ...formData,
      location: 'Склад',
    };

    try {
      const response = await instance.post(`/add_${category}`, payload);

      if (response.data.message === 'Успешное добавление') {
        toast.success('Успешное добавление');
        reset();
      } else {
        toast.error('Произошла ошибка при добавлении комплектующего');
      }
    } catch (err) {
      toast.error('Произошла ошибка. Попробуйте повторить позже');
      console.error(err);
    }
  };

  // Отображение картинки компонента с настройкой размеров
  const ComponentImage = ({ src, width, alt }) => {
    return (
      <div>
        <img src={src} width={width} alt={alt}></img>
      </div>
    );
  };

  return (
    <>
      <Header />
      <TableContainer>
        <ReturnButton />
        <h2 style={{ textAlign: 'center' }}>Блок добавления комплектующих</h2>
        <nav className="components-select">
          <select
            className="main__input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="" disabled>
              Выбери необходимую категорию
            </option>
            {componentCategories.map((item, ind) => {
              return (
                <option key={ind} value={item.value}>
                  {item.label}
                </option>
              );
            })}
          </select>
        </nav>
        <div className="block-input">
          {category === 'videocard' && (
            <>
              <ComponentImage
                title={'Форма для добавления видеокарты'}
                src={videocardImg}
                width={'250'}
                alt={'Видеокарта'}
              />
              <form
                className="components__form"
                onSubmit={handleSubmit(onSubmit)}
              >
                <input
                  type="text"
                  className="main__input"
                  placeholder="Модель"
                  {...register('model', {
                    required: 'Модель не указана',
                  })}
                />

                {errors.model?.message && (
                  <span className="form__error">{errors.model?.message}</span>
                )}

                <input
                  type="text"
                  className="main__input"
                  placeholder="Стоимость"
                  {...register('price', {
                    required: 'Необходимо указать стоимость',
                    pattern: {
                      value: /^[0-9]+$/,
                      message: 'Требуется числовой формат',
                    },
                    validate: {
                      minValue: (v) =>
                        parseInt(v) > 0 || 'Сумма не может равняться 0',
                    },
                  })}
                />

                {errors.price?.message && (
                  <span className="form__error">{errors.price?.message}</span>
                )}

                <Button isActive>Добавить</Button>
              </form>
            </>
          )}
          {category === 'processor' && (
            <>
              <ComponentImage
                title={'Форма для добавления процессора'}
                src={processorImg}
                width={'200'}
                alt={'Процессор'}
              />
              <form
                className="components__form"
                onSubmit={handleSubmit(onSubmit)}
              >
                <input
                  type="text"
                  className="main__input"
                  placeholder="Модель"
                  {...register('model', {
                    required: 'Модель не указана',
                  })}
                />

                {errors.model?.message && (
                  <span className="form__error">{errors.model?.message}</span>
                )}

                <input
                  type="text"
                  className="main__input"
                  placeholder="Частота"
                  {...register('rate', {
                    required: 'Частота не указана',
                    pattern: {
                      value: /^\d+\.\d$/,
                      message: 'Требуемый формат: X.X (ГГц)',
                    },
                  })}
                />

                {errors.rate?.message && (
                  <span className="form__error">{errors.rate?.message}</span>
                )}

                <input
                  type="text"
                  className="main__input"
                  {...register('price', {
                    required: 'Необходимо указать стоимость',
                    pattern: {
                      value: /^[0-9]+$/,
                      message: 'Требуется числовой формат',
                    },
                    validate: {
                      minValue: (v) =>
                        parseInt(v) > 0 || 'Сумма не может равняться 0',
                    },
                  })}
                  placeholder="Стоимость"
                />

                {errors.price?.message && (
                  <span className="form__error">{errors.price?.message}</span>
                )}

                <Button isActive>Добавить</Button>
              </form>
            </>
          )}
          {category === 'mothercard' && (
            <>
              <ComponentImage
                title={'Форма для добавления материнской платы'}
                src={mothercardImg}
                width={'250'}
                alt={'Материнская плата'}
              />
              <form
                className="components__form"
                onSubmit={handleSubmit(onSubmit)}
              >
                <input
                  type="text"
                  className="main__input"
                  placeholder="Модель"
                  {...register('model', {
                    required: 'Модель не указана',
                  })}
                />

                {errors.model?.message && (
                  <span className="form__error">{errors.model?.message}</span>
                )}

                <select
                  className="main__input"
                  {...register('type', {
                    required: 'Необходимо выбрать тип памяти',
                  })}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Выберите тип поддерживаемой памяти...
                  </option>
                  {ddrOptions.map((item, ind) => (
                    <option key={ind} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>

                {errors.type?.message && (
                  <span className="form__error">{errors.type?.message}</span>
                )}

                <input
                  type="text"
                  className="main__input"
                  placeholder="Частота"
                  {...register('rate', {
                    required: 'Частота не указана',
                    pattern: {
                      value: /^[1-9]\d{3}$/,
                      message: 'Требуемый формат: XXXX (МГц)',
                    },
                  })}
                />

                {errors.rate?.message && (
                  <span className="form__error">{errors.rate?.message}</span>
                )}

                <input
                  type="text"
                  className="main__input"
                  placeholder="Стоимость"
                  {...register('price', {
                    required: 'Необходимо указать стоимость',
                    pattern: {
                      value: /^[0-9]+$/,
                      message: 'Требуется числовой формат',
                    },
                    validate: {
                      minValue: (v) =>
                        parseInt(v) > 0 || 'Сумма не может равняться 0',
                    },
                  })}
                />

                {errors.price?.message && (
                  <span className="form__error">{errors.price?.message}</span>
                )}

                <Button isActive>Добавить</Button>
              </form>
            </>
          )}
          {category === 'memory' && (
            <>
              <ComponentImage
                title={'Форма для добавления ОЗУ'}
                src={memoryImg}
                width={'270'}
                alt={'ОЗУ'}
              />
              <form
                className="components__form"
                onSubmit={handleSubmit(onSubmit)}
              >
                <input
                  type="text"
                  className="main__input"
                  placeholder="Модель"
                  {...register('model', {
                    required: 'Модель не указана',
                  })}
                />

                {errors.model?.message && (
                  <span className="form__error">{errors.model?.message}</span>
                )}

                <select
                  className="main__input"
                  defaultValue=""
                  {...register('type', {
                    required: 'Необходимо выбрать тип памяти',
                  })}
                >
                  <option value="" disabled>
                    Выберите тип поддерживаемой памяти...
                  </option>
                  {ddrOptions.map((item, ind) => (
                    <option key={ind} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>

                {errors.type?.message && (
                  <span className="form__error">{errors.type?.message}</span>
                )}

                <select
                  className="main__input"
                  {...register('volume', {
                    required: 'Необходимо выбрать тип памяти',
                  })}
                >
                  {memoryOptions.map((item, ind) => (
                    <option key={ind} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>

                {errors.volume?.message && (
                  <span className="form__error">{errors.volume?.message}</span>
                )}

                <input
                  type="text"
                  className="main__input"
                  placeholder="Стоимость"
                  {...register('price', {
                    required: 'Необходимо указать стоимость',
                    pattern: {
                      value: /^[0-9]+$/,
                      message: 'Требуется числовой формат',
                    },
                    validate: {
                      minValue: (v) =>
                        parseInt(v) > 0 || 'Сумма не может равняться 0',
                    },
                  })}
                />

                {errors.price?.message && (
                  <span className="form__error">{errors.price?.message}</span>
                )}

                <Button isActive>Добавить</Button>
              </form>
            </>
          )}

          {category === 'disk' && (
            <>
              <ComponentImage
                title={'Форма для добавления диска'}
                src={diskImg}
                width={'320'}
                alt={'Жесткий диск'}
              />
              <form
                className="components__form"
                onSubmit={handleSubmit(onSubmit)}
              >
                <input
                  type="text"
                  className="main__input"
                  placeholder="Модель"
                  {...register('model', {
                    required: 'Модель не указана',
                  })}
                />

                {errors.model?.message && (
                  <span className="form__error">{errors.model?.message}</span>
                )}

                <input
                  type="text"
                  className="main__input"
                  placeholder="Объем"
                  {...register('volume', {
                    required: 'Необходимо указать объем диска',
                    pattern: {
                      value: /^(\d{1,4})\s(Тб|Гб)$/,
                      message: 'Формат ввода: XX Гб или XX Тб',
                    },
                  })}
                />

                {errors.volume?.message && (
                  <span className="form__error">{errors.volume?.message}</span>
                )}

                <input
                  type="text"
                  className="main__input"
                  placeholder="Стоимость"
                  {...register('price', {
                    required: 'Необходимо указать стоимость',
                    pattern: {
                      value: /^[0-9]+$/,
                      message: 'Требуется числовой формат',
                    },
                    validate: {
                      minValue: (v) =>
                        parseInt(v) > 0 || 'Сумма не может равняться 0',
                    },
                  })}
                />

                {errors.price?.message && (
                  <span className="form__error">{errors.price?.message}</span>
                )}

                <Button isActive>Добавить</Button>
              </form>
            </>
          )}
          <ToastContainer />
        </div>
      </TableContainer>
    </>
  );
}

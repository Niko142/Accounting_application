import { React } from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import { instance } from 'services/api';
import Button from 'components/Button/Button';

export default function AddFurnitureForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: 'onSubmit' });

  const onSubmit = async (data) => {
    try {
      await instance.post('/furniture', {
        name: data.name,
        model: data.model,
        price: data.price,
        location: 'Склад',
        status: 'В резерве',
      });

      reset();
      toast.success('Мебель успешно добавлена на склад');
    } catch (err) {
      toast.error(
        err.response?.data?.message || 'Не удалось добавить мебель на склад',
      );
    }
  };

  return (
    <form className="storage__form" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name">Наименование:</label>
      <input
        type="text"
        className="main__input"
        id="name"
        {...register('name', {
          required: 'Поле обязательно для заполнения',
        })}
      />

      {errors.name?.message && (
        <span className="form__error">{errors.name?.message}</span>
      )}

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

      <ToastContainer />
    </form>
  );
}

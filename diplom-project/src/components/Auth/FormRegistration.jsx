import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from 'context/AuthContext';
import { useForm, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'components/Button/Button';

const FormRegistration = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({ mode: 'onSubmit' });

  const [registrationStatus, setRegistrationStatus] = useState('');
  const password = useWatch({ control, name: 'password' }); // Отслеживание поля ввода пароля в целях сравнения значений
  const timerRef = useRef(null); // Ссылка на таймер для его очистки

  // Функция для очистки таймера
  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      clearTimer();
    };
  }, []);

  const onSubmit = async (formData) => {
    try {
      clearTimer();

      const result = await registerUser(formData.username, formData.password);

      if (result.success) {
        toast.success(result.message);
        // Задержка перед возращением в форму авторизации
        timerRef.current = setTimeout(() => {
          navigate('/auth');
          timerRef.current = null;
        }, 2000);
      } else {
        setRegistrationStatus(result.message);
        reset({
          password: '',
          confirmPassword: '',
        });
      }
    } catch (err) {
      console.error('Ошибка регистрации:', err);
      setRegistrationStatus('Произошла ошибка сервера при регистрации');
    }
  };

  return (
    <main className="main">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <button
          type="button"
          className="form__cancel"
          onClick={() => navigate(-1)}
        >
          <FontAwesomeIcon icon={faXmark} size="xl" />
        </button>
        <h2 className="form__title">Регистрация</h2>
        <p>Создайте новый аккаунт для ведения учета в системе</p>

        <input
          type="text"
          className="form__input input-username"
          name="username"
          autoComplete="off"
          placeholder="Логин"
          {...register('username', {
            required: 'Поле обязательно для заполнения',
            minLength: {
              value: 3,
              message: 'Имя слишком короткое',
            },
            maxLength: {
              value: 45,
              message: 'Имя слишком длинное',
            },
            pattern: {
              value: /^[a-zA-Z0-9_]+$/,
              message: 'Только латинские буквы, цифры и _',
            },
          })}
        />

        {errors.username?.message && (
          <span className="form__error">{errors.username?.message}</span>
        )}

        <input
          type="password"
          className="form__input input-password"
          placeholder="Пароль"
          {...register('password', {
            required: 'Поле не должно быть пустым',
            minLength: {
              value: 3,
              message: 'Пароль должен содержать минимум 3 символа',
            },
            maxLength: {
              value: 45,
              message: 'Пароль слишком длинный',
            },
          })}
        />

        {errors.password?.message && (
          <span className="form__error">{errors.password?.message}</span>
        )}

        <input
          type="password"
          className="form__input input-password"
          placeholder="Подтвердите пароль"
          {...register('confirmPassword', {
            required: 'Подтверждение пароля обязательно',
            validate: (value) => value === password || 'Пароли не совпадают',
          })}
        />

        {errors.confirmPassword?.message && (
          <span className="form__error">{errors.confirmPassword?.message}</span>
        )}

        <Button type="submit" isActive>
          Зарегистрироваться
        </Button>
        <span className="form__error error-request">{registrationStatus}</span>
      </form>
      <div className="main__box box-up"></div>
      <div className="main__box box-down"></div>
      <ToastContainer />
    </main>
  );
};

export default FormRegistration;

import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from 'context/FormAuthorization';

const FormAuthorization = () => {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm({ mode: 'onSubmit' });

  const [loginStatus, setLoginStatus] = useState();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const result = await login(data.username, data.password);

    if (result.success) {
      navigate('/main_menu');
    } else {
      setLoginStatus(result.message);
      resetField('password');
    }
  };

  return (
    <main className="main">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="form__title">Авторизация</h2>
        <p>Для того, чтобы вести учет, необходимо авторизироваться в системе</p>
        <input
          type="text"
          className="form__input input-username"
          name="username"
          placeholder="Login"
          {...register('username', {
            required: 'Поле не должно быть пустым',
            minLength: {
              value: 3,
              message: 'Имя слишком короткое',
            },
            maxLength: {
              value: 45,
              message: 'Имя слишком длинное',
            },
          })}
        />
        {errors.username?.message && (
          <span className="form__error">{errors.username?.message}</span>
        )}
        <input
          type="password"
          className="form__input input-password"
          placeholder="Password"
          {...register('password', {
            required: 'Поле не должно быть пустым',
            maxLength: { value: 45, message: 'Пароль слишком длинный' },
          })}
        />
        {errors.password?.message && (
          <span className="form__error">{errors.password?.message}</span>
        )}
        <button className="form__submit">Авторизоваться</button>
        <span className="form__error error-request">{loginStatus}</span>
      </form>
      <div className="main__box box-up"></div>
      <div className="main__box box-down"></div>
    </main>
  );
};

export default FormAuthorization;

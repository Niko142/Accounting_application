import "./FormAuthorization.css";
import Button from "../Button/Button";
import { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { CgEnter } from "react-icons/cg";

export default function FormAuthorization() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm({ mode: "onSubmit" });
  const [loginStatus, setLoginStatus] = useState("");
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    Axios.post("http://localhost:3001/login", {
      username: data.username.trim(),
      password: data.password.trim(),
    }).then((response) => {
      console.log(response);
      if (response.data.message === "Успешная авторизация") {
        navigate("/main_menu");
      } else {
        setLoginStatus(response.data.message);
      }
    });
    resetField("password");
  };

  return (
    <form className="form main" onSubmit={handleSubmit(onSubmit)}>
      <div className="sub-main">
        <h2 className="form__title sign">
            Авторизация
        </h2>
        <input
          type="text"
          className="form__input control"
          name="username"
          placeholder="Login"
          {...register("username", {
            required: "Поле не должно быть пустым",
            minLength: {
              value: 3,
              message: "Имя слишком короткое",
            },
            maxLength: {
              value: 45,
              message: "Имя слишком длинное",
            },
          })}
        />
        {errors.username?.message && (
          <span className="form_error error">{errors.username?.message}</span>
        )}
        <input
          type="password"
          className="form__input control"
          name="password"
          placeholder="Password"
          {...register("password", {
            required: "Поле не должно быть пустым",
            maxLength: { value: 45, message: "Пароль слишком длинный" },
          })}
        />
        {errors.password?.message && (
          <span className="form__error error">{errors.password?.message}</span>
        )}
        <div className="autho">
          <Button isActive type="submit">
            Авторизироваться <CgEnter />
          </Button>
        </div>
        <span style={{ color: "red" }} className="form__error">{loginStatus}</span>
      </div>
    </form>
  );
}

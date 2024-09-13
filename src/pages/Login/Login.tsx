import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

import { login } from "../../store/authSlice";
import { reqLogin } from "../../service/singinService.tsx";

import logo from "../../assets/images/logo-fitbyte-rosa.png";
import Typography from "../../components/Typography/Typography.tsx";
import {  reqGetPreferenceByUserId } from "../../service/preferenceService.tsx";
import { addPreferenceUser } from "../../store/preferenceSlice.ts";
import {  ResponseLogin } from "../../models/entities.ts";

const Login = () => {
  const [isError, setIsError] = useState({
    error: false,
    message: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const $form = document.querySelector<HTMLFormElement>("#form-login");

    if ($form) {
      const formData = new FormData($form);
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      if (email && password) {
        try {
          const response: ResponseLogin = await reqLogin(email, password);
          
          const user = response.body.data.user
          if (response.body.token) {
            dispatch(
              login({
                token: response.body.token,
                user: response.body.data.user,
              })
            
            );
              const preference = await reqGetPreferenceByUserId(user.id);
              dispatch(
                addPreferenceUser(
                  preference
                )
              )
            } else {
              setIsError({
                error: true,
                message: "No se pudo obtener la información del usuario",
              });
            }
            navigate("/user/home");
        } catch (error: any) {
          setIsError({
            error: true,
            message: error.message || "Error al iniciar sesión",
          });
        }
      } else {
        setIsError({
          error: true,
          message: "Email o contraseña no proporcionados",
        });
      }
    } else {
      console.error("El formulario no se encontró");
    }
  };

  return (
    <div className="seccion-container">
      <div className="login-container">
        <div className="login-header">
          <div className="logo flex justify-center items-center">
            <img src={logo} alt="FitByte.Logo" />
          </div>
        </div>
        <div className="login-form flex flex-col">
          <Typography variant="h2-white">Iniciar sesión</Typography>
          <Typography variant="span-light-white">
            Completa las credenciales para continuar
          </Typography>
          <form id="form-login" onSubmit={handleLogin}>
            <input
              className="input-login-form text-xl"
              type="email"
              placeholder="Email"
              name="email"
            />
            <input
              className="input-login-form text-xl"
              type="password"
              placeholder="Contraseña"
              name="password"
            />
            {isError.error && (
              <div className="bg-white/85 mb-3 mt-3 rounded-md">
                <Typography variant="span-error">{isError.message}</Typography>
              </div>
            )}
            <button className="mt-3" type="submit">
              Log In
            </button>
          </form>
          <Link to="/" className="forgot-password">
            Olvidé mi contraseña
          </Link>
          <Link to="/register" className="new-account">
            ¿Aún no tienes cuenta?
          </Link>
        </div>
      </div>
    </div>
  );
};



export default Login;

import { FormEvent } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import './Login.css'

import { login } from "../../store/authSlice";
import { reqLogin }  from "../../service/singinService.tsx"
import { User } from "../../models/index.ts";

import logo from "../../assets/images/logo-fitbyte-rosa.png"
import fondo from "../../assets/images/fondo-login.jpg"

const Login = () => {

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
          const response = await reqLogin(email, password);
          const result: LoginResponse = await response.json(); //result: {token, user}
    
          if (response.ok) {
  
            // Maneja el éxito del inicio de sesión aquí
              dispatch(
                login({
                  token: result.token || "",
                  user: result.user || null
                })
              );

              if (result.user?.rolId === 1){
                navigate("/admin/home");
              } else {
                navigate("/user/home");
              }
          } else {
            console.error("No se pudo obtener la información del usuario");
          }
        } catch (error) {
          console.error("error: ", error);
        }
      } else {
        console.error("Email o contraseña no proporcionados");
      }
    } else {
      console.error("El formulario no se encontró");
    }
  };

  return (
    <div className="seccion-container">
      <img src={fondo} className="login-background"/>
      <div className="login-container">
        <div className="login-header">
          <div className="logo">
            <img src={logo} alt="FitByte.Logo" />
          </div>
        </div>
        <div className="login-form">
          <h2>Login</h2>
          <p>Inicia sesión para continuar</p>
          <form action="" id="form-login" onSubmit={handleLogin}>
            <input type="email" placeholder="Email" name="email" />
            <input type="password" placeholder="Contraseña" name="password" />
            <button type="submit">Log In</button>
          </form>
          <a href="#" className="forgot-password">
            Olvidé mi contraseña
          </a>
          <a href="#" className="new-account">
            ¿Aún no tienes cuenta?
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;

interface LoginResponse {
  token?: string;
  user?: User;
  error? : string;
}



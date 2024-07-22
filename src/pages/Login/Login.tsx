import { FormEvent } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import "./Login.css"
import logo from "../../assets/images/logo-fitbyte-rosa.png"
const Login = () => {
  const API_BACK = "http://localhost:3000";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const $form = document.querySelector<HTMLFormElement>("#form-login");

    if ($form) {
      const formData = new FormData($form);
      const email = formData.get("email");
      const password = formData.get("password");

      const response = await fetch(`${API_BACK}/api/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      if (response.ok) {
        const user = await fetch(`${API_BACK}/api/users/email/${email}`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }).then((data) => data.json());
        dispatch(
          login({
            token: result.token,
            user: user,
          })
        );
        navigate("/user/home");
      } else {
        console.log("No se pudo iniciar sesion");
      }
    } else {
      console.error("El formulario no se encontró");
    }
  };

  return (
    <>
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
    </>
  );
};

export default Login;

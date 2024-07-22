import { FormEvent } from "react";
import { useDispatch, } from "react-redux";
import { login } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

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
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      if (response.ok) {
        const user = await fetch(`${API_BACK}/api/users/email/${email}`,{
          method: "GET",
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
          }
        }).then(data => data.json())
        dispatch(login({
          token: result.token, 
          user: user }))
        navigate('/user/home');
      } else {
        console.log("No se pudo iniciar sesion");
      }
    } else {
      console.error("El formulario no se encontró");
    }
  };

  return (
    <>
      <div>
        <h1>FitByte</h1>
        <form action="" id="form-login" onSubmit={handleLogin}>
          <label htmlFor="email">email: </label>
          <input id="email" name="email" type="email" />
          <br />
          <label htmlFor="password">contraseña: </label>
          <input id="password" name="password" type="text" />
          <br />
          <button>ENTRAR</button>
        </form>
      </div>
    </>
  );
};

export default Login;

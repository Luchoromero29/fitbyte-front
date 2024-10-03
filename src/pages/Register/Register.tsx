import { Link, useNavigate } from "react-router-dom";
import Typography from "../../components/Typography/Typography";
import InputRegister from "./InputRegister";
import { ButtonConfirmPink } from "../../components/Buttons/Buttons";
import { CreateUser, ErrorDialogI, ResponseLogin } from "../../models";
import { ChangeEvent, FormEvent, useState } from "react";
import { reqRegister } from "../../service/registerService";
import { reqLogin } from "../../service/singinService";
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice";
import { addPreferenceUser } from "../../store/preferenceSlice";
import { reqCreatePreference, reqGetPreferenceByUserId } from "../../service/preferenceService";

const Register2 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isError, setIsError] = useState<ErrorDialogI>();
  const [allOk, setAllOk] = useState<boolean>(false);
  const [createUser, setCreateUser] = useState<CreateUser>({
    name: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthdate: new Date().toISOString(),
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setCreateUser((prevCreateUser) => ({ ...prevCreateUser, [name]: value }));
  };

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (createUser.password !== createUser.confirmPassword) {
      setIsError({
        active: true,
        title: "Las contraseñas no coinciden",
        message: "",
      });
      return;
    }

    try {
      const response = await reqRegister(createUser);
      console.log(response);

      setAllOk(true);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setIsError({ active: true, title: error.message, message: "" });
      }
    }
  };

  const handleInit = async () => {
    try {
      const response: ResponseLogin = await reqLogin(
        createUser.email,
        createUser.password
      );
      console.log(response);
  
      const user = response.body.data.user;
      if (response.body.token) {
        dispatch(
          login({
            token: response.body.token,
            user: user,
          })
        );
  
        const preference = await reqGetPreferenceByUserId(user.id);
  
        dispatch(addPreferenceUser(preference));
        navigate("/user/home");
      } else {
        throw new Error("Ocurrio algun error al iniciar session")
      }
    } catch (error) {
      setIsError({
        title: "Error",
        active: true,
        message: "No se pudo obtener la información del usuario",
      });
    }
    
  };

  return (
    <div className="flex justify-center items-center w-full h-full seccion-container">
      <div className="register-container bg-light-1 p-4 rounded-lg w-80 flex flex-col gap-2">
        <header className="register-header">
          <div className="logo flex justify-center">
            <Typography variant="logo-black">Fit</Typography>
            <Typography variant="logo-pink">Byte</Typography>
            <Typography variant="logo-black">+</Typography>
          </div>
        </header>
        {allOk ? (
          <>
            <main className=" flex flex-col gap-2 justify-center items-center text-center">
              <Typography variant="h5-black">
                Cuenta creada con éxito, ya puedes iniciar sesión
              </Typography>
            </main>
            <div className="flex justify-center">
              <ButtonConfirmPink
                label="Iniciar sesión"
                onConfirm={handleInit}
                color="black"
                active={true}
              ></ButtonConfirmPink>
            </div>
          </>
        ) : (
          <>
            <main className="register-form flex flex-col gap-2">
              <form
                id="register-form"
                className="flex flex-col gap-3"
                onSubmit={handleRegister}
              >
                <InputRegister
                  label="Nombre"
                  name="name"
                  color="black"
                  onChange={handleInputChange}
                />
                <InputRegister
                  label="Apellido"
                  name="lastname"
                  color="black"
                  onChange={handleInputChange}
                />
                <InputRegister
                  label="Email"
                  type="email"
                  name="email"
                  color="black"
                  onChange={handleInputChange}
                />
                <InputRegister
                  label="Contraseña"
                  type="password"
                  name="password"
                  color="black"
                  onChange={handleInputChange}
                />
                <InputRegister
                  label="Confirmar Contraseña"
                  type="password"
                  name="confirmPassword"
                  color="black"
                  onChange={handleInputChange}
                />
                <InputRegister
                  label="Fecha de nacimiento"
                  type="date"
                  name="birthdate"
                  color="black"
                  onChange={handleInputChange}
                />
                <div className="flex justify-center items-center">
                  <ButtonConfirmPink
                    label="Registrarme"
                    onConfirm={() => {}}
                    active={true}
                    color="black"
                  />
                </div>
              </form>
              {isError && (
                <div className="bg-red-200 rounded-md p-2 shadow-md ">
                  <Typography variant="span-error">{isError.title}</Typography>
                  <Typography variant="span-error">
                    {isError.message}
                  </Typography>
                </div>
              )}
            </main>
            <footer className="flex justify-center">
              <Link to="/login" className="have-an-account">
                <Typography variant="span-light-black">
                  Ya tengo cuenta
                </Typography>
              </Link>
            </footer>
          </>
        )}
      </div>
    </div>
  );
};

export default Register2;

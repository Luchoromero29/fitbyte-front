import { Link } from "react-router-dom";
import Typography from "../../components/Typography/Typography";
import InputRegister from "./InputRegister";
import {
  ButtonConfirmPink,
} from "../../components/Buttons/Buttons";
import { CreateUser, ErrorDialogI } from "../../models";
import { ChangeEvent, FormEvent, useState } from "react";
import { reqRegister } from "../../service/registerService";


const Register2 = () => {

    const [isError, setIsError] = useState<ErrorDialogI>();
    const [createUser, setCreateUser] = useState<CreateUser>({
        name: "",
        lastname: "",
        email: "",
        password: "",
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
        try {
          const response = await reqRegister(createUser);
          const userDB = await response.json();
      
          if (!response.ok) {
            throw new Error(userDB.message || "Error en el registro");
          }
        } catch (error: unknown) {
          if (error instanceof Error) {
            setIsError({ active: true, title: error.message, message: "" });
          }
        }
      }

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
        <main className="register-form flex flex-col gap-2">
          <form id="register-form" className="flex flex-col gap-3" onSubmit={handleRegister}>
            <InputRegister label="Nombre" name="name" color="black" onChange={handleInputChange}/>
            <InputRegister label="Apellido" name="lastname" color="black" onChange={handleInputChange}/>
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
              name="confirm-password"
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
                <Typography variant="span-error">{isError.message}</Typography>
            </div>
          )}
        </main>
        <footer className="flex justify-center">
          <Link to="/login" className="have-an-account">
            <Typography variant="span-light-black">Ya tengo cuenta</Typography>
          </Link>
        </footer>
      </div>
    </div>
  );
};

export default Register2;

{
  /* <div>
<Typography variant="h3-white">Cuenta creada con éxito, ya puedes iniciar sesión</Typography>
<button>
  <Link to="/login">
    <Typography variant="span-white">Iniciar sesión</Typography>
  </Link>
</button>
</div> */
}

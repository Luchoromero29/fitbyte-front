import { Link } from "react-router-dom";
import { CreateUser } from "../../models/index.ts";

import "./Register.css";

import Logo from "../../assets/images/logo-fitbyte-violeta.png";
import Typography from "../../components/Typography/Typography";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { reqRegister } from "../../service/registerService.tsx";

const Register = () => {
  const [sectionOfRegister, setSectionOfRegister] = useState(1);
  const [sendForm, setSendForm] = useState(false);
  const [succesSendForm, setSuccesSendForm] = useState(false);

  const [user, setUser] = useState<CreateUser>({
    name: "",
    lastname: "",
    email: "",
    password: "",
    height: 0,
    weight: 0,
    birthdate: new Date().toISOString(),
    unit: "",
  });

  const [isError, setIsError] = useState({
    error: false,
    message: "",
  });

  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");

  const handleInputChangeHeight = (e: ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;
    if (/^[0-9,]*$/.test(newValue)) {
      newValue = newValue.replace(",", ".");
      setHeight(newValue);
    } else {
      setIsError({
        error: true,
        message: "La altura tiene que ser expresado en numeros",
      });
    }
  };

  const handleInputChangeWeight = (e: ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;
    if (/^[0-9,]*$/.test(newValue)) {
      newValue = newValue.replace(",", ".");
      setWeight(newValue);
    } else {
      setIsError({
        error: true,
        message: "El peso tiene que ser expresado en numeros",
      });
    }
  };

  const handleIntermediateRegister = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const $form = document.querySelector<HTMLFormElement>("#register-form-1");

    if ($form) {
      const formData = new FormData($form);

      const name = formData.get("name") as string;
      const lastname = formData.get("lastname") as string;
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
      const repeatPassword = formData.get("repeatPassword") as string;

      if (password !== repeatPassword) {
        setIsError({
          error: true,
          message: "Las contraseñas no coinciden",
        });
        return;
      }

      setUser({
        ...user,
        name,
        lastname,
        email,
        password,
      });
      setSectionOfRegister(2);
      setIsError({
        error: false,
        message: "",
      });
    }
  };

  const handleRegister = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const $form = document.querySelector<HTMLFormElement>("#register-form-2");

    if ($form) {
      const formData = new FormData($form);

      const unit = formData.get("unit") as string;
      const birthdate = formData.get("birthdate") as string;

      setUser({
        ...user,
        weight: Number(weight),
        height: Number(height),
        unit,
        birthdate: new Date(birthdate).toISOString(),
      });
      setSendForm(true);
    }
  };

  useEffect(() => {
    if (sectionOfRegister === 2) {


      const registerUser = async () => {
        try {
          const response = await reqRegister(user);

          if (response.ok) setSuccesSendForm(true);
        } catch (error: unknown) {
          setSendForm(false);
          if (error instanceof Error) {
            setIsError({
              error: true,
              message: error.message,
            });
          }
        }
      };

      registerUser();
    }
  }, [sendForm]);

  return (
    <>
      <div className="flex justify-center items-center w-full h-full seccion-container">
        <div className="register-container">
          <div className="register-header">
            <div className="logo flex justify-center">
              <img src={Logo} alt="FITBYTEM.LOGO" />
            </div>
          </div>
          <div className="register-form flex flex-col gap-2">
            {!succesSendForm ? (
              <>
                <Typography variant="h2-white">Crear una cuenta</Typography>
                <Typography variant="span-light-white">
                  Registrarse para continuar
                </Typography>
                {sectionOfRegister === 1 && (
                  <>
                    <form
                      id="register-form-1"
                      onSubmit={handleIntermediateRegister}
                    >
                      <input
                        className="input-register-form"
                        type="text"
                        placeholder="Nombre"
                        name="name"
                        required
                        defaultValue={user?.name}
                      />
                      <input
                        className="input-register-form"
                        type="text"
                        placeholder="Apellido"
                        name="lastname"
                        required
                        defaultValue={user?.lastname}
                      />
                      <input
                        className="input-register-form"
                        type="text"
                        placeholder="Email"
                        name="email"
                        required
                        defaultValue={user?.email}
                      />
                      <input
                        className="input-register-form"
                        type="password"
                        placeholder="Contraseña"
                        name="password"
                        required
                        defaultValue={user?.password}
                      />
                      <input
                        className="input-register-form"
                        type="password"
                        placeholder="Repite tu contraseña"
                        name="repeatPassword"
                        required
                        defaultValue={user?.password}
                      />
                      {isError.error && (
                        <div className="bg-white/85 mb-3 mt-3 rounded-md">
                          <Typography variant="span-error">
                            {isError.message}
                          </Typography>
                        </div>
                      )}
                      <button type="submit">
                        <Typography variant="span-light-white">
                          Siguiente
                        </Typography>
                      </button>
                    </form>
                  </>
                )}
                {sectionOfRegister === 2 && (
                  <>
                    <form
                      id="register-form-2"
                      onSubmit={handleRegister}
                      className="flex flex-col"
                    >
                      <input
                        type="text"
                        placeholder="Altura metros"
                        name="height"
                        className="input-register-form"
                        defaultValue={user?.height}
                        onChange={handleInputChangeHeight}
                      />
                      <input
                        className="input-register-form"
                        type="text"
                        placeholder="Peso Kg"
                        name="weight"
                        defaultValue={user?.weight}
                        onChange={handleInputChangeWeight}
                      />

                      <Typography variant="span-white">
                        Unidad de medida
                      </Typography>
                      <div className="flex justify-center gap-10">
                        <label className="flex justify-center items-center gap-2">
                          <Typography variant="span-light-white">Kg</Typography>
                          <input
                            type="radio"
                            name="unit"
                            value="KG"
                            className="w-4 h-4"
                          />
                        </label>
                        <label className="flex justify-center items-center gap-2">
                          <Typography variant="span-light-white">Lb</Typography>
                          <input
                            type="radio"
                            name="unit"
                            value="LB"
                            className="w-4 h-4"
                          />
                        </label>
                      </div>
                      <Typography variant="span-white">
                        Fecha de nacimiento
                      </Typography>
                      <input
                        type="date"
                        name="birthdate"
                        className="input-register-form"
                      />
                      {isError.error && (
                        <div className="bg-white/85 mb-3 mt-3 rounded-md">
                          <Typography variant="span-error">
                            {isError.message}
                          </Typography>
                        </div>
                      )}
                      <button onClick={() => setSectionOfRegister(1)}>
                        <Typography variant="span-light-white">
                          {" "}
                          Volver{" "}
                        </Typography>
                      </button>
                      <button type="submit">
                        <Typography variant="span-light-white">
                          Registrarse
                        </Typography>
                      </button>
                    </form>
                  </>
                )}
              </>
            ) : (
              <>
                <div>
                  <Typography variant="h3-white">
                    Cuenta creada con exito, ya puedes iniciar sesion
                  </Typography>
                  <button>
                    <Link to="/login">
                      <Typography variant="span-white">
                        Iniciar sesion
                      </Typography>
                    </Link>
                  </button>
                </div>
              </>
            )}

            <Link to="/login" className="have-an-account">
              <Typography variant="span-light-white">
                Ya tengo cuenta
              </Typography>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;

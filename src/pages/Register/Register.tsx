import { Link } from "react-router-dom";
import { CreateUser, CreatePreferenceUser } from "../../models";
import { ChangeEvent, FormEvent, useState } from "react";
import { reqRegister } from "../../service/registerService";
import { reqCreatePreference } from "../../service/preferenceService";
import { reqSetPreferenceId } from "../../service/userService";

import Logo from "../../assets/images/logo-fitbyte-violeta.png";
import Typography from "../../components/Typography/Typography";

import "./Register.css";

const Register = () => {
  const [section, setSection] = useState(1);
  const [succesSendForm, setSuccesSendForm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [user, setUser] = useState<CreateUser>({
    name: "",
    lastname: "",
    email: "",
    password: "",
    birthdate: new Date().toISOString(),
  });

  const [preference, setPreference] = useState<CreatePreferenceUser>({
    unitWeight: "",
    language: "ES",
    theme: "dark",
    userId: 0,
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handlePreferenceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPreference((prevPref) => ({ ...prevPref, [name]: value }));
  };

  const handleIntermediateRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user.password !== e.currentTarget.repeatPassword.value) {
      setError("Las contraseñas no coinciden");
      return;
    }
    setSection(2);
    setError(null);
  };

  const handleFinalRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await reqRegister(user);
      const result = await response.json();

      if (response.ok) {
        setSuccesSendForm(true);
        const updatedPreference = { ...preference, userId: result.id };
        const prefResponse = await reqCreatePreference(updatedPreference);
        await reqSetPreferenceId(result.id, prefResponse.id);
      } else {
        throw new Error(result.message || "Error en el registro");
      }
    } catch (error: unknown) {
      setSuccesSendForm(false);
      if (error instanceof Error) setError(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-full seccion-container">
      <div className="register-container">
        <div className="register-header">
          <div className="logo flex justify-center">
            <img src={Logo} alt="FITBYTE.LOGO" />
          </div>
        </div>
        <div className="register-form flex flex-col gap-2">
          {!succesSendForm ? (
            <>
              <Typography variant="h2-white">Crear una cuenta</Typography>
              <Typography variant="span-light-white">
                Registrarse para continuar
              </Typography>
              {section === 1 ? (
                <form id="register-form-1" onSubmit={handleIntermediateRegister}>
                  <input
                    className="input-register-form"
                    type="text"
                    placeholder="Nombre"
                    name="name"
                    required
                    value={user.name}
                    onChange={handleInputChange}
                  />
                  <input
                    className="input-register-form"
                    type="text"
                    placeholder="Apellido"
                    name="lastname"
                    required
                    value={user.lastname}
                    onChange={handleInputChange}
                  />
                  <input
                    className="input-register-form"
                    type="email"
                    placeholder="Email"
                    name="email"
                    required
                    value={user.email}
                    onChange={handleInputChange}
                  />
                  <input
                    className="input-register-form"
                    type="password"
                    placeholder="Contraseña"
                    name="password"
                    required
                    value={user.password}
                    onChange={handleInputChange}
                  />
                  <input
                    className="input-register-form"
                    type="password"
                    placeholder="Repite tu contraseña"
                    name="repeatPassword"
                    required
                  />
                  {error && (
                    <div className="bg-white/85 mb-3 mt-3 rounded-md">
                      <Typography variant="span-error">{error}</Typography>
                    </div>
                  )}
                  <button type="submit">
                    <Typography variant="span-light-white">Siguiente</Typography>
                  </button>
                </form>
              ) : (
                <form id="register-form-2" onSubmit={handleFinalRegister} className="flex flex-col">
                  {/* <input
                    type="text"
                    placeholder="Altura metros"
                    name="height"
                    className="input-register-form"
                    value={user.height}
                    onChange={handleInputChange}
                  />
                  <input
                    className="input-register-form"
                    type="text"
                    placeholder="Peso Kg"
                    name="weight"
                    value={user.weight}
                    onChange={handleInputChange}
                  /> */}

                  <Typography variant="span-white">Unidad de medida</Typography>
                  <div className="flex justify-center gap-10">
                    <label className="flex justify-center items-center gap-2">
                      <Typography variant="span-light-white">Kg</Typography>
                      <input
                        type="radio"
                        name="unitWeight"
                        value="KG"
                        className="w-4 h-4"
                        onChange={handlePreferenceChange}
                      />
                    </label>
                    <label className="flex justify-center items-center gap-2">
                      <Typography variant="span-light-white">Lb</Typography>
                      <input
                        type="radio"
                        name="unitWeight"
                        value="LB"
                        className="w-4 h-4"
                        onChange={handlePreferenceChange}
                      />
                    </label>
                  </div>
                  <Typography variant="span-white">Fecha de nacimiento</Typography>
                  <input
                    type="date"
                    name="birthdate"
                    className="input-register-form"
                    value={new Date(user.birthdate).toISOString().substring(0, 10)}
                    onChange={handleInputChange}
                  />
                  {error && (
                    <div className="bg-white/85 mb-3 mt-3 rounded-md">
                      <Typography variant="span-error">{error}</Typography>
                    </div>
                  )}
                  <button onClick={() => setSection(1)}>
                    <Typography variant="span-light-white"> Volver </Typography>
                  </button>
                  <button type="submit">
                    <Typography variant="span-light-white">Registrarse</Typography>
                  </button>
                </form>
              )}
            </>
          ) : (
            <div>
              <Typography variant="h3-white">Cuenta creada con éxito, ya puedes iniciar sesión</Typography>
              <button>
                <Link to="/login">
                  <Typography variant="span-white">Iniciar sesión</Typography>
                </Link>
              </button>
            </div>
          )}
          <Link to="/login" className="have-an-account">
            <Typography variant="span-light-white">Ya tengo cuenta</Typography>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;

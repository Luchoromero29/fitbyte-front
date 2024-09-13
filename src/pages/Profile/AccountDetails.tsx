import { useDispatch, useSelector } from "react-redux";
import HeaderPage from "../../components/HeaderPage";
import { RootState } from "../../store";
import ItemAccount from "../../components/Profile/ItemAccount";
import { useEffect, useState } from "react";
import { ButtonConfirmViolet } from "../../components/Buttons/Buttons";
import { reqGetUserById, reqUpdateUserId } from "../../service/userService";
import { updateUser } from "../../store/authSlice";
import { User } from "../../models";
import ModifyBirthdateDialog from "../../components/Profile/ModifyBirthdateDialog";

const AccountDetails = () => {
  const dispatch = useDispatch();
  
  const userSession = useSelector((state: RootState) => state.auth.user);
  const preferenceUser = useSelector((state: RootState) => state.preferenceUser)

  const [user, setUser] = useState<User>();
  const [birthday, setBirthday] = useState<string>();
  const [isModify, setIsModify] = useState<boolean>(false);
  const [showModifyDate, setShowModifyDate] = useState<boolean>(false);
  const [isModifyDate, setIsModifyDate] = useState<boolean>(false);

  const dateToString = (birthdate: string | undefined) => {
    if (birthdate) {
      const birthdateDate = new Date(birthdate);
      const day = birthdateDate.getDate() + 1;
      const month = birthdateDate.getMonth() + 1;
      const year = birthdateDate.getFullYear();
      setBirthday(`${day} / ${month} / ${year}`);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      if (userSession) {
        const response = await reqGetUserById(userSession.id);

        
        setUser(response);
      }
    };
    getUser();
  }, [isModify, userSession]);

  useEffect(() => {
    if (user) {
      dateToString(user.birthdate);
    }
  }, [user]);

  const handleNameChange = (name: string) => {
    setIsModify(true);
    if (user) setUser({ ...user, name: name });
  };
  const handleLastNameChange = (lastName: string) => {
    setIsModify(true);
    if (user) setUser({ ...user, lastname: lastName });
  };

  useEffect(() => {}, [isModify]);

  const handleUpdateUser = async () => {
    try {
      if (!user) return;
      
      const userUpdated = await reqUpdateUserId(user);

      dispatch(updateUser(userUpdated));
      setIsModify(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect( () => {
    if (isModifyDate) {
      console.log("se ejecuto");
      
      handleUpdateUser();
      setShowModifyDate(false);
      setIsModifyDate(false)
    }
  }, [isModifyDate]);

  const handleConfirmModifyDate = async (date: string) => {
    console.log(date);
    if (user) {
      setUser({ ...user, birthdate: date });
      setIsModifyDate(true)
    }
  };

  return (
    <>
      <div className="flex flex-col">
        <HeaderPage title="Mi cuenta" path="/user/profile" />
        <main className="p-6 flex flex-col gap-3">
          <ItemAccount
            label="Nombre"
            type="text"
            value={user?.name}
            modifiable={true}
            onChange={handleNameChange}
          />
          <ItemAccount
            label="Apellido"
            type="text"
            value={user?.lastname}
            modifiable={true}
            onChange={handleLastNameChange}
          />
          <ItemAccount
            label="Email"
            type="text"
            value={user?.email}
            modifiable={false}
          />
          <div onClick={() => setShowModifyDate(true)}>
            <ItemAccount
              label="Fecha de nacimiento"
              type="text"
              value={birthday}
              modifiable={false}
            />
          </div>
          <ItemAccount
            label="Cambiar Contraseña"
            type="text"
            value={""}
            modifiable={false}
          />
        </main>
        <footer className="flex justify-center items-center">
          {isModify ? (
            <ButtonConfirmViolet
              label="Guardar"
              onConfirm={handleUpdateUser}
              active={isModify}
              color={preferenceUser?.theme === "dark" ? "white" : "black"}
            />
          ) : null}
        </footer>
        {showModifyDate && (
          <ModifyBirthdateDialog
            title="Selecciona tu fecha de nacimiento"
            message=""
            onCancel={() => setShowModifyDate(false)}
            onConfirm={handleConfirmModifyDate}
            active={showModifyDate}
          />
        )}
      </div>
    </>
  );
};

export default AccountDetails;

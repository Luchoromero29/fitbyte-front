import { useSelector } from "react-redux";
import HeaderPage from "../../components/HeaderPage"
import { RootState } from "../../store";

const Configuration = () => {


    const preference = useSelector((state: RootState) => state.preferenceUser);



  return (
    <>
        <div>
            <header>
                <HeaderPage title="Configuración" path="/user/profile"/>
            </header>
            <main>
                
            </main>
        </div>
    </>
  )
}

export default Configuration
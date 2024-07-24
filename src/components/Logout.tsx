
import { reqLogout } from "../service/singinService"
import { useNavigate } from "react-router-dom";

const Logout = () => {

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response  = await reqLogout();
    
            if(response.ok) {
                console.log("cierre de session exitoso")
                navigate("/login");
            }
        } catch (error) {
            console.error("error al cerrar sesion: ", error )
        }
    }

    return (
    <div>
        <button onClick={handleLogout}>
            Logout
        </button>

    </div>
  )
}

export default Logout
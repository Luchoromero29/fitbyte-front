
import { reqLogout } from "../service/singinService"
import { useNavigate } from "react-router-dom";
import Typography from "./Typography/Typography";
import { useState } from "react";
import AlertDialog from "./Modal/AlertDialog";

const Logout = () => {

    const navigate = useNavigate();

    const [showDialog, setShowDialog] = useState(false);

    const handleLogout = async () => {
        try {
            const response  = await reqLogout();
    
            if(response.ok) {
                setShowDialog(false)
                navigate("/login");
            }
        } catch (error) {
            setShowDialog(false)
            console.error("error al cerrar sesion: ", error )
        }
    }

    return (
    <div className="w-full flex justify-end ">
        <button className="bg-danger p-3 rounded-md shadow-md" onClick={() => setShowDialog(true)}>
            <Typography variant="span-white">Cerrar sesion </Typography>
        </button>
        {showDialog && (
            <AlertDialog 
                title="Esta seguro que desea cerrar sesion?"
                message="Al cerrar sesion no perdera lo que haya modificado, y tendra que volver a iniciar sesion la proxima vez que desee ingresar"
                onConfirm={handleLogout}
                onCancel={() => setShowDialog(false)}
                active={showDialog}
            />
        )}
    </div>
  )
}

export default Logout
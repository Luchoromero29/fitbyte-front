import { RootState } from "../store"
import { useSelector} from "react-redux"

const Home = () => {

  const user = useSelector((state: RootState) => state.auth.user)

  return (
    <div>Hola {user?.name}</div>
  )
}

export default Home
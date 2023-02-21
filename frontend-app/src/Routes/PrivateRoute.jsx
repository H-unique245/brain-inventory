import { useContext } from "react";
import { Navigate} from 'react-router-dom';
import { AuthContext } from "../Components/AuthContext";
function PrivateRoute({children}) {
     // logic to check if a user is auth
  const { state } = useContext(AuthContext);
        // const navigate = useNavigate();

      if(!state.isAuth){
       return<Navigate to="/login"/>
      }else{

          return (children)
      }
}

export default PrivateRoute
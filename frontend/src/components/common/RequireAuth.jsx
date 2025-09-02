import  { useContext } from 'react'
import { AuthContext } from '../backend/context/Auth'
import {Navigate} from 'react-router-dom'

function RequireAuth({children}) {
    const {user,login}=useContext(AuthContext);
    if(!user){
        return <Navigate to='/admin/login'/>
    }
    
  return children;
}

export default RequireAuth

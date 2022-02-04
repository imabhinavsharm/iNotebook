import React,{useState} from 'react';
import AuthContext from './authContext';
const AuthState = (props) => {
    const [isauthenticated, setisauthenticated] = useState(false);
  return (
    < AuthContext.Provider value={{isauthenticated,setisauthenticated}}>
    {props.children}
    </AuthContext.Provider>
  )
};

export default AuthState;


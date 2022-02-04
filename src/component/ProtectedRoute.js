import React from 'react';
import { Route,Redirect } from 'react-router-dom';
const ProtectedRoute = ({auth,Component:Component,...rest}) => {
    return(
        <Route {...rest} render={(props)=>{
            if(auth){
                return <Component{...props}/>
            } else{
                return <Redirect to={{pathname:"/login",state:{auth:"helllocbeevfv"}}}/>
            }
            // if(!auth) return <Redirect to={{path:"/login",state:{from:props.location}}}/>
        }}/>
    )
};

export default ProtectedRoute;

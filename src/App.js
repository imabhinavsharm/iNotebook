import React,{useContext} from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Navbar from './component/Navbar'
import Home from './component/Home'
import About from './component/About'
import NoteState from "./context/notes/NoteState";
import Alert from "./component/Alert";
import Login from "./component/Login";
import Signup from "./component/Signup";
import ProtectedRoute from "./component/ProtectedRoute";
import AuthContext from "./context/notes/auth/authContext";
function App() {
const context = useContext(AuthContext)
const {isauthenticated} = context
  return (
    <>
      <Router>
        <Navbar />
        <Alert message={"message here"} />
        <div className="container">
          <NoteState>
            <Switch>
              <Route exact path="/about">
                <About />
              </Route>
              {
                isauthenticated===false
                ?
              <Route exact path="/Login"
               render={()=><Login myprops={isauthenticated}/>}>
              </Route>
              :
              <ProtectedRoute exact path="/Login" Component={Home} auth={isauthenticated} />
              }
              <Route exact path={"/Signup"}>
                <Signup />
              </Route>
              <ProtectedRoute exact path="/Home" Component={Home} auth={isauthenticated} />
            </Switch>
          </NoteState>
        
        </div>
      </Router>
      

    </>
  );
}

export default App;

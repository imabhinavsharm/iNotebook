import React,{useContext} from 'react';
import Notes from './Notes';
import AuthContext from '../context/notes/auth/authContext'
const Home = () => {
    const context = useContext(AuthContext)
    const {isauthenticated}=context
    return (
        <>
            <Notes/>
        </>
    )
}

export default Home

import React, { useRef, useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom';
import { useHistory,Redirect } from 'react-router-dom/cjs/react-router-dom.min'
import AuthContext from '../context/notes/auth/authContext';
const Login = (props) => {
    // console.log(props.myprops);
    const context = useContext(AuthContext)
    const { isauthenticated, setisauthenticated } = context
    const [minutes, setMinutes] = useState(1);
    const [seconds, setSeconds] = useState(0);
    var date = new Date().getTime() / 100
    const prevCountRef = useRef()

    useEffect(() => {
        let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(myInterval)
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            }
        }, 1000)
        return () => {
            clearInterval(myInterval);
        };
    }, [date]);
    useEffect(() => {
        prevCountRef.current = countLogin;
    });
    const prevCount = prevCountRef.current;
    const [countLogin, setcountLogin] = useState(0);
    var userEmail = ''
    var userPassword = ''
    const [user, setuser] = useState({ email: userEmail, password: userPassword })
    const [errosInput, seterrosInput] = useState({ email: "", password: "", submit: "" })
    let history = useHistory()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const { email, password } = user
        if (email && password) {
            if (email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
                const response = await fetch('http://localhost:3001/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password })
                })
                const json = await response.json()
                if (json.status !== "true") {
                    setcountLogin(prevCount + 1)
                    if (countLogin === 4) {
                        seterrosInput({ submit: "" })
                        setMinutes(1)
                        setSeconds(0)
                        setTimeout(() => {
                            setcountLogin(0)
                            seterrosInput({ submit: "" })
                            setMinutes(1)
                            setSeconds(0)
                        }, 60000);
                    } else {
                        seterrosInput({ submit: "Please fill the valid email or password" })
                    }
                } else {
                    localStorage.setItem("authToken", json.authtoken);
                    setisauthenticated(true)
                    setTimeout(() => {
                        history.push("/Home")

                    }, 1000);
                }
            } else {
                seterrosInput({ email: "Please fill the valid email" })
            }
        } else {
            if (!email && !password) {
                seterrosInput({ email: "Please fill the email", password: "Please fill the password" })
            } else if (!email) {
                seterrosInput({ email: "Please fill the email" })
            } else {
                seterrosInput({ password: "Please fill the password" })
            }
        }
    }
    const onChange = (e) => {
        setuser({ ...user, [e.target.name]: e.target.value })
        seterrosInput({ email: "", password: "", submit: "" })
    }
    return (
        <div className='container my-3'>
            <h3>Login to Add Notes</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="text" className="form-control" id="exampleInputEmail1"
                        name='email' aria-describedby="emailHelp"
                        onChange={onChange}
                        value={user.email}
                    />
                </div>
                <p style={{ color: "red" }}>{errosInput.email}</p>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" name='password'
                        onChange={onChange}
                        value={user.password}
                    />
                </div>

                {countLogin === 5
                    ?
                    <>
                        <button type="submit" disabled className="btn btn-primary">Submit</button>
                        <p style={{ color: "red" }} className='my-2'>It seems to you have a trouble to login <br />
                        You can try again after {minutes}:{seconds < 10 ? `0${seconds}` : seconds} Seconds.</p>
                    </>
                    :
                         <button type="submit" className="btn btn-primary">Submit</button>
                }
                {
                    isauthenticated
                         ?
                        <p style={{ color: "green" }} className='my-2'>User is verified</p> 
                         :
                        <p style={{ color: "red" }} className='my-2'>{errosInput.submit}</p>
                }

            </form>

        </div>

    )

}
export default Login

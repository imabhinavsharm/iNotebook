import React, { useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const Signup = () => {
    const [user, setuser] = useState({name:'' ,email: '', password: '' })
    const [errosInput, seterrosInput] = useState({ name:'',email: "", password: "", submit: "" })
    let history = useHistory()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const { name,email, password } = user
        if (name&&email && password) {
            if (email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {

                const response = await fetch('http://localhost:3001/api/auth/createUser', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name,email, password })
                })
                const json = await response.json()

                if (json.status !== "true") {
                    console.log(json.status);
                    seterrosInput({ submit: "User already exist" })
                } else {
                    seterrosInput({ submit: "User sucessfully created" })
                    localStorage.setItem("authToken", json.authtoken);
                    // localStorage.setItem("authToken", json.authtoken);
                    // setTimeout(() => {
                        
                        history.push({
                            pathname:"/",

                        })

                    // }, 1000);
                }
            } else {
                seterrosInput({ email: "Please fill the valid email" })
            }

        } else {
            if (!email && !password&&!name) {
                seterrosInput({ name:"Please fill the Name",email: "Please fill the email", password: "Please fill the password" })
            } else if (!email) {
                seterrosInput({ email: "Please fill the email" })
                if(!name){
                    seterrosInput({name: "Please fill the Name" , email: "Please fill the email" })
                }else if(!password){
                    seterrosInput({password: "Please fill the password" , email: "Please fill the email" })
                }
            } else if(!name) {
                seterrosInput({ name: "Please fill the Name" })
                if(!email){
                    seterrosInput({name: "Please fill the Name" , email: "Please fill the email" })
                }else if(!password){
                    seterrosInput({ name: "Please fill the Name",password: "Please fill the password" })
                }
            } else if(!password) {
                seterrosInput({ password: "Please fill the password" })
                if(!name){
                    seterrosInput({ name: "Please fill the Name",password: "Please fill the password" })
                }else if(!email){
                    seterrosInput({password: "Please fill the password" , email: "Please fill the email" })
                }
            }
        }
    }
    const onChange = (e) => {
        seterrosInput({ name:'',email: "", password: "", submit: "" })
        setuser({ ...user, [e.target.name]: e.target.value })
    }
    
   
    return (
        <div className='container my-3'>
          
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                    <input type="text" className="form-control" id="exampleInputName"
                        name='name' aria-describedby="emailHelp"
                        onChange={onChange}
                        // onClick={focusName}
                    />
                </div>
                <p style={{ color: "red" }}>{errosInput.name}</p>

                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="text" className="form-control" id="exampleInputEmail1"
                        name='email' aria-describedby="emailHelp"
                        onChange={onChange}
                        // onClick={focusEmail}
                    />
                </div>
                <p style={{ color: "red" }}>{errosInput.email}</p>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" name='password'
                        onChange={onChange}
                        // onClick={focusPassword}
                    />
                </div>
                <p style={{ color: "red" }}>{errosInput.password}</p>
                <button type="submit" className="btn btn-primary">Submit</button>
                {
                    errosInput.submit === "User sucessfully Created" ?
                        <p style={{ color: "green" }} className='my-4'>{errosInput.submit}</p> :
                        <p style={{ color: "red" }} className='my-4'>{errosInput.submit}</p>
                }

            </form>
        </div>
    )
}
    

export default Signup

import React from "react";
import './loginBox.css'
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
const LoginBox = () => {
    const navigate = useNavigate();
    const [loginCreds, setLoginCreds] = useState({
        email: '',
        password: ''
    })
    function handleChange(event) {
        const {name,value} = event.target;
        setLoginCreds((prevData)=>{
            return {
                ...prevData,
                [name]:value
            }
        })
    }
    const handleLogin = async () =>{
        try{
            const res = await axios.post("http://localhost:3000/auth/login",{
                email:loginCreds.email,
                password: loginCreds.password
            },{
                withCredentials: true,
            });
            navigate("/");
            console.log(res);

        }
        catch(err){
            console.log(err);
        }
    }
    return (
        <div className="loginContainer">
            <div className="loginBox">
                <input name="email"
                    type="email"
                    placeholder="Email"
                    value={loginCreds.email}
                    onChange={handleChange}>

                </input>
                <input name="password"
                    type="password"
                    placeholder="Password"
                    value={loginCreds.password}
                    onChange={handleChange}>

                </input>
                <button type="button" 
                onClick={handleLogin}
                class="btn btn-outline-primary loginButton">Login</button>
            </div>
        </div>
    );

}
export default LoginBox;
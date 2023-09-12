import React from "react";
import './loginBox.css'
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { faUser, faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import bcryptjs from 'bcryptjs';
const LoginBox = () => {
    const URL = process.env.REACT_APP_WEB_URL;
    const navigate = useNavigate();
    const saltRounds = 10;
    const [loginCreds, setLoginCreds] = useState({
        email: '',
        password: ''
    })
    function handleChange(event) {
        const { name, value } = event.target;
        setLoginCreds((prevData) => {
            return {
                ...prevData,
                [name]: value
            }
        })
    }
    const handleLogin = async () => {
        try {
            console.log(`${URL}/auth/login`);

            const res = await axios.post(`${URL}/auth/login`, {
                email: loginCreds.email,
                password: loginCreds.password
            }, {
                withCredentials: true,
            });
            navigate("/");
            console.log(res);

        }
        catch (err) {
            console.log(err);
        }
    }
    return (
        <div className="loginContainer">
            <div className="loginBox">
                <FontAwesomeIcon className="icon fa-solid m-3" icon={faUser} size="2xl" />
                <div className="dateContainer align-items-center mr-3 justify-content-center">
                    <span className="align-items-center">
                        <FontAwesomeIcon className="icon fa-solid align-items-center" icon={faEnvelope} size="lg" />
                    </span>
                    <input name="email"
                        type="email"
                        placeholder="Email"
                        value={loginCreds.email}
                        className="form-control"
                        onChange={handleChange}>

                    </input>
                </div>
                <div className="dateContainer align-items-center mb-2 justify-content-center">
                    <span className="align-items-center">
                        <FontAwesomeIcon className="icon fa-solid" icon={faKey} size="lg" />
                    </span>
                    <input name="password"
                    type="password"
                    placeholder="Password"
                    value={loginCreds.password}
                    className="form-control"
                    onChange={handleChange}>

                </input>
                </div>

                

                <button type="button"
                    onClick={handleLogin}
                    class="btn btn-outline-primary loginButton">Login</button>
            </div>
        </div>
    );

}
export default LoginBox;
import React from "react";
import './signUpBox.css'
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { faUser, faEnvelope, faUserTie, faUnlock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import bcryptjs from 'bcryptjs';
const SignUpBox = () => {
    const navigate = useNavigate();
    const [signupCreds, setSignupCreds] = useState({
        name: '',
        email: '',
        password: ''
    })
    function handleChange(event) {
        const { name, value } = event.target;
        setSignupCreds((prevData) => {
            return {
                ...prevData,
                [name]: value
            }
        })
    }
    const handleSignup = async () => {
      
        try {
            const saltRounds = 10;
            const hashedPassword = await bcryptjs.hash(signupCreds.password, saltRounds);
            const res = await axios.post("http://localhost:3000/auth/register", {
                name: signupCreds.name,
                email: signupCreds.email,
                password: hashedPassword
            });
            navigate("/login");
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
                        <FontAwesomeIcon className="icon fa-solid align-items-center" icon={faUserTie} size="lg" />
                    </span>
                    <input className="form-control" 
                    name="name"
                    type="text"
                    placeholder="Name"
                    value={signupCreds.name}
                    onChange={handleChange}>

                

                    </input>
                </div>
                <div className="dateContainer align-items-center mr-3 justify-content-center">
                    <span className="align-items-center">
                        <FontAwesomeIcon className="icon fa-solid align-items-center" icon={faEnvelope} size="lg" />
                    </span>
                    <input name="email"
                    className="form-control"
                    type="email"
                    placeholder="Email"
                    value={signupCreds.email}
                    onChange={handleChange}>

                </input>
                </div>
                <div className="dateContainer align-items-center mr-3 justify-content-center mb-2">
                    <span className="align-items-center">
                        <FontAwesomeIcon className="icon fa-solid align-items-center" icon={faUnlock} size="lg" />
                    </span>
                    <input name="password"
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={signupCreds.password}
                    onChange={handleChange}>

                </input>
                </div>


                {/* <input name="name"
                    type="text"
                    placeholder="Name"
                    value={signupCreds.name}
                    onChange={handleChange}>

                </input>
                <input name="email"
                    type="email"
                    placeholder="Email"
                    value={signupCreds.email}
                    onChange={handleChange}>

                </input>
                <input name="password"
                    type="password"
                    placeholder="Password"
                    value={signupCreds.password}
                    onChange={handleChange}>

                </input> */}
                {/* <button type="button"
                    onClick={handleSignup}
                    class="btn btn-outline-primary loginButton">Register</button> */}
                <button onClick={handleSignup} type="button" class="btn btn-outline-primary loginButton">Register</button>
            </div>
            
        </div>
    );

}
export default SignUpBox;
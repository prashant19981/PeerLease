import React from "react";
import './signUpBox.css'
import { useState } from "react";
import axios from 'axios';
const SignUpBox = () => {
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
            const res = await axios.post("http://localhost:3000/auth/register", {
                name: signupCreds.name,
                email: signupCreds.email,
                password: signupCreds.password
            });
            console.log(res.status);
        }
        catch (err) {
            console.log(err);
        }
    }
    return (
        <div className="loginContainer">
            <div className="loginBox">
                <input name="name"
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

                </input>
                <button type="button"
                    onClick={handleSignup}
                    class="btn btn-outline-primary loginButton">Register</button>
            </div>
        </div>
    );

}
export default SignUpBox;
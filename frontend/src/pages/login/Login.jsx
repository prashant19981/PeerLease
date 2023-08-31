import { useState } from 'react';
import LoginBox from '../../components/loginBox/LoginBox';
import './login.css'
import Navbar from '../../components/navbar/Navbar';
import logo from './logo.png';
const Login = () => {

    return (
        <div>
            <Navbar></Navbar>
            <div className="header">
                {/* <h1>Login to PeerLease</h1> */}
                <img src={logo} alt='Not Accesible' />

            </div>
            <LoginBox></LoginBox>
        </div>
    );

}

export default Login;
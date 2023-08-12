import { useState } from 'react';
import LoginBox from '../../components/loginBox/LoginBox';
import './login.css'
import Navbar from '../../components/navbar/Navbar';
const Login = () => {
    
    return (
        <div>
            <Navbar></Navbar>
            <div className="header">
                <img src='../' alt='Not Accesible'/>
                <h1>Login to PeerLease</h1>
            </div>
            <LoginBox></LoginBox>
        </div>
    );

}

export default Login;
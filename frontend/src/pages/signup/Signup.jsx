import React from "react";
import SignUpBox from '../../components/signupBox/SignUpBox';
import './signup.css'
import Navbar from '../../components/navbar/Navbar';
import logo from './logo.png';
const Signup = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className="header">
                {/* <img src='../' alt='Not Accesible'/> */}

                
                    {/* <h1>Login to PeerLease</h1> */}
                    <img src={logo} alt='Not Accesible' />

                </div>


         
            <SignUpBox></SignUpBox>
        </div>
    );
}
export default Signup;
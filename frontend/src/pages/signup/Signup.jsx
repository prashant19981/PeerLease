import React from "react";
import SignUpBox from '../../components/signupBox/SignUpBox';
import './signup.css'
const Signup = () =>{
    return (
        <div>
            <div className="header">
                <img src='../' alt='Not Accesible'/>
                <h1>Sign up to PeerLease</h1>
                
            </div>
            <SignUpBox></SignUpBox>
        </div>
    );
}
export default Signup;
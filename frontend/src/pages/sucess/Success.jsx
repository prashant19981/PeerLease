import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useLocation, useNavigate } from "react-router-dom"; // Taken from NPM router dom documentation. Found at:https://www.npmjs.com/package/react-router-dom
import './success.css';
const Success = () => {
    const location = useLocation();
    const message = location.state.message;
    const navigate = useNavigate();
    const handleHome = ()=>{
     navigate("/");
    }
    return (
        <div>
            <Navbar></Navbar>
            <Header></Header>
            <div className="successContainer">

                
                <FontAwesomeIcon className="icon mt-4" icon={faCircleCheck} beatFade size="2xl" />
                <h4 className="mt-4">Property {message} successfully!</h4>
                <div className="mt-4">
                <button onClick={handleHome} class="btn btn-outline-success mb-4" type="submit" >Back to Home</button>
                </div>
                
            </div>
        </div>
    );
}
export default Success;
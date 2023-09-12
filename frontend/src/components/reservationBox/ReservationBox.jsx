import React, { useEffect, useState } from "react";
import './reservationBox.css';
import { faCalendarDays, faMoneyBill1Wave, faFileInvoice } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ReservationBox = (props) => {
    const [isReserved, setIsReserved] = useState(false);
    const [isApproved, setIsApproved] = useState(false);
    const [loadingAnimation, setLoadingAnimation] = useState(false);
    const [buttonText,setButtonText] = useState('Reserve');
    const navigate = useNavigate();
    const handlePayment= ()=>{

        navigate(`/checkout/${props.id}`)
    }
    const handleReserve = async () => {
        try {
            setLoadingAnimation(true);
            const res = await axios.post(`http://localhost:3000/request/${props.id}/reserve`, null, {
                withCredentials: true,
            }
            );
            const responseData = JSON.parse(res.data);
            console.log(responseData);
        }
        catch (e) {
            console.log(e);
        }
        setLoadingAnimation(false);
        navigate("/success",{state:{message:"reserved"}});
        
    }
    useEffect(() => {
        const checkReserve = async () => {


            try {
                const res = await axios.get(`http://localhost:3000/request/${props.id}/check-reserve`, {
                    withCredentials: true,
                });
                console.log(res.data);
                if (res.status === 200) {
                    setIsReserved(true);
                    if(res.data.status === "Approved"){
                        setIsApproved(true);
                    }
                    else{
                    setButtonText(res.data.status);
                    }
                }
                
                
            }
            catch (e) {
                setIsReserved(false);
            }
        }
        checkReserve();
    });
    return (
        <div className="reservationBoxContainer">


            <div className="srInformation">
                <div>
                    <h4>Price: £{props.price} pw</h4>
                    <hr />
                </div>
                <div className="dateContainer">
                    <span><FontAwesomeIcon className="icon" icon={faCalendarDays} /></span>
                    <span><p>Start Date: 01/09/2023</p></span>

                </div>
                <div className="dateContainer">
                    <span><FontAwesomeIcon className="icon" icon={faCalendarDays} /></span>
                    <span><p>End Date: 01/09/2024</p></span>

                </div>
                <div className="dateContainer">
                    <span><FontAwesomeIcon className="icon" icon={faMoneyBill1Wave} /></span>
                    <span><p>Deposit: £475</p></span>

                </div>
                <div className="dateContainer">
                    <span><FontAwesomeIcon className="icon" icon={faFileInvoice} /></span>
                    <span><p>Bills included?: Yes</p></span>

                </div>
                <div className="buttonContainer">
                    {isReserved ? (
                        isApproved? (
                            <button onClick={handlePayment} class="btn btn-outline-danger">Make Payment</button>
                        ):(
                            <button class="btn btn-outline-danger">Status: {buttonText}</button>
                        )
                        
                    ) : (
                        <button type="button" onClick={handleReserve} class="btn btn-outline-danger">Reserve Property</button>
                    )}



                </div>
                {loadingAnimation && (
                    <>

                        <div class="d-flex justify-content-center mb-4">
                            <div class="spinner-border" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    </>
                )}


            </div>
        </div>
    );

}

export default ReservationBox;
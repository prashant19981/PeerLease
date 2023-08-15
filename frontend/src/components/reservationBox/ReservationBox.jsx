import React from "react";
import './reservationBox.css';
import { faCalendarDays, faMoneyBill1Wave,faFileInvoice } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
const ReservationBox = () =>{

    return(
        <div className="reservationBoxContainer">
       

        <div className="srInformation">
            <div>
            <h4>Price: £95 pw</h4>
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
            <button type="button" class="btn btn-outline-danger">Reserve Property</button>
            </div>
            

        </div>
    </div>
    );

}

export default ReservationBox;